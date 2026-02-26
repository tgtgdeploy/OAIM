import { Badge } from "@/components/ui/badge";

const colorMap: Record<string, string> = {
  success: "bg-green-500/10 text-green-700 dark:text-green-300",
  active: "bg-green-500/10 text-green-700 dark:text-green-300",
  completed: "bg-green-500/10 text-green-700 dark:text-green-300",
  resolved: "bg-green-500/10 text-green-700 dark:text-green-300",
  closed_won: "bg-green-500/10 text-green-700 dark:text-green-300",

  info: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  new: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  new_inquiry: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  trial: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  open: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  confirmed: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  pending: "bg-blue-500/10 text-blue-700 dark:text-blue-300",

  warning: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
  quoted: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
  in_progress: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",

  orange: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
  follow_up: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
  shipped: "bg-orange-500/10 text-orange-700 dark:text-orange-300",

  error: "bg-red-500/10 text-red-700 dark:text-red-300",
  failed: "bg-red-500/10 text-red-700 dark:text-red-300",
  suspended: "bg-red-500/10 text-red-700 dark:text-red-300",
  overdue: "bg-red-500/10 text-red-700 dark:text-red-300",
  urgent: "bg-red-500/10 text-red-700 dark:text-red-300",
  closed_lost: "bg-red-500/10 text-red-700 dark:text-red-300",
  cancelled: "bg-red-500/10 text-red-700 dark:text-red-300",

  purple: "bg-purple-500/10 text-purple-700 dark:text-purple-300",

  muted: "bg-muted text-muted-foreground",
  draft: "bg-muted text-muted-foreground",
  closed: "bg-muted text-muted-foreground",
  inactive: "bg-muted text-muted-foreground",

  paid: "bg-green-500/10 text-green-700 dark:text-green-300",
  received: "bg-green-500/10 text-green-700 dark:text-green-300",
  published: "bg-green-500/10 text-green-700 dark:text-green-300",
  approved: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  submitted: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
  pending_approval: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
  rejected: "bg-red-500/10 text-red-700 dark:text-red-300",
  planned: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  paused: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
  low: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
  out_of_stock: "bg-red-500/10 text-red-700 dark:text-red-300",
  normal: "bg-green-500/10 text-green-700 dark:text-green-300",
};

interface StatusBadgeProps {
  status: string;
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const colorClass = colorMap[status] || colorMap.muted;
  const displayLabel = label || status.replace(/_/g, " ");

  return (
    <Badge variant="secondary" className={`text-xs capitalize ${colorClass} ${className || ""}`}>
      {displayLabel}
    </Badge>
  );
}
