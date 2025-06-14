
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  FileText, 
  AlertTriangle, // Changed from AlertCircle
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
  SlidersHorizontal,
  Info,
  FileSearch,
  ShieldCheck,
  TestTubes,
  Cog,
  List,
  FileCog,
  Clipboard,
  MoveRight,
  Beaker,
  ScrollText,
  BarChart2,
  LineChart,
  FileBarChart,
  RotateCcw,
  Layers,
  PieChart,
  Filter,
  ArrowRightCircle,
  CircleDollarSign
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

  const getIcon = (iconName: string, isItemActive: boolean = false) => {
    const iconProps = {
      size: 20,
      className: isItemActive ? "text-blue-600" : "text-gray-600"
    };

    switch (iconName) {
      case "home":
        return <Home {...iconProps} />;
      case "report":
        return <FileText {...iconProps} />;
      case "transformer-info":
        return <Info {...iconProps} />;
      case "transformer-faults":
        return <AlertTriangle {...iconProps} />; // Changed from AlertCircle to AlertTriangle
      case "transformer-maintenance":
        return <Wrench {...iconProps} />; 
      case "age-assessment":
        return <Calendar {...iconProps} />;
      case "upload":
        return <Upload {...iconProps} />;
      case "transformer-importance":
        return <Activity {...iconProps} />;
      case "economic-analysis":
        return <BarChart {...iconProps} />;
      case "inventory":
        return <Package {...iconProps} />;
      case "management":
        return <Settings {...iconProps} />;
      case "manual":
        return <BookOpen {...iconProps} />;
      case "history":
        return <Clock {...iconProps} />;
      case "logout":
        return <LogOut {...iconProps} />;
      case "search":
        return <Search {...iconProps} />;
      case "visual-inspection":
        return <Eye {...iconProps} />;
      case "oil-test":
        return <Droplet {...iconProps} />;
      case "electrical-test":
        return <Zap {...iconProps} />;
      case "add-item":
        return <Plus {...iconProps} />;
      case "factor-setting":
        return <LineChart {...iconProps} />; 
      case "transformer-oil":
        return <Beaker {...iconProps} />; 
      case "oil-inventory":
        return <Box {...iconProps} />;
      case "withdrawal-records":
        return <ShoppingCart {...iconProps} />;
      case "purchase-records":
        return <CircleDollarSign {...iconProps} />; 
      case "expense-records":
        return <DollarSign {...iconProps} />;
      case "calculation-results":
        return <Calculator {...iconProps} />;
      case "oil-receipt-time":
        return <Clock {...iconProps} />;
      case "bushing-arrester":
        return <Filter {...iconProps} />; 
      case "change-password":
        return <Lock {...iconProps} />;
      case "user-management":
        return <Users {...iconProps} />;
      case "basic-transformer-data":
        return <Database {...iconProps} />;
      case "transformer-importance-data":
        return <PieChart {...iconProps} />; 
      case "test-data":
        return <Clipboard {...iconProps} />; 
      case "vi-topics":
        return <List {...iconProps} />; 
      case "vi-criteria":
        return <FileCog {...iconProps} />; 
      case "hi-score":
        return <Percent {...iconProps} />;
      case "factor-score":
        return <BarChart2 {...iconProps} />; 
      case "sub-component-weight":
        return <SlidersHorizontal {...iconProps} />;
      case "test-score-weight":
        return <Layers {...iconProps} />; 
      case "main-component-weight":
        return <BarChart {...iconProps} />; 
      case "oltc":
        return <Cog {...iconProps} />;
      case "all-test-results":
        return <TestTubes {...iconProps} />;
      case "condition-check":
        return <ShieldCheck {...iconProps} />;
      case "activate":
        return <ArrowRightCircle {...iconProps} />; 
      case "consideration-data":
        return <FileSearch {...iconProps} />;
      case "standard-report": 
        return <ScrollText {...iconProps} />;
      case "transformer-report": 
        return <FileBarChart {...iconProps} />;
      case "damages-report": 
        return <RotateCcw {...iconProps} />;
      case "transformer-details": 
        return <FileCog {...iconProps} />;
      case "transformer-relocation": 
        return <MoveRight {...iconProps} />;
      default:
        return <Home {...iconProps} />;
    }
  };

  const renderItem = () => {
    const itemContent = (
      <>
        <div className={cn("flex items-center", collapsed ? "justify-center mx-auto" : "")}>
          <span className="shrink-0">{getIcon(icon, isActive)}</span>
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
        {items.map((subItem, index) => {
          const isSubItemActive = isPathActive(location.pathname, subItem.path);
          
          return (
            <div key={index}>
              {subItem.path ? (
                <Link 
                  to={subItem.path}
                  className={cn(
                    "flex items-center px-3 py-2 transition-colors hover:bg-gray-100",
                    isSubItemActive ? "bg-blue-50 text-[#1E5CFF]" : "text-[#1E5CFF]" // Changed submenu text color to #1E5CFF
                  )}
                  onClick={onClick}
                >
                  <span className="shrink-0">{getIcon(subItem.icon, isSubItemActive)}</span>
                  <span className="ml-3 truncate text-sm">{subItem.label}</span>
                </Link>
              ) : (
                <div
                  className={cn(
                    "flex items-center justify-between px-3 py-2 cursor-pointer transition-colors hover:bg-gray-100",
                    hasActiveChild(subItem.subMenuItems) ? "bg-blue-50 text-[#1E5CFF]" : "text-[#1E5CFF]" // Changed submenu text color to #1E5CFF
                  )}
                >
                  <div className="flex items-center">
                    <span className="shrink-0">{getIcon(subItem.icon, hasActiveChild(subItem.subMenuItems))}</span>
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
          );
        })}
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
