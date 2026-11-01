# Architecture

Static Next.js App Router site on Vercel. Written from the project plan; check the repo for the exact current tree.

## Routes and rendering

| Route              | Rendering                      | Notes                |
| ------------------ | ------------------------------ | -------------------- |
| `/`                | Static                         | Home                 |
| `/about`           | Static                         | T4.1                 |
| `/services/[slug]` | Static, `generateStaticParams` | All 15 service pages |
| `/not-found`       | Static                         | T4.2                 |

- No API routes and no dynamic rendering anywhere.
- Categories are data, not folders. They drive the nav and the page theme, not the URL.
- No `/services` index and no breadcrumbs. The Navbar mega-menu covers navigation.
- Contact is `tel:`, `wa.me` and `mailto:` links only. No form, no backend.

## Source tree

```
src/
  app/
    layout.tsx            root layout (Navbar, WhatsAppWidget, Footer, <main>)
    page.tsx              home
    globals.css           @theme design tokens
    about/page.tsx
    not-found.tsx
    services/[slug]/page.tsx   generateStaticParams, generateMetadata
  components/
    layout/    Navbar, MobileMenu (Client), ServicesDropdown, Footer, WhatsAppWidget
    ui/        LinkButton, ServiceCard, PageHero, SectionWrapper, ContactLine, ReviewCard
    home-sections/     HeroSection, ServicesGrid, WhyChooseUsSection (+ CSS Module),
                        ReviewsSection, ReviewsCarousel (Client), FindUsSection,
                        MapEmbed (Client), AboutSnippet
    service-sections/   ServicePageTemplate, ServiceHero, ComingSoonPanel, ServiceCtaBand,
                        RelatedServices, then T3.4: ServiceSections, ProseSection,
                        FeatureSection, StepsSection, SpecBand, FaqSection,
                        VideoSection, VideoEmbed (Client)
  lib/        services.ts, service-themes.ts, reviews.ts, constants.ts
  types/      service.ts, review.ts
public/images/services/   category hero images
tests/                    Playwright specs (Page Object Model + custom fixture)
```

## Client Components (everything else is Server)

`MobileMenu`, `ReviewsCarousel`, `MapEmbed`, and `VideoEmbed`. Each holds only the interactive part. Content is passed in from a Server parent.

## Prop flow

```
lib/services.ts
  getAllServices()           -> Home -> ServicesGrid -> ServiceCard
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

| Decision                 | Choice                                                              | Why                                                                                                          |
| ------------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Render the section union | `switch` on `section.type` with a `never` default                   | TS narrows a switch and checks exhaustiveness. A `Record<type, Component>` map needs casts to stay type-safe |
| Hero                     | `ServiceHero`, not an extended `PageHero`                           | Same precedent as `HeroSection`: do not bloat `PageHero` with image and overlay props                        |
| Category theming         | `Record<Category, CategoryTheme>` of literal class strings          | Tailwind cannot build classes from data at runtime                                                           |
| Coming-soon state        | `status?: 'live' \| 'coming-soon'`, undefined counts as coming-soon | A new service cannot ship an empty page by accident                                                          |
| Icons in section data    | `LucideIcon` references allowed                                     | Safe only because every block is a Server Component                                                          |
| Video                    | Click-to-load facade (poster, then iframe on click)                 | An always-on iframe loads about 0.5 MB of YouTube JS whether or not anyone watches                           |
| Coming-soon SEO          | `robots: { index: false }` until content lands                      | A thin indexed page is worse for local SEO than no page                                                      |
| Third-party embeds       | None on page load                                                   | Reviews and map are static. Video uses the facade                                                            |

## Deferred (Phase 5)

Shop, basket, Stripe checkout, Neon Postgres via Vercel Marketplace, Prisma. `AddToBasketButton` will be a Client Component importing `buttonVariantStyles` and `buttonSizeStyles` from `LinkButton`.

## Domain

teamautotech.co.uk uses an A record and CNAME, not a registrar transfer, to avoid disrupting business email. Done last (T6.3).
