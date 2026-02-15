import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { SuperAdminLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, RefreshCw, Download, Webhook, Bot, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";
import type { Row } from "@/lib/database.types";
import { useAiLogs } from "@/hooks/use-ai-logs";

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString();
}

function formatLatency(ms: number | null): string {
  if (ms == null) return "\u2014";
  return `${(ms / 1000).toFixed(1)}s`;
}

export default function LogsPage() {
  const { t } = useTranslation("superadmin");

  const { data: webhookLogs = [], isLoading: whLoading } = useQuery({
    queryKey: ["webhook_logs", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("webhook_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data as Row<"webhook_logs">[];
    },
  });

  const { data: aiLogs = [], isLoading: aiLoading } = useAiLogs();

  const isLoading = whLoading || aiLoading;

  const failedLogs = useMemo(() => {
    const webhookFailed = webhookLogs
      .filter((log) => log.status === "failed")
      .map((log) => ({
        id: log.id,
        tenant: log.tenant_id,
        type: "Webhook" as const,
        error: log.error_message ?? "",
        time: formatTimestamp(log.created_at),
      }));

    const aiFailed = aiLogs
      .filter((log) => log.status === "failed")
      .map((log) => ({
        id: log.id,
        tenant: log.tenant_name ?? log.tenant_id,
        type: "AI Call" as const,
        error: log.error_message ?? "",
        time: formatTimestamp(log.created_at),
      }));

    return [...webhookFailed, ...aiFailed].sort(
      (a, b) => b.time.localeCompare(a.time),
    );
  }, [webhookLogs, aiLogs]);

  return (
    <SuperAdminLayout title={t("logs.title")}>
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t("logs.searchPlaceholder")} className="pl-9 w-64" data-testid="input-search-logs" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" data-testid="button-refresh-logs">
              <RefreshCw className="h-4 w-4 mr-2" />{t("logs.refresh")}
            </Button>
            <Button variant="outline" data-testid="button-export-logs">
              <Download className="h-4 w-4 mr-2" />{t("logs.export")}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="webhook">
          <TabsList>
            <TabsTrigger value="webhook" data-testid="tab-webhook">
              <Webhook className="h-4 w-4 mr-1.5" />{t("logs.tabWebhook")}
            </TabsTrigger>
            <TabsTrigger value="ai" data-testid="tab-ai">
              <Bot className="h-4 w-4 mr-1.5" />{t("logs.tabAiCalls")}
            </TabsTrigger>
            <TabsTrigger value="failed" data-testid="tab-failed">
              <AlertTriangle className="h-4 w-4 mr-1.5" />{t("logs.tabFailed")}
              <Badge variant="destructive" className="ml-1.5 text-xs px-1.5 min-w-5 h-5 justify-center">{failedLogs.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="webhook" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("logs.tenant")}</TableHead>
                      <TableHead>{t("logs.event")}</TableHead>
                      <TableHead>{t("logs.status")}</TableHead>
                      <TableHead>{t("logs.time")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading
                      ? Array.from({ length: 5 }, (_, i) => (
                          <TableRow key={i}>
                            <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-36" /></TableCell>
                          </TableRow>
                        ))
                      : webhookLogs.map((log) => (
                          <TableRow key={log.id} data-testid={`row-webhook-${log.id}`}>
                            <TableCell className="text-sm font-medium">{log.tenant_id}</TableCell>
                            <TableCell><Badge variant="outline" className="text-xs font-mono">{log.event_type}</Badge></TableCell>
                            <TableCell>
                              <Badge variant="secondary" className={`text-xs ${log.status === "success" ? "bg-green-500/10 text-green-700 dark:text-green-300" : "bg-red-500/10 text-red-700 dark:text-red-300"}`}>
                                {log.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground font-mono">{formatTimestamp(log.created_at)}</TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("logs.tenant")}</TableHead>
                      <TableHead>{t("logs.model")}</TableHead>
                      <TableHead>{t("logs.tokens")}</TableHead>
                      <TableHead>{t("logs.latency")}</TableHead>
                      <TableHead>{t("logs.status")}</TableHead>
                      <TableHead>{t("logs.time")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading
                      ? Array.from({ length: 5 }, (_, i) => (
                          <TableRow key={i}>
                            <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-36" /></TableCell>
                          </TableRow>
                        ))
                      : aiLogs.map((log) => (
                          <TableRow key={log.id} data-testid={`row-ai-${log.id}`}>
                            <TableCell className="text-sm font-medium">{log.tenant_name ?? log.tenant_id}</TableCell>
                            <TableCell><Badge variant="outline" className="text-xs font-mono">{log.model}</Badge></TableCell>
                            <TableCell className="text-sm">{log.tokens}</TableCell>
                            <TableCell className="text-sm">{formatLatency(log.latency_ms)}</TableCell>
                            <TableCell>
                              <Badge variant="secondary" className={`text-xs ${log.status === "success" ? "bg-green-500/10 text-green-700 dark:text-green-300" : "bg-red-500/10 text-red-700 dark:text-red-300"}`}>
                                {log.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground font-mono">{formatTimestamp(log.created_at)}</TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="failed" className="mt-4">
            <div className="space-y-2">
              {isLoading
                ? Array.from({ length: 3 }, (_, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Skeleton className="h-5 w-5 rounded flex-shrink-0" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-4 w-64" />
                            <Skeleton className="h-3 w-36" />
                          </div>
                          <Skeleton className="h-8 w-16" />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                : failedLogs.map((log) => (
                    <Card key={log.id} data-testid={`card-failed-${log.id}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-sm font-medium">{log.tenant}</span>
                              <Badge variant="outline" className="text-xs">{log.type}</Badge>
                            </div>
                            <p className="text-sm text-destructive">{log.error}</p>
                            <p className="text-xs text-muted-foreground mt-1 font-mono">{log.time}</p>
                          </div>
                          <Button variant="outline" size="sm" data-testid={`button-retry-${log.id}`}>{t("logs.retry")}</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminLayout>
  );
}
