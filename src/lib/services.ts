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
  // AI-generated (T6.12)
  {
    slug: 'dpf-egr-solutions',
    title: 'DPF / EGR Solutions',
    category: 'Remap / Tuning',
    shortDescription:
      'DPF and EGR diagnosis, cleaning and regeneration, plus sensor and fault repair at our workshop.',
    icon: Filter,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'Warning Lights, Lost Power and Limp Mode',
        body: [
          'A diesel particulate filter (DPF) traps soot from the exhaust. An exhaust gas recirculation (EGR) valve feeds some exhaust gas back into the engine. Both can clog or fault over time, and when they do, your car tells you.',
          'You might see a warning light, notice a loss of power or find the car drops into limp mode. Regular short journeys, a faulty sensor or a sticking valve are common causes, and each needs a different fix.',
          'We find out what is going on before we touch anything. Call or WhatsApp with your make, model and year and a description of the symptoms, and we will tell you how we can help.',
        ],
      },
      {
        type: 'feature',
        title: 'What We Can Help With',
        layout: 'grid',
        features: [
          {
            icon: TriangleAlert,
            title: 'Warning Light Diagnosis',
            description:
              'We read the fault codes and test the system to find what is behind the light, depending on your vehicle.',
          },
          {
            icon: Zap,
            title: 'Regeneration',
            description:
              'Where a filter is clogged with soot, a regeneration can help, depending on your vehicle and its condition.',
          },
          {
            icon: Filter,
            title: 'Cleaning',
            description:
              'Where cleaning is the answer, we can clean the DPF or EGR parts, depending on your vehicle.',
          },
          {
            icon: CircuitBoard,
            title: 'Sensor and Valve Faults',
            description:
              'A faulty sensor or valve can cause the same symptoms as a clogged filter. We trace the fault and repair or replace what needs it.',
          },
        ],
      },
      {
        type: 'steps',
        title: 'How a DPF or EGR Job Runs',
        steps: [
          {
            title: 'Tell Us What Is Happening',
            description:
              'Call or WhatsApp with your make, model and year, and what the car is doing.',
          },
          {
            title: 'We Confirm How We Can Help',
            description:
              'We tell you what we can do for your vehicle before you book.',
          },
          {
            title: 'Book Your Vehicle In',
            description:
              'Pick a time that suits you and bring the vehicle to our workshop.',
          },
          {
            title: 'Diagnosed, Fixed and Checked',
            description:
              'We find the cause, carry out the work and go through it with you before you leave.',
          },
        ],
      },
      {
        type: 'prose',
        title: 'Good to Know',
        body: [
          'Short, slow journeys give a DPF little chance to clear itself, so a longer run at a steady speed now and then can help. If a warning light comes on, have it looked at sooner rather than later, as a small fault can turn into a bigger one.',
        ],
      },
      {
        type: 'faq',
        title: 'DPF and EGR Questions',
        items: [
          {
            question: 'My warning light is on. What should I do?',
            answer:
              'Call or WhatsApp with your make, model and year and what the car is doing. We will tell you how we can help and book you in for diagnosis.',
          },
          {
            question: 'Can you clean a clogged DPF?',
            answer:
              'Depending on your vehicle and the fault, cleaning or a regeneration can be the answer. We diagnose first, so we only do what your vehicle needs.',
          },
          {
            question: 'Could it be a sensor and not the filter?',
            answer:
              'Yes. A faulty sensor or valve can cause similar symptoms, which is why we find the cause before we fix anything.',
          },
          {
            question: 'Do I need to bring my vehicle in?',
            answer:
              'Yes. We carry out the work at our workshop, so you book your vehicle in with us.',
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
  // AI-generated (T6.12)
  {
    slug: 'adblue-solutions',
    title: 'AdBlue Solutions',
    category: 'Remap / Tuning',
    shortDescription:
      'AdBlue warning lights and system faults diagnosed and repaired by our team at the workshop.',
    icon: Droplet,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'When Your AdBlue System Plays Up',
        body: [
          'Many modern diesel vehicles use AdBlue, a fluid added to the exhaust to cut emissions. The system has a tank, a pump and sensors, and a fault in any of them can bring up a warning on the dash.',
          'On some vehicles the warning counts down, and the engine may not restart if it is ignored. If you see an AdBlue message, do not leave it. Call or WhatsApp and we will tell you what we can do.',
        ],
      },
      {
        type: 'feature',
        title: 'How We Help',
        layout: 'alternating',
        features: [
          {
            icon: Eye,
            title: 'Warning Messages Read',
            description:
              'We read what the system is reporting, so we know where to start.',
          },
          {
            icon: Wrench,
            title: 'Faults Traced',
            description:
              'We test the system to trace the fault, from the sensors to the pump, depending on your vehicle.',
          },
          {
            icon: Replace,
            title: 'Repaired and Checked',
            description:
              'We repair or replace the faulty part where needed, then check the system once the work is done.',
          },
        ],
      },
      {
        type: 'prose',
        title: 'Looking After Your AdBlue System',
        body: [
          'Top up when your vehicle asks you to, and use the correct fluid for your vehicle. Do not wait until the tank is empty.',
          'If the warning comes back after a top up, or the system reports a fault, get in touch. We will look at it with you.',
        ],
      },
      {
        type: 'faq',
        title: 'AdBlue Questions',
        items: [
          {
            question: 'What does the AdBlue warning mean?',
            answer:
              'It can mean the level is low or that the system has a fault. Call or WhatsApp with your make, model and year and what the message says, and we will tell you what we can do.',
          },
          {
            question: 'Can you find out why it is showing?',
            answer:
              'Yes. We read the system and test it to trace the cause, then repair what is at fault.',
          },
          {
            question: 'Do I need to bring my vehicle in?',
            answer:
              'Yes. We carry out the work at our workshop, so you book your vehicle in with us.',
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
  // AI-generated (T6.12)
  {
    slug: 'engine-management-error-code-delete',
    title: 'Engine Management Error Code Delete',
    category: 'Remap / Tuning',
    shortDescription:
      'Engine management lights diagnosed, faults traced and repaired, and codes cleared once fixed.',
    icon: Eraser,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'Engine Management Light On?',
        body: [
          "The engine management light comes on when the car's computer stores a fault code. It can point at anything from a sensor to a wiring problem, and the code only tells you where to start looking.",
          'We find the cause, fix it and then clear the code. Call or WhatsApp with your make, model and year and what the car is doing, and we will tell you how we can help.',
        ],
      },
      {
        type: 'feature',
        title: 'What We Look At',
        layout: 'list',
        features: [
          {
            icon: CircuitBoard,
            title: 'Fault Codes',
            description:
              'We read the stored codes to see what the car is reporting, depending on your vehicle.',
          },
          {
            icon: Cable,
            title: 'Sensors and Wiring',
            description:
              'A faulty sensor or a wiring problem is a common cause, so we test them before we replace anything.',
          },
          {
            icon: Cpu,
            title: 'Software Fault-Finding',
            description:
              'Some faults sit in the software, so we look there too, depending on your vehicle.',
          },
          {
            icon: MessageCircle,
            title: 'Not Sure?',
            description:
              'Tell us what the car is doing and we will say what we can do for yours.',
          },
        ],
      },
      {
        type: 'prose',
        title: 'Clearing a Code Is Not a Fix',
        body: [
          'A code can be cleared, but if the fault is still there the light will come back. That is why we find and repair the cause first. Once the repair is done, we clear the stored codes and check the car again.',
        ],
      },
      {
        type: 'steps',
        title: 'From Warning Light to Fixed',
        steps: [
          {
            title: 'Tell Us What Is Happening',
            description:
              'Call or WhatsApp with your make, model and year, and what the car is doing.',
          },
          {
            title: 'We Confirm How We Can Help',
            description:
              'We tell you what we can do for your vehicle before you book.',
          },
          {
            title: 'Diagnosed and Repaired',
            description:
              'Bring the vehicle to our workshop. We trace the fault and carry out the repair.',
          },
          {
            title: 'Codes Cleared and Checked',
            description:
              'We clear the stored codes once the fault is repaired and check the car before you leave.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Engine Management Questions',
        items: [
          {
            question: 'Why is my engine management light on?',
            answer:
              'The car has stored a fault code. It can be a sensor, wiring or a software fault, so we diagnose it to find out which.',
          },
          {
            question: 'Can you just clear the code?',
            answer:
              'We find and repair the cause first, then clear the stored codes. Clearing a code alone will not stop the light coming back if the fault is still there.',
          },
          {
            question: 'Do you do software fault-finding?',
            answer:
              'Yes, where the fault is in the software, depending on your vehicle. Ask us about yours.',
          },
          {
            question: 'Do I need to bring my vehicle in?',
            answer:
              'Yes. We carry out the work at our workshop, so you book your vehicle in with us.',
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
  // AI-generated (T6.11)
  {
    slug: 'tuning-freaks-bootmod',
    title: 'Tuning Freaks Bootmod',
    category: 'Remap / Tuning',
    shortDescription:
      'Tuning Freaks Bootmod engine tuning, set up by our team at the workshop to suit your car.',
    icon: Cpu,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'What Is Bootmod?',
        body: [
          "Bootmod is engine tuning from Tuning Freaks. It changes how your engine is controlled through the car's software, so there is no need for major mechanical work.",
          'Drivers choose it for a more engaging drive, with sharper response and a car that feels more alive. What you get depends on your car and how it is set up, so we talk it through with you first.',
          'We set it up here at the workshop. Call or WhatsApp with your make, model and year and we will tell you what is possible on your car.',
        ],
      },
      {
        type: 'feature',
        title: 'Why Drivers Choose Bootmod',
        layout: 'alternating',
        features: [
          {
            icon: SlidersHorizontal,
            title: 'Looked at for Your Car',
            description:
              'We look at your car and what you want from it before we set anything up.',
          },
          {
            icon: Cpu,
            title: 'Done Through Software',
            description:
              "The changes are made through the car's software, so there is no major mechanical work.",
          },
          {
            icon: Cog,
            title: 'Can Go With a Gearbox Map',
            description:
              'If your car has an automatic gearbox, a gearbox map can go with it, depending on your car. See our XHP Gearbox Map page.',
          },
        ],
      },
      {
        type: 'steps',
        title: 'How a Bootmod Job Runs',
        steps: [
          {
            title: 'Tell Us About Your Car',
            description:
              'Call or WhatsApp with your make, model and year, and what you want from the car.',
          },
          {
            title: 'We Confirm What Is Possible',
            description:
              'We tell you whether Bootmod suits your car before you book.',
          },
          {
            title: 'Book Your Car In',
            description:
              'Pick a time that suits you and bring the car to our workshop.',
          },
          {
            title: 'Set Up and Checked',
            description:
              'We carry out the work and go through it with you before you leave.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Bootmod Questions',
        items: [
          {
            question: 'Will Bootmod work on my car?',
            answer:
              'It depends on your make, model and year. Call or WhatsApp with your details and we will tell you.',
          },
          {
            question: 'Do I need to bring my car in?',
            answer:
              'Yes. We carry out the work at our workshop, so you book your car in with us.',
          },
          {
            question: 'Can I have a gearbox map as well?',
            answer:
              'Depending on your car, yes. See our XHP Gearbox Map page, or ask us about yours.',
          },
          {
            question: 'Should I tell my insurer?',
            answer:
              'We advise you to tell your insurer about any modification to your car.',
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
  // AI-generated (T6.11)
  {
    slug: 'xhp-gearbox-map',
    title: 'XHP Gearbox Map',
    category: 'Remap / Tuning',
    shortDescription:
      'XHP gearbox map for automatic gearboxes, set up by our team at the workshop to suit your car.',
    icon: Cog,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'What Is an XHP Gearbox Map?',
        body: [
          'An automatic gearbox is run by software, and that software decides when and how it changes gear. An XHP gearbox map changes it, so the gearbox behaves differently when you drive.',
          'Which cars and gearboxes it suits depends on your vehicle, so ask us about yours. We set it up here at the workshop.',
        ],
      },
      {
        type: 'steps',
        title: 'Getting Your Gearbox Mapped',
        steps: [
          {
            title: 'Tell Us About Your Car',
            description:
              'Call or WhatsApp with your make, model and year, and what you want from the gearbox.',
          },
          {
            title: 'We Confirm and Book You In',
            description:
              'We tell you whether it suits your car, then agree a time that suits you.',
          },
          {
            title: 'Mapped and Checked',
            description:
              'We carry out the work at our workshop and go through it with you before you leave.',
          },
        ],
      },
      {
        type: 'feature',
        title: 'What a Gearbox Map Can Change',
        layout: 'list',
        features: [
          {
            icon: Cog,
            title: 'How It Changes Gear',
            description:
              'The way the gearbox picks and changes gear can be adjusted, depending on your car.',
          },
          {
            icon: Gauge,
            title: 'Response to Your Driving',
            description:
              'How the gearbox responds can be set up around the way you drive, depending on your car.',
          },
          {
            icon: SlidersHorizontal,
            title: 'Set Up to Suit You',
            description:
              'We talk through how you drive and what you want before we set anything up.',
          },
          {
            icon: MessageCircle,
            title: 'Not Sure?',
            description:
              'Tell us what you are after and we will say what is possible on your car.',
          },
        ],
      },
      {
        type: 'prose',
        title: 'Good to Know',
        body: [
          'A gearbox map is often paired with an engine tune. If you are thinking about both, see our Tuning Freaks Bootmod page, or ask us what suits your car.',
          'We advise you to tell your insurer about any modification to your car.',
        ],
      },
      {
        type: 'faq',
        title: 'XHP Gearbox Map FAQs',
        items: [
          {
            question: 'Will it work on my car?',
            answer:
              'It depends on your car and its gearbox. Call or WhatsApp with your make, model and year and we will tell you.',
          },
          {
            question: 'Can I have it with an engine tune?',
            answer:
              'Often, yes, depending on your car. See our Tuning Freaks Bootmod page, or ask us about yours.',
          },
          {
            question: 'What do you need from me?',
            answer:
              'Your make, model and year, and what you want from the gearbox. Then we book your car in at the workshop.',
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
  // AI-generated (T6.10)
  {
    slug: 'vehicle-maintenance',
    title: 'Vehicle Maintenance',
    category: 'Mechanical / Customisation',
    shortDescription:
      'Servicing, routine maintenance and repairs at our workshop, to keep your car on the road.',
    icon: Wrench,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'Looking After Your Car',
        body: [
          'A car that is looked after is easier to live with. Regular maintenance helps you spot small problems before they turn into big ones.',
          'We look after cars at our workshop, from routine servicing to repairs. Tell us about yours and we will talk you through what it needs.',
        ],
      },
      {
        type: 'feature',
        title: 'What We Can Look After',
        layout: 'grid',
        features: [
          {
            icon: Wrench,
            title: 'Servicing',
            description:
              'Routine servicing to keep your car running as it should.',
          },
          {
            icon: Droplet,
            title: 'Oil and Filters',
            description:
              'Oil and filter changes, depending on what your vehicle needs.',
          },
          {
            icon: Cog,
            title: 'Brakes',
            description:
              'Brake checks and repairs, so the car stops the way you expect.',
          },
          {
            icon: CircuitBoard,
            title: 'Fault Finding',
            description:
              'Warning light on? We can look into it and tell you what we find.',
          },
        ],
      },
      {
        type: 'prose',
        title: 'Getting Your Car Looked At',
        body: [
          'Call or WhatsApp with your make, model and year, and tell us what you would like looked at. If something feels wrong, describe it as best you can.',
          'We tell you what we find and agree any work with you before we start.',
        ],
      },
      {
        type: 'faq',
        title: 'Vehicle Maintenance FAQs',
        items: [
          {
            question: 'What does vehicle maintenance include?',
            answer:
              'It can include servicing, oil and filter changes, brakes and fault finding, depending on your vehicle. Ask us about yours.',
          },
          {
            question: 'Can you get my car ready for its MOT?',
            answer:
              'Yes. See our MOT Preparation page, or ask us about it when you get in touch.',
          },
          {
            question: 'What details do you need?',
            answer:
              'Your make, model and year, and what you would like us to look at.',
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
  // AI-generated (T6.10)
  {
    slug: 'mot-preparation',
    title: 'MOT Preparation',
    category: 'Mechanical / Customisation',
    shortDescription:
      'Pre-MOT checks and repairs at our workshop, so your car is ready before it goes for its test.',
    icon: ClipboardCheck,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'Get Ready for Your MOT',
        body: [
          'An MOT can bring up problems you did not know about. Getting the car checked beforehand gives you the chance to put them right first.',
          'We are not an MOT test centre. We get your car ready, and you book the test with a test centre of your choice.',
        ],
      },
      {
        type: 'steps',
        title: 'How It Works',
        steps: [
          {
            title: 'Tell Us When It Is Due',
            description:
              'Call or WhatsApp with your make, model and year, and when your MOT is due.',
          },
          {
            title: 'Bring the Car In',
            description: 'Bring the car to our workshop.',
          },
          {
            title: 'We Check It Over and Agree the Work',
            description:
              'We look the car over and tell you what we find. We agree any work with you before we start.',
          },
          {
            title: 'Ready for Your Test',
            description:
              'Once the work is done, the car is ready for you to take to your test centre.',
          },
        ],
      },
      {
        type: 'feature',
        title: 'Why Prepare Before the Test',
        layout: 'alternating',
        features: [
          {
            icon: ClipboardCheck,
            title: 'Checked Before Your Test',
            description:
              'We check the car over, so problems come to light before the test.',
          },
          {
            icon: MessageCircle,
            title: 'Work Agreed First',
            description:
              'We tell you what we find and agree the work with you before we start.',
          },
          {
            icon: TriangleAlert,
            title: 'Your Last Advisories Looked At',
            description:
              'Got advisories from your last MOT? We can look at those too.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'MOT Preparation FAQs',
        items: [
          {
            question: 'Do you carry out the MOT test?',
            answer:
              'No. We are not an MOT test centre. We get your car ready, then you book the test with a test centre of your choice.',
          },
          {
            question: 'Will my car pass its test?',
            answer:
              'We cannot promise a result, because the test centre carries out the test. We check the car over and put right what we find beforehand.',
          },
          {
            question: 'Can you look at the advisories from my last MOT?',
            answer:
              'Yes. Bring the paperwork or tell us what they were, and we will take a look.',
          },
          {
            question: 'What details do you need?',
            answer: 'Your make, model and year, and when your MOT is due.',
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
  // AI-generated (T6.10)
  {
    slug: 'ct-carbon-official-installer',
    title: 'CT Carbon Official Installer',
    category: 'Mechanical / Customisation',
    shortDescription:
      'As a CT Carbon official installer, we fit CT Carbon parts to your car at our workshop.',
    icon: Layers,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'CT Carbon Parts, Fitted',
        body: [
          'CT Carbon makes carbon fibre parts for cars. Plenty of drivers add them to change the look of their car.',
          'We fit CT Carbon parts at our workshop, so the fitting is done by people who work on cars every day.',
          'Tell us about your car and the parts you have in mind, and we will talk it through.',
        ],
      },
      {
        type: 'steps',
        title: 'How It Works',
        steps: [
          {
            title: 'Tell Us About Your Car and the Parts',
            description:
              'Call or WhatsApp with your make, model and year, and the parts you want fitted.',
          },
          {
            title: 'Bring the Car In',
            description: 'Bring the car to our workshop.',
          },
          {
            title: 'Fitted and Checked With You',
            description:
              'We fit the parts and go through the finished job with you before you leave.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'CT Carbon FAQs',
        items: [
          {
            question: 'Which parts can you fit?',
            answer:
              'It depends on your vehicle. Call or WhatsApp with your details and we will confirm.',
          },
          {
            question: 'What details do you need?',
            answer:
              'Your make, model and year, and the parts you would like fitted.',
          },
          {
            question: 'Can you fit anything else at the same time?',
            answer:
              'Ask us. For bodywork, see our Body Panel Repair and Paint page.',
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
  // AI-generated (T6.10)
  {
    slug: 'body-panel-repair-and-paint',
    title: 'Body Panel Repair and Paint',
    category: 'Mechanical / Customisation',
    shortDescription:
      'Body panel repair and paint for dents, scratches and scuffs, depending on the damage.',
    icon: SprayCan,
    status: 'live',
    sections: [
      {
        type: 'prose',
        title: 'Damage Put Right',
        body: [
          'A dent, a scratch or a scuffed panel can spoil the look of a car. We repair body panels and paint them, so the repair is finished properly.',
          'What can be done depends on the damage. Send us photos or bring the car in, and we will tell you what we can do.',
        ],
      },
      {
        type: 'feature',
        title: 'What We Can Repair',
        layout: 'list',
        features: [
          {
            icon: Wrench,
            title: 'Dents',
            description: 'Dents in body panels, depending on the damage.',
          },
          {
            icon: SprayCan,
            title: 'Scratches and Scuffs',
            description:
              'Scratches and scuffs on the paintwork, put right and painted.',
          },
          {
            icon: CarFront,
            title: 'Damaged Panels',
            description:
              'Damaged body panels, repaired where the damage allows.',
          },
          {
            icon: Layers,
            title: 'Painted to Finish the Repair',
            description:
              'Once the panel is repaired, we paint it to finish the job.',
          },
        ],
      },
      {
        type: 'steps',
        title: 'How It Works',
        steps: [
          {
            title: 'Send Us Photos',
            description:
              'Message us on WhatsApp with photos of the damage, and your make, model and year.',
          },
          {
            title: 'We Take a Look',
            description:
              'We tell you what we can do. We may need to see the car in person.',
          },
          {
            title: 'Repaired and Painted',
            description:
              'Bring the car to our workshop and we repair and paint the panel.',
          },
          {
            title: 'Checked With You',
            description:
              'We go through the finished repair with you before you leave.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Body Panel Repair FAQs',
        items: [
          {
            question: 'What damage can you repair?',
            answer:
              'Dents, scratches, scuffs and damaged panels, depending on the damage. Send us photos and we will say what is possible.',
          },
          {
            question: 'Can I send photos first?',
            answer:
              'Yes. Photos on WhatsApp help, though we may still need to see the car.',
          },
          {
            question: 'Do I need to bring the car in?',
            answer:
              'For the repair, yes. Bring the car to our workshop once we have agreed the work.',
          },
          {
            question: 'What details do you need?',
            answer:
              'Your make, model and year, and photos of the damage if you can.',
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
