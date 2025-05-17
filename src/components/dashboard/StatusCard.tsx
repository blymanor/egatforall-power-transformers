
import React from "react";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  count: number;
  color: "green" | "yellow" | "red";
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, count, color, className }) => {
  const getColorClasses = () => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-800 border-green-200";
      case "yellow":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "red":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div 
      className={cn(
        "rounded-lg border p-4 flex flex-col items-center justify-center",
        getColorClasses(),
        className
      )}
    >
      <span className="text-lg font-medium">{title}</span>
      <span className="text-2xl font-bold">{count}</span>
    </div>
  );
};

export default StatusCard;
