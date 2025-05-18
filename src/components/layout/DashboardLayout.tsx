
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
        {/* Always show the main app title header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-[#0442AF]">Power Transformers</h1>
            <p className="text-gray-500">ระบบหม้อแปลงไฟฟ้ากำลัง</p>
          </div>
        </header>
        
        {/* Only show the page-specific header if pageTitle or pageDescription is provided */}
        {(pageTitle || pageDescription) && (
          <div className="bg-[#f0f4fa] p-4 md:p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">{pageTitle}</h2>
              {pageDescription && <p className="text-gray-600">{pageDescription}</p>}
            </div>
          </div>
        )}
        
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
