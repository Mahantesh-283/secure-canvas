import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { OverviewView } from "@/components/dashboard/OverviewView";
import { TasksView } from "@/components/dashboard/TasksView";
import { ProfileView } from "@/components/dashboard/ProfileView";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewView onNavigateToTasks={() => setActiveTab("tasks")} />;
      case "tasks":
        return <TasksView />;
      case "profile":
        return <ProfileView />;
      default:
        return <OverviewView onNavigateToTasks={() => setActiveTab("tasks")} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex">
        <DashboardSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-0">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
