# Deployment & Canonical Host Guide (`https://chestaa.com`)

## 1. Canonical Host Decision
- **Canonical Host (Apex):** `https://chestaa.com`
- **Single Source of Truth Constant:** `SITE_URL = "https://chestaa.com"` (`src/data/facts.ts`, `src/utils/sitemapGenerator.ts`, `src/lib/social-meta.ts`)
- Every `canonical`, `og:url`, `hreflang` (`id`, `en`, `x-default`), `article:author`, `sitemap.xml` `<loc>` / `<image:loc>`, JSON-LD `@id` / `url`, `rss.xml` `<link>` / `<enclosure>`, and `llms.txt` URL is constructed strictly from `SITE_URL`.

---

## 2. Exact Vercel Dashboard Click Path (Apex Primary + `www` Redirect)

To ensure Vercel's edge layer serves `https://chestaa.com` as the primary domain and redirects `https://www.chestaa.com` to `https://chestaa.com` in a single hop (preventing an infinite redirect loop with `vercel.json`):

1. Open **[Vercel Dashboard](https://vercel.com/dashboard)** and select the **chestaa.com** project.
2. Click **Settings** in the top navigation bar.
3. Click **Domains** in the left sidebar (`/settings/domains`).
4. Locate **`chestaa.com`** (the apex domain):
   - Click **Edit** on `chestaa.com`.
   - Set **Redirect to** -> **No Redirect** (Connect to Production Environment / Primary Domain).
   - Click **Save**.
5. Locate **`www.chestaa.com`**:
   - Click **Edit** on `www.chestaa.com`.
   - Select **Redirect to Another Domain**.
   - Choose status code **308 Permanent Redirect** (or **301 Moved Permanently**) and target **`chestaa.com`**.
   - Click **Save**.

---

## 3. Code-Level Redirect & Build Gate Enforcement

### `vercel.json` Edge Rule
```json
{
  "source": "/:path*",
  "has": [
    {
      "type": "host",
      "value": "www.chestaa.com"
    }
  ],
  "destination": "https://chestaa.com/:path*",
  "permanent": true
}
```

### `server.ts` Express Middleware
```ts
app.use((req, res, next) => {
  const host = (req.headers.host || "").toLowerCase();
  if (host.startsWith("www.")) {
    const cleanHost = host.replace(/^www\./, "");
    const proto = req.headers["x-forwarded-proto"] || req.protocol || "https";
    return res.redirect(301, `${proto}://${cleanHost}${req.originalUrl}`);
  }
  next();
});
```

### Pre-Deploy Build Gates
Run the full build and audit suite before deploying:
```bash
npm run covers:generate
npm run covers:check
npm run content:lint
npm run seo:audit
npm run build
```

---

## 4. Post-Deploy Verification Check

Run the following command after updating Vercel Domains to verify that:
1. `https://chestaa.com/id` returns **HTTP 200** directly with **0 redirects**.
2. `https://www.chestaa.com/id` returns **exactly 1 redirect (301/308)** to `https://chestaa.com/id`.

```bash
# 1. Verify apex returns 200 with 0 redirects
curl -sS -D - -o /dev/null https://chestaa.com/id | grep -E "^(HTTP/|location:)"

# 2. Verify www redirects in a single hop to https://chestaa.com/id
curl -sS -D - -o /dev/null https://www.chestaa.com/id | grep -E "^(HTTP/|location:)"
```

Or run the automated post-deploy host check via Node:
```bash
node -e '
(async () => {
  const apex = await fetch("https://chestaa.com/id", { redirect: "manual" });
  console.log("Apex status:", apex.status, "Location:", apex.headers.get("location"));
  if (apex.status !== 200) throw new Error(`Expected 200 on apex, got ${apex.status}`);

  const www = await fetch("https://www.chestaa.com/id", { redirect: "manual" });
  console.log("WWW status:", www.status, "Location:", www.headers.get("location"));
  if (![301, 308].includes(www.status) || www.headers.get("location") !== "https://chestaa.com/id") {
    throw new Error(`Expected single redirect to https://chestaa.com/id, got ${www.status} -> ${www.headers.get("location")}`);
  }
  console.log("PASS: Apex returns 200 and www redirects in 1 hop to apex.");
})();
'
```
