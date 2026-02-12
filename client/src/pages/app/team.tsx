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

const teamMembers = [
  { id: "1", name: "John Doe", email: "john@fashionhub.com", role: "owner", status: "active", lastActive: "Now" },
  { id: "2", name: "Jane Smith", email: "jane@fashionhub.com", role: "admin", status: "active", lastActive: "2h ago" },
  { id: "3", name: "Ali Hassan", email: "ali@fashionhub.com", role: "staff", status: "active", lastActive: "1d ago" },
  { id: "4", name: "Mei Ling", email: "meiling@fashionhub.com", role: "staff", status: "invited", lastActive: "-" },
];

const roleConfig: Record<string, { color: string; label: string }> = {
  owner: { color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300", label: "Owner" },
  admin: { color: "bg-blue-500/10 text-blue-700 dark:text-blue-300", label: "Admin" },
  staff: { color: "bg-green-500/10 text-green-700 dark:text-green-300", label: "Staff" },
};

const permissions = [
  { module: "Inbox", owner: true, admin: true, staff: true },
  { module: "Contacts", owner: true, admin: true, staff: true },
  { module: "Pipeline", owner: true, admin: true, staff: false },
  { module: "Orders", owner: true, admin: true, staff: true },
  { module: "Products", owner: true, admin: true, staff: false },
  { module: "Automation", owner: true, admin: true, staff: false },
  { module: "Ads & ROI", owner: true, admin: false, staff: false },
  { module: "Settings", owner: true, admin: true, staff: false },
  { module: "Team", owner: true, admin: false, staff: false },
  { module: "Billing", owner: true, admin: false, staff: false },
];

export default function TeamPage() {
  return (
    <AppLayout title="Team & Roles">
      <div className="p-4 md:p-6 space-y-4">
        <div className="stats-grid">
          <StatCard label="Team Members" value={teamMembers.length.toString()} icon={Users} />
          <StatCard label="Admins" value={teamMembers.filter(m => m.role === "admin").length.toString()} icon={Shield} />
          <StatCard label="Staff" value={teamMembers.filter(m => m.role === "staff").length.toString()} icon={UserCog} />
          <StatCard label="Pending Invites" value={teamMembers.filter(m => m.status === "invited").length.toString()} icon={Mail} />
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-muted-foreground">{teamMembers.length} / 5 members (Pro plan)</p>
          <Button data-testid="button-invite-member">
            <Plus className="h-4 w-4 mr-2" />Invite Member
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
                          <Badge variant="outline" className="text-xs">Pending</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{member.email}</span>
                        <span>Active: {member.lastActive}</span>
                      </div>
                    </div>
                    {member.role !== "owner" && (
                      <div className="flex items-center gap-2">
                        <Select defaultValue={member.role}>
                          <SelectTrigger className="w-24" data-testid={`select-role-${member.id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="staff">Staff</SelectItem>
                          </SelectContent>
                        </Select>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Remove</DropdownMenuItem>
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
            <h3 className="font-semibold mb-4">Permission Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Module</th>
                    <th className="text-center py-2 px-3 font-medium text-muted-foreground">Owner</th>
                    <th className="text-center py-2 px-3 font-medium text-muted-foreground">Admin</th>
                    <th className="text-center py-2 px-3 font-medium text-muted-foreground">Staff</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((p) => (
                    <tr key={p.module} className="border-b last:border-0">
                      <td className="py-2 pr-4">{p.module}</td>
                      <td className="text-center py-2 px-3">{p.owner ? <Badge variant="default" className="text-xs px-1.5">Yes</Badge> : <Badge variant="secondary" className="text-xs px-1.5 opacity-40">No</Badge>}</td>
                      <td className="text-center py-2 px-3">{p.admin ? <Badge variant="default" className="text-xs px-1.5">Yes</Badge> : <Badge variant="secondary" className="text-xs px-1.5 opacity-40">No</Badge>}</td>
                      <td className="text-center py-2 px-3">{p.staff ? <Badge variant="default" className="text-xs px-1.5">Yes</Badge> : <Badge variant="secondary" className="text-xs px-1.5 opacity-40">No</Badge>}</td>
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
