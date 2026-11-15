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
  Droplet,
  Cog,
  LockOpen,
  Truck,
  Cctv,
  Wrench,
  ClipboardCheck,
  Layers,
  SprayCan,
  CircuitBoard,
  SlidersHorizontal,
  PackagePlus,
  MessageCircle,
  CarFront,
  TriangleAlert,
  Replace,
  Speaker,
  Cable,
  Eye,
  ParkingCircle,
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
    slug: 'adblue-solutions',
    title: 'AdBlue Solutions',
    category: 'Remap / Tuning',
    shortDescription: 'AdBlue solutions from Team Autotech.',
    icon: Droplet,
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
  {
    slug: 'xhp-gearbox-map',
    title: 'XHP Gearbox Map',
    category: 'Remap / Tuning',
    shortDescription: 'XHP gearbox map from Team Autotech.',
    icon: Cog,
  },

  // Programming
  // AI-generated (T6.7)
  {
    slug: 'bmw-programming',
    title: 'BMW Programming',
    category: 'Programming',
    shortDescription:
      'BMW coding and programming, from replacement modules and keys to the settings you want.',
    icon: KeyRound,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'Make Your BMW Work Your Way',
        body: [
          'A modern BMW runs on software. Control modules look after everything from the engine and gearbox to the lights, the locks and the screen, and each one needs the right coding to work with the rest of the car.',
          'That is where programming comes in. Fit a new module, add some equipment or want a feature to behave differently, and the car has to be told. We do that work here, so your BMW does what you expect when you drive away.',
        ],
      },
      {
        type: 'feature',
        title: 'When Your BMW Needs Programming',
        layout: 'list',
        features: [
          {
            icon: CircuitBoard,
            title: 'Replacement Modules',
            description:
              'A replacement module usually needs coding to your car before it will work properly.',
          },
          {
            icon: KeyRound,
            title: 'Keys',
            description:
              'Need a spare or replacement key? Key programming can be part of the job, depending on your vehicle.',
          },
          {
            icon: PackagePlus,
            title: 'Added Equipment',
            description:
              'Retrofitted equipment often has to be coded in before the car recognises it.',
          },
          {
            icon: SlidersHorizontal,
            title: 'Features and Settings',
            description:
              'Some features and settings can be changed through coding. What is possible depends on your car, so ask us about yours.',
          },
          {
            icon: MessageCircle,
            title: 'Not Sure What You Need?',
            description:
              'Tell us what you are after and we will say what is possible.',
          },
        ],
      },
      {
        type: 'steps',
        title: 'From Enquiry to Drive Away',
        steps: [
          {
            title: 'Tell Us About Your BMW',
            description:
              'Call or WhatsApp with your model, your year and what you want done.',
          },
          {
            title: 'We Confirm What Is Possible',
            description:
              'We tell you whether the job can be done on your car before you book.',
          },
          {
            title: 'Book Your Car In',
            description:
              'Pick a time that suits you and bring the car, with its keys, to us.',
          },
          {
            title: 'Coded and Checked',
            description:
              'We carry out the work and check it with you before you leave.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'BMW Programming Questions',
        items: [
          {
            question: 'Can you program my BMW?',
            answer:
              'It depends on the model, the year and what you need. Call or WhatsApp with your details and we will tell you.',
          },
          {
            question: 'Can you program keys?',
            answer:
              'Key programming can be included, depending on your vehicle. Ask us about yours.',
          },
          {
            question: 'What details do you need?',
            answer:
              'Your model, the year and what you want done. A photo of any warning on the dash helps.',
          },
          {
            question: 'How much does it cost?',
            answer:
              'Pricing depends on your vehicle and spec. Call or WhatsApp for a free, no-obligation quote.',
          },
        ],
      },
    ],
  },
  // AI-generated (T6.7)
  {
    slug: 'mercedes-programming',
    title: 'Mercedes Programming',
    category: 'Programming',
    shortDescription:
      'Mercedes coding and programming for replacement parts, keys, upgrades and your own settings.',
    icon: KeySquare,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'Programming for Your Mercedes',
        body: [
          'Your Mercedes is run by a network of control units that all have to agree with each other. Change one of them and the rest of the car needs to know about it.',
          'Our programming work keeps that network in step. Whether a part has been replaced, a key is needed or you want the car set up differently, we sort out the software side.',
        ],
      },
      {
        type: 'feature',
        title: 'What We Can Help With',
        layout: 'grid',
        features: [
          {
            icon: Wrench,
            title: 'After a Repair',
            description:
              'A replaced control unit can need coding or programming to your car. We take care of it once the part is fitted.',
          },
          {
            icon: KeySquare,
            title: 'Keys',
            description:
              'Spare and replacement key programming can be included, depending on your vehicle. Ask us about yours.',
          },
          {
            icon: SlidersHorizontal,
            title: 'Settings and Upgrades',
            description:
              'Added equipment and some personal settings can be coded in. What is possible depends on your car.',
          },
        ],
      },
      {
        type: 'steps',
        title: 'How a Programming Job Runs',
        steps: [
          {
            title: 'Get in Touch',
            description:
              'Call or WhatsApp and tell us the model, the year and what you need.',
          },
          {
            title: 'We Connect and Check',
            description:
              'We connect our diagnostic equipment, see what is fitted and agree the plan with you.',
          },
          {
            title: 'Programmed and Tested',
            description:
              'We do the work, then test that everything responds as it should.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Mercedes Programming FAQs',
        items: [
          {
            question: 'Will it work on my Mercedes?',
            answer:
              'That depends on the model, the year and the job. Call or WhatsApp with your details and we will confirm.',
          },
          {
            question: 'Do you program keys?',
            answer:
              'Key programming can be included, depending on your vehicle. Ask us about yours.',
          },
          {
            question: 'What should I bring?',
            answer:
              'Bring the car and every key you have. If a part was replaced, tell us which one.',
          },
          {
            question: 'How much does it cost?',
            answer:
              'Pricing depends on your vehicle and spec. Call or WhatsApp for a free, no-obligation quote.',
          },
        ],
      },
    ],
  },
  // AI-generated (T6.7)
  {
    slug: 'vag-programming',
    title: 'VAG Programming',
    category: 'Programming',
    shortDescription:
      'VAG coding and programming for Audi, Seat, Skoda and VW, from keys to retrofits.',
    icon: Key,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'Coding for Audi, Seat, Skoda and VW',
        body: [
          'VAG stands for the Volkswagen Group. Audi, Seat, Skoda and VW all come from it, and they share plenty of their technology.',
          'On these cars the control units are closely tied to each other. Replace one, retrofit something new or want a setting changed, and it usually needs coding or programming before the car behaves.',
          'We handle that work for you. If you are not sure whether your car needs it, ask us and we will point you in the right direction.',
        ],
      },
      {
        type: 'steps',
        title: 'Getting Your Car Coded',
        steps: [
          {
            title: 'Send Us Your Details',
            description:
              'Call or WhatsApp with the make, model, year and what you want done.',
          },
          {
            title: 'We Confirm the Job',
            description:
              'We tell you whether we can do it on your car and what it involves.',
          },
          {
            title: 'Book In',
            description:
              'Choose a time that suits you and bring the car to us.',
          },
          {
            title: 'Coded and Tested',
            description:
              'We carry out the work and test it before you drive away.',
          },
        ],
      },
      {
        type: 'feature',
        title: 'Common Reasons for VAG Programming',
        layout: 'grid',
        features: [
          {
            icon: CircuitBoard,
            title: 'Replacement Modules',
            description:
              'A replacement control unit usually needs coding or programming to your car.',
          },
          {
            icon: PackagePlus,
            title: 'Retrofitted Equipment',
            description:
              'Equipment added after the car was built often has to be coded in before it works.',
          },
          {
            icon: Key,
            title: 'Keys and Settings',
            description:
              'Key programming and some setting changes can be included, depending on your vehicle. Ask us about yours.',
          },
          {
            icon: Replace,
            title: 'Component Protection',
            description:
              'A replacement unit that shows a component protection message needs extra work. See our Component Protection Removal page.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'VAG Programming FAQs',
        items: [
          {
            question: 'Which brands do you work on?',
            answer:
              'Audi, Seat, Skoda and VW. If your car is from the group but not on that list, ask us.',
          },
          {
            question: 'Can you program my model?',
            answer:
              'It depends on the model, the year and the job. Call or WhatsApp with your details and we will confirm.',
          },
          {
            question: 'Can you program keys?',
            answer:
              'Key programming can be included, depending on your vehicle. Ask us about yours.',
          },
          {
            question: 'How much does it cost?',
            answer:
              'Pricing depends on your vehicle and spec. Call or WhatsApp for a free, no-obligation quote.',
          },
        ],
      },
    ],
  },
  // AI-generated (T6.7)
  {
    slug: 'component-protection-removal',
    title: 'Component Protection Removal',
    category: 'Programming',
    shortDescription:
      'Component protection removal, so a replacement or upgraded module works properly in your car.',
    icon: LockOpen,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'What Is Component Protection?',
        body: [
          'Component protection is a security feature on many Volkswagen Group cars. Depending on the vehicle, it ties certain modules, such as the radio or the instrument cluster, to the car they were first fitted in.',
          'Fit a replacement or upgraded unit and the car can show a warning and switch off some functions until the unit has been adapted.',
          'That is the job we do: adapting the unit so it works properly in your car. Ask us about yours and we will tell you what is involved.',
        ],
      },
      {
        type: 'feature',
        title: 'When Component Protection Comes Up',
        layout: 'list',
        features: [
          {
            icon: Replace,
            title: 'After a Fault',
            description:
              'A unit that has failed and been replaced can need adapting to your car.',
          },
          {
            icon: CarFront,
            title: 'After Accident Repair',
            description:
              'Repair work can mean new modules, and new modules can bring component protection with them.',
          },
          {
            icon: Cpu,
            title: 'Upgraded Units',
            description:
              'Fitting an upgraded unit in place of the original can need the same adapting.',
          },
          {
            icon: TriangleAlert,
            title: 'A Warning on Your Screen',
            description:
              'A component protection message, or functions that stopped working after a unit was replaced. Tell us what you see and we will help.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Component Protection FAQs',
        items: [
          {
            question: 'What is component protection?',
            answer:
              'A security feature on many Volkswagen Group cars that ties some modules to the car they were first fitted in.',
          },
          {
            question: 'How do I know if my car has it?',
            answer:
              'A warning, or functions that stop working after a unit is replaced, can be a sign. Ask us with your details and we will say.',
          },
          {
            question: 'Can you do it on my car?',
            answer:
              'It depends on the model, the year and the unit. Call or WhatsApp with your details and we will confirm.',
          },
          {
            question: 'What do you need from me?',
            answer:
              'Your make, model and year, what was replaced and what the car is doing now.',
          },
          {
            question: 'How much does it cost?',
            answer:
              'Pricing depends on your vehicle and spec. Call or WhatsApp for a free, no-obligation quote.',
          },
        ],
      },
    ],
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
  // AI-generated (T6.8)
  {
    slug: 'spectre-immobiliser',
    title: 'Spectre Immobiliser',
    category: 'Auto Security',
    shortDescription:
      'Spectre immobiliser fitting, an extra layer of security on top of what your car came with.',
    icon: Lock,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'Another Layer of Security',
        body: [
          'An immobiliser stops a car being driven until it has been disarmed. Add one to the security your car already has and a thief has one more problem to solve before they can drive away.',
          'Spectre is one of the immobilisers we fit. Tell us about your car and we will say whether it suits.',
        ],
      },
      {
        type: 'feature',
        title: 'Why Add an Immobiliser',
        layout: 'grid',
        features: [
          {
            icon: Lock,
            title: 'A Second Line of Defence',
            description:
              'It works alongside the security your car already has, so there is more between your car and a thief.',
          },
          {
            icon: ShieldCheck,
            title: 'Chosen for Your Car',
            description:
              'We look at your vehicle before we fit anything, so what goes in suits the car.',
          },
          {
            icon: MessageCircle,
            title: 'More Than One Option',
            description:
              'We also fit Ghost Immobiliser II and Scorpion X Series. Ask us which suits you.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Spectre Immobiliser Questions',
        items: [
          {
            question: 'Will Spectre fit my car?',
            answer:
              'It depends on the make, the model and the year. Call or WhatsApp with your details and we will tell you.',
          },
          {
            question: 'Which immobiliser should I choose?',
            answer:
              'That depends on your car and how you use it. We fit Ghost Immobiliser II, Scorpion X Series and Spectre, and we will talk you through them.',
          },
          {
            question: 'What do you need from me?',
            answer:
              'Your make, model and year. When you book in, bring every key you have.',
          },
          {
            question: 'How much does it cost?',
            answer:
              'Pricing depends on your vehicle and spec. Call or WhatsApp for a free, no-obligation quote.',
          },
        ],
      },
    ],
  },

  // Auto Security — GPS Trackers
  // AI-generated (T6.8)
  {
    slug: 'scorpion-trackers',
    title: 'Scorpion Trackers',
    category: 'Auto Security',
    shortDescription:
      'Insurance-approved GPS tracking systems from Scorpion, fitted to your vehicle by Team Autotech.',
    icon: MapPin,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'GPS Tracking for Your Vehicle',
        body: [
          'A GPS tracker is a unit fitted to your vehicle that uses GPS to keep track of where it is.',
          'Scorpion trackers are the tracking systems we fit. Tell us about your vehicle and we will say which one suits.',
        ],
      },
      {
        type: 'feature',
        title: 'Reasons to Fit a Tracker',
        layout: 'list',
        features: [
          {
            icon: MapPin,
            title: 'Know Where It Is',
            description:
              'A tracker keeps track of where your vehicle is, so you are not left guessing.',
          },
          {
            icon: Wrench,
            title: 'Fitted and Checked',
            description:
              'We fit the tracker and check it with you before you leave.',
          },
          {
            icon: Truck,
            title: 'Running Several Vehicles?',
            description:
              'Take a look at our Fleet Trackers page, or ask us about your vehicles.',
          },
          {
            icon: MessageCircle,
            title: 'Unsure Which to Choose?',
            description:
              'Tell us about your vehicle and we will point you to what suits it.',
          },
        ],
      },
      {
        type: 'prose',
        title: 'Pair It With an Immobiliser',
        body: [
          'An immobiliser and a tracker do different jobs. Pairing them adds another layer of protection to your vehicle.',
          'We fit Ghost Immobiliser II, Scorpion X Series and Spectre, so ask us about a tracker and an immobiliser together.',
        ],
      },
      {
        type: 'faq',
        title: 'Scorpion Tracker FAQs',
        items: [
          {
            question: 'Can a tracker be fitted to my vehicle?',
            answer:
              'It depends on the vehicle. Call or WhatsApp with your details and we will confirm.',
          },
          {
            question: 'Can I have a tracker and an immobiliser?',
            answer:
              'Yes. They do different jobs, and pairing them adds another layer of protection.',
          },
          {
            question: 'What details do you need?',
            answer:
              'Your make, model and year, and whether you use it for work.',
          },
          {
            question: 'How much does it cost?',
            answer:
              'Pricing depends on your vehicle and spec. Call or WhatsApp for a free, no-obligation quote.',
          },
        ],
      },
    ],
  },
  // AI-generated (T6.8)
  {
    slug: 'fleet-trackers',
    title: 'Fleet Trackers',
    category: 'Auto Security',
    shortDescription:
      'GPS tracker fitting for business fleets, helping you keep track of where your vehicles are.',
    icon: Truck,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'Tracking for Your Business Vehicles',
        body: [
          'A fleet is any group of vehicles you run for work. A GPS tracker fitted to each one helps you keep track of where they are.',
          'We fit trackers to business vehicles. Tell us what you run and we will say what suits.',
          'Only have one vehicle to protect? See our Scorpion Trackers page.',
        ],
      },
      {
        type: 'steps',
        title: 'Getting Your Fleet Fitted',
        steps: [
          {
            title: 'Tell Us About Your Fleet',
            description:
              'Call or WhatsApp with how many vehicles you run, and their makes and models.',
          },
          {
            title: 'We Confirm What Suits',
            description:
              'We look at your vehicles and tell you what we can fit to each one.',
          },
          {
            title: 'Book the Vehicles In',
            description:
              'Choose times that suit your business and bring the vehicles to us.',
          },
          {
            title: 'Fitted and Checked',
            description:
              'We fit the trackers and check them with you before the vehicles go back to work.',
          },
        ],
      },
      {
        type: 'feature',
        title: 'When Fleet Tracking Helps',
        layout: 'list',
        features: [
          {
            icon: Truck,
            title: 'Several Vehicles on the Road',
            description:
              'The more vehicles you run, the harder it is to know where each one is. A tracker on each helps.',
          },
          {
            icon: PackagePlus,
            title: 'Adding to Your Fleet',
            description:
              'Bringing in another vehicle? Ask us about fitting a tracker to it.',
          },
          {
            icon: ShieldCheck,
            title: 'Extra Security',
            description:
              'Pair a tracker with an immobiliser for another layer of protection. We fit both.',
          },
          {
            icon: CarFront,
            title: 'Just One Vehicle?',
            description:
              'Take a look at our Scorpion Trackers page, or ask us about your vehicle.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Fleet Tracker FAQs',
        items: [
          {
            question: 'Can you fit trackers to all our vehicles?',
            answer:
              'It depends on the makes, models and years. Send us the details and we will confirm.',
          },
          {
            question: 'What details do you need?',
            answer:
              'How many vehicles you run, and the make, model and year of each.',
          },
          {
            question: 'Can you fit immobilisers too?',
            answer:
              'Yes. We fit Ghost Immobiliser II, Scorpion X Series and Spectre. Ask us which suits your vehicles.',
          },
          {
            question: 'How much does it cost?',
            answer:
              'Pricing depends on your vehicle and spec. Call or WhatsApp for a free, no-obligation quote.',
          },
        ],
      },
    ],
  },

  // Auto Electrical Services
  // AI-generated (T6.9)
  {
    slug: 'car-audio-installation',
    title: 'Car Audio Installation',
    category: 'Auto Electrical',
    shortDescription:
      'Car audio installation for a better sound in your car, with the system planned around it.',
    icon: Volume2,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'Better Sound for Your Car',
        body: [
          'Factory car audio is built to a standard, and plenty of drivers want more from it. An upgrade is a chance to get more out of the music you play on every drive.',
          'Every car is different, so we plan the system around yours. Tell us what you want from it and we will say what we can fit.',
        ],
      },
      {
        type: 'feature',
        title: 'What We Can Fit',
        layout: 'grid',
        features: [
          {
            icon: Speaker,
            title: 'Speakers',
            description:
              'Replace tired factory speakers with a set chosen to suit your car.',
          },
          {
            icon: Zap,
            title: 'Amplifiers',
            description:
              'Add an amplifier to drive your speakers, depending on your vehicle.',
          },
          {
            icon: Volume2,
            title: 'Subwoofers',
            description:
              'Add a subwoofer for the low end of your music, fitted to suit your boot space.',
          },
          {
            icon: Cable,
            title: 'Tidy Wiring',
            description:
              'Cables are routed neatly and secured, so the install is tidy as well as capable.',
          },
        ],
      },
      {
        type: 'steps',
        title: 'How It Works',
        steps: [
          {
            title: 'Tell Us What You Want',
            description:
              'Call or WhatsApp with your make, model and year, and what you want from your sound.',
          },
          {
            title: 'We Plan the System',
            description:
              'We look at your car and tell you what we can fit and what suits it.',
          },
          {
            title: 'Book Your Car In',
            description:
              'Choose a time that suits you and bring the car to us.',
          },
          {
            title: 'Fitted and Checked',
            description:
              'We fit the system and check it with you before you leave.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Car Audio FAQs',
        items: [
          {
            question: 'Can you upgrade my factory system?',
            answer:
              'It depends on the vehicle. Call or WhatsApp with your make, model and year and we will confirm.',
          },
          {
            question: 'Can I add a subwoofer or an amplifier on its own?',
            answer:
              'It depends on your vehicle. Tell us what you have in mind and we will say what is possible.',
          },
          {
            question: 'What details do you need?',
            answer:
              'Your make, model and year, and what you want from the system.',
          },
          {
            question: 'How much does it cost?',
            answer:
              'Pricing depends on your vehicle and spec. Call or WhatsApp for a free, no-obligation quote.',
          },
        ],
      },
    ],
  },
  // AI-generated (T6.9)
  {
    slug: 'dashcam-installation',
    title: 'Dashcam Installation',
    category: 'Auto Electrical',
    shortDescription:
      'Dashcam installation, with the camera placed where it suits you and the cable kept tidy.',
    icon: Camera,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'Dashcams Fitted Neatly',
        body: [
          'A dashcam records the road as you drive. Plenty of drivers fit one for a record of their journeys and for peace of mind.',
          'We fit dashcams to suit you and your car, front, rear or both, with the cable routed neatly out of the way.',
          'We supply and fit Road Angel dashcams too. See our Road Angel Dashcam page.',
        ],
      },
      {
        type: 'feature',
        title: 'Why Have It Fitted',
        layout: 'alternating',
        features: [
          {
            icon: Eye,
            title: 'Placed Where It Suits You',
            description:
              'We agree the position with you before we fit the camera.',
          },
          {
            icon: Cable,
            title: 'Cable Kept Tidy',
            description:
              'The cable is routed and tucked away, so nothing trails across the cabin.',
          },
          {
            icon: Wrench,
            title: 'Fitted and Checked',
            description:
              'We check the dashcam with you before you leave, so you know how it works.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Dashcam FAQs',
        items: [
          {
            question: 'Can you fit a front and a rear camera?',
            answer:
              'Yes. We can fit front, rear or both, depending on your car. Tell us what you have in mind.',
          },
          {
            question: 'How will the dashcam be powered?',
            answer:
              'We can fit it in the way that suits you and your car. Tell us what you would like and we will talk it through.',
          },
          {
            question: 'Do you fit Road Angel dashcams?',
            answer:
              'Yes. We supply and fit Road Angel dashcams. See our Road Angel Dashcam page.',
          },
          {
            question: 'What details do you need?',
            answer:
              'Your make, model and year, and whether you want a front camera, a rear camera or both.',
          },
          {
            question: 'How much does it cost?',
            answer:
              'Pricing depends on your vehicle and spec. Call or WhatsApp for a free, no-obligation quote.',
          },
        ],
      },
    ],
  },
  // AI-generated (T6.9)
  {
    slug: 'road-angel-dashcam',
    title: 'Road Angel Dashcam',
    category: 'Auto Electrical',
    shortDescription:
      'Road Angel dashcams supplied and fitted by Team Autotech, with the cable tidied away.',
    icon: Cctv,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'Road Angel Dashcams',
        body: [
          'A Road Angel dashcam records the road as you drive. We supply and fit them, so you get the camera and the fitting from one place.',
          'Not sure a Road Angel is right for you? Tell us how you drive and we will talk you through it. We fit other dashcams too, so see our Dashcam Installation page.',
        ],
      },
      {
        type: 'feature',
        title: 'Having a Road Angel Fitted',
        layout: 'list',
        features: [
          {
            icon: Cctv,
            title: 'Camera and Fitting Together',
            description:
              'We supply the dashcam and fit it, so there is one job to book.',
          },
          {
            icon: MessageCircle,
            title: 'Not Sure Which to Choose?',
            description:
              'Tell us about your car and how you drive, and we will point you to what suits.',
          },
          {
            icon: Cable,
            title: 'Fitted Neatly',
            description:
              'The cable is routed and tucked away, with the camera placed where you want it.',
          },
          {
            icon: Camera,
            title: 'Other Dashcams',
            description: 'Want a different make? We fit other dashcams too.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Road Angel Dashcam FAQs',
        items: [
          {
            question: 'Do you supply the dashcam as well as fit it?',
            answer: 'Yes. We supply Road Angel dashcams and fit them.',
          },
          {
            question: 'Which Road Angel should I choose?',
            answer:
              'Tell us about your car and how you drive, and we will recommend one.',
          },
          {
            question: 'Do you fit other dashcams?',
            answer:
              'Yes. See our Dashcam Installation page, or ask us about yours.',
          },
          {
            question: 'How much does it cost?',
            answer:
              'Pricing depends on your vehicle and spec. Call or WhatsApp for a free, no-obligation quote.',
          },
        ],
      },
    ],
  },
  // AI-generated (T6.9)
  {
    slug: 'parking-sensor-installation',
    title: 'Parking Sensor Installation',
    category: 'Auto Electrical',
    shortDescription:
      'Parking sensor fitting, so your car warns you as you get close to something while you park.',
    icon: Radar,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'Parking Sensors for Your Car',
        body: [
          'Parking sensors warn you as you get close to something, which helps in tight spaces. If your car did not come with them, we can add them.',
          'We fit sensors to the front, the rear or both, depending on your vehicle. Ask us about yours.',
        ],
      },
      {
        type: 'steps',
        title: 'Getting Sensors Fitted',
        steps: [
          {
            title: 'Tell Us About Your Car',
            description:
              'Call or WhatsApp with your make, model and year, and where you want the sensors.',
          },
          {
            title: 'We Agree Where They Go',
            description:
              'We confirm what we can fit to your car, front, rear or both.',
          },
          {
            title: 'Fitted to Your Car',
            description: 'Bring the car to us and we fit the sensors.',
          },
          {
            title: 'Checked With You',
            description:
              'We check the sensors with you before you leave, so you know how they warn you.',
          },
        ],
      },
      {
        type: 'feature',
        title: 'Why Fit Parking Sensors',
        layout: 'grid',
        features: [
          {
            icon: ParkingCircle,
            title: 'Easier in Tight Spaces',
            description:
              'A warning as you get close to something takes some of the guesswork out of parking.',
          },
          {
            icon: CarFront,
            title: 'Front, Rear or Both',
            description:
              'Choose where you want them, depending on your vehicle.',
          },
          {
            icon: Video,
            title: 'Pair Them With a Camera',
            description:
              'Add a reverse camera too. See our Reverse Camera Installation page.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Parking Sensor FAQs',
        items: [
          {
            question:
              'Can sensors be added to a car that did not come with them?',
            answer:
              'It depends on the vehicle. Call or WhatsApp with your details and we will confirm.',
          },
          {
            question: 'Can I have them at the front, the rear or both?',
            answer:
              'Any of them, depending on your vehicle. Tell us what you want and we will say what is possible.',
          },
          {
            question: 'Do you fit reverse cameras too?',
            answer:
              'Yes. See our Reverse Camera Installation page, or ask us about both together.',
          },
          {
            question: 'How much does it cost?',
            answer:
              'Pricing depends on your vehicle and spec. Call or WhatsApp for a free, no-obligation quote.',
          },
        ],
      },
    ],
  },
  // AI-generated (T6.9)
  {
    slug: 'reverse-camera-installation',
    title: 'Reverse Camera Installation',
    category: 'Auto Electrical',
    shortDescription:
      'Reverse camera fitting, so you can see what is behind your car as you reverse into a space.',
    icon: Video,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'See Behind You',
        body: [
          'A reverse camera shows the view behind your car on a screen as you reverse. It makes tight spaces and tricky manoeuvres easier to judge.',
          "Where the car supports it, we can show the picture on the car's own screen. Tell us your make, model and year and we will confirm.",
        ],
      },
      {
        type: 'steps',
        title: 'How It Works',
        steps: [
          {
            title: 'Tell Us About Your Car',
            description:
              'Call or WhatsApp with your make, model and year, and we will say what we can fit.',
          },
          {
            title: 'Fitted to Your Car',
            description: 'Bring the car to us and we fit the camera.',
          },
          {
            title: 'Checked With You',
            description:
              'We check the picture with you before you leave, so you know how it works.',
          },
        ],
      },
      {
        type: 'prose',
        title: 'Pair It With Parking Sensors',
        body: [
          'A camera shows you what is behind the car. Parking sensors warn you as you get close to something. They work well together, and we fit both.',
          'See our Parking Sensor Installation page, or ask us about both together.',
        ],
      },
      {
        type: 'faq',
        title: 'Reverse Camera FAQs',
        items: [
          {
            question: "Can it use my car's own screen?",
            answer:
              'Where the car supports it, yes. Call or WhatsApp with your make, model and year and we will confirm.',
          },
          {
            question: 'Do you fit parking sensors too?',
            answer:
              'Yes. See our Parking Sensor Installation page, or ask us about both together.',
          },
          {
            question: 'What details do you need?',
            answer:
              'Your make, model and year, and whether your car has a screen the camera could use.',
          },
          {
            question: 'How much does it cost?',
            answer:
              'Pricing depends on your vehicle and spec. Call or WhatsApp for a free, no-obligation quote.',
          },
        ],
      },
    ],
  },

  // Mechanical / Customisation
  {
    slug: 'vehicle-maintenance',
    title: 'Vehicle Maintenance',
    category: 'Mechanical / Customisation',
    shortDescription: 'Vehicle maintenance from Team Autotech.',
    icon: Wrench,
  },
  {
    slug: 'mot-preparation',
    title: 'MOT Preparation',
    category: 'Mechanical / Customisation',
    shortDescription: 'MOT preparation from Team Autotech.',
    icon: ClipboardCheck,
  },
  {
    slug: 'ct-carbon-official-installer',
    title: 'CT Carbon Official Installer',
    category: 'Mechanical / Customisation',
    shortDescription: 'CT Carbon official installer.',
    icon: Layers,
  },
  {
    slug: 'body-panel-repair-and-paint',
    title: 'Body Panel Repair and Paint',
    category: 'Mechanical / Customisation',
    shortDescription: 'Body panel repair and paint from Team Autotech.',
    icon: SprayCan,
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
