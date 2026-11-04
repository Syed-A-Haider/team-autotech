# T4 Completion Report

Phase T4: pages and shared pieces. A running document: each ticket appends its entry as it finishes, and the Summary and Major decisions are refreshed at the end of the phase. Facts come from git history, PR bodies and the docs. Anything that could not be verified goes at the bottom, not guessed.

## Summary

_Refreshed at the end of T4. Scope: the About page (T4.1), a branded 404 (T4.2) and the shared `ContactLinks` (T4.3)._

So far T4.1 is done (PR open). It added a static About page, a shared `ui/SectionShell` used by both About and the service pages, and the root title template.

## Timeline

| Ticket | PR      | Merged | What it delivered                                                                                                                                                                                                                      |
| ------ | ------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T4.1   | this PR | TBC    | About page at `/about` (placeholder copy). New `ui/SectionShell`, adopted by `ServiceSections`. `SectionHeading` and `EnquiryBand` moved to `ui/`. Root `title.template`. `YEARS_EXPERIENCE` constant. Snippet CTA now "More About Us" |
| T4.2   | TBC     | TBC    | Branded `not-found.tsx`. Not started                                                                                                                                                                                                   |
| T4.3   | TBC     | TBC    | `ui/ContactLinks`. Not started                                                                                                                                                                                                         |

## Current state

Baseline at the start of T4 (after T3.10): 15 services (3 live, 12 coming-soon), routes `/` and `/services/[slug]` only, 195 Vitest tests in 37 files, 27 Playwright tests.

| After ticket     | Routes                    | Vitest         | Playwright | Notes                                                                          |
| ---------------- | ------------------------- | -------------- | ---------- | ------------------------------------------------------------------------------ |
| T3.10 (baseline) | `/`, `/services/[slug]`   | 195            | 27         |                                                                                |
| T4.1             | adds `/about` (static, ○) | 214 (39 files) | 31         | +6 `SectionShell`, +12 About page, +1 `AboutSnippet`, +4 Playwright (`@about`) |

## Major decisions

| Decision                                                                      | Reason                                                                                                   | Source                   |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------ |
| About is text-only: flat `PageHero`, three numbered sections, `EnquiryBand`   | No photos yet. `PageHero` was built for simple pages and was unused. `ServiceHero` needs image and theme | T4.1                     |
| `SectionHeading` and `EnquiryBand` moved to `ui/` in their own rename commit  | About is a second consumer outside service pages                                                         | T4.1, approved by Haider |
| New `ui/SectionShell` extracted, `ServiceSections` adopts it with same output | The numbered-section shell was duplicated. No existing test changed                                      | T4.1                     |
| Root `title.template` `%s \| Team AutoTech`, literal kept                     | Every service title gains the suffix. No test churn. Casing unified later                                | T4.1                     |
| "15+ years" approved, held in `YEARS_EXPERIENCE`                              | One source so the snippet and About cannot drift. Homepage "family-run" stays unapproved                 | T4.1                     |
| About copy is generated placeholder built from site facts and constants       | Syd replaces and approves it before T6.3                                                                 | T4.1                     |
| About links to `/#services`, never to individual services                     | 12 of 15 services are noindex. There is no services index and none is planned                            | T4.1                     |

## Open items

Waiting on Syd:

- About page copy and facts (T4.1). The placeholder copy is listed here until he approves it. It must be approved before T6.3.

Technical:

- `WhyChooseUsSection` still hardcodes "15 years" in two strings. Move to `YEARS_EXPERIENCE` in a homepage ticket.
- About section 03: the intro line sits in the left body column, away from its right-hand heading.
- The Playwright About tests were written after the page, so they were not seen failing first. The Vitest tests were red first.

## Follow-ups noticed and not touched

- `WhyChooseUsSection` has unsourced claims: "Authorised Ghost Immobiliser II Installer", "every job is backed by our guarantee" (T4.1).
- Brand casing is inconsistent: "Team AutoTech" (layout title, tests) vs "Team Autotech" (`siteConfig`, Footer, logo alt, About h1) (T4.1).
- `ABOUT_BLURB` uses " - " where an en dash or comma belongs (copy change, needs approval). The hyphen in `OPENING_HOURS` is accepted (T4.1).
- `ContactLine` external links have no "opens in a new tab" text, unlike `LinkButton` (T4.1).
- After T4.3, swap About's contact rows to `ContactLinks` (T4.1).
- Fixed in docs at T4.1: `status.md` and `project.md` claimed the Footer links to `/#services`. It does not, and `/#services` is the 6-card Popular grid.

## Gotchas recorded in the docs during T4

- No services index exists and none is planned. `/#services` is the homepage Popular grid.
- The `layout.tsx` title template only applies to child segments, so the home page keeps the plain default.

## Not verified

- T4.1: the `ServiceSections` HTML was not diffed before and after the `SectionShell` refactor. The unmodified existing tests pass, and the build and the visual check at 375, 768 and 1280 px showed no overflow.
- Vercel preview, performance and accessibility audits.
