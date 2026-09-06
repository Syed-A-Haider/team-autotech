import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllServices,
  getServiceBySlug,
  getRelatedServices,
} from '@/lib/services';
import { CATEGORY_THEMES } from '@/lib/service-themes';
import { ServicePageTemplate } from '@/components/service-sections/ServicePageTemplate';
import { ComingSoonPanel } from '@/components/service-sections/ComingSoonPanel';

export const dynamic = 'error';
export const dynamicParams = false;

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return {};

  return {
    title: service.title,
    description: service.shortDescription,
    ...(service.status !== 'live' && { robots: { index: false } }),
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const theme = CATEGORY_THEMES[service.category];
  const relatedServices = getRelatedServices(service);

  return (
    <ServicePageTemplate
      service={service}
      theme={theme}
      relatedServices={relatedServices}
    >
      {service.status === 'live' ? null : ( // T3.4 will replace this with <ServiceSections sections={service.sections} />
        <ComingSoonPanel service={service} />
      )}
    </ServicePageTemplate>
  );
}
