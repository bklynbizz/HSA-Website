import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CTABlock } from "@/components/sections/CTABlock";
import { BackgroundPaths } from "@/components/ui/background-paths";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  label: string;
  faqs: FAQ[];
}

const categories: FAQCategory[] = [
  {
    id: "process",
    label: "About Our Process",
    faqs: [
      {
        question: "How does your process work?",
        answer:
          "It is simple: tell us about your property by submitting our online form or calling us, receive a fair cash offer within 24 hours, and if you accept, choose your closing date. We handle all the paperwork and cover standard closing costs.",
      },
      {
        question: "How long does the whole process take?",
        answer:
          "From initial contact to closing, the process typically takes 7 to 14 days. However, we can close in as few as 7 days if needed, or we can wait several months if that works better for your timeline.",
      },
      {
        question: "Do I need to clean or prepare my property before selling?",
        answer:
          "No. You do not need to clean, declutter, stage, or make any improvements. We buy properties in their current condition. You can even leave unwanted furniture and belongings behind.",
      },
      {
        question: "Will you come to see my property before making an offer?",
        answer:
          "We typically make our initial offer based on the information you provide and our research. We may do a brief walkthrough before finalizing, but this is not a formal inspection. It is simply to confirm the general condition.",
      },
      {
        question: "What areas do you buy properties in?",
        answer:
          "We currently purchase properties throughout Texas, including San Antonio, Austin, Houston, Dallas, Fort Worth, El Paso, and all surrounding areas. If you are unsure, reach out and we will let you know.",
      },
      {
        question: "Can I sell a property that has a mortgage on it?",
        answer:
          "Yes. We buy properties with existing mortgages regularly. At closing, the mortgage balance is paid off from the proceeds, and you receive the remaining equity in cash.",
      },
    ],
  },
  {
    id: "offer",
    label: "About Your Offer",
    faqs: [
      {
        question: "How do you determine the offer price?",
        answer:
          "We evaluate comparable sales in your area, current market conditions, the property condition, and any needed repairs. Our offers are based on data, not guesswork, and we are happy to walk you through our analysis.",
      },
      {
        question: "Is the offer negotiable?",
        answer:
          "We always aim to present a fair offer upfront. However, if you have concerns or additional information about the property that might affect value, we are open to discussing it. Our goal is a deal that works for both sides.",
      },
      {
        question: "Are there any hidden fees or commissions?",
        answer:
          "None. Zero. The offer we present is the net amount you receive at closing. We do not charge commissions, service fees, or deduct closing costs. What we offer is what you get.",
      },
      {
        question: "What if I do not like the offer?",
        answer:
          "There is absolutely no obligation. If the offer does not meet your expectations, simply decline. There are no penalties, no fees, and no pressure. You keep all the information we provide about your property.",
      },
      {
        question: "How is your offer different from a real estate agent listing?",
        answer:
          "With an agent, you list at a price and hope for offers, pay 5 to 6 percent in commissions, make repairs, attend showings, and wait 3 to 6 months or longer. With us, you get a guaranteed cash offer, skip the repairs and showings, and close in as few as 7 days with zero fees.",
      },
    ],
  },
  {
    id: "closing",
    label: "About Closing",
    faqs: [
      {
        question: "Who handles the closing?",
        answer:
          "We work with a reputable local title company to manage the closing process. They handle the title search, prepare all documents, and ensure a smooth, legally compliant transfer of ownership.",
      },
      {
        question: "What do I need to bring to closing?",
        answer:
          "Typically, you just need a valid government-issued ID. The title company will prepare all documents in advance. If there are any additional items needed for your specific situation, we will let you know well ahead of time.",
      },
      {
        question: "How do I receive payment?",
        answer:
          "You receive your funds on closing day via wire transfer directly to your bank account or a cashier's check. The choice is yours. Funds from wire transfers are typically available the same business day.",
      },
      {
        question: "Can I choose my own closing date?",
        answer:
          "Absolutely. You pick the date that works best for your situation. Need to close this week? We can do that. Need a few months to make arrangements? That works too. Your timeline is our timeline.",
      },
      {
        question: "What if there are title issues or liens on the property?",
        answer:
          "We handle properties with title issues, tax liens, and other encumbrances regularly. Our title company will work through any issues, and in most cases, these are resolved as part of the closing process.",
      },
      {
        question: "Can I do a remote closing if I live out of state?",
        answer:
          "Yes. We facilitate remote closings regularly for out-of-state property owners. Documents can be signed via mobile notary or at a local title company in your area, and funds are wired directly to you.",
      },
    ],
  },
  {
    id: "situations",
    label: "About Specific Situations",
    faqs: [
      {
        question: "Can you help if I am facing foreclosure?",
        answer:
          "Yes. We work with homeowners in pre-foreclosure frequently. We can often close before the foreclosure sale date, allowing you to protect your credit, avoid the foreclosure record, and walk away with cash.",
      },
      {
        question: "Do you buy properties in probate?",
        answer:
          "We do. We have experience purchasing properties at every stage of the probate process. Our team works with executors, administrators, and attorneys to ensure compliance with court requirements.",
      },
      {
        question: "What about properties with tenants?",
        answer:
          "We buy rental properties with tenants in place. There is no need to wait for leases to expire or go through eviction. We assume responsibility for existing tenants and lease agreements at closing.",
      },
      {
        question: "Can you buy my property if it has fire or water damage?",
        answer:
          "Yes. We purchase distressed properties in any condition, including those with fire damage, water damage, mold, foundation issues, and more. No repairs are needed on your part.",
      },
      {
        question: "I inherited a property I do not want. Can you help?",
        answer:
          "Absolutely. We buy inherited properties in any condition, even if they need a full cleanout. Many inherited property owners are overwhelmed and just want a simple solution. That is exactly what we provide.",
      },
      {
        question: "Do you buy vacant land?",
        answer:
          "Yes. We purchase residential lots, commercial parcels, and rural acreage across the US. Vacant land can be especially difficult to sell traditionally, so our cash offer process is particularly valuable for land sellers.",
      },
    ],
  },
];

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState("process");

  const activeCategory = categories.find((c) => c.id === activeTab)!;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <BackgroundPaths 
        title="Frequently Asked Questions" 
        subtitle="Everything you need to know about selling your property to Home Sellers Amigo." 
      />

      {/* FAQ Content */}
      <section className="section-padding">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-medium transition-colors",
                    activeTab === cat.id
                      ? "bg-primary text-white"
                      : "bg-bg-secondary text-text-secondary hover:bg-border-light"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Accordion */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Accordion type="single" collapsible className="space-y-3">
                {activeCategory.faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`${activeTab}-${i}`}
                    className="rounded-lg border border-border bg-bg-primary px-6 shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-semibold text-text-primary py-5 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-text-secondary leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>

      <CTABlock
        headline="Still Have Questions? Let Us Help."
        subtext="Give us a call or submit your property details. Our team is ready to answer any questions and present your cash offer."
        ctaText="Get My Free Cash Offer"
        ctaHref="/get-offer"
        phoneNumber="(866) 793-4155"
      />
    </motion.main>
  );
}
