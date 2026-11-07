# T6.7 to T6.14 - AI content batches and the review pass

Status: planned. One section per ticket. Delete each section when its PR merges (allowed by `workflow.md`).
Depends on: T6.5 (the pages exist), T6.6 (the standard and the guard). Syd chose AI-written copy for every page on 2026-11-07 and will review it at the end. Content is no longer a blocker.
Read first: `docs/content/_standard.md` and `_review.md` (created in T6.6), `docs/data-and-content.md`.

## Rules for every batch

- Data edits only in `lib/services.ts`. `status: 'live'`, the sections picked per page from the existing blocks (vary the mix and the order, see the standard)
- Each entry gets `// AI-generated (T6.x), awaiting Syd's review` and a row in `_review.md`
- The copy guard (T6.6) must be green. State in the PR what each page does and does not claim
- Live pages become indexable and appear in the sitemap on their own
- The first live use of each block adds a permanent e2e slug in `tests/config/testData.ts` (`featureAlternatingSlug`, `featureListSlug`, `specBandSlug`) and makes the T5.10 temporary checks permanent (those blocks were checked with temporary data only)

## T6.7 - Programming (BMW, Mercedes, VAG, Component Protection Removal)

Lowest legal risk, so it sets the pattern. Add a `testData` slug for the first live feature `list`.

## T6.8 - Auto Security (Spectre, Scorpion Trackers, Fleet Trackers)

Do not use "Insurance-approved" unless Syd confirms it. No Thatcham, subscription or recovery claims. Depends on T6.7.

## T6.9 - Auto Electrical (Car Audio, Dashcam, Parking Sensors, Reverse Camera, Road Angel Dashcam)

No product specs, no insurance-discount claims. Add `featureAlternatingSlug` if first used. Depends on T6.7.

## T6.10 - Mechanical / Customisation (Vehicle Maintenance, MOT Preparation, CT Carbon Official Installer, Body Panel Repair and Paint)

MOT Preparation must not suggest Team Autotech is a test centre. "Official installer" appears only as Syd's own title. No paint or warranty claims. Add `specBandSlug` if first used. Depends on T6.5.

## T6.11 - Remap / Tuning, performance (Tuning Freaks Bootmod, XHP Gearbox Map)

No power, torque or shift-time figures, no "warranty-safe". A general line advising customers to tell their insurer about modifications is allowed. Depends on T6.7.

## T6.12 - Remap / Tuning, emissions and diagnostics (DPF / EGR Solutions, AdBlue Solutions, Engine Management Error Code Delete)

Highest risk, so it goes last. Wording only for lawful work (diagnosis, cleaning, regeneration, sensor and fault repair, software fault-finding). No removal, delete or "MOT pass" wording unless Syd states otherwise in writing. Depends on Syd's answer to the emissions question in `status.md`. This is the last coming-soon batch, so it also replaces `comingSoonSlug` and the coming-soon entry in `motionServiceSlugs` in `testData.ts` (needs Haider's approval), and `testing.md` records that `ComingSoonPanel` is then covered by Vitest only.

## T6.13 - Live-copy claims sweep (homepage and About)

`WhyChooseUsSection` ("Authorised Ghost Immobiliser II Installer", "backed by our guarantee", hard-coded 15 years that should use `YEARS_EXPERIENCE`), `AboutSnippet` "family-run", the About placeholder. Keep what Syd confirms, make the rest generic. Depends on Syd's answer.

## T6.14 - Syd's review pass and phase close

Walk `_review.md` with Syd. Send him one readable pack of all the copy (the live URLs plus the table). Apply edits, split per category if they are large. Mark rows approved, remove the "awaiting review" comments, finish the T6 report.

## Out of scope

New blocks, new image blocks, videos (unless Syd supplies an id and a poster), the homepage Popular grid order, the WhatsApp prefill wording, brand-name casing, accent contrast, the map facade.
