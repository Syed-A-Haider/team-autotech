# Testing

## Split of responsibility

| Layer        | Covers                                                                                                                                                                                       | Excludes                                                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Vitest + RTL | Component correctness: props, variants, hrefs, ARIA, which block renders for each `type`. Route functions (`generateMetadata`, `generateStaticParams`) as plain functions                    | Pure data files. `satisfies Record<Category, ...>` already proves completeness at compile time    |
| Playwright   | Routing and structure. T3 has one data-driven spec: every slug from `getAllServices()` returns 200 with exactly one `h1`, unknown slug 404s, navbar to service page works, CTA links resolve | Anything content-shaped: no coming-soon copy, no per-page specs, no section assertions, no counts |

Rule: Playwright asserts what is true because of routing and structure. Vitest asserts what is true because of props. Neither asserts content, because content changes as pages fill.

## Test first

1. Write tests from the spec approved in Stage 1, before the implementation.
2. Run them and confirm they fail for the right reason.
3. Implement until they pass.
4. Never edit or delete a test to make it pass without asking Haider.

## Gates (a ticket is not done until all pass)

- `pnpm lint`
- `pnpm typecheck` (add a script running `tsc --noEmit` if missing)
- `pnpm test:unit`
- `pnpm build`
- `pnpm test:e2e` when a page or route changes, and at the end of each phase

## Vitest and RTL rules

- Colocated as `Component.test.tsx`. Config is `vitest.config.mts` and the environment is jsdom
- Assert on role, text and href. Never on CSS classes
- Import exported copy constants instead of retyping strings. Do not hardcode literals or counts that change independently of logic
- Block and renderer tests use typed fixture data, never real service data
- `afterEach(cleanup)` is registered manually in `vitest.setup.ts` because `globals: true` is not set
- jsdom ignores media queries, so desktop and mobile variants coexist in the DOM. Scope queries with `within()`
- RTL skips `aria-hidden` elements. Pass `{ hidden: true }` when you need them
- `vitest.config.mts` uses native `resolve.tsconfigPaths`; do not add `vite-tsconfig-paths`

## Playwright rules

- Specs live in `tests/`. Use the Page Object Model (PascalCase classes) and the custom fixture
- Tag tests: `@homepage`, `@smoke`, `@navigation`, `@responsive`
- Use plain string assertions, not regex (`toHaveTitle('Team Autotech')`)
- Locators: `getByRole`, `getByText`, `getByLabel`. No XPath and no tight CSS selectors
- Use web-first assertions (`toBeVisible`, `toHaveText`). No `waitForTimeout`
- Keep tests deterministic: no `if/else` or loops inside a test, each test starts from a fresh page
- Pull URLs and test data from exported constants, not inline literals
- Structure as Arrange, Act, Assert. Use `expect.soft()` for several minor checks in one flow
- ESLint: `react-hooks/rules-of-hooks` false-positives on Playwright's `use` fixture parameter. A scoped override already exists in `eslint.config.mjs`

## Visual verification

For any visual change:

1. Start the dev server and screenshot the changed pages at 375, 768 and 1280 px wide.
2. Look at the images. Check overflow, clipped or wrapped text, spacing, token colours, and that nothing overlaps the Navbar or WhatsAppWidget.
3. Fix what you find, then re-check.

A `pnpm shots <path>` script (Playwright, writes to a gitignored folder) is planned. Until it exists, write a throwaway script outside the repo.
