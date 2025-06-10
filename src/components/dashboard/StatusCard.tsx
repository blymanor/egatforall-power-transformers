
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
        return "bg-gradient-to-br from-white via-blue-50 to-blue-100 border-2 border-blue-200 shadow-lg shadow-blue-100/50";
      case "yellow":
        return "bg-gradient-to-br from-white via-orange-50 to-orange-100 border-2 border-orange-200 shadow-lg shadow-orange-100/50";
      case "red":
        return "bg-gradient-to-br from-white via-red-50 to-red-100 border-2 border-red-200 shadow-lg shadow-red-100/50";
      default:
        return "bg-white border border-gray-200";
    }
  };

  const getIconColor = () => {
    switch (color) {
      case "green":
        return "text-blue-600 bg-blue-100";
      case "yellow":
        return "text-orange-600 bg-orange-100";
      case "red":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getTitleColor = () => {
    switch (color) {
      case "green":
        return "text-blue-800";
      case "yellow":
        return "text-orange-800";
      case "red":
        return "text-red-800";
      default:
        return "text-gray-800";
    }
  };

  const getCountColor = () => {
    switch (color) {
      case "green":
        return "text-blue-900";
      case "yellow":
        return "text-orange-900";
      case "red":
        return "text-red-900";
      default:
        return "text-gray-900";
    }
  };

  return (
    <div 
      className={cn(
        "rounded-2xl p-8 flex items-center gap-6 transition-all hover:shadow-xl group hover:scale-[1.02]",
        getColorClasses(),
        className
      )}
    >
      <div className={cn(
        "flex items-center justify-center p-4 rounded-xl transition-all group-hover:scale-110 shadow-sm", 
        getIconColor()
      )}>
        {React.cloneElement(icon as React.ReactElement, { className: "size-8" })}
      </div>
      <div className="flex flex-col space-y-2">
        <span className={cn("text-lg font-semibold", getTitleColor())}>{title}</span>
        <span className={cn("text-4xl font-bold tracking-tight", getCountColor())}>{count}</span>
      </div>
    </div>
  );
};

export default StatusCard;
