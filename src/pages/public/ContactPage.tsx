import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CTABlock } from "@/components/sections/CTABlock";
import { BackgroundPaths } from "@/components/ui/background-paths";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "(866) 793-4155",
    href: "tel:+18667934155",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@homesellersamigo.homes",
    href: "mailto:info@homesellersamigo.homes",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "1078 Summit Ave # 292\nJersey City, NJ 07307",
    href: undefined,
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM\nSun: Closed",
    href: undefined,
  },
];

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-40px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      await fetch("https://n8n.hindsightx.com/webhook/hsa-contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          sourcePage: "Contact Page",
          submittedAt: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
    setSubmitted(true);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <BackgroundPaths 
        title="Contact Us" 
        subtitle="Have questions or ready to sell? Get in touch. Our team is here to help." 
      />

      {/* Contact Form + Info */}
      <section className="section-padding">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-text-primary">
                Get in Touch
              </h2>
              <div className="mt-2 h-1 w-16 rounded-full bg-secondary" />
              <p className="mt-4 text-text-secondary leading-relaxed">
                Whether you have questions about the process, want to discuss
                your property situation, or are ready to receive a cash offer, we
                are here for you. Reach out any time.
              </p>

              <div className="mt-8 space-y-6">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-muted uppercase tracking-wide">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-text-primary font-medium hover:text-secondary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-text-primary whitespace-pre-line">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: 24 }}
              animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
              transition={{ duration: 0.5 }}
            >
              {submitted ? (
                <div className="rounded-xl border border-border bg-bg-primary p-8 text-center shadow-[var(--shadow-card)]">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-text-primary">
                    Message Sent
                  </h3>
                  <p className="mt-2 text-text-secondary">
                    Thank you for reaching out. Our team will get back to you
                    within one business day.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-xl border border-border bg-bg-primary p-8 shadow-[var(--shadow-card)] space-y-5"
                >
                  <h3 className="text-xl font-bold text-text-primary">
                    Send Us a Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input name="name" label="Full Name" placeholder="First Last" required />
                    <Input
                      name="phone"
                      label="Phone Number"
                      type="tel"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>

                  <Input
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="you@email.com"
                    required
                  />

                  <Input
                    name="address"
                    label="Property Address (optional)"
                    placeholder="123 Main St, City, State, ZIP"
                  />

                  <Textarea
                    name="message"
                    label="Message"
                    placeholder="Tell us how we can help you..."
                    required
                  />

                  <div className="space-y-4 pt-2">
                    <label className="flex items-start text-sm leading-relaxed cursor-pointer text-text-secondary hover:text-text-primary transition-colors">
                      <input
                        type="checkbox"
                        className="mt-1 mr-3 h-4 w-4 shrink-0 rounded border-border-light text-primary focus:ring-primary/20 transition-colors cursor-pointer"
                        required
                      />
                      <span className="flex-1">
                        I consent to receive informational messages &amp; alerts from Home Sellers Amigo (HSA) sent from (866) 793-4155, info@homesellersamigo.homes, or info@ironmaidenrealty.com. Message frequency varies. Message &amp; data rates may apply. Reply STOP to unsubscribe at any time.
                      </span>
                    </label>

                    <label className="flex items-start text-sm leading-relaxed cursor-pointer text-text-secondary hover:text-text-primary transition-colors">
                      <input
                        type="checkbox"
                        className="mt-1 mr-3 h-4 w-4 shrink-0 rounded border-border-light text-primary focus:ring-primary/20 transition-colors cursor-pointer"
                        required
                      />
                      <span className="flex-1">
                        I accept the{" "}
                        <a
                          href="/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-light underline font-medium"
                        >
                          Privacy Policy
                        </a>
                        {" "}and{" "}
                        <a
                          href="/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-light underline font-medium"
                        >
                          Terms &amp; Conditions
                        </a>
                        .
                      </span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-secondary text-primary hover:bg-secondary-light font-semibold text-lg"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Google Map */}
      <section className="container-site pb-16">
        <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-border relative">
          <iframe
            src="https://maps.google.com/maps?q=1078+Summit+Ave+%23292,+Jersey+City,+NJ+07307&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Home Sellers Amigo Office Location"
            className="absolute inset-0 grayscale-[10%]"
          />
        </div>
      </section>

      <CTABlock
        headline="Skip the Form — Get a Cash Offer Now"
        subtext="Ready to sell? Get a no-obligation cash offer for your property in 24 hours."
        ctaText="Get My Free Cash Offer"
        ctaHref="/get-offer"
        phoneNumber="(866) 793-4155"
      />
    </motion.main>
  );
}
