
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  className 
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
        sidebarCollapsed ? "ml-[80px]" : "ml-[280px]",
        className
      )}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
