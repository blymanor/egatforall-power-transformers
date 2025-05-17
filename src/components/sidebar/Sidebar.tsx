
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
          <div className="text-blue-700 font-bold text-2xl">EGATforALL</div>
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
      
      <div className="border-t border-gray-200 mb-4 w-full"></div>

      <div className="overflow-y-auto flex-1 py-4">
        <SidebarItem icon="home" label="Home" path="/" collapsed={collapsed} />
        
        {/* Report section with submenus */}
        <SidebarItem 
          icon="report" 
          label="รายงาน" 
          path="/reports"
          collapsed={collapsed}
          subMenuItems={[
            { icon: "report", label: "รายงานมาตราฐาน", path: "/reports/standard" },
            { icon: "report", label: "รายงานข้อมูลหม้อแปลงไฟฟ้า", path: "/reports/transformers" },
            { icon: "report", label: "รายงานข้อมูลความเสียหาย", path: "/reports/damages" }
          ]}
        />
        
        {/* Basic transformer info with submenus */}
        <SidebarItem
          icon="transformer-info"
          label="ข้อมูลพื้นฐานของหม้อแปลง"
          path="/transformer-info"
          collapsed={collapsed}
          subMenuItems={[
            { icon: "transformer-info", label: "หม้อแปลงไฟฟ้า", path: "/transformer-info/details" },
            { icon: "transformer-info", label: "การย้ายหม้อแปลง", path: "/transformer-info/relocation" }
          ]}
        />
        
        {/* Transformer Abnormality */}
        <SidebarItem
          icon="transformer-faults"
          label="ความผิดปกติของหม้อแปลง"
          path="/transformer-abnormality"
          collapsed={collapsed}
        />
        
        {/* Transformer maintenance with submenus */}
        <SidebarItem
          icon="transformer-maintenance"
          label="ข้อมูลบำรุงรักษาหม้อแปลง" 
          path="/transformer-maintenance"
          collapsed={collapsed}
          subMenuItems={[
            { icon: "search", label: "ค้นหาข้อมูลบำรุงรักษาหม้อแปลง", path: "/transformer-maintenance/search" },
            { icon: "visual-inspection", label: "Visual Inspection", path: "/transformer-maintenance/visual-inspection" },
            { icon: "oil-test", label: "ผลทดสอบทางน้ำมัน", path: "/transformer-maintenance/oil-test" },
            { icon: "electrical-test", label: "ผลทดสอบทางไฟฟ้า", path: "/transformer-maintenance/electrical-test" },
            { icon: "transformer-maintenance", label: "บำรุงรักษา OLTC", path: "/transformer-maintenance/oltc" },
            { icon: "report", label: "ดูข้อมูลผลการทดสอบทั้งหมด", path: "/transformer-maintenance/all-test-results" },
            { icon: "search", label: "ตรวจสอบสภาพหม้อแปลงไฟฟ้า", path: "/transformer-maintenance/condition-check" }
          ]}
        />
        
        {/* Age assessment */}
        <SidebarItem
          icon="age-assessment"
          label="ค่าประเมินอายุ"
          path="/age-assessment"
          collapsed={collapsed}
        />
        
        {/* Upload with new submenus */}
        <SidebarItem
          icon="upload"
          label="Upload ข้อมูล"
          path="/upload-data"
          collapsed={collapsed}
          subMenuItems={[
            { icon: "oil-test", label: "การทดสอบทางน้ำมัน", path: "/upload-data/oil-test" },
            { icon: "electrical-test", label: "การทดสอบทางไฟฟ้า", path: "/upload-data/electrical-test" },
            { icon: "factor-setting", label: "Activate ผลการทดสอบ", path: "/upload-data/activate" }
          ]}
        />
        
        {/* Transformer importance with submenus */}
        <SidebarItem
          icon="transformer-importance"
          label="ความสำคัญหม้อแปลง"
          path="/transformer-importance"
          collapsed={collapsed}
          subMenuItems={[
            { icon: "add-item", label: "เพิ่มรายการ", path: "/transformer-importance/add" },
            { icon: "search", label: "ค้นหาและแก้ไข", path: "/transformer-importance/search" }
          ]}
        />
        
        {/* Economic analysis with submenus */}
        <SidebarItem
          icon="economic-analysis"
          label="การวิเคราะห์ทางเศรษฐศาสตร์"
          path="/economic-analysis"
          collapsed={collapsed}
          subMenuItems={[
            { icon: "factor-setting", label: "Factor Setting", path: "/economic-analysis/factor-setting" },
            { icon: "factor-setting", label: "ราคาและ Loss ของหม้อแปลง", path: "/economic-analysis/price-loss" },
            { icon: "factor-setting", label: "ข้อมูลที่จำเป็นในการพิจารณา", path: "/economic-analysis/required-data" }
          ]}
        />
        
        {/* Inventory control with complex nested submenus */}
        <SidebarItem
          icon="inventory"
          label="Inventory Control"
          path="/inventory"
          collapsed={collapsed}
          subMenuItems={[
            { 
              icon: "transformer-oil", 
              label: "น้ำมันหม้อแปลง",
              path: "/inventory/oil",
              subMenuItems: [
                { icon: "oil-inventory", label: "คลังรายการน้ำมัน", path: "/inventory/oil/stock" },
                { icon: "withdrawal-records", label: "รายการเบิกจ่าย", path: "/inventory/oil/withdrawals" },
                { icon: "purchase-records", label: "รายการสั่งซื้อ/รับน้ำมัน", path: "/inventory/oil/purchases" },
                { icon: "expense-records", label: "รายการค่าใช้จ่าย", path: "/inventory/oil/expenses" },
                { icon: "calculation-results", label: "ผลการคำนวณ", path: "/inventory/oil/calculations" },
                { icon: "oil-receipt-time", label: "ระยะเวลาที่ได้รับน้ำมัน", path: "/inventory/oil/receipt-time" }
              ]
            },
            { icon: "bushing-arrester", label: "Bushing, Arrester, OLTC", path: "/inventory/components" }
          ]}
        />
        
        {/* Management with complex nested submenus */}
        <SidebarItem
          icon="management"
          label="การจัดการ"
          path="/management"
          collapsed={collapsed}
          subMenuItems={[
            { icon: "change-password", label: "เปลี่ยนรหัสผ่าน", path: "/management/change-password" },
            { icon: "user-management", label: "การจัดการผู้ใช้", path: "/management/users" },
            { icon: "basic-transformer-data", label: "กำหนดข้อมูลพื้นฐานหม้อแปลง", path: "/management/basic-transformer" },
            { icon: "transformer-importance-data", label: "กำหนดข้อมูลความสำคัญหม้อแปลง", path: "/management/importance-data" },
            { 
              icon: "test-data", 
              label: "กำหนดข้อมูลการทดสอบ",
              path: "/management/test-data",
              subMenuItems: [
                { icon: "vi-topics", label: "หัวข้อ Visual Inspection", path: "/management/test-data/vi-topics" },
                { icon: "vi-criteria", label: "เกณฑ์ Visual Inspection", path: "/management/test-data/vi-criteria" },
                { icon: "hi-score", label: "คะแนน %HI", path: "/management/test-data/hi-score" },
                { icon: "factor-score", label: "คะแนน %Factor", path: "/management/test-data/factor-score" },
                { icon: "sub-component-weight", label: "Weight อุปกรณ์ย่อย", path: "/management/test-data/subcomponent-weight" },
                { icon: "test-score-weight", label: "Score และ Weight การทดสอบ", path: "/management/test-data/test-score-weight" },
                { icon: "main-component-weight", label: "Weight อุปกรณ์หลัก", path: "/management/test-data/main-component-weight" }
              ]
            }
          ]}
        />
      </div>

      <div className="mt-auto border-t border-gray-200 w-full">
        <div className="p-2">
          <SidebarItem
            icon="manual"
            label="คู่มือการใช้งาน"
            path="/manual"
            collapsed={collapsed}
          />
          <SidebarItem
            icon="history" 
            label="ประวัติการลงข้อมูลผลทดสอบฯ" 
            path="/test-history"
            collapsed={collapsed}
          />
          <SidebarItem icon="logout" label="ออกจากระบบ" path="/logout" collapsed={collapsed} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
