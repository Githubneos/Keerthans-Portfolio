interface GridBackdropProps {
  className?: string
}

/** Masked engineering grid with a slow scanline. Decorative; use inside a `relative overflow-hidden` parent. */
export function GridBackdrop({ className }: GridBackdropProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`} aria-hidden="true">
      <div className="grid-bg absolute inset-0" />
      <div className="animate-scan absolute inset-x-0 h-24 bg-linear-to-b from-transparent via-cyan/10 to-transparent" />
    </div>
  )
}
