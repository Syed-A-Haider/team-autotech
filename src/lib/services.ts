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
    // Live so the PR preview can be tested. Copy is unapproved by Syd (see status.md).
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: "Unlock Your Vehicle's Full Potential",
        body: [
          'Stage 1 tuning is one of the most popular and cost-effective ways to get more from your vehicle. Whether you want more power, sharper throttle response or a more engaging drive, it can make a noticeable difference without any major mechanical changes.',
        ],
      },
      {
        type: 'prose',
        title: 'What is Stage 1 Tuning?',
        body: [
          "Stage 1 tuning refers to performance modifications to your car's engine and ECU (Engine Control Unit) that increase horsepower and torque, and can improve fuel efficiency. Unlike the more extensive Stage 2 and Stage 3 options, Stage 1 generally involves software changes such as remapping or chip tuning, and sometimes light upgrades to the air intake or exhaust. That makes it an ideal choice if you want more performance without going overboard.",
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
              'The biggest advantage of Stage 1 tuning is a noticeable gain in horsepower and torque. Expect a boost of 10-20%, depending on your vehicle.',
          },
          {
            icon: Gauge,
            title: 'Improved Throttle Response',
            description:
              'Stage 1 tuning can sharpen your throttle response, for a more immediate and engaging drive.',
          },
          {
            icon: Fuel,
            title: 'Better Fuel Efficiency',
            description:
              'Stage 1 tuning is aimed at performance, but the ECU remap can also optimise fuel usage, which can mean better miles per gallon (MPG) in some cases.',
          },
          {
            icon: Timer,
            title: 'Quick and Easy',
            description:
              'Stage 1 tuning is often just a simple ECU remap, so no invasive mechanical work is needed. It can be completed quickly, often in only an hour or two.',
          },
        ],
      },
      {
        type: 'prose',
        title: 'Why Choose Us for Stage 1 Tuning?',
        body: [
          "At Team Autotech, we specialise in tailored tuning solutions that deliver noticeable results. Our expert technicians use state-of-the-art tools and software to make sure your vehicle is optimised for peak performance, while keeping it reliable and easy to drive. We're passionate about cars and dedicated to helping you get the most out of yours.",
        ],
      },
      {
        type: 'prose',
        title: 'About us',
        body: [
          'We have many years of tuning experience and can tune 99% of modern vehicles. We use genuine Alientech tools, not cheap and dangerous clones from China. We can tune through the OBD port or on the bench, we keep all our hardware up to date, and we offer a brilliant after-sales service.',
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
    shortDescription:
      'The most advanced immobiliser, using the latest technology to fight car theft.',
    body: 'Placeholder content — real copy to come from Ghost Immobiliser II page.',
    icon: ShieldCheck,
    popular: true,
    // Copy staged from the old site (docs/content/ghost-immobiliser-ii.md).
    // Live so the PR preview can be tested. Copy, video title and poster are unapproved by Syd (see status.md).
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'Use Your Factory Buttons to Enter a PIN Before You Drive Away',
        body: [
          "Ghost Immobiliser II integrates with your vehicle's own technology and communicates directly with it. Using the factory buttons, you enter a PIN sequence of up to 20 button presses before the car will fully activate.",
        ],
      },
      {
        type: 'video',
        title: 'See Ghost Immobiliser II in Action',
        videoId: 'hT3xBns4wmw',
        // Placeholder: frame saved from the video itself. Syd's poster replaces it at the same path.
        posterImage: '/images/videos/ghost-immobiliser-ii.jpg',
      },
    ],
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
