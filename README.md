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

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages
(https://seinetime-ai.github.io/dlp-wiki/) through `.github/workflows/deploy.yml`.
In the repo settings, Pages must use "GitHub Actions" as its source.

To move to a custom domain, set `url` to it and `baseUrl` to `/` in `docusaurus.config.ts`,
and add the domain under Settings › Pages.

## Out of scope for now

The AI assistant (Q&A chatbot and policy drafting) shown in the mockup will be added later.
