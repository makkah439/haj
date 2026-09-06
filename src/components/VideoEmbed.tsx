import { getVideoEmbedInfo } from "@/lib/video-embed";

function PlayCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86a1 1 0 0 0-1.5.86Z" />
    </svg>
  );
}

/**
 * Renders any project video URL appropriately: YouTube/Vimeo become a proper
 * iframe embed, direct file links (our Blob uploads included) become a native
 * <video>, and platforms without a plain embeddable URL (Instagram, TikTok,
 * Facebook, X) fall back to a "watch on X" external link — see video-embed.ts.
 *
 * `mode="thumbnail"` is a lightweight, non-interactive preview for grids
 * (no iframe/network cost beyond a static image where one exists);
 * `mode="player"` is the full interactive version for the lightbox.
 */
export default function VideoEmbed({
  url,
  mode,
  className,
}: {
  url: string;
  mode: "thumbnail" | "player";
  className?: string;
}) {
  const info = getVideoEmbedInfo(url);

  if (mode === "thumbnail") {
    if (info.kind === "youtube") {
      const videoId = info.embedUrl.split("/").pop();
      return (
        <div className={`relative ${className ?? ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary external thumbnail, not eligible for next/image optimization */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="صورة معاينة لفيديو من رحلات الحج والعمرة"
            className="h-full w-full object-cover"
          />
        </div>
      );
    }

    if (info.kind === "vimeo" || info.kind === "external-link") {
      const label = info.kind === "vimeo" ? "Vimeo" : info.platform;
      return (
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-1 bg-[color:var(--color-primary-dark)] text-white/80 ${className ?? ""}`}
        >
          <PlayCircleIcon className="h-6 w-6" />
          <span className="text-xs font-semibold">{label}</span>
        </div>
      );
    }

    return (
      <video
        src={url}
        className={`h-full w-full object-cover ${className ?? ""}`}
        muted
        preload="metadata"
      />
    );
  }

  if (info.kind === "youtube" || info.kind === "vimeo") {
    return (
      <iframe
        src={`${info.embedUrl}?autoplay=1`}
        className={`h-full w-full ${className ?? ""}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }

  if (info.kind === "external-link") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-black text-white transition hover:opacity-90 ${className ?? ""}`}
      >
        <PlayCircleIcon className="h-10 w-10" />
        <span className="text-sm font-semibold">
          مشاهدة على {info.platform}
        </span>
      </a>
    );
  }

  return (
    <video
      src={url}
      controls
      autoPlay
      className={`h-full w-full object-contain ${className ?? ""}`}
    />
  );
}
