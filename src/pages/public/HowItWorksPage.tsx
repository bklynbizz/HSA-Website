import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTABlock } from "@/components/sections/CTABlock";
import { BackgroundPaths } from "@/components/ui/background-paths";

const steps = [
  {
    number: 1,
    title: "Tell Us About Your Property",
    subtitle: "It takes less than 2 minutes",
    description:
      "Fill out our simple online form or give us a call. We just need basic information about your property: the address, general condition, and a little about your situation. There is no paperwork, no commitment, and no pressure.",
    details: [
      "Submit your property details online or call us directly",
      "No sensitive financial information required at this stage",
      "We will confirm receipt and let you know next steps within an hour",
      "Available 7 days a week to take your call or answer questions",
    ],
  },
  {
    number: 2,
    title: "Receive Your Fair Cash Offer",
    subtitle: "Within 24 hours, guaranteed",
    description:
      "Our team evaluates your property using current market data, comparable sales, and our experience purchasing hundreds of properties. Within 24 hours, we present a fair, no-obligation cash offer. No surprises, no hidden fees.",
    details: [
      "We research comparable sales and current market conditions",
      "Our offer accounts for property condition so you do not need repairs",
      "The offer amount is the amount you receive — zero fees deducted",
      "Take your time reviewing — there is never pressure to accept",
    ],
  },
  {
    number: 3,
    title: "Close on Your Timeline",
    subtitle: "As fast as 7 days or on your schedule",
    description:
      "Once you accept, you pick the closing date. We work with a reputable local title company to handle all the paperwork. On closing day, you sign a few documents and receive your cash. That is it.",
    details: [
      "You choose the closing date that works for your situation",
      "We coordinate everything with the title company",
      "All standard closing costs are covered by us",
      "Receive funds via wire transfer or cashier's check on closing day",
    ],
  },
];

const processFaqs = [
  {
    question: "What information do I need to provide upfront?",
    answer:
      "Just the basics: your property address, a general description of its condition, and your contact information. We do not need extensive documentation to make an initial offer. If we move forward, we will handle the title search and any other due diligence.",
  },
  {
    question: "How do you calculate the offer price?",
    answer:
      "We analyze recent comparable sales in your area, factor in the property condition and any needed repairs, and apply current market conditions. Our goal is to present a competitive offer that is fair to both parties. We are happy to walk you through our numbers.",
  },
  {
    question: "Is there a property inspection?",
    answer:
      "We typically do a brief walkthrough of the property, but this is not a formal inspection. We are not looking for reasons to reduce our offer. The walkthrough simply confirms the general condition described and helps us finalize the details.",
  },
  {
    question: "Can I still live in the house until closing?",
    answer:
      "Absolutely. You can remain in the property until closing day. In some cases, we can even offer a rent-back arrangement if you need extra time after closing. Just let us know your needs and we will work to accommodate.",
  },
  {
    question: "What happens if I accept the offer and then change my mind?",
    answer:
      "We understand that selling a property is a significant decision. You can cancel at any time before closing with no penalties and no obligations. We want you to be fully comfortable with your decision.",
  },
  {
    question: "Who pays the closing costs?",
    answer:
      "We cover all standard closing costs. The cash offer we present is the net amount you receive. There are no deductions for title fees, escrow charges, or transfer taxes.",
  },
];

export default function HowItWorksPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" });

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <BackgroundPaths 
        title="How It Works" 
        subtitle="Selling your property for cash is simple. Three steps, zero stress, and you pick the closing date." 
      />

      {/* Timeline */}
      <section className="section-padding">
        <div className="container-site">
          <SectionHeading
            title="Your Simple 3-Step Process"
            subtitle="From first contact to cash in hand, here is exactly what to expect."
          />

          <div ref={timelineRef} className="relative max-w-4xl mx-auto">
            {/* Vertical line (mobile) / horizontal (desktop) */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-border" />
            <div className="md:hidden absolute top-0 bottom-0 left-8 w-0.5 bg-border" />

            {/* Desktop: horizontal layout */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 relative">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 32 }}
                  animate={
                    timelineInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 32 }
                  }
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="text-center"
                >
                  {/* Circle */}
                  <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary text-white border-4 border-bg-primary shadow-lg">
                    <span className="text-3xl font-bold">{step.number}</span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-secondary">
                    {step.subtitle}
                  </p>
                  <p className="mt-3 text-text-secondary leading-relaxed text-sm">
                    {step.description}
                  </p>

                  <ul className="mt-4 space-y-2 text-left">
                    {step.details.map((detail, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <svg
                          className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Mobile: vertical layout */}
            <div className="md:hidden space-y-12">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -24 }}
                  animate={
                    timelineInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -24 }
                  }
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="relative pl-20"
                >
                  {/* Circle */}
                  <div className="absolute left-0 top-0 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white border-4 border-bg-primary shadow-lg">
                    <span className="text-xl font-bold">{step.number}</span>
                  </div>

                  <h3 className="text-xl font-bold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-secondary">
                    {step.subtitle}
                  </p>
                  <p className="mt-3 text-text-secondary leading-relaxed">
                    {step.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {step.details.map((detail, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <svg
                          className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect FAQ */}
      <FAQSection
        faqs={processFaqs}
        heading="What to Expect"
        subtext="Common questions about the selling process, answered clearly."
        className="bg-bg-secondary"
      />

      <CTABlock
        headline="Ready to Get Started?"
        subtext="Tell us about your property and receive a fair cash offer within 24 hours. It all begins with one simple step."
        ctaText="Get My Free Cash Offer"
        ctaHref="/get-offer"
        phoneNumber="(866) 793-4155"
      />
    </motion.main>
  );
}
