/**
 * Eyegis Wordmark — mono, recreated as an inline SVG.
 * Uses currentColor so it inherits from parent (works on light + dark).
 * A minimal eye mark sits before the wordmark, echoing the brand's
 * "engineered for vision" language.
 */
export function Logo({
  className,
  showMark = true,
  title = "Eyegis",
}: {
  className?: string;
  showMark?: boolean;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 260 44"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>

      {showMark && (
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {/* almond eye */}
          <path d="M4 22 C 12 10, 30 10, 38 22 C 30 34, 12 34, 4 22 Z" />
          {/* iris */}
          <circle cx="21" cy="22" r="5.2" fill="currentColor" stroke="none" />
          {/* highlight */}
          <circle cx="23.2" cy="20.2" r="1.1" fill="var(--color-background, #F9F9F9)" stroke="none" />
        </g>
      )}

      {/* Wordmark — Montserrat, wide tracking, letters as text for crisp rendering */}
      <text
        x={showMark ? 54 : 0}
        y="29"
        fill="currentColor"
        style={{
          fontFamily:
            "Montserrat, ui-sans-serif, system-ui, sans-serif",
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: "0.32em",
        }}
      >
        EYEGIS
      </text>
    </svg>
  );
}

export default Logo;
