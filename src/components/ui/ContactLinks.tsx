import clsx from 'clsx';
import { Phone, MessageCircle, type LucideIcon } from 'lucide-react';
import { LinkButton, type ButtonVariant } from './LinkButton';
import { PHONE_MOBILE, TEL_MOBILE_LINK, WHATSAPP_LINK } from '@/lib/constants';

export const CALL_LABEL = 'Call us';
export const WHATSAPP_LABEL = 'WhatsApp';

interface ContactLinksProps {
  className?: string;
}

interface ContactChannel {
  label: string;
  detail?: string; // Shown after the label on wider screens
  href: string;
  Icon: LucideIcon;
  variant: ButtonVariant;
  external?: boolean;
}

// The number is text for desktop visitors (no dialler). Phones can just tap
const CALL_NUMBER_STYLES = 'hidden sm:inline';

// Priority order. Call is the one primary action. Email is left out on purpose
const CHANNELS: ContactChannel[] = [
  {
    label: CALL_LABEL,
    detail: PHONE_MOBILE,
    href: TEL_MOBILE_LINK,
    Icon: Phone,
    variant: 'primary',
  },
  {
    label: WHATSAPP_LABEL,
    href: WHATSAPP_LINK,
    Icon: MessageCircle,
    variant: 'secondary',
    external: true,
  },
];

// Call and WhatsApp buttons. Wraps by default, consumers set direction via className
export function ContactLinks({ className }: ContactLinksProps) {
  return (
    <div className={clsx('flex flex-wrap gap-3', className)}>
      {CHANNELS.map(({ label, detail, href, Icon, variant, external }) => (
        <LinkButton
          key={href}
          href={href}
          variant={variant}
          size="lg"
          external={external}
        >
          <Icon aria-hidden="true" className="h-5 w-5" />
          <span>
            {label}
            {detail && <span className={CALL_NUMBER_STYLES}>: {detail}</span>}
          </span>
        </LinkButton>
      ))}
    </div>
  );
}
