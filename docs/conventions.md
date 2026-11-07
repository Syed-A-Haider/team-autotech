# Conventions

Apply by default. Do not re-derive per ticket.

## Stack

Next.js App Router, TypeScript, Tailwind CSS v4, `clsx`, `lucide-react` (generic icons), `react-icons` (brand icons), `pnpm`. Alias `@/` points to `src/`. Check `package.json` for versions.

## Components

- Server Component by default. Go Client only for genuine interactivity (state, event handlers). Isolate it in the smallest possible dedicated component (`MobileMenu`, `ReviewsCarousel`, `MapEmbed`) instead of converting a shared parent.
- Location: `ui/` primitives, `layout/` shell, `home-sections/` homepage-only, `service-sections/` service-page-only.
- Multi-word folders are kebab-case. Component files are PascalCase.
- One component per file. The filename matches the component name, and the name describes what it renders (`LinkButton`, not `Button`).

## Props and exports

- Type props with an unexported `interface` above the function. Export it only when a concrete second consumer exists.
- Prefer one whole-object prop (`service: Service`) over several scalars when a domain type exists.
- Every UI primitive accepts a `className` escape hatch.
- Export only when a second consumer exists. Do not export speculatively.
- No dedicated icon prop. Pass icons as children (YAGNI).
- Use `import type { ReactNode } from 'react'`, not the global `React.ReactNode`.
- Components use named exports (`export function Name`). Pages, layouts and other route files keep `export default`, which Next requires. Every component under `src/components` uses a named export.

## Data

- Components never import the raw services or reviews arrays. Pages fetch through the `lib/` getters and pass typed props. Constants and pure helpers from `lib/` are fine.
- Copy lives in named constants exported from the component file. Tests import those constants.
- Constants use the "derive once, export flat" pattern: flat named exports, derived values computed once.

## Styling and accessibility

- Tailwind utilities through design tokens. Never a raw hex or an unexplained default colour in a component. See `design.md`.
- Use `clsx` for all conditional or combined class names.
- Extract long multi-state class strings into named constants.
- Data-driven classes must be literal strings in a record. Tailwind cannot generate `bg-${x}`.
- Decorative icons get `aria-hidden`. One `<h1>` per page. Use semantic elements, with an `as` prop escape hatch where needed.
- Every new clickable element (button, card, icon link) takes the `press` block from `motion.css`. It owns the element's transition, so do not add `transition-colors` or `transition-transform` next to it (see `design.md`, Motion). A card that is not clickable never takes `press` (a tap shrink suggests a click). It may take `lift` with its own `motion-safe:transition-transform`. One named exception goes the other way: a clickable reviews slide takes no `press`, because T5.8 animates its `scale` on a scroll timeline (see `design.md`, Reviews carousel).
- Clickable non-link `<button>`s get `cursor-pointer` (Tailwind v4 keeps the default cursor). Use `group-hover` and `motion-safe:` for hover and transitions, so touch devices get no sticky hover and reduced-motion users get none.
- Use an inset focus ring (`focus-visible:ring-inset`) inside an `overflow-hidden` ancestor. An offset ring is clipped.
- Third-party embeds load only after a click (facade), from a privacy host (`youtube-nocookie.com`). Encode ids with `encodeURIComponent` before putting them in a URL.
- Links: `LinkButton` renders a plain `<a>` for `tel:`, `mailto:` and `http(s):`, and `next/link` otherwise. Use a plain `<a>` for non-route links project-wide.

## Code style

- Comments are short and plain. Keep existing comments when rewriting a file.
- Use `if/else` for side effects (`params.set()`, `params.delete()`). Ternaries are for returning values.
- Quick quality check before finishing: no long functions, no deep nesting (use guard clauses), no duplicated logic, no magic numbers or strings, no dead code, clear names.

## Gotchas

- Functions cannot cross the Server to Client boundary. Never pass `Service.icon` or any `LucideIcon` to a Client Component. Build a trimmed serialisable shape first, as `Navbar` does for `MobileMenu` (`{ slug, title }`).
- `next/image` with `fill` needs a positioned parent. Use explicit `width` and `height` when the size is known.
- A `//` comment directly above a JSX spread attribute (`{...x}`) breaks the Next compiler. Put it outside the tag.
- `backdrop-filter` or `filter` on an ancestor creates a containing block that traps `position: fixed` children. Fix the cause, do not portal around it.
- Fix root causes, not symptoms, especially in CSS.
- A non-component export (such as copy constants) from a `'use client'` file arrives as a client reference in a Server Component. Import those constants in tests only, never in a Server Component.
- A right-aligned element whose width depends on text (the header call button) shifts its left edge when the web font replaces the fallback (CLS). Give it a `min-w-*` above its width in both fonts (`Navbar` uses `min-w-70`). Check at desktop, the button is hidden below `lg`.
- Move focus on mount with a module-level ref callback (`function focusOnMount(node) { node?.focus(); }`), not `useEffect`. It has a stable identity, avoids the set-state-in-effect lint, and behaves the same under the React Compiler and in Vitest.
