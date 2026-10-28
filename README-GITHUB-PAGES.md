# OmicsPath — GitHub Pages edition

Based on latest saved Sites version 12, source commit `8cac93fa0baa86f33810de3fa8a4a5ca222a8adb`.

## Publish
Push to `main`, then select **Settings → Pages → Build and deployment → GitHub Actions**. Run the Deploy OmicsPath workflow if necessary. The default project URL is https://soumy1797.github.io/OmicsPath-Pages/ . Publication is only confirmed after Actions succeeds; this document is not a deployment confirmation.

## Behaviour
The existing UI, lessons, synthetic browser calculations, roadmap, practice assessments and scripted commander are retained. Python/R examples remain read-only. The newer crash-course design and floating avatar demos are not implemented in this source.

Progress and first-pass XP are saved only in this browser's localStorage; no login, cross-device sync or server database. Clearing site data loses progress. Export the learning record from Content standards. Browser storage failures are reported. Answer keys are public and progress can be edited: this is practice, never secure assessment or certification. Hosting migration does not provide an AI backend. Do not place API keys in browser code.

`pnpm install --frozen-lockfile`, `pnpm test:pages`, `pnpm build:pages`. Node >=22.13.0. Output: `dist-pages/`. `PAGES_BASE_PATH` defaults to `/OmicsPath-Pages/`; the deployment workflow derives it from GitHub Pages configuration. Navigation uses query parameters to avoid static deep-link 404s. No paid services are configured.

The original server implementation is retained as migration reference, but is not imported into the Pages entry point. Original Sites instructions in README.md apply only to that older hosting path. This adapter uses Vite/React directly; it does not deploy Cloudflare Workers or D1.
