# Deploy Dirt Race India to GitHub Pages

This project is configured for the repository `studyyuvraj17-tech/indian-bike-3d`.

## Publish it

1. Open https://github.com/studyyuvraj17-tech/indian-bike-3d
2. Upload the **contents** of this project folder (not the outer folder itself), preserving the `.github/workflows/deploy.yml` path. If GitHub's web uploader hides dotfolders, use GitHub Desktop or Git locally to upload the project.
3. Commit the files to the `main` branch.
4. Open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
5. Open the **Actions** tab and wait for **Deploy Dirt Race India to GitHub Pages** to finish successfully.
6. The expected site URL is https://studyyuvraj17-tech.github.io/indian-bike-3d/ .

The workflow installs dependencies with `npm ci`, runs `npm run build`, and publishes the `dist` folder. It runs on every push to `main` and can also be started manually from Actions.

If you choose a different repository name, update `base` in `vite.config.ts` to `/<repository-name>/` before publishing.
