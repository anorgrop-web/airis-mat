type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CheckIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={className} {...stroke} strokeWidth={2.2}>
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

export function CrossIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={className} {...stroke} strokeWidth={2}>
      <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" />
    </svg>
  );
}

export function StarIcon({
  className = "h-4 w-4",
  filled = true,
}: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.8l-5.1 2.7 1-5.7-4.1-4 5.7-.8L10 1.8z" />
    </svg>
  );
}

export function PlusIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={className} {...stroke} strokeWidth={2}>
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}

export function MinusIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={className} {...stroke} strokeWidth={2}>
      <path d="M4 10h12" />
    </svg>
  );
}

export function ArrowIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={className} {...stroke} strokeWidth={2}>
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}

export function MenuIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke} strokeWidth={2}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke} strokeWidth={2}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function CartIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke} strokeWidth={1.8}>
      <path d="M3 4h2l2.4 11.2a1.5 1.5 0 001.5 1.2h8.6a1.5 1.5 0 001.5-1.2L21 8H6.2" />
      <circle cx="9.5" cy="20" r="1.3" />
      <circle cx="17.5" cy="20" r="1.3" />
    </svg>
  );
}
