import Image from "next/image";
import { ASSETS } from "@/lib/assets";
import { BRAND } from "@/lib/constants";

/** Brand logo — fixed height, natural width, so the lockup is never cropped. */
export default function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <Image
      src={ASSETS.logo}
      alt={BRAND.logoLabel}
      width={0}
      height={0}
      sizes="240px"
      priority
      className={`${className} w-auto`}
    />
  );
}
