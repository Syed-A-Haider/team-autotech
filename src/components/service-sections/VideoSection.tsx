import type { ServiceSection } from '@/types/service';
import { VideoEmbed } from './VideoEmbed';

interface VideoSectionProps {
  section: Extract<ServiceSection, { type: 'video' }>;
}

// Figure and caption stay on the server. The title is not rendered as a
// heading here: ServiceSections owns the shared h2, and the title only
// names the play button and iframe. The player reveals through a wrapper,
// because the Client Component's root has its own overflow-hidden.
export function VideoSection({ section }: VideoSectionProps) {
  return (
    <figure className="mx-auto max-w-4xl">
      <div className="reveal">
        <VideoEmbed
          videoId={section.videoId}
          title={section.title}
          poster={section.posterImage}
        />
      </div>
      {section.caption && (
        <figcaption className="text-muted mt-3 max-w-prose text-sm">
          {section.caption}
        </figcaption>
      )}
    </figure>
  );
}
