// components/service-sections/ServiceCtaBand.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Gauge } from 'lucide-react';
import { ServiceCtaBand } from './ServiceCtaBand';
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

describe('ServiceCtaBand', () => {
  it('Personalises the heading with the service title', () => {
    render(<ServiceCtaBand service={mockService} />);
    expect(
      screen.getByRole('heading', { name: /interested in stage 1 tuning/i }),
    ).toBeInTheDocument();
  });

  it('Renders a call link with the correct href', () => {
    render(<ServiceCtaBand service={mockService} />);
    expect(screen.getByRole('link', { name: /call us/i })).toHaveAttribute(
      'href',
      TEL_MOBILE_LINK,
    );
  });

  it('Renders a WhatsApp link with the correct href', () => {
    render(<ServiceCtaBand service={mockService} />);
    expect(screen.getByRole('link', { name: /whatsapp/i })).toHaveAttribute(
      'href',
      WHATSAPP_LINK,
    );
  });
});
