
import React, { useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FilterDropdown from "./FilterDropdown";
import { cn } from "@/lib/utils";

interface TransformerData {
  deviceNo: string;
  equipmentNo: string;
  transformerType: string;  // We'll keep this in the data structure but won't display it
  condition: number;
  importance: number;
  risk: string;
  status: "Good" | "Repair" | "Faulty";
  action: "Investigation" | "Relocate" | "Refurbish";
  region: string;
}

// Extended dataset with more transformers to ensure at least 6 per region
const allTransformers: TransformerData[] = [
  // Original data with transformer type added
  { deviceNo: "АN-472A", equipmentNo: "TGPOS68020", transformerType: "Power", condition: 80.23, importance: 34.36, risk: "Moderate", status: "Good", action: "Investigation", region: "north" },
  { deviceNo: "АN-472B", equipmentNo: "TGPOS68021", transformerType: "Power", condition: 75.50, importance: 45.12, risk: "Moderate", status: "Good", action: "Investigation", region: "north" },
  { deviceNo: "АN-473A", equipmentNo: "TGPOS68022", transformerType: "Distribution", condition: 60.75, importance: 55.90, risk: "High", status: "Repair", action: "Refurbish", region: "northeast" },
  { deviceNo: "АN-474A", equipmentNo: "TGPOS68023", transformerType: "Power", condition: 90.10, importance: 25.45, risk: "Low", status: "Good", action: "Relocate", region: "central" },
  { deviceNo: "АN-475A", equipmentNo: "TGPOS68024", transformerType: "Power", condition: 45.33, importance: 67.21, risk: "High", status: "Faulty", action: "Refurbish", region: "south" },
  { deviceNo: "АN-476A", equipmentNo: "TGPOS68025", transformerType: "Distribution", condition: 78.42, importance: 31.89, risk: "Low", status: "Good", action: "Investigation", region: "south" },
  { deviceNo: "АN-477A", equipmentNo: "TGPOS68026", transformerType: "Power", condition: 55.67, importance: 58.75, risk: "High", status: "Repair", action: "Refurbish", region: "northeast" },
  { deviceNo: "АN-478A", equipmentNo: "TGPOS68027", transformerType: "Power", condition: 82.29, importance: 42.13, risk: "Moderate", status: "Good", action: "Investigation", region: "central" },
  // Additional data for north region with transformer type
  { deviceNo: "АN-479A", equipmentNo: "TGPOS68028", transformerType: "Power", condition: 81.15, importance: 38.45, risk: "Low", status: "Good", action: "Investigation", region: "north" },
  { deviceNo: "АN-480A", equipmentNo: "TGPOS68029", transformerType: "Distribution", condition: 65.78, importance: 52.33, risk: "Moderate", status: "Repair", action: "Refurbish", region: "north" },
  { deviceNo: "АN-481A", equipmentNo: "TGPOS68030", transformerType: "Power", condition: 42.56, importance: 71.22, risk: "High", status: "Faulty", action: "Refurbish", region: "north" },
  { deviceNo: "АN-482A", equipmentNo: "TGPOS68031", transformerType: "Distribution", condition: 77.89, importance: 41.67, risk: "Low", status: "Good", action: "Investigation", region: "north" },
  // Additional data for northeast region with transformer type
  { deviceNo: "АN-483A", equipmentNo: "TGPOS68032", transformerType: "Power", condition: 71.34, importance: 49.78, risk: "Moderate", status: "Good", action: "Investigation", region: "northeast" },
  { deviceNo: "АN-484A", equipmentNo: "TGPOS68033", transformerType: "Power", condition: 58.21, importance: 63.42, risk: "High", status: "Repair", action: "Refurbish", region: "northeast" },
  { deviceNo: "АN-485A", equipmentNo: "TGPOS68034", transformerType: "Distribution", condition: 41.67, importance: 76.91, risk: "High", status: "Faulty", action: "Refurbish", region: "northeast" },
  { deviceNo: "АN-486A", equipmentNo: "TGPOS68035", transformerType: "Power", condition: 81.45, importance: 32.56, risk: "Low", status: "Good", action: "Relocate", region: "northeast" },
  // Additional data for central region with transformer type
  { deviceNo: "АN-487A", equipmentNo: "TGPOS68036", transformerType: "Distribution", condition: 76.23, importance: 47.89, risk: "Moderate", status: "Good", action: "Investigation", region: "central" },
  { deviceNo: "АN-488A", equipmentNo: "TGPOS68037", transformerType: "Power", condition: 59.78, importance: 62.33, risk: "High", status: "Repair", action: "Refurbish", region: "central" },
  { deviceNo: "АN-489A", equipmentNo: "TGPOS68038", transformerType: "Distribution", condition: 44.56, importance: 73.21, risk: "High", status: "Faulty", action: "Refurbish", region: "central" },
  { deviceNo: "АN-490A", equipmentNo: "TGPOS68039", transformerType: "Power", condition: 84.67, importance: 29.45, risk: "Low", status: "Good", action: "Investigation", region: "central" },
  // Additional data for south region with transformer type
  { deviceNo: "АN-491A", equipmentNo: "TGPOS68040", transformerType: "Power", condition: 72.89, importance: 48.76, risk: "Moderate", status: "Good", action: "Investigation", region: "south" },
  { deviceNo: "АN-492A", equipmentNo: "TGPOS68041", transformerType: "Distribution", condition: 56.45, importance: 64.33, risk: "High", status: "Repair", action: "Refurbish", region: "south" },
  { deviceNo: "АN-493A", equipmentNo: "TGPOS68042", transformerType: "Power", condition: 40.21, importance: 78.67, risk: "High", status: "Faulty", action: "Refurbish", region: "south" },
  { deviceNo: "АN-494A", equipmentNo: "TGPOS68043", transformerType: "Distribution", condition: 85.56, importance: 28.91, risk: "Low", status: "Good", action: "Relocate", region: "south" },
];

const getActionBadgeColor = (action: string) => {
  switch(action) {
    case "Investigation": return "bg-blue-100 text-blue-800 border-blue-300";
    case "Relocate": return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "Refurbish": return "bg-purple-100 text-purple-800 border-purple-300";
    default: return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const getStatusBadgeColor = (status: string) => {
  switch(status) {
    case "Good": return "bg-green-100 text-green-800 border-green-300";
    case "Repair": return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "Faulty": return "bg-red-100 text-red-800 border-red-300";
    default: return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

interface TransformerTableProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  selectedRegion: string;
}

const TransformerTable: React.FC<TransformerTableProps> = ({ 
  statusFilter, 
  setStatusFilter,
  selectedRegion 
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;

  const filteredData = useMemo(() => {
    let data = [...allTransformers];
    
    // Filter by region
    if (selectedRegion !== "all") {
      data = data.filter(item => item.region === selectedRegion);
    }
    
    // Filter by status
    if (statusFilter !== "all") {
      data = data.filter(item => {
        if (statusFilter === "good") return item.status === "Good";
        if (statusFilter === "repair") return item.status === "Repair";
        if (statusFilter === "damaged") return item.status === "Faulty";
        return true;
      });
    }

    return data;
  }, [statusFilter, selectedRegion]);

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Ensure we have at least 6 items to display
  const displayData = currentData.length < 6 && filteredData.length >= 6 
    ? filteredData.slice(0, 6) 
    : currentData;

  return (
    <Card className="bg-white shadow-md border border-gray-100">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-black">Transformer Importance</CardTitle>
        <FilterDropdown 
          value={statusFilter} 
          onValueChange={setStatusFilter} 
          variant="colorful" 
          placeholder="Filter by Status"
        />
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gradient-to-r from-blue-50 to-white">
              <TableRow>
                <TableHead className="w-[150px] text-center whitespace-nowrap px-6">Device No.</TableHead>
                {/* Removed the หม้อแปลงไฟฟ้า column */}
                <TableHead className="w-[180px] text-center whitespace-nowrap px-6">Equipment No.</TableHead>
                <TableHead className="w-[180px] text-center whitespace-nowrap px-6">Overall Condition(%)</TableHead>
                <TableHead className="w-[180px] text-center whitespace-nowrap px-6">Importance Index(%)</TableHead>
                <TableHead className="text-center">Risk</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.length > 0 ? (
                displayData.map((row, index) => (
                  <TableRow key={index} className="hover:bg-blue-50/30">
                    <TableCell className="text-center">{row.deviceNo}</TableCell>
                    {/* Removed the transformerType cell */}
                    <TableCell className="text-center">{row.equipmentNo}</TableCell>
                    <TableCell className="text-center">{row.condition}</TableCell>
                    <TableCell className="text-center">{row.importance}</TableCell>
                    <TableCell className="text-center">{row.risk}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium border",
                          getStatusBadgeColor(row.status)
                        )}>
                          {row.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium border",
                          getActionBadgeColor(row.action)
                        )}>
                          {row.action}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No transformers found for the selected filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-2 border-t">
        <Button 
          variant="outline" 
          size="sm" 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(4, totalPages) }).map((_, idx) => {
            const page = idx + 1;
            return (
              <Button 
                key={page} 
                variant={page === currentPage ? "default" : "outline"} 
                size="sm" 
                className={cn(
                  "w-8 h-8 p-0",
                  page === currentPage && "bg-[#1E5CFF] hover:bg-[#1E5CFF]/90"
                )}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            );
          })}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          disabled={currentPage === totalPages || displayData.length === 0}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransformerTable;
