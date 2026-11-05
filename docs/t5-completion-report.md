# T5 Completion Report

Phase T5: motion and wow factor. A running document: each ticket appends its entry as it finishes, and the Summary and Major decisions are refreshed at the end of the phase (T5.12). Facts come from git history, PR bodies, the docs and measured runs. Anything that could not be verified goes at the bottom, not guessed.

## Summary

_Refreshed at the end of T5. Scope: a CSS-first motion system across the site, in 12 small tickets (T5.1 to T5.12)._

In progress. T5.1 laid the foundation: tokens, rules, a block scaffold, the guard tests and a measured baseline. No visible effect yet, apart from colour hovers now being instant for reduced-motion visitors.

## Timeline

| Ticket | PR      | Merged | What it delivered                                                                                                                                                                                                                                                     |
| ------ | ------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T5.1   | this PR | TBC    | Motion tokens in `globals.css`, `motion.css` scaffold (rules comment, print safety net), the 15 missing `motion-safe:` prefixes, `@motion` guard suite (25 Playwright tests), mobile baseline, `design.md` Motion rewritten, 12 ticket briefs written (T5.2 to T5.12) |

T5.1 also took one small visible change at Haider's request during review: on `lg` and up the reviews carousel is wider (`max-w-2xl` to `max-w-4xl`, 672px to 896px). The review card has larger text, stars and padding, and the arrows (36 to 48px), dots (8 to 14px) and the Google button are scaled up to match. Phone and tablet are unchanged. Checked at 375, 768, 1280 and 1662 px.

## Current state

| After ticket    | Vitest         | Playwright | Notes                                                                                                                                            |
| --------------- | -------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| T4.5 (baseline) | 231 (42 files) | 36         |                                                                                                                                                  |
| T5.1            | 231 (42 files) | 61         | +25 Playwright (`@motion`: 5 page types x 3 phone-size guards, 5 reduced-motion, 5 JavaScript-off). No Vitest change and no existing test edited |

## Baseline (T5.1, before any effect)

Production build of `main` at T4.5, Chromium, phone viewport 375x812 at 2x, CDP throttling of 4x CPU and slow 4G (1.6 Mbps, 150ms), median of 3, 3 seconds after load. Not Lighthouse (no new dependency), so compare only against numbers from the same script. Reduced motion switches `PageTransition` off, so the gap between the two rows is its cost.

| Page                       | Mode           | LCP    | LCP element       | FCP   | CLS | TBT   | JS     | CSS   | Total  |
| -------------------------- | -------------- | ------ | ----------------- | ----- | --- | ----- | ------ | ----- | ------ |
| `/`                        | motion         | 1124ms | hero image        | 928ms | 0   | 145ms | 149 KB | 10 KB | 287 KB |
| `/`                        | reduced motion | 948ms  | hero image        | 932ms | 0   | 115ms | 149 KB | 10 KB | 287 KB |
| `/services/stage-1-tuning` | motion         | 1100ms | tuning hero image | 900ms | 0   | 74ms  | 149 KB | 10 KB | 250 KB |
| `/services/stage-1-tuning` | reduced motion | 916ms  | tuning hero image | 900ms | 0   | 79ms  | 149 KB | 10 KB | 250 KB |

Re-run on the finished T5.1 build (same script): home 1160ms (motion) and 968ms (reduced), service page 1140ms and 952ms. JS 149 KB, CSS 10 KB and CLS 0 are unchanged. The LCP shift is within run-to-run noise (about 40ms), as expected for a ticket that adds no effect.

Reading: `PageTransition` costs about 180ms of LCP (176ms home, 184ms service) because the whole page fades in from zero, hero image included. The LCP element is the hero image on both pages, not the headline. Budget for the phase: LCP within baseline plus 0.1s, CLS 0, JS up at most about 1 KB gzipped, CSS up under 3 KB gzipped.

## Major decisions

| Decision                                                                                                     | Reason                                                                                                                                                                | Source             |
| ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| CSS first: scroll effects use `animation-timeline: view()` behind `@supports`, with no new Client Component  | No JavaScript to download or run, and content can never be left hidden by a script. Client Components are still server-rendered, so this is about speed, not indexing | T5 Stage 1, Haider |
| Older iOS and Firefox (before 159) get no scroll effects                                                     | Content simply appears. An IntersectionObserver fallback would add a Client island for little gain                                                                    | T5 Stage 1, Haider |
| Reviews carousel: no autoplay, but a much more dynamic desktop and easy navigation to the next review        | Autoplay fights reading and is an accessibility problem. Depth effects and obvious controls give the life instead                                                     | T5 Stage 1, Haider |
| Why Choose Us loses its hover-expanding badges                                                               | They animated layout (janky), hid their text from touch visitors, and the cards were focusable but not interactive                                                    | T5 Stage 1, Haider |
| Scroll-progress bar on service pages, WhatsApp pulse (two cycles), keep `PageTransition` pending the numbers | Approved. Cheap, and each is removable in one line                                                                                                                    | T5 Stage 1, Haider |
| All tests may be edited in T5                                                                                | The motion rewrite changes behaviour that older tests pinned                                                                                                          | Haider             |

## Gotchas found

- Playwright's `test.use({ reducedMotion: 'reduce' })` is silently ignored. Use `test.use({ contextOptions: { reducedMotion: 'reduce' } })`. The first version of the guard failed for the wrong reason because of this; it was caught by checking `matchMedia` and by stashing the fix to prove the test red
- `overflow-hidden` makes a scroll container that would capture `view()` timelines. T5.3 proves the `overflow-clip` fix before anything depends on it

## Follow-ups

- Why Choose Us hides its text until hover on desktop, so the guards run at phone size only until T5.6
- The `LinkButton` variant and size tests still assert classes (parked since T4.4)
- Not in T5: the map facade decision, the accent contrast fix, brand casing, the large hero images, unapproved service copy

## Not verified

- Safari and Firefox behaviour of the scroll effects. Playwright runs Chromium only until T6.1, so each T5 PR needs a hand check on an iPhone and in Firefox
- Browser support figures come from the MDN compat data fetched on 2026-11-05
