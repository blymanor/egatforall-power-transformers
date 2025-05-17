
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { Separator } from "@/components/ui/separator";

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
        <SidebarItem icon="home" path="/" label="Home" collapsed={collapsed} />
        
        <SidebarItem 
          icon="report" 
          path="/reports" 
          label="รายงาน" 
          collapsed={collapsed}
          subMenuItems={[
            { icon: "standard-report", label: "รายงานมาตรฐาน", path: "/reports/standard" },
            { icon: "transformer-report", label: "รายงานข้อมูลหม้อแปลงไฟฟ้า", path: "/reports/transformers" },
            { icon: "damages-report", label: "รายงานข้อมูลความเสียหาย", path: "/reports/damages" }
          ]}
        />
        
        <SidebarItem 
          icon="transformer-info" 
          path="/transformer-info" 
          label="ข้อมูลพื้นฐานของหม้อแปลง" 
          collapsed={collapsed}
          subMenuItems={[
            { icon: "transformer-details", label: "หม้อแปลงไฟฟ้า", path: "/transformer-info/details" },
            { icon: "transformer-relocation", label: "การย้ายหม้อแปลง", path: "/transformer-info/relocation" }
          ]}
        />
        
        <SidebarItem 
          icon="transformer-faults" 
          path="/transformer-abnormality" 
          label="ความผิดปกติของหม้อแปลง" 
          collapsed={collapsed}
        />
        
        <SidebarItem 
          icon="transformer-maintenance" 
          path="/transformer-maintenance" 
          label="ข้อมูลบำรุงรักษาหม้อแปลง" 
          collapsed={collapsed}
          subMenuItems={[
            { icon: "search", label: "ค้นหาและแก้ไข", path: "/transformer-maintenance/search" },
            { icon: "visual-inspection", label: "การทดสอบทางน้ำมัน", path: "/transformer-maintenance/visual-inspection" },
            { icon: "oil-test", label: "การทดสอบทางน้ำมัน", path: "/transformer-maintenance/oil-test" },
            { icon: "electrical-test", label: "การทดสอบทางไฟฟ้า", path: "/transformer-maintenance/electrical-test" },
            { icon: "oltc", label: "บำรุงรักษา OLTC", path: "/transformer-maintenance/oltc" },
            { icon: "all-test-results", label: "ผลการทดสอบทั้งหมด", path: "/transformer-maintenance/all-test-results" },
            { icon: "condition-check", label: "ตรวจสอบสภาพ", path: "/transformer-maintenance/condition-check" },
          ]}
        />
        
        <SidebarItem 
          icon="age-assessment" 
          path="/age-assessment" 
          label="ค่าประเมินอายุ" 
          collapsed={collapsed}
        />
        
        <SidebarItem 
          icon="upload" 
          path="/upload-data" 
          label="Upload ข้อมูล" 
          collapsed={collapsed}
          subMenuItems={[
            { icon: "oil-test", label: "การทดสอบทางน้ำมัน", path: "/upload-data/oil-test" },
            { icon: "electrical-test", label: "การทดสอบทางไฟฟ้า", path: "/upload-data/electrical-test" },
            { icon: "activate", label: "Activate ผลการทดสอบ", path: "/upload-data/activate" }
          ]}
        />
        
        <SidebarItem 
          icon="transformer-importance" 
          path="/transformer-importance" 
          label="ความสำคัญหม้อแปลง" 
          collapsed={collapsed}
          subMenuItems={[
            { icon: "add-item", label: "เพิ่มรายการ", path: "/transformer-importance/add" },
            { icon: "search", label: "ค้นหาและแก้ไข", path: "/transformer-importance/search" }
          ]}
        />
        
        <SidebarItem 
          icon="economic-analysis" 
          path="/economic-analysis" 
          label="การวิเคราะห์ทางเศรษฐศาสตร์" 
          collapsed={collapsed}
          subMenuItems={[
            { icon: "factor-setting", label: "Factor Setting", path: "/economic-analysis/factor-setting" },
            { icon: "factor-setting", label: "ราคาและ Loss ของหม้อแปลง", path: "/economic-analysis/price-loss" },
            { icon: "consideration-data", label: "ข้อมูลที่จำเป็นในการพิจารณา", path: "/economic-analysis/consideration-data" }
          ]}
        />
        
        <SidebarItem 
          icon="inventory" 
          path="/inventory" 
          label="Inventory Control" 
          collapsed={collapsed}
          subMenuItems={[
            { 
              icon: "transformer-oil", 
              label: "น้ำมันหม้อแปลง", 
              path: "/inventory/oil",
              subMenuItems: [
                { icon: "oil-inventory", label: "คลังรายการน้ำมัน", path: "/inventory/oil/stock" },
                { icon: "withdrawal-records", label: "รายการเบิกจ่าย", path: "/inventory/oil/withdrawal" },
                { icon: "purchase-records", label: "รายการสั่งซื้อ/รับน้ำมัน", path: "/inventory/oil/purchase" },
                { icon: "expense-records", label: "รายการค่าใช้จ่าย", path: "/inventory/oil/expense" },
                { icon: "calculation-results", label: "ผลการคำนวณ", path: "/inventory/oil/calculation" },
                { icon: "oil-receipt-time", label: "ระยะเวลาที่ได้รับน้ำมัน", path: "/inventory/oil/receipt-time" }
              ]
            },
            { icon: "bushing-arrester", label: "Bushing, Arrester, OLTC", path: "/inventory/components" }
          ]}
        />
        
        <SidebarItem 
          icon="management" 
          path="/management" 
          label="การจัดการ" 
          collapsed={collapsed}
          subMenuItems={[
            { icon: "change-password", label: "เปลี่ยนรหัสผ่าน", path: "/management/change-password" },
            { icon: "user-management", label: "การจัดการผู้ใช้", path: "/management/users" },
            { icon: "basic-transformer-data", label: "กำหนดข้อมูลพื้นฐานหม้อแปลง", path: "/management/basic-transformer-data" },
            { icon: "transformer-importance-data", label: "กำหนดข้อมูลความสำคัญหม้อแปลง", path: "/management/transformer-importance-data" },
            { 
              icon: "test-data", 
              label: "กำหนดข้อมูลการทดสอบ", 
              path: "/management/test-data",
              subMenuItems: [
                { icon: "vi-topics", label: "หัวข้อ Visual Inspection", path: "/management/test-data/vi-topics" },
                { icon: "vi-criteria", label: "เกณฑ์ Visual Inspection", path: "/management/test-data/vi-criteria" },
                { icon: "hi-score", label: "คะแนน %HI", path: "/management/test-data/hi-score" },
                { icon: "factor-score", label: "คะแนน %Factor", path: "/management/test-data/factor-score" },
                { icon: "sub-component-weight", label: "Weight อุปกรณ์ย่อย", path: "/management/test-data/sub-component-weight" },
                { icon: "test-score-weight", label: "Score และ Weight การทดสอบ", path: "/management/test-data/test-score-weight" },
                { icon: "main-component-weight", label: "Weight อุปกรณ์หลัก", path: "/management/test-data/main-component-weight" }
              ]
            }
          ]}
        />
      </div>

      <div className="mt-auto w-full">
        <Separator className="bg-gray-200 h-[1px] my-2" />
        <div className="p-2">
          <SidebarItem icon="manual" path="/manual" label="คู่มือการใช้งาน" collapsed={collapsed} />
          <SidebarItem icon="history" path="/test-history" label="ประวัติการลงข้อมูลทดสอบฯ" collapsed={collapsed} />
          <SidebarItem icon="logout" path="/logout" label="ออกจากระบบ" collapsed={collapsed} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
