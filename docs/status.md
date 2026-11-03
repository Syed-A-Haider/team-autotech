# Status

Last updated: 2026-11-03, after T3.9. Next ticket: T3.10.

## Done

- T0: types and data, root layout and tokens, Vitest and RTL setup
- T1: design system and shell (LinkButton, SectionWrapper, PageHero, ServiceCard, Footer, WhatsAppWidget, Navbar, ServicesDropdown, MobileMenu), shell wired into `app/layout.tsx`
- T2: homepage, all six sections assembled in `app/page.tsx`, Playwright homepage suite
- T3.1 to T3.3: content model and category themes, service page shell, route and metadata. All 15 service pages exist and are themed. All are coming-soon except Stage 1 Tuning (T3.6). Built to the design in `architecture.md`; check the code for detail
- T3.32 (add-on to T3.3): images added, spacing added between `LinkButton` icon and text, transition added on page navigation. Read the code before building on any of these
- T3.4: `ServiceSections` renderer and five blocks (`ProseSection`, `FeatureSection`, `StepsSection`, `SpecBand`, `FaqSection`), wired into the service page.
- T3.5: `VideoSection` (Server) and `VideoEmbed` (Client), click-to-load YouTube facade on `youtube-nocookie.com`. No request to a third party until the visitor clicks play, and focus moves to the player. `ServiceSections` now renders the `video` case
- T3.6: Content: Stage 1 Tuning (real corrected copy, live but awaiting Syd's approval). Review fix: service sections redesigned for a sportier feel. `SectionHeading` adds a faded number, a skewed stripe and a soft glow. Prose, steps, FAQ and list features split heading and content and alternate sides. Feature grids and spec bands never leave an orphan. Layout is derived from section type and position, so no data fields or types changed. See `design.md`
- T3.7: Content: Ghost Immobiliser II (live, unapproved). First real use of `video`: local placeholder poster, facade verified. `VideoSection` figure now centred. Tagline became `shortDescription`
- T3.8: Content: Scorpion X Series (live, unapproved). Text-only: prose plus a four-step "How It Works" block, with the step text read from the old-site carousel images. No code or type changes
- T3.9: Closed as a docs ticket. All 12 remaining old-site pages are empty, so no copy was written. They stay coming-soon (official services, no website description yet). Nine unsourced `shortDescription` one-liners were neutralised. Added `docs/content/_template.md` and `_requests.md`

## Next

- T3.10: Closing sections restyle: sportier, reusable `ComingSoonPanel` (stripe, glow, enquiry pitch), plus the same heading treatment for `ServiceCtaBand` and `RelatedServices`. Stage 1 design review first. No motion (T5), no new copy facts. Note for Stage 1: `SectionHeading` needs a required `number` and `GLOW_STYLES` is private to `ServiceSections` (make `number` optional or export the constant); `ComingSoonPanel`, `ServiceCtaBand` and `ServicePageTemplate` tests assert the title-containing heading and the 'Call us'/'WhatsApp' button names, so changing those needs approval; move the panel's inline copy to exported constants; do not add related services inside the panel

## Remaining

Phases still to come: 4 pages and shared pieces (T4.x), 5 motion and wow factor (T5.x), 6 audits and launch (T6.x), 7 deferred shop (no tickets yet).

| Ticket  | Scope                                                                                                                                                                                                    |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T3.10   | Closing sections restyle: reusable sporty `ComingSoonPanel`, same heading treatment for `ServiceCtaBand` and `RelatedServices`                                                                           |
| T4.1    | About page and test                                                                                                                                                                                      |
| T4.2    | `not-found.tsx` and test                                                                                                                                                                                 |
| T4.3    | `ui/ContactLinks.tsx` (tel, wa.me, mailto). Reconcile with `ContactLine` first, probably compose it                                                                                                      |
| T5.1    | Motion foundation (Stage 1 design review first): motion language, reveal wrapper (one small Client island), library decision (CSS first, a library needs approval), reduced-motion and performance rules |
| T5.2    | Apply the motion and wow-factor effects across the homepage, shell and service section blocks. Rewrite the Motion rules in `design.md`                                                                   |
| T6.1    | Cross-browser Playwright run (chromium, firefox, webkit)                                                                                                                                                 |
| T6.2    | Responsive audit at 375, 768, 1280 px across all pages                                                                                                                                                   |
| T6.3    | Domain connection (A record and CNAME), deliberately last                                                                                                                                                |
| Phase 7 | Deferred: shop, basket, Stripe, Neon Postgres and Prisma                                                                                                                                                 |

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

- Ghost Immobiliser II is `live` (indexable) with UNAPPROVED corrected copy, a provisional video title ("See Ghost Immobiliser II in Action") and a placeholder poster (frame saved from the video, `public/images/videos/ghost-immobiliser-ii.jpg`). `shortDescription` now uses the old-site tagline instead of the unsourced "CAN bus... no external fob or LED" line. Syd must approve before T6.3. If rejected, delete `status` to revert. `Service.body` is never rendered (follow-up: remove the field)
- Scorpion X Series is `live` (indexable) with UNAPPROVED corrected copy. The step text was read from the old-site carousel images (confirmed visually); the images, the GBP 449 price and Scorpion's contact details are deliberately not used. The three feature tiles (Key Relay Defence, Personal Security, High Level Protection) have titles only, so there is no feature block. `shortDescription` uses sourced wording instead of the unsourced "Thatcham-approved" line. Syd must approve before T6.3. If rejected, delete `status` to revert
- Placeholder FAQs on the three live pages (Stage 1 Tuning, Ghost Immobiliser II, Scorpion X Series), drafted from each page's copy and generic enquiry answers. No source FAQs exist. Syd reviews and edits them in `lib/services.ts` (`faq` sections). Remove any he rejects
- The 12 coming-soon services have no source copy. Track requests and replies in `docs/content/_requests.md`. Homepage Popular grid: 4 of 6 cards (BMW Programming, Dashcam, Scorpion Trackers, DPF / EGR) lead to coming-soon pages. Revisit at T6.2

Waiting on Syd:

- Copy for the 12 coming-soon services (see `_requests.md`), and confirmation of their one-line descriptions
- Approval of the Stage 1 Tuning copy (live in the T3.6 preview, unapproved)
- Approval of the Scorpion X Series copy (live in the T3.8 preview, unapproved), and review of the placeholder FAQs on all three live pages
- Ghost Immobiliser II video: confirm id `hT3xBns4wmw` is right, and supply a 16:9 poster image (replaces the placeholder at the same path) and final title and caption. The video is Syd's own and embedding is allowed
- Logo file (unblocks favicon, confirms the real accent hex)
- Google Business Profile owner access (launch task)
