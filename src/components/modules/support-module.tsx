import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/shared/stat-card";
import { SearchInput } from "@/components/shared/search-input";
import { StatusBadge } from "@/components/shared/status-badge";
import { MessageSquare, Clock, CheckCircle2, AlertCircle, Bot } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Row } from "@/lib/database.types";

function formatRelativeTime(dateString: string): string {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const diffSeconds = Math.floor((now - then) / 1000);

  if (diffSeconds < 60) return `${diffSeconds}s ago`;

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function getInitials(name: string | null): string {
  if (!name) return "?";
  return name.split(" ").map(n => n[0]).join("").slice(0, 2);
}

interface SupportModuleProps {
  context: "superadmin" | "merchant";
}

export function SupportModule({ context }: SupportModuleProps) {
  const { t } = useTranslation("superadmin");

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["support_tickets", context],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("support_tickets")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Row<"support_tickets">[];
    },
  });

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
            {isLoading
              ? Array.from({ length: 3 }, (_, i) => (
                  <Card key={i} className="overflow-visible">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Skeleton className="h-9 w-9 rounded-full flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-48" />
                          <Skeleton className="h-4 w-64" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              : tickets
                  .filter(t => tab === "all" || t.status === tab)
                  .map((ticket) => (
                    <Card key={ticket.id} className="hover-elevate overflow-visible cursor-pointer" data-testid={`card-support-${ticket.id}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-9 w-9 flex-shrink-0">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {getInitials(ticket.from_name)}
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
                              <span>{ticket.from_name ?? "Unknown"}</span>
                              <span>{t("support.via", { channel: ticket.channel })}</span>
                              <span>{formatRelativeTime(ticket.created_at)}</span>
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
