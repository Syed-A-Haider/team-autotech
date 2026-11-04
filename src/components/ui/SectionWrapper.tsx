import clsx from 'clsx';
import type { ReactNode } from 'react';

// Define set structure and types for props
interface SectionWrapperProps {
  children: ReactNode;
  as?: 'section' | 'div';
  id?: string;
  className?: string;
}

export function SectionWrapper({
  children,
  // Capitalised so JSX treats it as a variable, not an HTML tag
  as: Component = 'section',
  id,
  className,
}: SectionWrapperProps) {
  return (
    <Component
      id={id}
      className={clsx('mx-auto max-w-6xl px-4 sm:px-6 lg:px-8', className)}
    >
      {children}
    </Component>
  );
}
