type IconProps = { className?: string };

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.5c0-.87.24-1.46 1.5-1.46h1.6V4.35C16.3 4.24 15.4 4.15 14.35 4.15c-2.4 0-4.05 1.47-4.05 4.16V10.5H7.8v3h2.5V21h3.2Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className={className}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TiktokIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M16.5 3c.4 2.2 2 3.8 4.2 4.1v3.1c-1.6 0-3-.5-4.2-1.4v6.6c0 3.4-2.7 6.1-6.1 6.1S4.3 18.7 4.3 15.3c0-3.3 2.6-6 5.9-6.1v3.2c-1.6.1-2.9 1.4-2.9 3 0 1.6 1.3 3 3 3s3-1.3 3-3V3h3.2Z" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M21.6 7.2a2.9 2.9 0 0 0-2.04-2.05C17.76 4.65 12 4.65 12 4.65s-5.76 0-7.56.5A2.9 2.9 0 0 0 2.4 7.2 30 30 0 0 0 1.9 12a30 30 0 0 0 .5 4.8 2.9 2.9 0 0 0 2.04 2.05c1.8.5 7.56.5 7.56.5s5.76 0 7.56-.5a2.9 2.9 0 0 0 2.04-2.05 30 30 0 0 0 .5-4.8 30 30 0 0 0-.5-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}
