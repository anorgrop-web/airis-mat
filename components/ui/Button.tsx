import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = BaseProps & { href: string; onClick?: never; type?: never };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-white shadow-soft hover:shadow-lg hover:brightness-105 active:brightness-95",
  secondary: "bg-foreground text-white hover:bg-[#1F2F33] active:bg-foreground",
  ghost:
    "border border-foreground/15 bg-white/70 text-foreground hover:border-primary hover:text-primary-dark",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = [base, variants[variant], sizes[size], className].join(" ");

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  // Strip our own props so they don't land on the DOM element
  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
