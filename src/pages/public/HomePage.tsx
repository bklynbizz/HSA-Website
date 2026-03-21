import { motion } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PropertyTypesGrid } from "@/components/sections/PropertyTypesGrid";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTABlock } from "@/components/sections/CTABlock";

const heroStats = [
  { value: "500+", label: "Properties Purchased" },
  { value: "7", label: "Day Average Close" },
  { value: "$0", label: "Fees or Commissions" },
  { value: "4.9", label: "Google Rating" },
];

const howItWorksSteps = [
  {
    icon: "📋",
    title: "Tell Us About Your Property",
    description:
      "Fill out our simple form or give us a call. Share a few details about your property and we will get started right away.",
  },
  {
    icon: "💰",
    title: "Receive Your Fair Cash Offer",
    description:
      "Within 24 hours, we will present you with a no-obligation cash offer based on current market conditions and your property details.",
  },
  {
    icon: "🔑",
    title: "Close on Your Timeline",
    description:
      "Pick a closing date that works for you. We can close in as few as 7 days or on your schedule. You choose.",
  },
];

const propertyTypes = [
  {
    icon: "🏠",
    title: "Houses",
    description: "Any condition, any situation",
    href: "/what-we-buy#houses",
  },
  {
    icon: "🌿",
    title: "Vacant Land",
    description: "Residential and commercial lots",
    href: "/what-we-buy#vacant-land",
  },
  {
    icon: "🏚️",
    title: "Foreclosures",
    description: "Avoid foreclosure with a fast sale",
    href: "/what-we-buy#foreclosures",
  },
  {
    icon: "📜",
    title: "Probate Properties",
    description: "Simplify the probate process",
    href: "/what-we-buy#probate",
  },
  {
    icon: "🏡",
    title: "Inherited Homes",
    description: "Sell inherited property quickly",
    href: "/what-we-buy#inherited",
  },
  {
    icon: "🔑",
    title: "Rental Properties",
    description: "Tired landlords welcome",
    href: "/what-we-buy#rentals",
  },
  {
    icon: "🔧",
    title: "Distressed Properties",
    description: "Fire, water, storm damage",
    href: "/what-we-buy#distressed",
  },
  {
    icon: "🏘️",
    title: "Mobile Homes",
    description: "With or without land",
    href: "/what-we-buy#mobile-homes",
  },
];

const benefits = [
  {
    icon: "⚡",
    title: "Close in as Few as 7 Days",
    description:
      "Skip the months of waiting. We have the funds ready and can close on your timeline, sometimes in under a week.",
  },
  {
    icon: "🚫",
    title: "Zero Fees or Commissions",
    description:
      "No agent commissions, no closing costs, no hidden fees. The offer we make is the amount you take home.",
  },
  {
    icon: "🔨",
    title: "No Repairs Needed",
    description:
      "Sell your property exactly as-is. We buy houses in any condition, from move-in ready to major fixer-uppers.",
  },
  {
    icon: "📝",
    title: "No Obligation Offer",
    description:
      "Receive a fair cash offer with absolutely no pressure and no obligation. Take your time to decide what is right for you.",
  },
  {
    icon: "🤝",
    title: "We Handle the Paperwork",
    description:
      "Our team manages every step of the closing process so you can focus on your next chapter.",
  },
  {
    icon: "🔒",
    title: "Guaranteed Closing",
    description:
      "No financing contingencies. No last-minute surprises. When we make an offer, we close. Period.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    location: "Jersey City, NJ",
    propertyType: "Inherited Home",
    quote:
      "After my mother passed, dealing with her house was overwhelming. Home Sellers Amigo made a fair offer and handled everything. We closed in 10 days and I could finally focus on my family.",
    rating: 5,
  },
  {
    name: "James R.",
    location: "Austin, TX",
    propertyType: "Rental Property",
    quote:
      "I was tired of being a landlord and dealing with tenants. They bought my rental property quickly, even with tenants still in place. The whole process was smooth and professional.",
    rating: 5,
  },
  {
    name: "Maria G.",
    location: "Houston, TX",
    propertyType: "Foreclosure",
    quote:
      "I was facing foreclosure and felt hopeless. They gave me a cash offer within 24 hours and we closed before the bank could take my home. They truly saved my credit.",
    rating: 5,
  },
  {
    name: "David & Lisa T.",
    location: "Dallas, TX",
    propertyType: "Distressed Property",
    quote:
      "Our house had major foundation issues and no buyer would touch it. Home Sellers Amigo bought it as-is and gave us a fair price. No repairs, no inspections, no headaches.",
    rating: 5,
  },
  {
    name: "Robert K.",
    location: "Fort Worth, TX",
    propertyType: "Vacant Land",
    quote:
      "I had vacant land sitting for years with no offers. They purchased it in two weeks. I wish I had contacted them sooner. Highly recommend for land sellers.",
    rating: 4,
  },
];

const faqs = [
  {
    question: "How do you determine your offer price?",
    answer:
      "We evaluate your property based on its current condition, location, comparable sales in the area, and needed repairs. Our goal is to present a fair, competitive cash offer that reflects true market value while accounting for the speed and convenience we provide.",
  },
  {
    question: "Are there any fees or commissions?",
    answer:
      "Absolutely not. There are zero fees, zero commissions, and zero closing costs when you sell to us. The cash offer we present is the amount you walk away with at closing. We cover all standard closing costs.",
  },
  {
    question: "How quickly can you close?",
    answer:
      "We can close in as few as 7 days. However, we work on your timeline. If you need more time, we are happy to accommodate. You pick the closing date that works best for your situation.",
  },
  {
    question: "Do I need to make repairs before selling?",
    answer:
      "No repairs are necessary. We buy properties in any condition, whether they need cosmetic updates, major renovations, or even have code violations. Sell your property exactly as it is today.",
  },
  {
    question: "What types of properties do you buy?",
    answer:
      "We buy houses, vacant land, mobile homes, rental properties, foreclosures, probate and inherited properties, distressed homes, and more. If you own it and want to sell it, we are interested.",
  },
];

export default function HomePage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <HeroSection
        headline="Sell Your Property Fast for Cash — No Repairs, No Fees, No Hassle"
        subheadline="Home Sellers Amigo buys houses and vacant land across the US for cash. Get a fair offer in 24 hours and close on your schedule."
        ctaText="Get My Free Cash Offer"
        ctaHref="/get-offer"
        secondaryCtaText="How It Works"
        secondaryCtaHref="/how-it-works"
        phoneNumber="(866) 793-4155"
        stats={heroStats}
        backgroundImage="/assets/hero-bg.png"
      />

      <HowItWorks
        steps={howItWorksSteps}
        ctaText="Start Now — Get Your Offer"
        ctaHref="/get-offer"
      />

      <PropertyTypesGrid types={propertyTypes} />

      <BenefitsSection benefits={benefits} />

      <TestimonialsSection testimonials={testimonials} />

      <FAQSection
        faqs={faqs}
        subtext="Have more questions? Visit our full FAQ page or give us a call."
      />

      <CTABlock
        headline="Ready to Sell Your Property for Cash?"
        subtext="Get a no-obligation cash offer in 24 hours. No fees, no repairs, no hassle. Just a fair price and a fast close."
        ctaText="Get My Free Cash Offer"
        ctaHref="/get-offer"
        phoneNumber="(866) 793-4155"
      />
    </motion.main>
  );
}
