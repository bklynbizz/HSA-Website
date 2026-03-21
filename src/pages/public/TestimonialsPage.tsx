import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CTABlock } from "@/components/sections/CTABlock";
import { Badge } from "@/components/ui/badge";
import { BackgroundPaths } from "@/components/ui/background-paths";

interface Testimonial {
  name: string;
  location: string;
  propertyType: string;
  category: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    location: "Jersey City, NJ",
    propertyType: "Inherited Home",
    category: "Houses",
    quote:
      "After my mother passed, dealing with her house was overwhelming. Home Sellers Amigo made a fair offer and handled everything. We closed in 10 days and I could finally focus on my family.",
    rating: 5,
  },
  {
    name: "James R.",
    location: "Austin, TX",
    propertyType: "Rental Property",
    category: "Houses",
    quote:
      "I was tired of being a landlord and dealing with problem tenants. They bought my rental property quickly, even with tenants still in place. The whole process was smooth and professional.",
    rating: 5,
  },
  {
    name: "Maria G.",
    location: "Houston, TX",
    propertyType: "Pre-Foreclosure",
    category: "Foreclosure",
    quote:
      "I was facing foreclosure and felt hopeless. They gave me a cash offer within 24 hours and we closed before the bank could take my home. They truly saved my credit and gave me a fresh start.",
    rating: 5,
  },
  {
    name: "David & Lisa T.",
    location: "Dallas, TX",
    propertyType: "Distressed Property",
    category: "Houses",
    quote:
      "Our house had major foundation issues and no traditional buyer would touch it. Home Sellers Amigo bought it as-is and gave us a fair price. No repairs, no inspections, no headaches.",
    rating: 5,
  },
  {
    name: "Robert K.",
    location: "Fort Worth, TX",
    propertyType: "Vacant Lot",
    category: "Land",
    quote:
      "I had vacant land sitting for years with no offers through agents. They purchased it in two weeks. I wish I had contacted them sooner. Highly recommend for land sellers.",
    rating: 4,
  },
  {
    name: "Angela W.",
    location: "Corpus Christi, TX",
    propertyType: "Probate Sale",
    category: "Probate",
    quote:
      "Going through probate was confusing enough. They worked with our attorney and handled the property purchase seamlessly. The entire team was patient, knowledgeable, and respectful during a tough time.",
    rating: 5,
  },
  {
    name: "Thomas P.",
    location: "El Paso, TX",
    propertyType: "Single Family Home",
    category: "Houses",
    quote:
      "We needed to relocate for work in two weeks and could not wait for a traditional sale. Home Sellers Amigo made an offer the same day and we closed before our move date. Incredible service.",
    rating: 5,
  },
  {
    name: "Linda H.",
    location: "Laredo, TX",
    propertyType: "Rural Acreage",
    category: "Land",
    quote:
      "I inherited 10 acres that I had no use for and was tired of paying taxes on. They gave me a fair offer and closed in about 10 days. Simple, honest, and straightforward.",
    rating: 5,
  },
  {
    name: "Carlos & Diana M.",
    location: "Jersey City, NJ",
    propertyType: "Foreclosure Avoidance",
    category: "Foreclosure",
    quote:
      "We were behind on our mortgage and facing an auction date. Home Sellers Amigo moved fast, made us a fair offer, and we closed a week before the auction. We are forever grateful.",
    rating: 5,
  },
  {
    name: "Patricia N.",
    location: "Waco, TX",
    propertyType: "Estate Sale",
    category: "Probate",
    quote:
      "As the executor of my father's estate, I needed to sell his house quickly to distribute assets to the heirs. They made it easy and fair for everyone involved. Truly professional.",
    rating: 5,
  },
];

const filterTabs = ["All", "Houses", "Land", "Foreclosure", "Probate"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={cn(
            "w-5 h-5",
            i < rating ? "text-secondary" : "text-border"
          )}
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

export default function TestimonialsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-40px" });

  const filtered =
    activeFilter === "All"
      ? testimonials
      : testimonials.filter((t) => t.category === activeFilter);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <BackgroundPaths 
        title="What Our Clients Say" 
        subtitle="Real stories from real homeowners who sold their properties to Home Sellers Amigo." 
      />

      {/* Filter + Grid */}
      <section className="section-padding">
        <div className="container-site">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-colors",
                  activeFilter === tab
                    ? "bg-primary text-white"
                    : "bg-bg-secondary text-text-secondary hover:bg-border-light"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 24 }}
                animate={
                  gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
                }
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative flex flex-col rounded-xl border border-border bg-bg-primary p-6 shadow-[var(--shadow-card)]"
              >
                {/* Quote mark */}
                <div
                  className="absolute -top-3 left-6 text-5xl font-serif text-secondary leading-none select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <StarRating rating={testimonial.rating} />
                  <Badge>{testimonial.propertyType}</Badge>
                </div>

                <blockquote className="mt-4 flex-1 text-text-secondary italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="mt-6 pt-4 border-t border-border">
                  <div className="font-semibold text-text-primary">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-text-muted">
                    {testimonial.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        headline="Your Story Could Be Next"
        subtext="Join the hundreds of homeowners who have sold their properties quickly and stress-free. Get your free cash offer today."
        ctaText="Get My Free Cash Offer"
        ctaHref="/get-offer"
        phoneNumber="(866) 793-4155"
      />
    </motion.main>
  );
}
