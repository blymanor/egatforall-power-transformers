
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

interface RegionDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
}

const RegionDropdown: React.FC<RegionDropdownProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger 
        className="w-[180px] border-2 border-[#1E5CFF] bg-gradient-to-r from-blue-50 to-white text-[#1E5CFF] font-medium hover:shadow-md transition-all duration-200"
      >
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          <SelectValue placeholder="เลือกเขตพื้นที่" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-white border border-[#1E5CFF]/20 shadow-lg">
        <SelectItem value="all" className="hover:bg-blue-50 hover:text-[#1E5CFF] focus:bg-blue-50 focus:text-[#1E5CFF]">ทั้งหมด</SelectItem>
        <SelectItem value="north" className="hover:bg-blue-50 hover:text-[#1E5CFF] focus:bg-blue-50 focus:text-[#1E5CFF]">เขตภาคเหนือ</SelectItem>
        <SelectItem value="northeast" className="hover:bg-blue-50 hover:text-[#1E5CFF] focus:bg-blue-50 focus:text-[#1E5CFF]">เขตภาคตะวันออกเฉียงเหนือ</SelectItem>
        <SelectItem value="central" className="hover:bg-blue-50 hover:text-[#1E5CFF] focus:bg-blue-50 focus:text-[#1E5CFF]">เขตภาคกลาง</SelectItem>
        <SelectItem value="south" className="hover:bg-blue-50 hover:text-[#1E5CFF] focus:bg-blue-50 focus:text-[#1E5CFF]">เขตภาคใต้</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default RegionDropdown;
