# Workflow

Two-stage process for every ticket. Haider reviews and merges. Never merge, and never push to `main`.

## Before starting

1. Read `status.md` and the ticket brief in `tickets/`.
2. Read only the other docs the ticket touches (see `README.md`).
3. Read the existing code the ticket touches. Reuse what exists before creating anything.

## Stage 1: design review (no code)

Reply with:

1. **What it is.** One or two plain sentences: what it does and how it behaves on the site.
2. **Architecture review.** A short table (Decision | Choice | Why) checked against `conventions.md`: file location and naming, Server vs Client, props shape, exports, accessibility, reusability, consistency with components already built.
3. **Open questions.** Only genuine product or business calls that conventions cannot answer. Decide everything else and explain why. Plain numbered list.
4. **Concise summary.** Plain-vocabulary explanation of the good practices being followed and why, written for someone learning.

Then stop and wait for answers. Write no implementation code until Haider approves.

## Stage 2: implementation (only after approval)

1. Work in dependency order (build an internal dependency before the component that uses it).
2. Tests first: write them from the approved spec, run them, confirm they fail for the right reason, then implement. See `testing.md`.
3. Give full code for every file. Colocate Vitest and RTL tests as `Component.test.tsx`.
4. Run the gates in `testing.md` and fix failures. For visual changes, check screenshots at 375, 768 and 1280 px.
5. Commit with `T#.# - Description`. Renames go in a separate commit from feature work.

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
- Delete the ticket brief from `tickets/`.
