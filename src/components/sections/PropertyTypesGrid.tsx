"use client";

import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface PropertyType {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

interface PropertyTypesGridProps {
  types: PropertyType[];
  className?: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export function PropertyTypesGrid({ types, className }: PropertyTypesGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className={cn("section-padding", className)}>
      <div className="container-site">
        <SectionHeading
          title="What We Buy"
          subtitle="We purchase all types of residential and commercial properties in any condition."
        />

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {types.map((type, i) => (
            <motion.a
              key={i}
              href={type.href}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="group flex flex-col items-center text-center rounded-2xl border border-border-light bg-bg-primary p-8 transition-all duration-300 shadow-subtle hover:shadow-card hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Decorative hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              
              <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-bg-tertiary border border-border-light transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-secondary group-hover:to-secondary-dark group-hover:border-transparent group-hover:shadow-glow">
                <span className="text-3xl inline-block transition-transform duration-300 group-hover:animate-wiggle" role="img" aria-label={type.title}>
                  {type.icon}
                </span>
              </div>
              <h3 className="relative z-10 mt-5 text-xl font-bold text-text-primary group-hover:text-primary-dark transition-colors duration-300">
                {type.title}
              </h3>
              <p className="relative z-10 mt-2 text-text-secondary leading-relaxed">
                {type.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
