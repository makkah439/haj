"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  location: string;
};

function getEventName(
  href: string | undefined,
): "whatsapp_click" | "phone_click" | null {
  if (href?.startsWith("tel:")) return "phone_click";
  if (
    /^(https:\/\/)?(www\.)?(wa\.me|api\.whatsapp\.com)|^whatsapp:\/\//i.test(
      href ?? "",
    )
  )
    return "whatsapp_click";
  return null;
}

export default function TrackedLink({
  children,
  href,
  location,
  onClick,
  ...props
}: TrackedLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const eventName = getEventName(href);
    if (!eventName) return;

    const pagePath = window.location.pathname;
    if (eventName === "phone_click") {
      trackEvent(eventName, {
        phone_number: href?.replace(/^tel:/, ""),
        page_path: pagePath,
        link_text: event.currentTarget.textContent?.trim() || undefined,
        location,
      });
      return;
    }

    trackEvent(eventName, {
      link_url: href,
      page_path: pagePath,
      link_text: event.currentTarget.textContent?.trim() || undefined,
      location,
    });
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
