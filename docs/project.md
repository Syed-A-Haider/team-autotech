# Project

## What this is

A rebuild of teamautotech.co.uk from WordPress and Elementor into a fully static Next.js site on Vercel. Team Autotech is a vehicle remapping, ECU programming, immobiliser, tracker and auto electrical business in Nelson, Lancashire.

Two goals: a better site for the business, and portfolio experience for the developer.

## People

- **Syd Shah (Syd, the owner):** business stakeholder. Approves design and copy. Source for content decisions, service priorities and brand assets
- **Haider:** developer. Reviews and merges every PR. Wants to learn, so explain decisions in plain language rather than just applying them

## Confirmed decisions

| Topic              | Decision                                                                                                                                                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rendering          | Fully static. No API routes, no dynamic rendering                                                                                                                                                                                 |
| Contact            | `tel:`, WhatsApp, `mailto:` links only. No form, no backend                                                                                                                                                                       |
| Design             | Dark theme, orange accent, Inter only                                                                                                                                                                                             |
| Content            | AI-drafted copy for every page (Syd's choice, 2026-11-07), written to `content/_standard.md` and checked by the copy guard. Syd reviews it after it is live, not before (2026-11-10). Old-site copy stays corrected, not invented |
| Google reviews     | Static and curated, not a live API or widget                                                                                                                                                                                      |
| Shop               | Deferred to Phase 8. T6.4 adds an inactive "Shop" label to the nav, nothing more                                                                                                                                                  |
| Motion and wow     | Phase 5 (T5.1, T5.2), once core pages and routing are done, before T7.1. Not added per content ticket, so those stay data-only and the motion language stays consistent                                                           |
| Service pages      | Single accent. Identity through the hero. No pricing, enquiry-only CTAs                                                                                                                                                           |
| Services index     | No `/services` page, by decision. Services are reached from the Navbar mega-menu, the homepage Popular grid and the About page. `/services` is a normal 404                                                                       |
| Coming-soon pages  | `noindex` until content lands. T6.7 to T6.12 write AI-drafted copy for every one, so each page goes live (indexable) with its batch                                                                                               |
| Third-party embeds | None on page load. YouTube uses a click-to-load facade                                                                                                                                                                            |
| Domain             | Live at teamautotech.co.uk (A record and CNAME, not a transfer). Connected early because the old WordPress site crashed, so there is no domain ticket any more                                                                    |
| Hosting            | Vercel, GitHub (SSH)                                                                                                                                                                                                              |

## Rules from the owner

- Everything is as Syd wants it. The site is live (it went live early, see `status.md`), so unapproved copy is public. Syd chose AI-drafted copy for every page on 2026-11-07. On 2026-11-10 he chose speed over sign-off: it goes live and indexable without his approval, is written to `content/_standard.md`, and is listed in `content/_review.md` until he looks at it. If he flags something, it becomes a new ticket. The copy guard (`lib/services.content.test.ts`) enforces the riskiest rules. Business facts are still never invented
- Do not invent business facts: services, prices, accreditations, hours, claims. Use `constants.ts` and Syd's source pages
- Services and slugs live in `lib/services.ts`. Contact details live in `lib/constants.ts`

## How Claude Code is used here

Implementation happens in Claude Code sessions, one per ticket. Design decisions stay with Haider through Stage 1 approval. See `workflow.md`.
