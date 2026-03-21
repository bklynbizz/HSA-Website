import { useState } from "react";
import {
  Calendar,
  List,
  ChevronLeft,
  ChevronRight,
  Eye,
  Phone,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
// Types & Data
// ---------------------------------------------------------------------------

type ConsultationStatus = "scheduled" | "completed" | "cancelled" | "no_show";
type ConsultationType = "phone" | "in_person" | "virtual";

interface Consultation {
  id: string;
  date: string;
  time: string;
  type: ConsultationType;
  name: string;
  phone: string;
  property: string;
  status: ConsultationStatus;
}

const statusMeta: Record<ConsultationStatus, { label: string; className: string; dotColor: string }> = {
  scheduled: { label: "Scheduled", className: "bg-blue-100 text-blue-700", dotColor: "bg-blue-500" },
  completed: { label: "Completed", className: "bg-green-100 text-green-700", dotColor: "bg-green-500" },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-700", dotColor: "bg-red-500" },
  no_show: { label: "No Show", className: "bg-gray-100 text-gray-600", dotColor: "bg-gray-400" },
};

const typeMeta: Record<ConsultationType, { label: string; className: string }> = {
  phone: { label: "Phone", className: "bg-purple-100 text-purple-700" },
  in_person: { label: "In Person", className: "bg-[#2E7D52]/15 text-[#2E7D52]" },
  virtual: { label: "Virtual", className: "bg-blue-100 text-blue-700" },
};

const consultations: Consultation[] = [
  { id: "C-201", date: "2026-03-18", time: "9:00 AM", type: "phone", name: "Maria Gonzalez", phone: "(602) 555-0142", property: "742 Evergreen Terrace, Phoenix AZ", status: "scheduled" },
  { id: "C-202", date: "2026-03-18", time: "11:30 AM", type: "in_person", name: "James Chen", phone: "(480) 555-0198", property: "1200 Oak Valley Dr, Scottsdale AZ", status: "scheduled" },
  { id: "C-203", date: "2026-03-19", time: "2:00 PM", type: "virtual", name: "Patricia Williams", phone: "(602) 555-0267", property: "885 Desert Bloom Ln, Mesa AZ", status: "scheduled" },
  { id: "C-204", date: "2026-03-20", time: "10:00 AM", type: "phone", name: "Robert Taylor", phone: "(623) 555-0334", property: "3310 Cactus Wren Ave, Tempe AZ", status: "scheduled" },
  { id: "C-205", date: "2026-03-16", time: "3:00 PM", type: "in_person", name: "Linda Nguyen", phone: "(480) 555-0411", property: "550 Sunset Ridge Rd, Chandler AZ", status: "completed" },
  { id: "C-206", date: "2026-03-15", time: "1:00 PM", type: "virtual", name: "Michael Brown", phone: "(602) 555-0523", property: "2100 Mesquite Way, Gilbert AZ", status: "completed" },
  { id: "C-207", date: "2026-03-14", time: "9:30 AM", type: "phone", name: "Jennifer Davis", phone: "(623) 555-0687", property: "4420 Palo Verde Blvd, Glendale AZ", status: "cancelled" },
  { id: "C-208", date: "2026-03-13", time: "4:00 PM", type: "in_person", name: "William Anderson", phone: "(480) 555-0745", property: "775 Ironwood Ct, Peoria AZ", status: "no_show" },
];

// ---------------------------------------------------------------------------
// Calendar helpers
// ---------------------------------------------------------------------------

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

function consultationsOnDay(year: number, month: number, day: number) {
  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return consultations.filter((c) => c.date === dateStr);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ConsultationsPage() {
  const [view, setView] = useState<"calendar" | "list">("list");
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(2); // March = 2

  const calDays = getCalendarDays(calYear, calMonth);

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1); }
    else setCalMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1); }
    else setCalMonth((m) => m + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1B2A4A]">Consultations</h1>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-1">
          <button
            onClick={() => setView("calendar")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              view === "calendar" ? "bg-[#1B2A4A] text-white" : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <Calendar className="h-4 w-4" /> Calendar
          </button>
          <button
            onClick={() => setView("list")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              view === "list" ? "bg-[#1B2A4A] text-white" : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <List className="h-4 w-4" /> List
          </button>
        </div>
      </div>

      {/* Calendar View */}
      {view === "calendar" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <CardTitle className="text-lg">
              {MONTH_NAMES[calMonth]} {calYear}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent>
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-px mb-2">
              {DAY_LABELS.map((d) => (
                <div key={d} className="text-center text-xs font-semibold text-gray-500 py-2">
                  {d}
                </div>
              ))}
            </div>
            {/* Day cells */}
            <div className="grid grid-cols-7 gap-px">
              {calDays.map((day, idx) => {
                const events = day ? consultationsOnDay(calYear, calMonth, day) : [];
                const isToday = day === 18 && calMonth === 2 && calYear === 2026;
                return (
                  <div
                    key={idx}
                    className={cn(
                      "min-h-[80px] border border-gray-100 p-2 text-sm",
                      day ? "bg-white" : "bg-gray-50",
                      isToday && "ring-2 ring-[#D4A843] ring-inset"
                    )}
                  >
                    {day && (
                      <>
                        <span className={cn("text-xs font-medium", isToday ? "text-[#D4A843]" : "text-gray-700")}>
                          {day}
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {events.map((ev) => (
                            <span
                              key={ev.id}
                              className={cn("h-2 w-2 rounded-full", statusMeta[ev.status].dotColor)}
                              title={`${ev.time} - ${ev.name}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-4">
              {(Object.keys(statusMeta) as ConsultationStatus[]).map((s) => (
                <div key={s} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className={cn("h-2.5 w-2.5 rounded-full", statusMeta[s].dotColor)} />
                  {statusMeta[s].label}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* List View */}
      {view === "list" && (
        <Card>
          <CardContent className="pt-0 px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {consultations.map((c) => {
                  const sm = statusMeta[c.status];
                  const tm = typeMeta[c.type];
                  return (
                    <TableRow key={c.id}>
                      <TableCell className="whitespace-nowrap font-medium">{c.date}</TableCell>
                      <TableCell className="whitespace-nowrap">{c.time}</TableCell>
                      <TableCell>
                        <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", tm.className)}>
                          {tm.label}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <a href={`tel:${c.phone}`} className="flex items-center gap-1 text-[#2E7D52] hover:underline text-sm">
                          <Phone className="h-3.5 w-3.5" /> {c.phone}
                        </a>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{c.property}</TableCell>
                      <TableCell>
                        <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", sm.className)}>
                          {sm.label}
                        </span>
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
