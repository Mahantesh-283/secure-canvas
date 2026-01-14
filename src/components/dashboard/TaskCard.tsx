import { useState } from "react";
import { Task, TaskStatus, TaskPriority, UpdateTaskInput } from "@/hooks/useTasks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, Calendar, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "badge-pending" },
  in_progress: { label: "In Progress", className: "badge-in-progress" },
  completed: { label: "Completed", className: "badge-completed" },
};

const priorityConfig: Record<TaskPriority, { label: string; className: string }> = {
  low: { label: "Low", className: "priority-low" },
  medium: { label: "Medium", className: "priority-medium" },
  high: { label: "High", className: "priority-high" },
};

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  return (
    <Card className="card-hover animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "font-semibold truncate",
              task.status === "completed" && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(task)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs text-muted-foreground">Change Status</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "pending")}>
                Mark as Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "in_progress")}>
                Mark as In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(task.id, "completed")}>
                Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(task.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}
        
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={statusConfig[task.status].className}>
            {statusConfig[task.status].label}
          </Badge>
          <Badge variant="outline" className={priorityConfig[task.priority].className}>
            <Flag className="mr-1 h-3 w-3" />
            {priorityConfig[task.priority].label}
          </Badge>
        </div>

        {task.due_date && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Due: {format(new Date(task.due_date), "MMM d, yyyy")}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
