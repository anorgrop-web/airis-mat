import type { ReactNode } from "react";

type ContainerProps = { children: ReactNode; className?: string };

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-container px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
