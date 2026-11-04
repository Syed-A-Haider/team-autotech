# Docs index

Agent-facing notes for the Team Autotech rebuild. Read only what the task needs.

The code is the source of truth. If a doc and the code disagree, trust the code and say which doc is stale.

| File                      | Read when                                                                                                                                                      |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status.md`               | Start of every session: what is done, what is next, open items                                                                                                 |
| `workflow.md`             | Starting a ticket: Stage 1 and Stage 2 format, commits, PR, scope rules                                                                                        |
| `conventions.md`          | Writing or reviewing any component                                                                                                                             |
| `architecture.md`         | Adding routes or components, or touching the Server/Client boundary                                                                                            |
| `data-and-content.md`     | Touching services, constants, reviews, themes or section data                                                                                                  |
| `design.md`               | Any styling, token, layout or visual change                                                                                                                    |
| `testing.md`              | Writing tests or verifying UI                                                                                                                                  |
| `t3-completion-report.md` | History and decisions behind T3, read when you need the why                                                                                                    |
| `t4-completion-report.md` | Running record of T4 (pages and shared pieces): timeline, test counts, decisions, follow-ups. Append to it at the end of each T4 ticket                        |
| `dependency-upgrades.md`  | Upgrading `next` or another runtime dependency: safety net, baseline and snapshot, rollback, and the T4.5 record                                               |
| `project.md`              | Business context, stakeholder rules, confirmed product decisions                                                                                               |
| `tickets/`                | One short brief per ticket (for example `T4.1.md`), added by Haider before the ticket starts. Delete each one when its ticket is done                          |
| `content/`                | Source copy briefs from the old site, one per service, plus `_template.md` (new brief) and `_requests.md` (what to ask Syd, tracker for services with no copy) |

## Not included on purpose

- Scraped WordPress HTML pages. The three live services already have briefs in `content/`. Convert any other page to a short markdown brief when its ticket starts.
- Vercel course notes: learning notes, no project facts.

## Keeping these current

- End of every ticket: the steps are in `workflow.md`. The outcome lives in `status.md`.
- Each phase keeps one running completion report (`t#-completion-report.md`), appended at the end of every ticket in that phase. The T5 report is created at the end of T5.1.
- Keep files short. If one passes about 150 lines, split it or trim it.
