import type { ReactNode } from 'react';
import type { ServiceSection } from '@/types/service';
import { SectionShell, type SectionLayout } from '../ui/SectionShell';
import { ProseSection } from './ProseSection';
import { FeatureSection } from './FeatureSection';
import { StepsSection } from './StepsSection';
import { SpecBand } from './SpecBand';
import { FaqSection } from './FaqSection';
import { VideoSection } from './VideoSection';

interface ServiceSectionsProps {
  sections: ServiceSection[];
}

interface PlannedSection {
  section: ServiceSection;
  number?: number;
  layout: SectionLayout;
}

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

        return (
          <SectionShell
            key={`${section.type}-${index}`}
            title={section.title}
            number={number}
            layout={layout}
          >
            {block}
          </SectionShell>
        );
      })}
    </>
  );
}
