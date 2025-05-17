
import React from "react";
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
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100">
      <Sidebar />
      <main className={cn("flex-1 overflow-auto p-4 md:p-6", className)}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
