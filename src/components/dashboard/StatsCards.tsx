import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/hooks/useTasks";
import { CheckCircle2, Clock, AlertCircle, ListTodo } from "lucide-react";

interface StatsCardsProps {
  tasks: Task[];
}

export function StatsCards({ tasks }: StatsCardsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress").length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: ListTodo,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: AlertCircle,
      color: "text-muted-foreground",
      bgColor: "bg-muted",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
