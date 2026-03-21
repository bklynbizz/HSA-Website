import { useState } from "react";
import {
  Upload,
  Search,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Grid,
  List,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Types & Data
// ---------------------------------------------------------------------------

interface MediaItem {
  id: string;
  filename: string;
  size: string;
  dimensions: string;
  date: string;
  alt: string;
  type: "image" | "document";
}

const mediaItems: MediaItem[] = [
  { id: "M-1", filename: "hero-banner-spring-2026.jpg", size: "1.2 MB", dimensions: "1920x800", date: "Mar 15, 2026", alt: "Spring 2026 hero banner", type: "image" },
  { id: "M-2", filename: "property-742-evergreen.jpg", size: "845 KB", dimensions: "1200x800", date: "Mar 14, 2026", alt: "742 Evergreen Terrace exterior", type: "image" },
  { id: "M-3", filename: "team-photo-office.jpg", size: "2.1 MB", dimensions: "2400x1600", date: "Mar 12, 2026", alt: "Team photo in office", type: "image" },
  { id: "M-4", filename: "testimonial-gonzalez.jpg", size: "320 KB", dimensions: "600x600", date: "Mar 10, 2026", alt: "Gonzalez family testimonial", type: "image" },
  { id: "M-5", filename: "blog-selling-tips-2026.jpg", size: "540 KB", dimensions: "1200x630", date: "Mar 8, 2026", alt: "Blog post header - selling tips", type: "image" },
  { id: "M-6", filename: "property-1200-oak-valley.jpg", size: "920 KB", dimensions: "1200x800", date: "Mar 5, 2026", alt: "1200 Oak Valley Dr exterior", type: "image" },
  { id: "M-7", filename: "logo-dark.svg", size: "12 KB", dimensions: "200x60", date: "Feb 28, 2026", alt: "HSA logo dark variant", type: "image" },
  { id: "M-8", filename: "logo-light.svg", size: "11 KB", dimensions: "200x60", date: "Feb 28, 2026", alt: "HSA logo light variant", type: "image" },
  { id: "M-9", filename: "service-area-map.png", size: "1.5 MB", dimensions: "1600x900", date: "Feb 20, 2026", alt: "Arizona service area map", type: "image" },
  { id: "M-10", filename: "blog-market-report-q1.jpg", size: "680 KB", dimensions: "1200x630", date: "Feb 15, 2026", alt: "Q1 market report header", type: "image" },
  { id: "M-11", filename: "property-885-desert-bloom.jpg", size: "780 KB", dimensions: "1200x800", date: "Feb 10, 2026", alt: "885 Desert Bloom exterior", type: "image" },
  { id: "M-12", filename: "favicon.ico", size: "4 KB", dimensions: "32x32", date: "Jan 15, 2026", alt: "Site favicon", type: "image" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MediaPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = mediaItems.filter((item) => {
    if (search && !item.filename.toLowerCase().includes(search.toLowerCase()) && !item.alt.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1B2A4A]">Media Library</h1>
        <Button size="sm">
          <Upload className="mr-2 h-4 w-4" /> Upload Files
        </Button>
      </div>

      {/* Upload Dropzone */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-[#F5F5F0]/50 py-12 px-6 text-center hover:border-[#D4A843] transition-colors cursor-pointer">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1B2A4A]/10 mb-4">
              <Upload className="h-6 w-6 text-[#1B2A4A]" />
            </div>
            <p className="text-sm font-medium text-[#1B2A4A]">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG, SVG, WEBP, or PDF. Max 10MB per file.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Search + View toggle */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by filename or alt text..."
            className="h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-[#1B2A4A] focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]"
          />
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-1">
          <button
            onClick={() => setView("grid")}
            className={cn(
              "rounded p-1.5 transition-colors",
              view === "grid" ? "bg-[#1B2A4A] text-white" : "text-gray-500 hover:bg-gray-100"
            )}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={cn(
              "rounded p-1.5 transition-colors",
              view === "list" ? "bg-[#1B2A4A] text-white" : "text-gray-500 hover:bg-gray-100"
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
        <Button variant="ghost" size="sm">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image placeholder */}
              <div className="relative aspect-square rounded-lg border border-gray-200 bg-[#F5F5F0] flex items-center justify-center overflow-hidden">
                <ImageIcon className="h-8 w-8 text-gray-300" />

                {/* Hover overlay */}
                {hoveredId === item.id && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 rounded-lg transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* File info */}
              <div className="mt-2">
                <p className="text-xs font-medium text-[#1B2A4A] truncate" title={item.filename}>
                  {item.filename}
                </p>
                <p className="text-[11px] text-gray-400">
                  {item.size} &middot; {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <Card>
          <CardContent className="pt-0 px-0">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F5F0]">
                <tr className="border-b">
                  <th className="h-11 px-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Preview</th>
                  <th className="h-11 px-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Filename</th>
                  <th className="h-11 px-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Alt Text</th>
                  <th className="h-11 px-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Size</th>
                  <th className="h-11 px-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Dimensions</th>
                  <th className="h-11 px-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                  <th className="h-11 px-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="h-10 w-10 rounded border border-gray-200 bg-[#F5F5F0] flex items-center justify-center">
                        <ImageIcon className="h-4 w-4 text-gray-300" />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-[#1B2A4A] max-w-[200px] truncate">{item.filename}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-[180px] truncate">{item.alt}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{item.size}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{item.dimensions}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{item.date}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      <p className="text-sm text-gray-500">
        {filtered.length} file{filtered.length !== 1 ? "s" : ""} &middot; Total size: ~9.9 MB
      </p>
    </div>
  );
}
