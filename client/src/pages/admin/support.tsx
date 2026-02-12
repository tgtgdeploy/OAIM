import { AdminLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/shared/stat-card";
import { SearchInput } from "@/components/shared/search-input";
import { StatusBadge } from "@/components/shared/status-badge";
import { MessageSquare, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import "@/styles/admin.css";

const tickets = [
  { id: "TK-001", tenant: "Fashion Hub KL", subject: "WhatsApp messages not sending", priority: "urgent", status: "open", created: "2h ago" },
  { id: "TK-002", tenant: "Nasi Kandar Express", subject: "Cannot import menu CSV", priority: "medium", status: "in_progress", created: "5h ago" },
  { id: "TK-003", tenant: "Tech Gadgets MY", subject: "Request to increase message limit", priority: "low", status: "open", created: "1d ago" },
  { id: "TK-004", tenant: "Shoe Palace", subject: "AI script responding incorrectly", priority: "high", status: "in_progress", created: "1d ago" },
  { id: "TK-005", tenant: "Cafe Artisan", subject: "How to connect WhatsApp API?", priority: "medium", status: "resolved", created: "2d ago" },
  { id: "TK-006", tenant: "HomeDecor Plus", subject: "Pipeline stages customization", priority: "low", status: "resolved", created: "3d ago" },
  { id: "TK-007", tenant: "Fashion Hub KL", subject: "Billing inquiry - double charge", priority: "urgent", status: "open", created: "30m ago" },
];

export default function SupportPage() {
  return (
    <AdminLayout title="Support">
      <div className="admin-content section-spacing">
        <div className="stats-grid">
          <StatCard label="Open" value={tickets.filter(t => t.status === "open").length.toString()} icon={MessageSquare} iconColor="text-blue-500" />
          <StatCard label="In Progress" value={tickets.filter(t => t.status === "in_progress").length.toString()} icon={Clock} iconColor="text-yellow-500" />
          <StatCard label="Resolved" value={tickets.filter(t => t.status === "resolved").length.toString()} icon={CheckCircle2} iconColor="text-green-500" />
          <StatCard label="Urgent" value={tickets.filter(t => t.priority === "urgent").length.toString()} icon={AlertCircle} iconColor="text-red-500" />
        </div>

        <SearchInput placeholder="Search tickets..." testId="input-search-tickets" />

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all" data-testid="tab-all-tickets">All</TabsTrigger>
            <TabsTrigger value="open" data-testid="tab-open-tickets">Open</TabsTrigger>
            <TabsTrigger value="in_progress" data-testid="tab-progress-tickets">In Progress</TabsTrigger>
            <TabsTrigger value="resolved" data-testid="tab-resolved-tickets">Resolved</TabsTrigger>
          </TabsList>

          {["all", "open", "in_progress", "resolved"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-2 mt-4">
              {tickets
                .filter(t => tab === "all" || t.status === tab)
                .map((ticket) => (
                  <Card key={ticket.id} className="hover-elevate overflow-visible cursor-pointer" data-testid={`card-ticket-${ticket.id}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-9 w-9 flex-shrink-0">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {ticket.tenant.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                            <StatusBadge status={ticket.priority} />
                            <StatusBadge status={ticket.status} />
                          </div>
                          <h3 className="text-sm font-medium">{ticket.subject}</h3>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span>{ticket.tenant}</span>
                            <span>-</span>
                            <span>{ticket.created}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" data-testid={`button-view-ticket-${ticket.id}`}>
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AdminLayout>
  );
}
