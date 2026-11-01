'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface VideoEmbedProps {
  videoId: string;
  title: string;
  poster: string;
}

export const PLAY_LABEL_PREFIX = 'Play video';
export const YOUTUBE_EMBED_HOST = 'www.youtube-nocookie.com';
export const YOUTUBE_EMBED_BASE_URL = `https://${YOUTUBE_EMBED_HOST}/embed/`;
export const YOUTUBE_EMBED_PARAMS = 'autoplay=1&rel=0&playsinline=1';

const IFRAME_ALLOW = 'autoplay; encrypted-media; picture-in-picture';

// Must match the max-w-4xl (896px) cap on the root below
const POSTER_SIZES = '(min-width: 1024px) 896px, 100vw';

// Same fixed 16:9 box in both states, so the swap causes no layout shift
const ROOT_STYLES =
  'border-border bg-surface relative aspect-video w-full max-w-4xl overflow-hidden rounded-lg border';

// Inset ring: an offset ring would be clipped by overflow-hidden
const PLAY_BUTTON_STYLES =
  'group bg-background/40 hover:bg-background/20 focus-visible:ring-accent absolute inset-0 flex cursor-pointer items-center justify-center focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset motion-safe:transition-colors';

const PLAY_CIRCLE_STYLES =
  'bg-accent text-foreground group-hover:bg-accent-hover flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20 motion-safe:transition-transform motion-safe:group-hover:scale-110';

// Module-level so its identity is stable. The iframe only mounts after the
// click, so focusing on mount moves keyboard users into the player.
function focusOnMount(node: HTMLIFrameElement | null) {
  node?.focus();
}

// Client Component: the only interactive part of the video block.
// Nothing from YouTube loads until the visitor clicks play.
export function VideoEmbed({ videoId, title, poster }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={ROOT_STYLES}>
      {/* Stays mounted under the iframe, so there is no dark flash on load */}
      <Image
        src={poster}
        alt=""
        fill
        sizes={POSTER_SIZES}
        className="object-cover"
      />
      {playing ? (
        <iframe
          ref={focusOnMount}
          src={`${YOUTUBE_EMBED_BASE_URL}${encodeURIComponent(videoId)}?${YOUTUBE_EMBED_PARAMS}`}
          title={title}
          allow={IFRAME_ALLOW}
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          aria-label={`${PLAY_LABEL_PREFIX}: ${title}`}
          onClick={() => setPlaying(true)}
          className={PLAY_BUTTON_STYLES}
        >
          <span className={PLAY_CIRCLE_STYLES}>
            <Play
              aria-hidden="true"
              className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8"
            />
          </span>
        </button>
      )}
    </div>
  );
}
