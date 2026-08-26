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
      className="bg-whatsapp hover:bg-whatsapp-hover fixed right-6 bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
    >
      <FaWhatsapp aria-hidden="true" size={28} />
    </a>
  );
}
