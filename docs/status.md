# Status

Last updated: 2026-11-01, after T3.4. Next ticket: T3.5.

## Done

- T0: types and data, root layout and tokens, Vitest and RTL setup
- T1: design system and shell (LinkButton, SectionWrapper, PageHero, ServiceCard, Footer, WhatsAppWidget, Navbar, ServicesDropdown, MobileMenu), shell wired into `app/layout.tsx`
- T2: homepage, all six sections assembled in `app/page.tsx`, Playwright homepage suite
- T3.1 to T3.3: content model and category themes, service page shell, route and metadata. All 15 service pages exist, themed, and are coming-soon until given content. Built to the design in `architecture.md`; check the code for detail
- T3.32 (add-on to T3.3): images added, spacing added between `LinkButton` icon and text, transition added on page navigation. Read the code before building on any of these
- T3.4: `ServiceSections` renderer and five blocks (`ProseSection`, `FeatureSection`, `StepsSection`, `SpecBand`, `FaqSection`), wired into the service page. The `video` case renders `null` until T3.5.

## Next

- T3.5: `VideoSection` and `VideoEmbed`. Replace the `video` case in `ServiceSections`

## Remaining

| Ticket  | Scope                                                                                               |
| ------- | --------------------------------------------------------------------------------------------------- |
| T3.6    | Content: Stage 1 Tuning (data edit only)                                                            |
| T3.7    | Content: Ghost Immobiliser II (first use of video)                                                  |
| T3.8    | Content: Scorpion X Series                                                                          |
| T3.9    | Content: remaining 12, fill where copy exists, leave the rest coming-soon                           |
| T4.1    | About page and test                                                                                 |
| T4.2    | `not-found.tsx` and test                                                                            |
| T5.1    | `ui/ContactLinks.tsx` (tel, wa.me, mailto). Reconcile with `ContactLine` first, probably compose it |
| T6.1    | Cross-browser Playwright run (chromium, firefox, webkit)                                            |
| T6.2    | Responsive audit at 375, 768, 1280 px across all pages                                              |
| T6.3    | Domain connection (A record and CNAME), deliberately last                                           |
| Phase 5 | Deferred: shop, basket, Stripe, Neon Postgres and Prisma                                            |

## Open items

Technical:

- `MobileMenu` has no full focus trap. Judged unnecessary for now
- Map skeleton has no fallback if the iframe is blocked by an ad blocker. Accepted
- 360px width: minor card-text wrapping on `ServicesGrid`. Revisit at T6.2
- Root layout title may still be a flat string, not the `title.template` pattern. Check `app/layout.tsx`
- `constants.ts` has a note that the address may need to read "Unit 4 - 12 Wenning Street". Confirm with Syd before changing
- `WhyChooseUsSection.tsx` has an unused `GOOGLE_REVIEW_COUNT` import (lint warning)
- Footer "Services" link points at `/#services`. Revisit if a services index ever exists

Waiting on Syd:

- Logo file (unblocks favicon, confirms the real accent hex)
- Google Business Profile owner access (launch task)
