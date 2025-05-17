
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface TransformerData {
  deviceNo: string;
  equipmentNo: string;
  condition: number;
  importance: number;
  risk: string;
  action: string;
}

const dummyData: TransformerData[] = [
  { deviceNo: "АN-472A", equipmentNo: "TGPOS68020", condition: 80.23, importance: 34.36, risk: "Moderate", action: "Investigation" },
  { deviceNo: "АN-472A", equipmentNo: "TGPOS68020", condition: 80.23, importance: 34.35, risk: "Moderate", action: "Investigation" },
  { deviceNo: "АN-472A", equipmentNo: "TGPOS68020", condition: 80.23, importance: 34.35, risk: "Moderate", action: "Investigation" },
  { deviceNo: "АN-472A", equipmentNo: "TGPOS68020", condition: 80.23, importance: 34.35, risk: "Moderate", action: "Investigation" },
  { deviceNo: "АN-472A", equipmentNo: "TGPOS68020", condition: 80.23, importance: 34.35, risk: "Moderate", action: "Investigation" },
];

const TransformerTable: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Transformer Importance</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Device No.</TableHead>
              <TableHead className="w-[120px]">Equipment No.</TableHead>
              <TableHead className="w-[120px] text-right">Overall Condition(%)</TableHead>
              <TableHead className="w-[120px] text-right">Importance Index(%)</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.deviceNo}</TableCell>
                <TableCell>{row.equipmentNo}</TableCell>
                <TableCell className="text-right">{row.condition}</TableCell>
                <TableCell className="text-right">{row.importance}</TableCell>
                <TableCell>{row.risk}</TableCell>
                <TableCell>{row.action}</TableCell>
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
              variant={page === 1 ? "default" : "outline"} 
              size="sm" 
              className="w-8 h-8 p-0"
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
