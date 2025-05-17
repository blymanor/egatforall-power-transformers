
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterX } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  variant?: "default" | "colorful";
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  value,
  onValueChange,
  className,
  variant = "default",
}) => {
  return (
    <div className={className}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger 
          className={cn(
            "w-[180px] border-2 transition-all duration-200",
            variant === "default" 
              ? "border-gray-200 hover:border-gray-300" 
              : "border-[#1E5CFF] bg-gradient-to-r from-blue-50 to-white text-[#1E5CFF] font-medium hover:shadow-md"
          )}
        >
          <div className="flex items-center">
            <FilterX className="mr-2 h-4 w-4" />
            <SelectValue placeholder="สถานะหม้อแปลง" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white border border-[#1E5CFF]/20 shadow-lg">
          <SelectItem value="all" className="hover:bg-blue-50 hover:text-[#1E5CFF] focus:bg-blue-50 focus:text-[#1E5CFF]">ทั้งหมด</SelectItem>
          <SelectItem value="good" className="hover:bg-blue-50 hover:text-[#1E5CFF] focus:bg-blue-50 focus:text-[#1E5CFF]">สภาพดี</SelectItem>
          <SelectItem value="repair" className="hover:bg-blue-50 hover:text-[#1E5CFF] focus:bg-blue-50 focus:text-[#1E5CFF]">ต้องซ่อม</SelectItem>
          <SelectItem value="damaged" className="hover:bg-blue-50 hover:text-[#1E5CFF] focus:bg-blue-50 focus:text-[#1E5CFF]">ชำรุด</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterDropdown;
