# Google Search Console (GSC) Pack & Submission Checklist — CHESTAADOTCOM

This checklist guides site managers through submitting sitemaps, verifying indexability, and managing Search Console properties for `chestaa.com`.

---

## 1. Property Setup & Meta Verification

- [x] **Property Type**: Domain Property (`chestaa.com`) and URL Prefix Property (`https://chestaa.com`).
- [x] **Meta Tag Verification**: Tag `<meta name="google-site-verification" content="qsI5diUIpk_GpZYdwmC6zaFNWkBiQSkLMnr701rO34w">` embedded in `index.html` and pre-rendered layout.
- [x] **Domain Redirect**: `www.chestaa.com` verified as 301/308 redirect to `https://chestaa.com`.

---

## 2. Sitemap Submission Table

Submit the following sitemaps in Google Search Console:

| Sitemap URL | Type | Expected URL Count | Primary Language | Submission Status |
| :--- | :--- | :---: | :---: | :---: |
| `https://chestaa.com/sitemap.xml` | Index / Combined | 100+ | ID & EN | **READY FOR SUBMISSION** |
| `https://chestaa.com/sitemap-pages.xml` | Core Pages & Portfolio | 20+ | ID & EN | **READY FOR SUBMISSION** |
| `https://chestaa.com/sitemap-services.xml` | Core Services (4) | 8 | ID & EN | **READY FOR SUBMISSION** |
| `https://chestaa.com/sitemap-areas.xml` | Local Service Areas (10) | 22 | ID & EN | **READY FOR SUBMISSION** |
| `https://chestaa.com/sitemap-blog.xml` | Blog & Topic Clusters | 70+ | ID & EN | **READY FOR SUBMISSION** |

---

## 3. Indexability Quality Gate Verification

Before requesting indexing in GSC, confirm that `indexability-report.csv` shows `ready_for_gsc = YES`:

```bash
npm run seo:indexability
```

### Quality Gate Pass Criteria:
1. **Word Count**:
   - Services >= 700 words
   - Local Area Pages >= 600 words
   - Articles >= 1,000 words
   - Case Studies >= 700 words
   - Glossary Terms >= 600 words
2. **Title & Description**:
   - Unique title tag (30-60 chars)
   - Unique meta description (140-160 chars)
3. **Internal Links & Depth**:
   - >= 3 contextual internal inlinks
   - Click depth <= 3 from home page
4. **Canonical & Schema**:
   - Self-referential canonical URL
   - Valid JSON-LD `@graph` schema markup
