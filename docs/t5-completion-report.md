# T5 Completion Report

Phase T5: motion and wow factor, a CSS-first motion system in 12 small tickets (T5.1 to T5.12). A running document. At the end of each ticket, rewrite it as one short summary: fold the new ticket into the Summary, Decisions and Gotchas, keep one line per ticket in the Timeline, and drop detail that no longer helps. Do not just append. Facts come from git history, PR bodies, the docs and measured runs. Anything unverified goes under Not verified.

## Summary

Done so far: T5.1 and T5.2 (2 of 12).

- **Foundation (T5.1):** motion tokens, a `motion.css` block scaffold with the rules every block follows, a `@motion` guard suite that reads computed style, and a measured mobile baseline. No visible effect by design
- **First block (T5.2):** `details-expand`. The FAQ now toggles from the whole padded row (a functional bug fix: only the text and chevron worked before) and opens with a fade-up, a rotating chip and an accent edge bar. Chromium also animates the height, in and out. Safari and Firefox get the fade and an instant close. The mobile menu categories share the same block
- **Proven so far:** the production CSS keeps the new syntax (`::details-content`, `interpolate-size`, `@supports selector()`, `transition-behavior`), the height animation is measured (part-way values mid-open and mid-close), and reduced motion starts no animation
- **Next:** T5.3, scroll-reveal blocks and the `overflow-clip` spike

## Timeline

| Ticket | PR      | Merged     | What it delivered                                                                                                                                                                                                                         |
| ------ | ------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T5.1   | #16     | 2026-11-05 | Tokens, `motion.css` scaffold, 15 missing `motion-safe:` prefixes, `@motion` guards (25 tests), baseline, `design.md` Motion, 12 briefs. Also a wider desktop reviews carousel at Haider's request (`lg` and up only, checked at 4 sizes) |
| T5.2   | this PR | TBC        | `details-expand` block, FAQ whole-row click fix, chip and edge bar, mobile menu accordion motion and inset link focus ring, `@faq` spec (5 tests), Vitest guard, `testData` and `ServicePage` helpers                                     |

## Current state

| After ticket    | Vitest         | Playwright | Notes                                                                                                                                           |
| --------------- | -------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| T4.5 (baseline) | 231 (42 files) | 36         |                                                                                                                                                 |
| T5.1            | 231 (42 files) | 61         | +25 `@motion` guards (5 page types x phone-size, reduced-motion and JavaScript-off checks)                                                      |
| T5.2            | 232 (42 files) | 66         | +1 Vitest guard (summary is the only control), +5 `@faq`. Three were red first (two row-click, one answer-animation), no test edited or removed |

## Baseline (T5.1, before any effect)

Production build of `main` at T4.5, Chromium, phone 375x812 at 2x, CDP throttling of 4x CPU and slow 4G (1.6 Mbps, 150ms), median of 3, 3 seconds after load. Not Lighthouse (no new dependency), so compare only against numbers from the same script. Reduced motion switches `PageTransition` off, so the gap between the two rows is its cost.

| Page                       | Mode           | LCP    | LCP element       | FCP   | CLS | TBT   | JS     | CSS   | Total  |
| -------------------------- | -------------- | ------ | ----------------- | ----- | --- | ----- | ------ | ----- | ------ |
| `/`                        | motion         | 1124ms | hero image        | 928ms | 0   | 145ms | 149 KB | 10 KB | 287 KB |
| `/`                        | reduced motion | 948ms  | hero image        | 932ms | 0   | 115ms | 149 KB | 10 KB | 287 KB |
| `/services/stage-1-tuning` | motion         | 1100ms | tuning hero image | 900ms | 0   | 74ms  | 149 KB | 10 KB | 250 KB |
| `/services/stage-1-tuning` | reduced motion | 916ms  | tuning hero image | 900ms | 0   | 79ms  | 149 KB | 10 KB | 250 KB |

Reading: `PageTransition` costs about 180ms of LCP (176ms home, 184ms service) because the whole page fades in from zero, hero image included, so T5.5 decides its fate. The LCP element is the hero image on both pages. A re-run at the end of T5.1 was within noise (about 40ms). Budget for the phase: LCP within baseline plus 0.1s, CLS 0, JS up at most about 1 KB gzipped, CSS up under 3 KB gzipped. T5.2 touches no hero or LCP element, so the metrics script was not re-run.

## Major decisions

| Decision                                                                                                     | Reason                                                                                                                                            | Source               |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| CSS first: scroll effects use `animation-timeline: view()` behind `@supports`, with no new Client Component  | No JavaScript to download or run, and content can never be left hidden by a script                                                                | T5 Stage 1, Haider   |
| Older iOS and Firefox (before 159) get no scroll effects                                                     | Content simply appears. A fallback script would add a Client island for little gain                                                               | T5 Stage 1, Haider   |
| Reviews carousel: no autoplay, but a much more dynamic desktop and easy navigation                           | Autoplay fights reading and is an accessibility problem. Depth effects and obvious controls give the life instead                                 | T5 Stage 1, Haider   |
| Why Choose Us loses its hover-expanding badges                                                               | They animated layout, hid text from touch visitors, and the cards were focusable but not interactive                                              | T5 Stage 1, Haider   |
| Scroll-progress bar on service pages, WhatsApp pulse (two cycles), keep `PageTransition` pending the numbers | Cheap, and each is removable in one line                                                                                                          | T5 Stage 1, Haider   |
| All tests may be edited in T5                                                                                | The motion rewrite changes behaviour that older tests pinned                                                                                      | Haider               |
| One block, one class: `details-expand` on a `<details>` covers the height and the answer fade                | FAQ and the mobile menu share it with no wrapper or second class. Keyframes (`details-in`) have only a `from` step, so nothing is ever left faded | T5.2 Stage 1         |
| `block-size` animation is a named exception to "never animate size"                                          | The only way to animate a native `details`. User-initiated (no CLS), Chromium only, behind `@supports`. Recorded in `design.md`                   | T5.2 Stage 1         |
| Safari and Firefox get the fade only, close is instant                                                       | They have `::details-content` but not `interpolate-size`, so the one combined `@supports` is false for them                                       | T5.2 Stage 1, brief  |
| FAQ accent edge bar, 24px question-to-answer gap, no chip on the mobile menu                                 | Sporty touch tied to the site's stripe motif. The gap follows from moving padding to the summary. The menu stays plain to keep the ticket small   | T5.2 Stage 1, Haider |

## Gotchas found

- Playwright's `test.use({ reducedMotion: 'reduce' })` is silently ignored. Use `test.use({ contextOptions: { reducedMotion: 'reduce' } })` (T5.1)
- `overflow-hidden` makes a scroll container that would capture `view()` timelines. T5.3 proves the `overflow-clip` fix before anything depends on it (T5.1)
- A click test on a full-width `summary` passes on the old FAQ, because the old summary was already full width and its corner is its text. The bug was the padding on `details`. The test clicks the `details` row 8px in, which is padding on old code and summary on new (T5.2)
- A page-wide "an animation is running" check can be satisfied by an unrelated transition (the old chevron rotation made a motion test pass on old code). Read `el.getAnimations()` on the element under test (T5.2)
- `overflow: clip` on `::details-content` clips default focus outlines on links inside it, so those links need an inset ring (T5.2)
- Tailwind `group-open:` only matches descendants, so a `before:` bar on the `details` itself needs `open:before:`. The bar also needs `pointer-events-none`, or its 4px strip would swallow taps meant for the summary (T5.2)
- Tailwind 4.3.3 inlines `@import`ed files before the `@utility` pass, so `@utility` works in `motion.css`, and `@keyframes` belong at its top level. Lightning CSS keeps `@supports selector(...)` and `transition-behavior` in the production build (T5.2)

## Follow-ups

- Why Choose Us hides its text until hover on desktop, so the guards run at phone size only until T5.6
- The `LinkButton` variant and size tests still assert classes (parked since T4.4)
- Not in T5: the map facade decision, the accent contrast fix, brand casing, the large hero images, unapproved service copy
- Find-in-page opening a FAQ item counts as a small layout shift in Chromium (not user input). Accepted, revisit only if a real CLS report shows it

## Not verified

- Safari and Firefox behaviour of the scroll effects and of `details-expand`. Playwright runs Chromium only until T6.1, so each T5 PR needs a hand check on an iPhone and in Firefox
- A real-phone tap on the empty edge of an FAQ row (the Chromium click test passes at 375 and 1280, but touch is not simulated)
- Browser support figures come from the MDN compat data fetched on 2026-11-05
