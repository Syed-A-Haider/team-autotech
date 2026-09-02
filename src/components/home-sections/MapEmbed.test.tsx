import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MapEmbed from './MapEmbed';

describe('MapEmbed', () => {
  it('Renders the iframe with the given src and title', () => {
    render(<MapEmbed src="https://example.com/map" title="Test map" />);
    const iframe = screen.getByTitle('Test map');
    expect(iframe).toHaveAttribute('src', 'https://example.com/map');
  });

  it('Marks the container as busy until the iframe loads', () => {
    render(<MapEmbed src="https://example.com/map" title="Test map" />);
    const iframe = screen.getByTitle('Test map');
    expect(iframe.parentElement).toHaveAttribute('aria-busy', 'true');

    fireEvent.load(iframe);

    expect(iframe.parentElement).toHaveAttribute('aria-busy', 'false');
  });
});
