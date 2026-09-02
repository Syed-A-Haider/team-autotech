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
export const ADDRESS = 'Unit 4E Wenning St, Nelson, Lancashire BB9 0LE';

export const WHATSAPP_NUMBER = '447515007688';
export const WHATSAPP_LINK = `https://api.whatsapp.com/send?phone=447515007688&text=Hi%2C%20How%20can%20we%20help%3F`;
export const TEL_MOBILE_LINK = `tel:+44${PHONE_MOBILE.replace(/^0/, '').replace(/\s/g, '')}`;
export const TEL_LANDLINE_LINK = `tel:+44${PHONE_LANDLINE.replace(/^0/, '').replace(/\s/g, '')}`;

export const MAILTO_LINK = `mailto:${EMAIL}`;

export const OPENING_HOURS = {
  weekdays: 'Monday - Friday: 10:00AM - 5:30PM',
  weekend: 'Saturday - Sunday: Closed',
};

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/teamautotechuk',
  instagram: 'https://instagram.com/teamautotech',
  youtube: 'https://www.youtube.com/channel/UCokP_BpT-Yw5ANsHOAOUSnQ',
} as const;

export const GOOGLE_PROFILE_LINK = 'https://share.google/h5RwgH5kJAwaGiQWk';

// Note - address is currently at 4 Wenning Street, when it should be Unit 4 - 12 Wenning Street
export const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;
export const MAPS_DIRECTIONS_LINK = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;
