// components/service-sections/ServicePageTemplate.tsx
import type { ReactNode } from 'react';
import type { Service } from '@/types/service';
import type { CategoryTheme } from '@/lib/service-themes';
import { ServiceHero } from './ServiceHero';
import { ServiceCtaBand } from './ServiceCtaBand';
import { RelatedServices } from './RelatedServices';
import { ScrollProgress } from '../ui/ScrollProgress';

interface ServicePageTemplateProps {
  service: Service;
  theme: CategoryTheme;
  relatedServices: Service[];
  children: ReactNode;
}

// Shared shell for every service page.
// Hero sits outside the divider - the photo is already a clear break.
// ServiceCtaBand only renders for 'live' services.
// The progress bar is fixed, so its place in the markup does not matter
export function ServicePageTemplate({
  service,
  theme,
  relatedServices,
  children,
}: ServicePageTemplateProps) {
  return (
    <>
      <ScrollProgress />
      <ServiceHero service={service} theme={theme} />
      <div className="divide-border divide-y">
        {children}
        {service.status === 'live' && <ServiceCtaBand service={service} />}
        <RelatedServices relatedServices={relatedServices} />
      </div>
    </>
  );
}
