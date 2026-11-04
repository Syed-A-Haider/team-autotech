# T4 Completion Report

Phase T4: pages and shared pieces. A running document: each ticket appends its entry as it finishes, and the Summary and Major decisions are refreshed at the end of the phase. Facts come from git history, PR bodies and the docs. Anything that could not be verified goes at the bottom, not guessed.

## Summary

_Refreshed at the end of T4. Scope: the About page (T4.1), a branded 404 (T4.2) and the shared `ContactLinks` (T4.3)._

So far T4.1 is done (PR open). It added a static, deliberately unnumbered About page with clickable services, a shared `ui/SectionShell` for the service pages, and the root title template.

## Timeline

| Ticket | PR      | Merged | What it delivered                                                                                                                                                                                                                                                                                  |
| ------ | ------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T4.1   | this PR | TBC    | About page at `/about` (placeholder copy, unnumbered layout, all 15 services linked, trimmed Find Us). New `ui/SectionShell`, adopted by `ServiceSections`. `SectionHeading` and `EnquiryBand` moved to `ui/`. Root `title.template`. `YEARS_EXPERIENCE` constant. Snippet CTA now "More About Us" |
| T4.2   | TBC     | TBC    | Branded `not-found.tsx`. Not started                                                                                                                                                                                                                                                               |
| T4.3   | TBC     | TBC    | `ui/ContactLinks`. Not started                                                                                                                                                                                                                                                                     |

## Current state

Baseline at the start of T4 (after T3.10): 15 services (3 live, 12 coming-soon), routes `/` and `/services/[slug]` only, 195 Vitest tests in 37 files, 27 Playwright tests.

| After ticket     | Routes                    | Vitest         | Playwright | Notes                                                                                                               |
| ---------------- | ------------------------- | -------------- | ---------- | ------------------------------------------------------------------------------------------------------------------- |
| T3.10 (baseline) | `/`, `/services/[slug]`   | 195            | 27         |                                                                                                                     |
| T4.1             | adds `/about` (static, ○) | 216 (39 files) | 32         | +6 `SectionShell`, +13 About page, +1 `AboutSnippet`, +1 `SectionHeading` (`stripe` prop), +5 Playwright (`@about`) |

## Major decisions

| Decision                                                                                                                  | Reason                                                                                                                                                                  | Source                          |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| About is text-only and deliberately unnumbered: `PageHero`, facts panel, category cards, Find Us panel, `EnquiryBand`     | Numbered stripe-and-glow sections made it feel like a service page. No photos yet. `PageHero` was unused                                                                | T4.1 review                     |
| `SectionHeading` and `EnquiryBand` moved to `ui/` in their own rename commit                                              | About is a second consumer outside service pages                                                                                                                        | T4.1, approved by Haider        |
| New `ui/SectionShell` extracted, `ServiceSections` adopts it with same output                                             | The numbered-section shell was duplicated. No existing test changed                                                                                                     | T4.1                            |
| Root `title.template` `%s \| Team AutoTech`, literal kept                                                                 | Every service title gains the suffix. No test churn. Casing unified later                                                                                               | T4.1                            |
| "15+ years" approved, held in `YEARS_EXPERIENCE`                                                                          | One source so the snippet and About cannot drift. Homepage "family-run" stays unapproved                                                                                | T4.1                            |
| About copy is generated placeholder built from site facts and constants                                                   | Syd replaces and approves it before T6.3                                                                                                                                | T4.1                            |
| Every service on About links to its page, 12 coming-soon included, with no marker. Reverses the earlier "never deep-link" | The nav mega-menu already links all 15. Coming-soon pages are working enquiry pages, and `noindex` does not stop links. A marker would suggest services we do not offer | T4.1 review, approved by Haider |
| Find Us keeps address, hours and Get Directions only. Phone and email removed from About                                  | They duplicate the Footer on every page. The closing band has Call and WhatsApp. NAP is carried by the Footer                                                           | T4.1 review                     |

## Open items

Waiting on Syd:

- About page copy and facts (T4.1). The placeholder copy is listed here until he approves it. It must be approved before T6.3.

Technical:

- `WhyChooseUsSection` still hardcodes "15 years" in two strings. Move to `YEARS_EXPERIENCE` in a homepage ticket.
- `SectionShell` has one consumer (`ServiceSections`). Style strings (stripe panel, link rows) are copied between About, `FeatureSection` and `ServicesDropdown`. Share them if a third consumer appears.
- Copy changed at review: Find Us heading and intro, new facts panel strings. All placeholder, with Syd.
- The Playwright About tests were written after the page, so they were not seen failing first. The Vitest tests were red first.

## Follow-ups noticed and not touched

- `WhyChooseUsSection` has unsourced claims: "Authorised Ghost Immobiliser II Installer", "every job is backed by our guarantee" (T4.1).
- Brand casing is inconsistent: "Team AutoTech" (layout title, tests) vs "Team Autotech" (`siteConfig`, Footer, logo alt, About h1) (T4.1).
- `ABOUT_BLURB` uses " - " where an en dash or comma belongs (copy change, needs approval). The hyphen in `OPENING_HOURS` is accepted (T4.1).
- `ContactLine` external links have no "opens in a new tab" text, unlike `LinkButton` (T4.1).
- About has no contact block now, so it is not a `ContactLinks` consumer. The `T4.3` brief is updated.
- The WhatsApp widget overlaps the facts panel edge in the 375 and 768 px full-page screenshots. Probably a screenshot artefact. Glance at it in a real browser (T4.1).
- Fixed in docs at T4.1: `status.md` and `project.md` claimed the Footer links to `/#services`. It does not, and `/#services` is the 6-card Popular grid.

## Gotchas recorded in the docs during T4

- No services index exists and none is planned. `/#services` is the homepage Popular grid.
- The `layout.tsx` title template only applies to child segments, so the home page keeps the plain default.

## Not verified

- T4.1: the `ServiceSections` HTML was not diffed before and after the `SectionShell` refactor. The unmodified existing tests pass, and the build and the visual check at 375, 768 and 1280 px showed no overflow.
- Vercel preview, performance and accessibility audits.
