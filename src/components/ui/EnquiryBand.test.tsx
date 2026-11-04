import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EnquiryBand, CALL_LABEL, WHATSAPP_LABEL } from './EnquiryBand';
import { TEL_MOBILE_LINK, WHATSAPP_LINK } from '@/lib/constants';

const TITLE = 'Interested in Remapping?';
const PITCH = 'Get in touch for a free quote.';
const BADGE = 'Limited run';

describe('EnquiryBand', () => {
  it('Renders the title as the h2', () => {
    render(<EnquiryBand title={TITLE} pitch={PITCH} />);
    expect(
      screen.getByRole('heading', { level: 2, name: TITLE }),
    ).toBeInTheDocument();
  });

  it('Shows the pitch', () => {
    render(<EnquiryBand title={TITLE} pitch={PITCH} />);
    expect(screen.getByText(PITCH)).toBeInTheDocument();
  });

  it('Renders a call link with the correct href', () => {
    render(<EnquiryBand title={TITLE} pitch={PITCH} />);
    expect(screen.getByRole('link', { name: CALL_LABEL })).toHaveAttribute(
      'href',
      TEL_MOBILE_LINK,
    );
  });

  it('Renders a WhatsApp link that opens in a new tab', () => {
    render(<EnquiryBand title={TITLE} pitch={PITCH} />);
    const link = screen.getByRole('link', { name: new RegExp(WHATSAPP_LABEL) });
    expect(link).toHaveAttribute('href', WHATSAPP_LINK);
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('Shows the badge as plain text, not a heading', () => {
    render(<EnquiryBand title={TITLE} pitch={PITCH} badge={BADGE} />);
    expect(screen.getByText(BADGE)).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: BADGE }),
    ).not.toBeInTheDocument();
  });

  it('Shows no badge when none is given', () => {
    render(<EnquiryBand title={TITLE} pitch={PITCH} />);
    expect(screen.queryByText(BADGE)).not.toBeInTheDocument();
  });

  it('Never renders an h1', () => {
    render(<EnquiryBand title={TITLE} pitch={PITCH} badge={BADGE} />);
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
  });
});
