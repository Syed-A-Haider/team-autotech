// components/service-sections/ServicePageTemplate.tsx
import type { ReactNode } from 'react';
import type { Service } from '@/types/service';
import type { CategoryTheme } from '@/lib/service-themes';
import { ServiceHero } from './ServiceHero';
import { ServiceCtaBand } from './ServiceCtaBand';
import { RelatedServices } from './RelatedServices';

interface ServicePageTemplateProps {
  service: Service;
  theme: CategoryTheme;
  relatedServices: Service[];
  children: ReactNode;
}

// Shared shell for all 15 service pages.
// Hero sits outside the divider - the photo is already a clear break.
// ServiceCtaBand only renders for 'live' services
export function ServicePageTemplate({
  service,
  theme,
  relatedServices,
  children,
}: ServicePageTemplateProps) {
  return (
    <>
      <ServiceHero service={service} theme={theme} />
      <div className="divide-border divide-y">
        {children}
        {service.status === 'live' && <ServiceCtaBand service={service} />}
        <RelatedServices relatedServices={relatedServices} />
      </div>
    </>
  );
}
