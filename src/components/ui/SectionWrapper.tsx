import clsx from 'clsx';
import type { ReactNode } from 'react';

// Define set structure and types for props
interface SectionWrapperProps {
  children: ReactNode;
  as?: 'section' | 'div';
  className?: string;
}

export default function SectionWrapper({
  children,
  //   Polymorphic component - don't need if/else. Capitalised so treated as variable reference, not literal HTML
  as: Component = 'section',
  className,
}: SectionWrapperProps) {
  return (
    <Component
      className={clsx('mx-auto max-w-6xl px-4 sm:px-6 lg:px-8', className)}
    >
      {children}
    </Component>
  );
}
