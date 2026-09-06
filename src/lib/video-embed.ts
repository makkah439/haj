export type VideoEmbedInfo =
  | { kind: 'youtube'; embedUrl: string }
  | { kind: 'vimeo'; embedUrl: string }
  | { kind: 'direct' }
  | { kind: 'external-link'; platform: string };

/**
 * Figures out how to render a video URL: native players (YouTube, Vimeo) get
 * a proper iframe embed; direct file links (.mp4 etc, including our own Blob
 * uploads) get a native <video> tag; anything else (Instagram, TikTok,
 * Facebook — platforms that don't offer a plain embeddable URL) falls back to
 * a "watch on X" external link, since embedding those reliably needs their
 * own SDK/script, which this project doesn't load.
 */
export function getVideoEmbedInfo(url: string): VideoEmbedInfo {
  const youtubeMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{6,})/i
  );
  if (youtubeMatch) {
    return { kind: 'youtube', embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}` };
  }

  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeoMatch) {
    return { kind: 'vimeo', embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }

  if (/\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url)) {
    return { kind: 'direct' };
  }

  if (/instagram\.com/i.test(url)) return { kind: 'external-link', platform: 'Instagram' };
  if (/tiktok\.com/i.test(url)) return { kind: 'external-link', platform: 'TikTok' };
  if (/facebook\.com|fb\.watch/i.test(url)) return { kind: 'external-link', platform: 'Facebook' };
  if (/x\.com|twitter\.com/i.test(url)) return { kind: 'external-link', platform: 'X' };

  // Blob-hosted uploads and any other unrecognized link: try as a direct file.
  return { kind: 'direct' };
}
