import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CTABlock } from "@/components/sections/CTABlock";
import { BackgroundPaths } from "@/components/ui/background-paths";

interface PropertyService {
  id: string;
  title: string;
  icon: React.ReactNode;
  paragraphs: string[];
  benefits: string[];
}

const services: PropertyService[] = [
  {
    id: "houses",
    title: "Houses",
    icon: "🏠",
    paragraphs: [
      "We buy single-family homes in any condition across the US. Whether your home is in pristine shape, needs minor cosmetic updates, or requires major structural repairs, we are ready to make you a fair cash offer.",
      "There is no need to worry about staging, open houses, or months of uncertainty. We handle the entire process from offer to closing, covering all standard closing costs so you walk away with cash in hand.",
      "From outdated homes that need full remodels to properties with code violations or liens, we have the experience and resources to purchase your house quickly and efficiently.",
    ],
    benefits: [
      "No repairs or cleaning required before sale",
      "Close in as few as 7 days",
      "We cover all standard closing costs",
      "Fair offers based on current market data",
      "No showings, no open houses, no strangers in your home",
    ],
  },
  {
    id: "vacant-land",
    title: "Vacant Land",
    icon: "🌿",
    paragraphs: [
      "Vacant land can be difficult to sell through traditional channels. Agents often do not prioritize land listings, and buyers with cash for raw land are rare. That is where we come in.",
      "We purchase residential lots, commercial parcels, rural acreage, and everything in between. Whether your land has utilities or not, whether it is buildable or has zoning challenges, we are interested.",
      "Stop paying property taxes on land you are not using. Our straightforward process gets you a cash offer within 24 hours and can close in as little as two weeks.",
    ],
    benefits: [
      "No need to clear, grade, or improve the land",
      "We buy lots of any size and zoning type",
      "Stop paying property taxes on unused land",
      "Quick closing with minimal paperwork",
      "We handle title issues and survey requirements",
    ],
  },
  {
    id: "foreclosures",
    title: "Foreclosures",
    icon: "🏚️",
    paragraphs: [
      "If you are facing foreclosure, time is not on your side. The threat of losing your home and the damage to your credit can feel overwhelming, but you have options.",
      "Selling to Home Sellers Amigo can help you avoid foreclosure by closing quickly, often before the foreclosure process completes. This protects your credit score and allows you to walk away with cash instead of losing everything.",
      "We work with homeowners at every stage of the foreclosure process, from initial notices to auction deadlines. Our team moves fast to provide solutions when you need them most.",
    ],
    benefits: [
      "Sell before the foreclosure is finalized",
      "Protect your credit from foreclosure damage",
      "Close in as few as 7 days to beat deadlines",
      "Walk away with cash instead of losing your equity",
      "Confidential and compassionate process",
    ],
  },
  {
    id: "probate",
    title: "Probate Properties",
    icon: "📜",
    paragraphs: [
      "Dealing with probate is stressful enough without the added burden of managing and selling a property. We specialize in purchasing probate properties and understand the unique legal requirements involved.",
      "Our team works directly with executors, administrators, and attorneys to ensure a smooth transaction that complies with all probate court requirements. We can purchase the property at any stage of the probate process.",
      "Whether the property needs repairs, has been vacant, or has multiple heirs, we simplify the process so you can focus on what matters most during a difficult time.",
    ],
    benefits: [
      "Experience with probate court requirements",
      "Work directly with executors and attorneys",
      "Purchase at any stage of the probate process",
      "Handle properties with multiple heirs",
      "No repairs or cleanout needed before sale",
    ],
  },
  {
    id: "inherited",
    title: "Inherited Homes",
    icon: "🏡",
    paragraphs: [
      "Inheriting a home can be a blessing, but it can also become a financial and emotional burden. If the property is in another city, needs extensive repairs, or you simply do not want to manage it, selling for cash is often the best path forward.",
      "We buy inherited properties in any condition. You do not need to clean out personal belongings, make repairs, or even visit the property. We handle everything from inspection to closing.",
      "Our process is simple, respectful, and fast. Many inherited property owners close within two weeks and use the proceeds for their own financial goals.",
    ],
    benefits: [
      "No need to clean out or repair the property",
      "We buy properties in any condition, even hoarder houses",
      "Close quickly to avoid ongoing holding costs",
      "Compassionate team that respects your situation",
      "Handle out-of-state property sales remotely",
    ],
  },
  {
    id: "distressed",
    title: "Distressed Properties",
    icon: "🔧",
    paragraphs: [
      "Fire damage, water damage, foundation issues, mold, storm damage — these problems scare away traditional buyers and make listing with an agent nearly impossible. We buy distressed properties that others will not touch.",
      "You do not need to invest thousands in repairs before selling. We purchase properties exactly as they are today, regardless of their condition. Our team has experience with every type of property damage.",
      "We provide fast, fair cash offers for properties that would otherwise sit on the market for months or years. Stop the bleeding on a distressed property and turn it into cash.",
    ],
    benefits: [
      "Buy properties with fire, water, and storm damage",
      "No repairs required before closing",
      "Handle code violations and condemned properties",
      "Fair offers even for properties in poor condition",
      "Fast closing to stop ongoing holding costs",
    ],
  },
  {
    id: "rentals",
    title: "Rental Properties",
    icon: "🔑",
    paragraphs: [
      "Being a landlord is not for everyone. Difficult tenants, costly repairs, and the constant stress of property management can turn what seemed like a good investment into a headache.",
      "We buy rental properties with or without tenants in place. You do not need to wait for leases to expire or go through the eviction process. We take on the responsibility of the existing tenants and close on your timeline.",
      "Whether you own a single rental house or a portfolio of properties, we can make competitive cash offers that let you exit the landlord business cleanly and quickly.",
    ],
    benefits: [
      "Sell with tenants still in place",
      "No need to wait for lease expiration",
      "We handle tenant communications and transitions",
      "Purchase single properties or entire portfolios",
      "End the stress of property management overnight",
    ],
  },
  {
    id: "mobile-homes",
    title: "Mobile Homes",
    icon: "🏘️",
    paragraphs: [
      "Mobile homes and manufactured housing present unique challenges when selling traditionally. Many lenders will not finance mobile home purchases, limiting your buyer pool significantly.",
      "We buy mobile homes with or without the land they sit on. Whether your mobile home is in a park, on leased land, or on your own property, we can make a cash offer.",
      "Age, condition, and location do not matter to us. We have purchased mobile homes across the US in every imaginable condition and situation.",
    ],
    benefits: [
      "Buy mobile homes with or without land",
      "No condition requirements or age restrictions",
      "Handle title transfer for both home and land",
      "Purchase in parks or on private property",
      "Fast closing with cash, no lender delays",
    ],
  },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<string>("houses");
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveTab(id);
      }
    }
  }, [location]);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <BackgroundPaths 
        title="What We Buy" 
        subtitle="We purchase all types of properties in any condition. Explore the property types below to learn how we can help." 
      />

      {/* Tabs */}
      <section className="sticky top-[72px] z-30 bg-bg-primary border-b border-border">
        <div className="container-site">
          <div className="flex overflow-x-auto gap-1 py-3 -mx-1.5 scrollbar-hide">
            {services.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => scrollToSection(service.id)}
                className={cn(
                  "group flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                  activeTab === service.id
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:bg-bg-secondary"
                )}
              >
                <span className="mr-1.5 inline-block transition-transform duration-300 group-hover:animate-wiggle">{service.icon}</span>
                {service.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, index) => (
        <ServiceSection
          key={service.id}
          service={service}
          index={index}
          isActive={activeTab === service.id}
        />
      ))}

      <CTABlock
        headline="Have a Property to Sell? Let Us Make an Offer."
        subtext="No matter the type or condition of your property, we are ready to present you with a fair cash offer. It takes just minutes to get started."
        ctaText="Get My Free Cash Offer"
        ctaHref="/get-offer"
        phoneNumber="(866) 793-4155"
      />
    </motion.main>
  );
}

function ServiceSection({
  service,
  index,
  isActive,
}: {
  service: PropertyService;
  index: number;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id={service.id}
      className={cn(
        "section-padding scroll-mt-36",
        index % 2 === 0 ? "bg-bg-primary" : "bg-bg-secondary"
      )}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.5 }}
        className="container-site"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl" role="img" aria-label={service.title}>
                {service.icon}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                {service.title}
              </h2>
            </div>
            <div className="h-1 w-16 rounded-full bg-secondary mb-6" />

            {service.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 text-text-secondary leading-relaxed">
                {p}
              </p>
            ))}

            <Button asChild className="mt-8" variant="primary" size="lg">
              <Link to="/get-offer">
                Sell Your {service.title === "Houses" ? "House" : service.title} for Cash
              </Link>
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-bg-primary p-8 shadow-[var(--shadow-card)]">
            <h3 className="text-lg font-bold text-text-primary mb-4">
              Benefits of Selling Your {service.title} to Us
            </h3>
            <ul className="space-y-3">
              {service.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
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
                  <span className="text-text-secondary">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
