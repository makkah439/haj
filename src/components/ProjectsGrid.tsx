'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import VideoEmbed from '@/components/VideoEmbed';
import type { ProjectMedia } from '@/lib/projects-store';

const INITIAL_VISIBLE = 12;
const PAGE_SIZE = 8;

export default function ProjectsGrid({ items }: { items: ProjectMedia[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;
  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  const goPrev = useCallback(() => {
    setActiveIndex((current) => (current === null ? null : (current - 1 + items.length) % items.length));
  }, [items.length]);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current === null ? null : (current + 1) % items.length));
  }, [items.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, goPrev, goNext]);

  return (
    <>
      <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visibleItems.map((item, index) => (
          <StaggerItem key={item.id}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={item.type === 'video' ? `تشغيل الفيديو: ${item.caption || 'فيديو من رحلاتنا'}` : `عرض الصورة: ${item.caption || 'صورة من رحلاتنا'}`}
              className="group relative block aspect-square w-full overflow-hidden rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-sm"
            >
              {item.type === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element -- may be an arbitrary external URL
                <img
                  src={item.url}
                  alt={item.caption || 'صورة من رحلاتنا'}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              ) : (
                <>
                  <VideoEmbed url={item.url} mode="thumbnail" />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[color:var(--color-primary-dark)]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 -mr-0.5">
                        <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86a1 1 0 0 0-1.5.86Z" />
                      </svg>
                    </span>
                  </span>
                </>
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            </button>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, items.length))}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-6 py-3 text-sm font-semibold text-[color:var(--color-primary)] shadow-sm transition hover:-translate-y-0.5 hover:border-[color:var(--color-gold-soft)] hover:shadow-soft"
          >
            تصفح المزيد
          </button>
        </div>
      ) : null}

      <AnimatePresence>
        {activeItem ? (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
            onClick={() => setActiveIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.caption || 'عرض العنصر'}
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
              aria-label="السابق"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:right-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15 19-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goNext();
              }}
              aria-label="التالي"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:left-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
              </svg>
            </button>

            <div className="relative max-h-[85vh] w-full max-w-3xl" onClick={(event) => event.stopPropagation()}>
              <AnimatePresence mode="wait">
                <m.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black"
                >
                  {activeItem.type === 'image' ? (
                    // eslint-disable-next-line @next/next/no-img-element -- may be an arbitrary external URL
                    <img src={activeItem.url} alt={activeItem.caption || 'صورة من رحلاتنا'} className="h-full w-full object-contain" />
                  ) : (
                    <VideoEmbed url={activeItem.url} mode="player" />
                  )}
                </m.div>
              </AnimatePresence>

              {activeItem.caption ? <p className="mt-3 text-center text-sm text-white/80">{activeItem.caption}</p> : null}
              <p className="mt-1 text-center text-xs text-white/50">{activeIndex! + 1} / {items.length}</p>

              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="إغلاق"
                className="absolute -top-4 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-white text-[color:var(--color-primary-dark)] shadow-lg sm:-right-4 sm:left-auto sm:top-0 sm:translate-x-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
