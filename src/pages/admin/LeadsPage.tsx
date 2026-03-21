import { useState } from "react";
import {
  Search,
  Download,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

// ---------------------------------------------------------------------------
// Types & Data
// ---------------------------------------------------------------------------

type LeadStatus =
  | "new"
  | "contacted"
  | "offer_made"
  | "under_contract"
  | "closed"
  | "lost";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  type: string;
  condition: string;
  timeline: string;
  status: LeadStatus;
  assignedTo: string;
  date: string;
}

const statusMeta: Record<
  LeadStatus,
  { label: string; className: string; count: number }
> = {
  new: { label: "New", className: "bg-blue-100 text-blue-700", count: 24 },
  contacted: { label: "Contacted", className: "bg-amber-100 text-amber-700", count: 18 },
  offer_made: { label: "Offer Made", className: "bg-[#D4A843]/20 text-[#D4A843]", count: 12 },
  under_contract: { label: "Under Contract", className: "bg-[#2E7D52]/15 text-[#2E7D52]", count: 8 },
  closed: { label: "Closed", className: "bg-green-100 text-green-700", count: 19 },
  lost: { label: "Lost", className: "bg-red-100 text-red-700", count: 6 },
};

const leads: Lead[] = [
  { id: "L-1042", name: "Maria Gonzalez", phone: "(602) 555-0142", email: "maria.g@email.com", address: "742 Evergreen Terrace, Phoenix AZ", type: "Single Family", condition: "Fair", timeline: "1-3 months", status: "new", assignedTo: "Sarah K.", date: "Mar 17, 2026" },
  { id: "L-1041", name: "James Chen", phone: "(480) 555-0198", email: "j.chen@email.com", address: "1200 Oak Valley Dr, Scottsdale AZ", type: "Condo", condition: "Good", timeline: "ASAP", status: "contacted", assignedTo: "Mike R.", date: "Mar 16, 2026" },
  { id: "L-1040", name: "Patricia Williams", phone: "(602) 555-0267", email: "pwilliams@email.com", address: "885 Desert Bloom Ln, Mesa AZ", type: "Townhouse", condition: "Needs Repair", timeline: "3-6 months", status: "offer_made", assignedTo: "Sarah K.", date: "Mar 15, 2026" },
  { id: "L-1039", name: "Robert Taylor", phone: "(623) 555-0334", email: "rtaylor@email.com", address: "3310 Cactus Wren Ave, Tempe AZ", type: "Single Family", condition: "Excellent", timeline: "1-3 months", status: "under_contract", assignedTo: "Mike R.", date: "Mar 14, 2026" },
  { id: "L-1038", name: "Linda Nguyen", phone: "(480) 555-0411", email: "lnguyen@email.com", address: "550 Sunset Ridge Rd, Chandler AZ", type: "Multi-Family", condition: "Fair", timeline: "ASAP", status: "closed", assignedTo: "Sarah K.", date: "Mar 13, 2026" },
  { id: "L-1037", name: "Michael Brown", phone: "(602) 555-0523", email: "mbrown@email.com", address: "2100 Mesquite Way, Gilbert AZ", type: "Single Family", condition: "Good", timeline: "6+ months", status: "new", assignedTo: "Mike R.", date: "Mar 12, 2026" },
  { id: "L-1036", name: "Jennifer Davis", phone: "(623) 555-0687", email: "jdavis@email.com", address: "4420 Palo Verde Blvd, Glendale AZ", type: "Single Family", condition: "Needs Repair", timeline: "1-3 months", status: "lost", assignedTo: "Sarah K.", date: "Mar 11, 2026" },
  { id: "L-1035", name: "William Anderson", phone: "(480) 555-0745", email: "wanderson@email.com", address: "775 Ironwood Ct, Peoria AZ", type: "Condo", condition: "Good", timeline: "ASAP", status: "contacted", assignedTo: "Mike R.", date: "Mar 10, 2026" },
  { id: "L-1034", name: "Elizabeth Moore", phone: "(602) 555-0812", email: "emoore@email.com", address: "1600 Saguaro St, Surprise AZ", type: "Townhouse", condition: "Fair", timeline: "3-6 months", status: "new", assignedTo: "Sarah K.", date: "Mar 9, 2026" },
  { id: "L-1033", name: "Christopher Lee", phone: "(623) 555-0996", email: "clee@email.com", address: "3005 Ocotillo Dr, Buckeye AZ", type: "Single Family", condition: "Excellent", timeline: "1-3 months", status: "offer_made", assignedTo: "Mike R.", date: "Mar 8, 2026" },
];

const totalLeads = Object.values(statusMeta).reduce((s, v) => s + v.count, 0);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LeadsPage() {
  const [activeStatus, setActiveStatus] = useState<LeadStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = leads.filter((l) => {
    if (activeStatus !== "all" && l.status !== activeStatus) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.address.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1B2A4A]">Leads</h1>
        <Button size="sm">
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Filter controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-end gap-4">
            <div className="w-44">
              <label className="mb-1.5 block text-sm font-medium text-[#1B2A4A]">Status</label>
              <select className="h-12 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus:border-[#1B2A4A] focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]">
                <option value="">All Statuses</option>
                {(Object.keys(statusMeta) as LeadStatus[]).map((s) => (
                  <option key={s} value={s}>{statusMeta[s].label}</option>
                ))}
              </select>
            </div>
            <div className="w-44">
              <label className="mb-1.5 block text-sm font-medium text-[#1B2A4A]">Property Type</label>
              <select className="h-12 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus:border-[#1B2A4A] focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]">
                <option value="">All Types</option>
                <option>Single Family</option>
                <option>Condo</option>
                <option>Townhouse</option>
                <option>Multi-Family</option>
              </select>
            </div>
            <Input
              type="date"
              label="From"
              className="w-40"
            />
            <Input
              type="date"
              label="To"
              className="w-40"
            />
            <div className="relative flex-1 min-w-[200px]">
              <label className="mb-1.5 block text-sm font-medium text-[#1B2A4A]">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Name or address..."
                  className="h-12 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-[#1B2A4A] focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveStatus("all")}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            activeStatus === "all"
              ? "bg-[#1B2A4A] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          Total ({totalLeads})
        </button>
        {(Object.keys(statusMeta) as LeadStatus[]).map((s) => {
          const m = statusMeta[s];
          return (
            <button
              key={s}
              onClick={() => setActiveStatus(s)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeStatus === s
                  ? "bg-[#1B2A4A] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {m.label} ({m.count})
            </button>
          );
        })}
      </div>

      {/* Leads Table */}
      <Card>
        <CardContent className="pt-0 px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Property Address</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lead) => {
                const sm = statusMeta[lead.status];
                return (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium whitespace-nowrap">{lead.name}</TableCell>
                    <TableCell className="whitespace-nowrap">{lead.phone}</TableCell>
                    <TableCell className="text-[#2E7D52] whitespace-nowrap">{lead.email}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{lead.address}</TableCell>
                    <TableCell className="whitespace-nowrap">{lead.type}</TableCell>
                    <TableCell>{lead.condition}</TableCell>
                    <TableCell className="whitespace-nowrap">{lead.timeline}</TableCell>
                    <TableCell>
                      <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap", sm.className)}>
                        {sm.label}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{lead.assignedTo}</TableCell>
                    <TableCell className="text-gray-500 whitespace-nowrap">{lead.date}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {filtered.length} of {totalLeads} leads
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {[1, 2, 3].map((p) => (
            <Button
              key={p}
              variant={p === page ? "primary" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setPage(p)}
            >
              {p}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
