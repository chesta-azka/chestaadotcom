export interface KnowledgeJson {
  learned_qa_cache: Record<string, any>;
  learned_facts: string[];
  leads_audit: any[];
  [key: string]: any;
}

const DEFAULT_KNOWLEDGE: KnowledgeJson = {
  learned_qa_cache: {},
  learned_facts: [],
  leads_audit: [],
};

function normalizeKnowledge(raw: any): KnowledgeJson {
  if (!raw || typeof raw !== 'object') {
    return {
      learned_qa_cache: {},
      learned_facts: [],
      leads_audit: [],
    };
  }

  let qaCache: Record<string, any> = {};
  if (Array.isArray(raw.learned_qa_cache)) {
    for (const item of raw.learned_qa_cache) {
      if (item && typeof item === 'object') {
        const q = String(item.question || item.q || item.key || '').trim();
        const a = item.answer ?? item.a ?? item.value ?? '';
        if (q) qaCache[q] = a;
      }
    }
  } else if (raw.learned_qa_cache && typeof raw.learned_qa_cache === 'object') {
    qaCache = { ...raw.learned_qa_cache };
  }

  const facts = Array.isArray(raw.learned_facts)
    ? raw.learned_facts.map((f: any) => (typeof f === 'string' ? f : JSON.stringify(f)))
    : [];

  const leads = Array.isArray(raw.leads_audit) ? [...raw.leads_audit] : [];

  return {
    ...raw,
    learned_qa_cache: qaCache,
    learned_facts: facts,
    leads_audit: leads,
  };
}

async function fetchPteroKnowledge(
  baseUrl: string,
  apiKey: string
): Promise<KnowledgeJson> {
  const url = `${baseUrl}/files/contents?file=%2Fknowledge.json`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: 'Application/vnd.pterodactyl.v1+json, application/json, text/plain',
    },
  });

  if (response.status === 404) {
    return normalizeKnowledge(DEFAULT_KNOWLEDGE);
  }

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(
      `Gagal membaca /knowledge.json dari Pterodactyl (HTTP ${response.status}): ${errText.slice(0, 200)}`
    );
  }

  const text = await response.text();
  if (!text || !text.trim()) {
    return normalizeKnowledge(DEFAULT_KNOWLEDGE);
  }

  try {
    const parsed = JSON.parse(text);
    return normalizeKnowledge(parsed);
  } catch {
    return normalizeKnowledge(DEFAULT_KNOWLEDGE);
  }
}

async function writePteroKnowledge(
  baseUrl: string,
  apiKey: string,
  knowledge: KnowledgeJson
): Promise<void> {
  const url = `${baseUrl}/files/write?file=%2Fknowledge.json`;
  const payload = JSON.stringify(knowledge, null, 2);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: 'Application/vnd.pterodactyl.v1+json',
      'Content-Type': 'text/plain',
    },
    body: payload,
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(
      `Gagal menyimpan /knowledge.json ke Pterodactyl (HTTP ${response.status}): ${errText.slice(0, 200)}`
    );
  }
}

export default async function handler(req: any, res: any) {
  // Set CORS / cache headers for admin endpoint
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const adminPasscode = process.env.ADMIN_PASSCODE;
  const headerPasscodeRaw = req.headers?.['x-admin-passcode'];
  const providedPasscode = Array.isArray(headerPasscodeRaw)
    ? headerPasscodeRaw[0]
    : headerPasscodeRaw;

  if (!adminPasscode) {
    return res.status(500).json({
      success: false,
      error: 'Environment variable ADMIN_PASSCODE belum diatur di server.',
    });
  }

  if (!providedPasscode || providedPasscode !== adminPasscode) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: PIN Admin tidak valid.',
    });
  }

  const panelUrl = (process.env.PTERO_PANEL_URL || '').trim().replace(/\/+$/, '');
  const serverId = (process.env.PTERO_SERVER_ID || '').trim();
  const apiKey = (process.env.PTERO_API_KEY || '').trim();

  if (!panelUrl || !serverId || !apiKey) {
    return res.status(500).json({
      success: false,
      error:
        'Konfigurasi Pterodactyl belum lengkap. Pastikan PTERO_PANEL_URL, PTERO_SERVER_ID, dan PTERO_API_KEY sudah diatur di environment variables.',
    });
  }

  const baseUrl = `${panelUrl}/api/client/servers/${serverId}`;

  try {
    if (req.method === 'GET') {
      const action = String(req.query?.action || 'dashboard').trim();

      if (action === 'dashboard') {
        const [resourcesResp, knowledge] = await Promise.all([
          fetch(`${baseUrl}/resources`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              Accept: 'Application/vnd.pterodactyl.v1+json',
            },
          }),
          fetchPteroKnowledge(baseUrl, apiKey),
        ]);

        if (!resourcesResp.ok) {
          const errText = await resourcesResp.text().catch(() => '');
          throw new Error(
            `Gagal mengambil status server Pterodactyl (HTTP ${resourcesResp.status}): ${errText.slice(0, 200)}`
          );
        }

        const resourcesJson = await resourcesResp.json();
        const attrs = resourcesJson?.attributes || {};
        const usage = attrs?.resources || {};

        const resources = {
          state: attrs.current_state || 'offline',
          current_state: attrs.current_state || 'offline',
          is_suspended: Boolean(attrs.is_suspended),
          memory_bytes: Number(usage.memory_bytes || 0),
          cpu_absolute: Number(usage.cpu_absolute || 0),
          disk_bytes: Number(usage.disk_bytes || 0),
          network_rx_bytes: Number(usage.network_rx_bytes || 0),
          network_tx_bytes: Number(usage.network_tx_bytes || 0),
          uptime: Number(usage.uptime || 0),
        };

        return res.status(200).json({
          success: true,
          resources,
          knowledge,
        });
      }

      if (action === 'download_excel') {
        const dlResp = await fetch(
          `${baseUrl}/files/download?file=%2Fdatabase_ai.xlsx`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              Accept: 'Application/vnd.pterodactyl.v1+json',
            },
          }
        );

        if (!dlResp.ok) {
          const errText = await dlResp.text().catch(() => '');
          throw new Error(
            `Gagal mengambil link unduhan /database_ai.xlsx (HTTP ${dlResp.status}): ${errText.slice(0, 200)}`
          );
        }

        const dlJson = await dlResp.json();
        const signedUrl = dlJson?.attributes?.url || dlJson?.url;

        if (!signedUrl) {
          throw new Error('URL unduhan database_ai.xlsx tidak ditemukan dari respons Pterodactyl.');
        }

        return res.status(200).json({
          success: true,
          url: signedUrl,
        });
      }

      return res.status(400).json({
        success: false,
        error: `Action GET tidak dikenali: ${action}`,
      });
    }

    if (req.method === 'POST') {
      const body =
        typeof req.body === 'string'
          ? JSON.parse(req.body || '{}')
          : req.body || {};
      const action = String(body.action || '').trim();

      if (action === 'power') {
        const signal = String(body.signal || 'restart').trim();
        if (!['start', 'stop', 'restart', 'kill'].includes(signal)) {
          return res.status(400).json({
            success: false,
            error: `Sinyal power tidak valid: ${signal}`,
          });
        }

        const powerResp = await fetch(`${baseUrl}/power`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: 'Application/vnd.pterodactyl.v1+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ signal }),
        });

        if (!powerResp.ok) {
          const errText = await powerResp.text().catch(() => '');
          throw new Error(
            `Gagal mengirim sinyal ${signal} ke server (HTTP ${powerResp.status}): ${errText.slice(0, 200)}`
          );
        }

        return res.status(200).json({
          success: true,
          signal,
          message: `Sinyal "${signal}" berhasil dikirim ke server bot.`,
        });
      }

      if (
        action === 'add_train' ||
        action === 'add_learn' ||
        action === 'batch_import' ||
        action === 'delete_qa' ||
        action === 'delete_fact'
      ) {
        const knowledge = await fetchPteroKnowledge(baseUrl, apiKey);

        if (action === 'add_train') {
          const question = String(body.question ?? body.q ?? '').trim();
          const answer = String(body.answer ?? body.a ?? '').trim();

          if (!question || !answer) {
            return res.status(400).json({
              success: false,
              error: 'Pertanyaan dan jawaban tidak boleh kosong.',
            });
          }

          knowledge.learned_qa_cache[question] = answer;
          await writePteroKnowledge(baseUrl, apiKey, knowledge);

          return res.status(200).json({
            success: true,
            message: 'Q&A berhasil disimpan ke knowledge.json.',
            knowledge,
          });
        }

        if (action === 'add_learn') {
          const fact = String(body.fact ?? body.text ?? '').trim();
          if (!fact) {
            return res.status(400).json({
              success: false,
              error: 'Teks fakta tidak boleh kosong.',
            });
          }

          if (!knowledge.learned_facts.includes(fact)) {
            knowledge.learned_facts.push(fact);
          }
          await writePteroKnowledge(baseUrl, apiKey, knowledge);

          return res.status(200).json({
            success: true,
            message: 'Fakta AI baru berhasil ditambahkan ke knowledge.json.',
            knowledge,
          });
        }

        if (action === 'batch_import') {
          const rawText = String(body.text ?? body.batch ?? body.lines ?? '');
          const lines = rawText
            .split(/\r?\n/)
            .map((l) => l.trim())
            .filter((l) => l.length > 0 && !l.startsWith('#'));

          if (lines.length === 0) {
            return res.status(400).json({
              success: false,
              error: 'Tidak ada baris perintah /train atau /learn yang valid.',
            });
          }

          let trainedCount = 0;
          let learnedCount = 0;
          let skippedCount = 0;

          for (const line of lines) {
            if (/^\/train\s+/i.test(line)) {
              const payload = line.replace(/^\/train\s+/i, '').trim();
              const pipeIdx = payload.indexOf('|');
              if (pipeIdx !== -1) {
                const q = payload.slice(0, pipeIdx).trim();
                const a = payload.slice(pipeIdx + 1).trim();
                if (q && a) {
                  knowledge.learned_qa_cache[q] = a;
                  trainedCount++;
                  continue;
                }
              }
              skippedCount++;
            } else if (/^\/learn\s+/i.test(line)) {
              const fact = line.replace(/^\/learn\s+/i, '').trim();
              if (fact) {
                if (!knowledge.learned_facts.includes(fact)) {
                  knowledge.learned_facts.push(fact);
                }
                learnedCount++;
                continue;
              }
              skippedCount++;
            } else if (line.includes('|')) {
              const pipeIdx = line.indexOf('|');
              const q = line.slice(0, pipeIdx).trim();
              const a = line.slice(pipeIdx + 1).trim();
              if (q && a) {
                knowledge.learned_qa_cache[q] = a;
                trainedCount++;
                continue;
              }
              skippedCount++;
            } else {
              skippedCount++;
            }
          }

          await writePteroKnowledge(baseUrl, apiKey, knowledge);

          return res.status(200).json({
            success: true,
            trainedCount,
            learnedCount,
            skippedCount,
            message: `Batch import selesai: ${trainedCount} Q&A (/train) dan ${learnedCount} Fakta (/learn) disimpan.`,
            knowledge,
          });
        }

        if (action === 'delete_qa') {
          const targetKey = String(body.question ?? body.key ?? '').trim();
          if (!targetKey) {
            return res.status(400).json({
              success: false,
              error: 'Kunci pertanyaan yang akan dihapus tidak boleh kosong.',
            });
          }

          if (Object.prototype.hasOwnProperty.call(knowledge.learned_qa_cache, targetKey)) {
            delete knowledge.learned_qa_cache[targetKey];
          } else {
            const matchedKey = Object.keys(knowledge.learned_qa_cache).find(
              (k) => k.toLowerCase() === targetKey.toLowerCase()
            );
            if (matchedKey) {
              delete knowledge.learned_qa_cache[matchedKey];
            }
          }

          await writePteroKnowledge(baseUrl, apiKey, knowledge);

          return res.status(200).json({
            success: true,
            message: 'Item Q&A berhasil dihapus dari knowledge.json.',
            knowledge,
          });
        }

        if (action === 'delete_fact') {
          const index =
            typeof body.index === 'number'
              ? body.index
              : Number.isInteger(Number(body.index)) && body.index !== undefined && body.index !== ''
              ? Number(body.index)
              : -1;
          const factText = String(body.fact ?? '').trim();

          if (index >= 0 && index < knowledge.learned_facts.length) {
            knowledge.learned_facts.splice(index, 1);
          } else if (factText) {
            knowledge.learned_facts = knowledge.learned_facts.filter(
              (item) => item.trim() !== factText
            );
          } else {
            return res.status(400).json({
              success: false,
              error: 'Index atau teks fakta yang akan dihapus tidak valid.',
            });
          }

          await writePteroKnowledge(baseUrl, apiKey, knowledge);

          return res.status(200).json({
            success: true,
            message: 'Fakta AI berhasil dihapus dari knowledge.json.',
            knowledge,
          });
        }
      }

      return res.status(400).json({
        success: false,
        error: `Action POST tidak dikenali: ${action}`,
      });
    }

    return res.status(405).json({
      success: false,
      error: `Method ${req.method} tidak diizinkan.`,
    });
  } catch (error: any) {
    console.error('[bot-admin API error]:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Terjadi kesalahan internal saat menghubungi Panel Pterodactyl.',
    });
  }
}
