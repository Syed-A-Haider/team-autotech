'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';

// The dropdown is open while anything inside it has focus (group-focus-within).
// The Navbar outlives a navigation, so a clicked row would keep focus and hold
// the dropdown open on the new page. Dropping focus on click lets it close
// once the pointer leaves. Client only for this handler: the rest of the
// dropdown stays a Server Component
export function ServicesDropdownLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} onClick={(event) => event.currentTarget.blur()} />;
}
