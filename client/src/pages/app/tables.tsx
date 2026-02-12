import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, LayoutGrid, Users } from "lucide-react";

const tables = [
  { id: "T-01", seats: 2, status: "available", zone: "Indoor" },
  { id: "T-02", seats: 2, status: "occupied", zone: "Indoor", guest: "Ahmad R.", since: "7:30 PM" },
  { id: "T-03", seats: 4, status: "available", zone: "Indoor" },
  { id: "T-04", seats: 4, status: "reserved", zone: "Indoor", guest: "Lisa T.", time: "8:00 PM" },
  { id: "T-05", seats: 4, status: "occupied", zone: "Indoor", guest: "Sarah A.", since: "7:00 PM" },
  { id: "T-06", seats: 6, status: "available", zone: "Indoor" },
  { id: "T-07", seats: 2, status: "cleaning", zone: "Outdoor" },
  { id: "T-08", seats: 6, status: "reserved", zone: "Outdoor", guest: "Mei Ling", time: "6:30 PM" },
  { id: "T-09", seats: 4, status: "available", zone: "Outdoor" },
  { id: "T-10", seats: 8, status: "reserved", zone: "VIP", guest: "Lisa T.", time: "8:00 PM" },
  { id: "T-11", seats: 10, status: "available", zone: "VIP" },
  { id: "T-12", seats: 12, status: "occupied", zone: "VIP", guest: "Corporate", since: "12:00 PM" },
];

function getStatusColor(status: string) {
  switch (status) {
    case "available": return "bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    case "occupied": return "bg-red-500/10 dark:bg-red-400/10 text-red-600 dark:text-red-400 border-red-500/20";
    case "reserved": return "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    case "cleaning": return "bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    default: return "";
  }
}

function getCardBorder(status: string) {
  switch (status) {
    case "available": return "border-emerald-500/30 dark:border-emerald-400/30";
    case "occupied": return "border-red-500/30 dark:border-red-400/30";
    case "reserved": return "border-blue-500/30 dark:border-blue-400/30";
    case "cleaning": return "border-amber-500/30 dark:border-amber-400/30";
    default: return "";
  }
}

const zones = Array.from(new Set(tables.map((t) => t.zone)));

const counts = {
  available: tables.filter((t) => t.status === "available").length,
  occupied: tables.filter((t) => t.status === "occupied").length,
  reserved: tables.filter((t) => t.status === "reserved").length,
  cleaning: tables.filter((t) => t.status === "cleaning").length,
};

export default function TablesPage() {
  return (
    <AppLayout title="Table Management">
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-muted-foreground">Available ({counts.available})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span className="text-xs text-muted-foreground">Occupied ({counts.occupied})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              <span className="text-xs text-muted-foreground">Reserved ({counts.reserved})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span className="text-xs text-muted-foreground">Cleaning ({counts.cleaning})</span>
            </div>
          </div>
          <Button data-testid="button-add-table">
            <Plus className="h-4 w-4 mr-2" />
            Add Table
          </Button>
        </div>

        {zones.map((zone) => (
          <div key={zone}>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">{zone}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {tables.filter((t) => t.zone === zone).map((table) => (
                <Card
                  key={table.id}
                  className={`hover-elevate overflow-visible cursor-pointer ${getCardBorder(table.status)}`}
                  data-testid={`card-table-${table.id}`}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold" data-testid={`text-table-id-${table.id}`}>{table.id}</span>
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getStatusColor(table.status)}`}>
                        {table.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{table.seats} seats</span>
                    </div>
                    {(table.status === "occupied" || table.status === "reserved") && (
                      <div className="text-[11px] text-muted-foreground truncate">
                        {table.guest}
                        {table.since && <span className="block">Since {table.since}</span>}
                        {table.time && <span className="block">At {table.time}</span>}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
