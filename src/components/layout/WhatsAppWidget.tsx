import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_LINK } from '@/lib/constants';

// Floating site-wide WhatsApp shortcut. Rendered once from root layout.
export default function WhatsAppWidget() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="bg-whatsapp hover:bg-whatsapp-hover fixed right-6 bottom-6 z-40 flex h-13 w-13 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110 sm:h-16 sm:w-16"
    >
      <FaWhatsapp aria-hidden="true" className="h-8 w-8 sm:h-9 sm:w-9" />
    </a>
  );
}
