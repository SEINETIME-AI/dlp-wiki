# dlp-wiki

Public product documentation site for NextDLP (install, uninstall, usage, release notes).
It is a standalone static website built with [Docusaurus](https://docusaurus.io/) and has no
runtime dependency on the agent, backend or Console.

## Develop

```bash
npm install
npm start        # dev server on http://localhost:3000
npm run build    # static site in build/
npm run serve    # preview the production build
```

Requires Node.js 20+.

## Writing docs

Pages live in `docs/<group>/<page>.md`. Each folder is a sidebar group whose label and order
come from its `_category_.json`; pages are ordered by `sidebar_position` in their front matter.
Content is in Vietnamese.

## Release notes

Each version has its own page in `docs/releases/`, named after the version (`1.1.0.md`), newest
with the lowest `sidebar_position`. Versions follow MAJOR.MINOR.PATCH (see `docs/releases/index.md`).
For a new release:

1. Copy the latest page to `docs/releases/<version>.md`, set `title: NextDLP <version>` and
   `sidebar_label: <version> (sắp phát hành)` until it ships.
2. Start with the table (Ngày phát hành, Trạng thái, Nâng cấp từ), then themed `##` sections,
   then `## Lưu ý khi nâng cấp` and `## Đọc tiếp`.
3. Add a row to the table in `docs/releases/index.md`; on release day set the date, drop
   "(sắp phát hành)" from the label and mark the previous version as no longer current.
4. Point "phiên bản <version>" links in other pages at the new page; move fixed items out of
   `known-issues.md`.

When a page is renamed, add a redirect in `docusaurus.config.ts` so links already sent keep working.

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages
(https://seinetime-ai.github.io/dlp-wiki/) through `.github/workflows/deploy.yml`.
In the repo settings, Pages must use "GitHub Actions" as its source.

To move to a custom domain, set `url` to it and `baseUrl` to `/` in `docusaurus.config.ts`,
and add the domain under Settings › Pages.

## Out of scope for now

The AI assistant (Q&A chatbot and policy drafting) shown in the mockup will be added later.
