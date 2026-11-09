# dlp-wiki — NextDLP customer wiki (Docusaurus)

Workspace rules and the task pipeline: `C:\dev\CLAUDE.md` (`dlp-flow`). Writing or changing pages,
release notes included, goes through the skill `dlp-wiki-update` in this repo: it holds the writing
rules, the terminology and the reader pass.

## Commands

```powershell
npm install
npm run start       # local preview
npm run build       # must pass before any push
npm run typecheck
```

## Publishing

- A push to `main` deploys the public site (`.github/workflows/deploy.yml`). The site is read by
  customers, so push only after the user has seen the before/after (gate G4).
- If the deploy run fails at the infrastructure level, an empty commit re-triggers it.

## Layout

- `docs/<area>/`: `getting-started`, `classification`, `data`, `endpoints`, `admin`, `organization`,
  `integrations`, `operations`, `releases`.
- `blog/`: release notes, `YYYY-MM-DD-nextdlp-<version>.mdx`; authors in `blog/authors.yml`.

## Never on the wiki

Measured performance, AI model or runtime names, third-party library names, internal file paths,
anything about a customer. Details and the rest of the rules: `dlp-wiki-update`.
