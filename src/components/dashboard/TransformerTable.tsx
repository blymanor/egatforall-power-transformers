
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
  status: "Good" | "Repair" | "Faulty";
  action: "Investigation" | "Relocate" | "Refurbish";
}

const dummyData: TransformerData[] = [
  { deviceNo: "АN-472A", equipmentNo: "TGPOS68020", condition: 80.23, importance: 34.36, risk: "Moderate", status: "Good", action: "Investigation" },
  { deviceNo: "АN-472B", equipmentNo: "TGPOS68021", condition: 75.50, importance: 45.12, risk: "Moderate", status: "Good", action: "Investigation" },
  { deviceNo: "АN-473A", equipmentNo: "TGPOS68022", condition: 60.75, importance: 55.90, risk: "High", status: "Repair", action: "Refurbish" },
  { deviceNo: "АN-474A", equipmentNo: "TGPOS68023", condition: 90.10, importance: 25.45, risk: "Low", status: "Good", action: "Relocate" },
  { deviceNo: "АN-475A", equipmentNo: "TGPOS68024", condition: 45.33, importance: 67.21, risk: "High", status: "Faulty", action: "Refurbish" },
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
}

const TransformerTable: React.FC<TransformerTableProps> = ({ statusFilter, setStatusFilter }) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const filteredData = React.useMemo(() => {
    if (statusFilter === "all") return dummyData;
    return dummyData.filter(item => {
      if (statusFilter === "good") return item.status === "Good";
      if (statusFilter === "repair") return item.status === "Repair";
      if (statusFilter === "damaged") return item.status === "Faulty";
      return true;
    });
  }, [statusFilter]);

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
                <TableHead className="w-[180px] text-center whitespace-nowrap px-6">Equipment No.</TableHead>
                <TableHead className="w-[180px] text-center whitespace-nowrap px-6">Overall Condition(%)</TableHead>
                <TableHead className="w-[180px] text-center whitespace-nowrap px-6">Importance Index(%)</TableHead>
                <TableHead className="text-center">Risk</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row, index) => (
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
              ))}
            </TableBody>
          </Table>
        </div>
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
