import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const sections = [
  {
    id: "info-collected",
    title: "1. Information We Collect",
    content: `We collect personal information that you provide directly to us when you fill out a form, request a cash offer, contact us by phone or email, or otherwise communicate with us. This information may include your name, email address, phone number, mailing address, property address, and details about your property.

We may also collect certain information automatically when you visit our website, including your IP address, browser type, operating system, referring URLs, and information about how you interact with our website.`,
  },
  {
    id: "use-info",
    title: "2. How We Use Your Information",
    content: `We use the information we collect to evaluate your property for a potential cash offer, communicate with you about our services, respond to your inquiries and requests, send you marketing communications (with your consent), improve our website and services, and comply with legal obligations.

We will never sell your personal information to third parties for their own marketing purposes.`,
  },
  {
    id: "sharing",
    title: "3. Information Sharing",
    content: `We may share your information with title companies and closing agents involved in processing your property transaction, service providers who assist us in operating our business, legal and financial advisors, and as required by law or to protect our rights.

All third parties who receive your information are required to maintain its confidentiality and use it only for the purposes for which it was provided.`,
  },
  {
    id: "security",
    title: "4. Data Security",
    content: `We implement reasonable administrative, technical, and physical security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.

We encourage you to take steps to protect your personal information, such as choosing a strong password if you create an account on our website.`,
  },
  {
    id: "cookies",
    title: "5. Cookies and Tracking Technologies",
    content: `Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors are coming from. You can control cookies through your browser settings and opt out of certain tracking technologies.

We use both session cookies, which expire when you close your browser, and persistent cookies, which remain on your device until deleted or expired.`,
  },
  {
    id: "rights",
    title: "6. Your Rights",
    content: `You have the right to access the personal information we hold about you, request correction of inaccurate information, request deletion of your personal information, opt out of marketing communications, and request a copy of your data in a portable format.

To exercise any of these rights, please contact us using the information provided at the bottom of this page.`,
  },
  {
    id: "third-party",
    title: "7. Third-Party Links",
    content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party websites you visit.`,
  },
  {
    id: "children",
    title: "8. Children's Privacy",
    content: `Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete that information.`,
  },
  {
    id: "changes",
    title: "9. Changes to This Policy",
    content: `We may update this privacy policy from time to time to reflect changes in our practices or applicable law. We will notify you of any material changes by posting the updated policy on our website and updating the effective date. Your continued use of our services after such changes constitutes acceptance of the updated policy.`,
  },
  {
    id: "contact",
    title: "10. Contact Us",
    content: `If you have questions about this Privacy Policy or our data practices, please contact us at:

Home Sellers Amigo
1078 Summit Ave # 292
Jersey City, NJ 07307
Email: info@homesellersamigo.homes
Phone: (866) 793-4155`,
  },
];

export default function PrivacyPage() {
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
            Privacy Policy
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
                Home Sellers Amigo ("we," "us," or "our") is committed to
                protecting your privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website or use our services. Please read this policy
                carefully.
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
