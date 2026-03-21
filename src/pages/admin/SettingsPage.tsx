import { useState } from "react";
import {
  Settings,
  Palette,
  Search as SearchIcon,
  Plug,
  Save,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SettingsTab = "general" | "design" | "seo" | "integrations";

const tabs: { key: SettingsTab; label: string; icon: React.ElementType }[] = [
  { key: "general", label: "General", icon: Settings },
  { key: "design", label: "Design", icon: Palette },
  { key: "seo", label: "SEO", icon: SearchIcon },
  { key: "integrations", label: "Integrations", icon: Plug },
];

// Section visibility toggles
const homepageSections = [
  { id: "hero", label: "Hero Banner", enabled: true },
  { id: "services", label: "Services Overview", enabled: true },
  { id: "process", label: "How It Works", enabled: true },
  { id: "testimonials", label: "Testimonials", enabled: true },
  { id: "faq", label: "FAQ Section", enabled: false },
  { id: "cta", label: "Call to Action", enabled: true },
  { id: "map", label: "Service Area Map", enabled: false },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [sections, setSections] = useState(homepageSections);

  const toggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-[#1B2A4A]">Settings</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px",
                activeTab === tab.key
                  ? "border-[#1B2A4A] text-[#1B2A4A]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* General Tab */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Company Name" defaultValue="Home Sellers Amigo" />
                <Input label="Phone Number" defaultValue="(602) 555-1234" />
                <Input label="Email Address" type="email" defaultValue="info@homesellersamigo.homes" />
                <Input label="Address" defaultValue="1234 N Central Ave, Phoenix, AZ 85004" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Office Hours (Weekdays)" defaultValue="9:00 AM - 6:00 PM" />
                <Input label="Office Hours (Weekends)" defaultValue="10:00 AM - 4:00 PM" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Logo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                  <Button variant="secondary" size="sm">Upload Logo</Button>
                  <p className="text-xs text-gray-400 mt-1">PNG, SVG, or WEBP. Max 2MB.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Facebook" placeholder="https://facebook.com/..." defaultValue="https://facebook.com/homesellersamigo" />
                <Input label="Instagram" placeholder="https://instagram.com/..." defaultValue="https://instagram.com/hsamigo_az" />
                <Input label="LinkedIn" placeholder="https://linkedin.com/company/..." defaultValue="" />
                <Input label="YouTube" placeholder="https://youtube.com/@..." defaultValue="" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Design Tab */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === "design" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Brand Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: "Primary", value: "#1B2A4A" },
                  { label: "Secondary", value: "#D4A843" },
                  { label: "Accent", value: "#2E7D52" },
                ].map((color) => (
                  <div key={color.label}>
                    <label className="mb-1.5 block text-sm font-medium text-[#1B2A4A]">{color.label}</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        defaultValue={color.value}
                        className="h-10 w-14 cursor-pointer rounded border border-gray-300 p-1"
                      />
                      <input
                        type="text"
                        defaultValue={color.value}
                        className="h-10 flex-1 rounded-md border border-gray-300 px-3 text-sm font-mono uppercase focus:border-[#1B2A4A] focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Typography</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-64">
                <label className="mb-1.5 block text-sm font-medium text-[#1B2A4A]">Primary Font</label>
                <select
                  defaultValue="Inter"
                  className="h-12 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus:border-[#1B2A4A] focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]"
                >
                  <option>Inter</option>
                  <option>Roboto</option>
                  <option>Open Sans</option>
                  <option>Lato</option>
                  <option>Poppins</option>
                  <option>Montserrat</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Homepage Section Visibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sections.map((section) => (
                  <div key={section.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-[#1B2A4A]">{section.label}</span>
                    <button
                      onClick={() => toggleSection(section.id)}
                      aria-label={`Toggle ${section.label}`}
                    >
                      <div
                        className={cn(
                          "relative h-5 w-9 rounded-full transition-colors",
                          section.enabled ? "bg-[#2E7D52]" : "bg-gray-300"
                        )}
                      >
                        <div
                          className={cn(
                            "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform shadow-sm",
                            section.enabled ? "left-[18px]" : "left-0.5"
                          )}
                        />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* SEO Tab */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === "seo" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Meta Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Default Meta Title Template"
                defaultValue="%page_title% | Home Sellers Amigo - Sell Your Home Fast in AZ"
                helperText="Use %page_title% as a placeholder for the page name."
              />
              <Textarea
                label="Default Meta Description"
                defaultValue="Home Sellers Amigo helps Arizona homeowners sell their properties quickly for cash. No repairs, no commissions, no hassle. Get a fair offer today."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analytics & Indexing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Google Analytics Measurement ID"
                placeholder="G-XXXXXXXXXX"
                defaultValue="G-ABC123XYZ"
              />
              <Input
                label="Google Search Console Verification"
                placeholder="Verification meta tag content"
                defaultValue=""
              />
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-[#1B2A4A]">Auto-generate Sitemap</p>
                  <p className="text-xs text-gray-400">Generate sitemap.xml automatically on publish</p>
                </div>
                <div className="relative h-5 w-9 rounded-full bg-[#2E7D52] cursor-pointer">
                  <div className="absolute top-0.5 left-[18px] h-4 w-4 rounded-full bg-white shadow-sm" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Integrations Tab */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === "integrations" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analytics & Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Google Tag Manager ID"
                placeholder="GTM-XXXXXXX"
                defaultValue="GTM-A1B2C3D"
              />
              <Input
                label="Facebook Pixel ID"
                placeholder="1234567890"
                defaultValue="9876543210"
              />
              <Input
                label="Google Ads Conversion ID"
                placeholder="AW-XXXXXXXXX"
                defaultValue=""
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">CRM Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="CRM API Key"
                type="password"
                placeholder="Enter your CRM API key"
                defaultValue="sk-xxxxxxxxxxxx"
              />
              <Input
                label="Webhook URL (Lead Notifications)"
                placeholder="https://hooks.example.com/..."
                defaultValue="https://hooks.zapier.com/hooks/catch/12345/abcdef/"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Email Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="SendGrid API Key"
                type="password"
                placeholder="SG.xxxxxxxxxxxx"
                defaultValue="SG.xxxxxxxxxxxx"
              />
              <Input
                label="Notification Email"
                type="email"
                defaultValue="leads@homesellersamigo.homes"
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
