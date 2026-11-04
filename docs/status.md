# Status

Last updated: 2026-11-04, after T4.4. Next ticket: the Next.js security upgrade (id to be assigned by Haider), then T5.1.

T3 is complete. History and decisions: `docs/t3-completion-report.md`. T4 is complete, tracked in `docs/t4-completion-report.md`.

## Done

- T0: types and data, root layout and tokens, Vitest and RTL setup
- T1: design system and shell (LinkButton, SectionWrapper, PageHero, ServiceCard, Footer, WhatsAppWidget, Navbar, ServicesDropdown, MobileMenu), shell wired into `app/layout.tsx`
- T2: homepage, all six sections assembled in `app/page.tsx`, Playwright homepage suite
- T3.1 to T3.3: content model and category themes, service page shell, route and metadata. All 15 service pages exist and are themed. Stage 1 Tuning, Ghost Immobiliser II and Scorpion X Series are live (T3.6 to T3.8), the rest are coming-soon. Built to the design in `architecture.md`; check the code for detail
- T3.31 and T3.32 (add-ons to T3.3): page-navigation transition (`PageTransition`), category hero images, spacing between `LinkButton` icon and text. Read the code before building on any of these
- T3.4: `ServiceSections` renderer and five blocks (`ProseSection`, `FeatureSection`, `StepsSection`, `SpecBand`, `FaqSection`), wired into the service page.
- T3.5: `VideoSection` (Server) and `VideoEmbed` (Client), click-to-load YouTube facade on `youtube-nocookie.com`. No request to a third party until the visitor clicks play, and focus moves to the player. `ServiceSections` now renders the `video` case
- T3.6: Content: Stage 1 Tuning (real corrected copy, live but awaiting Syd's approval). Review fix: service sections redesigned for a sportier feel. `SectionHeading` adds a faded number, a skewed stripe and a soft glow. Prose, steps, FAQ and list features split heading and content and alternate sides. Feature grids and spec bands never leave an orphan. Layout is derived from section type and position, so no data fields or types changed. See `design.md`
- T3.7: Content: Ghost Immobiliser II (live, unapproved). First real use of `video`: local placeholder poster, facade verified. `VideoSection` figure now centred. Tagline became `shortDescription`
- T3.8: Content: Scorpion X Series (live, unapproved). Text-only: prose plus a four-step "How It Works" block, with the step text read from the old-site carousel images. No code or type changes
- T3.9: Closed as a docs ticket. All 12 remaining old-site pages are empty, so no copy was written. They stay coming-soon (official services, no website description yet). Nine unsourced `shortDescription` one-liners were neutralised. Added `docs/content/_template.md` and `_requests.md`
- T3.10: Closing sections restyle. New shared `EnquiryBand` (stripe heading, glow, optional skewed badge, centred Call and WhatsApp buttons) powers `ComingSoonPanel` and `ServiceCtaBand`. `RelatedServices` uses the same stripe heading. `SectionHeading` `number` is optional and `GLOW_STYLES` is exported from it. No motion, no new copy facts. Added `docs/t3-completion-report.md` and a docs cleanup. See `design.md`
- T4.1: About page at `/about` (static, text-only, placeholder copy). Deliberately not numbered: un-numbered stripe headings, a facts panel, four category cards with every service linked, and a Find Us panel with address, hours and Get Directions (phone and email stay in the Footer and closing band). New `ui/SectionShell` (used by `ServiceSections`); `SectionHeading` and `EnquiryBand` moved from `service-sections/` to `ui/`. Root `title.template` added (`%s | Team AutoTech`, so every service title gains the suffix). `YEARS_EXPERIENCE` constant (15, approved). Homepage snippet CTA now reads "More About Us". 216 Vitest, 32 Playwright. See `t4-completion-report.md`

- T4.2: Branded 404 (`app/not-found.tsx`): faded "404", stripe, one h1, one line and a "Back to home" button, inside the site shell. Static (`/_not-found`), HTTP 404, `noindex` and the templated title confirmed on a production build. No `/services` index and no redirect, by decision. `STRIPE_STYLES` is now exported from `SectionHeading`. New `not-found.spec.ts` (`@notfound`). Fixed the `GOOGLE_REVIEW_COUNT` lint warning (unused import removed, the constant stays). 222 Vitest, 37 Playwright. See `t4-completion-report.md`
- T4.3: `ui/ContactLinks` (Server): Call (primary) and WhatsApp (secondary) `lg` buttons from the `constants.ts` hrefs, composing `LinkButton`. `EnquiryBand` now renders it, so `ComingSoonPanel`, `ServiceCtaBand` and the About closing band share it. Call shows the mobile number from `sm` up and hides it on phones. No email button, by decision. `CALL_LABEL` and `WHATSAPP_LABEL` moved from `EnquiryBand` to `ContactLinks`. Hero, MobileMenu, ServiceHero, Navbar CTA, `WhatsAppWidget`, Footer and Find Us left alone (one-button CTAs or text rows). 229 Vitest, 37 Playwright. See `t4-completion-report.md`

- T4.4: Repository sweep, no behaviour change. Removed a stale `Navbar` TODO, merged `smoke.spec.ts` into `homepage.spec.ts`, replaced the boilerplate `README.md`, and trimmed duplicate Gotchas from `CLAUDE.md` (they live in `docs/conventions.md`). Rule notes added: named exports for new components, `toHaveClass` allowed for `className` pass-through, z-index wording, and the `motion-safe:` gap parked for T5.1. Each phase now keeps a running completion report. 229 Vitest, 36 Playwright. See `t4-completion-report.md`

## Next

- Next.js security upgrade, in its own ticket (id to be assigned by Haider). `next` 16.3.0 has open advisories, see Open items
- T5.1: motion foundation, Stage 1 design review first (see Remaining)

## Remaining

Phases still to come: 5 motion and wow factor (T5.x), 6 audits and launch (T6.x), 7 deferred shop (no tickets yet).

| Ticket  | Scope                                                                                                                                                                                                                                                                                                                                  |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T5.1    | Motion foundation (Stage 1 design review first): motion language, reveal wrapper (one small Client island), library decision (CSS first, a library needs approval), reduced-motion and performance rules. Also fix the 15 `transition-*` uses without `motion-safe:` (list in `design.md`, Motion) and start `t5-completion-report.md` |
| T5.2    | Apply the motion and wow-factor effects across the homepage, shell and service section blocks. Rewrite the Motion rules in `design.md`                                                                                                                                                                                                 |
| T6.1    | Cross-browser Playwright run (chromium, firefox, webkit)                                                                                                                                                                                                                                                                               |
| T6.2    | Responsive audit at 375, 768, 1280 px across all pages                                                                                                                                                                                                                                                                                 |
| T6.3    | Domain connection (A record and CNAME), deliberately last                                                                                                                                                                                                                                                                              |
| Phase 7 | Deferred: shop, basket, Stripe, Neon Postgres and Prisma                                                                                                                                                                                                                                                                               |

## Open items

Technical:

- Stage 1 Tuning is `live` (indexable) with real but UNAPPROVED old-site copy, so the PR preview is testable. Copy lives in `lib/services.ts` (`sections`), sourced from `docs/content/stage-1-tuning.md`. Syd must approve it before T6.3 (domain connection). If he rejects it, delete `status` to revert to coming-soon. The copy is corrected from the old site (British English, spelling, grammar, a sportier natural tone, same facts). Syd approves the corrected wording. One clarification was added: "through the OBD port" (source said "the port")
- `MobileMenu` has no full focus trap. Judged unnecessary for now
- Map skeleton has no fallback if the iframe is blocked by an ad blocker. Accepted
- 360px width: minor card-text wrapping on `ServicesGrid`. Revisit at T6.2
- Brand casing differs: "Team AutoTech" (layout title, tests) vs "Team Autotech" (`siteConfig`, Footer, logo alt, About h1). Unify later
- `constants.ts` has a note that the address may need to read "Unit 4 - 12 Wenning Street". Confirm with Syd before changing
- There is no `/services` page, by decision (T4.2). Services are reached from the Navbar, the homepage Popular grid (`#services`, 6 cards) and the About page. The Footer links Home, About and two services only. `/services` is a normal 404, with no redirect
- T6: old WordPress URLs (shop, basket, checkout, my-account, old product slugs) will 404 after the domain switch. Decide a redirect map in T6, before T6.3
- `/#services` on the homepage may sit tight under the sticky Navbar (`h-16`) when jumped to. Not checked, look at it in T6.2
- About page copy is placeholder (generated from site facts, "15+ years" approved). Syd replaces and approves it before T6.3. The homepage `AboutSnippet` still says "family-run" (unapproved), `WhyChooseUsSection` hardcodes "15 years" and has unsourced claims ("Authorised Ghost Immobiliser II Installer", "backed by our guarantee")
- WhatsApp prefill reads "Hi, How can we help?" (`WHATSAPP_LINK`). That is the customer's message, so it sounds like the business speaking. Unconfirmed with Syd, not changed in T4.3. Reword it in `constants.ts` once he agrees
- Follow-ups from T3.10: `ServiceCard` has no `focus-visible` style, and `CTA_PITCH` uses a hyphen where a dash or comma belongs ("quote - pricing", copy change, needs approval)
- Text on `bg-accent` fails AA (about 3.1:1) in `LinkButton` primary. Fix with the accent hex once the logo arrives. Steps badges already use `text-background`
- `next` 16.3.0 has open security advisories (`pnpm audit --prod` on 2026-11-04: 5 critical, 6 high, 5 moderate, 1 low). Two of the criticals and a high-severity SSRF are in Image Optimization, which the site uses through `next/image`. The fixes are in 16.3.3 to 16.4.1, so take the latest 16.x. Upgrade in its own ticket (next), with `eslint-config-next`, which is pinned to the same version. Not done in the T4.4 sweep, because dependency changes get their own ticket
- Follow-ups from the T4.4 sweep, by decision: the `LinkButton` variant and size tests still assert CSS classes and need a rewrite against exported constants or attributes (see `testing.md`). The T1 and T2 components still use `export default` and have not been converted to named exports (see `conventions.md`). 15 `transition-*` uses lack `motion-safe:`, parked for T5.1 (see `design.md`, Motion)

- Ghost Immobiliser II is `live` (indexable) with UNAPPROVED corrected copy, a provisional video title ("See Ghost Immobiliser II in Action") and a placeholder poster (frame saved from the video, `public/images/videos/ghost-immobiliser-ii.jpg`). `shortDescription` now uses the old-site tagline instead of the unsourced "CAN bus... no external fob or LED" line. Syd must approve before T6.3. If rejected, delete `status` to revert. `Service.body` is never rendered (follow-up: remove the field)
- Scorpion X Series is `live` (indexable) with UNAPPROVED corrected copy. The step text was read from the old-site carousel images (confirmed visually); the images, the GBP 449 price and Scorpion's contact details are deliberately not used. The three feature tiles (Key Relay Defence, Personal Security, High Level Protection) have titles only, so there is no feature block. `shortDescription` uses sourced wording instead of the unsourced "Thatcham-approved" line. Syd must approve before T6.3. If rejected, delete `status` to revert
- Placeholder FAQs on the three live pages (Stage 1 Tuning, Ghost Immobiliser II, Scorpion X Series), drafted from each page's copy and generic enquiry answers. No source FAQs exist. Syd reviews and edits them in `lib/services.ts` (`faq` sections). Remove any he rejects
- The 12 coming-soon services have no source copy. Track requests and replies in `docs/content/_requests.md`. Homepage Popular grid: 4 of 6 cards (BMW Programming, Dashcam, Scorpion Trackers, DPF / EGR) lead to coming-soon pages. Revisit at T6.2

Waiting on Syd:

- Copy for the 12 coming-soon services (see `_requests.md`), and confirmation of their one-line descriptions
- About page copy (placeholder, T4.1) and facts such as team, history and accreditations if he wants them shown
- Approval of the Stage 1 Tuning copy (live in the T3.6 preview, unapproved)
- Approval of the Scorpion X Series copy (live in the T3.8 preview, unapproved), and review of the placeholder FAQs on all three live pages
- Ghost Immobiliser II video: confirm id `hT3xBns4wmw` is right, and supply a 16:9 poster image (replaces the placeholder at the same path) and final title and caption. The video is Syd's own and embedding is allowed
- Final logo file. `public/images/logo.jpg` is a placeholder: it has a black bar behind it that must be removed. The final logo unblocks the favicon and confirms the real accent hex
- Google Business Profile owner access (launch task)
