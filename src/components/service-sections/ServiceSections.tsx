import type { ReactNode } from 'react';
import type { ServiceSection } from '@/types/service';
import SectionWrapper from '../ui/SectionWrapper';
import { ProseSection } from './ProseSection';
import { FeatureSection } from './FeatureSection';
import { StepsSection } from './StepsSection';
import { SpecBand } from './SpecBand';
import { FaqSection } from './FaqSection';

interface ServiceSectionsProps {
  sections: ServiceSection[];
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
      // T3.5 replaces this with <VideoSection />
      return null;
    default: {
      const unhandled: never = section;
      return unhandled;
    }
  }
}

// Wraps every block once, so spacing and the title style live in one place.
// Fragment keeps each section a direct child of the template's divide-y
export function ServiceSections({ sections }: ServiceSectionsProps) {
  return (
    <>
      {sections.map((section, index) => {
        const block = renderBlock(section);
        if (!block) return null;

        return (
          <SectionWrapper key={`${section.type}-${index}`} className="py-16">
            {section.title && (
              <h2 className="text-foreground mb-8 text-2xl font-semibold">
                {section.title}
              </h2>
            )}
            {block}
          </SectionWrapper>
        );
      })}
    </>
  );
}
