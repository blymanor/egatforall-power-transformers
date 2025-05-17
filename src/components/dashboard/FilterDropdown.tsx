
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

interface FilterDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  value,
  onValueChange,
  className,
}) => {
  return (
    <div className={className}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="สถานะหม้อแปลง" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">ทั้งหมด</SelectItem>
          <SelectItem value="good">สภาพดี</SelectItem>
          <SelectItem value="repair">ต้องซ่อม</SelectItem>
          <SelectItem value="damaged">ชำรุด</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterDropdown;
