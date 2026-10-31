# Project

## What this is

A rebuild of teamautotech.co.uk from WordPress and Elementor into a fully static Next.js site on Vercel. Team Autotech is a vehicle remapping, ECU programming, immobiliser, tracker and auto electrical business in Nelson, Lancashire.

Two goals: a better site for the business, and portfolio experience for the developer.

## People

- **Syd Shah (Syd, the owner):** business stakeholder. Approves design and copy. Source for content decisions, service priorities and brand assets
- **Haider:** developer. Reviews and merges every PR. Wants to learn, so explain decisions in plain language rather than just applying them

## Confirmed decisions

| Topic              | Decision                                                                 |
| ------------------ | ------------------------------------------------------------------------ |
| Rendering          | Fully static. No API routes, no dynamic rendering                        |
| Contact            | `tel:`, `wa.me`, `mailto:` links only. No form, no backend               |
| Design             | Dark theme, orange accent, Inter only                                    |
| Content            | Structure and placeholder content first, real copy after Syd reviews     |
| Google reviews     | Static and curated, not a live API or widget                             |
| Shop               | Deferred, out of scope for the current build                             |
| Service pages      | Single accent. Identity through the hero. No pricing, enquiry-only CTAs  |
| `/services` index  | Not built. Mega-menu covers it. Footer "Services" points at `/#services` |
| Coming-soon pages  | `noindex` until real content lands                                       |
| Third-party embeds | None on page load. YouTube uses a click-to-load facade                   |
| Domain             | A record and CNAME, not a transfer. Syd has registrar access             |
| Hosting            | Vercel, GitHub (SSH)                                                     |

## Rules from the owner

- Everything is as Syd wants it. Placeholder copy stays placeholder until he signs off
- Do not invent business facts: services, prices, accreditations, hours, claims. Use `constants.ts` and Syd's source pages
- Services and slugs live in `lib/services.ts`. Contact details live in `lib/constants.ts`

## How Claude Code is used here

Implementation happens in Claude Code sessions, one per ticket. Design decisions stay with Haider through Stage 1 approval. See `workflow.md`.
