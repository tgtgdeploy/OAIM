import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "./layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Filter, Download, MoreHorizontal } from "lucide-react";
import { useContacts, useCreateContact } from "@/hooks/use-contacts";
import { useToast } from "@/hooks/use-toast";

const stageColors: Record<string, string> = {
  new_inquiry: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  quoted: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
  follow_up: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
  closed_won: "bg-green-500/10 text-green-700 dark:text-green-300",
  closed_lost: "bg-red-500/10 text-red-700 dark:text-red-300",
};

export default function ContactsPage() {
  const { t } = useTranslation("app");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: contacts = [], isLoading } = useContacts();
  const createContact = useCreateContact();
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formStage, setFormStage] = useState<string>("new_inquiry");
  const [formNotes, setFormNotes] = useState("");

  const resetForm = () => {
    setFormName("");
    setFormPhone("");
    setFormEmail("");
    setFormTags("");
    setFormStage("new_inquiry");
    setFormNotes("");
  };

  const handleSubmit = () => {
    if (!formName || !formPhone) return;
    const tags = formTags.split(",").map(t => t.trim()).filter(Boolean);
    createContact.mutate(
      {
        tenant_id: "demo",
        name: formName,
        phone: formPhone,
        email: formEmail || null,
        tags,
        stage: formStage as "new_inquiry" | "quoted" | "follow_up" | "closed_won" | "closed_lost",
        notes: formNotes || null,
      },
      {
        onSuccess: () => {
          toast({ title: t("contacts.success") });
          setDialogOpen(false);
          resetForm();
        },
      }
    );
  };

  const stageLabels: Record<string, string> = {
    new_inquiry: t("contacts.stageNew"),
    quoted: t("contacts.stageQuoted"),
    follow_up: t("contacts.stageFollowUp"),
    closed_won: t("contacts.stageWon"),
    closed_lost: t("contacts.stageLost"),
  };
  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  return (
    <AppLayout title={t("contacts.title")}>
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">{t("contacts.totalContacts", { count: contacts.length })}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("contacts.searchContacts")}
                className="pl-9 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-contacts"
              />
            </div>
            <Button variant="outline" data-testid="button-filter">
              <Filter className="h-4 w-4 mr-2" />
              {t("common.filter")}
            </Button>
            <Button variant="outline" data-testid="button-export">
              <Download className="h-4 w-4 mr-2" />
              {t("common.export")}
            </Button>
            <Button data-testid="button-add-contact" onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t("contacts.addContact")}
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("contacts.thContact")}</TableHead>
                  <TableHead className="hidden md:table-cell">{t("contacts.thPhone")}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t("contacts.thTags")}</TableHead>
                  <TableHead>{t("contacts.thStage")}</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">{t("contacts.thOrders")}</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">{t("contacts.thValue")}</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24 md:hidden" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-4 w-28" />
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Skeleton className="h-5 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-20" />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-right">
                        <Skeleton className="h-4 w-8 ml-auto" />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-right">
                        <Skeleton className="h-4 w-16 ml-auto" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-8" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  filtered.map((contact) => (
                    <TableRow key={contact.id} className="cursor-pointer" data-testid={`row-contact-${contact.id}`}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {contact.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{contact.name}</div>
                            <div className="text-xs text-muted-foreground md:hidden">{contact.phone}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{contact.phone}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex gap-1 flex-wrap">
                          {contact.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`text-xs ${stageColors[contact.stage]}`}>
                          {stageLabels[contact.stage]}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-right text-sm">—</TableCell>
                      <TableCell className="hidden sm:table-cell text-right text-sm font-medium">—</TableCell>
                      <TableCell>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("contacts.dialogTitle")}</DialogTitle>
            <DialogDescription className="sr-only">{t("contacts.dialogTitle")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t("contacts.name")}</Label>
              <Input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
                data-testid="input-contact-name"
              />
            </div>
            <div className="space-y-2">
              <Label>{t("contacts.phone")}</Label>
              <Input
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                required
                data-testid="input-contact-phone"
              />
            </div>
            <div className="space-y-2">
              <Label>{t("contacts.email")}</Label>
              <Input
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                data-testid="input-contact-email"
              />
            </div>
            <div className="space-y-2">
              <Label>{t("contacts.tags")}</Label>
              <Input
                value={formTags}
                onChange={(e) => setFormTags(e.target.value)}
                placeholder={t("contacts.tagsPlaceholder")}
                data-testid="input-contact-tags"
              />
            </div>
            <div className="space-y-2">
              <Label>{t("contacts.stage")}</Label>
              <Select value={formStage} onValueChange={setFormStage}>
                <SelectTrigger data-testid="select-contact-stage">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(stageLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("contacts.notes")}</Label>
              <Textarea
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                placeholder={t("contacts.notesPlaceholder")}
                data-testid="input-contact-notes"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} disabled={createContact.isPending} data-testid="button-save-contact">
              {t("common.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
