"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  siteConfig,
  whatsappLink,
  whatsappLinkSecondary,
} from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
    >
      <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.31.66 4.523 1.9 6.44L4 29l7.73-1.86A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.8c-1.94 0-3.83-.52-5.48-1.5l-.39-.23-4.59 1.1 1.13-4.47-.25-.4A9.77 9.77 0 0 1 5.2 15c0-5.96 4.85-10.8 10.8-10.8 5.96 0 10.8 4.85 10.8 10.8 0 5.96-4.85 10.8-10.8 10.8Zm5.94-8.1c-.32-.16-1.9-.94-2.2-1.05-.29-.1-.5-.16-.72.16-.21.32-.83 1.04-1.01 1.26-.19.21-.37.24-.69.08-.32-.16-1.36-.5-2.58-1.6-.95-.85-1.6-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.53-.54-.72-.55-.19-.01-.4-.01-.61-.01-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.66 0 1.57 1.14 3.09 1.3 3.3.16.21 2.24 3.42 5.43 4.79.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

const whatsappNumbers = [
  {
    link: whatsappLink,
    label: `تواصل معنا عبر واتساب على ${siteConfig.phone}`,
  },
  {
    link: whatsappLinkSecondary,
    label: `تواصل معنا عبر واتساب على ${siteConfig.phoneSecondary}`,
  },
].filter((item) => item.link);

const RING_RADIUS = 21;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 480);
      const scrollable =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setScrollProgress(
        scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0,
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(mediaQuery.matches);
    onChange();
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      {
        rootMargin: "0px 0px -10% 0px",
      },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // On mobile the footer's centered layout doesn't overlap these buttons, so only
  // hide them near the footer on desktop where the overlap was actually observed.
  const showFloating = !isDesktop || !isFooterVisible;

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3 sm:bottom-8 sm:right-8">
        <AnimatePresence>
          {showFloating
            ? whatsappNumbers.map(({ link, label }) => (
                <m.a
                  key={link}
                  href={link}
                  onClick={(event) => {
                    trackEvent("whatsapp_click", {
                      link_url: link,
                      page_path: window.location.pathname,
                      link_text:
                        event.currentTarget.textContent?.trim() || label,
                      location: "floating-button",
                    });
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <span
                    className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-75"
                    aria-hidden="true"
                  />
                  <WhatsAppIcon className="h-7 w-7" />
                </m.a>
              ))
            : null}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-5 left-5 z-40 sm:bottom-8 sm:left-8">
        <AnimatePresence>
          {showScrollTop ? (
            <m.div
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              className="relative flex h-12 w-12 items-center justify-center"
            >
              <svg
                viewBox="0 0 48 48"
                className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
                aria-hidden="true"
              >
                <circle
                  cx="24"
                  cy="24"
                  r={RING_RADIUS}
                  fill="none"
                  strokeWidth="3"
                  className="stroke-[color:var(--color-border)]"
                />
                <circle
                  cx="24"
                  cy="24"
                  r={RING_RADIUS}
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="stroke-[color:var(--color-gold)] transition-[stroke-dashoffset] duration-150 ease-linear"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={RING_CIRCUMFERENCE * (1 - scrollProgress)}
                />
              </svg>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="العودة إلى أعلى الصفحة"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-primary)] shadow-lg shadow-black/10 transition hover:text-[color:var(--color-gold)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19V5m0 0-6 6m6-6 6 6"
                  />
                </svg>
              </button>
            </m.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
