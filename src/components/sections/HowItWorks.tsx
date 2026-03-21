"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Step {
  icon: string;
  title: string;
  description: string;
}

interface HowItWorksProps {
  steps: Step[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export function HowItWorks({
  steps,
  ctaText,
  ctaHref,
  className,
}: HowItWorksProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className={cn("section-padding bg-bg-secondary", className)}>
      <div className="container-site">
        <SectionHeading
          title="How It Works"
          subtitle="Sell your property in three simple steps -- no fees, no hassle, no waiting."
        />

        <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Connecting lines (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[calc(33.33%+0.5rem)] right-[calc(33.33%+0.5rem)] h-0.5 bg-border" aria-hidden="true">
            <div className="absolute -right-1.5 -top-1 w-3 h-3 border-t-2 border-r-2 border-border rotate-45" />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative flex flex-col items-center text-center bg-bg-primary rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 border border-border-light group"
            >
              {/* Step number */}
              <div className="absolute -top-6 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary-dark text-primary-dark font-bold text-xl shadow-glow">
                {i + 1}
              </div>

              {/* Icon area */}
              <div className="mt-4 flex flex-shrink-0 items-center justify-center w-20 h-20 rounded-full bg-bg-tertiary border border-border-light text-primary group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl" role="img" aria-label={step.title}>
                  {step.icon}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-semibold text-text-primary">
                {step.title}
              </h3>
              <p className="mt-2 text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {ctaText && ctaHref && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary-light text-white font-bold text-lg px-10 py-7 rounded-xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <a href={ctaHref}>{ctaText}</a>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
