type IconProps = { className?: string };

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.5c0-.87.24-1.46 1.5-1.46h1.6V4.35C16.3 4.24 15.4 4.15 14.35 4.15c-2.4 0-4.05 1.47-4.05 4.16V10.5H7.8v3h2.5V21h3.2Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TiktokIcon({ className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.5 3c.4 2.2 2 3.8 4.2 4.1v3.1c-1.6 0-3-.5-4.2-1.4v6.6c0 3.4-2.7 6.1-6.1 6.1S4.3 18.7 4.3 15.3c0-3.3 2.6-6 5.9-6.1v3.2c-1.6.1-2.9 1.4-2.9 3 0 1.6 1.3 3 3 3s3-1.3 3-3V3h3.2Z" />
    </svg>
  );
}
