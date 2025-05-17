
import React, { useState, useEffect } from "react";
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
        collapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      <div className="flex items-center justify-between p-4 pt-6 pb-3 border-b border-gray-200">
        {!collapsed && (
          <div className="text-blue-700 font-bold text-2xl">EGATforALL</div>
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
        
        {/* Report section with submenus */}
        <SidebarItem 
          icon="report" 
          label="รายงาน" 
          collapsed={collapsed}
          subMenuItems={[
            { icon: "report", label: "รายงานมาตราฐาน" },
            { icon: "report", label: "รายงานข้อมูลหม้อแปลงไฟฟ้า" },
            { icon: "report", label: "รายงานข้อมูลความเสียหาย" }
          ]}
        />
        
        {/* Basic transformer info with submenus */}
        <SidebarItem
          icon="transformer-info"
          label="ข้อมูลพื้นฐานของหม้อแปลง"
          collapsed={collapsed}
          subMenuItems={[
            { icon: "transformer-info", label: "หม้อแปลงไฟฟ้า" },
            { icon: "transformer-info", label: "การย้ายหม้อแปลง" }
          ]}
        />
        
        {/* Transformer maintenance with submenus */}
        <SidebarItem
          icon="transformer-maintenance"
          label="ข้อมูลบำรุงรักษาหม้อแปลง" 
          collapsed={collapsed}
          subMenuItems={[
            { icon: "search", label: "ค้นหาข้อมูลบำรุงรักษาหม้อแปลง" },
            { icon: "visual-inspection", label: "Visual Inspection" },
            { icon: "oil-test", label: "ผลทดสอบทางน้ำมัน" },
            { icon: "electrical-test", label: "ผลทดสอบทางไฟฟ้า" },
            { icon: "transformer-maintenance", label: "บำรุงรักษา OLTC" },
            { icon: "report", label: "ดูข้อมูลผลการทดสอบทั้งหมด" },
            { icon: "search", label: "ตรวจสอบสภาพหม้อแปลงไฟฟ้า" }
          ]}
        />
        
        {/* Age assessment */}
        <SidebarItem
          icon="age-assessment"
          label="ค่าประเมินอายุ"
          collapsed={collapsed}
        />
        
        {/* Upload */}
        <SidebarItem
          icon="upload"
          label="Upload ข้อมูล"
          collapsed={collapsed}
        />
        
        {/* Transformer importance with submenus */}
        <SidebarItem
          icon="transformer-importance"
          label="ความสำคัญหม้อแปลง"
          collapsed={collapsed}
          subMenuItems={[
            { icon: "add-item", label: "เพิ่มรายการ" },
            { icon: "search", label: "ค้นหาและแก้ไข" }
          ]}
        />
        
        {/* Economic analysis with submenus */}
        <SidebarItem
          icon="economic-analysis"
          label="การวิเคราะห์ทางเศรษฐศาสตร์"
          collapsed={collapsed}
          subMenuItems={[
            { icon: "factor-setting", label: "Factor Setting" },
            { icon: "factor-setting", label: "ราคาและ Loss ของหม้อแปลง" },
            { icon: "factor-setting", label: "ข้อมูลที่จำเป็นในการพิจารณา" }
          ]}
        />
        
        {/* Inventory control with complex nested submenus */}
        <SidebarItem
          icon="inventory"
          label="Inventory Control"
          collapsed={collapsed}
          subMenuItems={[
            { 
              icon: "transformer-oil", 
              label: "น้ำมันหม้อแปลง",
              subMenuItems: [
                { icon: "oil-inventory", label: "คลังรายการน้ำมัน" },
                { icon: "withdrawal-records", label: "รายการเบิกจ่าย" },
                { icon: "purchase-records", label: "รายการสั่งซื้อ/รับน้ำมัน" },
                { icon: "expense-records", label: "รายการค่าใช้จ่าย" },
                { icon: "calculation-results", label: "ผลการคำนวณ" },
                { icon: "oil-receipt-time", label: "ระยะเวลาที่ได้รับน้ำมัน" }
              ]
            },
            { icon: "bushing-arrester", label: "Bushing, Arrester, OLTC" }
          ]}
        />
        
        {/* Management with complex nested submenus */}
        <SidebarItem
          icon="management"
          label="การจัดการ"
          collapsed={collapsed}
          subMenuItems={[
            { icon: "change-password", label: "เปลี่ยนรหัสผ่าน" },
            { icon: "user-management", label: "การจัดการผู้ใช้" },
            { icon: "basic-transformer-data", label: "กำหนดข้อมูลพื้นฐานหม้อแปลง" },
            { icon: "transformer-importance-data", label: "กำหนดข้อมูลความสำคัญหม้อแปลง" },
            { 
              icon: "test-data", 
              label: "กำหนดข้อมูลการทดสอบ",
              subMenuItems: [
                { icon: "vi-topics", label: "หัวข้อ Visual Inspection" },
                { icon: "vi-criteria", label: "เกณฑ์ Visual Inspection" },
                { icon: "hi-score", label: "คะแนน %HI" },
                { icon: "factor-score", label: "คะแนน %Factor" },
                { icon: "sub-component-weight", label: "Weight อุปกรณ์ย่อย" },
                { icon: "test-score-weight", label: "Score และ Weight การทดสอบ" },
                { icon: "main-component-weight", label: "Weight อุปกรณ์หลัก" }
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
