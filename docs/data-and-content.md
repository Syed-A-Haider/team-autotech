# Data and content

Components never import these files directly. Pages call the getters and pass typed props.

For exact types, read `src/types/service.ts`. Do not copy shapes from this doc.

## Service model (`types/service.ts`)

- `Service`: `slug` (unique id), `title`, `category`, `shortDescription`, `body`, `icon` (`LucideIcon`), `popular?`
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
- 15 services across 4 categories: tuning (4), programming (3), auto security (4), auto electrical (4). Take the exact category strings from `types/service.ts`; earlier drafts used both "Auto Electrical" and "Auto Electrical Services"
- Add a service by copying an existing entry, using a unique slug and an existing category
- The homepage grid order is deliberate and separate from `popular`

## `lib/service-themes.ts`

- `CATEGORY_THEMES` is a `Record<Category, CategoryTheme>` using `satisfies`, so a missing category fails to compile
- `CategoryTheme` fields: `eyebrow`, `heroImage`, `overlayClassName`, `motifClassName`
- All values are literal Tailwind class strings. Single accent colour. Category identity comes from the hero, not from colour
- No test for this file: `satisfies` already proves completeness

## Section content (T3.4 onward)

- A page's body is its `sections` array. Content tickets (T3.6 to T3.9) are data edits only
- If a page needs something no block can do, add a block or variant in a component ticket first. Do not hack the data
- Section data may hold `LucideIcon` references because blocks are Server Components. Never pass section data into a Client Component
- No pricing anywhere. Prices vary by vehicle and spec, so CTAs are enquiry-only
- Real copy comes from Syd's WordPress pages. Structure and placeholder content first, real copy after his review

## `lib/constants.ts`

Flat named exports:

- `siteConfig` (`name`, `description`, `url`)
- `PHONE_LANDLINE`, `PHONE_MOBILE`, `EMAIL`, `ADDRESS`
- `WHATSAPP_NUMBER`, `WHATSAPP_LINK`
- `TEL_MOBILE_LINK`, `TEL_LANDLINE_LINK`, `MAILTO_LINK`
- `OPENING_HOURS`, `SOCIAL_LINKS`, `GOOGLE_PROFILE_LINK`
- `MAPS_EMBED_SRC`, `MAPS_DIRECTIONS_LINK`, both derived from `ADDRESS`

Never retype contact details elsewhere. Import them.

## `lib/reviews.ts`

- Five curated Google reviews, typed by hand. No live API and no third-party widget
- Names shortened (for example "Nichola D."). No reviewer photos (UK GDPR). Initials avatars instead
- `GOOGLE_REVIEW_COUNT_DISPLAY` is computed once and shared by `WhyChooseUsSection` and `ReviewsSection`
- Optional `photoUrl` is reserved for cases with explicit consent
