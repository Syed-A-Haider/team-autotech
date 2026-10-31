# Design

## Direction

- Dark theme, single orange accent, Inter only. Hierarchy comes from weight, size and tracking, not a second typeface
- Sporty and minimal. Flat backgrounds, no alternating light and dark bands
- Page sections share one divider (`divide-y divide-border` on the wrapper) instead of a border per section
- Service page identity comes from the hero (image, eyebrow, overlay), not from colour
- No pricing on service pages

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

## Images

- Category hero images live in `public/images/services/` as `tuning.jpg`, `programming.jpg`, `security.jpg`, `electrical.jpg`
- Specs: 1920x1080 or larger, landscape, already dark, no baked-in text, subject in the right third so the left stays quiet for the heading
- Use `next/image`. With `fill`, the parent must be positioned
- T3.32 added images to the site. Check how before adding more

## Motion

T3.32 added a transition on page navigation. Read how it is built before adding other animation. Keep new motion subtle.

## Responsive checks

Check 375, 768 and 1280 px. Known: minor card-text wrapping at 360px on `ServicesGrid` (T6.2).

## Do not change

- WhatsApp brand green on `WhatsAppWidget`
- Different "Popular" badge styles in different places (Navbar mega-menu vs `ServiceCard`)
- Flat backgrounds and single shared divider approach
