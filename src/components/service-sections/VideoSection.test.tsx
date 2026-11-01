import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VideoSection } from './VideoSection';
import { PLAY_LABEL_PREFIX } from './VideoEmbed';
import type { ServiceSection } from '@/types/service';

type VideoSectionData = Extract<ServiceSection, { type: 'video' }>;

const section: VideoSectionData = {
  type: 'video',
  title: 'Ghost walkthrough',
  videoId: 'abc123XYZ_-',
  posterImage: '/images/videos/poster.jpg',
};

describe('VideoSection', () => {
  it('Passes the section title to the play button', () => {
    render(<VideoSection section={section} />);

    expect(
      screen.getByRole('button', {
        name: `${PLAY_LABEL_PREFIX}: ${section.title}`,
      }),
    ).toBeInTheDocument();
  });

  it('Renders the caption when present', () => {
    render(
      <VideoSection section={{ ...section, caption: 'Fitted in a day.' }} />,
    );

    expect(screen.getByText('Fitted in a day.')).toBeInTheDocument();
  });

  it('Renders no caption element when there is none', () => {
    const { container } = render(<VideoSection section={section} />);

    expect(container.querySelector('figcaption')).not.toBeInTheDocument();
  });

  it('Renders no heading of its own', () => {
    render(<VideoSection section={section} />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
