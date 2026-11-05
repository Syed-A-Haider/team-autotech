import type { Metadata } from 'next';
import clsx from 'clsx';
import { LinkButton } from '@/components/ui/LinkButton';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { PageTransition } from '@/components/ui/PageTransition';
import { STRIPE_STYLES } from '@/components/ui/SectionHeading';

export const NOT_FOUND_CODE = '404';
export const NOT_FOUND_TITLE = 'Page not found';
export const NOT_FOUND_BODY =
  "Sorry, we couldn't find that page. It may have moved, or the address may be wrong.";
export const NOT_FOUND_HOME_LABEL = 'Back to home';

// Next adds noindex itself for a 404, so robots is not set here
export const metadata: Metadata = { title: NOT_FOUND_TITLE };

// The faded race number from SectionHeading, scaled up. A fill, not a stroke.
// hero-in-1 fades it in. The page fade no longer starts from 0, and this big
// numeral nudges about 9px when Inter swaps in, which then counted as layout shift
const NUMERAL_STYLES =
  'hero-in-1 text-accent/25 block text-9xl leading-none font-black tabular-nums';

// Roomier on mobile so the page is not squashed above the footer. Resets from sm
const SECTION_STYLES = 'py-24 sm:py-16 lg:py-24';
const NUMERAL_GAP_STYLES = 'pb-3 sm:pb-0';
const STACK_GAP_STYLES = 'mt-6 sm:mt-4';

// Served for every unmatched URL and every notFound() call. The root layout
// already provides <main>, so there is none here
export default function NotFound() {
  return (
    <PageTransition>
      <SectionWrapper className={SECTION_STYLES}>
        <div className="mx-auto max-w-2xl text-center">
          <span
            aria-hidden="true"
            className={clsx(NUMERAL_STYLES, NUMERAL_GAP_STYLES)}
          >
            {NOT_FOUND_CODE}
          </span>
          <span aria-hidden="true" className={clsx(STRIPE_STYLES, 'mx-auto')} />
          <h1
            className={clsx(
              STACK_GAP_STYLES,
              'text-foreground text-3xl font-bold tracking-tight text-balance sm:text-4xl',
            )}
          >
            {NOT_FOUND_TITLE}
          </h1>
          <p
            className={clsx(
              STACK_GAP_STYLES,
              'text-muted mx-auto max-w-prose text-lg text-pretty',
            )}
          >
            {NOT_FOUND_BODY}
          </p>
          <div className="mt-10 flex flex-col sm:mt-8 sm:flex-row sm:justify-center">
            <LinkButton href="/" size="lg" className="w-full sm:w-auto">
              {NOT_FOUND_HOME_LABEL}
            </LinkButton>
          </div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
