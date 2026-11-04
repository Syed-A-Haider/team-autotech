# T4 Completion Report

Phase T4: pages and shared pieces. A running document: each ticket appends its entry as it finishes, and the Summary and Major decisions are refreshed at the end of the phase. Facts come from git history, PR bodies and the docs. Anything that could not be verified goes at the bottom, not guessed.

## Summary

_Refreshed at the end of T4. Scope: the About page (T4.1), a branded 404 (T4.2) and the shared `ContactLinks` (T4.3)._

T4 is done. T4.1 added a static, deliberately unnumbered About page with clickable services, a shared `ui/SectionShell` for the service pages, and the root title template. T4.2 added the branded 404 and removed the lint warning for the unused review count import. T4.3 added `ui/ContactLinks` (Call and WhatsApp buttons, hrefs from `constants.ts`), which the shared `EnquiryBand` now renders for all three closing bands.

## Timeline

| Ticket | PR      | Merged | What it delivered                                                                                                                                                                                                                                                                                  |
| ------ | ------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T4.1   | this PR | TBC    | About page at `/about` (placeholder copy, unnumbered layout, all 15 services linked, trimmed Find Us). New `ui/SectionShell`, adopted by `ServiceSections`. `SectionHeading` and `EnquiryBand` moved to `ui/`. Root `title.template`. `YEARS_EXPERIENCE` constant. Snippet CTA now "More About Us" |
| T4.2   | this PR | TBC    | Branded `not-found.tsx` (faded 404, stripe, h1, one button). `STRIPE_STYLES` exported. New `not-found.spec.ts`. No `/services` index or redirect, by decision. Unused `GOOGLE_REVIEW_COUNT` import removed                                                                                         |
| T4.3   | this PR | TBC    | `ui/ContactLinks` (Call and WhatsApp, no email), rendered by `EnquiryBand`. Number visible from `sm` up. `CALL_LABEL` and `WHATSAPP_LABEL` moved into it. One `EnquiryBand.test.tsx` edit, approved                                                                                                |

## Current state

Baseline at the start of T4 (after T3.10): 15 services (3 live, 12 coming-soon), routes `/` and `/services/[slug]` only, 195 Vitest tests in 37 files, 27 Playwright tests.

| After ticket     | Routes                         | Vitest         | Playwright | Notes                                                                                                               |
| ---------------- | ------------------------------ | -------------- | ---------- | ------------------------------------------------------------------------------------------------------------------- |
| T3.10 (baseline) | `/`, `/services/[slug]`        | 195            | 27         |                                                                                                                     |
| T4.1             | adds `/about` (static, ○)      | 216 (39 files) | 32         | +6 `SectionShell`, +13 About page, +1 `AboutSnippet`, +1 `SectionHeading` (`stripe` prop), +5 Playwright (`@about`) |
| T4.2             | adds `/_not-found` (static, ○) | 222 (40 files) | 37         | +6 `NotFound`, +5 Playwright (`@notfound`)                                                                          |
| T4.3             | no change                      | 229 (41 files) | 37         | +7 `ContactLinks`. No new route or Playwright spec                                                                  |

## Major decisions

| Decision                                                                                                                  | Reason                                                                                                                                                                                                                 | Source                          |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| About is text-only and deliberately unnumbered: `PageHero`, facts panel, category cards, Find Us panel, `EnquiryBand`     | Numbered stripe-and-glow sections made it feel like a service page. No photos yet. `PageHero` was unused                                                                                                               | T4.1 review                     |
| `SectionHeading` and `EnquiryBand` moved to `ui/` in their own rename commit                                              | About is a second consumer outside service pages                                                                                                                                                                       | T4.1, approved by Haider        |
| New `ui/SectionShell` extracted, `ServiceSections` adopts it with same output                                             | The numbered-section shell was duplicated. No existing test changed                                                                                                                                                    | T4.1                            |
| Root `title.template` `%s \| Team AutoTech`, literal kept                                                                 | Every service title gains the suffix. No test churn. Casing unified later                                                                                                                                              | T4.1                            |
| "15+ years" approved, held in `YEARS_EXPERIENCE`                                                                          | One source so the snippet and About cannot drift. Homepage "family-run" stays unapproved                                                                                                                               | T4.1                            |
| About copy is generated placeholder built from site facts and constants                                                   | Syd replaces and approves it before T6.3                                                                                                                                                                               | T4.1                            |
| Every service on About links to its page, 12 coming-soon included, with no marker. Reverses the earlier "never deep-link" | The nav mega-menu already links all 15. Coming-soon pages are working enquiry pages, and `noindex` does not stop links. A marker would suggest services we do not offer                                                | T4.1 review, approved by Haider |
| Find Us keeps address, hours and Get Directions only. Phone and email removed from About                                  | They duplicate the Footer on every page. The closing band has Call and WhatsApp. NAP is carried by the Footer                                                                                                          | T4.1 review                     |
| No `/services` index and no redirect from `/services`                                                                     | Services are reachable from the Navbar, the homepage Popular grid and the About page. A redirect would be a lasting routing rule for a page nobody links to. `/services` is a normal 404                               | T4.2, decided by Haider         |
| 404 has one button ("Back to home"), no "View our services"                                                               | `/#services` is only the 6-card Popular grid, and a second button would repeat the first                                                                                                                               | T4.2, decided by Haider         |
| `metadata.title` exported from `not-found.tsx`                                                                            | Next 16.3 reads it and the root template applies. Confirmed on a production build: "Page not found \| Team AutoTech", one `noindex`, HTTP 404. No segment config is exported, because it does not apply to `not-found` | T4.2                            |
| 404 Playwright tests in their own `not-found.spec.ts` with an `@notfound` tag                                             | A spec per page or feature, not per phase. Deviates from the T4.2 brief, approved by Haider                                                                                                                            | T4.2                            |
| `STRIPE_STYLES` exported from `SectionHeading`                                                                            | A second consumer (the 404). Same precedent as `GLOW_STYLES`                                                                                                                                                           | T4.2                            |
| `GOOGLE_REVIEW_COUNT` kept, unused import removed                                                                         | The constant feeds `GOOGLE_REVIEW_COUNT_DISPLAY`. `WhyChooseUsSection` imported the raw count but only uses the display value. Keep the constant for the motion phase                                                  | T4.2                            |
| `ContactLinks` composes `LinkButton`, not `ContactLine`                                                                   | The closing bands want button actions. `ContactLine` stays the text-row primitive for the Footer and Find Us                                                                                                           | T4.3                            |
| Call and WhatsApp only, no email button. Reverses the brief's three-channel idea                                          | Email is hardly used by the target audience or Syd, and the address stays in the Footer. Fewer buttons, less repeated from the Footer                                                                                  | T4.3, decided by Haider         |
| Call is the mobile number, and the number shows as text only from `sm` up                                                 | Syd always uses that phone. Desktop visitors have no dialler, so they need to read it. On phones the button is tapped, so the number is hidden (`hidden sm:inline`)                                                    | T4.3, decided by Haider         |
| `ContactLinks` takes `className` only. Fixed `lg` size, variants fixed per channel                                        | One consumer, so no size or variant prop yet. `EnquiryBand` passes the stacking layout                                                                                                                                 | T4.3                            |
| `CALL_LABEL` and `WHATSAPP_LABEL` moved from `EnquiryBand` to `ContactLinks`                                              | Copy lives with the component that renders it. `EnquiryBand.test.tsx` import and the call-link name match updated, approved by Haider                                                                                  | T4.3, approved by Haider        |

## Open items

Waiting on Syd:

- About page copy and facts (T4.1). The placeholder copy is listed here until he approves it. It must be approved before T6.3.

Technical:

- `WhyChooseUsSection` still hardcodes "15 years" in two strings. Move to `YEARS_EXPERIENCE` in a homepage ticket.
- `SectionShell` has one consumer (`ServiceSections`). Style strings (stripe panel, link rows) are copied between About, `FeatureSection` and `ServicesDropdown`. Share them if a third consumer appears.
- Copy changed at review: Find Us heading and intro, new facts panel strings. All placeholder, with Syd.
- The Playwright About tests were written after the page, so they were not seen failing first. The Vitest tests were red first.

## Follow-ups noticed and not touched

- Duplicates left alone in T4.3 because each is a one-button CTA with different copy and size, or a text row: `HeroSection` and `MobileMenu` ("Get a Quote: {number}", `md`), `ServiceHero` ("Call now", `lg:hidden`), the Navbar CTA and `WhatsAppWidget` (out of scope by the brief), Footer and Find Us (`ContactLine`). They still build their own `tel:` button from the constants (T4.3).
- The WhatsApp prefill "Hi, How can we help?" sounds like the business speaking. Unconfirmed with Syd, not changed (T4.3).
- `LinkButton` primary (`text-foreground` on `bg-accent`) fails AA at about 3.1:1, so the Call button inherits it. Fix with the accent token once the logo arrives (T4.3).

- Old WordPress URLs will 404 after the domain switch. A redirect map is a T6 task (T4.2).
- `WhyChooseUsSection` has unsourced claims: "Authorised Ghost Immobiliser II Installer", "every job is backed by our guarantee" (T4.1).
- Brand casing is inconsistent: "Team AutoTech" (layout title, tests) vs "Team Autotech" (`siteConfig`, Footer, logo alt, About h1) (T4.1).
- `ABOUT_BLURB` uses " - " where an en dash or comma belongs (copy change, needs approval). The hyphen in `OPENING_HOURS` is accepted (T4.1).
- `ContactLine` external links have no "opens in a new tab" text, unlike `LinkButton` (T4.1).
- About has no contact block of its own, but its closing `EnquiryBand` now renders `ContactLinks`, so it is a consumer (T4.3).
- The WhatsApp widget overlaps the facts panel edge in the 375 and 768 px full-page screenshots. Probably a screenshot artefact. Glance at it in a real browser (T4.1).
- Fixed in docs at T4.1: `status.md` and `project.md` claimed the Footer links to `/#services`. It does not, and `/#services` is the 6-card Popular grid.

## Gotchas recorded in the docs during T4

- There is no `/services` page, by decision (T4.2). `#services` on the homepage is the 6-card Popular grid.
- Next adds `noindex` to a 404 itself, and a root `not-found.tsx` serves both unmatched URLs and `notFound()` calls. `dynamicParams = false` on the service route was already set.
- The `layout.tsx` title template only applies to child segments, so the home page keeps the plain default.

## Not verified

- T4.1: the `ServiceSections` HTML was not diffed before and after the `SectionShell` refactor. The unmodified existing tests pass, and the build and the visual check at 375, 768 and 1280 px showed no overflow.
- T4.2: the Playwright specs were written before the page but were not run against the stub, so only the Vitest tests were seen failing first. Whether `/#services` is hidden under the sticky Navbar was not checked.
- T4.3: the band's three channels were checked at 375, 768 and 1280 px on a production build (screenshots in the PR). The 640 to 767 px range was not captured, but the number shows from `sm` (640) and the two buttons fit one row there.
- Vercel preview, performance and accessibility audits.
