// Every page/component reads from here. Never hardcode services

// Array, not a map: generateStaticParams wants an array and the list is small (<100).
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

// Not exported: read through the getters. To add a service, copy an entry and use a unique slug.
const services: Service[] = [
  // Remap / Tuning
  {
    slug: 'stage-1-tuning',
    title: 'Stage 1 Tuning',
    category: 'Remap / Tuning',
    shortDescription: 'Performance remapping for increased power and torque.',
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
      // Placeholder FAQs, drafted from the copy above. Unapproved by Syd (see status.md).
      {
        type: 'faq',
        title: 'Frequently Asked Questions',
        items: [
          {
            question: 'How much power will I gain?',
            answer:
              'It depends on your vehicle, but a boost of 10-20% in horsepower and torque is typical.',
          },
          {
            question: 'How long does Stage 1 tuning take?',
            answer:
              'It is often just a simple ECU remap, so it can usually be completed in an hour or two.',
          },
          {
            question: 'Will it affect reliability?',
            answer:
              'No. We tune for performance while keeping your vehicle reliable and easy to drive.',
          },
          {
            question: 'Can you tune my vehicle?',
            answer:
              'We can tune 99% of modern vehicles. Get in touch with your make, model and year and we will confirm.',
          },
          {
            question: 'What equipment do you use?',
            answer:
              'We use genuine Alientech tools, and we can tune through the OBD port or on the bench.',
          },
        ],
      },
    ],
  },
  {
    slug: 'dpf-egr-solutions',
    title: 'DPF / EGR Solutions',
    category: 'Remap / Tuning',
    shortDescription: 'DPF and EGR solutions from Team Autotech.',
    icon: Filter,
  },
  {
    slug: 'engine-management-error-code-delete',
    title: 'Engine Management Error Code Delete',
    category: 'Remap / Tuning',
    shortDescription: 'Engine management error code delete from Team Autotech.',
    icon: Eraser,
  },
  {
    slug: 'tuning-freaks-bootmod',
    title: 'Tuning Freaks Bootmod',
    category: 'Remap / Tuning',
    shortDescription: 'Tuning Freaks Bootmod from Team Autotech.',
    icon: Cpu,
  },

  // Programming
  {
    slug: 'bmw-programming',
    title: 'BMW Programming',
    category: 'Programming',
    shortDescription: 'BMW programming from Team Autotech.',
    icon: KeyRound,
  },
  {
    slug: 'mercedes-programming',
    title: 'Mercedes Programming',
    category: 'Programming',
    shortDescription: 'Mercedes programming from Team Autotech.',
    icon: KeySquare,
  },
  {
    slug: 'vag-programming',
    title: 'VAG Programming',
    category: 'Programming',
    shortDescription: 'VAG programming for Audi, Seat, Skoda and VW.',
    icon: Key,
  },

  // Auto Security — Immobilisers
  {
    slug: 'ghost-immobiliser-ii',
    title: 'Ghost Immobiliser II',
    category: 'Auto Security',
    shortDescription:
      'The most advanced immobiliser, using the latest technology to fight car theft.',
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
      // Placeholder FAQs, unapproved by Syd (see status.md).
      {
        type: 'faq',
        title: 'Frequently Asked Questions',
        items: [
          {
            question: 'How does Ghost Immobiliser II work?',
            answer:
              "It integrates with your vehicle's own technology and communicates directly with it. You use the factory buttons to enter a PIN sequence of up to 20 button presses before the car will fully activate.",
          },
          {
            question: 'Do I need to carry anything extra?',
            answer:
              'You use the buttons already built into your vehicle to enter your PIN sequence.',
          },
          {
            question: 'Will it fit my vehicle?',
            answer:
              'Compatibility depends on your make, model and year. Get in touch with your vehicle details and we will confirm.',
          },
          {
            question: 'How much does it cost?',
            answer:
              'Prices vary by vehicle and spec. Call or message us for a free, no-obligation quote.',
          },
        ],
      },
    ],
  },
  {
    slug: 'scorpion-x-series-immobiliser',
    title: 'Scorpion X Series Immobiliser',
    category: 'Auto Security',
    shortDescription:
      'Market-leading immobiliser that stops key cloning and key coding attacks.',
    icon: ShieldAlert,
    // Copy staged from the old site (docs/content/scorpion-x-series-immobiliser.md).
    // Step text comes from the carousel images. Live so the PR preview can be tested.
    // Copy is unapproved by Syd (see status.md).
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'Instant Protection Against Key Cloning',
        body: [
          "The Scorpion X Series is an instant immobiliser that disarms with a custom PIN code entered on your vehicle's existing controls, stopping key cloning and key coding attacks.",
        ],
      },
      {
        type: 'steps',
        title: 'How It Works',
        steps: [
          {
            title: 'Ignition Off',
            description:
              'Switch off the ignition and the immobiliser activates automatically.',
          },
          {
            title: 'Enter Your Custom PIN',
            description:
              'Your car will only move once the immobiliser is disarmed with your custom PIN, entered on the steering wheel or dash.',
          },
          {
            title: 'Prevent Theft',
            description:
              'The immobiliser protects your car from theft and key cloning attacks.',
          },
          {
            title: 'Layered Security',
            description:
              'Pair the immobiliser with a tracker for added protection.',
          },
        ],
      },
      // Placeholder FAQs, unapproved by Syd (see status.md).
      {
        type: 'faq',
        title: 'Frequently Asked Questions',
        items: [
          {
            question: 'How do I disarm the immobiliser?',
            answer:
              "You enter your custom PIN using your vehicle's existing controls, on the steering wheel or dash. Your car will only move once the immobiliser is disarmed.",
          },
          {
            question: 'Does it protect against key cloning?',
            answer:
              'Yes. It protects your car from theft, key cloning and key coding attacks.',
          },
          {
            question: 'Can I use it with a tracker?',
            answer:
              'Yes. Pairing the immobiliser with a tracker adds an extra layer of protection.',
          },
          {
            question: 'Will it fit my vehicle?',
            answer:
              'Compatibility depends on your make, model and year. Get in touch with your vehicle details and we will confirm.',
          },
          {
            question: 'How much does it cost?',
            answer:
              'Prices vary by vehicle and spec. Call or message us for a free, no-obligation quote.',
          },
        ],
      },
    ],
  },
  {
    slug: 'spectre-immobiliser',
    title: 'Spectre Immobiliser',
    category: 'Auto Security',
    shortDescription: 'Advanced vehicle immobiliser system.',
    icon: Lock,
  },

  // Auto Security — GPS Trackers
  {
    slug: 'scorpion-trackers',
    title: 'Scorpion Trackers',
    category: 'Auto Security',
    shortDescription: 'Insurance-approved GPS tracking systems.',
    icon: MapPin,
  },

  // Auto Electrical Services
  {
    slug: 'car-audio-installation',
    title: 'Car Audio Installation',
    category: 'Auto Electrical',
    shortDescription: 'Professional car audio system installation.',
    icon: Volume2,
  },
  {
    slug: 'dashcam-installation',
    title: 'Dashcam Installation',
    category: 'Auto Electrical',
    shortDescription: 'Dashcam installation from Team Autotech.',
    icon: Camera,
  },
  {
    slug: 'parking-sensor-installation',
    title: 'Parking Sensor Installation',
    category: 'Auto Electrical',
    shortDescription: 'Parking sensor installation from Team Autotech.',
    icon: Radar,
  },
  {
    slug: 'reverse-camera-installation',
    title: 'Reverse Camera Installation',
    category: 'Auto Electrical',
    shortDescription: 'Reverse camera installation from Team Autotech.',
    icon: Video,
  },
];

// Ranked list for the homepage "Popular Services" grid
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

// Other services in the same category
export function getRelatedServices(service: Service, limit = 3): Service[] {
  return services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, limit);
}
