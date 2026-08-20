// siteConfig - single source of truth for site name/description, saves retyping.
// as const: Treat as read-only, preserve exact values --> immutable + strongly typed configuration
export const siteConfig = {
  name: 'Team Autotech',
  description:
    'Vehicle remapping, ECU tuning, security immobilisers, GPS trackers and auto electrical installations in Nelson, Lancashire.',
  url: 'https://teamautotech.co.uk',
} as const;

// Business Contact Details
// Used in Navbar, Footer, ContactLinks

export const PHONE_LANDLINE = '01282 787576';
export const PHONE_MOBILE = '07515 007688';
export const EMAIL = 'teamautotech@outlook.com';
export const ADDRESS = 'Unit 4E Wenning St, Nelson, Lancashire BB9 OLE';

export const WHATSAPP_NUMBER = '447515007688';
export const WHATSAPP_LINK = `https://api.whatsapp.com/send?phone=447515007688&text=Hi,%20How%20can%20we%20help?`;
export const TEL_LINK = `tel:+44${PHONE_MOBILE.replace(/^0/, '').replace(/\s/g, '')}`;
export const MAILTO_LINK = `mailto:${EMAIL}`;

export const OPENING_HOURS = {
  weekdays: 'Monday - Friday: 10:00AM - 5:30PM',
  weekend: 'Saturday - Sunday: Closed',
};
