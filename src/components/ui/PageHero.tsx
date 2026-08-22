import clsx from 'clsx';
import SectionWrapper from './SectionWrapper';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function PageHero({
  title,
  subtitle,
  className,
}: PageHeroProps) {
  return (
    <div className={clsx('bg-surface py-16 sm:py-20', className)}>
      <SectionWrapper className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>

        {/* If there is a subtitle given, render a <p> showing it */}
        {subtitle && (
          <p className="text-muted max-w-2xl text-base sm:text-lg">
            {subtitle}
          </p>
        )}
      </SectionWrapper>
    </div>
  );
}
