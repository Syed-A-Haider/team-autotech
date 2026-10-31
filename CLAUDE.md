# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Static Next.js 16 (App Router) + React 19 (React Compiler) + TypeScript + Tailwind v4 site, deployed on Vercel. Package manager is pnpm. No backend, no env vars.

## Commands

- `pnpm dev` / `pnpm build` / `pnpm lint`
- `pnpm test:unit` (Vitest, jsdom). Single file: `pnpm test:unit src/lib/reviews.test.ts`, or add `-t "name"`.
- `pnpm test:e2e` (Playwright, starts `pnpm dev` itself). Single: `pnpm test:e2e tests/smoke.spec.ts` or `--grep @smoke`.
- `pnpm typecheck` runs `tsc --noEmit`.
- No format script. Prettier config exists (`.prettierrc`): `pnpm exec prettier --write <file>`.
- Definition of done: lint, typecheck, test:unit, build, plus test:e2e when a page or route changes. `/verify` runs these.

## Gotchas

- Vitest resolves `@/*` via native `resolve.tsconfigPaths`. Do not add `vite-tsconfig-paths`.
- Vitest has no `globals: true`. `vitest.setup.ts` handles cleanup and jest-dom. Playwright specs in `tests/` are excluded from Vitest.
- Functions and `LucideIcon` cannot cross the Server to Client boundary. Pass a trimmed serialisable shape (see `Navbar` to `MobileMenu`).
- A `//` comment directly above a JSX spread attribute breaks the Next compiler.
- `backdrop-filter`/`filter` on an ancestor traps `position: fixed` children.
- `next/image` with `fill` needs a positioned parent.

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
