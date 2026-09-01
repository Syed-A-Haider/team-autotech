import HeroSection from '@/components/home-sections/HeroSection';
import ServicesGrid from '@/components/home-sections/ServicesGrid';
import WhyChooseUsSection from '@/components/home-sections/WhyChooseUsSection';
import LinkButton from '@/components/ui/LinkButton';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { getFeaturedServices } from '@/lib/services';

export default function Home() {
  const featuredServices = getFeaturedServices();

  return (
    <>
      <HeroSection />

      {/* T2.3 Verification - full section order assembled at T2.8 */}
      <ServicesGrid services={featuredServices} />

      {/* T1.1 Verification - remove once no longer needed */}
      <SectionWrapper className="flex justify-center py-12">
        <LinkButton href="/">Hello</LinkButton>
      </SectionWrapper>
      <WhyChooseUsSection />
    </>
  );
}
