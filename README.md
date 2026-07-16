# 🌹 RozeTree
[![Deployment](https://github.com/hazeliscoding/roze-tree/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/hazeliscoding/roze-tree/actions/workflows/deploy.yml)

A cute, lightweight Linktree-style profile page built with Angular.
Content is driven by a single JSON file so you can update links, labels, emojis, and profile info without touching the UI.

> 💻 Platform: **Web** (Angular 21)
> 
> ✨ Features: **light/dark theme**, **sparkle cursor**, **copy-to-clipboard links + toast**

---

## 🛠 Tech Stack

- Angular 21 (standalone components + new control flow)
- TypeScript
- RxJS
- Vitest (via `ng test`)
- GitHub Pages deploy (`gh-pages`)

---

## 🚀 Running Locally

From a terminal in the project root:

```bash
# 1. Install deps
npm install

# 2. Start dev server
npm run start
```

Open `http://localhost:4200/`.

---

## 🧩 Customization (Your Links + Profile)

Edit your content in [public/assets/site-config.json](public/assets/site-config.json).

Supports:

- `profile`: name, handle, bio, avatar
- `links[]`: label, url, emoji, description
- optional link extras:
	- `isNew: true` to show a “new” pill
	- `copyText` to copy text instead of navigating (shows a toast)

Notes:

- The app loads config from `assets/site-config.json` (relative), so it works correctly when deployed under a sub-path (GitHub Pages).
- Put images under `public/assets/` and reference them like `assets/avatar.jpg`.

---

## 🏗 Building

```bash
npm run build
```

Build output goes to `dist/`.

---

## 🧪 Tests

```bash
npm run test
```

---

## 🌍 Deploying (GitHub Pages)

Deploys happen automatically via GitHub Actions on every push to `main` (or `master`).

The workflow builds with `--base-href /<repo-name>/` automatically (based on the GitHub repository name).

If you haven’t yet, enable GitHub Pages in your repo settings:

- **Settings → Pages → Build and deployment → Source:** `Deploy from a branch`
- **Branch:** `gh-pages` (root)

This repo includes a deploy script that builds for production and publishes `dist/kawaii-linktree/browser` via `gh-pages`:

```bash
npm run deploy
```

If you’re deploying to a different repo name / sub-path and using the manual script, update the `--base-href` in the `deploy` script in [package.json](package.json).


