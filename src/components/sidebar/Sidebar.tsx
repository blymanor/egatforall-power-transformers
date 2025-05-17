
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
        "bg-white h-full transition-all duration-300 flex flex-col",
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
        <SidebarItem icon="home" path="/" label="Home" />
        <SidebarItem icon="report" path="/reports" label="รายงาน" />
        <SidebarItem icon="transformer-info" path="/transformer-info" label="ข้อมูลพื้นฐานของหม้อแปลง" />
        <SidebarItem icon="transformer-faults" path="/transformer-abnormality" label="ความผิดปกติของหม้อแปลง" />
        <SidebarItem icon="transformer-maintenance" path="/transformer-maintenance" label="ข้อมูลบำรุงรักษาหม้อแปลง" />
        <SidebarItem icon="age-assessment" path="/age-assessment" label="ค่าประเมินอายุ" />
        <SidebarItem icon="upload" path="/upload-data" label="Upload ข้อมูล" />
        <SidebarItem icon="transformer-importance" path="/transformer-importance" label="ความสำคัญหม้อแปลง" />
        <SidebarItem icon="economic-analysis" path="/economic-analysis" label="การวิเคราะห์ทางเศรษฐศาสตร์" />
        <SidebarItem icon="inventory" path="/inventory" label="Inventory Control" />
        <SidebarItem icon="management" path="/management" label="การจัดการ" />
      </div>

      <div className="mt-auto w-full">
        <div className="p-2">
          <SidebarItem icon="manual" path="/manual" label="คู่มือการใช้งาน" />
          <SidebarItem icon="history" path="/test-history" label="ประวัติการลงข้อมูลทดสอบฯ" />
          <SidebarItem icon="logout" path="/logout" label="ออกจากระบบ" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
