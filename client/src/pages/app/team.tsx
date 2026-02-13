import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/shared/stat-card";
import { Plus, Users, Shield, UserCog, MoreHorizontal, Mail } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

const teamMembers = [
  { id: "1", name: "John Doe", email: "john@fashionhub.com", role: "owner", status: "active", lastActive: "Now" },
  { id: "2", name: "Jane Smith", email: "jane@fashionhub.com", role: "admin", status: "active", lastActive: "2h ago" },
  { id: "3", name: "Ali Hassan", email: "ali@fashionhub.com", role: "staff", status: "active", lastActive: "1d ago" },
  { id: "4", name: "Mei Ling", email: "meiling@fashionhub.com", role: "staff", status: "invited", lastActive: "-" },
];

export default function TeamPage() {
  const { t } = useTranslation("app");

  const roleConfig: Record<string, { color: string; label: string }> = {
    owner: { color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300", label: t("team.roleOwner") },
    admin: { color: "bg-blue-500/10 text-blue-700 dark:text-blue-300", label: t("team.roleAdmin") },
    staff: { color: "bg-green-500/10 text-green-700 dark:text-green-300", label: t("team.roleStaff") },
  };

  const permissions = [
    { module: t("team.modInbox"), owner: true, admin: true, staff: true },
    { module: t("team.modContacts"), owner: true, admin: true, staff: true },
    { module: t("team.modPipeline"), owner: true, admin: true, staff: false },
    { module: t("team.modOrders"), owner: true, admin: true, staff: true },
    { module: t("team.modProducts"), owner: true, admin: true, staff: false },
    { module: t("team.modAutomation"), owner: true, admin: true, staff: false },
    { module: t("team.modAdsRoi"), owner: true, admin: false, staff: false },
    { module: t("team.modSettings"), owner: true, admin: true, staff: false },
    { module: t("team.modTeam"), owner: true, admin: false, staff: false },
    { module: t("team.modBilling"), owner: true, admin: false, staff: false },
  ];

  return (
    <AppLayout title={t("team.title")}>
      <div className="p-4 md:p-6 space-y-4">
        <div className="stats-grid">
          <StatCard label={t("team.teamMembers")} value={teamMembers.length.toString()} icon={Users} />
          <StatCard label={t("team.admins")} value={teamMembers.filter(m => m.role === "admin").length.toString()} icon={Shield} />
          <StatCard label={t("team.staff")} value={teamMembers.filter(m => m.role === "staff").length.toString()} icon={UserCog} />
          <StatCard label={t("team.pendingInvites")} value={teamMembers.filter(m => m.status === "invited").length.toString()} icon={Mail} />
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-muted-foreground">{t("team.membersLimit", { count: teamMembers.length, limit: 5, plan: "Pro" })}</p>
          <Button data-testid="button-invite-member">
            <Plus className="h-4 w-4 mr-2" />{t("team.inviteMember")}
          </Button>
        </div>

        <div className="space-y-3">
          {teamMembers.map((member) => {
            const role = roleConfig[member.role];
            return (
              <Card key={member.id} data-testid={`card-member-${member.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarFallback className="text-sm bg-primary/10 text-primary">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-sm font-semibold">{member.name}</span>
                        <Badge variant="secondary" className={`text-xs ${role.color}`}>{role.label}</Badge>
                        {member.status === "invited" && (
                          <Badge variant="outline" className="text-xs">{t("common.pending")}</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{member.email}</span>
                        <span>{t("common.active") + ":"} {member.lastActive}</span>
                      </div>
                    </div>
                    {member.role !== "owner" && (
                      <div className="flex items-center gap-2">
                        <Select defaultValue={member.role}>
                          <SelectTrigger className="w-24" data-testid={`select-role-${member.id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">{t("team.roleAdmin")}</SelectItem>
                            <SelectItem value="staff">{t("team.roleStaff")}</SelectItem>
                          </SelectContent>
                        </Select>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>{t("common.remove")}</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold mb-4">{t("team.permissionMatrix")}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-medium text-muted-foreground">{t("team.thModule")}</th>
                    <th className="text-center py-2 px-3 font-medium text-muted-foreground">{t("team.roleOwner")}</th>
                    <th className="text-center py-2 px-3 font-medium text-muted-foreground">{t("team.roleAdmin")}</th>
                    <th className="text-center py-2 px-3 font-medium text-muted-foreground">{t("team.roleStaff")}</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((p) => (
                    <tr key={p.module} className="border-b last:border-0">
                      <td className="py-2 pr-4">{p.module}</td>
                      <td className="text-center py-2 px-3">{p.owner ? <Badge variant="default" className="text-xs px-1.5">{t("common.yes")}</Badge> : <Badge variant="secondary" className="text-xs px-1.5 opacity-40">{t("common.no")}</Badge>}</td>
                      <td className="text-center py-2 px-3">{p.admin ? <Badge variant="default" className="text-xs px-1.5">{t("common.yes")}</Badge> : <Badge variant="secondary" className="text-xs px-1.5 opacity-40">{t("common.no")}</Badge>}</td>
                      <td className="text-center py-2 px-3">{p.staff ? <Badge variant="default" className="text-xs px-1.5">{t("common.yes")}</Badge> : <Badge variant="secondary" className="text-xs px-1.5 opacity-40">{t("common.no")}</Badge>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
