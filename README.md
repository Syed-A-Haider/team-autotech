# Team Autotech

A rebuild of teamautotech.co.uk from WordPress to a fully static Next.js site on Vercel. Team Autotech is a vehicle remapping, ECU programming, immobiliser, tracker and auto electrical business in Nelson, Lancashire.

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. The package manager is pnpm.

## Commands

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build
pnpm lint
pnpm typecheck
pnpm test:unit    # Vitest
pnpm test:e2e     # Playwright (Chromium and WebKit), starts pnpm dev itself
```

First time only: `pnpm exec playwright install chromium webkit` downloads the two test browsers.

## Docs

- `CLAUDE.md`: project rules and workflow.
- `docs/README.md`: index of the project docs. Start with `docs/status.md`.
