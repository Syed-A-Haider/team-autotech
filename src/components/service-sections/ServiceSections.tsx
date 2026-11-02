import clsx from 'clsx';
import type { ReactNode } from 'react';
import type { ServiceSection } from '@/types/service';
import SectionWrapper from '../ui/SectionWrapper';
import { ProseSection } from './ProseSection';
import { FeatureSection } from './FeatureSection';
import { StepsSection } from './StepsSection';
import { SpecBand } from './SpecBand';
import { FaqSection } from './FaqSection';
import { VideoSection } from './VideoSection';
import { SectionHeading } from './SectionHeading';

interface ServiceSectionsProps {
  sections: ServiceSection[];
}

type SectionLayout = 'split' | 'split-reverse' | 'stacked';

interface LayoutStyles {
  grid: string;
  header: string;
  body: string;
  glow: string;
  align: 'start' | 'end' | 'center';
}

interface PlannedSection {
  section: ServiceSection;
  number?: number;
  layout: SectionLayout;
}

// Literal class strings per layout - Tailwind cannot build these from data.
// The mirrored layout only flips order in CSS, so the h2 stays first in the DOM
const SPLIT_GRID = 'lg:grid lg:grid-cols-5 lg:gap-16';
const SPLIT_BODY = 'lg:col-span-3';

const LAYOUT_STYLES: Record<SectionLayout, LayoutStyles> = {
  split: {
    grid: SPLIT_GRID,
    header: 'mb-8 lg:col-span-2 lg:mb-0',
    body: SPLIT_BODY,
    glow: '-top-48 -left-48',
    align: 'start',
  },
  'split-reverse': {
    grid: SPLIT_GRID,
    header: 'mb-8 lg:order-last lg:col-span-2 lg:mb-0',
    body: SPLIT_BODY,
    glow: '-top-48 -right-48',
    align: 'end',
  },
  stacked: {
    grid: '',
    header: 'mx-auto mb-12 max-w-3xl',
    body: '',
    glow: '-top-64 left-1/2 -translate-x-1/2',
    align: 'center',
  },
};

// Gradient, not blur or filter: a filter would trap fixed children
const GLOW_STYLES =
  'pointer-events-none absolute -z-10 size-[36rem] rounded-full bg-radial from-accent/10 to-transparent to-70%';

// Heading beside the content when the block is text-led
function isSplitSection(section: ServiceSection): boolean {
  return (
    section.type === 'prose' ||
    section.type === 'steps' ||
    section.type === 'faq' ||
    (section.type === 'feature' && section.layout === 'list')
  );
}

// One pass: number titled sections and alternate the split ones.
// Stacked sections do not break the alternation
function planSections(sections: ServiceSection[]): PlannedSection[] {
  let titledCount = 0;
  let splitCount = 0;

  return sections.map((section) => {
    if (!section.title) return { section, layout: 'stacked' };

    titledCount += 1;
    if (!isSplitSection(section)) {
      return { section, number: titledCount, layout: 'stacked' };
    }

    splitCount += 1;
    const layout = splitCount % 2 === 1 ? 'split' : 'split-reverse';
    return { section, number: titledCount, layout };
  });
}

// switch (not a lookup map) so TS narrows each case and checks exhaustiveness
function renderBlock(section: ServiceSection): ReactNode {
  switch (section.type) {
    case 'prose':
      return <ProseSection section={section} />;
    case 'feature':
      return <FeatureSection section={section} />;
    case 'steps':
      return <StepsSection section={section} />;
    case 'specband':
      return <SpecBand section={section} />;
    case 'faq':
      return <FaqSection section={section} />;
    case 'video':
      return <VideoSection section={section} />;
    default: {
      const unhandled: never = section;
      return unhandled;
    }
  }
}

// Wraps every block once, so spacing, heading and layout live in one place.
// Fragment keeps each section a direct child of the template's divide-y
export function ServiceSections({ sections }: ServiceSectionsProps) {
  return (
    <>
      {planSections(sections).map(({ section, number, layout }, index) => {
        const block = renderBlock(section);
        if (!block) return null;

        const styles = LAYOUT_STYLES[layout];
        const { title } = section;
        const hasHeading = Boolean(title) && number !== undefined;

        return (
          <section
            key={`${section.type}-${index}`}
            className="relative isolate overflow-hidden"
          >
            <SectionWrapper
              as="div"
              className={clsx(
                'relative py-16 lg:py-24',
                hasHeading && styles.grid,
              )}
            >
              {hasHeading && (
                <div
                  aria-hidden="true"
                  className={clsx(GLOW_STYLES, styles.glow)}
                />
              )}
              {title && number !== undefined && (
                <SectionHeading
                  title={title}
                  number={number}
                  align={styles.align}
                  className={styles.header}
                />
              )}
              <div className={hasHeading ? styles.body : undefined}>
                {block}
              </div>
            </SectionWrapper>
          </section>
        );
      })}
    </>
  );
}
