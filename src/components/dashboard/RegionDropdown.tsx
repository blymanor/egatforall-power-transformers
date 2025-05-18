
import React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface RegionDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
}

const regions = [
  { value: "all", label: "ทั้งหมด" },
  { value: "north", label: "ภาคเหนือ" },
  { value: "northeast", label: "ภาคตะวันออกเฉียงเหนือ" },
  { value: "central", label: "ภาคกลาง" },
  { value: "south", label: "ภาคใต้" },
];

const RegionDropdown: React.FC<RegionDropdownProps> = ({ value, onValueChange }) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full h-10 border border-gray-300 rounded-md">
        <SelectValue placeholder="เลือกภาค" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {regions.map((region) => (
          <SelectItem key={region.value} value={region.value}>
            {region.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RegionDropdown;
