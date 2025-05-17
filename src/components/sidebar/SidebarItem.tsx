
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  FileText, 
  AlertCircle, 
  Wrench, 
  Calendar, 
  Upload, 
  Activity, 
  BarChart, 
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
  path?: string;
  subMenuItems?: SubMenuItem[];
}

interface SidebarItemProps {
  icon: string;
  label: string;
  path?: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
  subMenuItems?: SubMenuItem[];
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  path,
  active = false,
  collapsed = false,
  onClick,
  subMenuItems = [],
}) => {
  const location = useLocation();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  // Check if this path or any subpath is active
  const isPathActive = (currentPath: string, itemPath?: string) => {
    if (!itemPath) return false;
    return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
  };

  // Check if current item or any of its children match the current path
  const hasActiveChild = (items?: SubMenuItem[]): boolean => {
    if (!items) return false;
    return items.some(item => 
      isPathActive(location.pathname, item.path) || 
      hasActiveChild(item.subMenuItems)
    );
  };

  const isActive = 
    active || 
    isPathActive(location.pathname, path) || 
    hasActiveChild(subMenuItems);

  // Auto-expand menu if it contains the current path
  useEffect(() => {
    if (hasActiveChild(subMenuItems) && !collapsed) {
      setIsSubMenuOpen(true);
    }
  }, [location.pathname, subMenuItems, collapsed]);

  const hasSubMenu = subMenuItems && subMenuItems.length > 0;

  const toggleSubMenu = (e: React.MouseEvent) => {
    if (hasSubMenu && !collapsed) {
      e.preventDefault();
      e.stopPropagation();
      setIsSubMenuOpen(!isSubMenuOpen);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return <Home size={20} className="text-blue-600" />;
      case "report":
        return <FileText size={20} className="text-blue-600" />;
      case "transformer-info":
        return <Database size={20} className="text-blue-600" />;
      case "transformer-faults":
        return <AlertCircle size={20} className="text-blue-600" />;
      case "transformer-maintenance":
        return <Wrench size={20} className="text-blue-600" />; 
      case "age-assessment":
        return <Calendar size={20} className="text-blue-600" />;
      case "upload":
        return <Upload size={20} className="text-blue-600" />;
      case "transformer-importance":
        return <Activity size={20} className="text-blue-600" />;
      case "economic-analysis":
        return <BarChart size={20} className="text-blue-600" />;
      case "inventory":
        return <Package size={20} className="text-blue-600" />;
      case "management":
        return <Settings size={20} className="text-blue-600" />;
      case "manual":
        return <BookOpen size={20} className="text-blue-600" />;
      case "history":
        return <Clock size={20} className="text-blue-600" />;
      case "logout":
        return <LogOut size={20} className="text-blue-600" />;
      case "search":
        return <Search size={20} className="text-blue-600" />;
      case "visual-inspection":
        return <Eye size={20} className="text-blue-600" />;
      case "oil-test":
        return <Droplet size={20} className="text-blue-600" />;
      case "electrical-test":
        return <Zap size={20} className="text-blue-600" />;
      case "add-item":
        return <Plus size={20} className="text-blue-600" />;
      case "factor-setting":
        return <BarChart size={20} className="text-blue-600" />;
      case "transformer-oil":
        return <Droplet size={20} className="text-blue-600" />;
      case "oil-inventory":
        return <Box size={20} className="text-blue-600" />;
      case "withdrawal-records":
        return <ShoppingCart size={20} className="text-blue-600" />;
      case "purchase-records":
        return <ShoppingCart size={20} className="text-blue-600" />;
      case "expense-records":
        return <DollarSign size={20} className="text-blue-600" />;
      case "calculation-results":
        return <Calculator size={20} className="text-blue-600" />;
      case "oil-receipt-time":
        return <Clock size={20} className="text-blue-600" />;
      case "bushing-arrester":
        return <Wrench size={20} className="text-blue-600" />;
      case "change-password":
        return <Lock size={20} className="text-blue-600" />;
      case "user-management":
        return <Users size={20} className="text-blue-600" />;
      case "basic-transformer-data":
        return <Database size={20} className="text-blue-600" />;
      case "transformer-importance-data":
        return <Database size={20} className="text-blue-600" />;
      case "test-data":
        return <Settings size={20} className="text-blue-600" />;
      case "vi-topics":
        return <Eye size={20} className="text-blue-600" />;
      case "vi-criteria":
        return <Settings size={20} className="text-blue-600" />;
      case "hi-score":
        return <Percent size={20} className="text-blue-600" />;
      case "factor-score":
        return <Percent size={20} className="text-blue-600" />;
      case "sub-component-weight":
        return <SlidersHorizontal size={20} className="text-blue-600" />;
      case "test-score-weight":
        return <SlidersHorizontal size={20} className="text-blue-600" />;
      case "main-component-weight":
        return <SlidersHorizontal size={20} className="text-blue-600" />;
      default:
        return <Home size={20} className="text-blue-600" />;
    }
  };

  const renderItem = () => {
    const itemContent = (
      <>
        <div className={cn("flex items-center", collapsed ? "justify-center mx-auto" : "")}>
          <span className="shrink-0">{getIcon(icon)}</span>
          {!collapsed && <span className="ml-3 truncate">{label}</span>}
        </div>
        {hasSubMenu && !collapsed && (
          <span className="text-gray-400">
            {isSubMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </>
    );

    const itemClasses = cn(
      "flex items-center cursor-pointer transition-colors hover:bg-gray-100",
      isActive ? "bg-blue-50 text-blue-700" : "text-gray-700",
      collapsed ? "justify-center py-3 px-0 w-full" : "px-4 py-2",
      hasSubMenu && !collapsed ? "justify-between" : ""
    );

    if (path && !hasSubMenu) {
      return (
        <Link to={path} className={itemClasses} onClick={onClick}>
          {itemContent}
        </Link>
      );
    }

    return (
      <div
        className={itemClasses}
        onClick={(e) => {
          if (hasSubMenu && !collapsed) {
            toggleSubMenu(e);
          } else if (path) {
            // Navigate programmatically if there's a path but also has submenus
            window.location.href = path;
          } else if (onClick) {
            onClick();
          }
        }}
      >
        {itemContent}
      </div>
    );
  };

  const renderSubMenu = (items: SubMenuItem[], level: number = 1) => {
    if (!items || items.length === 0 || collapsed) return null;

    return (
      <div className={cn("ml-6 border-l border-gray-200 pl-2", level > 1 && "mt-1")}>
        {items.map((subItem, index) => (
          <div key={index}>
            {subItem.path ? (
              <Link 
                to={subItem.path}
                className={cn(
                  "flex items-center px-3 py-2 transition-colors hover:bg-gray-100 text-blue-600",
                  isPathActive(location.pathname, subItem.path) ? "bg-blue-50" : ""
                )}
                onClick={onClick}
              >
                <span className="shrink-0">{getIcon(subItem.icon)}</span>
                <span className="ml-3 truncate text-sm">{subItem.label}</span>
              </Link>
            ) : (
              <div
                className={cn(
                  "flex items-center justify-between px-3 py-2 cursor-pointer transition-colors hover:bg-gray-100 text-blue-600",
                  hasActiveChild(subItem.subMenuItems) ? "bg-blue-50" : ""
                )}
              >
                <div className="flex items-center">
                  <span className="shrink-0">{getIcon(subItem.icon)}</span>
                  <span className="ml-3 truncate text-sm">{subItem.label}</span>
                </div>
                {subItem.subMenuItems && subItem.subMenuItems.length > 0 && (
                  <span className="text-gray-400">
                    <ChevronRight size={16} />
                  </span>
                )}
              </div>
            )}
            
            {/* Render nested submenus recursively */}
            {subItem.subMenuItems && subItem.subMenuItems.length > 0 && 
              renderSubMenu(subItem.subMenuItems, level + 1)
            }
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {renderItem()}
      {isSubMenuOpen && renderSubMenu(subMenuItems)}
    </>
  );
};

export default SidebarItem;
