
import React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface RegionDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
}

const regions = [
  { value: "all", label: "All Regions" },
  { value: "north", label: "North" },
  { value: "northeast", label: "Northeast" },
  { value: "central", label: "Central" },
  { value: "south", label: "South" },
];

const RegionDropdown: React.FC<RegionDropdownProps> = ({ value, onValueChange }) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full h-10 border border-gray-300 rounded-md">
        <SelectValue placeholder="Select Region" />
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
