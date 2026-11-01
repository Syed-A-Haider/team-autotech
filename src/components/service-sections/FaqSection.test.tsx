import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { FaqSection } from './FaqSection';

const items = [
  { question: 'Is it safe?', answer: 'Yes, files are tested.' },
  { question: 'Can it be undone?', answer: 'Yes, we keep the original.' },
];

describe('FaqSection', () => {
  it('Renders each item as a details element with a summary', () => {
    const { container } = render(
      <FaqSection section={{ type: 'faq', items }} />,
    );
    const details = container.querySelectorAll('details');
    expect(details).toHaveLength(items.length);
    items.forEach((item, i) => {
      expect(details[i].querySelector('summary')).toHaveTextContent(
        item.question,
      );
      expect(details[i]).toHaveTextContent(item.answer);
    });
  });

  it('Starts with every item closed', () => {
    const { container } = render(
      <FaqSection section={{ type: 'faq', items }} />,
    );
    container
      .querySelectorAll('details')
      .forEach((d) => expect(d).not.toHaveAttribute('open'));
  });

  it('Does not crash with no items', () => {
    const { container } = render(
      <FaqSection section={{ type: 'faq', items: [] }} />,
    );
    expect(container.querySelectorAll('details')).toHaveLength(0);
  });
});
