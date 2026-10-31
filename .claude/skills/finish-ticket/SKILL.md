---
name: finish-ticket
description: Wrap up a ticket per docs/workflow.md "End of ticket": run the gates, update status.md, file new decisions in the right doc, delete the ticket brief, and draft the PR description. Usage - /finish-ticket T3.4
disable-model-invocation: true
---

Finish ticket `$ARGUMENTS` (for example `T3.4`). If no ticket id is given, ask for it.

Read `docs/workflow.md` ("Pull request description" and "End of ticket") and `docs/status.md` first.

1. **Gates.** Run the `/verify` gates. If any fail, report and stop. Never edit or delete a test to make it pass.
2. **Update `docs/status.md`.**
   - Move the ticket from Next to Done with a one-line summary in the existing style.
   - Set the next ticket under Next (taken from the Remaining table), and remove it from Remaining.
   - Update the "Last updated" line (today's date, after this ticket).
   - Adjust Open items only for things this ticket actually changed or discovered.
3. **File decisions.** If the ticket introduced a decision or gotcha, add it to the doc it belongs to (`conventions.md`, `architecture.md`, `testing.md`, `data-and-content.md`, `design.md`). Keep each doc under about 150 lines. If nothing new came up, add nothing.
4. **Delete the ticket brief** from `docs/tickets/` (the file for this ticket only).
5. **Commit** the doc changes as `T#.# - Update status and docs`. Do not mix them with feature code.
6. **Draft the PR description** in the format from `workflow.md`: concise plain prose, no tables, covering what changed, key decisions with brief reasoning, files touched, testing summary, open items, and follow-ups. Print it for review.

Do not push, open a PR, or merge unless the user asks. Never merge and never push to `main`; Haider reviews and merges.
