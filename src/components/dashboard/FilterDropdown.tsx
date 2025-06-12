
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface FilterDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  variant?: "default" | "colorful";
  placeholder?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  value,
  onValueChange,
  className,
  variant = "default",
  placeholder = "สถานะหม้อแปลง",
}) => {
  // This component now only handles the UI for the dropdown
  // and passes the selected value to the parent component through onValueChange
  const handleChange = (newValue: string) => {
    onValueChange(newValue);
  };

  return (
    <div className={className}>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger 
          className={cn(
            "w-[180px] border-2 transition-all duration-200 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none",
            variant === "default" 
              ? "border-gray-200 hover:border-gray-300" 
              : "border-[#1E5CFF] bg-gradient-to-r from-blue-50 to-white text-[#1E5CFF] font-medium hover:shadow-md"
          )}
        >
          <div className="flex items-center">
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white border border-[#1E5CFF]/20 shadow-lg">
          <SelectItem value="all" className="hover:bg-blue-50 hover:text-[#1E5CFF] focus:bg-blue-50 focus:text-[#1E5CFF] focus-visible:outline-none">ทั้งหมด</SelectItem>
          <SelectItem value="good" className="hover:bg-blue-50 hover:text-[#1E5CFF] focus:bg-blue-50 focus:text-[#1E5CFF] focus-visible:outline-none">Good</SelectItem>
          <SelectItem value="repair" className="hover:bg-blue-50 hover:text-[#1E5CFF] focus:bg-blue-50 focus:text-[#1E5CFF] focus-visible:outline-none">Repair</SelectItem>
          <SelectItem value="damaged" className="hover:bg-blue-50 hover:text-[#1E5CFF] focus:bg-blue-50 focus:text-[#1E5CFF] focus-visible:outline-none">Faulty</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterDropdown;
