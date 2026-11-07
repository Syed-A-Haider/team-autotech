# T3 Completion Report

Phase T3: the service pages. Written at T3.10, from git history, PR bodies and the docs. Anything that could not be verified is listed at the bottom, not guessed.

## Summary

T3 turned 15 placeholder services into a data-driven, themed service-page system. A page is a hero plus an ordered `sections` array of typed blocks, so adding content is a data edit in `lib/services.ts`. Three services are live with real but unapproved copy (Stage 1 Tuning, Ghost Immobiliser II, Scorpion X Series). The other 12 stay coming-soon and `noindex`, because their old-site pages are empty.

## Timeline

| Ticket | PR                    | Merged     | What it delivered                                                                                                                                                                                                                                                     |
| ------ | --------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T3.1   | direct commit ed7b0cf | 2026-09-05 | Content model (`ServiceSection` union, `ServiceStatus`, `sections?`, `status?`, `heroImage?`) and `CATEGORY_THEMES`. Category renamed "Auto Electrical Services" to "Auto Electrical"                                                                                 |
| T3.2   | direct commit 358ebd7 | 2026-09-05 | Page shell: `ServicePageTemplate`, `ServiceHero`, `ComingSoonPanel`, `ServiceCtaBand`, `RelatedServices`, with tests. First hero image                                                                                                                                |
| T3.3   | direct commit 69c0164 | 2026-09-06 | Dynamic route `services/[slug]` (static params, metadata, `noindex` for non-live), `getRelatedServices`, data-driven Playwright spec                                                                                                                                  |
| T3.31  | direct commit 2dafe49 | 2026-09-06 | `PageTransition` (200ms fade and 4px rise, `motion-safe:`). `status.md` groups it under "T3.32"                                                                                                                                                                       |
| T3.32  | direct commit f918412 | 2026-09-06 | Three category hero images, spacing between `LinkButton` icon and text                                                                                                                                                                                                |
| T3.4   | #2                    | 2026-11-01 | `ServiceSections` renderer and five blocks: prose, feature, steps, specband, faq                                                                                                                                                                                      |
| T3.5   | #5                    | 2026-11-01 | `VideoSection` and `VideoEmbed`: click-to-load YouTube facade on `youtube-nocookie.com`                                                                                                                                                                               |
| T3.6   | #6                    | 2026-11-03 | Stage 1 Tuning copy (live, unapproved). Section redesign with `SectionHeading` (faded number, skewed stripe, glow). Motion planned as Phase 5                                                                                                                         |
| T3.7   | #7                    | 2026-11-03 | Ghost Immobiliser II live, first real video, placeholder poster                                                                                                                                                                                                       |
| T3.8   | #8                    | 2026-11-03 | Scorpion X Series live, text-only. Placeholder FAQs added to all three live pages                                                                                                                                                                                     |
| T3.9   | #9                    | 2026-11-03 | Closed as a docs ticket: all 12 remaining old pages are empty. Nine unsourced one-liners neutralised. Content intake template and request list added                                                                                                                  |
| T3.10  | this PR               | TBC        | Closing sections restyle: new shared `EnquiryBand` (stripe heading, glow, optional skewed badge, centred Call and WhatsApp buttons) powers `ComingSoonPanel` and `ServiceCtaBand`. `RelatedServices` gets the stripe heading. `SectionHeading` number is now optional |

Claude Code setup PRs (#1, #3, #4) landed alongside T3 and are not T3 work.

## Current state

- 15 services in 4 categories: Remap / Tuning 4, Programming 3, Auto Security 4, Auto Electrical 4.
- Live: 3. Coming-soon: 12.
- Six section types: prose, feature (grid, alternating, list), steps, specband, faq, video. Live data currently uses prose, feature (grid), steps, faq and video. `specband` and the `alternating` and `list` feature layouts are built and tested but unused by live data.
- Routes: `/` and `/services/[slug]` (15 static pages). No `/about` or `not-found.tsx` yet (T4.1, T4.2).
- Tests: 37 Vitest files, 195 tests passing at T3.10 (180 at T3.9). Playwright lists 27 tests.
- Docs: ten files (including this report) plus `docs/content/` (three service briefs, `_template.md`, `_requests.md`).

## Major decisions

| Decision                                                                                                                                                                         | Reason                                                                                                       | Source                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| Page body is data: a `ServiceSection` discriminated union, rendered by a `switch` with a `never` default                                                                         | Content tickets stay data-only. TypeScript checks exhaustiveness                                             | architecture.md, PR #2         |
| Layout and numbering derive from section type and position, with no new data fields                                                                                              | Every service gets the rhythm for free. The union did not change                                             | architecture.md, PR #6         |
| `status` is `live` or `coming-soon`, and undefined means coming-soon. Coming-soon pages are `noindex`                                                                            | A new service cannot ship an empty page. A thin indexed page is worse for local SEO than none                | architecture.md                |
| Category themes are a `Record<Category, CategoryTheme>` of literal class strings, checked with `satisfies`                                                                       | Tailwind cannot build class names at runtime. A missing category fails to compile                            | architecture.md                |
| No pricing anywhere, enquiry-only CTAs                                                                                                                                           | Prices vary by vehicle and spec. The price lines on the old Ghost and Scorpion pages were not used           | data-and-content.md, PR #7, #8 |
| Video is a click-to-load facade on `youtube-nocookie.com` with a local poster                                                                                                    | No request to a third party until the visitor clicks. A YouTube thumbnail URL would be a third-party request | architecture.md, PR #5         |
| Copy-correction rule: fix spelling, grammar and British English, keep the facts, list rewording for Syd                                                                          | Syd's source copy is not treated as correct                                                                  | data-and-content.md            |
| Unapproved copy may be `live` so previews are testable, but must be listed in `status.md` and approved before the domain went live (the domain went live early, see `status.md`) | Lets the PR preview be tested                                                                                | project.md, PR #6              |
| Scorpion page is text-only, with step text read from the carousel images                                                                                                         | The images are manufacturer artwork with baked-in text, contact details and a price                          | PR #8, data-and-content.md     |
| T3.6 redesign after manual testing: `SectionHeading`, split and stacked layouts, no orphan cards                                                                                 | The first version was flat                                                                                   | PR #6, design.md               |
| Motion deferred to Phase 5 (T5.1, T5.2), not added per content ticket                                                                                                            | Content tickets stay data-only and the motion language stays consistent                                      | project.md, PR #6              |
| T3.9 closed without copy. The 12 stay coming-soon. One-liners restate the title or Syd's own nav label                                                                           | "Fill only where copy exists", and never invent business facts                                               | PR #9                          |
| Playwright checks routing and structure only. Vitest block tests use typed fixtures, not real data                                                                               | Content changes as pages fill                                                                                | testing.md                     |

## Open items at the end of T3

Waiting on Syd:

- Copy for the 12 coming-soon services (`docs/content/_requests.md`) and confirmation of their one-liners.
- Approval of the Stage 1 Tuning and Scorpion X Series copy, and review of the placeholder FAQs on all three live pages.
- Ghost Immobiliser II video: confirm the id, supply a 16:9 poster, and give the final title and caption.
- Logo file and Google Business Profile owner access.

Technical (from `status.md` and PR bodies):

- All three live pages still need Syd's approval (the domain went live early, so they are public while unapproved). If rejected, delete `status` to revert.
- Homepage Popular grid: 4 of 6 cards lead to coming-soon pages. Revisit at T7.2 (the T6 content tickets write all 12 coming-soon pages, so this may be moot).
- `LinkButton` primary text on `bg-accent` is about 3.1:1 contrast and fails AA. Fix once the real accent hex arrives.
- `Service.body` is never rendered.
- A missing video poster file is not caught by the build. `FEATURED_SERVICE_SLUGS` silently drops a misspelt slug. The `page.test.ts` noindex test passes vacuously once no coming-soon service exists.

## Gotchas recorded in the docs during T3

- Clickable non-link buttons need `cursor-pointer`. Use `group-hover` and `motion-safe:`.
- Use an inset focus ring inside `overflow-hidden` ancestors.
- A non-component export from a `'use client'` file arrives as a client reference in a Server Component. Import such constants in tests only.
- Move focus on mount with a module-level ref callback, not `useEffect`.
- Old-site images can hide copy in Photoshop text layers. Use only the visible text.
- The glow is a gradient, not a filter, because a filter on an ancestor traps `position: fixed` children.
- The TEMP-VISUAL revert step wipes real edits if run before committing (fixed in the workflow doc).

## Not verified

- The original T3.1 to T3.3 specs: `docs/` was first committed after T3.3, so those decisions are documented only by the code and the architecture table.
- A test baseline from before T3, and lint, typecheck and build results beyond what PR bodies report.
- Vercel preview results, performance or accessibility audits, and time spent. None are in the repo.
- Who approved which design: the repo records only the PR merges.
