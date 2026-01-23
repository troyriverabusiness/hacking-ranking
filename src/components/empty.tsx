import { LucideIcon, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmptyProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function Empty({
  icon: Icon = FileQuestion,
  title = "No data available",
  description = "There is no data to display at the moment.",
  action,
  className,
}: EmptyProps) {
  return (
    <Card className={`flex flex-col items-center justify-center p-12 text-center border-none shadow-none ${className || ""}`}>
      <Icon className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick} variant="outline">
          {action.label}
        </Button>
      )}
    </Card>
  );
}
