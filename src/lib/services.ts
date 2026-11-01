// Every page/component reads from here. Never hardcode services

/* 
Reason for choosing an Array of Services:
    1. Matches generateStaticParams (which wants an array)
    2. Can easily enumerate them (put them in dropdowns, homepage grids) with .map() and .filter()
    3. Can search them easily with .find() by their slug which is their unique ID
    4. For limited services - will be < 100, O(n) lookup is irrelevant, same practical result as a hash

*/
import type { Service, ServiceCategories } from '@/types/service';
import {
  Gauge,
  Filter,
  Eraser,
  Cpu,
  KeyRound,
  KeySquare,
  Key,
  ShieldCheck,
  ShieldAlert,
  MapPin,
  Volume2,
  Camera,
  Radar,
  Video,
  Lock,
} from 'lucide-react';

// Not exported - Encapsulation = access via functions instead.
// Adding new service, copy the same structure, pick a unique slug, pick a category that's already existing, rest is up to you
const services: Service[] = [
  // Remap / Tuning
  {
    slug: 'stage-1-tuning',
    title: 'Stage 1 Tuning',
    category: 'Remap / Tuning',
    shortDescription: 'Performance remapping for increased power and torque',
    body: 'Placeholder content.',
    icon: Gauge,
    popular: true,
    // TEMP (T3.5 testing): placeholder content so every block can be checked
    // on a live page. T3.6 replaces it with Syd's approved copy.
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'About this service',
        body: [
          'Placeholder paragraph one. Real copy arrives in T3.6.',
          'Placeholder paragraph two, long enough to check line length and wrapping across screen sizes.',
        ],
      },
      {
        type: 'specband',
        specs: [
          { label: 'Placeholder spec one', value: 'Value one' },
          { label: 'Placeholder spec two', value: 'Value two' },
          { label: 'Placeholder spec three', value: 'Value three' },
          { label: 'Placeholder spec four', value: 'Value four' },
        ],
      },
      {
        type: 'feature',
        title: 'Grid features',
        layout: 'grid',
        features: [
          {
            icon: Gauge,
            title: 'Feature one',
            description: 'Placeholder text.',
          },
          { icon: Cpu, title: 'Feature two', description: 'Placeholder text.' },
          { title: 'Feature without icon', description: 'Placeholder text.' },
        ],
      },
      {
        type: 'feature',
        title: 'Alternating features',
        layout: 'alternating',
        features: [
          {
            icon: Gauge,
            title: 'Feature one',
            description: 'Placeholder text.',
          },
          { icon: Cpu, title: 'Feature two', description: 'Placeholder text.' },
          {
            icon: ShieldCheck,
            title: 'Feature three',
            description: 'Placeholder text.',
          },
        ],
      },
      {
        type: 'feature',
        title: 'List features',
        layout: 'list',
        features: [
          {
            icon: Gauge,
            title: 'Feature one',
            description: 'Placeholder text.',
          },
          { icon: Cpu, title: 'Feature two', description: 'Placeholder text.' },
        ],
      },
      {
        type: 'video',
        title: 'Video block',
        videoId: 'M7lc1UVf-VE', // generic public test video
        posterImage: '/images/services/tuning.png',
        caption:
          'Placeholder caption, long enough to check wrapping on narrow screens.',
      },
      {
        type: 'steps',
        title: 'How it works',
        steps: [
          { title: 'Step one', description: 'Placeholder text.' },
          { title: 'Step two', description: 'Placeholder text.' },
          { title: 'Step three', description: 'Placeholder text.' },
        ],
      },
      {
        type: 'faq',
        title: 'Frequently asked questions',
        items: [
          {
            question: 'Placeholder question one?',
            answer: 'Placeholder answer.',
          },
          {
            question: 'Placeholder question two?',
            answer: 'Placeholder answer.',
          },
        ],
      },
    ],
  },
  {
    slug: 'dpf-egr-solutions',
    title: 'DPF / EGR Solutions',
    category: 'Remap / Tuning',
    shortDescription: 'Diagnostics and solutions for DPF and EGR issues.',
    body: 'Placeholder content.',
    icon: Filter,
  },
  {
    slug: 'engine-management-error-code-delete',
    title: 'Engine Management Error Code Delete',
    category: 'Remap / Tuning',
    shortDescription: 'Clearing persistent engine management fault codes.',
    body: 'Placeholder content.',
    icon: Eraser,
  },
  {
    slug: 'tuning-freaks-bootmod',
    title: 'Tuning Freaks Bootmod',
    category: 'Remap / Tuning',
    shortDescription: 'Bootmod3 tuning solutions.',
    body: 'Placeholder content.',
    icon: Cpu,
  },

  // Programming
  {
    slug: 'bmw-programming',
    title: 'BMW Programming',
    category: 'Programming',
    shortDescription: 'Key programming and module coding for BMW vehicles.',
    body: 'Placeholder content.',
    icon: KeyRound,
  },
  {
    slug: 'mercedes-programming',
    title: 'Mercedes Programming',
    category: 'Programming',
    shortDescription:
      'Key programming and module coding for Mercedes vehicles.',
    body: 'Placeholder content.',
    icon: KeySquare,
  },
  {
    slug: 'vag-programming',
    title: 'VAG Programming',
    category: 'Programming',
    shortDescription:
      'Key programming and module coding for Audi, Seat, Skoda, and VW.',
    body: 'Placeholder content.',
    icon: Key,
  },

  // Auto Security — Immobilisers
  {
    slug: 'ghost-immobiliser-ii',
    title: 'Ghost Immobiliser II',
    category: 'Auto Security',
    shortDescription: 'CAN bus immobiliser with no external fob or LED.',
    body: 'Placeholder content — real copy to come from Ghost Immobiliser II page.',
    icon: ShieldCheck,
    popular: true,
  },
  {
    slug: 'scorpion-x-series-immobiliser',
    title: 'Scorpion X Series Immobiliser',
    category: 'Auto Security',
    shortDescription: 'Thatcham-approved immobiliser system.',
    body: 'Placeholder content — real copy to come from Scorpion X Series page.',
    icon: ShieldAlert,
  },
  {
    slug: 'spectre-immobiliser',
    title: 'Spectre Immobiliser',
    category: 'Auto Security',
    shortDescription: 'Advanced vehicle immobiliser system.',
    body: 'Placeholder content.',
    icon: Lock,
  },

  // Auto Security — GPS Trackers
  {
    slug: 'scorpion-trackers',
    title: 'Scorpion Trackers',
    category: 'Auto Security',
    shortDescription: 'Insurance-approved GPS tracking systems.',
    body: 'Placeholder content.',
    icon: MapPin,
  },

  // Auto Electrical Services
  {
    slug: 'car-audio-installation',
    title: 'Car Audio Installation',
    category: 'Auto Electrical',
    shortDescription: 'Professional car audio system installation.',
    body: 'Placeholder content.',
    icon: Volume2,
  },
  {
    slug: 'dashcam-installation',
    title: 'Dashcam Installation',
    category: 'Auto Electrical',
    shortDescription: 'Front and rear dashcam supply and installation.',
    body: 'Placeholder content.',
    icon: Camera,
  },
  {
    slug: 'parking-sensor-installation',
    title: 'Parking Sensor Installation',
    category: 'Auto Electrical',
    shortDescription: 'Front and rear parking sensor installation.',
    body: 'Placeholder content.',
    icon: Radar,
  },
  {
    slug: 'reverse-camera-installation',
    title: 'Reverse Camera Installation',
    category: 'Auto Electrical',
    shortDescription: 'Reverse camera supply and installation.',
    body: 'Placeholder content.',
    icon: Video,
  },
];

// Ranked list for homepage "Popular Services" grid (T2.3)
// Order is deliberate - Remap and Ghosts are kept apart
const FEATURED_SERVICE_SLUGS = [
  'stage-1-tuning',
  'bmw-programming',
  'dashcam-installation',
  'scorpion-trackers',
  'ghost-immobiliser-ii',
  'dpf-egr-solutions',
] as const;

// Functions

export function getAllServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function groupServicesByCategory(): ServiceCategories {
  return services.reduce(
    // Groups = accumulator, service is the current item
    (groups, service) => {
      // If no existing category group, use empty array,
      // Push service to it's categories group (either just got made or existing)
      (groups[service.category] ??= []).push(service);
      return groups;
    },

    // Initial Value of groups = empty record
    {} as Record<string, Service[]>,
  );
}

// .filter() converts from (Service | undefined)[] to Service[]
// is Service tells Typescript
export function getFeaturedServices(): Service[] {
  return FEATURED_SERVICE_SLUGS.map((slug) => getServiceBySlug(slug)).filter(
    (service): service is Service => service !== undefined,
  );
}

// Get all services in category
export function getRelatedServices(service: Service, limit = 3): Service[] {
  return services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, limit);
}
