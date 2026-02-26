import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
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
  Calendar, List, Plus, ChevronLeft, ChevronRight, FileText, Clock, CheckCircle2, Pencil,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMediaPlans, useCreateMediaPlan, useUpdateMediaPlan, useDeleteMediaPlan } from "@/hooks/use-media-plan";
import { useAuthStore } from "@/stores/auth-store";

const PLATFORMS = ["instagram", "facebook", "tiktok", "whatsapp", "twitter", "youtube"];
const CONTENT_TYPES = ["post", "reel", "story", "video", "carousel", "article"];

export function MediaPlanModule() {
  const { t } = useTranslation("app");
  const tenant = useAuthStore((s) => s.tenant);
  const tenantId = tenant?.id;

  const { data: plans = [], isLoading } = useMediaPlans(tenantId);
  const createPlan = useCreateMediaPlan();
  const updatePlan = useUpdateMediaPlan();
  const deletePlan = useDeleteMediaPlan();

  const [view, setView] = useState<"list" | "calendar">("list");
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [form, setForm] = useState({
    title: "", description: "", platform: "instagram", content_type: "post",
    scheduled_date: "", scheduled_time: "", assigned_to: "", notes: "",
  });

  const totalPlans = plans.length;
  const planned = plans.filter((p) => p.status === "planned").length;
  const inProgress = plans.filter((p) => p.status === "in_progress").length;
  const published = plans.filter((p) => p.status === "published").length;

  const filtered = plans.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    if (tab === "all") return matchSearch;
    return matchSearch && p.status === tab;
  });

  const openNew = () => {
    setEditingId(null);
    setForm({ title: "", description: "", platform: "instagram", content_type: "post", scheduled_date: "", scheduled_time: "", assigned_to: "", notes: "" });
    setShowModal(true);
  };

  const openEdit = (plan: typeof plans[0]) => {
    setEditingId(plan.id);
    setForm({
      title: plan.title,
      description: plan.description || "",
      platform: plan.platform,
      content_type: plan.content_type,
      scheduled_date: plan.scheduled_date,
      scheduled_time: plan.scheduled_time || "",
      assigned_to: plan.assigned_to || "",
      notes: plan.notes || "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!tenantId || !form.title || !form.scheduled_date) return;
    if (editingId) {
      await updatePlan.mutateAsync({
        id: editingId,
        title: form.title,
        description: form.description || undefined,
        platform: form.platform,
        content_type: form.content_type,
        scheduled_date: form.scheduled_date,
        scheduled_time: form.scheduled_time || undefined,
        assigned_to: form.assigned_to || undefined,
        notes: form.notes || undefined,
      });
    } else {
      await createPlan.mutateAsync({
        tenant_id: tenantId,
        title: form.title,
        description: form.description || undefined,
        platform: form.platform,
        content_type: form.content_type,
        scheduled_date: form.scheduled_date,
        scheduled_time: form.scheduled_time || undefined,
        assigned_to: form.assigned_to || undefined,
        notes: form.notes || undefined,
      });
    }
    setShowModal(false);
  };

  // Calendar helpers
  const calYear = calendarDate.getFullYear();
  const calMonth = calendarDate.getMonth();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();
  const today = new Date();

  const getPlansForDay = (day: number) => {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return plans.filter((p) => p.scheduled_date === dateStr);
  };

  const platformColor: Record<string, string> = {
    instagram: "bg-pink-500/10 text-pink-700",
    facebook: "bg-blue-500/10 text-blue-700",
    tiktok: "bg-gray-500/10 text-gray-700",
    whatsapp: "bg-green-500/10 text-green-700",
    twitter: "bg-sky-500/10 text-sky-700",
    youtube: "bg-red-500/10 text-red-700",
  };

  if (isLoading) {
    return <div className="space-y-4"><div className="grid grid-cols-2 sm:grid-cols-4 gap-4">{[1,2,3,4].map(i=><Card key={i}><CardContent className="p-4"><Skeleton className="h-16 w-full" /></CardContent></Card>)}</div></div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label={t("mediaPlan.total")} value={totalPlans.toString()} icon={FileText} />
        <StatCard label={t("mediaPlan.planned")} value={planned.toString()} icon={Clock} />
        <StatCard label={t("mediaPlan.inProgress")} value={inProgress.toString()} icon={Pencil} />
        <StatCard label={t("mediaPlan.published")} value={published.toString()} icon={CheckCircle2} />
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Button size="sm" variant={view === "list" ? "default" : "outline"} onClick={() => setView("list")}><List className="h-4 w-4" /></Button>
          <Button size="sm" variant={view === "calendar" ? "default" : "outline"} onClick={() => setView("calendar")}><Calendar className="h-4 w-4" /></Button>
        </div>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4 mr-2" />
          {t("mediaPlan.newPlan")}
        </Button>
      </div>

      {view === "list" ? (
        <>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="all">{t("mediaPlan.tabAll")}</TabsTrigger>
              <TabsTrigger value="planned">{t("mediaPlan.tabPlanned")}</TabsTrigger>
              <TabsTrigger value="in_progress">{t("mediaPlan.tabInProgress")}</TabsTrigger>
              <TabsTrigger value="published">{t("mediaPlan.tabPublished")}</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative max-w-sm">
            <Input placeholder={t("mediaPlan.search")} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="grid gap-3">
            {filtered.map((plan) => (
              <Card key={plan.id} className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => openEdit(plan)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{plan.title}</span>
                        <StatusBadge status={plan.status} />
                      </div>
                      {plan.description && <p className="text-xs text-muted-foreground truncate">{plan.description}</p>}
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className={`text-xs capitalize ${platformColor[plan.platform] || ""}`}>{plan.platform}</Badge>
                        <Badge variant="outline" className="text-xs capitalize">{plan.content_type}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(plan.scheduled_date).toLocaleDateString()}
                          {plan.scheduled_time && ` ${plan.scheduled_time}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filtered.length === 0 && (
              <div className="text-center text-muted-foreground py-8">{t("mediaPlan.noPlans")}</div>
            )}
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Button size="icon" variant="ghost" onClick={() => setCalendarDate(new Date(calYear, calMonth - 1, 1))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium text-sm">
                {calendarDate.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
              </span>
              <Button size="icon" variant="ghost" onClick={() => setCalendarDate(new Date(calYear, calMonth + 1, 1))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-px text-center text-xs text-muted-foreground mb-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="py-1 font-medium">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-px">
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-16" />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const dayPlans = getPlansForDay(day);
                const isToday = day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
                return (
                  <div
                    key={day}
                    className={`min-h-16 p-1 border rounded-sm text-xs ${isToday ? "bg-primary/5 border-primary" : "border-transparent hover:bg-muted/50"}`}
                  >
                    <div className={`font-medium mb-0.5 ${isToday ? "text-primary" : ""}`}>{day}</div>
                    {dayPlans.slice(0, 2).map((p) => (
                      <div
                        key={p.id}
                        className={`text-[10px] leading-tight truncate rounded px-0.5 mb-0.5 cursor-pointer ${platformColor[p.platform] || "bg-muted"}`}
                        onClick={() => openEdit(p)}
                      >
                        {p.title}
                      </div>
                    ))}
                    {dayPlans.length > 2 && (
                      <div className="text-[10px] text-muted-foreground">+{dayPlans.length - 2}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? t("mediaPlan.editPlan") : t("mediaPlan.newPlan")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <div><Label>{t("mediaPlan.title")}</Label><Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} /></div>
            <div><Label>{t("mediaPlan.description")}</Label><Input value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>{t("mediaPlan.platform")}</Label>
                <Select value={form.platform} onValueChange={(v) => setForm({...form, platform: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((p) => <SelectItem key={p} value={p} className="capitalize">{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{t("mediaPlan.contentType")}</Label>
                <Select value={form.content_type} onValueChange={(v) => setForm({...form, content_type: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CONTENT_TYPES.map((ct) => <SelectItem key={ct} value={ct} className="capitalize">{ct}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>{t("mediaPlan.scheduledDate")}</Label><Input type="date" value={form.scheduled_date} onChange={(e) => setForm({...form, scheduled_date: e.target.value})} /></div>
              <div><Label>{t("mediaPlan.scheduledTime")}</Label><Input type="time" value={form.scheduled_time} onChange={(e) => setForm({...form, scheduled_time: e.target.value})} /></div>
            </div>
            <div><Label>{t("mediaPlan.assignedTo")}</Label><Input value={form.assigned_to} onChange={(e) => setForm({...form, assigned_to: e.target.value})} /></div>
            <div><Label>{t("mediaPlan.notes")}</Label><Input value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} /></div>
          </div>
          <DialogFooter>
            {editingId && (
              <Button variant="destructive" onClick={async () => { await deletePlan.mutateAsync(editingId); setShowModal(false); }}>
                {t("common.remove")}
              </Button>
            )}
            <Button variant="outline" onClick={() => setShowModal(false)}>{t("common.back")}</Button>
            <Button onClick={handleSave} disabled={createPlan.isPending || updatePlan.isPending}>{t("common.save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
