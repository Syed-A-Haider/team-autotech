# T6 completion report (Syd's change requests)

Running summary. Rewrite it at the end of each T6 ticket, do not append. Planned 2026-11-07 by an Opus planning agent from Syd's requests, checked against the code. No T6 ticket is built yet.

## Summary

- **Why T6 exists:** the old WordPress site crashed, so teamautotech.co.uk went live on this site early. Syd reviewed it earlier than planned and sent change requests. The old T6 (audits) is now T7, and the deferred shop is Phase 8. The old T6.3 (domain connection) is gone
- **Syd's requests:** a "Shop (inactive)" item at the top, five new pages (AdBlue Solutions, XHP Gearbox Map, Fleet Trackers, Road Angel Dashcam, Component Protection Removal), a new Mechanical / Customisation category (Vehicle Maintenance, MOT Preparation, CT Carbon Official Installer, Body Panel Repair and Paint), the landline on every big primary Call button, and AI-generated copy for every coming-soon page
- **Content is no longer a blocker.** Syd chose AI-drafted copy and will review it at the end (T6.14). Layouts may vary per service, using the existing blocks
- **Result when finished:** 24 services in 5 categories, all live, a Shop label, the landline on Call, old URLs redirected, a sitemap

## Timeline

| Ticket  | PR       | Merged | Notes                                                               |
| ------- | -------- | ------ | ------------------------------------------------------------------- |
| T6 plan | with #25 | TBC    | Docs only: this report, briefs `T6.1` to `T6.6` and `T6-content.md` |
| T6.1    | TBC      | TBC    | Landline on the five primary Call buttons, 311 Vitest, no e2e added |

Planned order (dependency first, then value and risk): T6.1, T6.2, T6.3, T5.11, T6.4, T6.5, T5.12, T6.6, T6.7, T6.8, T6.9, T6.10, T6.11, T6.12, T6.13, T6.14. Scope per ticket is in the Remaining table of `status.md`.

## Decisions

| Decision                                                                                                                               | Why                                                                                                                                                                                                          | Who                          |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| The planning docs ride on the T5.10 PR, there is no separate "T6.0" docs ticket                                                        | Haider asked for the docs to be updated as part of the current ticket                                                                                                                                        | Haider                       |
| Order: T6.1 and T6.2 first, T5.12 after T6.5, content after the standard (T6.6)                                                        | The site is live: the landline and the 404s are visible and cheap. T5.12's final screenshots and metrics should cover the final nav, dropdown and fifth theme. Content is data only and needs no motion work | Opus plan, Haider to confirm |
| Redirect only real equivalents. Shop and account URLs stay a branded 404                                                               | An honest 404 beats a soft-404 redirect to home                                                                                                                                                              | Opus plan                    |
| Landline replaces the mobile on primary Call buttons. WhatsApp and the Footer mobile row keep the mobile                               | A landline has no WhatsApp, and the Footer lists both numbers. Supersedes the T4.3 decision "Call is the mobile"                                                                                             | Syd's request                |
| "Shop (inactive)" is a non-clickable label with a "Coming soon" tag, not a page or a dropdown column                                   | The shop is Phase 8. This is the least that satisfies the request. Confirmed by Haider 2026-11-07                                                                                                            | Opus plan, default           |
| Pages are indexable as soon as they go live, not `noindex` until Syd approves                                                          | Indexing is the point of the content, and the content standard keeps copy generic. Confirmed by Haider 2026-11-07                                                                                            | Opus plan, default           |
| AI copy follows a written standard with a Vitest guard, and a review tracker. Emissions pages go last and use lawful-work wording only | A real local business: invented prices, accreditations, guarantees or emissions-removal wording are a legal and trust risk. The standard is in `tickets/T6.6.md`                                             | Opus plan                    |
| Mechanical / Customisation entries go last in the array                                                                                | Dropdown column order is the order of first appearance in the data                                                                                                                                           | Opus plan                    |

## Gotchas found while building

- T6.1: the header button's `min-w-70` still holds. Measured at 1280px with it lifted, the landline text is 271.4px in Inter and 276.4px (Chromium) or 276.5px (WebKit) in the fallback font, so under 280px. The desktop layout-shift guard alone proves nothing while `min-w-70` fixes the box, so measure the natural width when the button text changes
- T6.1: the WhatsApp-stays-mobile test passes before any code change, so it was proven red once by pointing `WHATSAPP_NUMBER` at the landline temporarily (restored)

## Gotchas found while planning

- The noindex unit test (`services/[slug]/page.test.ts`) has `if (!comingSoon) return;`, so it will pass without testing anything once every page is live. T6.3 rewrites it with a fixture
- `tests/config/testData.ts` `comingSoonSlug` (DPF / EGR) feeds the service motion tests. It stops being coming-soon in T6.12, after which `ComingSoonPanel` is covered by Vitest only (needs approval)
- Feature `alternating` and `list` and the spec band are on no live page yet (T5.10 checked them with temporary data). The first content PR that uses each adds a permanent e2e slug
- The five-column dropdown is about 153px per column at 1024px, and the About category cards (four across) need a five-card plan so none sits alone
- The Shop label must not use `opacity-*` (the `@motion` faded guard), and a shared label cannot be exported from a `'use client'` file into a Server Component
- `next.config.ts` may not resolve the `@/` alias, so `lib/redirects.ts` is plain data with no icon imports
- The new category has no hero photo. The four existing hero images are about 20.8 MB together, so the new one must be compressed (about 500 KB or less)

## Open questions

Haider answered on 2026-11-07 (Syd can still correct): the Shop label as planned (T6.4), the landline also on service-page "Call now" (T6.1; out of hours the landline redirects to the mobile, so no call is lost), emissions wording at the default (T6.12), AI pages indexable on going live, and Haider picks the Mechanical hero photo (T6.5).

Haider also confirmed the five unsourced claims already live (Authorised Ghost Immobiliser II Installer, backed by our guarantee, family-run, genuine manufacturer-grade tools, insurance-approved trackers), so they stay as they are. Syd can still correct them in T6.14.

Still waiting on Syd, see `status.md`: what the emissions services involve (not blocking), and his review of all AI copy (T6.14).

## Follow-ups (not in any T6 ticket)

- `Service.body` is never rendered. T6.5 may remove it (a shared-type change)
- `RelatedServices` takes the first three in array order, so Stage 1 Tuning shows on every Remap page. A choice, not a bug
- WhatsApp prefill wording, brand-name casing, accent contrast and the map facade stay as listed in `status.md`
