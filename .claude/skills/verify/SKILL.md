---
name: verify
description: Run the project's definition-of-done gates (lint, typecheck, unit tests, build, and e2e when a page or route changed) and report results. Use before declaring a ticket done.
---

Run these in order and stop at the first failure to report it:

1. `pnpm lint`
2. `pnpm typecheck`
3. `pnpm test:unit`
4. `pnpm build`
5. `pnpm test:e2e` only if a page or route changed (check `git diff --stat` against `main` for `src/app/**`), or if the user asks for an end-of-phase check.

Rules:

- Report each gate as pass or fail with the relevant error output. Do not claim success for a gate you did not run.
- Never edit or delete a test to make a gate pass. If a test fails, report it and ask.
- Do not fix unrelated failures. List them as follow-ups.
