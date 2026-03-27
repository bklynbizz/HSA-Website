import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "What We Buy", href: "/what-we-buy" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },

  { label: "Contact", href: "/contact" },
] as const;

const PHONE_NUMBER = "(866) 793-4155";
const PHONE_HREF = "tel:+18667934155";
const EMAIL = "info@homesellersamigo.homes";
const ADDRESS = "Jersey City, NJ";

export function Footer() {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch("https://n8n.hindsightx.com/webhook/hsa-contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          phone,
          sourcePage: "Footer Quick Form",
          submittedAt: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error("Error submitting footer form:", error);
    }
    setSubmitted(true);
    setAddress("");
    setPhone("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer className="bg-bg-dark text-text-on-dark">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block" aria-label="Home">
              <img 
                src="/assets/Media/footer-logo.jpg" 
                alt="Home Sellers Amigo" 
                className="h-14 md:h-16 w-auto object-contain rounded-md"
              />
            </Link>
            <p className="mt-4 text-sm font-medium text-secondary">
              Your trusted partner for fast, fair property sales
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-on-dark/70">
              We buy houses and land for cash in any condition. No agents, no
              fees, no hassle. Get a fair offer and close on your timeline.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-text-on-dark/70 transition-colors duration-150 hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="mt-4 flex flex-col gap-4">
              <li>
                <a
                  href={PHONE_HREF}
                  className="flex items-start gap-3 text-sm text-text-on-dark/70 transition-colors duration-150 hover:text-secondary"
                >
                  <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" />
                  <span>{PHONE_NUMBER}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-start gap-3 text-sm text-text-on-dark/70 transition-colors duration-150 hover:text-secondary"
                >
                  <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" />
                  <span>{EMAIL}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-text-on-dark/70">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" />
                  <span>{ADDRESS}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Lead Capture */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get Your Cash Offer
            </h3>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Property address"
                required
                className={cn(
                  "h-11 w-full rounded-md border border-white/20 bg-white/10 px-4 text-sm text-white",
                  "placeholder:text-white/50 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary",
                  "transition-colors duration-200"
                )}
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                required
                className={cn(
                  "h-11 w-full rounded-md border border-white/20 bg-white/10 px-4 text-sm text-white",
                  "placeholder:text-white/50 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary",
                  "transition-colors duration-200"
                )}
              />
              <Button
                type="submit"
                variant="accent"
                size="sm"
                className="w-full"
              >
                {submitted ? "Sent!" : "Get My Offer"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors duration-150 hover:bg-secondary hover:text-primary"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors duration-150 hover:bg-secondary hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-text-on-dark/50 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Iron Maiden Nyc LLC DBA Home Sellers Amigo. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="text-xs text-text-on-dark/50 transition-colors duration-150 hover:text-secondary"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-text-on-dark/50 transition-colors duration-150 hover:text-secondary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
