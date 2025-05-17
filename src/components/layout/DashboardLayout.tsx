
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
    <div className="flex h-screen w-full bg-[#f0f4fa]">
      <div className="fixed h-screen">
        <Sidebar />
      </div>
      <main className={cn("flex-1 overflow-auto p-0 ml-[280px]", className)}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
