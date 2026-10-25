import fs from 'fs';
import path from 'path';
import type { Express, Request, Response } from 'express';
import {
  SITE_URL,
  getSitemapAreaRoutes,
  getSitemapServiceRoutes,
} from '../utils/sitemapGenerator';

export const DEFAULT_INDEXNOW_KEY = '7c54e06a3fd02b1763b9a2f2c8e57aa1';

export function getIndexNowKey(): string {
  const envKey = (process.env.INDEXNOW_KEY || '').trim();
  if (/^[a-zA-Z0-9-]{8,128}$/.test(envKey)) {
    return envKey;
  }
  return DEFAULT_INDEXNOW_KEY;
}

export interface IndexNowPingResult {
  success: boolean;
  submittedUrls: string[];
  statusCode?: number;
  endpoint: string;
  timestamp: string;
  message: string;
}

interface IndexNowManifestState {
  key: string;
  pages: Record<string, string>; // fullUrl -> lastmod
  lastPingAt?: string;
  lastPingResult?: IndexNowPingResult;
}

const MANIFEST_FILE_PATH = path.resolve(
  process.cwd(),
  '.indexnow-published-manifest.json'
);

let inMemoryState: IndexNowManifestState = {
  key: getIndexNowKey(),
  pages: {},
};

function loadManifestState(): IndexNowManifestState {
  try {
    if (fs.existsSync(MANIFEST_FILE_PATH)) {
      const raw = fs.readFileSync(MANIFEST_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(raw) as IndexNowManifestState;
      if (parsed && typeof parsed.pages === 'object') {
        inMemoryState = parsed;
        return parsed;
      }
    }
  } catch {
    // Fallback to in-memory state if filesystem is read-only
  }
  return inMemoryState;
}

function saveManifestState(state: IndexNowManifestState): void {
  inMemoryState = state;
  try {
    fs.writeFileSync(MANIFEST_FILE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  } catch {
    // Ignore write errors in read-only serverless environments
  }
}

/**
 * Collects all indexable service (/jasa/[service]) and area (/jasa/[service]/[area])
 * URLs along with their file/content lastmod dates.
 */
export function getPublishableServiceAndAreaUrlMap(
  baseUrl: string = SITE_URL
): Record<string, string> {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const routes = [...getSitemapServiceRoutes(), ...getSitemapAreaRoutes()];
  const map: Record<string, string> = {};

  for (const route of routes) {
    const normalizedPath =
      route.path === '/' ? '' : `/${route.path.replace(/^\/+|\/+$/g, '')}`;
    const fullUrl = `${cleanBase}${normalizedPath}`;
    map[fullUrl] = route.lastmod;
  }

  return map;
}

/**
 * Sends an IndexNow batch ping to api.indexnow.org (which shares with Bing, Yandex, Seznam, Naver).
 */
export async function pingIndexNowUrls(
  urls: string[],
  baseUrl: string = SITE_URL
): Promise<IndexNowPingResult> {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const key = getIndexNowKey();
  const timestamp = new Date().toISOString();
  const endpoint = 'https://api.indexnow.org/indexnow';

  const uniqueUrls = Array.from(
    new Set(
      urls
        .map((u) => u.trim())
        .filter(Boolean)
        .map((u) => (u.startsWith('http') ? u : `${cleanBase}${u.startsWith('/') ? u : '/' + u}`))
    )
  );

  if (uniqueUrls.length === 0) {
    return {
      success: true,
      submittedUrls: [],
      endpoint,
      timestamp,
      message: 'No new or modified service/area URLs to submit.',
    };
  }

  let host = 'chestaa.com';
  try {
    host = new URL(cleanBase).host;
  } catch {
    host = 'chestaa.com';
  }

  const payload = {
    host,
    key,
    keyLocation: `${cleanBase}/${key}.txt`,
    urlList: uniqueUrls,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const ok = response.status >= 200 && response.status < 300;
    const result: IndexNowPingResult = {
      success: ok,
      submittedUrls: uniqueUrls,
      statusCode: response.status,
      endpoint,
      timestamp,
      message: ok
        ? `Successfully pinged IndexNow (${response.status}) with ${uniqueUrls.length} URL(s).`
        : `IndexNow returned HTTP ${response.status}.`,
    };
    return result;
  } catch (err: any) {
    return {
      success: false,
      submittedUrls: uniqueUrls,
      endpoint,
      timestamp,
      message: `IndexNow network request failed: ${err?.message || String(err)}`,
    };
  }
}

/**
 * Automatically detects newly added or updated service & area pages
 * by comparing current indexable routes with the persisted manifest,
 * and pings IndexNow if any new/changed pages are found.
 */
export async function autoPingNewServiceAndAreaPages(
  baseUrl: string = SITE_URL
): Promise<IndexNowPingResult> {
  const state = loadManifestState();
  const currentMap = getPublishableServiceAndAreaUrlMap(baseUrl);
  const changedOrNewUrls: string[] = [];

  for (const [fullUrl, lastmod] of Object.entries(currentMap)) {
    if (!state.pages[fullUrl] || state.pages[fullUrl] !== lastmod) {
      changedOrNewUrls.push(fullUrl);
    }
  }

  if (changedOrNewUrls.length === 0) {
    return {
      success: true,
      submittedUrls: [],
      endpoint: 'https://api.indexnow.org/indexnow',
      timestamp: new Date().toISOString(),
      message: 'All service and area pages are already up to date in IndexNow manifest.',
    };
  }

  const pingResult = await pingIndexNowUrls(changedOrNewUrls, baseUrl);

  saveManifestState({
    key: getIndexNowKey(),
    pages: currentMap,
    lastPingAt: pingResult.timestamp,
    lastPingResult: pingResult,
  });

  return pingResult;
}

/**
 * Registers IndexNow key verification file routes and API endpoints on the Express app,
 * and schedules automatic startup detection for new/updated service and area pages.
 */
export function registerIndexNowRoutes(app: Express): void {
  const key = getIndexNowKey();

  // Serve /<key>.txt verification file required by Bing & IndexNow protocol
  app.get([`/${key}.txt`, '/indexnow-key.txt'], (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200).send(key);
  });

  // GET /api/indexnow/status — inspect current tracked service/area URLs and last ping status
  app.get('/api/indexnow/status', (_req: Request, res: Response) => {
    const state = loadManifestState();
    const currentMap = getPublishableServiceAndAreaUrlMap(SITE_URL);
    res.json({
      key: getIndexNowKey(),
      keyLocation: `${SITE_URL}/${getIndexNowKey()}.txt`,
      trackedCount: Object.keys(currentMap).length,
      trackedUrls: currentMap,
      lastPingAt: state.lastPingAt || null,
      lastPingResult: state.lastPingResult || null,
    });
  });

  // POST /api/indexnow — trigger immediate IndexNow ping for specific URLs or all service/area pages
  app.post('/api/indexnow', async (req: Request, res: Response) => {
    try {
      const bodyUrls = Array.isArray(req.body?.urls)
        ? req.body.urls
        : typeof req.body?.url === 'string'
        ? [req.body.url]
        : null;

      if (bodyUrls && bodyUrls.length > 0) {
        const result = await pingIndexNowUrls(bodyUrls, SITE_URL);
        const state = loadManifestState();
        saveManifestState({
          ...state,
          lastPingAt: result.timestamp,
          lastPingResult: result,
        });
        return res.status(result.success ? 200 : 502).json(result);
      }

      // If force=true, ping all publishable service & area pages; otherwise auto-diff
      if (req.body?.force === true) {
        const currentMap = getPublishableServiceAndAreaUrlMap(SITE_URL);
        const allUrls = Object.keys(currentMap);
        const result = await pingIndexNowUrls(allUrls, SITE_URL);
        saveManifestState({
          key: getIndexNowKey(),
          pages: currentMap,
          lastPingAt: result.timestamp,
          lastPingResult: result,
        });
        return res.status(result.success ? 200 : 502).json(result);
      }

      const diffResult = await autoPingNewServiceAndAreaPages(SITE_URL);
      return res.status(200).json(diffResult);
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        error: err?.message || 'IndexNow ping failed',
      });
    }
  });

  // Automatically check and ping new/updated service & area pages shortly after server boot
  setTimeout(() => {
    autoPingNewServiceAndAreaPages(SITE_URL).catch((err) => {
      console.warn('IndexNow auto-ping warning:', err?.message || err);
    });
  }, 6000);
}
