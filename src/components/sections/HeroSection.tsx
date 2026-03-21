"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeroStat {
  value: string;
  label: string;
}

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  phoneNumber?: string;
  stats?: HeroStat[];
  backgroundImage?: string;
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function HeroSection({
  headline,
  subheadline,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  phoneNumber,
  stats,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      )}
      <div className="gradient-hero-overlay absolute inset-0" aria-hidden="true" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container-site w-full">
          <motion.div
            className="max-w-4xl"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-balance tracking-tight"
            >
              <span className="text-white">Sell Your Property </span>
              <span className="gradient-text">Fast for Cash</span><br/>
              <span className="text-white text-4xl md:text-5xl lg:text-6xl font-semibold opacity-90 mt-2 block">— No Repairs, No Fees, No Hassle</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 text-xl text-white/90 max-w-2xl font-medium leading-relaxed"
            >
              {subheadline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row items-center gap-5"
            >
              <Button asChild size="lg" className="w-full sm:w-auto bg-secondary text-primary-dark hover:bg-secondary-light font-bold text-lg px-10 py-7 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:-translate-y-1 transition-all duration-300">
                <a href={ctaHref}>{ctaText}</a>
              </Button>
              {secondaryCtaText && secondaryCtaHref && (
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto border-2 border-white/60 text-white bg-white/5 hover:bg-white/15 backdrop-blur-sm font-semibold text-lg px-10 py-7 rounded-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <a href={secondaryCtaHref}>{secondaryCtaText}</a>
                </Button>
              )}
            </motion.div>

            {phoneNumber && (
              <motion.div variants={fadeUp} className="mt-6">
                <a
                  href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-lg"
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
                  <span className="font-semibold">{phoneNumber}</span>
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Trust strip */}
      {stats && stats.length > 0 && (
        <motion.div
          className="relative z-10 glass-dark border-t-0 my-8 mx-4 sm:mx-8 lg:mx-auto lg:max-w-6xl rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <div className="py-8 px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
