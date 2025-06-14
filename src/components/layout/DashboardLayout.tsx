
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
  pageTitle?: string;
  pageDescription?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  className,
  pageTitle,
  pageDescription
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Listen for sidebar collapsed state changes
  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setSidebarCollapsed(event.detail.collapsed);
    };

    window.addEventListener('sidebarStateChange' as any, handleSidebarChange);
    
    return () => {
      window.removeEventListener('sidebarStateChange' as any, handleSidebarChange);
    };
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#f0f4fa]">
      <div className="fixed h-screen z-50">
        <Sidebar onCollapsedChange={(collapsed) => setSidebarCollapsed(collapsed)} />
      </div>
      <main className={cn(
        "flex-1 overflow-auto p-0 transition-all duration-300", 
        sidebarCollapsed ? "ml-[80px]" : "ml-[320px]", 
        className
      )}>
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white px-8 py-6 shadow-sm sticky top-0 z-10 border-b border-gray-100">
          <div className="flex items-center space-x-6">
            <h1 className="text-4xl font-bold text-[#0442AF]">EGATforALL</h1>
            <div className="text-left">
              <p className="text-xl font-semibold text-[#0442AF]">Power Transformers</p>
              <p className="text-gray-500">ระบบหม้อแปลงไฟฟ้ากำลัง</p>
            </div>
          </div>
        </header>
        
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
