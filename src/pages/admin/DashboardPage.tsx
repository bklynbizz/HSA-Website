import { useState } from "react";
import {
  Users,
  TrendingUp,
  TrendingDown,
  CalendarDays,
  Mail,
  FileText,
  Eye,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

interface SummaryCard {
  label: string;
  value: number;
  change: number;
  icon: React.ElementType;
}

const summaryCards: SummaryCard[] = [
  { label: "New Leads This Week", value: 24, change: 12, icon: Users },
  { label: "Total Leads This Month", value: 87, change: 8, icon: TrendingUp },
  { label: "Upcoming Consultations", value: 6, change: -3, icon: CalendarDays },
  { label: "Unread Inquiries", value: 14, change: 5, icon: Mail },
];

const weeklyLeadVolume = [
  { week: "Week 1", count: 18 },
  { week: "Week 2", count: 25 },
  { week: "Week 3", count: 21 },
  { week: "Week 4", count: 30 },
];

type LeadStatus = "new" | "contacted" | "offer_made" | "under_contract" | "closed";

interface RecentLead {
  id: string;
  name: string;
  address: string;
  type: string;
  status: LeadStatus;
  date: string;
}

const recentLeads: RecentLead[] = [
  { id: "L-1042", name: "Maria Gonzalez", address: "742 Evergreen Terrace, Phoenix AZ", type: "Single Family", status: "new", date: "Mar 17, 2026" },
  { id: "L-1041", name: "James Chen", address: "1200 Oak Valley Dr, Scottsdale AZ", type: "Condo", status: "contacted", date: "Mar 16, 2026" },
  { id: "L-1040", name: "Patricia Williams", address: "885 Desert Bloom Ln, Mesa AZ", type: "Townhouse", status: "offer_made", date: "Mar 15, 2026" },
  { id: "L-1039", name: "Robert Taylor", address: "3310 Cactus Wren Ave, Tempe AZ", type: "Single Family", status: "under_contract", date: "Mar 14, 2026" },
  { id: "L-1038", name: "Linda Nguyen", address: "550 Sunset Ridge Rd, Chandler AZ", type: "Multi-Family", status: "closed", date: "Mar 13, 2026" },
];

interface RecentInquiry {
  id: string;
  name: string;
  message: string;
  timeAgo: string;
}

const recentInquiries: RecentInquiry[] = [
  { id: "I-301", name: "David Martinez", message: "Hi, I was wondering what the process looks like for selling a property that needs major repairs...", timeAgo: "25 min ago" },
  { id: "I-300", name: "Susan Park", message: "We are relocating for work and need to sell our home quickly. Can you provide a cash offer?", timeAgo: "2 hours ago" },
  { id: "I-299", name: "Kevin O'Brien", message: "I have an inherited property in Glendale that I'd like to discuss. What are the tax implications...", timeAgo: "5 hours ago" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  new: { label: "New", className: "bg-blue-100 text-blue-800" },
  contacted: { label: "Contacted", className: "bg-amber-100 text-amber-800" },
  offer_made: { label: "Offer Made", className: "bg-secondary/20 text-secondary-dark" },
  under_contract: { label: "Under Contract", className: "bg-accent/15 text-accent-dark" },
  closed: { label: "Closed", className: "bg-green-100 text-green-800" },
};

const maxBarCount = Math.max(...weeklyLeadVolume.map((w) => w.count));

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const [_refresh, setRefresh] = useState(0);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Overview Dashboard</h1>
          <p className="text-sm text-text-secondary mt-1 tracking-wide">Welcome back. Here is what is happening today.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setRefresh((r) => r + 1)}>
          Refresh
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          const isPositive = card.change >= 0;
          return (
            <Card key={card.label}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl",
                      "bg-primary/10"
                    )}
                  >
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge
                    className={cn(
                      "text-[11px] font-semibold",
                      isPositive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    )}
                  >
                    {isPositive ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    )}
                    {isPositive ? "+" : ""}
                    {card.change}%
                  </Badge>
                </div>
                <p className="mt-5 text-4xl font-bold text-text-primary tracking-tight">{card.value}</p>
                <p className="mt-1.5 text-sm font-medium text-text-muted">{card.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bar chart + recent inquiries row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Volume Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Lead Volume (Past 4 Weeks)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-6 h-48">
              {weeklyLeadVolume.map((w) => (
                <div key={w.week} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-sm font-bold text-text-primary">{w.count}</span>
                  <div
                    className="w-full rounded-t-lg bg-primary/80 hover:bg-primary transition-all duration-300 shadow-sm"
                    style={{ height: `${(w.count / maxBarCount) * 100}%` }}
                  />
                  <span className="text-xs font-medium text-text-secondary">{w.week}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="border-b border-border-light pb-4 last:border-0 last:pb-0 hover:bg-bg-secondary -mx-4 px-4 py-2 transition-colors rounded-lg cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-text-primary">{inq.name}</p>
                  <span className="flex items-center text-xs font-medium text-text-muted">
                    <Clock className="mr-1.5 h-3.5 w-3.5" />
                    {inq.timeAgo}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-text-secondary line-clamp-2 leading-relaxed">{inq.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-4">
          <CardTitle className="text-lg">Recent Leads</CardTitle>
          <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary-dark hover:bg-secondary/10">
            View All <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Property Address</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLeads.map((lead) => {
                const sc = statusConfig[lead.status];
                return (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell className="max-w-[220px] truncate">{lead.address}</TableCell>
                    <TableCell>{lead.type}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          sc.className
                        )}
                      >
                        {sc.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-500">{lead.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
