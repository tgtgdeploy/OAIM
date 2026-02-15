import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface PageHeaderAction {
  label: string;
  icon?: LucideIcon;
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive";
  onClick?: () => void;
  testId?: string;
}

interface PageHeaderProps {
  subtitle?: string;
  actions?: PageHeaderAction[];
  children?: React.ReactNode;
}

export function PageHeader({ subtitle, actions, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {children}
        {actions?.map((action) => (
          <Button
            key={action.label}
            variant={action.variant || "default"}
            onClick={action.onClick}
            data-testid={action.testId}
          >
            {action.icon && <action.icon className="h-4 w-4 mr-2" />}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
