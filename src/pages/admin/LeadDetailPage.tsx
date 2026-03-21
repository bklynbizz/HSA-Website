import { useState } from "react";
import {
  ArrowLeft,
  Phone,
  Mail,
  Home,
  User,
  Pencil,
  Trash2,
  Clock,
  MessageSquare,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const lead = {
  id: "L-1042",
  name: "Maria Gonzalez",
  status: "offer_made" as const,
  assignedTo: "Sarah K.",
  property: {
    address: "742 Evergreen Terrace, Phoenix AZ 85001",
    type: "Single Family",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1850,
    condition: "Fair - needs cosmetic updates",
  },
  seller: {
    name: "Maria Gonzalez",
    phone: "(602) 555-0142",
    email: "maria.g@email.com",
    preferredContact: "Phone",
    motivation: "Relocating for a new job opportunity in Colorado. Needs to sell within 60 days. Open to cash offers and flexible on price if closing can be expedited.",
  },
};

type TimelineEventType = "status_change" | "note" | "call" | "email";

interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  description: string;
  user: string;
  timestamp: string;
}

const timeline: TimelineEvent[] = [
  { id: "t1", type: "status_change", description: "Status changed to Offer Made", user: "Sarah K.", timestamp: "Mar 17, 2026 2:30 PM" },
  { id: "t2", type: "call", description: "Follow-up call completed. Seller is interested in the offer.", user: "Sarah K.", timestamp: "Mar 16, 2026 11:00 AM" },
  { id: "t3", type: "email", description: "Sent initial property evaluation email", user: "System", timestamp: "Mar 15, 2026 4:15 PM" },
  { id: "t4", type: "status_change", description: "Status changed to Contacted", user: "Sarah K.", timestamp: "Mar 15, 2026 10:00 AM" },
  { id: "t5", type: "note", description: "Initial consultation scheduled for March 16", user: "Mike R.", timestamp: "Mar 14, 2026 9:45 AM" },
  { id: "t6", type: "status_change", description: "Lead created", user: "System", timestamp: "Mar 14, 2026 8:30 AM" },
];

interface Note {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}

const existingNotes: Note[] = [
  { id: "n1", text: "Seller mentioned the roof was replaced 2 years ago. HVAC is original. Kitchen and bathrooms need updating but are functional.", author: "Sarah K.", timestamp: "Mar 16, 2026 11:15 AM" },
  { id: "n2", text: "Property has a detached garage that is not on the MLS listing. Could add value to the offer.", author: "Mike R.", timestamp: "Mar 15, 2026 3:00 PM" },
  { id: "n3", text: "Seller prefers phone calls over email. Best to reach between 9 AM and 12 PM.", author: "Sarah K.", timestamp: "Mar 14, 2026 10:00 AM" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type LeadStatus = "new" | "contacted" | "offer_made" | "under_contract" | "closed" | "lost";

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  new: { label: "New", className: "bg-blue-100 text-blue-700" },
  contacted: { label: "Contacted", className: "bg-amber-100 text-amber-700" },
  offer_made: { label: "Offer Made", className: "bg-[#D4A843]/20 text-[#D4A843]" },
  under_contract: { label: "Under Contract", className: "bg-[#2E7D52]/15 text-[#2E7D52]" },
  closed: { label: "Closed", className: "bg-green-100 text-green-700" },
  lost: { label: "Lost", className: "bg-red-100 text-red-700" },
};

const eventIcons: Record<TimelineEventType, React.ElementType> = {
  status_change: Clock,
  note: MessageSquare,
  call: Phone,
  email: Mail,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LeadDetailPage() {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [assignedTo, setAssignedTo] = useState(lead.assignedTo);
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>(existingNotes);

  const sc = statusConfig[status];

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setNotes((prev) => [
      {
        id: `n${Date.now()}`,
        text: newNote.trim(),
        author: "You",
        timestamp: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      },
      ...prev,
    ]);
    setNewNote("");
  };

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[#1B2A4A]">{lead.name}</h1>
              <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", sc.className)}>
                {sc.label}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">Lead ID: {lead.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Home className="h-5 w-5 text-[#2E7D52]" /> Property Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-[#1B2A4A]">{lead.property.address}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1 text-sm text-[#1B2A4A]">{lead.property.type}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Bedrooms</dt>
                  <dd className="mt-1 text-sm text-[#1B2A4A]">{lead.property.bedrooms}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Bathrooms</dt>
                  <dd className="mt-1 text-sm text-[#1B2A4A]">{lead.property.bathrooms}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Square Feet</dt>
                  <dd className="mt-1 text-sm text-[#1B2A4A]">{lead.property.sqft.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Condition</dt>
                  <dd className="mt-1 text-sm text-[#1B2A4A]">{lead.property.condition}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Seller Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-[#D4A843]" /> Seller Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-[#1B2A4A]">{lead.seller.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1">
                    <a href={`tel:${lead.seller.phone}`} className="text-sm text-[#2E7D52] hover:underline flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" /> {lead.seller.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${lead.seller.email}`} className="text-sm text-[#2E7D52] hover:underline flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" /> {lead.seller.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Preferred Contact</dt>
                  <dd className="mt-1 text-sm text-[#1B2A4A]">{lead.seller.preferredContact}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Motivation</dt>
                  <dd className="mt-1 text-sm text-[#1B2A4A] leading-relaxed">{lead.seller.motivation}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-500">Current Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as LeadStatus)}
                  className="h-12 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus:border-[#1B2A4A] focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]"
                >
                  {(Object.keys(statusConfig) as LeadStatus[]).map((s) => (
                    <option key={s} value={s}>{statusConfig[s].label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-500">Assigned To</label>
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="h-12 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus:border-[#1B2A4A] focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]"
                >
                  <option>Sarah K.</option>
                  <option>Mike R.</option>
                  <option>Jessica T.</option>
                </select>
              </div>
              <Button className="w-full">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Timeline / Activity Log */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-6 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-gray-200">
                {timeline.map((event) => {
                  const Icon = eventIcons[event.type];
                  return (
                    <div key={event.id} className="relative flex gap-4 pl-1">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5F5F0] ring-4 ring-white z-10">
                        <Icon className="h-4 w-4 text-[#1B2A4A]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#1B2A4A]">{event.description}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {event.user} &middot; {event.timestamp}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="min-h-[80px]"
              />
              <Button size="sm" onClick={handleAddNote} disabled={!newNote.trim()}>
                Add Note
              </Button>

              <div className="space-y-4 mt-4">
                {notes.map((note) => (
                  <div key={note.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <p className="text-sm text-[#1B2A4A] leading-relaxed">{note.text}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {note.author} &middot; {note.timestamp}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
