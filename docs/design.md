# Design

## Direction

- Dark theme, single orange accent, Inter only. Hierarchy comes from weight, size and tracking, not a second typeface
- Sporty and minimal. Base backgrounds stay flat, with no alternating light and dark bands. Service-page sections may add three accent motifs only: a large faded section number, a skewed accent stripe, and a soft radial accent glow behind the heading (`bg-radial from-accent/10`). The closing bands add one more: a skewed badge chip. See Service page sections and Closing bands
- Page sections share one divider (`divide-y divide-border` on the wrapper) instead of a border per section
- Service page identity comes from the hero (image, eyebrow, overlay), not from colour

## Tokens

Defined in `src/app/globals.css` with `@theme inline`. Read the file for values. Never use a raw hex in a component.

| Token                        | Use                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| `background`                 | Page base                                                                             |
| `surface`                    | Cards, nav, raised panels                                                             |
| `foreground`                 | Primary text                                                                          |
| `muted`                      | Secondary and caption text                                                            |
| `border`                     | Dividers, card outlines                                                               |
| `accent`                     | CTAs, links, highlights                                                               |
| `accent-hover`               | Hover and active (a separate token, because opacity on near-black turns orange brown) |
| `whatsapp`, `whatsapp-hover` | WhatsApp brand green, a deliberate exception                                          |

Utilities generated from them include `bg-surface`, `text-foreground`, `text-muted`, `border-border`, `bg-accent`, `hover:bg-accent-hover`.

The accent hex is provisional until Syd supplies the final logo (the current `public/images/logo.jpg` is a placeholder). Changing it is a one-line token edit.

## Z-index scale

`z-30` Navbar, `z-40` WhatsAppWidget, `z-50` MobileMenu overlay. Stay inside this scale for fixed and sticky layers. In-flow content may use `z-10` to sit above a sibling background (`HeroSection`, `ServiceHero`), and the decorative glow in `SectionHeading` uses `-z-10`.

## Layout building blocks

- `SectionWrapper`: max-width and padding container, polymorphic (`as="section"` or `"div"`)
- `PageHero`: flat text banner for simple pages
- `HeroSection`: full-bleed homepage hero. Fixed height so the services grid stays visible
- `ServiceHero`: themed, image-backed hero for service pages. Do not extend `PageHero` for this

## Service page sections

- `ServiceSections` picks the layout per section. `ui/SectionShell` renders it (glow, `SectionHeading`: faded number, skewed stripe, h2, then the body in a `split`, `split-reverse` or `stacked` layout). No data fields drive it
- Split (heading beside content at `lg`, sides alternate): prose, steps, faq, feature `list`. Stacked (centred heading above): feature `grid` and `alternating`, specband, video (player centred under its heading, max `4xl`). Untitled sections get no heading, number or glow
- Prose: the first paragraph is a lead (larger, `foreground`)
- Feature grid never leaves an orphan for 1 to 6 items (plan in `FeatureSection`). `SpecBand` columns are chosen by count
- Text on `bg-accent` uses `text-background`. `foreground` on accent is about 3.1:1 and fails AA
- `SectionHeading`, `SectionShell` and `EnquiryBand` live in `ui/` (moved from `service-sections/` at T4.1, when About became a second consumer). `GLOW_STYLES` lives in `SectionHeading` and is shared. It is a gradient, never a filter

## About page

- Deliberately not the numbered service-page look: no faded numbers, glows or alternating split. Un-numbered `SectionHeading` stripe headings inside `SectionWrapper` (the `RelatedServices` pattern), surface panels with the racing stripe, `py-16 lg:py-24`
- Who We Are: text beside a facts panel (`YEARS_EXPERIENCE` stat plus three highlights from approved copy). What We Do: four category cards, every service a link (icon plus title, the `ServicesDropdown` row style, no coming-soon marker). Find Us: address as text, hours, and a Get Directions button (its heading uses `stripe={false}` because the panel has its own stripe). The phone number lives in the Footer and the closing band, the email address in the Footer only
- `SectionShell` is now used only by `ServiceSections`. It stays in `ui/`

## 404 page

- `app/not-found.tsx`: a centred column in `SectionWrapper` (`max-w-2xl`, `py-24` on mobile, `py-16 lg:py-24` from `sm`, with looser gaps on mobile so it is not squashed above the footer). A large faded "404" (the race-number look, `text-accent/25`, `aria-hidden`), the racing stripe (`STRIPE_STYLES`, exported from `SectionHeading`), the single `h1`, one muted line and one "Back to home" `LinkButton` (`lg`). No glow, badge, icons, contact block or service links
- Plain tone, no jokes. It renders inside the root `<main>`, so it adds none

## Closing bands

- `EnquiryBand` is the shared closing band: stripe heading (no number), radial glow, optional skewed `badge` chip (solid accent, large, `text-background`: the first thing seen in the band), centred pitch, then `ContactLinks` (below). It powers `ComingSoonPanel` (badge "Coming soon") and `ServiceCtaBand` (no badge)
- `ui/ContactLinks` renders the band's buttons: Call (primary) and WhatsApp (secondary), `lg`, all hrefs from `constants.ts`. The consumer sets layout through `className` (the band stacks them full width on mobile and centres one row from `sm`). The Call button shows the mobile number as text from `sm` up, for desktop visitors with no dialler, and hides it on phones where the button is tapped. No email button, by decision: the audience and Syd hardly use it, and the address stays in the Footer. It adds no motifs of its own, the band supplies the theme
- `RelatedServices` uses the same centred stripe heading, with no glow. All closing sections use `py-16 lg:py-24`
- No motion on any of them until T5. The band never renders an `h1`, and it shows no opening hours or pricing

## Images

- Category hero images live in `public/images/services/` as `tuning.png`, `programming.jpg`, `security.jpg`, `electrical.jpg`
- Specs: 1920x1080 or larger, landscape, already dark, no baked-in text, subject in the right third so the left stays quiet for the heading
- No product or carousel images on service pages. An image-capable block needs its own component ticket first
- Use `next/image`. With `fill`, the parent must be positioned
- T3.32 added the category hero images. Check how before adding more
- The four hero images are large originals (about 20 MB in total). Left as is by decision (T4.4), because the site needs few images

## Motion

CSS first, no new Client Components. Phase 5 (T5.1 to T5.12, briefs in `docs/tickets/`) builds it. Tokens live in `globals.css` (`:root`), reusable blocks in `motion.css` as Tailwind `@utility` classes, so an effect is one class on an existing element. Do not add ad hoc animation outside a ticket. `PageTransition` (T3.31, a 200ms fade on route mount) stays until T5.5 decides its fate.

**Intensity by page, phone first.** Homepage lively, service pages medium, About and 404 calm. Design the phone first, then add desktop-only extras.

**Rules**

- Animate only `opacity`, `translate`, `scale` and `rotate`. Never size, position, `flex`, padding or font size. Use the individual properties so they compose with `-skew-*`
- Every effect is progressive enhancement. Wrap it so reduced-motion visitors and browsers without support see the finished page, never a hidden one. Scroll effects: `@media (prefers-reduced-motion: no-preference)` plus `@supports (animation-timeline: view())`. Timed effects: the media query only. Tailwind classes use `motion-safe:`
- Scroll reveals use `animation-timeline: view()`, set after the `animation` shorthand, with `fill-mode: backwards` only (a held transform would block hover and trap `position: fixed`). `animation-delay` does nothing on a scroll timeline: stagger by shifting `animation-range`
- Reveal a wrapper, hover or press the element inside it. Never reveal something inside an `overflow-hidden` ancestor (it becomes the scroller and the effect never runs): use `overflow-clip`
- Hover effects only under the hover media query (Tailwind `hover:` already is). Phones get `press` instead. Colour changes use `motion-safe:transition-colors`
- Never fade the hero image or the LCP text in from zero. No parallax, autoplay, count-up, cursor effects or `backdrop-filter` on the header (it traps the fixed mobile menu)
- Support (MDN, Nov 2026): `view()` timelines in Chrome 115, Safari and iOS 26, Firefox 159 (not stable yet). Older iOS and Firefox simply see no scroll effect. `::details-content` Chrome 131, Safari 18.4, Firefox 143. Height animation of `details` (`interpolate-size`) is Chrome only

**Tokens** (`:root` in `globals.css`): `--motion-fast` 150ms, `--motion-base` 300ms, `--motion-slow` 700ms, `--ease-settle`, `--ease-standard`, `--reveal-y` 1rem, `--reveal-x` 1.5rem, `--stagger` 8%.

**Blocks** (all planned until their ticket lands, then listed as built): `details-expand` (T5.2), `reveal`, `reveal-left`, `reveal-right`, `reveal-stagger`, `stripe-draw` (T5.3), `press`, `sheen`, `lift` (T5.4), `hero-in-1/2/3` (T5.5), `scroll-progress` (T5.10). Each has a one-line comment in `motion.css`.

**Standard motion checks** (every T5 ticket): lint, typecheck, test:unit, build, test:e2e including `@motion`. Screenshots at 375, 768 and 1280. A reduced-motion pass. Scroll feel on a real phone. For scroll effects, one look in Firefox for the fallback. For anything near the hero, run the metrics script against the baseline in `t5-completion-report.md`. Budget: LCP within baseline plus 0.1s, CLS 0, JS up at most about 1 KB gzipped (carousel only), CSS up under 3 KB gzipped.

T5.1 fixed the 15 `transition-*` uses that lacked `motion-safe:`. Colour hovers are now instant for reduced-motion visitors.

## Responsive checks

Check 375, 768 and 1280 px (procedure in `testing.md`, Visual verification). Known: minor card-text wrapping at 360px on `ServicesGrid` (T6.2).

## Do not change

- WhatsApp brand green on `WhatsAppWidget`
- Different "Popular" badge styles in different places (Navbar mega-menu vs `ServiceCard`)
- Flat base backgrounds (no alternating bands) and single shared divider approach
