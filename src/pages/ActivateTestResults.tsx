
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle, Lock } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

// Mock data for demonstration
const testResults = [
  { id: 1, type: "Oil Quality", date: "2025-04-12", status: "Pending" },
  { id: 2, type: "DGA", date: "2025-04-10", status: "Pending" },
  { id: 3, type: "Insulation Resistance", date: "2025-04-08", status: "Pending" },
  { id: 4, type: "Winding Resistance", date: "2025-04-05", status: "Pending" },
  { id: 5, type: "Power Factor", date: "2025-04-03", status: "Pending" }
];

// Health data for the charts
const ghiData = [
  { name: 'Very Good', value: 35, color: '#22c55e' },
  { name: 'Good', value: 25, color: '#3b82f6' },
  { name: 'Fair', value: 20, color: '#eab308' },
  { name: 'Poor', value: 15, color: '#f97316' },
  { name: 'Very Poor', value: 5, color: '#ef4444' }
];

const chiData = [
  { name: 'Very Good', value: 30, color: '#22c55e' },
  { name: 'Good', value: 28, color: '#3b82f6' },
  { name: 'Fair', value: 25, color: '#eab308' },
  { name: 'Poor', value: 12, color: '#f97316' },
  { name: 'Very Poor', value: 5, color: '#ef4444' }
];

const activeParts = [
  { name: 'Core Insulation', value: 20.0, color: '#22c55e' },
  { name: 'HV Winding', value: 34.22, color: '#3b82f6' },
  { name: 'LV Winding', value: 31.58, color: '#3b82f6' },
  { name: 'TV Winding', value: 24.0, color: '#3b82f6' }
];

const ActivateTestResults = () => {
  const [transformer, setTransformer] = useState("");
  const [selectedTests, setSelectedTests] = useState<number[]>([]);
  const [isActivated, setIsActivated] = useState(false);
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

    setIsActivated(true);
    toast({
      title: "Test Results Activated",
      description: `Successfully activated ${selectedTests.length} test results for transformer ${transformer}.`,
    });

    setSelectedTests([]);
  };

  const CustomPieChart = ({ data, title }: { data: any[], title: string }) => (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="text-lg font-semibold text-center mb-4">{title}</h3>
      <div className="relative w-64 h-64 mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              startAngle={90}
              endAngle={450}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">99.896</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-1 text-xs">
            <div 
              className="w-3 h-3 rounded" 
              style={{ backgroundColor: item.color }}
            ></div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        {/* Section title with larger font */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Activate ผลการทดสอบ</h2>
          <p className="text-lg text-gray-600">เลือกหม้อแปลงไฟฟ้าและ Activate ผลการทดสอบที่ต้องการ</p>
        </div>

        <Card className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border-0">
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
                    <SelectItem value="AT2-KT1A">AT2-KT1A</SelectItem>
                    <SelectItem value="AN-473A">AN-473A</SelectItem>
                    <SelectItem value="AN-474A">AN-474A</SelectItem>
                    <SelectItem value="AN-475A">AN-475A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="my-6" />

              {transformer ? (
                <div className="space-y-6">
                  {!isActivated ? (
                    <>
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
                    </>
                  ) : (
                    <div className="space-y-6">
                      {/* Header Information */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="bg-green-100 p-3 rounded">
                            <div className="font-medium text-green-800">หม้อแปลงไฟฟ้า:</div>
                            <div className="text-green-700">{transformer}</div>
                          </div>
                          <div className="bg-green-100 p-3 rounded">
                            <div className="font-medium text-green-800">ปีที่บันทึก:</div>
                            <div className="text-green-700">2024</div>
                          </div>
                          <div className="bg-green-100 p-3 rounded">
                            <div className="font-medium text-green-800">ไตรมาส:</div>
                            <div className="text-green-700">3</div>
                          </div>
                        </div>
                      </div>

                      {/* Charts Section */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <CustomPieChart data={ghiData} title="%GHI" />
                        <CustomPieChart data={chiData} title="%CHI" />
                      </div>

                      {/* Health Index Summary */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-green-100 border border-green-200 rounded p-4 text-center">
                          <div className="font-medium text-green-800">General Health Index (%GHI):</div>
                          <div className="text-2xl font-bold text-green-700">99.896</div>
                        </div>
                        <div className="bg-blue-100 border border-blue-200 rounded p-4 text-center">
                          <div className="font-medium text-blue-800">Component Health Index (%CHI):</div>
                          <div className="text-2xl font-bold text-blue-700">82.306</div>
                        </div>
                        <div className="bg-green-100 border border-green-200 rounded p-4 text-center">
                          <div className="font-medium text-green-800">Overall Health Index (%OHI):</div>
                          <div className="text-2xl font-bold text-green-700">91.526</div>
                        </div>
                      </div>

                      {/* Active Parts Section */}
                      <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 text-blue-700">กลุ่ม Active Part</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                            <span className="font-medium">%Health Index:</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold">78.18</span>
                              <div className="w-20 h-4 bg-blue-600 rounded"></div>
                            </div>
                          </div>
                          
                          {activeParts.map((part, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                              <span>{part.name}:</span>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{part.value}</span>
                                <div 
                                  className="w-16 h-4 rounded"
                                  style={{ backgroundColor: part.color }}
                                ></div>
                                <Lock size={16} className="text-gray-500" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
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
