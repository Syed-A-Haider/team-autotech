import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import AboutPage, {
  metadata,
  ABOUT_META_TITLE,
  ABOUT_META_DESCRIPTION,
  ABOUT_PAGE_TITLE,
  ABOUT_PAGE_SUBTITLE,
  ABOUT_INTRO_HEADING,
  ABOUT_INTRO_BODY,
  ABOUT_SERVICES_HEADING,
  ABOUT_SERVICES_CTA_LABEL,
  ABOUT_VISIT_HEADING,
  ABOUT_ENQUIRY_HEADING,
} from './page';
import { getAllServices, groupServicesByCategory } from '@/lib/services';
import {
  ADDRESS,
  OPENING_HOURS,
  TEL_MOBILE_LINK,
  TEL_LANDLINE_LINK,
  MAILTO_LINK,
  MAPS_DIRECTIONS_LINK,
  WHATSAPP_LINK,
} from '@/lib/constants';

function allLinkHrefs(): string[] {
  return screen.getAllByRole('link').map((link) => link.getAttribute('href')!);
}

describe('AboutPage', () => {
  it('Renders exactly one h1 with the page title', () => {
    render(<AboutPage />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(ABOUT_PAGE_TITLE);
  });

  it('Renders the subtitle and intro copy', () => {
    render(<AboutPage />);
    expect(screen.getByText(ABOUT_PAGE_SUBTITLE)).toBeInTheDocument();
    ABOUT_INTRO_BODY.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  it('Renders an h2 for each of the four sections', () => {
    render(<AboutPage />);
    const headings = [
      ABOUT_INTRO_HEADING,
      ABOUT_SERVICES_HEADING,
      ABOUT_VISIT_HEADING,
      ABOUT_ENQUIRY_HEADING,
    ];
    headings.forEach((name) => {
      expect(
        screen.getByRole('heading', { level: 2, name }),
      ).toBeInTheDocument();
    });
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(
      headings.length,
    );
  });

  it('Renders one h3 card per service category', () => {
    render(<AboutPage />);
    const categories = Object.keys(groupServicesByCategory());
    const h3s = screen.getAllByRole('heading', { level: 3 });
    expect(h3s.map((h3) => h3.textContent)).toEqual(categories);
  });

  it('Lists every service title as plain text', () => {
    render(<AboutPage />);
    getAllServices().forEach((service) => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
      expect(
        screen.queryByRole('link', { name: service.title }),
      ).not.toBeInTheDocument();
    });
  });

  it('Links the services CTA to the homepage services section', () => {
    render(<AboutPage />);
    expect(
      screen.getByRole('link', { name: ABOUT_SERVICES_CTA_LABEL }),
    ).toHaveAttribute('href', '/#services');
  });

  it('Links to no individual service page', () => {
    render(<AboutPage />);
    allLinkHrefs().forEach((href) => {
      expect(href.startsWith('/services/')).toBe(false);
    });
  });

  it('Links to the phone numbers, email, directions and WhatsApp', () => {
    render(<AboutPage />);
    const hrefs = allLinkHrefs();
    expect(hrefs).toContain(TEL_MOBILE_LINK);
    expect(hrefs).toContain(TEL_LANDLINE_LINK);
    expect(hrefs).toContain(MAILTO_LINK);
    expect(hrefs).toContain(MAPS_DIRECTIONS_LINK);
    expect(hrefs).toContain(WHATSAPP_LINK);
  });

  it('Opens the directions link safely in a new tab', () => {
    render(<AboutPage />);
    const directions = screen.getByRole('link', { name: ADDRESS });
    expect(directions).toHaveAttribute('href', MAPS_DIRECTIONS_LINK);
    expect(directions).toHaveAttribute('target', '_blank');
    expect(directions).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('Shows the address and opening hours', () => {
    render(<AboutPage />);
    const address = screen.getByText(ADDRESS).closest('address');
    expect(address).not.toBeNull();
    expect(within(address!).getByText(ADDRESS)).toBeInTheDocument();
    expect(screen.getByText(OPENING_HOURS.weekdays)).toBeInTheDocument();
    expect(screen.getByText(OPENING_HOURS.weekend)).toBeInTheDocument();
  });

  it('Renders no main landmark of its own', () => {
    render(<AboutPage />);
    expect(screen.queryByRole('main')).not.toBeInTheDocument();
  });
});

describe('AboutPage metadata', () => {
  it('Uses the exported title and description', () => {
    expect(metadata.title).toBe(ABOUT_META_TITLE);
    expect(metadata.description).toBe(ABOUT_META_DESCRIPTION);
  });
});
