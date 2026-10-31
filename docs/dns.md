# Email Authentication (SPF, DKIM, and DMARC) for `chestaa.com`

This guide explains how to configure **SPF**, **DKIM**, and **DMARC** DNS records for `chestaa.com` in your DNS provider (Vercel DNS, Cloudflare, Namecheap, or your domain registrar) so that SEO Site Checkup and receiving mail servers verify `chestaa.com` against email spoofing.

---

## 1. SPF (Sender Policy Framework)

An **SPF** record is a `TXT` record on the root domain (`@` or `chestaa.com`) that specifies which mail servers are authorized to send email on behalf of `@chestaa.com`.

Choose **Option A** or **Option B** depending on whether `chestaa.com` sends outbound email:

### Option A — If `chestaa.com` sends NO email (parked mail / WhatsApp-first or `@gmail.com` only)
If you do not send email from `@chestaa.com` addresses, publish a strict fail-all SPF record so no server on the internet can forge mail from `@chestaa.com`:

| Type | Host / Name | Value | TTL |
| :--- | :--- | :--- | :--- |
| `TXT` | `@` (or `chestaa.com`) | `v=spf1 -all` | `3600` (or Auto) |

### Option B — If `chestaa.com` uses Google Workspace for email
If you send email from `@chestaa.com` via Google Workspace, authorize Google's outbound mail servers:

| Type | Host / Name | Value | TTL |
| :--- | :--- | :--- | :--- |
| `TXT` | `@` (or `chestaa.com`) | `v=spf1 include:_spf.google.com ~all` | `3600` (or Auto) |

> **Important:** A domain must have **only one** SPF `TXT` record starting with `v=spf1`. If an older SPF record exists, edit or replace it rather than creating a second one.

---

## 2. DKIM (DomainKeys Identified Mail)

**DKIM** adds a cryptographic signature to outbound emails so receiving servers can verify the message was genuinely sent by your mail provider and was not altered in transit.

### If using Google Workspace:
1. Open the [Google Admin Console](https://admin.google.com) → **Apps** → **Google Workspace** → **Gmail** → **Authenticate email**.
2. Select the domain **`chestaa.com`** and click **Generate new record**.
3. Choose **2048-bit** key length and keep the default prefix selector (`google`).
4. Add the generated `TXT` record in your DNS provider:

| Type | Host / Name | Value | TTL |
| :--- | :--- | :--- | :--- |
| `TXT` | `google._domainkey` | `v=DKIM1; k=rsa; p=<MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A...>` | `3600` (or Auto) |

5. Wait 10–60 minutes for DNS propagation, then click **Start authentication** in the Google Admin Console.

*(If `chestaa.com` sends no email at all and uses Option A `v=spf1 -all`, no DKIM key is required until a mail provider is connected.)*

---

## 3. DMARC (Domain-based Message Authentication, Reporting, and Conformance)

**DMARC** instructs receiving mail servers how to handle messages from `@chestaa.com` that fail SPF or DKIM checks, and sends aggregate XML reports (`rua`) to the owner address.

### Step 1: Starter DMARC Record (`p=none` monitoring mode)
Add the following `TXT` record on `_dmarc.chestaa.com` (replace `<owner address>` with the owner's actual monitoring email address):

| Type | Host / Name | Value | TTL |
| :--- | :--- | :--- | :--- |
| `TXT` | `_dmarc` | `v=DMARC1; p=none; rua=mailto:<owner address>` | `3600` (or Auto) |

### Step 2: Move to `quarantine` (and `reject`) Later
1. Keep `p=none` active for **2 to 4 weeks** while reviewing the daily DMARC aggregate reports sent to `<owner address>` to confirm that all legitimate email sources pass SPF and DKIM.
2. Once verified (or immediately if `chestaa.com` sends no email), tighten the policy to **`p=quarantine`** so unauthorized emails are sent to spam:
   ```txt
   v=DMARC1; p=quarantine; pct=100; rua=mailto:<owner address>
   ```
3. After confirming zero false positives under `quarantine`, optionally upgrade to `p=reject`:
   ```txt
   v=DMARC1; p=reject; rua=mailto:<owner address>
   ```

---

## 4. How to Verify with a Lookup Tool

After saving your DNS records, verify that they resolve publicly using command-line tools or web-based DNS lookup utilities:

### Using `dig` (macOS / Linux terminal)
```bash
# 1. Verify SPF record on root domain
dig +short TXT chestaa.com

# 2. Verify DMARC record
dig +short TXT _dmarc.chestaa.com

# 3. Verify Google Workspace DKIM record (if configured)
dig +short TXT google._domainkey.chestaa.com
```

### Using `nslookup` (Windows / macOS / Linux)
```bash
nslookup -type=TXT chestaa.com 1.1.1.1
nslookup -type=TXT _dmarc.chestaa.com 1.1.1.1
```

### Using Online Lookup Tools
- **MXToolbox SuperTool**: `https://mxtoolbox.com/spf.aspx` and `https://mxtoolbox.com/dmarc.aspx` — enter `chestaa.com` to validate syntax and single-record compliance.
- **Google Admin Toolbox CheckMX / Dig**: `https://toolbox.googleapps.com/apps/dig/#TXT/chestaa.com`
- **SEO Site Checkup SPF Test**: Re-run the SEO Site Checkup report on `https://chestaa.com` to confirm the SPF record check passes.
