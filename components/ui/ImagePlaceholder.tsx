import Image from "next/image";
import type { CSSProperties } from "react";

type ImagePlaceholderProps = {
  /** Describe exactly what image should go here — used as alt text / visible label. */
  label: string;
  /** Real asset URL. When given, the media replaces the gray placeholder. `.mp4`/`.webm` render as a looping video. */
  src?: string;
  /** CSS aspect-ratio value, e.g. "16/9", "1/1", "4/5". Ignored when `fill` is true. */
  aspectRatio?: string;
  /** Stretch to fill the parent (parent must be positioned with a fixed size). */
  fill?: boolean;
  /** Tailwind border-radius class (default: rounded-2xl). */
  rounded?: string;
  /** next/image `sizes` hint for responsive loading. */
  sizes?: string;
  /** Preload — use for above-the-fold media only. */
  priority?: boolean;
  className?: string;
};

const isVideo = (src: string) => /\.(mp4|webm)(\?|$)/i.test(src);

/**
 * Media slot. Renders the real asset when `src` is provided, otherwise a light-gray
 * placeholder with the label so it is obvious which asset still needs to be generated.
 */
export default function ImagePlaceholder({
  label,
  src,
  aspectRatio = "4/3",
  fill = false,
  rounded = "rounded-2xl",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  className = "",
}: ImagePlaceholderProps) {
  const style: CSSProperties = fill ? {} : { aspectRatio };
  const box = [
    fill ? "absolute inset-0 h-full w-full" : "relative w-full",
    "overflow-hidden",
    rounded,
    className,
  ];

  if (src) {
    return (
      <div style={style} className={[...box, "bg-placeholder"].join(" ")}>
        {isVideo(src) ? (
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={label}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image src={src} alt={label} fill sizes={sizes} priority={priority} className="object-cover" />
        )}
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      style={style}
      className={[
        ...box,
        "flex items-center justify-center",
        "bg-placeholder text-muted",
        "border border-dashed border-[#C9D1D3]",
      ].join(" ")}
    >
      {/* Subtle diagonal pattern so the block reads as a placeholder */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 14px, rgba(44,62,66,0.06) 14px 15px)",
        }}
      />
      <span className="relative z-10 max-w-[85%] px-3 text-center text-xs font-medium leading-snug sm:text-sm">
        <span className="mb-1 block text-[10px] uppercase tracking-widest opacity-60">Image</span>
        {label}
      </span>
    </div>
  );
}
