import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Gauge } from 'lucide-react';
import { FeatureSection } from './FeatureSection';
import type { Feature } from '@/types/service';

const features: Feature[] = [
  { icon: Gauge, title: 'More power', description: 'Extra torque.' },
  { title: 'No icon', description: 'Text only feature.' },
];

type Layout = 'grid' | 'alternating' | 'list';
const layouts: Layout[] = ['grid', 'alternating', 'list'];

describe('FeatureSection', () => {
  it.each(layouts)('Renders every feature in the %s layout', (layout) => {
    render(<FeatureSection section={{ type: 'feature', layout, features }} />);
    expect(
      screen.getByRole('heading', { level: 3, name: 'More power' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Extra torque.')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'No icon' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Text only feature.')).toBeInTheDocument();
  });

  it.each(layouts)('Renders features as list items in %s', (layout) => {
    render(<FeatureSection section={{ type: 'feature', layout, features }} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(features.length);
  });

  it('Hides decorative icons from assistive tech', () => {
    const { container } = render(
      <FeatureSection
        section={{ type: 'feature', layout: 'list', features }}
      />,
    );
    const svgs = container.querySelectorAll('svg');
    expect(svgs).toHaveLength(1);
    expect(svgs[0]).toHaveAttribute('aria-hidden', 'true');
  });

  it('Does not crash with no features', () => {
    render(
      <FeatureSection
        section={{ type: 'feature', layout: 'grid', features: [] }}
      />,
    );
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
