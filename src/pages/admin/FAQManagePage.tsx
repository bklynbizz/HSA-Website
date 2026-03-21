import { useState } from "react";
import {
  Plus,
  GripVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Types & Data
// ---------------------------------------------------------------------------

type FAQCategory = "General" | "Selling Process" | "Pricing" | "Legal" | "Closing";

interface FAQ {
  id: string;
  question: string;
  category: FAQCategory;
  active: boolean;
}

const categoryColors: Record<FAQCategory, string> = {
  General: "bg-blue-100 text-blue-700",
  "Selling Process": "bg-purple-100 text-purple-700",
  Pricing: "bg-[#D4A843]/20 text-[#D4A843]",
  Legal: "bg-amber-100 text-amber-700",
  Closing: "bg-[#2E7D52]/15 text-[#2E7D52]",
};

const allCategories: FAQCategory[] = ["General", "Selling Process", "Pricing", "Legal", "Closing"];

const faqs: FAQ[] = [
  { id: "F-1", question: "How does the home selling process work with Home Sellers Amigo?", category: "General", active: true },
  { id: "F-2", question: "Do I need to make repairs before selling?", category: "General", active: true },
  { id: "F-3", question: "How quickly can I get a cash offer?", category: "General", active: true },
  { id: "F-4", question: "What types of properties do you buy?", category: "General", active: true },
  { id: "F-5", question: "What happens during the initial consultation?", category: "Selling Process", active: true },
  { id: "F-6", question: "How long does the entire selling process take?", category: "Selling Process", active: true },
  { id: "F-7", question: "Can I stay in the home after selling?", category: "Selling Process", active: false },
  { id: "F-8", question: "How do you determine the offer price?", category: "Pricing", active: true },
  { id: "F-9", question: "Are there any hidden fees or commissions?", category: "Pricing", active: true },
  { id: "F-10", question: "Will I get a fair market value for my home?", category: "Pricing", active: true },
  { id: "F-11", question: "What legal documents are required to sell?", category: "Legal", active: true },
  { id: "F-12", question: "Do I need a lawyer to sell my house?", category: "Legal", active: true },
  { id: "F-13", question: "What are the tax implications of selling?", category: "Legal", active: false },
  { id: "F-14", question: "What happens on closing day?", category: "Closing", active: true },
  { id: "F-15", question: "How soon will I receive payment after closing?", category: "Closing", active: true },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FAQManagePage() {
  const [activeTab, setActiveTab] = useState<FAQCategory | "All">("All");
  const [items, setItems] = useState(faqs);

  const filtered = activeTab === "All" ? items : items.filter((f) => f.category === activeTab);

  const toggleActive = (id: string) => {
    setItems((prev) =>
      prev.map((f) => (f.id === id ? { ...f, active: !f.active } : f))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1B2A4A]">FAQ Management</h1>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add FAQ
        </Button>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        {(["All", ...allCategories] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeTab === cat
                ? "bg-[#1B2A4A] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ list */}
      <Card>
        <CardContent className="pt-6 divide-y divide-gray-100">
          {filtered.map((faq) => (
            <div key={faq.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
              {/* Drag handle */}
              <GripVertical className="h-5 w-5 shrink-0 text-gray-300 cursor-grab" />

              {/* Question + category badge */}
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium", faq.active ? "text-[#1B2A4A]" : "text-gray-400 line-through")}>
                  {faq.question}
                </p>
                <span className={cn("mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium", categoryColors[faq.category])}>
                  {faq.category}
                </span>
              </div>

              {/* Status toggle */}
              <button
                onClick={() => toggleActive(faq.id)}
                className="shrink-0"
                aria-label="Toggle active"
              >
                <div
                  className={cn(
                    "relative h-5 w-9 rounded-full transition-colors",
                    faq.active ? "bg-[#2E7D52]" : "bg-gray-300"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform shadow-sm",
                      faq.active ? "left-[18px]" : "left-0.5"
                    )}
                  />
                </div>
              </button>

              {/* Edit / Delete */}
              <div className="flex items-center gap-1 shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
