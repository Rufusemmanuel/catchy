# Catchy Marketing Website

Responsive agency marketing website for Catchy, built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Commands

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run test
```

```bash
npm run test:e2e
```

## Hero Video Encoding

Use a web-safe H.264/AAC file for the featured hero video.

1. Put the original upload at `public/videos/catchy-hero-source.mp4`.
2. Run:

```bash
npm run encode:hero-video
```

3. Commit the generated output file: `public/videos/catchy-hero.mp4`.

## Config

Update brand settings in `src/config/brand.ts`:

- `brandConfig.colors.primary`
- `brandConfig.colors.secondary`
- `brandConfig.colors.background`
- `brandConfig.colors.surface`
- `brandConfig.colors.soft`
- `brandConfig.consultationFormUrl`
- `brandConfig.links.instagram`
- `brandConfig.links.x`
- `brandConfig.links.tiktok`
- `brandConfig.links.googleForm`
- `brandConfig.links.whatsapp`

### How to update brand config values

1. Open `src/config/brand.ts`.
2. Edit the `brandConfig` object with your real brand values:
   - `name` for the site/company name
   - `consultationFormUrl` for your consultation booking form
   - `colors.*` for your brand palette (hex values)
   - `links.*` for social/contact URLs
3. Save changes and run:

```bash
npm run dev
```

4. Validate branding updates in the key pages (`/`, `/services`, `/contact`, `/book-call`).
5. Commit and push to `main` to trigger automatic Vercel deployment through GitHub Actions.

## Verified Businesses System

- Public directory: `/verified`
- Public profile: `/verified/[slug]`
- Admin login: `/admin/login`
- Admin management: `/admin/verified`

### Admin auth

Admin auth now uses Auth.js sessions (JWT cookies, `httpOnly`, secure in production).

Required environment variables:

```bash
NEXTAUTH_SECRET=replace-with-long-random-secret
CATCHY_ADMIN_USERS_JSON=[{"email":"admin@example.com","name":"Primary Admin","role":"admin","password_hash":"$2b$12$...","totp_secret":"OPTIONAL_BASE32_SECRET"}]
# Optional safer transport to avoid `$` escaping issues in `.env` files:
# CATCHY_ADMIN_USERS_JSON_B64=base64-encoded-json
```

Note: in `.env` files, bcrypt hashes must escape `$` as `\$` (or use `CATCHY_ADMIN_USERS_JSON_B64`).

Optional hardening:

```bash
# Restrict admin access to specific IPs (comma-separated)
CATCHY_ADMIN_IP_ALLOWLIST=203.0.113.10,198.51.100.22

# Login brute-force protection
CATCHY_ADMIN_LOGIN_MAX_ATTEMPTS=5
CATCHY_ADMIN_LOGIN_WINDOW_MINUTES=15
CATCHY_ADMIN_LOGIN_LOCK_MINUTES=30
```

Generate password hashes locally:

```bash
node -e "const {hash}=require('bcryptjs');hash('YOUR_PASSWORD',12).then(console.log)"
```

MFA is supported per admin account by setting `totp_secret` (compatible with standard authenticator apps).

### Data storage

Verified business data is stored in:

- `data/verified-businesses.json`
- `data/admin-audit-log.json` (admin-only security and mutation audit trail)
- `data/admin-login-attempts.json` (rate-limit state)

This file contains:

- `verified_businesses` (public profile data)
- `verification_reviews` (admin-only internal review data)
