// components/service-sections/ComingSoonPanel.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Gauge } from 'lucide-react';
import { ComingSoonPanel } from './ComingSoonPanel';
import type { Service } from '@/types/service';
import { TEL_MOBILE_LINK, WHATSAPP_LINK } from '@/lib/constants';

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
      TEL_MOBILE_LINK,
    );
  });

  it('Renders a WhatsApp link that opens in a new tab', () => {
    render(<ComingSoonPanel service={mockService} />);
    const link = screen.getByRole('link', { name: /whatsapp/i });
    expect(link).toHaveAttribute('href', WHATSAPP_LINK);
    expect(link).toHaveAttribute('target', '_blank');
  });
});
