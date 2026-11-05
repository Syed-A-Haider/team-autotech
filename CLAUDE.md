# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Static Next.js 16 (App Router) + React 19 (React Compiler) + TypeScript + Tailwind v4 site, deployed on Vercel. Package manager is pnpm. No backend, no env vars.

## Commands

- `pnpm dev` / `pnpm build` / `pnpm start` (serves a build) / `pnpm lint`
- `pnpm test:unit` (Vitest, jsdom; `pnpm test:unit:watch` to watch). Single file: `pnpm test:unit src/lib/reviews.test.ts`, or add `-t "name"`.
- `pnpm test:e2e` (Playwright, runs Chromium and WebKit, starts `pnpm dev` itself). Single: `pnpm test:e2e tests/homepage.spec.ts`, `--grep @smoke` or `--project=webkit`. First time: `pnpm exec playwright install chromium webkit`. For a production check, run `pnpm build && pnpm start` first, Playwright reuses that server.
- `pnpm typecheck` runs `tsc --noEmit`.
- No format script. Prettier config exists (`.prettierrc`): `pnpm exec prettier --write <file>`. A PostToolUse hook (`.claude/hooks/format.mjs`) runs it on files Claude writes.
- Definition of done: lint, typecheck, test:unit, build, plus test:e2e when a page or route changes. `/verify` runs these. `/finish-ticket T#.#` wraps up a ticket (status, docs, PR draft).

## Gotchas

- Vitest resolves `@/*` via native `resolve.tsconfigPaths`. Do not add `vite-tsconfig-paths`.
- Vitest has no `globals: true`. `vitest.setup.ts` handles cleanup and jest-dom. Playwright specs in `tests/` are excluded from Vitest.
- The Server to Client boundary, `next/image` `fill`, JSX spread comments and `backdrop-filter` gotchas are in the Gotchas section of `docs/conventions.md` (imported below).

## Workflow

- Tests first (TDD). Never edit or delete a test to make it pass without asking.
- Stay inside the ticket. No new dependencies without asking. Flag changes to shared types (e.g. the `ServiceSection` union). List unrelated issues as follow-ups.
- Tickets are two-stage: a design review with no code, then wait for Haider's approval before implementing.
- Commit messages: `T#.# - Description`. Renames go in a separate commit.
- Never merge and never push to `main`. Haider reviews and merges.

## Docs

Read `docs/status.md` at the start of a session. `docs/README.md` indexes the rest (architecture, design, testing, data-and-content). Read only what the task needs. Code wins over docs when they disagree.

@docs/conventions.md
@docs/workflow.md

<!-- AGENTS.md holds the Next.js agent rules. `next dev` writes and updates it, so do not edit it by hand. Commit it if it changes. -->

@AGENTS.md
