# Deploy Dirt Bike India to Cloudflare Pages

This repository is a static Vite + TypeScript + Three.js game. It builds to `dist/` and should be deployed as a **Cloudflare Pages** site, not as a Cloudflare Worker.

## Recommended: Git-connected Cloudflare Pages

In Cloudflare Dashboard → **Workers & Pages** → your Pages project → **Settings → Builds & deployments**, use:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: leave blank (repository root)
- Deploy command: leave unset / do not run `wrangler deploy`

Cloudflare Pages automatically publishes the output directory after a successful build when connected to Git. The repository already has a top-level `index.html` and Vite is configured with `base: '/'`, which is appropriate for a `.pages.dev` domain or a custom domain.

## If deploying manually from a terminal

Run:

```sh
npm ci
npm run deploy:pages
```

The first run may ask you to sign in to Cloudflare and select/create the Pages project. The script builds the site and runs `wrangler pages deploy dist --project-name=dirt-bike-india`.

**Important:** Do not use `npx wrangler deploy` for this Pages project. That command targets Workers and invokes the Worker/Vite configuration flow; it is not the Pages static-site deployment command.

## Build warning

Vite may warn that the generated JavaScript chunk is larger than 500 kB because the 3D game bundles Three.js and its rendering pipeline. This is a performance warning, not a build failure. A successful `npm run build` is the first check; then test the published game in a browser with WebGL2 enabled.
