import Link from 'next/link';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean; // Opens in new tab - like WhatsApp
  fullWidth?: boolean;
  className?: string;
}

// Map variant to it's CSS styles, O(1) lookup
export const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-foreground hover:bg-accent-hover',
  secondary:
    'border border-border text-foreground hover:border-accent hover:text-accent',
  ghost: 'text-foreground hover:text-accent',
};

// Map sizes to set CSS styles
export const buttonSizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
};

// Defines a button which will be a navigation link to other pages
export default function LinkButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  external = false,
  fullWidth = false,
  className,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      // rel prevents new tab from accessing window.opener (security best practice)
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}

      // Add styles based on their set values in dictionaries.
      className={clsx(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:ring-accent focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        buttonVariantStyles[variant],
        buttonSizeStyles[size],
        fullWidth && 'w-full',
        className,
      )}
    >
      {children}
    </Link>
  );
}
