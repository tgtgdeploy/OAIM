import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Tabs, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import {
  BarChart3, TrendingUp, DollarSign, Target, Plus, Search, Play, Pause, Eye,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  useMarketingCampaigns, useCreateMarketingCampaign, useUpdateMarketingCampaign,
  useAdPlacementPlans, useCreateAdPlacementPlan, useUpdateAdPlacementPlan,
} from "@/hooks/use-marketing";
import { useAuthStore } from "@/stores/auth-store";

export function CampaignManagerModule() {
  const { t } = useTranslation("app");
  const tenant = useAuthStore((s) => s.tenant);
  const tenantId = tenant?.id;

  const { data: campaigns = [], isLoading: loadingCampaigns } = useMarketingCampaigns(tenantId);
  const { data: plans = [], isLoading: loadingPlans } = useAdPlacementPlans(tenantId);
  const createCampaign = useCreateMarketingCampaign();
  const updateCampaign = useUpdateMarketingCampaign();
  const createPlan = useCreateAdPlacementPlan();
  const updatePlan = useUpdateAdPlacementPlan();

  const [mainTab, setMainTab] = useState("campaigns");
  const [search, setSearch] = useState("");
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showDetail, setShowDetail] = useState<typeof campaigns[0] | null>(null);

  const [cForm, setCForm] = useState({
    name: "", platform: "meta", objective: "", budget_type: "lifetime" as "daily" | "lifetime",
    budget_amount: "", start_date: "", end_date: "", notes: "",
  });
  const [pForm, setPForm] = useState({
    name: "", platform: "meta", total_budget: "", start_date: "", end_date: "", notes: "",
  });

  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const activePlans = plans.filter((p) => p.status === "active" || p.status === "approved").length;
  const totalSpend = campaigns.reduce((s, c) => s + parseFloat(c.budget_spent), 0);
  const totalBudget = campaigns.reduce((s, c) => s + parseFloat(c.budget_amount), 0);
  const roas = totalSpend > 0 ? (totalBudget / totalSpend).toFixed(1) : "0.0";

  const filteredCampaigns = campaigns.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredPlans = plans.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateCampaign = async () => {
    if (!tenantId || !cForm.name) return;
    await createCampaign.mutateAsync({
      tenant_id: tenantId,
      name: cForm.name,
      platform: cForm.platform,
      objective: cForm.objective || undefined,
      budget_type: cForm.budget_type,
      budget_amount: cForm.budget_amount || "0",
      start_date: cForm.start_date || undefined,
      end_date: cForm.end_date || undefined,
      notes: cForm.notes || undefined,
    });
    setShowCampaignModal(false);
    setCForm({ name: "", platform: "meta", objective: "", budget_type: "lifetime", budget_amount: "", start_date: "", end_date: "", notes: "" });
  };

  const handleCreatePlan = async () => {
    if (!tenantId || !pForm.name) return;
    await createPlan.mutateAsync({
      tenant_id: tenantId,
      name: pForm.name,
      platform: pForm.platform,
      total_budget: pForm.total_budget || "0",
      start_date: pForm.start_date || undefined,
      end_date: pForm.end_date || undefined,
      notes: pForm.notes || undefined,
    });
    setShowPlanModal(false);
    setPForm({ name: "", platform: "meta", total_budget: "", start_date: "", end_date: "", notes: "" });
  };

  const toggleCampaignStatus = async (c: typeof campaigns[0]) => {
    const newStatus = c.status === "active" ? "paused" : "active";
    await updateCampaign.mutateAsync({ id: c.id, status: newStatus });
  };

  const submitPlanForApproval = async (id: string) => {
    await updatePlan.mutateAsync({ id, status: "pending_approval" });
  };

  const isLoading = loadingCampaigns || loadingPlans;

  if (isLoading) {
    return <div className="space-y-4"><div className="grid grid-cols-2 sm:grid-cols-4 gap-4">{[1,2,3,4].map(i=><Card key={i}><CardContent className="p-4"><Skeleton className="h-16 w-full" /></CardContent></Card>)}</div></div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label={t("campaignManager.totalCampaigns")} value={campaigns.length.toString()} icon={BarChart3} />
        <StatCard label={t("campaignManager.activePlans")} value={activePlans.toString()} icon={Target} />
        <StatCard label={t("campaignManager.totalSpend")} value={`RM ${totalSpend.toLocaleString()}`} icon={DollarSign} />
        <StatCard label={t("campaignManager.roas")} value={`${roas}x`} icon={TrendingUp} iconColor="text-green-500" />
      </div>

      <Tabs value={mainTab} onValueChange={setMainTab}>
        <TabsList>
          <TabsTrigger value="campaigns">{t("campaignManager.tabCampaigns")}</TabsTrigger>
          <TabsTrigger value="plans">{t("campaignManager.tabPlans")}</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("campaignManager.search")} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Button onClick={() => mainTab === "campaigns" ? setShowCampaignModal(true) : setShowPlanModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {mainTab === "campaigns" ? t("campaignManager.newCampaign") : t("campaignManager.newPlan")}
        </Button>
      </div>

      {mainTab === "campaigns" ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("campaignManager.thName")}</TableHead>
                  <TableHead>{t("campaignManager.thPlatform")}</TableHead>
                  <TableHead>{t("campaignManager.thStatus")}</TableHead>
                  <TableHead className="hidden md:table-cell">{t("campaignManager.thBudget")}</TableHead>
                  <TableHead className="hidden md:table-cell">{t("campaignManager.thSpent")}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t("campaignManager.thDates")}</TableHead>
                  <TableHead className="w-20"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((c) => {
                  const budget = parseFloat(c.budget_amount);
                  const spent = parseFloat(c.budget_spent);
                  const usagePct = budget > 0 ? Math.min(100, (spent / budget) * 100) : 0;
                  return (
                    <TableRow key={c.id}>
                      <TableCell>
                        <div className="text-sm font-medium">{c.name}</div>
                        {c.objective && <div className="text-xs text-muted-foreground">{c.objective}</div>}
                      </TableCell>
                      <TableCell className="text-sm capitalize">{c.platform}</TableCell>
                      <TableCell><StatusBadge status={c.status} /></TableCell>
                      <TableCell className="hidden md:table-cell text-sm">
                        <div>RM {budget.toLocaleString()}</div>
                        <div className="h-1 mt-1 rounded-full bg-muted overflow-hidden w-16">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${usagePct}%` }} />
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm font-medium">RM {spent.toLocaleString()}</TableCell>
                      <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                        {c.start_date ? new Date(c.start_date).toLocaleDateString() : "—"} — {c.end_date ? new Date(c.end_date).toLocaleDateString() : "—"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => setShowDetail(c)}><Eye className="h-4 w-4" /></Button>
                          {c.status === "active" && (
                            <Button size="icon" variant="ghost" onClick={() => toggleCampaignStatus(c)}><Pause className="h-4 w-4" /></Button>
                          )}
                          {c.status === "paused" && (
                            <Button size="icon" variant="ghost" onClick={() => toggleCampaignStatus(c)}><Play className="h-4 w-4" /></Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredCampaigns.length === 0 && (
                  <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">{t("campaignManager.noCampaigns")}</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("campaignManager.thName")}</TableHead>
                  <TableHead>{t("campaignManager.thPlatform")}</TableHead>
                  <TableHead>{t("campaignManager.thStatus")}</TableHead>
                  <TableHead className="text-right">{t("campaignManager.thBudget")}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t("campaignManager.thDates")}</TableHead>
                  <TableHead className="w-20"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlans.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium text-sm">{p.name}</TableCell>
                    <TableCell className="text-sm capitalize">{p.platform}</TableCell>
                    <TableCell><StatusBadge status={p.status} /></TableCell>
                    <TableCell className="text-right text-sm font-medium">{p.currency} {parseFloat(p.total_budget).toLocaleString()}</TableCell>
                    <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                      {p.start_date ? new Date(p.start_date).toLocaleDateString() : "—"} — {p.end_date ? new Date(p.end_date).toLocaleDateString() : "—"}
                    </TableCell>
                    <TableCell>
                      {p.status === "draft" && (
                        <Button size="sm" variant="outline" onClick={() => submitPlanForApproval(p.id)}>
                          {t("campaignManager.submitApproval")}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredPlans.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">{t("campaignManager.noPlans")}</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* New Campaign Dialog */}
      <Dialog open={showCampaignModal} onOpenChange={setShowCampaignModal}>
        <DialogContent>
          <DialogHeader><DialogTitle>{t("campaignManager.newCampaign")}</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>{t("campaignManager.thName")}</Label><Input value={cForm.name} onChange={(e) => setCForm({...cForm, name: e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>{t("campaignManager.thPlatform")}</Label>
                <Select value={cForm.platform} onValueChange={(v) => setCForm({...cForm, platform: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meta">Meta</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>{t("campaignManager.objective")}</Label><Input value={cForm.objective} onChange={(e) => setCForm({...cForm, objective: e.target.value})} placeholder="e.g. Lead Generation" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>{t("campaignManager.budgetType")}</Label>
                <Select value={cForm.budget_type} onValueChange={(v) => setCForm({...cForm, budget_type: v as "daily" | "lifetime"})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">{t("campaignManager.daily")}</SelectItem>
                    <SelectItem value="lifetime">{t("campaignManager.lifetime")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>{t("campaignManager.thBudget")}</Label><Input type="number" value={cForm.budget_amount} onChange={(e) => setCForm({...cForm, budget_amount: e.target.value})} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>{t("campaignManager.startDate")}</Label><Input type="date" value={cForm.start_date} onChange={(e) => setCForm({...cForm, start_date: e.target.value})} /></div>
              <div><Label>{t("campaignManager.endDate")}</Label><Input type="date" value={cForm.end_date} onChange={(e) => setCForm({...cForm, end_date: e.target.value})} /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCampaignModal(false)}>{t("common.back")}</Button>
            <Button onClick={handleCreateCampaign} disabled={createCampaign.isPending}>{t("common.save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Plan Dialog */}
      <Dialog open={showPlanModal} onOpenChange={setShowPlanModal}>
        <DialogContent>
          <DialogHeader><DialogTitle>{t("campaignManager.newPlan")}</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div><Label>{t("campaignManager.thName")}</Label><Input value={pForm.name} onChange={(e) => setPForm({...pForm, name: e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>{t("campaignManager.thPlatform")}</Label>
                <Select value={pForm.platform} onValueChange={(v) => setPForm({...pForm, platform: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meta">Meta</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>{t("campaignManager.thBudget")}</Label><Input type="number" value={pForm.total_budget} onChange={(e) => setPForm({...pForm, total_budget: e.target.value})} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>{t("campaignManager.startDate")}</Label><Input type="date" value={pForm.start_date} onChange={(e) => setPForm({...pForm, start_date: e.target.value})} /></div>
              <div><Label>{t("campaignManager.endDate")}</Label><Input type="date" value={pForm.end_date} onChange={(e) => setPForm({...pForm, end_date: e.target.value})} /></div>
            </div>
            <div><Label>{t("campaignManager.notes")}</Label><Input value={pForm.notes} onChange={(e) => setPForm({...pForm, notes: e.target.value})} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPlanModal(false)}>{t("common.back")}</Button>
            <Button onClick={handleCreatePlan} disabled={createPlan.isPending}>{t("common.save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Campaign Detail Dialog */}
      <Dialog open={!!showDetail} onOpenChange={() => setShowDetail(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{showDetail?.name}</DialogTitle></DialogHeader>
          {showDetail && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">{t("campaignManager.thPlatform")}:</span> <span className="capitalize">{showDetail.platform}</span></div>
                <div><span className="text-muted-foreground">{t("campaignManager.thStatus")}:</span> <StatusBadge status={showDetail.status} /></div>
                <div><span className="text-muted-foreground">{t("campaignManager.thBudget")}:</span> RM {parseFloat(showDetail.budget_amount).toLocaleString()} ({showDetail.budget_type})</div>
                <div><span className="text-muted-foreground">{t("campaignManager.thSpent")}:</span> RM {parseFloat(showDetail.budget_spent).toLocaleString()}</div>
              </div>
              {showDetail.objective && <div><span className="text-muted-foreground">{t("campaignManager.objective")}:</span> {showDetail.objective}</div>}
              {showDetail.notes && <p className="text-muted-foreground">{showDetail.notes}</p>}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
