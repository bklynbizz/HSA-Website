"use client";

import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface ComparisonRow {
  feature: string;
  traditional: string;
  us: string;
}

interface BenefitsSectionProps {
  benefits: Benefit[];
  comparisonData?: ComparisonRow[];
  className?: string;
}

const defaultComparison: ComparisonRow[] = [
  { feature: "Timeline", traditional: "3-6 months", us: "7-14 days" },
  { feature: "Fees", traditional: "6% agent commissions", us: "Zero fees" },
  { feature: "Repairs", traditional: "Required before listing", us: "None needed" },
  { feature: "Certainty", traditional: "Deals fall through", us: "Guaranteed offer" },
  { feature: "Hassle", traditional: "Showings & open houses", us: "One simple visit" },
];

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-5 h-5", className)} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-5 h-5", className)} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function BenefitsSection({
  benefits,
  comparisonData,
  className,
}: BenefitsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const rows = comparisonData ?? defaultComparison;

  return (
    <section className={cn("section-padding bg-bg-secondary", className)}>
      <div className="container-site">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Benefits list */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -32 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Why Choose Home Sellers Amigo
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-secondary" aria-hidden="true" />

            <ul className="mt-8 space-y-6">
              {benefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-sm shadow-accent/20">
                    <CheckIcon />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary text-lg group-hover:text-primary transition-colors">{benefit.title}</h3>
                    <p className="mt-1 text-text-secondary leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Comparison table */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="rounded-2xl border border-border-light bg-bg-primary shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden relative"
          >
            {/* Table header */}
            <div className="grid grid-cols-3 text-center text-sm font-bold uppercase tracking-wide">
              <div className="p-5 bg-bg-tertiary text-text-secondary border-b border-border-light">Feature</div>
              <div className="p-5 bg-bg-tertiary text-text-secondary border-b border-border-light border-x">Traditional Sale</div>
              <div className="p-5 bg-gradient-to-r from-primary to-primary-light text-white border-b border-primary-light shadow-inner">Sell to Us</div>
            </div>

            {/* Table rows */}
            {rows.map((row, i) => (
              <div
                key={i}
                className={cn(
                  "grid grid-cols-3 text-center text-sm transition-colors",
                  i % 2 === 0 ? "bg-bg-primary" : "bg-bg-secondary/40",
                  "hover:bg-bg-tertiary"
                )}
              >
                <div className="p-5 font-semibold text-text-primary text-left pl-6 border-b border-border-light">
                  {row.feature}
                </div>
                <div className="p-5 text-text-secondary flex items-center justify-center gap-1.5 border-b border-l border-border-light relative overflow-hidden">
                  <XIcon className="text-error flex-shrink-0 opacity-70" />
                  <span className="opacity-90">{row.traditional}</span>
                </div>
                <div className="p-5 flex items-center justify-center gap-1.5 bg-accent/10 border-b border-l border-border-light font-bold">
                  <CheckIcon className="text-accent flex-shrink-0 drop-shadow-sm" />
                  <span className="text-primary-dark">{row.us}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
