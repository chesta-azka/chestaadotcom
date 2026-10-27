# Production Deployment & Promotion Guide — CHESTAADOTCOM

This guide details the procedure for promoting the latest build deployment to Production on Vercel, confirming domain routing, and verifying live parity.

---

## 1. Domain & Apex Configuration

1. **Apex Domain**: `https://chestaa.com` (Primary Canonical Target)
2. **WWW Subdomain**: `www.chestaa.com`
   - Configured in Vercel to 301/308 redirect to `https://chestaa.com`
   - Single-hop redirect enforced in both Vercel DNS and `server.ts` middleware.
3. **HTTP to HTTPS**:
   - All HTTP requests automatically 301 redirect to HTTPS.
4. **Root Route (`/`)**:
   - `https://chestaa.com/` returns a permanent 301 redirect to `https://chestaa.com/id` without language/cookie sniffing.

---

## 2. Pre-Deployment Verification Workflow

Before promoting any build to Production, execute all automated quality gates:

```bash
# 1. Verify 0 prohibited legacy strings exist in repository
npm run lint:legacy

# 2. Check pricing consistency across packages
npm run pricing:check

# 3. Lint content structure & internal link rules
npm run content:lint

# 4. Perform full-site SEO, schema, hreflang, and freshness audit
npm run seo:audit

# 5. Execute Indexability Quality Gate evaluation
npm run seo:indexability
```

---

## 3. Promoting Deployment to Production

1. **Run Build Locally**:
   ```bash
   npm run build
   ```
2. **Deploy via Vercel CLI or Git**:
   ```bash
   vercel --prod
   ```
3. **Verify Promotion in Vercel Dashboard**:
   - Confirm domain `chestaa.com` points to the newly deployed deployment ID.
   - Verify `www.chestaa.com` points to `chestaa.com` redirect target.

---

## 4. Post-Deployment Parity Verification

Run the live parity check against `https://chestaa.com`:

```bash
npm run seo:parity
```

### Verification Thresholds
- **HTTP Status**: Must return 200 OK for all canonical routes.
- **Title & Description**: Must match local build output.
- **Search Console Tag**: `<meta name="google-site-verification" content="qsI5diUIpk_GpZYdwmC6zaFNWkBiQSkLMnr701rO34w">` present.
- **Legacy String Check**: Must return **0 instances** of `"Principal Architecture"`, `"Autonomous AI Systems"`, `"dominasi pasar"`, `"CHESTAA Enterprise"`, `"chesta.png"`.
