import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar } from "lucide-react";
import { useDeals, useCreateDeal } from "@/hooks/use-deals";
import { useContacts } from "@/hooks/use-contacts";
import { useToast } from "@/hooks/use-toast";

function formatRelativeTime(isoDate: string): string {
  const now = new Date();
  const date = new Date(isoDate);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export default function PipelinePage() {
  const { t } = useTranslation("app");
  const { data: deals = [], isLoading } = useDeals();
  const { data: contacts = [] } = useContacts();
  const createDeal = useCreateDeal();
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formContactId, setFormContactId] = useState("");
  const [formValue, setFormValue] = useState("");
  const [formCurrency, setFormCurrency] = useState("MYR");
  const [formStage, setFormStage] = useState("");
  const [formExpectedClose, setFormExpectedClose] = useState("");
  const [formNotes, setFormNotes] = useState("");

  const contactMap = useMemo(() => {
    const map = new Map<string, string>();
    contacts.forEach(c => map.set(c.id, c.name));
    return map;
  }, [contacts]);

  const resetForm = () => {
    setFormTitle("");
    setFormContactId("");
    setFormValue("");
    setFormCurrency("MYR");
    setFormStage("");
    setFormExpectedClose("");
    setFormNotes("");
  };

  const openDialog = (stage: string) => {
    setFormStage(stage);
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formTitle) return;
    createDeal.mutate(
      {
        tenant_id: "demo",
        title: formTitle,
        contact_id: formContactId || null,
        value: formValue ? parseFloat(formValue) : 0,
        currency: formCurrency,
        stage: (formStage || "new_inquiry") as "new_inquiry" | "quoted" | "follow_up" | "negotiation" | "closed_won" | "closed_lost",
        expected_close_date: formExpectedClose || null,
        notes: formNotes || null,
      },
      {
        onSuccess: () => {
          toast({ title: t("pipeline.success") });
          setDialogOpen(false);
          resetForm();
        },
      }
    );
  };

  const stageOrder = ["new_inquiry", "quoted", "follow_up", "negotiation", "closed_won"] as const;
  const stageColorMap: Record<string, string> = {
    new_inquiry: "bg-blue-500",
    quoted: "bg-yellow-500",
    follow_up: "bg-orange-500",
    negotiation: "bg-purple-500",
    closed_won: "bg-green-500",
  };

  const stageTitles: Record<string, string> = {
    new_inquiry: t("pipeline.stageNewInquiry"),
    quoted: t("pipeline.stageQuoted"),
    follow_up: t("pipeline.stageFollowUp"),
    negotiation: t("pipeline.stageNegotiation"),
    closed_won: t("pipeline.stageClosedWon"),
  };

  const stagesData = stageOrder.map(stageId => ({
    id: stageId,
    color: stageColorMap[stageId],
    title: stageTitles[stageId] || stageId,
    deals: deals.filter(d => d.stage === stageId).map(d => ({
      id: d.id,
      title: d.title,
      contactName: d.contact_id ? contactMap.get(d.contact_id) || t("pipeline.noContact") : t("pipeline.noContact"),
      value: d.value > 0 ? `${d.currency} ${d.value.toLocaleString()}` : "—",
      expectedClose: d.expected_close_date ? new Date(d.expected_close_date).toLocaleDateString() : null,
      time: formatRelativeTime(d.created_at),
    })),
  }));

  const totalDeals = deals.filter(d => d.stage !== "closed_lost").length;
  const totalValue = deals
    .filter(d => d.stage !== "closed_lost" && d.stage !== "closed_won")
    .reduce((sum, d) => sum + d.value, 0);

  return (
    <AppLayout title={t("pipeline.title")}>
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm text-muted-foreground">{t("pipeline.activeDeals", { count: totalDeals })}</div>
            </div>
            <Badge variant="secondary" className="text-sm">
              {t("pipeline.pipelineValue", { value: totalValue > 0 ? `MYR ${totalValue.toLocaleString()}` : "—" })}
            </Badge>
          </div>
          <Button data-testid="button-add-deal" onClick={() => { setFormStage(""); setDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            {t("pipeline.addDeal")}
          </Button>
        </div>

        {isLoading ? (
          <div className="overflow-x-auto -mx-4 md:-mx-6 px-4 md:px-6">
            <div className="flex gap-4 min-w-max pb-4">
              {stageOrder.map((stageId) => (
                <div key={stageId} className="w-72 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-3">
                    <Skeleton className="h-2.5 w-2.5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-8 ml-auto" />
                  </div>
                  <div className="space-y-2">
                    {[1, 2].map((i) => (
                      <Card key={i}>
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2">
                            <Skeleton className="h-7 w-7 rounded-full flex-shrink-0" />
                            <div className="flex-1 min-w-0 space-y-2">
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-3 w-2/3" />
                              <Skeleton className="h-3 w-1/3" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 md:-mx-6 px-4 md:px-6">
            <div className="flex gap-4 min-w-max pb-4">
              {stagesData.map((stage) => (
                <div key={stage.id} className="w-72 flex-shrink-0" data-testid={`pipeline-stage-${stage.id}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${stage.color}`} />
                    <h3 className="text-sm font-semibold">{stage.title}</h3>
                    <Badge variant="secondary" className="text-xs ml-auto">{stage.deals.length}</Badge>
                  </div>
                  <div className="space-y-2">
                    {stage.deals.map((deal) => (
                      <Card key={deal.id} className="cursor-pointer hover-elevate overflow-visible" data-testid={`card-deal-${deal.id}`}>
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2">
                            <Avatar className="h-7 w-7 flex-shrink-0 mt-0.5">
                              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {deal.title.split(" ").map(n => n[0]).join("").slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-medium truncate">{deal.title}</span>
                                <span className="text-sm font-bold text-primary whitespace-nowrap">{deal.value}</span>
                              </div>
                              <p className="text-xs text-muted-foreground truncate">{deal.contactName}</p>
                              <div className="flex items-center gap-2 mt-1">
                                {deal.expectedClose && (
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />{deal.expectedClose}
                                  </span>
                                )}
                                <span className="text-xs text-muted-foreground ml-auto">{deal.time}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button variant="ghost" className="w-full border border-dashed text-muted-foreground" data-testid={`button-add-deal-${stage.id}`} onClick={() => openDialog(stage.id)}>
                      <Plus className="h-4 w-4 mr-1" /> {t("common.add")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("pipeline.dialogTitle")}</DialogTitle>
            <DialogDescription className="sr-only">{t("pipeline.dialogTitle")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t("pipeline.dealTitle")}</Label>
              <Input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder={t("pipeline.dealTitlePlaceholder")}
                required
                data-testid="input-deal-title"
              />
            </div>
            <div className="space-y-2">
              <Label>{t("pipeline.contact")}</Label>
              <Select value={formContactId} onValueChange={setFormContactId}>
                <SelectTrigger data-testid="select-deal-contact">
                  <SelectValue placeholder={t("pipeline.selectContact")} />
                </SelectTrigger>
                <SelectContent>
                  {contacts.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("pipeline.value")}</Label>
                <Input
                  type="number"
                  value={formValue}
                  onChange={(e) => setFormValue(e.target.value)}
                  data-testid="input-deal-value"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("pipeline.currency")}</Label>
                <Input
                  value={formCurrency}
                  onChange={(e) => setFormCurrency(e.target.value)}
                  data-testid="input-deal-currency"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("pipeline.stage")}</Label>
              <Select value={formStage} onValueChange={setFormStage}>
                <SelectTrigger data-testid="select-deal-stage">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stageOrder.map((stageId) => (
                    <SelectItem key={stageId} value={stageId}>{stageTitles[stageId]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("pipeline.expectedCloseDate")}</Label>
              <Input
                type="date"
                value={formExpectedClose}
                onChange={(e) => setFormExpectedClose(e.target.value)}
                data-testid="input-deal-close-date"
              />
            </div>
            <div className="space-y-2">
              <Label>{t("pipeline.notes")}</Label>
              <Textarea
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                data-testid="input-deal-notes"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} disabled={createDeal.isPending} data-testid="button-save-deal">
              {t("common.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
