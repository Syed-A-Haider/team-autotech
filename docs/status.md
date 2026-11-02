# Status

Last updated: 2026-11-02, after T3.6. Next ticket: T3.7.

## Done

- T0: types and data, root layout and tokens, Vitest and RTL setup
- T1: design system and shell (LinkButton, SectionWrapper, PageHero, ServiceCard, Footer, WhatsAppWidget, Navbar, ServicesDropdown, MobileMenu), shell wired into `app/layout.tsx`
- T2: homepage, all six sections assembled in `app/page.tsx`, Playwright homepage suite
- T3.1 to T3.3: content model and category themes, service page shell, route and metadata. All 15 service pages exist and are themed. All are coming-soon except Stage 1 Tuning (T3.6). Built to the design in `architecture.md`; check the code for detail
- T3.32 (add-on to T3.3): images added, spacing added between `LinkButton` icon and text, transition added on page navigation. Read the code before building on any of these
- T3.4: `ServiceSections` renderer and five blocks (`ProseSection`, `FeatureSection`, `StepsSection`, `SpecBand`, `FaqSection`), wired into the service page.
- T3.5: `VideoSection` (Server) and `VideoEmbed` (Client), click-to-load YouTube facade on `youtube-nocookie.com`. No request to a third party until the visitor clicks play, and focus moves to the player. `ServiceSections` now renders the `video` case
- T3.6: Content: Stage 1 Tuning (real corrected copy, live but awaiting Syd's approval). Review fix: service sections redesigned for a sportier feel. `SectionHeading` adds a faded number, a skewed stripe and a soft glow. Prose, steps, FAQ and list features split heading and content and alternate sides. Feature grids and spec bands never leave an orphan. Layout is derived from section type and position, so no data fields or types changed. See `design.md`

## Next

- T3.7: Content: Ghost Immobiliser II (first use of video). Source brief is `docs/content/ghost-immobiliser-ii.md`. Confirm section order and variants, and live vs coming-soon first. Needs Syd's video id and poster

## Remaining

| Ticket  | Scope                                                                                                                                                                                                    |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T3.7    | Content: Ghost Immobiliser II (first use of video)                                                                                                                                                       |
| T3.8    | Content: Scorpion X Series                                                                                                                                                                               |
| T3.9    | Content: remaining 12, fill where copy exists, leave the rest coming-soon                                                                                                                                |
| T4.1    | About page and test                                                                                                                                                                                      |
| T4.2    | `not-found.tsx` and test                                                                                                                                                                                 |
| T5.1    | `ui/ContactLinks.tsx` (tel, wa.me, mailto). Reconcile with `ContactLine` first, probably compose it                                                                                                      |
| T5.2    | Motion foundation (Stage 1 design review first): motion language, reveal wrapper (one small Client island), library decision (CSS first, a library needs approval), reduced-motion and performance rules |
| T5.3    | Apply the motion and wow-factor effects across the homepage, shell and service section blocks. Rewrite the Motion rules in `design.md`                                                                   |
| T6.1    | Cross-browser Playwright run (chromium, firefox, webkit)                                                                                                                                                 |
| T6.2    | Responsive audit at 375, 768, 1280 px across all pages                                                                                                                                                   |
| T6.3    | Domain connection (A record and CNAME), deliberately last                                                                                                                                                |
| Phase 5 | Deferred: shop, basket, Stripe, Neon Postgres and Prisma                                                                                                                                                 |

## Open items

Technical:

- Stage 1 Tuning is `live` (indexable) with real but UNAPPROVED old-site copy, so the PR preview is testable. Copy lives in `lib/services.ts` (`sections`), sourced from `docs/content/stage-1-tuning.md`. Syd must approve it before T6.3 (domain connection). If he rejects it, delete `status` to revert to coming-soon. The copy is corrected from the old site (British English, spelling, grammar, a sportier natural tone, same facts). Syd approves the corrected wording. One clarification was added: "through the OBD port" (source said "the port")
- `MobileMenu` has no full focus trap. Judged unnecessary for now
- Map skeleton has no fallback if the iframe is blocked by an ad blocker. Accepted
- 360px width: minor card-text wrapping on `ServicesGrid`. Revisit at T6.2
- Root layout title may still be a flat string, not the `title.template` pattern. Check `app/layout.tsx`
- `constants.ts` has a note that the address may need to read "Unit 4 - 12 Wenning Street". Confirm with Syd before changing
- `WhyChooseUsSection.tsx` has an unused `GOOGLE_REVIEW_COUNT` import (lint warning)
- Footer "Services" link points at `/#services`. Revisit if a services index ever exists
- `ServiceCtaBand` and `RelatedServices` still use a small left-aligned `h2`, so they look plain next to the new section headings. Optional follow-up: give them the same heading style or a stripe
- Text on `bg-accent` fails AA (about 3.1:1) in `LinkButton` primary. Fix with the accent hex once the logo arrives. Steps badges already use `text-background`

Waiting on Syd:

- Approval of the Stage 1 Tuning copy (live in the T3.6 preview, unapproved)
- Ghost Immobiliser II video: the bare 11-character YouTube id, a 16:9 poster image, and final title and caption (needed before T3.7). The video is Syd's own and embedding is allowed
- Logo file (unblocks favicon, confirms the real accent hex)
- Google Business Profile owner access (launch task)
