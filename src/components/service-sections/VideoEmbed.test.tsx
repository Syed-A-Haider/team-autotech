import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  VideoEmbed,
  PLAY_LABEL_PREFIX,
  YOUTUBE_EMBED_HOST,
} from './VideoEmbed';

const props = {
  videoId: 'abc123XYZ_-',
  title: 'Ghost walkthrough',
  poster: '/images/videos/poster.jpg',
};

const playName = `${PLAY_LABEL_PREFIX}: ${props.title}`;

describe('VideoEmbed', () => {
  it('Shows a named play button and a poster before any click', () => {
    render(<VideoEmbed {...props} />);

    expect(screen.getByRole('button', { name: playName })).toBeInTheDocument();
    const poster = screen.getByRole('presentation');
    expect(poster.getAttribute('src')).toContain(
      encodeURIComponent(props.poster),
    );
  });

  it('Renders no iframe before a click', () => {
    render(<VideoEmbed {...props} />);

    expect(screen.queryByTitle(props.title)).not.toBeInTheDocument();
  });

  it('Swaps the button for an iframe on click', async () => {
    const user = userEvent.setup();
    render(<VideoEmbed {...props} />);

    await user.click(screen.getByRole('button', { name: playName }));

    const iframe = screen.getByTitle(props.title);
    expect(iframe.tagName).toBe('IFRAME');
    const url = new URL(iframe.getAttribute('src') ?? '');
    expect(url.hostname).toBe(YOUTUBE_EMBED_HOST);
    expect(url.pathname).toBe(`/embed/${props.videoId}`);
    expect(url.searchParams.get('autoplay')).toBe('1');
    expect(
      screen.queryByRole('button', { name: playName }),
    ).not.toBeInTheDocument();
  });

  it('Moves focus to the iframe on click', async () => {
    const user = userEvent.setup();
    render(<VideoEmbed {...props} />);

    await user.click(screen.getByRole('button', { name: playName }));

    expect(screen.getByTitle(props.title)).toHaveFocus();
  });

  it('Starts the video from the keyboard', async () => {
    const user = userEvent.setup();
    render(<VideoEmbed {...props} />);

    await user.tab();
    await user.keyboard('{Enter}');

    expect(screen.getByTitle(props.title)).toBeInTheDocument();
  });

  it('Allows autoplay and fullscreen and sets a referrer policy', async () => {
    const user = userEvent.setup();
    render(<VideoEmbed {...props} />);

    await user.click(screen.getByRole('button', { name: playName }));

    const iframe = screen.getByTitle(props.title);
    expect(iframe).toHaveAttribute('allowfullscreen');
    expect(iframe.getAttribute('allow')).toContain('autoplay');
    expect(iframe).toHaveAttribute('referrerpolicy');
  });

  it('Encodes an unsafe video id so it cannot change the URL path', async () => {
    const user = userEvent.setup();
    render(<VideoEmbed {...props} videoId="a/b c?x=1" />);

    await user.click(screen.getByRole('button', { name: playName }));

    const url = new URL(screen.getByTitle(props.title).getAttribute('src')!);
    expect(url.pathname).toBe(`/embed/${encodeURIComponent('a/b c?x=1')}`);
    expect(url.searchParams.get('x')).toBeNull();
  });
});
