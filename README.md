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
