import { PAYMENT_METHODS } from "@/lib/legal";

type Method = (typeof PAYMENT_METHODS)[number];

/**
 * Small card-network marks drawn in HTML/SVG (no external assets), in the order
 * of PAYMENT_METHODS — the methods the hosted checkout actually accepts.
 */
function Mark({ method }: { method: Method }) {
  switch (method) {
    case "Visa":
      return <span className="text-[11px] font-black italic tracking-tight text-[#1A1F71]">VISA</span>;
    case "Mastercard":
      return (
        <svg viewBox="0 0 32 20" className="h-4 w-auto" aria-hidden>
          <circle cx="12" cy="10" r="7" fill="#EB001B" />
          <circle cx="20" cy="10" r="7" fill="#F79E1B" />
          <path d="M16 4.3a7 7 0 0 1 0 11.4 7 7 0 0 1 0-11.4z" fill="#FF5F00" />
        </svg>
      );
    case "American Express":
      return <span className="rounded-[3px] bg-[#1F72CD] px-1 text-[9px] font-extrabold tracking-tight text-white">AMEX</span>;
    case "Discover":
      return (
        <span className="flex items-center text-[9px] font-extrabold tracking-tight text-[#231F20]">
          DISC<span className="mx-[1px] inline-block h-2 w-2 rounded-full bg-[#F58220]" />VER
        </span>
      );
    case "Apple Pay":
      return (
        <span className="flex items-center gap-0.5 text-[11px] font-semibold text-black">
          <svg viewBox="0 0 14 17" className="h-3 w-auto" aria-hidden>
            <path
              fill="currentColor"
              d="M11.6 9c0-2 1.7-3 1.8-3-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.8-2.8-.8C3 4.4 1.7 5.2 1 6.5c-1.5 2.6-.4 6.4 1 8.5.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.7-.7 1.2 0 1.6.7 2.7.7s1.8-1 2.5-2c.8-1.2 1.1-2.3 1.1-2.4 0 0-2-.8-2-3.7zM9.5 3c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2z"
            />
          </svg>
          Pay
        </span>
      );
    case "Google Pay":
      return (
        <span className="flex items-center gap-0.5 text-[11px] font-semibold text-[#3C4043]">
          <span className="font-bold">
            <span className="text-[#4285F4]">G</span>
          </span>
          Pay
        </span>
      );
    default:
      return <span className="text-[10px] font-semibold">{method}</span>;
  }
}

export default function PaymentIcons({ className = "" }: { className?: string }) {
  return (
    <ul aria-label="Accepted payment methods" className={`flex flex-wrap items-center justify-center gap-1.5 ${className}`}>
      {PAYMENT_METHODS.map((m) => (
        <li
          key={m}
          title={m}
          className="flex h-7 min-w-[46px] items-center justify-center rounded-md border border-foreground/10 bg-white px-1.5"
        >
          <Mark method={m} />
          <span className="sr-only">{m}</span>
        </li>
      ))}
    </ul>
  );
}
