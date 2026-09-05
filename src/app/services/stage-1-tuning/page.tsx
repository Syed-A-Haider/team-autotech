import { notFound } from 'next/navigation';
import { getAllServices, getServiceBySlug } from '@/lib/services';
import { CATEGORY_THEMES } from '@/lib/service-themes';
import { ServicePageTemplate } from '@/components/service-sections/ServicePageTemplate';
import { ComingSoonPanel } from '@/components/service-sections/ComingSoonPanel';

export default function Stage1TuningPreviewPage() {
  const service = getServiceBySlug('stage-1-tuning');
  if (!service) notFound();

  const theme = CATEGORY_THEMES[service.category];

  // Get all services in the same category
  const relatedServices = getAllServices().filter(
    (s) => s.category === service.category && s.slug !== service.slug,
  );

  return (
    <ServicePageTemplate
      service={service}
      theme={theme}
      relatedServices={relatedServices}
    >
      <ComingSoonPanel service={service} />
    </ServicePageTemplate>
  );
}
