"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorClassName?: string;
    tokensSold: number;
    totalTokens: number;
  }
>(
  (
    {
      className,
      value,
      indicatorClassName,
      tokensSold,
      totalTokens,
      ...props
    },
    ref
  ) => {
    const progressPercentage = totalTokens > 0 ? (tokensSold / totalTokens) * 100 : 0;
    const dynamicTokensSold = Math.round(tokensSold);

    return (
      <div className="relative w-full">
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(
            "relative h-2 w-full overflow-hidden rounded-full",
            className
          )}
          {...props}
        >
          {/* Progress bar indicator */}
          <ProgressPrimitive.Indicator
            className={cn(
              "h-full w-full flex-1 transition-all duration-500 ease-in-out",
              indicatorClassName
            )}
            style={{
              transform: `translateX(-${100 - progressPercentage}%)`,
            }}
          />
        </ProgressPrimitive.Root>

        {/* White dot */}
        {tokensSold !== undefined && (
          <div
            className="absolute top-1/2 -translate-y-1/2 bg-white rounded-full"
            style={{
              width: "24px",
              height: "24px",
              left: `calc(${progressPercentage}% - 12px)`,
            }}
          />
        )}

        {/* Tooltip */}
        {tokensSold !== undefined && (
          <div
            className="absolute top-8 ml-8 break-words flex-wrap transform"
            style={{
              left: `calc(${progressPercentage}% - 50px)`,
            }}
          >
            <div className="bg-[#2a2a2a] border border-gray-500 border-opacity-40 break-words flex-wrap  rounded-xl py-1 px-2 shadow-lg">
              <div className="text-center">
                <div className="text-xs md:text-sm font-bold text-white">
                  {dynamicTokensSold.toLocaleString()} UCC
                </div>
                <div className="text-[8px] md:text-xs text-gray-400">
                  TOKENS SOLD
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };