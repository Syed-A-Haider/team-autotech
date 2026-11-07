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

`z-30` Navbar, `z-40` WhatsAppWidget, `z-50` MobileMenu overlay. Stay inside this scale for fixed and sticky layers. In-flow content may use `z-10` to sit above a sibling background (`HeroSection`, `ServiceHero`) or above a positioned sibling (the reviews carousel arrows over the `relative` track), and the decorative glow in `SectionHeading` and the wedge in `WhyChooseUsCard` (inside an `isolate` card, so it stays above the card background) use `-z-10`.

## Layout building blocks

- `SectionWrapper`: max-width and padding container, polymorphic (`as="section"` or `"div"`)
- `PageHero`: flat text banner for simple pages
- `HeroSection`: full-bleed homepage hero. Fixed height so the services grid stays visible
- `ServiceHero`: themed, image-backed hero for service pages. Do not extend `PageHero` for this

## Service page sections

- `ServiceSections` picks the layout per section. `ui/SectionShell` renders it (glow, `SectionHeading`: faded number, skewed stripe, h2, then the body in a `split`, `split-reverse` or `stacked` layout). No data fields drive it
- Split (heading beside content at `lg`, sides alternate): prose, steps, faq, feature `list`. Stacked (centred heading above): feature `grid` and `alternating`, specband, video (player centred under its heading, max `4xl`). Untitled sections get no heading, number or glow
- Prose: the first paragraph is a lead (larger, `foreground`)
- FAQ (T5.2): a bordered, `overflow-clip` list of native `details` rows. The padding sits on the `summary`, so the whole row is the click target, and the answer has its own `px-6 pb-6` block. The chevron is an `aria-hidden` round chip that rotates and turns its border accent when open. An accent edge bar grows down the open row. Hover is a `surface` background and keyboard focus an inset accent ring. The mobile menu categories share the `details-expand` motion but keep a plain chevron
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

CSS first, no new Client Components. Phase 5 (T5.1 to T5.12, briefs in `docs/tickets/`) builds it. Tokens live in `globals.css` (`:root`), reusable blocks in `motion.css` as Tailwind `@utility` classes, so an effect is one class on an existing element. Do not add ad hoc animation outside a ticket. `PageTransition` (T3.31) is a 150ms opacity-only fade on route mount that starts at `--page-enter-from` (0.6), since T5.5.

**Intensity by page, phone first.** Homepage lively, service pages medium, About and 404 calm. Design the phone first, then add desktop-only extras.

**Rules**

- Animate only `opacity`, `translate`, `scale` and `rotate`. Never size, position, `flex`, padding or font size. Use the individual properties so they compose with `-skew-*`. One named exception: `details-expand` animates the `block-size` of `::details-content`. It only starts from a click or key press, so it adds no CLS (shifts within 500ms of input are excluded), it runs in Chromium only behind `@supports`, and it is the only way to animate a native `details`. Find-in-page opening an item is not input, so it counts as a small shift in Chromium. Accepted
- Every effect is progressive enhancement. Wrap it so reduced-motion visitors and browsers without support see the finished page, never a hidden one. Scroll effects: `@media (prefers-reduced-motion: no-preference)` plus `@supports (animation-timeline: view())`. Timed effects: the media query only. Tailwind classes use `motion-safe:`
- Scroll reveals use `animation-timeline: view()`, set after the `animation` shorthand, with `fill-mode: backwards` only (a held transform would block hover and trap `position: fixed`). `animation-delay` does nothing on a scroll timeline: stagger by shifting `animation-range`. The range is `cover 0% cover var(--reveal-end)`, measured against the window, not the element (an `entry` range is measured against the element's own height, so a 4px stripe would pop)
- Reveal a wrapper, hover or press the element inside it. Never reveal something inside an `overflow-hidden` ancestor (it becomes the scroller and the effect never runs): use `overflow-clip`. Proven in T5.3: with `hidden`, every reveal inside `SectionShell` and `EnquiryBand` was captured, with `clip` none, and the page looks identical
- Reveal compact things (headings, cards), not tall containers: the range is a share of the window, so a tall element stays part-faded while most of it is on screen. Do not put a reveal on an element that has its own `translate-*`, `scale-*` or hover lift: wrap it. Reveal `block` elements, because individual `translate` and `scale` skip inline boxes
- Side slides (`reveal-left`, `reveal-right`) need an `overflow-clip` ancestor. A full-width card sliding in from the right pushes the page 8px wider at 375 while it moves. `SectionShell` is one, `RelatedServices` and the home sections are not. The end-of-scroll guards cannot see it
- The section glow stays static (T5.3 decision, revisit in T5.10 or T5.11). The 404 stripe uses `STRIPE_STYLES` directly, so it does not draw
- Hover effects only under the hover media query. Tailwind's `hover:` variant already is, but the custom blocks in `motion.css` are not wrapped for you: each writes `@media (hover: hover)` itself (T5.4), or a tap leaves the effect stuck on a phone. Phones get `press` instead. Colour changes use `motion-safe:transition-colors`, except on an element that has `press`
- `press` owns the transition of any element it is on (T5.4). It lists the properties (colours, `translate`, `scale`) and gives each a duration slot (`--lift-duration`, `--press-duration`, each falling back to `--motion-fast`), so two blocks on one element cannot fight over `transition-property`. So an element with `press` carries no `transition-colors` or `transition-transform` of its own. A block that needs another transitioned property on that element adds it to both lists in `press`. Pseudo-element blocks (`sheen`, `underline-draw`) transition their own `::after` and never collide
- A `:active` rule inside a block must beat a `hover:scale-*` utility, so `press` is written `:active:not(:disabled)` (three selectors, above the two of a hover utility). Specificity decides it, not file order
- Never fade the hero image or the LCP text in from zero, and keep the page fade (`PageTransition`) above zero too: an invisible LCP element is not counted until it shows, and a 200ms fade from 0 cost about 180ms of LCP (T5.1 baseline). LCP text may rise (`hero-solid`). A decorative element that fades from 0 also keeps a tiny font-swap shift out of the CLS score (the 404 numeral). No parallax, autoplay, count-up, cursor effects or `backdrop-filter` on the header (it traps the fixed mobile menu)
- Support (MDN, Nov 2026): `view()` timelines in Chrome 115, Safari and iOS 26, Firefox 159 (not stable yet). Older iOS and Firefox simply see no scroll effect. `::details-content` Chrome 131, Safari 18.4, Firefox 143. Height animation of `details` (`interpolate-size`) is Chrome only

**Tokens** (`:root` in `globals.css`): `--motion-fast` 150ms, `--motion-base` 300ms, `--motion-slow` 700ms, `--ease-settle`, `--ease-standard`, `--reveal-y` 1rem, `--reveal-x` 1.5rem, `--reveal-end` 30% (share of its pass up the window a reveal covers), `--stagger` 3% (extra range per neighbour, 8% was too much under `cover`), and from T5.4 `--press-scale` 0.97, `--lift-y` 0.25rem, `--sheen` (a `color-mix` of `foreground`, so no raw hex), `--pulse-delay` 2s, `--pulse-duration` 1s (one pulse, it runs twice) and `--pulse-reach` 1.5 (the ring grows to 1.5 times its size), and from T5.5 `--hero-zoom` 1.14 (where the hero image starts), `--hero-settle-duration` 1800ms, `--hero-duration` 900ms (one text step or stripe), `--hero-rise-y` 2rem (twice a scroll reveal, so the hero reads as an entrance), `--hero-step` 200ms (gap between hero text steps) and `--page-enter-from` 0.6. The build writes `150ms` as `.15s`, so a test reads a time token with its unit (`durationToken`). `html` also has `scroll-padding-top: calc(4rem + 1px)`, the sticky Navbar's height, so anchor jumps clear it.

**Blocks** (a block is listed as built once its ticket lands). Built: `details-expand` (T5.2, put on a `<details>`: the answer fades up 8px on open everywhere, and Chromium also grows and shrinks the height; Safari and Firefox close instantly; pad the answer, not `::details-content`); `reveal` (T5.3, fade and rise by `--reveal-y`), `reveal-left` and `reveal-right` (slide in from that side by `--reveal-x`, so `reveal-left` enters from the left), `reveal-stagger` (put on a parent: it reveals its direct children itself, so they carry no class, and each starts `--stagger` later than the one before, up to the 6th), `stripe-draw` (the skewed stripe's scale 0 to 1 on X, from its `origin-*`; `SectionHeading` sets the side the text starts on). Used by `SectionHeading` (number and h2 `reveal`, stripe `stripe-draw`), `ServicesGrid` (T5.5) and Why Choose Us (T5.6). Also built in T5.4, all CSS, all in `motion.css`:

- `press`: tap feedback. `touch-action: manipulation` always, and with no reduced-motion preference a press shrinks to `--press-scale` instantly and eases back over `--motion-fast` (a quick tap still shows). On every `LinkButton`, `ServiceCard`, the menu toggle, the footer social icons and the WhatsApp widget. It owns the element's transition (rule above). Reduced motion keeps the native tap highlight as the only feedback
- `lift`: a hovered card rises by `--lift-y` over `--motion-base`, hover devices only. It only sets the target, so the element needs a transition for `translate`: a clickable card gets it from `press`, a card that is not a link adds `motion-safe:transition-transform` (T5.6, Why Choose Us). `ServiceCard` uses it with `press`, and its icon tilts and grows a little (`group-hover`). No shadow animation. `ServiceCard` also gained the `LinkButton` keyboard focus ring, which closes the T3.10 follow-up
- `sheen`: one light sweep across a `LinkButton` primary on hover (`::after`, `--sheen`, `--motion-slow`, linear), hover devices only. The block sets `relative` and `overflow: clip`, and does not clip the focus ring (the ring is the button's own shadow). It reaches the calm pages (About, 404, Find Us) because `LinkButton` is shared. A secondary or ghost button has none
- `underline-draw`: an accent line draws in from the left under the Navbar links, the Services button and the dropdown row titles, on hover and keyboard focus. Its width is `--underline` (0 or 1), so a parent can hold it open (the Services button stays underlined while its dropdown is open, through `group-hover` and `group-focus-within`; a row sets it for its title through a named group). Do not nest one inside another, the variable inherits. Reduced motion: it appears at once, with no draw
- `pulse-ring`: a ring grows from the WhatsApp widget and fades, `--pulse-delay` after load, twice (1s each), then it stays still. A `::before` that copies the element's background and radius, resting at opacity 0 with no animation fill, so nothing can be left showing. Linear, because `--ease-settle` faded it in the first third of each cycle. The widget lives in the root layout, so it pulses once per full page load and not on client-side navigation

Built in T5.5, all timed CSS in `motion.css` (only the reduced-motion guard, each plays once at load and lets go: no fill, `backwards` covers the delay only):

- `hero-settle`: on the hero `<Image>`. `scale` eases from `--hero-zoom` to 1 over `--hero-settle-duration`. The hero's `overflow-hidden` clips it (no scroll timeline, so that is safe here). Opacity is never touched
- `hero-in-N` (N = 1, 2, 3...): the element fades and rises by `--hero-rise-y` over `--hero-duration`, starting `(N - 1) * --hero-step` in. One element on its own is `hero-in-1`. It sets `--hero-delay` so `sheen-once` can wait for it. The homepage uses 1 to 3, T5.10 will use 1 to 4
- `hero-solid`: add to a `hero-in-N` element to drop the fade (it sets `--hero-fade-from: 1`). For LCP text, the homepage h1. A variable that inherits, so do not nest a `hero-in-N` inside one
- `hero-draw-N`: the skewed stripe draws out from its centre at step N (reuses `stripe-grow`). The homepage hero stripe is step 2, with the subtitle
- `sheen-once`: one sweep of the `sheen` band when the page loads, after the element's own `hero-in-N` has landed. Needs `sheen` on the same element (every primary `LinkButton` has it). It runs wherever the button shows, hover or not (the hero call button is below `lg` only)

Homepage hero order: h1 `hero-in-1 hero-solid` (0ms, rise only), stripe `hero-draw-2`, subtitle `hero-in-2` (200ms), call button `hero-in-3 sheen-once` (400ms, sweep at about 1300ms). The 404 numeral is `hero-in-1`. `ServicesGrid`: the h2 `reveal`s, the grid is `reveal-stagger` and each card sits in a wrapper `<div className="grid">` (the reveal sits on the wrapper, `lift` and `press` stay on the card, and the one-cell grid stretches the card so rows stay equal height).

Why Choose Us (T5.6), built from existing blocks with no new one. Four always-visible cards in a `ul role="list"` (1 column, 2 from `sm`, 4 from `lg`) inside a full-bleed `bg-surface` band that has a top border only, because the page's `divide-y` already draws the line under the section (Tailwind v4 uses `border-bottom` for it, so a band `border-b` doubled it). The `ul` is `reveal-stagger` and each `li` (a one-cell grid, so rows stay equal height) is the reveal wrapper. The card inside is `bg-background` with a border, left-aligned, `overflow-clip` and `isolate`, and holds a static skewed wedge behind the icon (`bg-accent/10`, a colour tint and never `opacity-*`, which the faded guard would flag forever), a short skewed top stripe with `stripe-draw` (a real `span`, since `stripe-draw` cannot animate a pseudo-element), the icon, an h3 and the description. The cards are not links, so they take `lift` with their own `motion-safe:transition-transform` and no `press`, no colour hover and no pointer cursor: a tap shrink or a colour change would suggest a click that does nothing, and iOS Safari ignores `:active` without a touch listener anyway. The heading keeps its plain h2 until T5.9.

Reviews carousel (T5.7), a native scroller with no new block. The track is `overflow-x-auto snap-x snap-mandatory` with `scrollbar-none`, `overscroll-x-contain` and `overflow-y-hidden` (`overflow-x: auto` turns a `visible` y into `auto`, which would make the track scroll vertically too). Its vertical `py` leaves room for the focus outline and for T5.8's scale and tilt. The root sets `--slide` (85%, `md` 60%, `lg` a fixed 56rem, the T5.1 desktop card of 896px, because 60% of a 1024px track is far smaller) and `--gap` (12, 16, 24px). Slides are `w-(--slide) snap-center`, and `before:` and `after:` spacers `(100% - --slide) / 2 - --gap` wide let the first and last card centre at scroll 0 and at the end, so nothing scrolls on mount (CLS 0). `ReviewsSection` bleeds the track into the `SectionWrapper` padding (`-mx-4 sm:-mx-6 lg:-mx-8` plus `self-stretch`, because a `w-full` box in an `items-center` column does not grow with negative margins). A neighbour then shows 16px (375), 138px (768), 40px (1024) and 104px (1280 and up), and the 48px edge arrows sit 8px clear of the card at 1024. One set of arrows: a five-column grid puts them in row 2 beside the dots on phones and in row 1 over the track edges from `lg`, centred on the track (`z-10`, because the track is `relative`). Dots are a 32x44 tap target (40x48 from `lg`) and the visible dot is its `::before`: inactive `muted` (the `border` colour was 1.4:1 on the background), active accent and `scale-125`, so size as well as colour marks it, and T5.8 can stretch the same pseudo-element. `currentIndex` stays state, set by the controls and derived from the scroll on an animation frame (the slide whose middle is nearest the track's middle, from `offsetLeft`, which ignores transforms). A button or key scroll sets a target lock, so a long smooth scroll does not flick the index through every card. It is released when the scroll arrives, on pointer down or on a sideways wheel. Only the buttons and keys wrap, swiping does not. Left, Right, Home and End work on the focused track (ignored with Alt, Ctrl, Meta or Shift, and `preventDefault` stops the browser's own snap step from doubling the move, which shows with reduced motion). `scrollTo` is `'auto'` under reduced motion (nothing sets `scroll-behavior`, so it is instant). A neighbouring card is clickable (`aria-hidden:cursor-pointer`) but takes no `press`: T5.8 animates its `scale` on a scroll timeline, which would override or fight the `:active` scale, so the card gliding to the centre is the feedback. This is a named exception to "every clickable element takes `press`" (the arrows and dots do). The track is a scroll container, so a `view()` timeline inside it binds to the track, not the page: T5.8's per-slide effects need `view(inline)`. No autoplay and no mouse drag, by decision.

Planned: `scroll-progress` (T5.10). It has a comment in `motion.css`.

**Standard motion checks** (every T5 ticket): lint, typecheck, test:unit, build, test:e2e including `@motion` and `@interaction`. Screenshots at 375, 768 and 1280. A reduced-motion pass. Scroll feel on a real phone. For scroll effects, one look in Firefox for the fallback. Playwright runs Chromium and WebKit (the Safari 26.5 engine), so Safari's engine is covered automatically, but not a real iPhone. For anything near the hero, run the metrics script against the baseline in `t5-completion-report.md`. Budget: LCP within baseline plus 0.1s, CLS 0, JS up at most about 1 KB gzipped (carousel only), CSS up under 3 KB gzipped.

T5.1 fixed the 15 `transition-*` uses that lacked `motion-safe:`. Colour hovers are now instant for reduced-motion visitors.

## Responsive checks

Check 375, 768 and 1280 px (procedure in `testing.md`, Visual verification). Known: minor card-text wrapping at 360px on `ServicesGrid` (T6.2).

## Do not change

- WhatsApp brand green on `WhatsAppWidget`
- Different "Popular" badge styles in different places (Navbar mega-menu vs `ServiceCard`)
- Flat base backgrounds (no alternating bands) and single shared divider approach
