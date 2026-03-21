"use client";

import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  heading?: string;
  subtext?: string;
  className?: string;
}

export function FAQSection({
  faqs,
  heading = "Frequently Asked Questions",
  subtext,
  className,
}: FAQSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className={cn("section-padding", className)}>
      <div className="container-site">
        <div className="max-w-3xl mx-auto">
          <SectionHeading title={heading} subtitle={subtext} />

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-xl border border-border-light bg-bg-primary px-6 shadow-subtle hover:shadow-card transition-shadow duration-300 overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-bold text-lg text-text-primary py-6 hover:no-underline group">
                    <span className="group-hover:text-primary transition-colors">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-text-secondary leading-relaxed pb-6 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
