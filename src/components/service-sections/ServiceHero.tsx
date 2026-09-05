import Image from 'next/image';
import { Phone } from 'lucide-react';
import type { Service } from '@/types/service';
import type { CategoryTheme } from '@/lib/service-themes';
import LinkButton from '../ui/LinkButton';
import SectionWrapper from '../ui/SectionWrapper';
import { TEL_MOBILE_LINK } from '@/lib/constants';

interface ServiceHeroProps {
  service: Service;
  theme: CategoryTheme;
}

// Full-bleed hero. Every layer (image, overlays, text) is absolutely
// positioned inside this box, so the text is always pinned over the
// image — it never depends on flex/content height to land correctly.
export function ServiceHero({ service, theme }: ServiceHeroProps) {
  const heroImage = service.heroImage ?? theme.heroImage;

  return (
    <div className="relative isolate h-100 overflow-hidden">
      {' '}
      <Image src={heroImage} alt="" fill priority className="object-cover" />
      {/* Readability scrim, then category motif */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${theme.overlayClassName}`}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${theme.motifClassName}`}
      />
      {/* Pinned to the bottom of the box, above both overlays */}
      <SectionWrapper
        as="div"
        className="absolute inset-x-0 bottom-0 z-10 pb-12"
      >
        <p className="text-accent text-sm font-medium">{theme.eyebrow}</p>
        <h1 className="text-foreground mt-2 text-4xl font-bold sm:text-5xl">
          {service.title}
        </h1>
        {service.shortDescription && (
          <p className="text-muted mt-4 max-w-prose">
            {service.shortDescription}
          </p>
        )}
        <LinkButton
          href={TEL_MOBILE_LINK}
          variant="primary"
          size="md"
          className="mt-6 lg:hidden"
        >
          <Phone aria-hidden="true" className="h-4 w-4" />
          Call now
        </LinkButton>
      </SectionWrapper>
    </div>
  );
}
