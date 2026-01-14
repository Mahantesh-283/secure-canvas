import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export type TaskStatus = "pending" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  due_date?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  due_date?: string | null;
}

export function useTasks() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTasks(data as Task[]);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast({
        title: "Error",
        description: "Failed to fetch tasks. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (input: CreateTaskInput) => {
    if (!user) return { error: new Error("Not authenticated") };

    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert({
          user_id: user.id,
          title: input.title,
          description: input.description || null,
          status: input.status || "pending",
          priority: input.priority || "medium",
          due_date: input.due_date || null,
        })
        .select()
        .single();

      if (error) throw error;

      setTasks((prev) => [data as Task, ...prev]);
      toast({
        title: "Task created",
        description: "Your task has been created successfully.",
      });
      return { error: null, data: data as Task };
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      });
      return { error: error as Error, data: null };
    }
  };

  const updateTask = async (id: string, input: UpdateTaskInput) => {
    if (!user) return { error: new Error("Not authenticated") };

    try {
      const { data, error } = await supabase
        .from("tasks")
        .update(input)
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? (data as Task) : task))
      );
      toast({
        title: "Task updated",
        description: "Your task has been updated successfully.",
      });
      return { error: null, data: data as Task };
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
      return { error: error as Error, data: null };
    }
  };

  const deleteTask = async (id: string) => {
    if (!user) return { error: new Error("Not authenticated") };

    try {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;

      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast({
        title: "Task deleted",
        description: "Your task has been deleted successfully.",
      });
      return { error: null };
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
      return { error: error as Error };
    }
  };

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
}
