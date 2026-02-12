import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/shared/stat-card";
import { SearchInput } from "@/components/shared/search-input";
import { StatusBadge } from "@/components/shared/status-badge";
import { MessageSquare, Clock, CheckCircle2, AlertCircle, Bot, Headphones } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Ticket {
  id: string;
  from: string;
  subject: string;
  priority: string;
  status: string;
  created: string;
  channel: string;
}

const superadminTickets: Ticket[] = [
  { id: "TK-001", from: "Fashion Hub KL", subject: "WhatsApp messages not sending", priority: "urgent", status: "open", created: "2h ago", channel: "dashboard" },
  { id: "TK-002", from: "Nasi Kandar Express", subject: "Cannot import menu CSV", priority: "medium", status: "in_progress", created: "5h ago", channel: "whatsapp" },
  { id: "TK-003", from: "Tech Gadgets MY", subject: "Request to increase message limit", priority: "low", status: "open", created: "1d ago", channel: "email" },
  { id: "TK-007", from: "Fashion Hub KL", subject: "Billing inquiry - double charge", priority: "urgent", status: "open", created: "30m ago", channel: "whatsapp" },
];

const merchantTickets: Ticket[] = [
  { id: "CS-001", from: "Sarah Ahmad", subject: "Where is my order?", priority: "medium", status: "open", created: "15m ago", channel: "whatsapp" },
  { id: "CS-002", from: "David Ooi", subject: "Want to change size", priority: "low", status: "open", created: "1h ago", channel: "whatsapp" },
  { id: "CS-003", from: "Lisa Tan", subject: "Defective item received", priority: "urgent", status: "in_progress", created: "3h ago", channel: "whatsapp" },
  { id: "CS-004", from: "Mei Ling", subject: "Request for refund", priority: "high", status: "open", created: "5h ago", channel: "whatsapp" },
  { id: "CS-005", from: "James Wong", subject: "Product availability", priority: "low", status: "resolved", created: "1d ago", channel: "whatsapp" },
];

interface SupportModuleProps {
  context: "superadmin" | "merchant";
}

export function SupportModule({ context }: SupportModuleProps) {
  const { t } = useTranslation("superadmin");
  const tickets = context === "superadmin" ? superadminTickets : merchantTickets;

  return (
    <div className="space-y-4">
      <div className="stats-grid">
        <StatCard label={t("support.open")} value={tickets.filter(t => t.status === "open").length.toString()} icon={MessageSquare} iconColor="text-blue-500" />
        <StatCard label={t("support.inProgress")} value={tickets.filter(t => t.status === "in_progress").length.toString()} icon={Clock} iconColor="text-yellow-500" />
        <StatCard label={t("support.resolved")} value={tickets.filter(t => t.status === "resolved").length.toString()} icon={CheckCircle2} iconColor="text-green-500" />
        <StatCard label={t("support.urgent")} value={tickets.filter(t => t.priority === "urgent").length.toString()} icon={AlertCircle} iconColor="text-red-500" />
      </div>

      {context === "merchant" && (
        <div className="flex items-center gap-3 p-3 rounded-md bg-primary/5 border border-primary/10">
          <Bot className="h-5 w-5 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium">{t("support.aiAutoReplyActive")}</div>
            <div className="text-xs text-muted-foreground">{t("support.aiAutoReplyDesc")}</div>
          </div>
          <Button variant="outline" size="sm" data-testid="button-configure-ai-support">{t("support.configure")}</Button>
        </div>
      )}

      <SearchInput placeholder={context === "superadmin" ? t("support.searchTickets") : t("support.searchInquiries")} testId="input-search-support" />

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all" data-testid="tab-all-support">{t("support.tabAll")}</TabsTrigger>
          <TabsTrigger value="open" data-testid="tab-open-support">{t("support.tabOpen")}</TabsTrigger>
          <TabsTrigger value="in_progress" data-testid="tab-progress-support">{t("support.tabInProgress")}</TabsTrigger>
          <TabsTrigger value="resolved" data-testid="tab-resolved-support">{t("support.tabResolved")}</TabsTrigger>
        </TabsList>

        {["all", "open", "in_progress", "resolved"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-2 mt-4">
            {tickets
              .filter(t => tab === "all" || t.status === tab)
              .map((ticket) => (
                <Card key={ticket.id} className="hover-elevate overflow-visible cursor-pointer" data-testid={`card-support-${ticket.id}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-9 w-9 flex-shrink-0">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {ticket.from.split(" ").map(n => n[0]).join("").slice(0, 2)}
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
                          <span>{ticket.from}</span>
                          <span>{t("support.via", { channel: ticket.channel })}</span>
                          <span>{ticket.created}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" data-testid={`button-view-support-${ticket.id}`}>
                        {context === "merchant" ? t("support.reply") : t("support.view")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
