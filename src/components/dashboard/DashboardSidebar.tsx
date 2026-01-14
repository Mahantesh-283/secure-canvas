import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, CheckSquare, User, X } from "lucide-react";

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "profile", label: "Profile", icon: User },
];

export function DashboardSidebar({ activeTab, onTabChange, isOpen, onClose }: DashboardSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border lg:hidden">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-sidebar-primary rounded-lg">
              <CheckSquare className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-sidebar-foreground">TaskFlow</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 space-y-2">
          <p className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-3 mb-4">
            Navigation
          </p>
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                activeTab === item.id && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
              onClick={() => {
                onTabChange(item.id);
                onClose();
              }}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </div>
      </aside>
    </>
  );
}
