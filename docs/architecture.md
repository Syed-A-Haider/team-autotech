# Architecture

Static Next.js App Router site on Vercel. Written from the project plan; check the repo for the exact current tree.

## Routes and rendering

| Route              | Rendering                      | Notes                                                                                                                                                                                                             |
| ------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                | Static                         | Home                                                                                                                                                                                                              |
| `/about`           | Static                         | T4.1                                                                                                                                                                                                              |
| `/services/[slug]` | Static, `generateStaticParams` | All 15 service pages                                                                                                                                                                                              |
| Old WordPress URLs | 308 platform redirect          | `lib/redirects.ts` (plain data), read by `next.config.ts` `redirects()` (T6.2). Vercel serves them from the routes manifest, so the site is still fully static. Shop and account URLs are deliberately not listed |
| Unmatched URLs     | Static                         | `app/not-found.tsx`, built as `/_not-found`. HTTP 404, `noindex` added by Next. Unknown slugs are stopped by `dynamicParams = false` and land here too                                                            |
| `/sitemap.xml`     | Static metadata route          | `app/sitemap.ts` (T6.3): home, About and `live` services only, absolute URLs on `siteConfig.url`. Follows `status`, so a service joins it the moment it goes live                                                 |
| `/robots.txt`      | Static metadata route          | `app/robots.ts` (T6.3): allow all, no disallow, points at the sitemap                                                                                                                                             |

- No API routes and no dynamic rendering anywhere. The sitemap and robots files are static metadata routes, not API routes. `export const dynamic = 'error'` on `about`, `services/[slug]`, `sitemap.ts` and `robots.ts` makes the build fail if any of them ever turns dynamic.
- Why the sitemap and robots exist (T6.3): the live site replaced a crashed WordPress site on the same domain (only the DNS changed), so Google knows the domain but still holds the old URLs and has no list of the new pages. The risk is lower than a new launch, not zero. The sitemap lists the pages worth indexing, and every later content batch (T6.7 to T6.12) is listed with no code change. Coming-soon pages stay out because they are `noindex`, and a noindex URL in a sitemap sends Google a conflicting signal. Do not export anything else from `sitemap.ts` or `robots.ts`: Next re-exports named exports as route config.
- Categories are data, not folders. They drive the nav and the page theme, not the URL.
- No `/services` index (by decision) and no breadcrumbs. The Navbar mega-menu and the homepage Popular grid cover navigation. `/services` is a normal 404.
- Contact is `tel:`, WhatsApp and `mailto:` links only. No form, no backend.

## Source tree

```
src/
  app/
    layout.tsx            root layout (Navbar, WhatsAppWidget, Footer, <main>)
    page.tsx              home
    sitemap.ts            /sitemap.xml, live pages only (T6.3)
    robots.ts             /robots.txt, allow all and the sitemap link (T6.3)
    globals.css           @theme design tokens, motion tokens
    motion.css            reusable motion blocks (T5), imported by globals.css
    about/page.tsx             static About page, copy in exported constants (T4.1)
    not-found.tsx              branded 404 for unmatched URLs and notFound() (T4.2)
    services/[slug]/page.tsx   generateStaticParams, generateMetadata
  components/
    layout/    Navbar, MobileMenu (Client), ShopLabel, ServicesDropdown, ServicesDropdownLink (Client, blurs on click), Footer, WhatsAppWidget
    ui/        LinkButton, ServiceCard, PageHero, SectionWrapper, ContactLine, ReviewCard,
               PageTransition, SectionHeading, SectionShell, EnquiryBand, ContactLinks,
               ScrollProgress (decorative bar, rendered by ServicePageTemplate, T5.10)
    home-sections/     HeroSection, ServicesGrid, WhyChooseUsSection (+ WhyChooseUsCard),
                        ReviewsSection, ReviewsCarousel (Client), FindUsSection,
                        MapEmbed (Client), AboutSnippet
    service-sections/   ServicePageTemplate, ServiceHero, ComingSoonPanel,
                        ServiceCtaBand, RelatedServices, ServiceSections,
                        ProseSection, FeatureSection, StepsSection, SpecBand, FaqSection,
                        VideoSection, VideoEmbed (Client)
  lib/        services.ts, service-themes.ts, reviews.ts, constants.ts, routes.ts (serviceHref), redirects.ts (old WordPress URLs, T6.2)
  types/      service.ts, review.ts
public/images/            logo.jpg (placeholder), hero-background.jpg, services/ (category heroes), videos/ (posters)
public/reviews/           review photos
tests/                    Playwright specs (Page Object Model + custom fixture); config/testData.ts, fixtures.ts, pages/ (incl. MotionAudit, used by motion.spec.ts)
```

## Client Components (everything else is Server)

`MobileMenu`, `ServicesDropdownLink`, `ReviewsCarousel`, `MapEmbed`, and `VideoEmbed`. Each holds only the interactive part. Content is passed in from a Server parent.

## Prop flow

```
lib/services.ts
  getFeaturedServices()      -> Home -> ServicesGrid -> ServiceCard
  getAllServices()           -> services/[slug]/page.tsx (generateStaticParams)
  getRelatedServices()       -> services/[slug]/page.tsx
  getServiceBySlug(slug)     -> services/[slug]/page.tsx -> ServicePageTemplate (service: Service)
  groupServicesByCategory()  -> Navbar -> ServicesDropdown / MobileMenu (trimmed shape)
lib/service-themes.ts
  CATEGORY_THEMES[category]  -> ServicePageTemplate -> ServiceHero
```

## Service page design (T3)

Page structure is data, the same way page content is. Three axes of variation, all in data:

1. Block order and mix: each service lists the sections it wants, in order
2. Per-block layout variant: for example `FeatureSection` supports `grid`, `alternating`, `list`
3. Category theme: hero image, eyebrow, overlay and motif, applied once at the shell

| Decision                     | Choice                                                                                                            | Why                                                                                                                                           |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Section layout and numbering | Derived in `ServiceSections` from section type and position                                                       | No new data fields, so every service gets the rhythm free and the union stays unchanged                                                       |
| Render the section union     | `switch` on `section.type` with a `never` default                                                                 | TS narrows a switch and checks exhaustiveness. A `Record<type, Component>` map needs casts to stay type-safe                                  |
| Hero                         | `ServiceHero`, not an extended `PageHero`                                                                         | Same precedent as `HeroSection`: do not bloat `PageHero` with image and overlay props                                                         |
| Category theming             | `Record<Category, CategoryTheme>` of literal class strings                                                        | Tailwind cannot build classes from data at runtime                                                                                            |
| Coming-soon state            | `status?: 'live' \| 'coming-soon'`, undefined counts as coming-soon                                               | A new service cannot ship an empty page by accident                                                                                           |
| Icons in section data        | `LucideIcon` references allowed                                                                                   | Safe only because every block is a Server Component                                                                                           |
| Video                        | Click-to-load facade (poster, then iframe on click)                                                               | An always-on iframe loads about 0.5 MB of YouTube JS whether or not anyone watches                                                            |
| Closing bands                | One shared `EnquiryBand` behind `ComingSoonPanel` and `ServiceCtaBand`, centred, with the `SectionHeading` stripe | Both ask for the same enquiry. One band keeps spacing in one place, and each wrapper only supplies copy. The buttons come from `ContactLinks` |
| Coming-soon SEO              | `robots: { index: false }` until content lands                                                                    | A thin indexed page is worse for local SEO than no page                                                                                       |
| Third-party embeds           | None on page load                                                                                                 | Reviews and map are static. Video uses the facade                                                                                             |

## Deferred (Phase 8)

Shop, basket, Stripe checkout, Neon Postgres via Vercel Marketplace, Prisma. `AddToBasketButton` will be a Client Component importing `buttonVariantStyles` and `buttonSizeStyles` from `LinkButton`. Until then the nav shows a non-clickable `ShopLabel` (T6.4). When the shop ships, it becomes a link to the new route (replace `ShopLabel` in `Navbar` and `MobileMenu`). The T6.2 redirects test lists `/shop` among the paths that must stay a 404 (`KEPT_404_PREFIXES`), so revisit that list in the same ticket.

## Domain

teamautotech.co.uk is live on this site. It uses an A record and CNAME, not a registrar transfer, to avoid disrupting business email. It was connected early, out of the planned order, because the old WordPress site crashed, so the former T6.3 no longer exists. Consequences: old WordPress URLs already 404, and copy that was waiting for Syd's approval is public (see `status.md`).
