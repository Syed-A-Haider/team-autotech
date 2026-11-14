# Content standard for AI-drafted copy

The rules every AI-written service page follows (T6.7 onwards). A Vitest guard (`src/lib/services.content.test.ts`) enforces the riskiest ones. A person checks the rest in the PR.

Scope: new copy in `lib/services.ts`. The three live pages (Stage 1 Tuning, Ghost Immobiliser II, Scorpion X Series) carry old-site copy that predates this standard, and are listed in `_review.md` instead.

Syd said not to wait for his approval. Pages go live and indexable as they are written. He reviews afterwards, and anything he flags becomes a new ticket.

## Voice

- British English, second person ("you", "your"), "we" for the business. Energetic but natural, short sentences, contractions are fine, no hype
- Match the live copy. Examples:
  - "Whether you want more power, sharper throttle response or a more engaging drive, it can make a noticeable difference without any major mechanical changes."
  - "Switch off the ignition and the immobiliser activates automatically."
  - Headings in title case: "Instant Protection Against Key Cloning", "How It Works"
- No em dashes. Use a comma, a colon or a full stop
- Never use: "unleash", "elevate", "seamless", "look no further", "best in the UK", "cheapest"
- No "best", "leading", "most advanced", "number one", "unbeatable" or similar claims
- British spellings: specialise, optimise, customise, immobiliser, colour, tyre, centre, fibre, defence
- "Nelson, Lancashire" at most once on a page, and only where it reads naturally

## Structure of a page

| Part                  | Rule                                                                                                                         |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `shortDescription`    | One sentence, 70 to 150 characters, no claims. It is also the meta description                                               |
| `prose` intro         | 2 to 3 paragraphs                                                                                                            |
| One `feature` block   | `grid` 3 to 6 items, `alternating` 2 to 4, `list` 4 to 8. A grid never has more than 6, so the last row is never a lone card |
| `steps` (optional)    | 3 to 5, for services with a clear process                                                                                    |
| `faq`                 | 3 to 5 questions                                                                                                             |
| `specband` (optional) | Only with facts from `lib/constants.ts`                                                                                      |
| `video`               | Never, unless Syd supplies a video id and a poster                                                                           |

Vary the mix and the order between pages so they do not read as copies.

## The pricing answer

Every FAQ that asks about cost answers: "Pricing depends on your vehicle and spec. Call or WhatsApp for a free, no-obligation quote." No prices, ranges, discounts or "from" figures anywhere.

## What is allowed (generic copy)

What the service is and why people want it, the usual process, what to bring, how to enquire (Call or WhatsApp), and scope phrased as "can include ... depending on your vehicle, ask us about yours".

## Never invented (needs Syd)

- Prices, ranges or discounts
- Turnaround or fitting times ("same day", "an hour")
- Power, torque, MPG or percentage gains
- Accreditations, approvals or memberships (Thatcham, "insurance approved", "authorised", "official") beyond titles Syd gave
- Warranties or guarantees
- Vehicle coverage lists, product specs, brands of tools or parts
- Staff names or numbers, years other than `YEARS_EXPERIENCE`, customer counts, testimonials
- Mobile or on-site service
- Insurance effects
- Legal or compliance claims ("road legal", "MOT pass", "emissions compliant")
- Anything about removing, deleting or disabling emissions equipment (DPF, EGR, AdBlue)
- Any claim to be an MOT testing station

Brand names (Ghost, Scorpion, Road Angel, CT Carbon, Tuning Freaks, XHP) only name the product.

## Confirmed claims

Haider confirmed these on 2026-11-07 (Syd can still correct them). They are allowed exactly where they already appear and never on another page.

| Claim                                     | Where                                               |
| ----------------------------------------- | --------------------------------------------------- |
| Authorised Ghost Immobiliser II Installer | `WhyChooseUsSection`                                |
| backed by our guarantee                   | `WhyChooseUsSection`                                |
| family-run                                | `AboutSnippet`                                      |
| genuine manufacturer-grade tools          | `AboutSnippet`                                      |
| Insurance-approved GPS tracking systems   | Scorpion Trackers `shortDescription` (allow-listed) |

"CT Carbon official installer" is Syd's own title for the service and is allow-listed too.

## Special cases

- Emissions pages (DPF / EGR, AdBlue, Error Code Delete, T6.12): wording for lawful work only (diagnosis, cleaning, regeneration, sensor and fault repair, software fault-finding)
- MOT Preparation must not suggest Team Autotech is a test centre
- Coming-soon one-liners restate the title until their batch rewrites them

## Marking AI copy

- Put `// AI-generated (T6.x)` above each AI entry in `services.ts`
- Add or update the page's row in `_review.md`, status `approved` with the date it goes live (Syd reviews later, see above)

## What the guard checks and what a reviewer checks

| The guard (fails the test)                                                                    | A reviewer (in the PR)                                                   |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `£` and GBP, a number with %, hp, bhp, PS, kW, Nm, lb-ft, mpg or mph                          | MPG, power or speed claims with no number ("much faster", "better MPG")  |
| approved, accredited, certified, official, authorised, Thatcham, guarantee, warranty          | Reliability promises ("it will not affect your car")                     |
| same day, a number of hours, days or weeks, "an hour", "while you wait"                       | Structure: paragraph, feature, step and FAQ counts, the pricing answer   |
| DPF, EGR or AdBlue within 6 words of remove, delete, disable, bypass or blank, or "off" after | Whether each fact is true and generic enough                             |
| MOT pass, road legal, emissions compliant                                                     | The `// AI-generated` comment and the `_review.md` row                   |
| The banned words and the em dash, superlatives, US spellings, "Nelson, Lancashire" twice      | Component copy (homepage, About) and `reviews.ts`, which the guard skips |
| `shortDescription` outside 70 to 150 characters on a live page                                |                                                                          |

A new allow-list entry in the test needs Haider's written OK and a row in `_review.md`. A confirmed claim is never added for a new page.

## PR checklist for each content batch

- [ ] `pnpm test:unit src/lib/services.content.test.ts` is green
- [ ] Each page has the `// AI-generated` comment and a `_review.md` row
- [ ] Each page has `status: 'live'` (that alone adds it to the sitemap and `getIndexablePaths()`, see the New page checklist in `workflow.md`)
- [ ] The PR says what each page claims and what it deliberately does not
