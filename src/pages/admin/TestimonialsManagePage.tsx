import { useState } from "react";
import {
  Plus,
  Star,
  Pencil,
  Trash2,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Types & Data
// ---------------------------------------------------------------------------

type TestimonialStatus = "approved" | "pending" | "rejected";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  rating: number;
  featured: boolean;
  status: TestimonialStatus;
  date: string;
}

const statusMeta: Record<TestimonialStatus, { label: string; className: string }> = {
  approved: { label: "Approved", className: "bg-green-100 text-green-700" },
  pending: { label: "Pending", className: "bg-amber-100 text-amber-700" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-700" },
};

const testimonials: Testimonial[] = [
  { id: "T-1", quote: "Home Sellers Amigo made the process incredibly simple. We received a fair cash offer within 24 hours and closed in just two weeks. Could not have asked for a better experience.", name: "Maria & Carlos Gonzalez", location: "Phoenix, AZ", rating: 5, featured: true, status: "approved", date: "Mar 10, 2026" },
  { id: "T-2", quote: "After months of trying to sell through a traditional agent, we turned to HSA. They bought our home as-is and saved us thousands in repair costs. Truly a lifesaver.", name: "James Chen", location: "Scottsdale, AZ", rating: 5, featured: true, status: "approved", date: "Feb 28, 2026" },
  { id: "T-3", quote: "The team was professional and transparent throughout the entire process. They explained every step clearly and there were no hidden fees. Highly recommend!", name: "Patricia Williams", location: "Mesa, AZ", rating: 4, featured: false, status: "approved", date: "Feb 15, 2026" },
  { id: "T-4", quote: "We were facing foreclosure and HSA helped us find a solution quickly. They treated us with respect and gave us a fair price. Forever grateful.", name: "Robert & Linda Taylor", location: "Tempe, AZ", rating: 5, featured: true, status: "approved", date: "Jan 30, 2026" },
  { id: "T-5", quote: "Sold our inherited property without any hassle. The team handled all the paperwork and even helped coordinate with out-of-state probate attorneys.", name: "Susan Park", location: "Chandler, AZ", rating: 5, featured: false, status: "approved", date: "Jan 18, 2026" },
  { id: "T-6", quote: "Good overall experience. The offer was competitive and closing was smooth. Would use their services again.", name: "Michael Brown", location: "Gilbert, AZ", rating: 4, featured: false, status: "pending", date: "Mar 16, 2026" },
  { id: "T-7", quote: "Quick response and fair offer. Appreciated the no-pressure approach and flexibility with our move-out date.", name: "Jennifer Davis", location: "Glendale, AZ", rating: 4, featured: false, status: "pending", date: "Mar 14, 2026" },
  { id: "T-8", quote: "They were okay. The process was smooth but I felt the offer could have been a bit higher.", name: "Kevin O'Brien", location: "Peoria, AZ", rating: 3, featured: false, status: "rejected", date: "Mar 5, 2026" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TestimonialsManagePage() {
  const [items, setItems] = useState(testimonials);

  const toggleFeatured = (id: string) => {
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, featured: !t.featured } : t))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1B2A4A]">Testimonials</h1>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add Testimonial
        </Button>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((t) => {
          const sm = statusMeta[t.status];
          return (
            <Card key={t.id} className="flex flex-col">
              <CardContent className="pt-6 flex flex-col flex-1">
                {/* Quote icon + text */}
                <div className="flex-1">
                  <Quote className="h-6 w-6 text-[#D4A843]/40 mb-2" />
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{t.quote}</p>
                </div>

                {/* Seller info */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm font-semibold text-[#1B2A4A]">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-0.5 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < t.rating ? "fill-[#D4A843] text-[#D4A843]" : "text-gray-200"
                      )}
                    />
                  ))}
                </div>

                {/* Controls row */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    {/* Featured toggle */}
                    <button
                      onClick={() => toggleFeatured(t.id)}
                      className="flex items-center gap-2"
                      aria-label="Toggle featured"
                    >
                      <div
                        className={cn(
                          "relative h-5 w-9 rounded-full transition-colors",
                          t.featured ? "bg-[#2E7D52]" : "bg-gray-300"
                        )}
                      >
                        <div
                          className={cn(
                            "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform shadow-sm",
                            t.featured ? "left-[18px]" : "left-0.5"
                          )}
                        />
                      </div>
                      <span className="text-xs text-gray-500">Featured</span>
                    </button>

                    {/* Status badge */}
                    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", sm.className)}>
                      {sm.label}
                    </span>
                  </div>

                  {/* Edit / Delete */}
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
