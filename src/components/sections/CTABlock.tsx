"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CTABlockProps {
  headline: string;
  subtext?: string;
  ctaText: string;
  ctaHref: string;
  phoneNumber?: string;
  variant?: "dark" | "light";
  className?: string;
}

export function CTABlock({
  headline,
  subtext,
  ctaText,
  ctaHref,
  phoneNumber,
  variant = "dark",
  className,
}: CTABlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "section-padding relative overflow-hidden",
        isDark ? "bg-gradient-to-br from-primary-dark via-primary to-primary-light" : "bg-bg-tertiary border-y border-border",
        className
      )}
    >
      {/* Decorative element for dark variant */}
      {isDark && (
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-secondary opacity-10 blur-3xl" aria-hidden="true" />
      )}
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="container-site text-center relative z-10"
      >
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold",
            isDark ? "text-white" : "text-text-primary"
          )}
        >
          {headline}
        </h2>

        {subtext && (
          <p
            className={cn(
              "mt-4 text-lg max-w-2xl mx-auto",
              isDark ? "text-white/80" : "text-text-secondary"
            )}
          >
            {subtext}
          </p>
        )}

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Button
            asChild
            size="lg"
            className={cn(
              "font-bold text-lg px-10 py-7 rounded-xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300",
              isDark
                ? "bg-secondary text-primary-dark shadow-glow hover:bg-secondary-light"
                : "bg-primary text-white hover:bg-primary-light"
            )}
          >
            <a href={ctaHref}>{ctaText}</a>
          </Button>

          {phoneNumber && (
            <a
              href={`tel:${phoneNumber.replace(/\D/g, "")}`}
              className={cn(
                "inline-flex items-center gap-2 text-lg font-semibold transition-colors",
                isDark
                  ? "text-white/90 hover:text-white"
                  : "text-primary hover:text-primary-light"
              )}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {phoneNumber}
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
