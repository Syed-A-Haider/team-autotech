import { AboutSnippet } from '@/components/home-sections/AboutSnippet';
import { FindUsSection } from '@/components/home-sections/FindUsSection';
import { HeroSection } from '@/components/home-sections/HeroSection';
import { ReviewsSection } from '@/components/home-sections/ReviewsSection';
import { ServicesGrid } from '@/components/home-sections/ServicesGrid';
import { WhyChooseUsSection } from '@/components/home-sections/WhyChooseUsSection';
import { PageTransition } from '@/components/ui/PageTransition';
import { getFeaturedServices } from '@/lib/services';

export default function Home() {
  const featuredServices = getFeaturedServices();

  return (
    <PageTransition>
      <HeroSection />
      {/* One shared divider between sections. No width limit here, so WhyChooseUsSection stays full-bleed. */}
      <div className="divide-border divide-y">
        <ServicesGrid services={featuredServices} />
        <WhyChooseUsSection />
        <ReviewsSection />
        <FindUsSection />
        <AboutSnippet />
      </div>
    </PageTransition>
  );
}
