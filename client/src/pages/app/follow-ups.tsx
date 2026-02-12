import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Clock, CheckCircle2, AlertCircle, Calendar } from "lucide-react";

const followUps = [
  { id: "1", contact: "Lisa Tan", message: "Hi Lisa! Just checking in on your order. Would you like to confirm?", scheduled: "Today 3:00 PM", status: "pending", type: "automated" },
  { id: "2", contact: "David Ooi", message: "Hey David, the shoes you asked about are now 15% off!", scheduled: "Today 5:00 PM", status: "pending", type: "automated" },
  { id: "3", contact: "Mei Ling", message: "Hi Mei Ling, we have size L available now!", scheduled: "Tomorrow 10:00 AM", status: "pending", type: "manual" },
  { id: "4", contact: "James Wong", message: "Hi James, thanks for your inquiry! Here's our latest catalog.", scheduled: "Feb 14, 9:00 AM", status: "pending", type: "automated" },
  { id: "5", contact: "Sarah Ahmad", message: "Thank you for your order Sarah! How was the quality?", scheduled: "Feb 10, 2:00 PM", status: "completed", type: "automated" },
  { id: "6", contact: "Ahmad Razak", message: "Hi Ahmad, we have new wholesale prices for you.", scheduled: "Feb 9, 11:00 AM", status: "completed", type: "manual" },
  { id: "7", contact: "Kevin Lee", message: "Hi Kevin, it's been a week since your inquiry. Still interested?", scheduled: "Feb 8, 4:00 PM", status: "overdue", type: "automated" },
  { id: "8", contact: "Siti Aminah", message: "Hi Siti, your scarves bundle inquiry is still open.", scheduled: "Feb 7, 10:00 AM", status: "overdue", type: "automated" },
];

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "Pending", color: "bg-blue-500/10 text-blue-700 dark:text-blue-300", icon: Clock },
  completed: { label: "Completed", color: "bg-green-500/10 text-green-700 dark:text-green-300", icon: CheckCircle2 },
  overdue: { label: "Overdue", color: "bg-red-500/10 text-red-700 dark:text-red-300", icon: AlertCircle },
};

export default function FollowUpsPage() {
  return (
    <AppLayout title="Follow-ups">
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>{followUps.filter(f => f.status === "pending").length} pending</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span>{followUps.filter(f => f.status === "overdue").length} overdue</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" data-testid="button-calendar-view">
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </Button>
            <Button data-testid="button-create-followup">
              <Plus className="h-4 w-4 mr-2" />
              New Follow-up
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
            <TabsTrigger value="pending" data-testid="tab-pending">Pending</TabsTrigger>
            <TabsTrigger value="overdue" data-testid="tab-overdue">Overdue</TabsTrigger>
            <TabsTrigger value="completed" data-testid="tab-completed">Completed</TabsTrigger>
          </TabsList>

          {["all", "pending", "overdue", "completed"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-2 mt-4">
              {followUps
                .filter(f => tab === "all" || f.status === tab)
                .map((followUp) => {
                  const status = statusConfig[followUp.status];
                  return (
                    <Card key={followUp.id} className="hover-elevate overflow-visible cursor-pointer" data-testid={`card-followup-${followUp.id}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-9 w-9 flex-shrink-0">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {followUp.contact.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-sm font-medium">{followUp.contact}</span>
                              <Badge variant="secondary" className={`text-xs ${status.color}`}>
                                {status.label}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {followUp.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{followUp.message}</p>
                            <div className="flex items-center gap-1 mt-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{followUp.scheduled}</span>
                            </div>
                          </div>
                          {followUp.status === "pending" && (
                            <Button variant="outline" size="sm" data-testid={`button-send-${followUp.id}`}>
                              Send Now
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AppLayout>
  );
}
