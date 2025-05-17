
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
        return "bg-gradient-to-br from-white to-blue-50 border border-blue-200 shadow-sm shadow-blue-100/50";
      case "yellow":
        return "bg-gradient-to-br from-white to-orange-50 border border-orange-200 shadow-sm shadow-orange-100/50";
      case "red":
        return "bg-gradient-to-br from-white to-red-50 border border-red-200 shadow-sm shadow-red-100/50";
      default:
        return "bg-white border border-gray-200";
    }
  };

  const getIconColor = () => {
    switch (color) {
      case "green":
        return "text-blue-600 bg-blue-100/50";
      case "yellow":
        return "text-orange-600 bg-orange-100/50"; // Changed to orange
      case "red":
        return "text-red-600 bg-red-100/50";
      default:
        return "text-gray-600 bg-gray-100/50";
    }
  };

  const getTitleColor = () => {
    switch (color) {
      case "green":
        return "text-gray-600";
      case "yellow":
        return "text-orange-700"; // Changed to orange
      case "red":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div 
      className={cn(
        "rounded-xl p-5 flex items-start gap-4 transition-all hover:shadow-md group",
        getColorClasses(),
        className
      )}
    >
      <div className={cn(
        "flex items-center justify-center p-3 rounded-lg transition-all group-hover:scale-110", 
        getIconColor()
      )}>
        {React.cloneElement(icon as React.ReactElement, { className: "size-7" })}
      </div>
      <div className="flex flex-col">
        <span className={cn("text-sm font-medium", getTitleColor())}>{title}</span>
        <span className="text-3xl font-bold">{count}</span>
      </div>
    </div>
  );
};

export default StatusCard;
