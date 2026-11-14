# Data and content

Components never import the raw services or reviews arrays. Pages call the getters and pass typed props. Constants and pure helpers from `lib/` (for example `GOOGLE_REVIEW_COUNT_DISPLAY`, `getReviewInitials`) are fine to import.

For exact types, read `src/types/service.ts`. Do not copy shapes from this doc.

## Service model (`types/service.ts`)

- `Service`: `slug` (unique id), `title`, `category`, `shortDescription`, `icon` (`LucideIcon`), `popular?`
- Added in T3.1: `sections?` (array of `ServiceSection`), `status?`, `heroImage?`
- `Category`: a string union. Read it from the types file. Do not retype category names by hand
- `ServiceSection`: a discriminated union on `type`. Read it from the types file before building any block
- `ServiceStatus`: `'live' | 'coming-soon'`. Undefined is treated as coming-soon
- `popular` marks Syd's priority earners (Stage 1 Tuning, Ghost Immobiliser II). It was renamed from `featured` and only drives the Popular badge

## `lib/services.ts`

- The array is private. Access it through exported functions only:
  - `getAllServices()`
  - `getServiceBySlug(slug)`
  - `groupServicesByCategory()`
  - `getFeaturedServices()`, which maps an explicit ordered slug list for the homepage grid
  - `getRelatedServices(service, limit = 3)`, same-category cross-links for the page footer
- 24 services across 5 categories (T6.5): tuning (6), programming (4), auto security (5), auto electrical (5), mechanical / customisation (4). Column order is the order of first appearance in `services.ts`. The nine added in T6.5 are coming-soon with one-line titles only. `Service.body` was removed in T6.5 (it was never rendered). Take the exact category strings from `types/service.ts`; earlier drafts used both "Auto Electrical" and "Auto Electrical Services"
- Add a service by copying an existing entry, using a unique slug and an existing category
- The homepage grid order is deliberate and separate from `popular`

## `lib/service-themes.ts`

- `CATEGORY_THEMES` is a `Record<Category, CategoryTheme>` using `satisfies`, so a missing category fails to compile
- The fifth theme (Mechanical / Customisation) has a 45deg hatch motif and a PLACEHOLDER hero image (`/images/hero-background.jpg`). Swap it for `/images/services/mechanical.jpg` (Haider's photo, 500 KB or less) in `service-themes.ts`
- `CategoryTheme` fields: `eyebrow`, `heroImage`, `overlayClassName`, `motifClassName`
- All values are literal Tailwind class strings. Single accent colour. Category identity comes from the hero, not from colour
- No test for this file: `satisfies` already proves completeness

## Section content (T3.4 onward)

- A page's body is its `sections` array. Content tickets are data edits only. Seven services are live (Stage 1 Tuning, Ghost Immobiliser II, Scorpion X Series, and since T6.7 BMW, Mercedes, VAG Programming and Component Protection Removal); the other 17 are coming-soon (title one-liners only). T6 (planned 2026-11-07) adds nine services and a fifth category (24 in 5, done in T6.5) and writes AI-drafted copy for every coming-soon page in batches (T6.7 to T6.12, brief in `docs/tickets/T6-content.md`)
- `ServiceSections` plans layout and numbering and wraps each block in `ui/SectionShell`, which owns the wrapper, the optional `title` `h2` and the spacing. Blocks render only their inner content, so spacing and title style change in one place
- A live service with no `sections` falls back to `ComingSoonPanel`. The `video` type renders `VideoSection`: a local poster (`public/images/videos/<slug>.jpg`, 16:9, at least 1280x720, no baked-in play button) and a play button. `videoId` is the bare 11-character id, not a URL. The `title` names the player and the renderer shows it as the `h2`. A missing poster file renders a broken box and the build does not catch it, so check the file exists. Ghost Immobiliser II is the worked example
- `Feature` has no image field, so the `alternating` layout is text-only
- If a page needs something no block can do, add a block or variant in a component ticket first. Do not hack the data
- Section data may hold `LucideIcon` references because blocks are Server Components. Never pass section data into a Client Component
- No pricing anywhere. Prices vary by vehicle and spec, so CTAs are enquiry-only
- Where the old WordPress page has copy, use it (corrected, see below). Where it is empty, the copy is AI-drafted to `docs/content/_standard.md` (T6.6) and tracked in `docs/content/_review.md` as approved by default the day it goes live. Syd does not approve it first (2026-11-10), and an issue he raises becomes its own ticket
- The copy guard (`lib/services.content.test.ts`, T6.6) reads `getAllServices()` and fails on the risky claims in the standard: prices, figures, accreditations, guarantees, times, emissions removal, legal claims, banned words, US spellings and a `shortDescription` outside 70 to 150 characters on a live page. It checks `shortDescription` and `sections` only, not component copy. A phrase a page may keep goes in its `ALLOWED_COPY` list (slug, rule, exact phrase). Adding an entry needs Haider's OK and a `_review.md` row, and a confirmed claim never goes on a new page
- One-liners (`shortDescription`) on services with no source copy only restate the title, or a nav label that is Syd's own. No scope claims, product versions or accreditations
- Where copy lives: raw source briefs are `docs/content/<slug>.md` (verbatim from the old site, mistakes included, reference only). The published copy is the service's `sections` in `lib/services.ts`. Stage 1 Tuning is the worked example. Edit the data, not the brief
- Do not treat Syd's copy as correct. Fix spelling, grammar, punctuation and capitalisation, use British English (specialise, optimise, colour), and keep an energetic, sporty tone that still sounds natural. Keep the meaning. Add no new facts, claims, figures or prices, and do not drop any. List meaningful rewording in the PR so Syd can confirm it
- Old-site images can hide copy in Photoshop text layers: `curl -s <url> | LC_ALL=C grep -aoE 'photoshop:LayerText="[^"]*"'`. Layers pile up across exports and can be hidden, so open the image and use only what is visible. Put the text in native blocks, never in images
- FAQs: no source copy exists, so live pages carry placeholder `faq` sections drafted from the page's own facts. Keep answers to sourced facts, enquiry-only pricing and "get in touch" for fitment. they are approved by default (see `_review.md`)
- Copy Syd has not reviewed: the site is live, so it is public. Each page is listed in `content/_review.md` (`status.md` open items point there) as approved by default (2026-11-10), and an issue he raises becomes its own ticket

## `lib/constants.ts`

Flat named exports:

- `siteConfig` (`name`, `description`, `url`)
- `PHONE_LANDLINE`, `PHONE_MOBILE`, `EMAIL`, `ADDRESS`
- `WHATSAPP_NUMBER`, `WHATSAPP_LINK`
- `TEL_MOBILE_LINK`, `TEL_LANDLINE_LINK`, `MAILTO_LINK`
- Every primary Call button (header, hero, mobile menu, `ContactLinks`, service hero) uses `PHONE_LANDLINE` and `TEL_LANDLINE_LINK` (T6.1). The mobile is for WhatsApp (`WHATSAPP_NUMBER`) and the Footer "(Mobile)" row only. Out of hours the landline redirects to the mobile
- `OPENING_HOURS`, `SOCIAL_LINKS`, `GOOGLE_PROFILE_LINK`
- Old WordPress URLs: to add a redirect, add the old slug to `SERVICE_SOURCES` in `lib/redirects.ts` (an alias under its service) or an entry to `ABOUT_REDIRECTS`. Lowercase, no trailing slash. Never list shop, account or WordPress system URLs. A new service needs its root-slug entry (a Vitest guard checks)
- `YEARS_EXPERIENCE` (15, "15+ years" approved by Syd). Used by `AboutSnippet` and the About page. `WhyChooseUsSection` still hardcodes it (follow-up)
- `MAPS_EMBED_SRC`, `MAPS_DIRECTIONS_LINK`, both derived from `ADDRESS`

Never retype contact details elsewhere. Import them.

## `lib/reviews.ts`

- Five curated Google reviews, typed by hand. No live API and no third-party widget
- Names shortened (for example "Nichola D."). No reviewer photos (UK GDPR). Initials avatars instead
- `GOOGLE_REVIEW_COUNT` is the exact figure (update it on milestones). `GOOGLE_REVIEW_COUNT_DISPLAY` is derived from it once (rounded down to 10) and shared by `WhyChooseUsSection` and `ReviewsSection`. Components use the display value, so nothing imports the raw count yet. Keep it for the motion phase (for example a count-up). The rounding assumes at least 10 reviews
- Optional `photoUrl` is reserved for cases with explicit consent
