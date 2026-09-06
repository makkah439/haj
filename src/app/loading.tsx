export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--color-background)]">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[color:var(--color-border)] border-t-[color:var(--color-primary)]" />
    </div>
  );
}
