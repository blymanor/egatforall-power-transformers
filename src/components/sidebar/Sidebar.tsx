
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapsedChange }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    
    // Call the callback if provided
    if (onCollapsedChange) {
      onCollapsedChange(newCollapsedState);
    }
    
    // Dispatch custom event for broader application awareness
    window.dispatchEvent(
      new CustomEvent('sidebarStateChange', { 
        detail: { collapsed: newCollapsedState } 
      })
    );
  };

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 h-full transition-all duration-300 flex flex-col",
        collapsed ? "w-[80px]" : "w-[320px]"
      )}
    >
      <div className="flex items-center justify-between p-4 pt-10 pb-7">
        {!collapsed && (
          <div className="text-[#0442AF] font-bold text-2xl">EGATforALL</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(collapsed ? "mx-auto" : "ml-auto")}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <div className="overflow-y-auto flex-1 py-4">
        <SidebarItem path="/" label="Dashboard" />
        <SidebarItem path="/transformer-abnormality" label="Transformer Abnormality" />
        <SidebarItem path="/age-assessment" label="Age Assessment" />
        <SidebarItem path="/upload-data" label="Upload Data" />
        <SidebarItem path="/reports" label="Reports" />
        <SidebarItem path="/transformer-info" label="Transformer Info" />
        <SidebarItem path="/transformer-maintenance" label="Transformer Maintenance" />
        <SidebarItem path="/transformer-importance" label="Transformer Importance" />
        <SidebarItem path="/economic-analysis" label="Economic Analysis" />
        <SidebarItem path="/inventory" label="Inventory" />
        <SidebarItem path="/management" label="Management" />
      </div>

      <div className="mt-auto w-full">
        <div className="p-2">
          <SidebarItem path="/manual" label="Manual" />
          <SidebarItem path="/test-history" label="Test History" />
          <SidebarItem path="/logout" label="Logout" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
