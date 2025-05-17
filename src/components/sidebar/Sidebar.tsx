
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 h-full transition-all duration-300 flex flex-col",
        collapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="text-blue-700 font-bold text-xl">EGATforALL</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn("ml-auto")}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <div className="overflow-y-auto flex-1 py-2">
        <SidebarItem icon="home" label="Home" active collapsed={collapsed} />
        <SidebarItem icon="report" label="รายงาน" collapsed={collapsed} />
        <SidebarItem
          icon="transformer-info"
          label="ข้อมูลพื้นฐานของหม้อแปลง"
          collapsed={collapsed}
        />
        <SidebarItem
          icon="transformer-faults"
          label="ความผิดปกติของหม้อแปลง" 
          collapsed={collapsed}
        />
        <SidebarItem
          icon="transformer-maintenance"
          label="ข้อมูลบำรุงรักษาหม้อแปลง"
          collapsed={collapsed}
        />
        <SidebarItem
          icon="age-assessment"
          label="ค่าประเมินอายุ"
          collapsed={collapsed}
        />
        <SidebarItem
          icon="upload"
          label="Upload ข้อมูล"
          collapsed={collapsed}
        />
        <SidebarItem
          icon="transformer-importance"
          label="ความสำคัญหม้อแปลง"
          collapsed={collapsed}
        />
        <SidebarItem
          icon="economic-analysis"
          label="การวิเคราะห์ทางเศรษฐศาสตร์"
          collapsed={collapsed}
        />
        <SidebarItem
          icon="inventory"
          label="Inventory Control"
          collapsed={collapsed}
        />
        <SidebarItem
          icon="management"
          label="การจัดการ"
          collapsed={collapsed}
        />
      </div>

      <div className="mt-auto border-t border-gray-200">
        <div className="p-2">
          <SidebarItem
            icon="manual"
            label="คู่มือการใช้งาน"
            collapsed={collapsed}
          />
          <SidebarItem
            icon="history" 
            label="ประวัติการลงข้อมูลผลทดสอบฯ" 
            collapsed={collapsed}
          />
          <SidebarItem icon="logout" label="ออกจากระบบ" collapsed={collapsed} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
