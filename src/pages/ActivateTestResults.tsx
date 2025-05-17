
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle } from "lucide-react";

// Mock data for demonstration
const testResults = [
  { id: 1, type: "Oil Quality", date: "2025-04-12", status: "Pending" },
  { id: 2, type: "DGA", date: "2025-04-10", status: "Pending" },
  { id: 3, type: "Insulation Resistance", date: "2025-04-08", status: "Pending" },
  { id: 4, type: "Winding Resistance", date: "2025-04-05", status: "Pending" },
  { id: 5, type: "Power Factor", date: "2025-04-03", status: "Pending" }
];

const ActivateTestResults = () => {
  const [transformer, setTransformer] = useState("");
  const [selectedTests, setSelectedTests] = useState<number[]>([]);
  const { toast } = useToast();

  const handleTestSelect = (testId: number) => {
    setSelectedTests(current => 
      current.includes(testId)
        ? current.filter(id => id !== testId)
        : [...current, testId]
    );
  };

  const handleActivate = () => {
    if (!transformer) {
      toast({
        title: "No transformer selected",
        description: "Please select a transformer first",
        variant: "destructive",
      });
      return;
    }

    if (selectedTests.length === 0) {
      toast({
        title: "No tests selected",
        description: "Please select at least one test result to activate",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Test Results Activated",
      description: `Successfully activated ${selectedTests.length} test results for transformer ${transformer}.`,
    });

    setSelectedTests([]);
  };

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0442AF]">Power Transformers</h1>
          <p className="text-gray-500">ระบบหม้อแปลงไฟฟ้ากำลัง</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        {/* Section title with larger font */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Activate ผลการทดสอบ</h2>
          <p className="text-lg text-gray-600">เลือกหม้อแปลงไฟฟ้าและ Activate ผลการทดสอบที่ต้องการ</p>
        </div>

        <Card className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border-0">
          <CardContent className="p-8 space-y-6">
            <div className="bg-blue-50 rounded-md p-4 mb-6 border-l-4 border-blue-500">
              <h2 className="text-xl font-semibold text-center text-gray-800">เลือกหม้อแปลงไฟฟ้า</h2>
            </div>

            <div className="space-y-8">
              <div>
                <label htmlFor="transformer" className="text-lg font-medium text-gray-700 block mb-3">
                  หม้อแปลงไฟฟ้า:
                </label>
                <Select value={transformer} onValueChange={setTransformer}>
                  <SelectTrigger id="transformer" className="w-full h-14 text-lg">
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AN-472A">AN-472A</SelectItem>
                    <SelectItem value="AN-473A">AN-473A</SelectItem>
                    <SelectItem value="AN-474A">AN-474A</SelectItem>
                    <SelectItem value="AN-475A">AN-475A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="my-6" />

              {transformer ? (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-800">ผลการทดสอบที่รอการ Activate:</h3>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="w-16 text-center">เลือก</TableHead>
                          <TableHead>ประเภทการทดสอบ</TableHead>
                          <TableHead>วันที่ทดสอบ</TableHead>
                          <TableHead>สถานะ</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {testResults.map(test => (
                          <TableRow key={test.id}>
                            <TableCell className="text-center">
                              <Checkbox 
                                checked={selectedTests.includes(test.id)} 
                                onCheckedChange={() => handleTestSelect(test.id)}
                                className="w-5 h-5"
                              />
                            </TableCell>
                            <TableCell className="text-base">{test.type}</TableCell>
                            <TableCell className="text-base">{test.date}</TableCell>
                            <TableCell className="text-base">
                              <div className="flex items-center">
                                <AlertCircle size={16} className="mr-2 text-orange-500" />
                                <span>{test.status}</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-center pt-6">
                    <Button
                      onClick={handleActivate}
                      disabled={selectedTests.length === 0}
                      className="px-10 py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Activate ผลการทดสอบที่เลือก
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg text-center text-lg text-gray-500">
                  กรุณาเลือกหม้อแปลงไฟฟ้าเพื่อดูผลการทดสอบ
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ActivateTestResults;
