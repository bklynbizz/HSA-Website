import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { LeadCaptureForm } from "@/components/sections/LeadCaptureForm";
import { BackgroundPaths } from "@/components/ui/background-paths";

const trustPoints = [
  {
    icon: "⏱️",
    title: "Cash offer within 24 hours",
    description: "We move fast so you never have to wait.",
  },
  {
    icon: "💵",
    title: "Zero fees or commissions",
    description: "Our offer is the amount you take home.",
  },
  {
    icon: "🔧",
    title: "No repairs needed",
    description: "We buy in any condition, as-is.",
  },
  {
    icon: "📅",
    title: "Close on your timeline",
    description: "As fast as 7 days or whenever you are ready.",
  },
];

export default function GetOfferPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const trustRef = useRef<HTMLDivElement>(null);
  const trustInView = useInView(trustRef, { once: true, margin: "-40px" });

  // Scroll to form if navigated from a CTA
  useEffect(() => {
    if (location.hash === "#form" && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const handleFormSubmit = async () => {
    // placeholder — would submit to API
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <BackgroundPaths 
        title="Get Your Free Cash Offer" 
        subtitle="Fill out the form below and we will present you with a fair, no-obligation cash offer within 24 hours." 
      />

      {/* Form + Trust Elements */}
      <section className="section-padding">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left: Form */}
            <div ref={formRef} id="form" className="lg:col-span-3 scroll-mt-24">
              <LeadCaptureForm variant="full" onSubmit={handleFormSubmit} />
            </div>

            {/* Right: Trust elements */}
            <motion.div
              ref={trustRef}
              initial={{ opacity: 0, x: 24 }}
              animate={trustInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Process summary */}
              <div className="rounded-xl border border-border bg-bg-secondary p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">
                  What Happens Next
                </h3>
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-primary text-white text-sm font-bold">
                      1
                    </span>
                    <div>
                      <p className="font-medium text-text-primary">We review your property</p>
                      <p className="text-sm text-text-secondary">
                        Our team evaluates details and researches your market.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-primary text-white text-sm font-bold">
                      2
                    </span>
                    <div>
                      <p className="font-medium text-text-primary">You receive your offer</p>
                      <p className="text-sm text-text-secondary">
                        Within 24 hours, a fair cash offer lands in your inbox.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-primary text-white text-sm font-bold">
                      3
                    </span>
                    <div>
                      <p className="font-medium text-text-primary">You choose the closing date</p>
                      <p className="text-sm text-text-secondary">
                        Accept the offer and close in as few as 7 days.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Trust points */}
              <div className="space-y-4">
                {trustPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0" role="img" aria-label={point.title}>
                      {point.icon}
                    </span>
                    <div>
                      <p className="font-medium text-text-primary">{point.title}</p>
                      <p className="text-sm text-text-secondary">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="rounded-xl border border-border bg-bg-primary p-6 shadow-[var(--shadow-card)]">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-secondary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-text-secondary italic leading-relaxed">
                  &ldquo;They made a fair offer on my inherited home within a
                  day. Closed in 10 days and handled everything. I could not have
                  asked for a smoother process.&rdquo;
                </blockquote>
                <div className="mt-4 pt-3 border-t border-border">
                  <p className="font-semibold text-text-primary text-sm">
                    {"Sarah M."}
                  </p>
                  <p className="text-xs text-text-muted">
                    Jersey City, NJ &middot; Inherited Home
                  </p>
                </div>
              </div>

              {/* No obligation badge */}
              <div className="rounded-xl bg-accent/5 border border-accent/20 p-5 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="font-bold text-text-primary">No Obligation</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Your information is 100% confidential. Receive your offer with
                  no pressure and no commitment.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
