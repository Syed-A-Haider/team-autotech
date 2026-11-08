# T6 completion report (Syd's change requests)

Running summary. Rewrite it at the end of each T6 ticket, do not append. Planned 2026-11-07 by an Opus planning agent from Syd's requests, checked against the code. T6.1 to T6.5 are built (T6.5 is in its PR). The rest are planned.

## Summary

- **Why T6 exists:** the old WordPress site crashed, so teamautotech.co.uk went live on this site early. Syd reviewed it earlier than planned and sent change requests. The old T6 (audits) is now T7, and the deferred shop is Phase 8. The old T6.3 (domain connection) is gone
- **Syd's requests:** a "Shop (inactive)" item at the top, five new pages (AdBlue Solutions, XHP Gearbox Map, Fleet Trackers, Road Angel Dashcam, Component Protection Removal), a new Mechanical / Customisation category (Vehicle Maintenance, MOT Preparation, CT Carbon Official Installer, Body Panel Repair and Paint), the landline on every big primary Call button, and AI-generated copy for every coming-soon page
- **Content is no longer a blocker.** Syd chose AI-drafted copy and will review it at the end (T6.14). Layouts may vary per service, using the existing blocks
- **Done so far:** T6.1 put the landline on the primary Call buttons (WhatsApp and the Footer mobile row keep the mobile). T6.2 added 27 permanent redirects from old WordPress slugs, so old links no longer 404. T6.3 added `/sitemap.xml` (home, About and live services only, so each content batch joins it by itself) and `/robots.txt`, rewrote the noindex test with fixtures so it cannot pass vacuously, and added `docs/search-console.md`, the owner checklist (Syd adds a DNS TXT record, Haider verifies and submits the sitemap). T6.4 added a non-clickable "Shop, coming soon" label after About in the nav and the mobile menu. Together they cover the urgent live-site gaps: working old links, the right phone number and a way for Google to find the pages
- **Still to do:** T5.11 (calm closing bands, now after T6.5), T5.12 (motion polish), T6.6 (AI content standard and copy guard), T6.7 to T6.12 (AI-drafted copy for every coming-soon page, in six batches), T6.13 (small clean-up) and T6.14 (Syd's review). Waiting on Syd: the emissions question (not blocking), his review of all AI copy, a final logo, the video poster and Business Profile owner access
- **Result when finished:** 24 services in 5 categories, all live, a Shop label, the landline on Call, old URLs redirected, a sitemap

## Timeline

| Ticket  | PR       | Merged | Notes                                                                                                                                                                                                                                                                   |
| ------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T6 plan | with #25 | TBC    | Docs only: this report, briefs `T6.1` to `T6.6` and `T6-content.md`                                                                                                                                                                                                     |
| T6.1    | TBC      | Yes    | Landline on the five primary Call buttons, 311 Vitest, no e2e added                                                                                                                                                                                                     |
| T6.2    | #28      | Yes    | 27 permanent redirects from old WordPress slugs, 320 Vitest, 57 `@redirects` e2e (Chromium)                                                                                                                                                                             |
| T6.3    | #29      | Yes    | `sitemap.xml` (live pages only) and `robots.txt`, noindex test rewritten, owner checklist (done 2026-11-08), 331 Vitest, 8 `@indexing` e2e (Chromium)                                                                                                                   |
| T6.4    | #30      | Yes    | `ShopLabel` (muted "Shop" and an outlined "Coming soon" pill, plain text) in the nav and mobile menu, 337 Vitest, 3 `Shop label` e2e per browser                                                                                                                        |
| T6.5    | #31      | TBC    | Fifth category and nine coming-soon services (24 in 5), five-column dropdown (subgrid), five-card About grid, `Service.body` removed, placeholder hero photo, 338 Vitest, 740 Playwright passed and 100 skipped (both browsers, run against `pnpm build && pnpm start`) |

Planned order (dependency first, then value and risk): T6.1, T6.2, T6.3, T6.4, T6.5, T5.11 (moved after T6.5 by Haider, 2026-11-08), T5.12, T6.6, T6.7, T6.8, T6.9, T6.10, T6.11, T6.12, T6.13, T6.14. Scope per ticket is in the Remaining table of `status.md`.

## Decisions

| Decision                                                                                                                                         | Why                                                                                                                                                                                                                                                        | Who                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| The planning docs ride on the T5.10 PR, there is no separate "T6.0" docs ticket                                                                  | Haider asked for the docs to be updated as part of the current ticket                                                                                                                                                                                      | Haider                       |
| Order: T6.1 and T6.2 first, T5.12 after T6.5, content after the standard (T6.6)                                                                  | The site is live: the landline and the 404s are visible and cheap. T5.12's final screenshots and metrics should cover the final nav, dropdown and fifth theme. Content is data only and needs no motion work                                               | Opus plan, Haider to confirm |
| Redirect only real equivalents. Shop and account URLs stay a branded 404                                                                         | An honest 404 beats a soft-404 redirect to home                                                                                                                                                                                                            | Opus plan                    |
| Old-URL redirects use invented, plausible slugs beyond the three confirmed ones. Coming-soon destinations allowed. Old category pages stay a 404 | The Wayback CDX was offline and the old pages never had real URLs, so a harmless guess beats a 404. A redirect to a themed coming-soon page beats a dead end, and the page is `noindex` until live. A category redirect to one service would be a soft 404 | Haider (Stage 1, 2026-11-08) |
| Landline replaces the mobile on primary Call buttons. WhatsApp and the Footer mobile row keep the mobile                                         | A landline has no WhatsApp, and the Footer lists both numbers. Supersedes the T4.3 decision "Call is the mobile"                                                                                                                                           | Syd's request                |
| "Shop (inactive)" is a non-clickable label with a "Coming soon" tag, not a page or a dropdown column                                             | The shop is Phase 8. This is the least that satisfies the request. Confirmed by Haider 2026-11-07                                                                                                                                                          | Opus plan, default           |
| Shop label: one shared `ShopLabel` component, no Footer row, "Coming soon" wording, placed after About                                           | One component keeps the desktop and mobile markup from drifting. Syd asked for "the top", and a dead row among Footer links reads badly. Same wording as the coming-soon pages                                                                             | Haider (Stage 1, 2026-11-08) |
| Pages are indexable as soon as they go live, not `noindex` until Syd approves                                                                    | Indexing is the point of the content, and the content standard keeps copy generic. Confirmed by Haider 2026-11-07                                                                                                                                          | Opus plan, default           |
| AI copy follows a written standard with a Vitest guard, and a review tracker. Emissions pages go last and use lawful-work wording only           | A real local business: invented prices, accreditations, guarantees or emissions-removal wording are a legal and trust risk. The standard is in `tickets/T6.6.md`                                                                                           | Opus plan                    |
| Mechanical / Customisation entries go last in the array                                                                                          | Dropdown column order is the order of first appearance in the data                                                                                                                                                                                         | Opus plan                    |

## Gotchas found while building

- T6.4: the page-wide faded guard (`MotionAudit.fadedElementCount()`) only scans `main` and `footer`, so nothing in the header is checked. The Shop label test reads opacity itself. A future header item that must stay solid needs its own check
- T6.4: WebKit (Safari's default) never Tabs onto links, so "Tab goes from About to the call button" cannot be read there. That one test is skipped on WebKit, and Vitest covers the missing `tabindex`
- T6.3: `sitemap.ts` and `robots.ts` must export only the default function and `dynamic`. Next re-exports every named export from these files as route config. Both build static (○) with `dynamic = 'error'`
- T6.3: a rule about a service status needs a fixture, not real data, or it goes vacuous once every page is live. `vi.mock('@/lib/services', { spy: true })` keeps the real getters and `mockReturnValueOnce` swaps one call. The sitemap lists the production origin even on localhost, so the e2e test compares each `<loc>` to `siteConfig.url` plus the path and requests the path
- T6.2: `next.config.ts` imports `./src/lib/redirects` with a relative path and no extension. That works on Next 16's default config loader (confirmed by `pnpm build` and `.next/routes-manifest.json`). The `@/` alias is not used there. `redirects.ts` must never import `services.ts` (icons) or anything with an alias
- T6.2: with `trailingSlash` unset, Next adds its own `/x/` to `/x` 308 rule before ours, so sources must have no trailing slash and `/x/` takes two hops. `www` to apex is Vercel domain config
- T6.2: a redirect runs before pages and `public/`, so a source that equals a real route would hide it. The Vitest guard reads the top-level folders of `src/app` and `public` (plus a reserved list), so it fails only if a redirect source shares a first segment with a route. A future Phase 8 `app/shop` does not trip it, because no source is under `/shop`. The same test keeps `/shop` in `KEPT_404_PREFIXES` (paths that must stay a 404), so revisit that list when the shop ships
- T6.2: Playwright's `reuseExistingServer` reuses any server on port 3000, so restart it after a `next.config.ts` change. Redirects need a restart, they do not hot-reload

- T6.1: the header button's `min-w-70` still holds. Measured at 1280px with it lifted, the landline text is 271.4px in Inter and 276.4px (Chromium) or 276.5px (WebKit) in the fallback font, so under 280px. The desktop layout-shift guard alone proves nothing while `min-w-70` fixes the box, so measure the natural width when the button text changes
- T6.1: the WhatsApp-stays-mobile test passes before any code change, so it was proven red once by pointing `WHATSAPP_NUMBER` at the landline temporarily (restored)

## Gotchas found while planning

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

- `Service.body` was never rendered. Removed in T6.5 (first commit)
- `RelatedServices` takes the first three in array order, so Stage 1 Tuning shows on every Remap page. A choice, not a bug
- WhatsApp prefill wording, brand-name casing, accent contrast and the map facade stay as listed in `status.md`
