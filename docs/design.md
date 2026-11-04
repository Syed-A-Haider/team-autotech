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

The accent hex is provisional until Syd supplies the logo. Changing it is a one-line token edit.

## Z-index scale

`z-30` Navbar, `z-40` WhatsAppWidget, `z-50` MobileMenu overlay. Stay inside this scale.

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
- Who We Are: text beside a facts panel (`YEARS_EXPERIENCE` stat plus three highlights from approved copy). What We Do: four category cards, every service a link (icon plus title, the `ServicesDropdown` row style, no coming-soon marker). Find Us: address as text, hours, and a Get Directions button. Phone and email live in the Footer and closing band only
- `SectionShell` is now used only by `ServiceSections`. It stays in `ui/`

## Closing bands

- `EnquiryBand` is the shared closing band: stripe heading (no number), radial glow, optional skewed `badge` chip (solid accent, large, `text-background`: the first thing seen in the band), centred pitch, then Call (primary) and WhatsApp (secondary) `lg` buttons, stacked on mobile. It powers `ComingSoonPanel` (badge "Coming soon") and `ServiceCtaBand` (no badge)
- `RelatedServices` uses the same centred stripe heading, with no glow. All closing sections use `py-16 lg:py-24`
- No motion on any of them until T5. The band never renders an `h1`, and it shows no opening hours or pricing

## Images

- Category hero images live in `public/images/services/` as `tuning.png`, `programming.jpg`, `security.jpg`, `electrical.jpg`
- Specs: 1920x1080 or larger, landscape, already dark, no baked-in text, subject in the right third so the left stays quiet for the heading
- No product or carousel images on service pages. An image-capable block needs its own component ticket first
- Use `next/image`. With `fill`, the parent must be positioned
- T3.32 added the category hero images. Check how before adding more

## Motion

T3.31 added a transition on page navigation (`PageTransition`). Read how it is built before adding other animation. Keep new motion subtle. Service sections have no scroll or hover animation. Non-link cards get no hover effect. Planned: a dedicated motion phase (T5.1, T5.2) will add scroll reveals and richer effects across the site, and rewrites this section. Do not add ad hoc animation before then.

## Responsive checks

Check 375, 768 and 1280 px (procedure in `testing.md`, Visual verification). Known: minor card-text wrapping at 360px on `ServicesGrid` (T6.2).

## Do not change

- WhatsApp brand green on `WhatsAppWidget`
- Different "Popular" badge styles in different places (Navbar mega-menu vs `ServiceCard`)
- Flat base backgrounds (no alternating bands) and single shared divider approach
