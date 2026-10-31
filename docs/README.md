# Docs index

Agent-facing notes for the Team Autotech rebuild. Read only what the task needs.

The code is the source of truth. If a doc and the code disagree, trust the code and say which doc is stale.

| File                  | Read when                                                               |
| --------------------- | ----------------------------------------------------------------------- |
| `status.md`           | Start of every session: what is done, what is next, open items          |
| `workflow.md`         | Starting a ticket: Stage 1 and Stage 2 format, commits, PR, scope rules |
| `conventions.md`      | Writing or reviewing any component                                      |
| `architecture.md`     | Adding routes or components, or touching the Server/Client boundary     |
| `data-and-content.md` | Touching services, constants, reviews, themes or section data           |
| `design.md`           | Any styling, token, layout or visual change                             |
| `testing.md`          | Writing tests or verifying UI                                           |
| `project.md`          | Business context, stakeholder rules, confirmed product decisions        |
| `tickets/`            | The brief for the ticket in progress                                    |

## Not included on purpose

- Scraped WordPress HTML pages: source copy for T3.6 to T3.8. Convert the relevant one to a short markdown brief when that ticket starts.
- Vercel course notes: learning notes, no project facts.

## Keeping these current

- End of every ticket: update `status.md`. Add any new decision or gotcha to the file it belongs to.
- Delete the ticket brief from `tickets/` once merged. The outcome lives in `status.md`.
- Keep files short. If one passes about 150 lines, split it or trim it.
