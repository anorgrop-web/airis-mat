type SectionHeadingProps = {
  eyebrow?: string;
  headline: string;
  intro?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  headline,
  intro,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${
            light ? "text-white/80" : "text-primary-dark"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl font-bold leading-tight tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {headline}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? "text-white/85" : "text-muted"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
