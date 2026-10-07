interface AuroraProps {
  className?: string
}

/** Drifting blurred gradient blobs. Decorative; place inside a `relative overflow-hidden` parent. */
export function Aurora({ className }: AuroraProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`} aria-hidden="true">
      <div className="animate-aurora absolute -left-1/4 -top-1/3 h-[60vmax] w-[60vmax] rounded-full bg-violet/25 blur-[120px]" />
      <div
        className="animate-aurora absolute -right-1/4 top-1/4 h-[50vmax] w-[50vmax] rounded-full bg-cyan/15 blur-[120px]"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="animate-aurora absolute bottom-[-30%] left-1/3 h-[40vmax] w-[40vmax] rounded-full bg-signal/10 blur-[120px]"
        style={{ animationDelay: '-12s' }}
      />
    </div>
  )
}
