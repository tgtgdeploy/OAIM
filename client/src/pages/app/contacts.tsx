import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "./layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Filter, Download, MoreHorizontal } from "lucide-react";

const contacts = [
  { id: "1", name: "Sarah Ahmad", phone: "+60 12-345-6789", email: "sarah@email.com", tags: ["VIP", "Repeat Buyer"], stage: "closed_won", orders: 5, value: "RM 890" },
  { id: "2", name: "Ahmad Razak", phone: "+60 13-456-7890", email: "ahmad@email.com", tags: ["Wholesale"], stage: "quoted", orders: 2, value: "RM 1,200" },
  { id: "3", name: "Lisa Tan", phone: "+60 11-234-5678", email: "lisa@email.com", tags: ["New"], stage: "follow_up", orders: 1, value: "RM 150" },
  { id: "4", name: "Raj Kumar", phone: "+60 17-890-1234", email: "raj@email.com", tags: ["VIP"], stage: "closed_won", orders: 8, value: "RM 2,340" },
  { id: "5", name: "Mei Ling", phone: "+60 16-789-0123", email: "mei@email.com", tags: ["Hot Lead"], stage: "new_inquiry", orders: 0, value: "RM 0" },
  { id: "6", name: "David Ooi", phone: "+60 19-012-3456", email: "david@email.com", tags: ["COD"], stage: "quoted", orders: 1, value: "RM 320" },
  { id: "7", name: "Nurul Huda", phone: "+60 14-567-8901", email: "nurul@email.com", tags: ["Repeat Buyer"], stage: "closed_won", orders: 4, value: "RM 670" },
  { id: "8", name: "James Wong", phone: "+60 18-901-2345", email: "james@email.com", tags: ["New"], stage: "new_inquiry", orders: 0, value: "RM 0" },
];

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
            <Button data-testid="button-add-contact">
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
                {filtered.map((contact) => (
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
                    <TableCell className="hidden sm:table-cell text-right text-sm">{contact.orders}</TableCell>
                    <TableCell className="hidden sm:table-cell text-right text-sm font-medium">{contact.value}</TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
