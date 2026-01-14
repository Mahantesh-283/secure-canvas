import { useTasks } from "@/hooks/useTasks";
import { useProfile } from "@/hooks/useProfile";
import { StatsCards } from "./StatsCards";
import { TaskCard } from "./TaskCard";
import { TaskDialog } from "./TaskDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, ArrowRight } from "lucide-react";
import { useState } from "react";

interface OverviewViewProps {
  onNavigateToTasks: () => void;
}

export function OverviewView({ onNavigateToTasks }: OverviewViewProps) {
  const { tasks, loading, createTask, updateTask, deleteTask } = useTasks();
  const { profile, loading: profileLoading } = useProfile();
  const [dialogOpen, setDialogOpen] = useState(false);

  const recentTasks = tasks.slice(0, 6);
  const pendingTasks = tasks.filter((t) => t.status !== "completed").length;

  const handleSave = async (data: any) => {
    await createTask(data);
  };

  const handleStatusChange = async (id: string, status: any) => {
    await updateTask(id, { status });
  };

  if (loading || profileLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          Welcome back, {profile?.full_name?.split(" ")[0] || "there"}! 👋
        </h1>
        <p className="text-muted-foreground">
          {pendingTasks > 0
            ? `You have ${pendingTasks} task${pendingTasks === 1 ? "" : "s"} waiting for you.`
            : "You're all caught up! Great job!"}
        </p>
      </div>

      {/* Stats */}
      <StatsCards tasks={tasks} />

      {/* Recent Tasks */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Tasks</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
            <Button variant="ghost" size="sm" onClick={onNavigateToTasks}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <p className="text-muted-foreground mb-4">No tasks yet. Create your first task!</p>
              <Button onClick={() => setDialogOpen(true)} className="bg-accent hover:bg-accent/90">
                <Plus className="mr-2 h-4 w-4" />
                Create Task
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recentTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={() => {}}
                  onDelete={deleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
      />
    </div>
  );
}
