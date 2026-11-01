# Workflow

Two-stage process for every ticket. Haider reviews and merges. Never merge, and never push to `main`.

## Before starting

1. Read `status.md` and the ticket brief in `tickets/`.
2. Read only the other docs the ticket touches (see `README.md`).
3. Read the existing code the ticket touches. Reuse what exists before creating anything.

## Stage 1 — Design & Architecture Review (first response to a new ticket)

Do not write implementation code yet.

**Gather context first (silently, before responding):**

- Read the ticket's row and the Remaining table in `status.md`.
- Read the ticket's section in the phase specs doc (e.g. `T3.md`) under docs/tickets if one exists.
- Read `status.md` for open items and gotchas that touch this ticket, plus the docs for any existing files it builds on (types, data, sibling components).
- If something the ticket depends on is missing, or two docs disagree, say so under Open questions instead of guessing. Where docs conflict, code wins, then `status.md`.

Then respond with:

1. **What it is** — one or two plain-language sentences: what this component/feature does and how it behaves on the site.
2. **Spec check** — one or two lines: does a spec section already exist, what does it cover, and what is missing or out of date.
3. **Architecture review** — check the task against `conventions.md`: file location/naming, Server vs Client, props shape, exports, accessibility, reusability/scalability, consistency with components already built. Present as a short table (Decision | Choice | Why).
4. **Open questions** — ask only where a genuine product/business call is needed that can't be inferred from convention or the docs (e.g. "should this be promoted," "what should the client see"). Don't ask about anything resolvable via `conventions.md` or the project docs — decide it and explain why. Plain numbered list, not interactive buttons — a written response with reasoning follows.
5. **Draft spec** — the ticket's spec section in the phase specs format (Status, Purpose, Depends on, Files, Props / data shape, Behaviour, Accessibility, Tests, Out of scope, Decisions), as a single markdown code block ready to paste into the specs doc. Mark anything unresolved as an open question.
6. **Concise summary** — short, plain-vocabulary explanation of which good practices are being followed and why, written for someone learning rather than an expert.

Planning tips:

- Delegate the plan to the Plan agent on the strongest model (Fable). Give it verified facts (union fields, earlier decisions, tests that will have to change) so it does not re-derive them, then review its output before presenting it.
- Flag any existing test that asserts a placeholder (for example "renders nothing until T#.#"). It must change, and changing it needs approval in Stage 1.

Wait for confirmation/answers before implementing. Once the questions are answered, give the final spec once more, in full, with the answers folded in, so it can be saved before Stage 2.

**Content tickets** (data edits only, no new components): skip the full review. Confirm the source copy, section order and variants, and live vs coming-soon status, then go straight to the data changes.

In Stage 2, implement exactly what the saved spec says. If the code needs to deviate, say so explicitly and say why.

## Stage 2: implementation (only after approval)

1. Work in dependency order (build an internal dependency before the component that uses it).
2. Tests first: write them from the approved spec, run them, confirm they fail for the right reason, then implement. See `testing.md`. Create minimal stubs first so red tests fail on assertions, not on missing imports. Use a smaller model (Sonnet) for Stage 2.
3. Give full code for every file. Colocate Vitest and RTL tests as `Component.test.tsx`.
4. Run the gates in `testing.md` and fix failures. For visual changes, check screenshots at 375, 768 and 1280 px:
   - No service has section data until the content tickets. Add temporary `sections` and `status: 'live'` to one service in `lib/services.ts`, marked `TEMP-VISUAL`. Revert with `git checkout src/lib/services.ts` and grep to confirm none is left.
   - Use a throwaway Playwright script outside the repo. Import from `@playwright/test` (not `playwright`) and run it with the repo as working directory, then delete the copy.
   - Use `waitUntil: 'load'`, not `networkidle` (a production build keeps prefetching). Scope locators to `main`, because the Navbar has its own `<summary>`. The sticky Navbar appearing mid-page in a full-page screenshot is an artefact.
   - For network checks, use `pnpm build` then `pnpm start`. Stop the server by its PID on port 3000. Never `taskkill node.exe`.
5. Commit with `T#.# - Description`. Renames go in a separate commit from feature work. Stage explicit paths and leave out anything not in the ticket.

## Pull request description (ticket documentation)

Concise plain prose, no tables. Cover:

- What changed
- Key decisions, with brief reasoning
- Files touched
- Testing summary
- Open items
- Follow-ups: anything noticed but deliberately not touched

## Scope rules

- Stay inside the ticket. Do not refactor, rename or research unrelated code.
- If something unrelated looks wrong, list it under Follow-ups instead of fixing it.
- Do not add dependencies without asking.
- Never edit or delete a test to make it pass without asking.
- Do not change a shared type (for example the `ServiceSection` union) without flagging it in Stage 1.
- Delegate codebase searches to the Explore agent instead of reading many files yourself.

## Review loop

- Haider checks the PR diff and the Vercel preview, then asks for targeted fixes.
- Fix with the smallest diff. Send or make only the changed lines, not a rewrite.
- Keep existing comments intact when rewriting a file. New comments are short and plain.
- Temporary design variants for Syd's approval are removed once a direction is confirmed.

## End of ticket

- Update `status.md`: move the ticket to Done, set the next ticket, adjust open items.
- Add any new decision or gotcha to the doc it belongs to.
- Delete the ticket brief from `tickets/`. If the spec file covers several tickets (`T3.md`), delete only this ticket's section.
