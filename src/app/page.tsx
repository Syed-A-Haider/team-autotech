import PageHero from '@/components/ui/PageHero';
import SectionWrapper from '@/components/ui/SectionWrapper';
import LinkButton from '@/components/ui/LinkButton';
import ServiceCard from '@/components/ui/ServiceCard';
import { Wrench, ShieldCheck, Cpu } from 'lucide-react';
import type { Service } from '@/types/service';
import HeroSection from '@/components/home-sections/HeroSection';

// Temporary mock data for visual verification — remove once
// lib/services.ts has real icon/featured values (T2.2 uses getAllServices() instead)
const mockServices: Service[] = [
  {
    slug: 'stage-1-tuning',
    title: 'Stage 1 Tuning',
    category: 'Remap / Tuning',
    shortDescription: 'Unlock more power and torque from your engine.',
    body: '',
    icon: Wrench,
    featured: true,
  },
  {
    slug: 'ghost-immobiliser-ii',
    title: 'Ghost Immobiliser II',
    category: 'Auto Security',
    shortDescription:
      'CAN-bus immobiliser with no visible LED, no arming beep.',
    body: '',
    icon: ShieldCheck,
    featured: true,
  },
  {
    slug: 'bmw-programming',
    title: 'BMW Programming',
    category: 'Programming',
    shortDescription: 'Key programming and module coding for BMW vehicles.',
    body: '',
    icon: Cpu,
  },
];

export default function Home() {
  return (
    <>
      {/* T2.2 Verification - replaces PageHero permanently at T2.8 */}
      <HeroSection />
      {/* <PageHero
        title="Team Autotech"
        subtitle="T1.3 verification — ServiceCard"
      /> */}
      <SectionWrapper className="flex flex-col items-center gap-8 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {mockServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <LinkButton href="/" variant="primary">
          LinkButton check
        </LinkButton>
      </SectionWrapper>
    </>
  );
}
