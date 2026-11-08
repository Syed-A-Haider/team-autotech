// Old WordPress URLs and where they go now. Plain data: next.config.ts reads
// this file, so it must not import services.ts or any icon code.
// Sources are lowercase, with no trailing slash and no params (Next matches
// case-insensitively and strips the slash itself).
import { serviceHref } from './routes';

export interface OldUrlRedirect {
  source: string;
  destination: string;
}

const ABOUT = '/about';

// Old pages that moved to a service page. The first three are confirmed from
// the content briefs. The rest are plausible WordPress menu slugs.
const SERVICE_SOURCES: Record<string, string[]> = {
  'stage-1-tuning': [],
  'ghost-immobiliser-ii': ['ghost-immobiliser'],
  'scorpion-x-series-immobiliser': ['scorpion-x-series'],
  'dpf-egr-solutions': ['dpf-egr'],
  'engine-management-error-code-delete': [],
  'tuning-freaks-bootmod': ['bootmod'],
  'bmw-programming': [],
  'mercedes-programming': [],
  'vag-programming': [],
  'spectre-immobiliser': [],
  'scorpion-trackers': [],
  'car-audio-installation': ['car-audio'],
  'dashcam-installation': ['dashcam'],
  'parking-sensor-installation': ['parking-sensors'],
  'reverse-camera-installation': ['reverse-camera'],
  // New pages (T6.5), not old URLs. The guard test wants a root redirect for
  // every service, so each one only gets its own slug
  'adblue-solutions': [],
  'xhp-gearbox-map': [],
  'component-protection-removal': [],
  'fleet-trackers': [],
  'road-angel-dashcam': [],
  'vehicle-maintenance': [],
  'mot-preparation': [],
  'ct-carbon-official-installer': [],
  'body-panel-repair-and-paint': [],
};

const SERVICE_REDIRECTS: OldUrlRedirect[] = Object.entries(
  SERVICE_SOURCES,
).flatMap(([slug, aliases]) =>
  [slug, ...aliases].map((old) => ({
    source: `/${old}`,
    destination: serviceHref(slug),
  })),
);

const ABOUT_REDIRECTS: OldUrlRedirect[] = [
  '/about-us',
  '/contact',
  '/contact-us',
].map((source) => ({ source, destination: ABOUT }));

export const OLD_URL_REDIRECTS: readonly OldUrlRedirect[] = [
  ...SERVICE_REDIRECTS,
  ...ABOUT_REDIRECTS,
];
