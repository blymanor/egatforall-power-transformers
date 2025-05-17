
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Home, 
  FileText, 
  AlertCircle, 
  Wrench, 
  Calendar, 
  Upload, 
  Activity, 
  BarChart, 
  PieChart, 
  Package, 
  Settings, 
  BookOpen, 
  Clock,
  LogOut,
  ChevronDown,
  ChevronRight,
  Database,
  Search,
  Eye,
  Droplet,
  Zap,
  Plus,
  DollarSign,
  Calculator,
  Box,
  ShoppingCart,
  Users,
  Lock,
  Percent,
  SlidersHorizontal
} from "lucide-react";

interface SubMenuItem {
  icon: string;
  label: string;
  subMenuItems?: SubMenuItem[];
}

interface SidebarItemProps {
  icon: string;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
  subMenuItems?: SubMenuItem[];
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active = false,
  collapsed = false,
  onClick,
  subMenuItems = [],
}) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const hasSubMenu = subMenuItems && subMenuItems.length > 0;

  const toggleSubMenu = (e: React.MouseEvent) => {
    if (hasSubMenu && !collapsed) {
      e.stopPropagation();
      setIsSubMenuOpen(!isSubMenuOpen);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return <Home size={20} />;
      case "report":
        return <FileText size={20} />;
      case "transformer-info":
        return <Database size={20} />;
      case "transformer-faults":
        return <AlertCircle size={20} />;
      case "transformer-maintenance":
        return <Wrench size={20} />; 
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
      case "search":
        return <Search size={20} />;
      case "visual-inspection":
        return <Eye size={20} />;
      case "oil-test":
        return <Droplet size={20} />;
      case "electrical-test":
        return <Zap size={20} />;
      case "add-item":
        return <Plus size={20} />;
      case "factor-setting":
        return <BarChart size={20} />;
      case "transformer-oil":
        return <Droplet size={20} />;
      case "oil-inventory":
        return <Box size={20} />;
      case "withdrawal-records":
        return <ShoppingCart size={20} />;
      case "purchase-records":
        return <ShoppingCart size={20} />;
      case "expense-records":
        return <DollarSign size={20} />;
      case "calculation-results":
        return <Calculator size={20} />;
      case "oil-receipt-time":
        return <Clock size={20} />;
      case "bushing-arrester":
        return <Wrench size={20} />;
      case "change-password":
        return <Lock size={20} />;
      case "user-management":
        return <Users size={20} />;
      case "basic-transformer-data":
        return <Database size={20} />;
      case "transformer-importance-data":
        return <Database size={20} />;
      case "test-data":
        return <Settings size={20} />;
      case "vi-topics":
        return <Eye size={20} />;
      case "vi-criteria":
        return <Settings size={20} />;
      case "hi-score":
        return <Percent size={20} />;
      case "factor-score":
        return <Percent size={20} />;
      case "sub-component-weight":
        return <SlidersHorizontal size={20} />;
      case "test-score-weight":
        return <SlidersHorizontal size={20} />;
      case "main-component-weight":
        return <SlidersHorizontal size={20} />;
      default:
        return <Home size={20} />;
    }
  };

  return (
    <>
      <div
        className={cn(
          "flex items-center px-3 py-2 cursor-pointer transition-colors hover:bg-gray-100",
          active ? "bg-blue-50 text-blue-700" : "text-gray-700",
          collapsed ? "justify-center" : "px-4",
          hasSubMenu ? "justify-between" : ""
        )}
        onClick={(e) => {
          if (hasSubMenu && !collapsed) {
            toggleSubMenu(e);
          } else if (onClick) {
            onClick();
          }
        }}
      >
        <div className={cn("flex items-center", collapsed ? "justify-center" : "")}>
          <span className="shrink-0">{getIcon(icon)}</span>
          {!collapsed && <span className="ml-3 truncate">{label}</span>}
        </div>
        {hasSubMenu && !collapsed && (
          <span className="text-gray-400">
            {isSubMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </div>

      {/* Submenu items */}
      {hasSubMenu && isSubMenuOpen && !collapsed && (
        <div className="ml-6 border-l border-gray-200 pl-2">
          {subMenuItems.map((subItem, index) => (
            <div key={index}>
              <div
                className="flex items-center px-3 py-2 cursor-pointer transition-colors hover:bg-gray-100 text-gray-700"
                onClick={onClick}
              >
                <span className="shrink-0">{getIcon(subItem.icon)}</span>
                <span className="ml-3 truncate text-sm">{subItem.label}</span>
              </div>
              {/* Handle third level submenus if they exist */}
              {subItem.subMenuItems && subItem.subMenuItems.length > 0 && (
                <div className="ml-6 border-l border-gray-200 pl-2">
                  {subItem.subMenuItems.map((thirdLevelItem, thirdIndex) => (
                    <div
                      key={thirdIndex}
                      className="flex items-center px-3 py-2 cursor-pointer transition-colors hover:bg-gray-100 text-gray-700"
                      onClick={onClick}
                    >
                      <span className="shrink-0">{getIcon(thirdLevelItem.icon)}</span>
                      <span className="ml-3 truncate text-sm">{thirdLevelItem.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SidebarItem;
