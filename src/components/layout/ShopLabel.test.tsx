import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ShopLabel } from './ShopLabel';
import { SHOP_LABEL, SHOP_TAG, SHOP_TAG_SR } from '@/lib/constants';

describe('ShopLabel', () => {
  it('Shows the label and the visible tag', () => {
    render(<ShopLabel />);

    expect(screen.getByText(SHOP_LABEL)).toBeInTheDocument();
    expect(screen.getByText(SHOP_TAG)).toBeInTheDocument();
  });

  it('Reads once as "Shop (coming soon)": the tag is hidden, the suffix is not', () => {
    render(<ShopLabel />);

    expect(screen.getByText(SHOP_TAG)).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText(SHOP_LABEL)).toHaveTextContent(
      `${SHOP_LABEL}${SHOP_TAG_SR}`,
    );
  });

  it('Is not a link, a button or a tab stop', () => {
    render(<ShopLabel />);

    expect(screen.queryByRole('link', { name: /shop/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /shop/i })).toBeNull();
    expect(screen.getByText(SHOP_LABEL)).not.toHaveAttribute('tabindex');
  });

  it('Passes className through to the label', () => {
    render(<ShopLabel className="custom-class" />);

    expect(screen.getByText(SHOP_LABEL)).toHaveClass('custom-class');
  });
});
