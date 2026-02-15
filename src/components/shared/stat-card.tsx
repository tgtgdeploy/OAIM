import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon?: LucideIcon;
  change?: string;
  iconColor?: string;
  testId?: string;
}

export function StatCard({ label, value, icon: Icon, change, iconColor = "text-muted-foreground", testId }: StatCardProps) {
  return (
    <Card data-testid={testId}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-sm text-muted-foreground">{label}</span>
          {Icon && <Icon className={`h-4 w-4 ${iconColor}`} />}
        </div>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="text-xs text-primary mt-1">{change}</div>
        )}
      </CardContent>
    </Card>
  );
}
