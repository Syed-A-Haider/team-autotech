# Dependency upgrades

How to upgrade `next` (or any runtime dependency) without breaking the site, and what T4.5 learned doing it. Read this before the next upgrade.

## Rules

- A dependency upgrade is its own ticket and its own PR. Never fold it into feature or sweep work.
- `next` and `eslint-config-next` are exact pins and move together. Take the latest patched release, chosen from the GitHub release notes. `pnpm audit` lags behind them (16.4.5 listed seven advisories the audit database did not have yet).
- No codemod unless the major version changes. No `overrides` in `pnpm-workspace.yaml` without Haider's approval. No unrelated dependency in the same PR.
- The deployed app uses the React that Next bundles. The installed `react` package only feeds Vitest and RTL, so bumping it changes the test environment and is a separate ticket.
- Never edit or delete a test to make the upgrade pass. If one fails, report it and ask.

## Before touching `package.json`

1. Make the safety net: a local tag on the commit you start from (T4.5 used `pre-T4.5`, never pushed) and copies of `package.json`, `pnpm-lock.yaml` and `pnpm-workspace.yaml` outside the repo.
2. Take a baseline of the current build, outside the repo: `pnpm audit --prod --json`, lint, typecheck, unit tests, `pnpm build` (route table), a count of `react.memo_cache_sentinel` in `.next/static/chunks` (shows the React Compiler ran) and the size of `.next/static`.
3. Snapshot the running site with a throwaway Playwright script (import `@playwright/test` through `createRequire` pointed at the repo, so nothing is copied into the repo). Record for every route plus `/nope`, `/services` and `/services/not-a-slug`: status, headers, head metadata, heading outline, landmarks, image attributes, link hrefs, `main` text, console errors, requested hosts and the raw HTML. Also: every `/_next/image` URL (send a browser `Accept` header, or you get jpeg and png instead of webp), the font files, the video facade (hosts before and after the click) and screenshots at 375, 768 and 1280 px.
4. Run the snapshot twice on the same build. The difference between the two runs is the noise floor. Anything inside it is not a regression.
5. Run it against `pnpm start -H 127.0.0.1` and `pnpm dev -H 127.0.0.1`, plus the Playwright suite against each. Keep servers on loopback while the installed version has open advisories. Stop them by PID (`Stop-Process -Id`), never `taskkill node.exe`.
6. Dry run the resolution in a scratch copy of the three files: `pnpm add -E next@<v> --lockfile-only`, then `pnpm audit --prod`. This shows which advisories the bump clears and which transitive ones are left.

## Upgrade

Commits, each followed by `/verify`:

1. Bump the packages (`pnpm add -E next@<v>`, `pnpm add -D -E eslint-config-next@<v>`). Check that the lockfile diff only touches the expected families.
2. If the audit still shows transitive advisories, refresh just those packages (`pnpm update <pkg>`). That changes the lockfile only and stays inside the ranges the parents declare.
3. Fix-ups for anything the upgrade broke, in their own commit.
4. Docs: `status.md`, the phase completion report, this file if the process changed.

## After

- Run the gates in order, then the Playwright suite against a clean production build (`rm -rf .next` first, or cached output hides problems) and against `pnpm dev`.
- Rerun the snapshot and diff it against the baseline. Expected differences: chunk names and hashes, the number and content of `<script>` elements, build id, generated CSS class names. Everything else is a regression until explained. Compare markup outside `<script>` elements, with generated names normalised.
- Read the dev and build logs for upgrade notices, and check `git status` for files the tools created on their own.
- Check the Vercel preview: the build log shows the new version and the same static routes, and the pages, images, video facade and mobile menu behave.

## Rollback

- Before merge: drop the branch. `main` is untouched.
- After merge: `git revert <merge sha>`, then `pnpm install --frozen-lockfile`. On Vercel, promote the previous production deployment for an instant fix.
- T4.5 rehearsed both. Reverting the three commits gives a tree identical to the tag. A frozen install of the tagged lockfile restored 16.3.0 in 7 seconds and it built with the same routes.

## T4.5 record: next 16.3.0 to 16.4.5 (2026-11-04)

| Check                   | Result                                                                                                                                                                                          |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm audit --prod`     | 17 (5 critical, 6 high, 5 moderate, 1 low) to 2 high after the bump, to 0 after the `nanoid` and `source-map-js` refresh                                                                        |
| `pnpm audit` (all deps) | 53 to 36 findings, none new. The 36 left are dev-only tooling that is not shipped (`undici`, `vite`, `brace-expansion`, `@vitest/mocker`, `zod`, `minimatch`, `js-yaml`) and were already there |
| Lockfile                | next, `@next/*`, `@swc/helpers`, sharp 0.35.3 to 0.35.5 with its `@img/*` binaries, eslint-config-next, nanoid 3.3.17 to 3.3.20, source-map-js 1.2.1 to 1.2.2. Nothing else                     |
| lint, typecheck, build  | Pass. 0 lint problems, so no new rule fires. Same route table, 20 static pages                                                                                                                  |
| Vitest                  | 231 tests in 42 files, unchanged                                                                                                                                                                |
| Playwright              | 36 of 36 against production and 36 of 36 against dev, unchanged                                                                                                                                 |
| React Compiler          | Marker count 9 in 3 chunks before and after                                                                                                                                                     |
| Static assets           | 900,158 to 901,439 bytes (+0.14%), same file counts                                                                                                                                             |
| Pages                   | 20 routes: status, headers, metadata, headings, landmarks, image attributes, links, text, console and hosts all identical                                                                       |
| Markup                  | Identical outside `<script>` elements once generated class names are normalised                                                                                                                 |
| Screenshots             | 18 (6 pages at 3 widths), pixel-identical                                                                                                                                                       |
| `/_next/image`          | 60 URLs, all 200 webp, byte-identical output (3,830,434 bytes) despite the sharp bump                                                                                                           |
| Video facade            | No request beyond the site's own host before the click, player from `youtube-nocookie.com` after, focus moves into it                                                                           |

### What changed under the hood

- Generated CSS Module class names are shorter, for example `WhyChooseUsSection-module__gUzrRG__row` is now `gUzrRG_row`, and the `next/font` class on `<html>` likewise. The site had one CSS Module (`WhyChooseUsSection.module.css`) until T5.6 deleted it, so it has none now. Do not assert on generated class names in tests.
- Font files are renamed with a different hash scheme. The seven Inter files are byte-identical to 16.3.0 (checked by hashing both builds).
- Turbopack changes its bootstrap and the React Server Components payload (shared runtime chunk, one more `<script>`, no `crossorigin` on the loader). Chunk names and ids change on every build anyway.
- In dev, `cache-control` is `no-store` (was `no-cache, must-revalidate`). Production `cache-control` is unchanged.
- `next dev` now writes its agent rules to a root `AGENTS.md` and no longer touches `CLAUDE.md`. `CLAUDE.md` imports it with `@AGENTS.md`. `next dev` rewrites `AGENTS.md` itself when the installed version changes its text, so nobody edits it by hand. Commit the change if one appears. The generated file passes Prettier, so the format hook cannot start a rewrite loop. A second `next dev` run leaves both files untouched.
- After a click, the YouTube player requests `www.google.com` as well. That is the player's own traffic, not the site's.

### Not verified

- The Vercel preview (Haider checks it).
- That a fresh Claude Code session loads `AGENTS.md` through the `@AGENTS.md` import. It uses the same syntax as the docs imports beside it.
- Browsers other than Chromium (T7.1) and performance or accessibility audits (T7).
- The snapshot and compare scripts were throwaway and are not in the repo. If upgrades become routine, turning them into a repo script is a follow-up.
