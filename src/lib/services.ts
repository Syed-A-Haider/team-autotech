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
  Zap,
  Fuel,
  Timer,
} from 'lucide-react';

// Not exported - Encapsulation = access via functions instead.
// Adding new service, copy the same structure, pick a unique slug, pick a category that's already existing, rest is up to you
const services: Service[] = [
  // Remap / Tuning
  {
    slug: 'stage-1-tuning',
    title: 'Stage 1 Tuning',
    category: 'Remap / Tuning',
    shortDescription: 'Performance remapping for increased power and torque.',
    body: 'Placeholder content.',
    icon: Gauge,
    popular: true,
    // Copy staged from the old site (docs/content/stage-1-tuning.md).
    // status stays unset (coming soon) until Syd approves it.
    sections: [
      {
        type: 'prose',
        title: "Stage 1 Tuning: Unlock Your Vehicle's Full Potential",
        body: [
          "Stage 1 tuning is one of the most popular and cost-effective ways to improve your vehicle's performance. Whether you're looking for more power, better throttle response, or an overall enhanced driving experience, Stage 1 tuning can provide a noticeable difference without the need for major mechanical changes.",
        ],
      },
      {
        type: 'prose',
        title: 'What is Stage 1 Tuning?',
        body: [
          "Stage 1 tuning refers to performance modifications that can be made to your car's engine and ECU (Engine Control Unit) to increase horsepower, torque, and fuel efficiency. Unlike more extensive tuning options (Stage 2 or Stage 3), Stage 1 generally involves software modifications like remapping or chip tuning and sometimes light upgrades to air intake or exhaust systems. This makes it an ideal choice for those looking to gain more performance without going overboard.",
        ],
      },
      {
        type: 'feature',
        title: 'Key Benefits of Stage 1 Tuning',
        layout: 'grid',
        features: [
          {
            icon: Zap,
            title: 'Increased Power',
            description:
              'The most significant advantage of Stage 1 tuning is the noticeable increase in horsepower and torque. Expect a boost of 10-20% depending on your vehicle.',
          },
          {
            icon: Gauge,
            title: 'Improved Throttle Response',
            description:
              'Stage 1 tuning can sharpen throttle response, giving you a more immediate and engaging driving experience.',
          },
          {
            icon: Fuel,
            title: 'Better Fuel Efficiency',
            description:
              'While Stage 1 tuning is typically aimed at improving performance, the ECU remap can also optimize fuel usage, leading to better miles per gallon (MPG) in some cases.',
          },
          {
            icon: Timer,
            title: 'Quick and Easy',
            description:
              'Stage 1 tuning is often done through a simple ECU remap, which means no invasive mechanical work is required. The tuning can be completed in a short amount of time, often taking only an hour or two.',
          },
        ],
      },
      {
        type: 'prose',
        title: 'Why Choose Us for Stage 1 Tuning?',
        body: [
          "At Team Autotech, we specialize in providing tailored tuning solutions that deliver noticeable results. Our expert technicians use state-of-the-art tools and software to ensure that your vehicle is optimized for peak performance while maintaining reliability and drivability. We're passionate about cars and dedicated to helping you get the most out of yours.",
        ],
      },
      {
        type: 'prose',
        title: 'About us',
        body: [
          'We have many years of tuning experience and can tune 99% of modern vehicles. We have the genuine tools from Alientech not the cheap and dangerous clones from china. We can Tune through the port or on the bench. We keep all our hardware updated and have a brilliant aftersales service,',
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
