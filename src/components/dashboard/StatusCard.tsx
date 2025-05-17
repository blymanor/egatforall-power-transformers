
import React from "react";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  count: number;
  color: "green" | "yellow" | "red";
  icon?: React.ReactNode;
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, count, color, icon, className }) => {
  const getColorClasses = () => {
    switch (color) {
      case "green":
        return "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border-green-200 shadow-sm";
      case "yellow":
        return "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border-yellow-200 shadow-sm";
      case "red":
        return "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border-red-200 shadow-sm";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border-gray-200 shadow-sm";
    }
  };

  return (
    <div 
      className={cn(
        "rounded-lg border p-5 flex flex-col items-center justify-center transition-all hover:shadow-md",
        getColorClasses(),
        className
      )}
    >
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-lg font-medium">{title}</span>
      </div>
      <span className="text-3xl font-bold">{count}</span>
    </div>
  );
};

export default StatusCard;
