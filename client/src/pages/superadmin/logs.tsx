import { SuperAdminLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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

const webhookLogs = [
  { id: "1", tenant: "Fashion Hub KL", event: "message.received", status: "success", time: "2026-02-12 14:32:05" },
  { id: "2", tenant: "Tech Gadgets MY", event: "message.sent", status: "success", time: "2026-02-12 14:30:12" },
  { id: "3", tenant: "Nasi Kandar Express", event: "message.received", status: "failed", error: "Webhook timeout", time: "2026-02-12 14:28:45" },
  { id: "4", tenant: "Fashion Hub KL", event: "status.update", status: "success", time: "2026-02-12 14:25:30" },
  { id: "5", tenant: "Shoe Palace", event: "message.sent", status: "failed", error: "Rate limit exceeded", time: "2026-02-12 14:20:15" },
  { id: "6", tenant: "Cafe Artisan", event: "message.received", status: "success", time: "2026-02-12 14:18:00" },
  { id: "7", tenant: "HomeDecor Plus", event: "message.sent", status: "success", time: "2026-02-12 14:15:22" },
];

const aiLogs = [
  { id: "1", tenant: "Fashion Hub KL", model: "gpt-4", tokens: 245, latency: "1.2s", status: "success", time: "2026-02-12 14:32:06" },
  { id: "2", tenant: "Tech Gadgets MY", model: "gpt-4", tokens: 180, latency: "0.9s", status: "success", time: "2026-02-12 14:30:13" },
  { id: "3", tenant: "Shoe Palace", model: "gpt-4", tokens: 320, latency: "1.5s", status: "success", time: "2026-02-12 14:25:00" },
  { id: "4", tenant: "Nasi Kandar Express", model: "gpt-4", tokens: 0, latency: "-", status: "failed", time: "2026-02-12 14:28:46" },
  { id: "5", tenant: "HomeDecor Plus", model: "gpt-4", tokens: 200, latency: "1.1s", status: "success", time: "2026-02-12 14:15:23" },
];

const failedLogs = [
  { id: "1", tenant: "Nasi Kandar Express", type: "Webhook", error: "Webhook timeout - no response within 30s", time: "2026-02-12 14:28:45" },
  { id: "2", tenant: "Shoe Palace", type: "Message Send", error: "Rate limit exceeded - 429 Too Many Requests", time: "2026-02-12 14:20:15" },
  { id: "3", tenant: "Sushi Bar 88", type: "AI Call", error: "API key invalid or expired", time: "2026-02-12 13:45:00" },
];

export default function LogsPage() {
  const { t } = useTranslation("superadmin");

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
                    {webhookLogs.map((log) => (
                      <TableRow key={log.id} data-testid={`row-webhook-${log.id}`}>
                        <TableCell className="text-sm font-medium">{log.tenant}</TableCell>
                        <TableCell><Badge variant="outline" className="text-xs font-mono">{log.event}</Badge></TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={`text-xs ${log.status === "success" ? "bg-green-500/10 text-green-700 dark:text-green-300" : "bg-red-500/10 text-red-700 dark:text-red-300"}`}>
                            {log.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground font-mono">{log.time}</TableCell>
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
                    {aiLogs.map((log) => (
                      <TableRow key={log.id} data-testid={`row-ai-${log.id}`}>
                        <TableCell className="text-sm font-medium">{log.tenant}</TableCell>
                        <TableCell><Badge variant="outline" className="text-xs font-mono">{log.model}</Badge></TableCell>
                        <TableCell className="text-sm">{log.tokens}</TableCell>
                        <TableCell className="text-sm">{log.latency}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={`text-xs ${log.status === "success" ? "bg-green-500/10 text-green-700 dark:text-green-300" : "bg-red-500/10 text-red-700 dark:text-red-300"}`}>
                            {log.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground font-mono">{log.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="failed" className="mt-4">
            <div className="space-y-2">
              {failedLogs.map((log) => (
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
