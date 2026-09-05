import type { Service } from '@/types/service';
import SectionWrapper from '../ui/SectionWrapper';
import ServiceCard from '../ui/ServiceCard';

interface RelatedServicesProps {
  relatedServices: Service[];
}

// Same category cross-links. Caller resolves and filters
export function RelatedServices({ relatedServices }: RelatedServicesProps) {
  if (relatedServices.length === 0) return null;

  //  Render all related services as Card
  return (
    <SectionWrapper as="section" className="py-16">
      <h2 className="text-foreground text-2xl font-semibold">
        You might also be interested in
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedServices.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </SectionWrapper>
  );
}
