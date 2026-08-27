import clsx from 'clsx';
import SectionWrapper from './SectionWrapper';

type PageHeroSize = 'default' | 'compact';

const heroSizeStyles: Record<PageHeroSize, { wrapper: string; title: string }> =
  {
    default: { wrapper: 'py-12 sm:py-14', title: 'text-3xl sm:text-4xl' },
    compact: { wrapper: 'py-8 sm:py-10', title: 'text-2xl sm:test-3xl' },
  };

interface PageHeroProps {
  title: string;
  subtitle?: string;
  size?: PageHeroSize;
  className?: string;
}

export default function PageHero({
  title,
  subtitle,
  size = 'default',
  className,
}: PageHeroProps) {
  return (
    <div
      className={clsx('bg-surface', heroSizeStyles[size].wrapper, className)}
    >
      <SectionWrapper className="flex flex-col items-center gap-3 text-center">
        <h1
          className={clsx(
            'text-foreground text-3xl font-semibold tracking-tight sm:text-4xl',
            heroSizeStyles[size].title,
          )}
        >
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
