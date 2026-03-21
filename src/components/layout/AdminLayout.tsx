import { useState, useEffect, useCallback } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Calendar,
  Image,
  Settings,
  BarChart3,
  Menu,
  X,
  Star,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const SIDEBAR_LINKS: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Pages", href: "/admin/pages", icon: FileText },

  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Consultations", href: "/admin/consultations", icon: Calendar },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Media", href: "/admin/media", icon: Image },
  { label: "Settings", href: "/admin/settings", icon: Settings },
] as const;

function getPageTitle(pathname: string): string {
  const match = SIDEBAR_LINKS.find(
    (link) =>
      link.href === pathname ||
      (link.href !== "/admin" && pathname.startsWith(link.href))
  );
  return match?.label ?? "Dashboard";
}

function SidebarContent({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 flex-shrink-0 items-center px-6">
        <Link
          to="/admin"
          className="flex items-center"
          onClick={onNavigate}
          aria-label="Admin Home"
        >
          <span className="text-lg font-bold tracking-tight">
            <span className="text-white">HSA </span>
            <span className="text-secondary">Admin</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {SIDEBAR_LINKS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "bg-white/10 text-secondary"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.label}</span>
                  {isActive && (
                    <ChevronRight className="ml-auto h-4 w-4 text-secondary/60" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Analytics Quick Link */}
      <div className="flex-shrink-0 border-t border-white/10 px-3 py-4">
        <Link
          to="/admin/analytics"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition-colors duration-150 hover:bg-white/5 hover:text-white"
        >
          <BarChart3 className="h-5 w-5 flex-shrink-0" />
          <span>Analytics</span>
        </Link>
      </div>
    </div>
  );
}

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-bg-secondary">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-[280px] lg:flex-shrink-0 lg:flex-col bg-primary">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={closeSidebar}
              aria-hidden="true"
            />

            {/* Sidebar Panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "tween",
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] bg-primary lg:hidden"
            >
              <SidebarContent onNavigate={closeSidebar} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-border bg-white px-4 lg:px-8">
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex lg:hidden items-center justify-center h-10 w-10 rounded-md text-primary hover:bg-bg-secondary transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>

            <h1 className="text-lg font-semibold text-text-primary">
              {pageTitle}
            </h1>
          </div>

          {/* Admin User */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm font-medium text-text-secondary">
              Admin User
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
