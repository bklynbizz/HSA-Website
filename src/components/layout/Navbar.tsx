import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, CheckCircle, Home, Users, Star, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { createPortal } from "react-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type { LucideIcon } from "lucide-react";

type LinkItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
};

const processLinks: LinkItem[] = [
  {
    title: "How It Works",
    href: "/how-it-works",
    description: "Learn our simple 3-step cash buying process",
    icon: CheckCircle,
  },
  {
    title: "What We Do",
    href: "/what-we-buy",
    description: "See the exact types of properties we purchase",
    icon: Home,
  },
];

const companyLinks: LinkItem[] = [
  {
    title: "About Us",
    href: "/about",
    description: "Learn more about our local team & values",
    icon: Users,
  },
  {
    title: "Testimonials",
    href: "/testimonials",
    description: "Read stories from homeowners we've helped",
    icon: Star,
  },
];

const PHONE_NUMBER = "(866) 793-4155";
const PHONE_HREF = "tel:+18667934155";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const scrolled = useScroll(10);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn("sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent", {
        "bg-white/95 supports-[backdrop-filter]:bg-white/80 border-border/50 backdrop-blur-lg shadow-sm": scrolled,
        "bg-white": !scrolled,
      })}
    >
      <nav className="container-site mx-auto flex h-[72px] w-full items-center justify-between relative">
        {/* Left Side: Logo */}
          {/* Logo */}
          <Link to="/" className="flex flex-shrink-0 items-center relative z-10" aria-label="Home Sellers Amigo">
            <div className="flex items-center gap-1.5 font-dynapuff text-xl md:text-2xl font-bold tracking-wide uppercase" style={{ fontStretch: 'condensed' }}>
              <span className="text-primary">Home</span>
              <span className="text-secondary">Sellers</span>
              <span className="text-accent">Amigo</span>
            </div>
          </Link>

          {/* Desktop Navigation - Centered Absolute */}
          <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
            <NavigationMenu className="pointer-events-auto">
              <NavigationMenuList>
                
                {/* Solutions Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-text-primary hover:text-secondary data-[state=open]:text-secondary hover:bg-blue-100 data-[state=open]:bg-blue-100 focus:bg-blue-100 focus:text-secondary rounded-md h-auto py-2 px-3 text-sm font-medium transition-colors">
                    How We Buy
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white p-2 rounded-xl shadow-card border border-border">
                    <ul className="flex flex-col w-[320px] gap-1 p-2">
                      {processLinks.map((item, i) => (
                        <li key={i}>
                          <NavigationMenuLink asChild>
                            <MenuCardLink {...item} />
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Company Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-text-primary hover:text-secondary data-[state=open]:text-secondary hover:bg-blue-100 data-[state=open]:bg-blue-100 focus:bg-blue-100 focus:text-secondary rounded-md h-auto py-2 px-3 text-sm font-medium transition-colors">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white p-2 rounded-xl shadow-card border border-border">
                    <ul className="flex flex-col w-[320px] gap-1 p-2">
                      {companyLinks.map((item, i) => (
                        <li key={i}>
                          <NavigationMenuLink asChild>
                            <MenuCardLink {...item} />
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Contact Link */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/contact" 
                      className={cn(
                        navigationMenuTriggerStyle(), 
                        "bg-transparent h-auto py-2 px-3 text-sm font-medium transition-colors hover:bg-blue-100 focus:bg-blue-100 hover:text-secondary",
                        location.pathname === "/contact" ? "text-secondary" : "text-text-primary"
                      )}
                    >
                      Contact
                    </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center z-10 gap-5">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary hover:-translate-y-0.5 transition-all duration-200"
          >
            <Phone className="h-4 w-4" />
            <span>{PHONE_NUMBER}</span>
          </a>
          <Button asChild className="bg-primary hover:bg-primary-light text-white shadow-md hover:shadow-card hover:-translate-y-0.5 transition-all duration-300" size="sm">
            <Link to="/get-offer">Get Cash Offer</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setOpen(!open)}
          className="lg:hidden relative z-50 text-primary border-none hover:bg-bg-secondary w-10 h-10 flex items-center justify-center p-0 rounded-md"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-6" duration={300} strokeWidth={2} />
        </Button>
      </nav>

      <MobileMenu open={open} className="flex flex-col justify-between overflow-y-auto pt-6">
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted px-2 mb-2">How We Buy</span>
            {processLinks.map((link) => (
              <MenuCardLink key={link.title} {...link} onClick={() => setOpen(false)} />
            ))}
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted px-2 mb-2">Company</span>
            {companyLinks.map((link) => (
              <MenuCardLink key={link.title} {...link} onClick={() => setOpen(false)} />
            ))}
          </div>

          <div className="flex flex-col gap-1 border-t border-border-light pt-4">
            <Link 
              to="/contact" 
              onClick={() => setOpen(false)}
              className="flex w-full flex-row gap-x-3 rounded-lg p-3 hover:bg-bg-secondary items-center transition-colors"
            >
              <div className="flex aspect-square size-10 items-center justify-center rounded-md border border-border shadow-sm bg-bg-secondary">
                <Mail className="text-primary size-5" />
              </div>
              <span className="font-semibold text-text-primary text-base">Contact Us</span>
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 mt-10">
          <a
            href={PHONE_HREF}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-primary py-2"
          >
            <Phone className="h-4 w-4" />
            <span>{PHONE_NUMBER}</span>
          </a>
          <Button asChild className="w-full bg-primary text-white" size="lg">
            <Link to="/get-offer">Get Cash Offer</Link>
          </Button>
        </div>
      </MobileMenu>
    </header>
  );
}

// -----------------------------------------------------------------
// Internal utility sub-components for Navbar
// -----------------------------------------------------------------

type MobileMenuProps = React.ComponentProps<"div"> & {
  open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof window === "undefined") return null;

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        "bg-white/95 supports-[backdrop-filter]:bg-white/80 backdrop-blur-xl",
        "fixed top-[72px] right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t border-border/50 lg:hidden"
      )}
    >
      <div
        data-slot={open ? "open" : "closed"}
        className={cn(
          "data-[slot=open]:animate-in data-[slot=open]:slide-in-from-bottom-4 data-[slot=open]:fade-in ease-out duration-300",
          "size-full p-6 pb-20",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

function MenuCardLink({
  title,
  description,
  icon: Icon,
  className,
  href,
  ...props
}: LinkItem & { className?: string, onClick?: () => void }) {
  return (
    <Link 
      to={href}
      className={cn(
        "flex w-full flex-row gap-x-3 rounded-lg p-3 hover:bg-bg-primary transition-all duration-200 group items-center", 
        className
      )} 
      {...props}
    >
      <div className="flex aspect-square size-10 flex-shrink-0 items-center justify-center rounded-md border border-border/50 shadow-sm bg-bg-secondary group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-colors duration-200">
        <Icon className="size-5 transition-colors" />
      </div>
      <div className="flex flex-col items-start justify-center text-left">
        <span className="font-semibold text-sm text-text-primary group-hover:text-primary transition-colors">{title}</span>
        <span className="text-muted-foreground text-text-muted text-[11px] leading-tight mt-0.5 line-clamp-1">{description}</span>
      </div>
    </Link>
  );
}

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false);

  const onScroll = React.useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // check on mount
  React.useEffect(() => {
    onScroll();
  }, [onScroll]);

  return scrolled;
}
