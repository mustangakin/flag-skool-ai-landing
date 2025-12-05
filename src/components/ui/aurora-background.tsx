"use client";

import { cn } from "@/lib/utils";

import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  const whiteGradient = "repeating-linear-gradient(100deg, #ffffff 0%, #ffffff 7%, transparent 10%, transparent 12%, #ffffff 16%)";
  const darkGradient = "repeating-linear-gradient(100deg, #000000 0%, #000000 7%, transparent 10%, transparent 12%, #000000 16%)";
  const aurora = "repeating-linear-gradient(100deg, #3b82f6 10%, #818cf8 15%, #60a5fa 20%, #c4b5fd 25%, #60a5fa 30%)";

  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col  h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900  text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Light mode aurora */}
          <div
            className={cn(
              "pointer-events-none absolute -inset-[10px] opacity-50 will-change-transform filter blur-[10px] invert dark:hidden",
              showRadialGradient &&
                "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
            )}
            style={{
              backgroundImage: `${whiteGradient}, ${aurora}`,
              backgroundSize: "300%, 200%",
              backgroundPosition: "50% 50%, 50% 50%",
            }}
          >
            <div
              className="absolute inset-0 animate-aurora [background-attachment:fixed] mix-blend-difference"
              style={{
                backgroundImage: `${whiteGradient}, ${aurora}`,
                backgroundSize: "200%, 100%",
              }}
            />
          </div>
          {/* Dark mode aurora */}
          <div
            className={cn(
              "pointer-events-none absolute -inset-[10px] opacity-50 will-change-transform filter blur-[10px] hidden dark:block",
              showRadialGradient &&
                "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
            )}
            style={{
              backgroundImage: `${darkGradient}, ${aurora}`,
              backgroundSize: "300%, 200%",
              backgroundPosition: "50% 50%, 50% 50%",
            }}
          >
            <div
              className="absolute inset-0 animate-aurora [background-attachment:fixed] mix-blend-difference"
              style={{
                backgroundImage: `${darkGradient}, ${aurora}`,
                backgroundSize: "200%, 100%",
              }}
            />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
};

