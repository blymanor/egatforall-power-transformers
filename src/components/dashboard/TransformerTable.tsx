
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FilterDropdown from "./FilterDropdown";
import { cn } from "@/lib/utils";

interface TransformerData {
  deviceNo: string;
  equipmentNo: string;
  condition: number;
  importance: number;
  risk: string;
  action: "Investigation" | "Completed" | "Relocate" | "Repair" | "Refurbish";
}

const dummyData: TransformerData[] = [
  { deviceNo: "АN-472A", equipmentNo: "TGPOS68020", condition: 80.23, importance: 34.36, risk: "Moderate", action: "Investigation" },
  { deviceNo: "АN-472B", equipmentNo: "TGPOS68021", condition: 75.50, importance: 45.12, risk: "Moderate", action: "Completed" },
  { deviceNo: "АN-473A", equipmentNo: "TGPOS68022", condition: 60.75, importance: 55.90, risk: "High", action: "Repair" },
  { deviceNo: "АN-474A", equipmentNo: "TGPOS68023", condition: 90.10, importance: 25.45, risk: "Low", action: "Relocate" },
  { deviceNo: "АN-475A", equipmentNo: "TGPOS68024", condition: 45.33, importance: 67.21, risk: "High", action: "Refurbish" },
];

const getActionBadgeColor = (action: string) => {
  switch(action) {
    case "Investigation": return "bg-blue-100 text-blue-800 border-blue-300";
    case "Completed": return "bg-green-100 text-green-800 border-green-300";
    case "Relocate": return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "Repair": return "bg-orange-100 text-orange-800 border-orange-300";
    case "Refurbish": return "bg-purple-100 text-purple-800 border-purple-300";
    default: return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

interface TransformerTableProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

const TransformerTable: React.FC<TransformerTableProps> = ({ statusFilter, setStatusFilter }) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <Card className="bg-white shadow-md border border-gray-100">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-[#1E5CFF]">Transformer Importance</CardTitle>
        <FilterDropdown 
          value={statusFilter} 
          onValueChange={setStatusFilter} 
          variant="colorful" 
          placeholder="กรองตามสถานะ"
        />
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-gradient-to-r from-blue-50 to-white">
            <TableRow>
              <TableHead className="w-[100px] text-center">Device No.</TableHead>
              <TableHead className="w-[120px] text-center">Equipment No.</TableHead>
              <TableHead className="w-[120px] text-center">Overall Condition(%)</TableHead>
              <TableHead className="w-[120px] text-center">Importance Index(%)</TableHead>
              <TableHead className="text-center">Risk</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyData.map((row, index) => (
              <TableRow key={index} className="hover:bg-blue-50/30">
                <TableCell className="text-center">{row.deviceNo}</TableCell>
                <TableCell className="text-center">{row.equipmentNo}</TableCell>
                <TableCell className="text-center">{row.condition}</TableCell>
                <TableCell className="text-center">{row.importance}</TableCell>
                <TableCell className="text-center">{row.risk}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-2 border-t">
        <Button variant="outline" size="sm" disabled>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map((page) => (
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
          ))}
        </div>
        <Button variant="outline" size="sm">
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransformerTable;
