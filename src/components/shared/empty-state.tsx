import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  testId?: string;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionHref, onAction, testId }: EmptyStateProps) {
  return (
    <div className="max-w-md mx-auto py-16 text-center" data-testid={testId}>
      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted mx-auto mb-6">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button>
            {actionLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      )}
      {actionLabel && onAction && !actionHref && (
        <Button onClick={onAction}>
          {actionLabel}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
