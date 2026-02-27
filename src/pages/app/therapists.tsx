import { useState } from "react";
import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Star, Clock, CalendarCheck, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useStaff, useCreateStaff } from "@/hooks/use-staff";
import { useToast } from "@/hooks/use-toast";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function TherapistsPage() {
  const { t } = useTranslation("app");
  const { data: staff = [], isLoading, error } = useStaff();
  const createStaff = useCreateStaff();
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formSpecialties, setFormSpecialties] = useState("");
  const [formStatus, setFormStatus] = useState<string>("available");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");

  function resetForm() {
    setFormName(""); setFormRole(""); setFormSpecialties("");
    setFormStatus("available"); setFormImageUrl("");
    setFormPhone(""); setFormEmail("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formName) return;
    const specialties = formSpecialties.split(",").map(s => s.trim()).filter(Boolean);

    createStaff.mutate(
      {
        tenant_id: "demo",
        name: formName,
        role: formRole || null,
        specialties,
        status: formStatus as "available" | "busy" | "off",
        image_url: formImageUrl || null,
        phone: formPhone || null,
        email: formEmail || null,
      },
      {
        onSuccess: () => {
          toast({ title: t("therapists.success") });
          setDialogOpen(false);
          resetForm();
        },
      }
    );
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "available": return <Badge variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">{t("therapists.statusAvailable")}</Badge>;
      case "busy": return <Badge variant="secondary" className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400">{t("therapists.statusInSession")}</Badge>;
      case "off": return <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">{t("therapists.statusDayOff")}</Badge>;
      default: return null;
    }
  }

  if (isLoading) {
    return (
      <AppLayout title={t("therapists.title")}>
        <div className="p-4 md:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-9 w-36" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout title={t("therapists.title")}>
        <div className="p-4 md:p-6">
          <Card>
            <CardContent className="p-6 flex items-center gap-3 text-destructive">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{t("common.errorLoading")}</p>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={t("therapists.title")}>
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{t("therapists.countTherapists", { count: staff.length })}</p>
          <Button onClick={() => setDialogOpen(true)} data-testid="button-add-therapist">
            <Plus className="h-4 w-4 mr-2" />
            {t("therapists.addTherapist")}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map((therapist) => (
            <Card key={therapist.id} className="hover-elevate overflow-visible cursor-pointer" data-testid={`card-therapist-${therapist.id}`}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12" data-testid={`avatar-therapist-${therapist.id}`}>
                    {therapist.image_url && <AvatarImage src={therapist.image_url} alt={therapist.name} />}
                    <AvatarFallback className="bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-medium">{getInitials(therapist.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="font-semibold text-sm" data-testid={`text-therapist-name-${therapist.id}`}>{therapist.name}</h3>
                      {getStatusBadge(therapist.status)}
                    </div>
                    <p className="text-xs text-muted-foreground">{therapist.role ?? ""}</p>
                    {therapist.phone && (
                      <p className="text-xs text-muted-foreground mt-0.5">{therapist.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {therapist.specialties.map((s) => (
                    <Badge key={s} variant="outline" className="text-[10px] px-1.5 py-0">{s}</Badge>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-amber-500 mb-0.5">
                      <Star className="h-3 w-3 fill-amber-500" />
                      <span className="text-sm font-bold">{therapist.rating ?? "—"}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{t("therapists.rating")}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <CalendarCheck className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-bold">{therapist.today_bookings}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{t("therapists.today")}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-bold">{therapist.weekly_hours}h</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{t("therapists.thisWeek")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Therapist Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("therapists.dialogTitle")}</DialogTitle>
            <DialogDescription className="sr-only">{t("therapists.dialogTitle")}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="th-name">{t("therapists.name")}</Label>
              <Input id="th-name" required value={formName} onChange={(e) => setFormName(e.target.value)} data-testid="input-therapist-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="th-role">{t("therapists.role")}</Label>
              <Input id="th-role" placeholder={t("therapists.rolePlaceholder")} value={formRole} onChange={(e) => setFormRole(e.target.value)} data-testid="input-therapist-role" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="th-specialties">{t("therapists.specialties")}</Label>
              <Input id="th-specialties" placeholder={t("therapists.specialtiesPlaceholder")} value={formSpecialties} onChange={(e) => setFormSpecialties(e.target.value)} data-testid="input-therapist-specialties" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="th-phone">{t("therapists.phone")}</Label>
                <Input id="th-phone" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} data-testid="input-therapist-phone" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="th-email">{t("therapists.email")}</Label>
                <Input id="th-email" type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} data-testid="input-therapist-email" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="th-image">{t("therapists.imageUrl")}</Label>
              <Input id="th-image" type="url" placeholder="https://..." value={formImageUrl} onChange={(e) => setFormImageUrl(e.target.value)} data-testid="input-therapist-image" />
            </div>
            <div className="space-y-2">
              <Label>{t("therapists.status")}</Label>
              <Select value={formStatus} onValueChange={setFormStatus}>
                <SelectTrigger data-testid="select-therapist-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">{t("therapists.statusAvailable")}</SelectItem>
                  <SelectItem value="busy">{t("therapists.statusInSession")}</SelectItem>
                  <SelectItem value="off">{t("therapists.statusDayOff")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={createStaff.isPending} data-testid="button-submit-therapist">
                {t("common.save")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
