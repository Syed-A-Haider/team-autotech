import PageHero from '@/components/ui/PageHero';
import SectionWrapper from '@/components/ui/SectionWrapper';
import LinkButton from '@/components/ui/LinkButton';

export default function Home() {
  return (
    <>
      <PageHero
        title="Team Autotech"
        subtitle="T1.2 verification — PageHero + SectionWrapper"
      />

      <SectionWrapper className="flex flex-col items-center gap-4 py-12 text-center">
        <p className="text-foreground">
          This text sits inside{' '}
          <span className="text-accent">SectionWrapper</span>, lined up under
          the hero title above.
        </p>
        <LinkButton href="/" variant="primary">
          LinkButton check
        </LinkButton>
      </SectionWrapper>
    </>
  );
}
