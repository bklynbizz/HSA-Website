import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { StatsCounter } from "@/components/sections/StatsCounter";
import { CTABlock } from "@/components/sections/CTABlock";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackgroundPaths } from "@/components/ui/background-paths";

const stats = [
  { value: 500, suffix: "+", label: "Properties Purchased" },
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "M+", label: "Dollars Paid to Sellers" },
  { value: 4.9, label: "Average Google Rating" },
];


const values = [
  {
    title: "Integrity",
    icon: "🤝",
    description:
      "We believe in honest, transparent dealings. Every offer we make is backed by real numbers and a genuine commitment to fairness. We will never pressure you into a decision.",
  },
  {
    title: "Speed",
    icon: "⚡",
    description:
      "Time matters when you need to sell. Our streamlined process delivers cash offers in 24 hours and can close in as few as 7 days, because your timeline is our priority.",
  },
  {
    title: "Fairness",
    icon: "⚖️",
    description:
      "Every property owner deserves a fair deal. We use current market data and property analysis to ensure our offers reflect true value, and we never charge fees or commissions.",
  },
];

export default function AboutPage() {
  const missionRef = useRef<HTMLDivElement>(null);
  const missionInView = useInView(missionRef, { once: true, margin: "-80px" });
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero Banner */}
      <BackgroundPaths 
        title="About Home Sellers Amigo" 
        subtitle="A trusted Texas real estate investment company helping homeowners sell their properties quickly, fairly, and on their own terms." 
      />

      {/* Mission Statement */}
      <section className="section-padding">
        <div className="container-site">
          <motion.div
            ref={missionRef}
            initial={{ opacity: 0, y: 32 }}
            animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                Our Mission
              </h2>
              <div className="mt-4 h-1 w-16 rounded-full bg-secondary" />
              <p className="mt-6 text-text-secondary leading-relaxed">
                At Home Sellers Amigo, we believe selling your home should not be
                stressful, expensive, or drawn out over months. We founded this
                company to give property owners a better option: a direct cash
                sale with no agent commissions, no repair requirements, and no
                uncertainty.
              </p>
              <p className="mt-4 text-text-secondary leading-relaxed">
                Whether you are facing foreclosure, dealing with an inherited
                property, relocating for work, or simply ready to move on, we
                provide a straightforward path to selling your property. Our team
                has purchased over 500 properties across the US, and every
                transaction is built on the same foundation of honesty,
                efficiency, and respect for the people we work with.
              </p>
              <Button asChild className="mt-6" variant="primary">
                <Link to="/get-offer">Get Your Free Cash Offer</Link>
              </Button>
            </div>

            {/* Image placeholder */}
            <div className="aspect-[4/3] rounded-xl bg-bg-secondary border border-border flex items-center justify-center">
              <div className="text-center text-text-muted">
                <svg
                  className="mx-auto h-16 w-16 opacity-40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                  />
                </svg>
                <p className="mt-2 text-sm">Team / Office Photo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter stats={stats} className="bg-bg-secondary" />


      {/* Values */}
      <section className="section-padding bg-bg-secondary">
        <div className="container-site">
          <SectionHeading
            title="Our Core Values"
            subtitle="The principles that guide every interaction and transaction."
          />

          <div
            ref={valuesRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
              >
                <Card className="h-full text-center p-8">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-bg-tertiary">
                    <span className="text-3xl" role="img" aria-label={value.title}>
                      {value.icon}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-text-secondary leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        headline="Ready to Work With a Team You Can Trust?"
        subtext="Get a fair, no-obligation cash offer for your property today. We are here to help."
        ctaText="Get My Free Cash Offer"
        ctaHref="/get-offer"
        phoneNumber="(866) 793-4155"
      />
    </motion.main>
  );
}
