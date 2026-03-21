"use client";

import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Testimonial {
  name: string;
  location: string;
  propertyType: string;
  quote: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  heading?: string;
  className?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={cn("w-5 h-5", i < rating ? "text-secondary" : "text-border")}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export function TestimonialsSection({
  testimonials,
  heading = "What Our Clients Say",
  className,
}: TestimonialsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className={cn("section-padding bg-bg-tertiary", className)}>
      <div className="container-site">
        <SectionHeading title={heading} />

        {/* Desktop grid / Mobile scroll */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-md:flex max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:-mx-6 max-md:px-6 max-md:pb-4"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative flex flex-col rounded-2xl border border-border-light bg-bg-primary p-8 shadow-card hover:shadow-card-hover transition-all duration-300 max-md:min-w-[300px] max-md:snap-center max-md:flex-shrink-0"
            >
              {/* Decorative quote mark */}
              <div className="absolute -top-3 left-6 text-5xl font-serif text-secondary leading-none select-none" aria-hidden="true">
                &ldquo;
              </div>

              <div className="mt-4">
                <StarRating rating={testimonial.rating} />
              </div>

              <blockquote className="mt-4 flex-1 text-text-secondary italic leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="font-semibold text-text-primary">
                  {testimonial.name}
                </div>
                <div className="text-sm text-text-muted">
                  {testimonial.location} &middot; {testimonial.propertyType}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
