import { motion } from "framer-motion";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing or using the Home Sellers Amigo website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.

These terms apply to all visitors, users, and others who access or use our website and services.`,
  },
  {
    id: "services",
    title: "2. Description of Services",
    content: `Home Sellers Amigo provides real estate investment services, including purchasing residential properties, vacant land, and other real estate assets directly from property owners. Our services include property evaluation, cash offer presentation, and facilitation of property transactions through licensed title companies.

All property transactions are subject to separate purchase agreements and are governed by applicable real estate laws.`,
  },
  {
    id: "eligibility",
    title: "3. Eligibility",
    content: `To use our services, you must be at least 18 years of age, have the legal capacity to enter into binding contracts, and have the legal authority to sell or authorize the sale of the property in question.

If you are acting on behalf of an estate, trust, or other entity, you represent that you have the proper authority to do so.`,
  },
  {
    id: "offers",
    title: "4. Cash Offers and Transactions",
    content: `Cash offers provided by Home Sellers Amigo are estimates based on the information available at the time of evaluation. Offers are subject to verification of property details, title search, and standard due diligence.

All offers are non-binding until a formal purchase agreement is executed by both parties. We reserve the right to modify or withdraw an offer if material discrepancies are discovered during our evaluation process.

Final transaction terms are governed by the executed purchase agreement, not by any preliminary offer or communication.`,
  },
  {
    id: "user-obligations",
    title: "5. User Obligations",
    content: `When using our services, you agree to provide accurate and complete information about yourself and your property, not to misrepresent the condition, ownership, or legal status of any property, respond to communications in a timely manner during active transactions, and comply with all applicable local, state, and federal laws.

You are responsible for ensuring that you have the legal right to sell any property submitted to us for evaluation.`,
  },
  {
    id: "intellectual-property",
    title: "6. Intellectual Property",
    content: `All content on the Home Sellers Amigo website, including text, graphics, logos, images, and software, is the property of Home Sellers Amigo or its content suppliers and is protected by intellectual property laws.

You may not reproduce, distribute, modify, or create derivative works from any content on our website without our express written permission.`,
  },
  {
    id: "disclaimer",
    title: "7. Disclaimer of Warranties",
    content: `Our website and services are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, error-free, or completely secure.

We make no representations about the accuracy or completeness of any content on our website or any content linked to from our website.`,
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    content: `To the fullest extent permitted by law, Home Sellers Amigo shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our website or services.

Our total liability for any claims arising under these terms shall not exceed the amount you have paid us, if any, during the twelve months preceding the claim.`,
  },
  {
    id: "indemnification",
    title: "9. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless Home Sellers Amigo, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising out of your use of our services, your violation of these terms, or your violation of any rights of a third party.`,
  },
  {
    id: "governing-law",
    title: "10. Governing Law",
    content: `These Terms of Service shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts of Bexar County, Texas.`,
  },
  {
    id: "changes",
    title: "11. Changes to Terms",
    content: `We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes are posted constitutes your acceptance of the modified terms.

We recommend reviewing these terms periodically for any changes.`,
  },
  {
    id: "contact",
    title: "12. Contact Information",
    content: `For questions about these Terms of Service, please contact us at:

Home Sellers Amigo
1078 Summit Ave # 292
Jersey City, NJ 07307
Email: info@homesellersamigo.homes
Phone: (866) 793-4155`,
  },
];

export default function TermsPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <section className="relative bg-primary py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light" />
        <div className="absolute inset-0 opacity-10 bg-[url('/assets/hero-bg.png')] bg-cover bg-center mix-blend-overlay" />
        <div className="container-site relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight"
          >
            Terms of Service
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5"
          >
            <p className="text-sm font-medium text-white/90">
              Last updated: January 1, 2025
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            {/* Table of Contents */}
            <nav className="mb-14 rounded-2xl border border-border-light bg-bg-primary shadow-subtle p-8 hover:shadow-card transition-shadow duration-300">
              <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Table of Contents
              </h2>
              <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-text-secondary hover:text-primary-light font-medium transition-colors flex items-start gap-2 group"
                    >
                      <span className="text-secondary/50 group-hover:text-secondary transition-colors">&rarr;</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Intro */}
            <div className="prose prose-lg max-w-none text-text-secondary">
              <p className="leading-relaxed mb-10 text-lg">
                Welcome to Home Sellers Amigo. These Terms of Service govern your
                use of our website and services. By using our website or engaging
                our services, you accept these terms in full. Please read them
                carefully before proceeding.
              </p>

              {/* Sections */}
              <div className="space-y-12">
                {sections.map((section) => (
                  <div key={section.id} id={section.id} className="scroll-mt-32">
                    <h2 className="text-2xl font-bold text-primary-dark mb-5 pb-2 border-b border-border-light">
                      {section.title}
                    </h2>
                    <div className="text-text-secondary leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
