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

Each version gets a release announcement in `blog/` (served at `/releases`, with RSS and Atom
feeds), in the style of a project news post: greeting, `{/* truncate */}`, an inline table of
contents, then `## Tính năng mới và thay đổi chính` (with `###` topics), `## Sửa lỗi đáng chú ý`,
`## Lưu ý khi nâng cấp`, `## Kế hoạch tiếp theo`, `## Lời kết`. Versions follow
MAJOR.MINOR.PATCH (see `docs/releases/index.md`). For a new release:

1. While it is in progress, add `blog/<date>-nextdlp-<version>.mdx` with `slug: nextdlp-<version>`
   and the title "Sắp ra mắt NextDLP <version>", plus the "Chưa phát hành" note.
2. On release day, keep the slug (links stay valid), rename the file and set the date to the release
   date, change the title to "NextDLP <version> phát hành" and remove the note.
3. Update the version table in `docs/releases/index.md` and move fixed items out of
   `docs/releases/known-issues.md`.

When a page moves, add a redirect in `docusaurus.config.ts` so links already sent keep working.

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages
(https://seinetime-ai.github.io/dlp-wiki/) through `.github/workflows/deploy.yml`.
In the repo settings, Pages must use "GitHub Actions" as its source.

To move to a custom domain, set `url` to it and `baseUrl` to `/` in `docusaurus.config.ts`,
and add the domain under Settings › Pages.

## Out of scope for now

The AI assistant (Q&A chatbot and policy drafting) shown in the mockup will be added later.
