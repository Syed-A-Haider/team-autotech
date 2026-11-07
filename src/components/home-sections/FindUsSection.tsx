import { Clock, MapPin, Navigation } from 'lucide-react';
import {
  ADDRESS,
  OPENING_HOURS,
  MAPS_EMBED_SRC,
  MAPS_DIRECTIONS_LINK,
  siteConfig,
} from '@/lib/constants';
import { SectionWrapper } from '../ui/SectionWrapper';
import { LinkButton } from '../ui/LinkButton';
import { ContactLine } from '../ui/ContactLine';
import { MapEmbed } from './MapEmbed';

export const FIND_US_SECTION_HEADING = 'Find Us';
export const FIND_US_SECTION_INTRO =
  "Based in Nelson, Lancashire - here's how to find us.";
export const FIND_US_DIRECTIONS_LABEL = 'Get Directions';

// overflow-x-clip on the section: the side slides from lg can never widen the page
export function FindUsSection() {
  return (
    <SectionWrapper className="overflow-x-clip py-12 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        {/* Information. Below lg its rows rise in turn, from lg the whole
            column slides in from the left (never both on one element) */}
        <div className="max-lg:reveal-stagger lg:reveal-left flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-foreground text-2xl font-semibold sm:text-3xl">
              {FIND_US_SECTION_HEADING}
            </h2>
            <p className="text-muted text-sm sm:text-base">
              {FIND_US_SECTION_INTRO}
            </p>
          </div>

          {/* Address */}
          <address className="not-italic">
            <ContactLine
              href={MAPS_DIRECTIONS_LINK}
              icon={<MapPin size={18} />}
              external
            >
              {ADDRESS}
            </ContactLine>
          </address>

          {/* Opening Hours */}
          <div className="flex items-start gap-2">
            <Clock
              aria-hidden="true"
              className="text-accent mt-0.5 h-4.5 w-4.5 shrink-0"
            />
            <div className="text-muted text-sm">
              <p>{OPENING_HOURS.weekdays}</p>
              <p>{OPENING_HOURS.weekend}</p>
            </div>
          </div>

          {/* Link to Map. The wrapper takes the reveal, the button keeps its
              press and sheen. flex keeps the button its own width */}
          <div className="flex">
            <LinkButton href={MAPS_DIRECTIONS_LINK} variant="primary" external>
              <Navigation aria-hidden="true" size={16} />
              {FIND_US_DIRECTIONS_LABEL}
            </LinkButton>
          </div>
        </div>

        {/* Embedded Map. The frame reveals, never the iframe inside it */}
        <div className="border-accent bg-surface max-lg:reveal lg:reveal-right overflow-hidden rounded-lg border-t-4">
          <MapEmbed
            src={MAPS_EMBED_SRC}
            title={`Map showing ${siteConfig.name}'s location`}
            className="h-72 w-full sm:h-80 lg:h-96"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
