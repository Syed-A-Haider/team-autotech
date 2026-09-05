import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Wrench, ShieldCheck, Camera } from 'lucide-react';
import ServicesGrid, { SERVICES_GRID_HEADING } from './ServicesGrid';
import type { Service } from '@/types/service';

const mockServices: Service[] = [
  {
    slug: 'stage-1-tuning',
    title: 'Stage 1 Tuning',
    category: 'Remap / Tuning',
    shortDescription: 'Unlock more power and torque with a Stage 1 remap.',
    body: 'Placeholder body content for Stage 1 Tuning.',
    icon: Wrench,
    popular: true,
  },
  {
    slug: 'ghost-immobiliser-ii',
    title: 'Ghost Immobiliser II',
    category: 'Auto Security',
    shortDescription: 'CAN-bus immobiliser with no visible fitting.',
    body: 'Placeholder body content for Ghost Immobiliser II.',
    icon: ShieldCheck,
    popular: true,
  },
  {
    slug: 'dashcam-installation',
    title: 'Dashcam Installation',
    category: 'Auto Electrical',
    shortDescription: 'Professional dashcam supply and fitting.',
    body: 'Placeholder body content for Dashcam Installation.',
    icon: Camera,
    popular: undefined,
  },
];

describe('ServicesGrid', () => {
  it('Renders the section heading', () => {
    render(<ServicesGrid services={mockServices} />);
    expect(
      screen.getByRole('heading', { level: 2, name: SERVICES_GRID_HEADING }),
    ).toBeInTheDocument();
  });

  it('Renders a card for every service passed in, linking to the right page', () => {
    const { container } = render(<ServicesGrid services={mockServices} />);
    mockServices.forEach((service) => {
      expect(
        screen.getByRole('heading', { name: service.title, level: 3 }),
      ).toBeInTheDocument();
      expect(
        container.querySelector(`a[href="/services/${service.slug}"]`),
      ).toBeInTheDocument();
    });
  });

  it('Exposes an id for the Footer quick link to anchor to', () => {
    const { container } = render(<ServicesGrid services={mockServices} />);
    expect(container.querySelector('#services')).toBeInTheDocument();
  });
});
