
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
        return "bg-white border-l-4 border-l-blue-600 text-gray-800";
      case "yellow":
        return "bg-white border-l-4 border-l-yellow-500 text-gray-800";
      case "red":
        return "bg-white border-l-4 border-l-red-500 text-gray-800";
      default:
        return "bg-white border-l-4 border-l-gray-500 text-gray-800";
    }
  };

  return (
    <div 
      className={cn(
        "rounded-lg border shadow-sm p-5 flex items-start gap-3 transition-all hover:shadow-md",
        getColorClasses(),
        className
      )}
    >
      <div className="flex items-center justify-center p-2 rounded-full bg-gray-50">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <span className="text-3xl font-bold">{count}</span>
      </div>
    </div>
  );
};

export default StatusCard;
