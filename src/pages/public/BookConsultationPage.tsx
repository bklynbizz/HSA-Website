import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectField } from "@/components/ui/select-field";
import { BackgroundPaths } from "@/components/ui/background-paths";

const consultationTypes = [
  { value: "phone", label: "Phone Call" },
  { value: "video", label: "Video Call" },
  { value: "in-person", label: "In-Person Meeting" },
];

const timeOptions = [
  { value: "9:00", label: "9:00 AM" },
  { value: "9:30", label: "9:30 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "10:30", label: "10:30 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "11:30", label: "11:30 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "12:30", label: "12:30 PM" },
  { value: "1:00", label: "1:00 PM" },
  { value: "1:30", label: "1:30 PM" },
  { value: "2:00", label: "2:00 PM" },
  { value: "2:30", label: "2:30 PM" },
  { value: "3:00", label: "3:00 PM" },
  { value: "3:30", label: "3:30 PM" },
  { value: "4:00", label: "4:00 PM" },
  { value: "4:30", label: "4:30 PM" },
  { value: "5:00", label: "5:00 PM" },
];

const expectations = [
  {
    title: "Property Discussion",
    description:
      "We will talk about your property, its condition, location, and any unique circumstances. No details are too small.",
  },
  {
    title: "Market Analysis",
    description:
      "We will share what similar properties in your area have sold for recently and explain how we determine our offer.",
  },
  {
    title: "Your Options Explained",
    description:
      "We walk you through all your options, not just selling to us. Our goal is to help you make the best decision for your situation.",
  },
  {
    title: "Next Steps",
    description:
      "If selling to us makes sense, we will outline the next steps. If not, we will point you in the right direction. Zero pressure either way.",
  },
];

export default function BookConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [consultationType, setConsultationType] = useState("phone");
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-40px" });
  const rightRef = useRef<HTMLDivElement>(null);
  const rightInView = useInView(rightRef, { once: true, margin: "-40px" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // add manually controlled React state fields 
    data.consultationType = consultationType;
    
    try {
      await fetch("https://n8n.hindsightx.com/webhook/hsa-contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          sourcePage: "Book Consultation",
          submittedAt: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error("Error submitting form:", error);
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
        title="Schedule a Consultation" 
        subtitle="Book a free, no-obligation consultation to discuss your property and explore your options." 
      />

      {/* Form + Info */}
      <section className="section-padding">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Booking Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: -24 }}
              animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
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
                    Consultation Booked!
                  </h3>
                  <p className="mt-2 text-text-secondary">
                    Thank you for scheduling a consultation. Our team will send
                    you a confirmation with details shortly. We look forward to
                    speaking with you.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-xl border border-border bg-bg-primary p-8 shadow-[var(--shadow-card)] space-y-5"
                >
                  <h3 className="text-xl font-bold text-text-primary">
                    Book Your Free Consultation
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Choose your preferred consultation type, date, and time.
                    We will confirm your appointment within the hour.
                  </p>

                  {/* Consultation Type Radio */}
                  <div>
                    <label className="text-sm font-medium text-text-primary block mb-3">
                      Consultation Type
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {consultationTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setConsultationType(type.value)}
                          className={cn(
                            "rounded-lg border-2 py-3 px-4 text-sm font-medium text-center transition-all",
                            consultationType === type.value
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border text-text-secondary hover:border-text-muted"
                          )}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      name="date"
                      label="Preferred Date"
                      type="date"
                      required
                    />
                    <SelectField
                      name="time"
                      label="Preferred Time"
                      placeholder="Select a time"
                      options={timeOptions}
                      required
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input name="name" label="Full Name" placeholder="First Last" required />
                    <Input name="phone" label="Phone Number" type="tel" placeholder="(555) 123-4567" required />
                  </div>

                  <Input name="email" label="Email Address" type="email" placeholder="you@email.com" required />

                  <Input
                    name="address"
                    label="Property Address"
                    placeholder="123 Main St, City, State, ZIP"
                  />

                  <Textarea
                    name="notes"
                    label="Notes (optional)"
                    placeholder="Tell us a little about your property or situation, or any specific questions you have..."
                    className="min-h-[100px]"
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-secondary text-primary hover:bg-secondary-light font-semibold text-lg"
                  >
                    Book My Consultation
                  </Button>

                  <p className="text-center text-xs text-text-muted">
                    Free and confidential. No obligation whatsoever.
                  </p>
                </form>
              )}
            </motion.div>

            {/* Right: What to Expect + Testimonial */}
            <motion.div
              ref={rightRef}
              initial={{ opacity: 0, x: 24 }}
              animate={rightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* What to Expect */}
              <div className="rounded-xl border border-border bg-bg-secondary p-8">
                <h3 className="text-xl font-bold text-text-primary mb-6">
                  What to Expect
                </h3>
                <div className="space-y-6">
                  {expectations.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white text-sm font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm text-text-secondary">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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
                  &ldquo;The consultation was incredibly helpful. They walked me
                  through all my options and I never felt pressured. When I
                  decided to sell, the process was exactly as they described —
                  simple and fast.&rdquo;
                </blockquote>
                <div className="mt-4 pt-3 border-t border-border">
                  <p className="font-semibold text-text-primary text-sm">
                    {"Angela W."}
                  </p>
                  <p className="text-xs text-text-muted">
                    Corpus Christi, TX &middot; Probate Sale
                  </p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-6 py-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-xs text-text-muted">Properties Purchased</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.9</div>
                  <div className="text-xs text-text-muted">Google Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">$0</div>
                  <div className="text-xs text-text-muted">Fees Charged</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
