
import React from "react";
import { cn } from "@/lib/utils";
import { 
  Home, 
  FileText, 
  AlertCircle, 
  Tool, 
  Calendar, 
  Upload, 
  Activity, 
  BarChart, 
  PieChart, 
  Package, 
  Settings, 
  BookOpen, 
  Clock,
  LogOut
} from "lucide-react";

interface SidebarItemProps {
  icon: string;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active = false,
  collapsed = false,
  onClick,
}) => {
  const getIcon = () => {
    switch (icon) {
      case "home":
        return <Home size={20} />;
      case "report":
        return <FileText size={20} />;
      case "transformer-info":
        return <Activity size={20} />;
      case "transformer-faults":
        return <AlertCircle size={20} />;
      case "transformer-maintenance":
        return <Tool size={20} />;
      case "age-assessment":
        return <Calendar size={20} />;
      case "upload":
        return <Upload size={20} />;
      case "transformer-importance":
        return <Activity size={20} />;
      case "economic-analysis":
        return <BarChart size={20} />;
      case "inventory":
        return <Package size={20} />;
      case "management":
        return <Settings size={20} />;
      case "manual":
        return <BookOpen size={20} />;
      case "history":
        return <Clock size={20} />;
      case "logout":
        return <LogOut size={20} />;
      default:
        return <Home size={20} />;
    }
  };

  return (
    <div
      className={cn(
        "flex items-center px-3 py-2 cursor-pointer transition-colors hover:bg-gray-100",
        active ? "bg-blue-50 text-blue-700" : "text-gray-700",
        collapsed ? "justify-center" : "px-4"
      )}
      onClick={onClick}
    >
      <div className={cn("flex items-center", collapsed ? "justify-center" : "")}>
        <span className="shrink-0">{getIcon()}</span>
        {!collapsed && <span className="ml-3 truncate">{label}</span>}
      </div>
    </div>
  );
};

export default SidebarItem;
