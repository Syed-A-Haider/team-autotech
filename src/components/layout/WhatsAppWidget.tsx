import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_LINK } from '@/lib/constants';

// Exported so tests can find the widget without retyping the label
export const WHATSAPP_WIDGET_LABEL = 'Chat with us on WhatsApp';

// press = shrink on tap (and owns the transition), pulse-ring = a ring pulses
// twice after load. Both in motion.css. A press beats the hover grow below
const widgetClasses =
  'press pulse-ring bg-whatsapp hover:bg-whatsapp-hover fixed right-6 bottom-6 z-40 flex h-13 w-13 items-center justify-center rounded-full text-white shadow-lg motion-safe:hover:scale-110 sm:h-16 sm:w-16';

// Floating site-wide WhatsApp shortcut. Rendered once from root layout, so the
// pulse plays once per full page load and not on every client-side navigation.
export function WhatsAppWidget() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={WHATSAPP_WIDGET_LABEL}
      className={widgetClasses}
    >
      <FaWhatsapp aria-hidden="true" className="h-8 w-8 sm:h-9 sm:w-9" />
    </a>
  );
}
