import type { Service } from '@/types/service';
import SectionWrapper from '../ui/SectionWrapper';
import ServiceCard from '../ui/ServiceCard';
import { SectionHeading } from '../ui/SectionHeading';

export const RELATED_SERVICES_HEADING = 'You might also be interested in';

interface RelatedServicesProps {
  relatedServices: Service[];
}

// Same category cross-links. Caller resolves and filters
export function RelatedServices({ relatedServices }: RelatedServicesProps) {
  if (relatedServices.length === 0) return null;

  //  Render all related services as Card
  return (
    <SectionWrapper as="section" className="py-16 lg:py-24">
      <SectionHeading
        title={RELATED_SERVICES_HEADING}
        align="center"
        className="mx-auto mb-12 max-w-3xl"
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedServices.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </SectionWrapper>
  );
}
