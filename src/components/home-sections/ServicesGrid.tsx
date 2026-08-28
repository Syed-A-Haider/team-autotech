import ServiceCard from '../ui/ServiceCard';
import SectionWrapper from '../ui/SectionWrapper';
import type { Service } from '@/types/service';

interface ServiceGridProps {
  services: Service[];
}

// Exported to be used in test files
export const SERVICES_GRID_HEADING = 'Our Most Popular Services';

export default function ServicesGrid({ services }: ServiceGridProps) {
  return (
    <SectionWrapper
      id="services"
      className="flex flex-col gap-10 py-16 sm:py-20"
    >
      {/* Heading and Subtitle  */}
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
          {SERVICES_GRID_HEADING}
        </h2>
      </div>

      {/* Grid of services */}
      {/* 2 cols on mobile, 3 from md up */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </SectionWrapper>
  );
}
