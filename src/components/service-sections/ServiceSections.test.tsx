import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ServiceSections } from './ServiceSections';
import { PLAY_LABEL_PREFIX } from './VideoEmbed';
import type { ServiceSection } from '@/types/service';

const prose: ServiceSection = {
  type: 'prose',
  title: 'About this service',
  body: ['Prose body text.'],
};
const feature: ServiceSection = {
  type: 'feature',
  layout: 'grid',
  features: [{ title: 'Feature title', description: 'Feature text.' }],
};
const steps: ServiceSection = {
  type: 'steps',
  steps: [{ title: 'Step title', description: 'Step text.' }],
};
const specband: ServiceSection = {
  type: 'specband',
  specs: [{ label: 'Spec label', value: 'Spec value' }],
};
const faq: ServiceSection = {
  type: 'faq',
  items: [{ question: 'Faq question?', answer: 'Faq answer.' }],
};
const video: ServiceSection = {
  type: 'video',
  title: 'Video title',
  videoId: 'abc123',
  posterImage: '/poster.jpg',
};

describe('ServiceSections', () => {
  it('Renders the matching block for each section type', () => {
    render(
      <ServiceSections sections={[prose, feature, steps, specband, faq]} />,
    );
    expect(screen.getByText('Prose body text.')).toBeInTheDocument();
    expect(screen.getByText('Feature text.')).toBeInTheDocument();
    expect(screen.getByText('Step text.')).toBeInTheDocument();
    expect(screen.getByText('Spec value')).toBeInTheDocument();
    expect(screen.getByText('Faq answer.')).toBeInTheDocument();
  });

  it('Preserves section order', () => {
    render(<ServiceSections sections={[faq, prose, steps]} />);
    const faqNode = screen.getByText('Faq answer.');
    const proseNode = screen.getByText('Prose body text.');
    const stepNode = screen.getByText('Step text.');
    expect(
      faqNode.compareDocumentPosition(proseNode) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      proseNode.compareDocumentPosition(stepNode) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('Renders the shared title as an h2 when present', () => {
    render(<ServiceSections sections={[prose]} />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'About this service' }),
    ).toBeInTheDocument();
  });

  it('Renders no h2 when a section has no title', () => {
    render(<ServiceSections sections={[steps]} />);
    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  });

  it('Wraps each section in its own section element', () => {
    const { container } = render(<ServiceSections sections={[prose, steps]} />);
    expect(container.querySelectorAll('section')).toHaveLength(2);
  });

  it('Renders nothing for an empty array', () => {
    const { container } = render(<ServiceSections sections={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('Renders a video section with its shared title and play button', () => {
    render(<ServiceSections sections={[video]} />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Video title' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: `${PLAY_LABEL_PREFIX}: Video title`,
      }),
    ).toBeInTheDocument();
  });
});
