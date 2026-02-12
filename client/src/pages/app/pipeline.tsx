import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const stages = [
  {
    id: "new_inquiry",
    title: "New Inquiry",
    color: "bg-blue-500",
    deals: [
      { id: "1", name: "Mei Ling", value: "RM 450", product: "Blue Dress x3", time: "2h ago" },
      { id: "2", name: "James Wong", value: "RM 120", product: "T-Shirt x2", time: "5h ago" },
      { id: "3", name: "Aisha Binti", value: "RM 680", product: "Handbag Premium", time: "1d ago" },
    ],
  },
  {
    id: "quoted",
    title: "Quoted",
    color: "bg-yellow-500",
    deals: [
      { id: "4", name: "Ahmad Razak", value: "RM 1,200", product: "Wholesale x50", time: "15m ago" },
      { id: "5", name: "David Ooi", value: "RM 320", product: "Shoes x2", time: "3h ago" },
    ],
  },
  {
    id: "follow_up",
    title: "Follow-up",
    color: "bg-orange-500",
    deals: [
      { id: "6", name: "Lisa Tan", value: "RM 150", product: "Accessories", time: "1h ago" },
      { id: "7", name: "Priya Nair", value: "RM 890", product: "Dress Collection", time: "2d ago" },
      { id: "8", name: "Kevin Lee", value: "RM 230", product: "Polo Shirts x5", time: "3d ago" },
      { id: "9", name: "Siti Aminah", value: "RM 450", product: "Scarves Bundle", time: "4d ago" },
    ],
  },
  {
    id: "closed_won",
    title: "Closed Won",
    color: "bg-green-500",
    deals: [
      { id: "10", name: "Sarah Ahmad", value: "RM 890", product: "Blue Dress x5", time: "1h ago" },
      { id: "11", name: "Raj Kumar", value: "RM 2,340", product: "Bulk Order", time: "3h ago" },
    ],
  },
];

export default function PipelinePage() {
  const totalValue = "RM 7,720";
  const totalDeals = stages.reduce((acc, s) => acc + s.deals.length, 0);

  return (
    <AppLayout title="Pipeline">
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm text-muted-foreground">{totalDeals} active deals</div>
            </div>
            <Badge variant="secondary" className="text-sm">{totalValue} pipeline value</Badge>
          </div>
          <Button data-testid="button-add-deal">
            <Plus className="h-4 w-4 mr-2" />
            Add Deal
          </Button>
        </div>

        <div className="overflow-x-auto -mx-4 md:-mx-6 px-4 md:px-6">
          <div className="flex gap-4 min-w-max pb-4">
            {stages.map((stage) => (
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
                              {deal.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-medium truncate">{deal.name}</span>
                              <span className="text-sm font-bold text-primary whitespace-nowrap">{deal.value}</span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{deal.product}</p>
                            <p className="text-xs text-muted-foreground mt-1">{deal.time}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="ghost" className="w-full border border-dashed text-muted-foreground" data-testid={`button-add-deal-${stage.id}`}>
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
