type IconProps = { className?: string };

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const
};

export function CompassIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5Z" />
    </svg>
  );
}

export function GroupIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 14c2.4.2 4 1.9 4.2 4.4" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5 19 6.5v5c0 4.5-3 7.7-7 8.9-4-1.2-7-4.4-7-8.9v-5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 5c0 8 6.5 14.5 14.5 14.5l1-3.5-4.2-1.5-1.3 1.3a11 11 0 0 1-6.3-6.3l1.3-1.3L8 3.5 4.5 5Z" />
    </svg>
  );
}

export function DocumentIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 3.5h7l3.5 3.5V20a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5Z" />
      <path d="M14 3.5V7h3.5" />
      <path d="M9 12h6M9 15.5h6" />
    </svg>
  );
}

export function StarTagIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5 13.8 9l5.7.1-4.6 3.5 1.7 5.4L12 14.8 7.4 18l1.7-5.4-4.6-3.5L10.2 9 12 3.5Z" />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
    </svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 12 3.5a6.5 6.5 0 0 1 6.5 6.5c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function HeartHandIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 20s-6.5-4-8.5-8.2C2.2 8.8 4 6 7 6c1.7 0 2.9.9 3.5 1.8L12 9.4l1.5-1.6C14.1 6.9 15.3 6 17 6c3 0 4.8 2.8 3.5 5.8C18.5 16 12 20 12 20Z" />
    </svg>
  );
}

export function KaabaIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="4.5" width="14" height="15" rx="1" />
      <path d="M5 9h14" />
      <rect x="10" y="14" width="4" height="5.5" rx="0.5" />
    </svg>
  );
}

export function CrescentMoonIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M20 13.5A8.5 8.5 0 1 1 10.5 4a7 7 0 0 0 9.5 9.5Z" />
    </svg>
  );
}

export function MosqueIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5.5 20.5c0-4 2.8-6.7 6.5-6.7s6.5 2.7 6.5 6.7" />
      <path d="M4 20.5h16" />
      <path d="M12 13.8V10M10.4 10.9 12 9l1.6 1.9" />
    </svg>
  );
}
