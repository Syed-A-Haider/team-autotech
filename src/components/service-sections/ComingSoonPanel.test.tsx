// components/service-sections/ComingSoonPanel.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Gauge } from 'lucide-react';
import {
  ComingSoonPanel,
  COMING_SOON_BADGE,
  COMING_SOON_HEADING_PREFIX,
  COMING_SOON_PITCH,
} from './ComingSoonPanel';
import type { Service } from '@/types/service';
import { TEL_LANDLINE_LINK, WHATSAPP_LINK } from '@/lib/constants';

const mockService: Service = {
  slug: 'stage-1-tuning',
  title: 'Stage 1 Tuning',
  category: 'Remap / Tuning',
  shortDescription: 'Performance remapping.',
  body: 'Placeholder content.',
  icon: Gauge,
};

describe('ComingSoonPanel', () => {
  it('Personalises the heading with the service title', () => {
    render(<ComingSoonPanel service={mockService} />);
    expect(
      screen.getByRole('heading', { name: /stage 1 tuning/i }),
    ).toBeInTheDocument();
  });

  it('Renders a call link with the correct href', () => {
    render(<ComingSoonPanel service={mockService} />);
    expect(screen.getByRole('link', { name: /call us/i })).toHaveAttribute(
      'href',
      TEL_LANDLINE_LINK,
    );
  });

  it('Renders a WhatsApp link that opens in a new tab', () => {
    render(<ComingSoonPanel service={mockService} />);
    const link = screen.getByRole('link', { name: /whatsapp/i });
    expect(link).toHaveAttribute('href', WHATSAPP_LINK);
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('Heading reads the prefix followed by the service title', () => {
    render(<ComingSoonPanel service={mockService} />);
    expect(
      screen.getByRole('heading', {
        name: `${COMING_SOON_HEADING_PREFIX} ${mockService.title}`,
      }),
    ).toBeInTheDocument();
  });

  it('Shows the coming soon badge and pitch', () => {
    render(<ComingSoonPanel service={mockService} />);
    expect(screen.getByText(COMING_SOON_BADGE)).toBeInTheDocument();
    expect(screen.getByText(COMING_SOON_PITCH)).toBeInTheDocument();
  });
});
