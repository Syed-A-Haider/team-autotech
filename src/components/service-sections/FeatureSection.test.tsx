import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Gauge } from 'lucide-react';
import { FeatureSection, FEATURE_GRID_PLANS } from './FeatureSection';
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

  it.each([1, 2, 3, 4, 5, 6])(
    'Plans full rows for %i features at every breakpoint',
    (count) => {
      const plan = FEATURE_GRID_PLANS[count];
      for (const bp of [plan.sm, plan.lg]) {
        expect(bp.spans).toHaveLength(count);
        // Pack spans row by row. Every row must fill the columns exactly
        let used = 0;
        for (const span of bp.spans) {
          used += span;
          expect(used).toBeLessThanOrEqual(bp.cols);
          if (used === bp.cols) used = 0;
        }
        expect(used).toBe(0);
      }
    },
  );

  it.each([1, 2, 3, 4, 5, 6])(
    'Renders one list item per feature in grid with %i features',
    (count) => {
      const many: Feature[] = Array.from({ length: count }, (_, i) => ({
        title: `Feature ${i + 1}`,
        description: `Description ${i + 1}.`,
      }));
      render(
        <FeatureSection
          section={{ type: 'feature', layout: 'grid', features: many }}
        />,
      );
      expect(screen.getAllByRole('listitem')).toHaveLength(count);
    },
  );
});
