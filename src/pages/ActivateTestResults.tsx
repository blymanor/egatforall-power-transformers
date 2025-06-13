
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Health data for different transformers
const transformerData = {
  "AT2-KT1A": {
    year: "2024",
    quarter: "3",
    ghi: "99.896",
    chi: "82.306",
    ohi: "91.526",
    activePartHealth: "78.18",
    activeParts: [
      { name: 'Core Insulation', value: 20.0, color: '#22c55e', value2: 85.5 },
      { name: 'HV Winding', value: 34.22, color: '#3b82f6', value2: 78.2 },
      { name: 'LV Winding', value: 31.58, color: '#3b82f6', value2: 82.1 },
      { name: 'TV Winding', value: 24.0, color: '#3b82f6', value2: 76.8 }
    ]
  },
  "AN-473A": {
    year: "2024",
    quarter: "2",
    ghi: "88.742",
    chi: "75.123",
    ohi: "84.315",
    activePartHealth: "72.45",
    activeParts: [
      { name: 'Core Insulation', value: 18.5, color: '#22c55e', value2: 79.2 },
      { name: 'HV Winding', value: 29.88, color: '#3b82f6', value2: 71.8 },
      { name: 'LV Winding', value: 27.32, color: '#3b82f6', value2: 75.6 },
      { name: 'TV Winding', value: 21.75, color: '#3b82f6', value2: 68.9 }
    ]
  },
  "AN-474A": {
    year: "2024",
    quarter: "3",
    ghi: "95.234",
    chi: "79.456",
    ohi: "89.123",
    activePartHealth: "81.32",
    activeParts: [
      { name: 'Core Insulation', value: 22.1, color: '#22c55e', value2: 88.7 },
      { name: 'HV Winding', value: 31.67, color: '#3b82f6', value2: 80.5 },
      { name: 'LV Winding', value: 28.94, color: '#3b82f6', value2: 84.3 },
      { name: 'TV Winding', value: 23.61, color: '#3b82f6', value2: 77.1 }
    ]
  },
  "AN-475A": {
    year: "2024",
    quarter: "1",
    ghi: "92.567",
    chi: "77.890",
    ohi: "87.234",
    activePartHealth: "75.89",
    activeParts: [
      { name: 'Core Insulation', value: 19.8, color: '#22c55e', value2: 83.4 },
      { name: 'HV Winding', value: 30.45, color: '#3b82f6', value2: 76.9 },
      { name: 'LV Winding', value: 28.12, color: '#3b82f6', value2: 79.2 },
      { name: 'TV Winding', value: 22.52, color: '#3b82f6', value2: 74.6 }
    ]
  }
};

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

const ohiData = [
  { name: 'Very Good', value: 32, color: '#22c55e' },
  { name: 'Good', value: 27, color: '#3b82f6' },
  { name: 'Fair', value: 23, color: '#eab308' },
  { name: 'Poor', value: 13, color: '#f97316' },
  { name: 'Very Poor', value: 5, color: '#ef4444' }
];

const ActivateTestResults = () => {
  const [transformer, setTransformer] = useState("");
  const [isActivated, setIsActivated] = useState(false);
  const { toast } = useToast();

  const currentData = transformer ? transformerData[transformer as keyof typeof transformerData] : null;

  const handleActivate = () => {
    if (!transformer) {
      toast({
        title: "No transformer selected",
        description: "Please select a transformer first",
        variant: "destructive",
      });
      return;
    }

    setIsActivated(true);
    toast({
      title: "Test Results Activated",
      description: `Successfully activated test results for transformer ${transformer}.`,
    });
  };

  const handleTransformerChange = (value: string) => {
    setTransformer(value);
    setIsActivated(false); // Reset activation when changing transformer
  };

  const CustomPieChart = ({ data, title, centerValue }: { data: any[], title: string, centerValue: string }) => (
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
            <div className="text-2xl font-bold">{centerValue}</div>
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
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Activate ผลการทดสอบ</h2>
          <p className="text-lg text-gray-600">เลือกหม้อแปลงไฟฟ้าและ Activate ผลการทดสอบ</p>
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
                <Select value={transformer} onValueChange={handleTransformerChange}>
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
                    <div className="flex justify-center pt-6">
                      <Button
                        onClick={handleActivate}
                        className="px-10 py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Activate ผลการทดสอบ
                      </Button>
                    </div>
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
                            <div className="text-green-700">{currentData?.year}</div>
                          </div>
                          <div className="bg-green-100 p-3 rounded">
                            <div className="font-medium text-green-800">ไตรมาส:</div>
                            <div className="text-green-700">{currentData?.quarter}</div>
                          </div>
                        </div>
                      </div>

                      {/* Charts Section */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <CustomPieChart data={ghiData} title="%GHI" centerValue={currentData?.ghi || "0"} />
                        <CustomPieChart data={chiData} title="%CHI" centerValue={currentData?.chi || "0"} />
                        <CustomPieChart data={ohiData} title="%OHI" centerValue={currentData?.ohi || "0"} />
                      </div>

                      {/* Health Index Summary */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-green-100 border border-green-200 rounded p-4 text-center">
                          <div className="font-medium text-green-800">General Health Index (%GHI):</div>
                          <div className="text-2xl font-bold text-green-700">{currentData?.ghi}</div>
                        </div>
                        <div className="bg-blue-100 border border-blue-200 rounded p-4 text-center">
                          <div className="font-medium text-blue-800">Component Health Index (%CHI):</div>
                          <div className="text-2xl font-bold text-blue-700">{currentData?.chi}</div>
                        </div>
                        <div className="bg-green-100 border border-green-200 rounded p-4 text-center">
                          <div className="font-medium text-green-800">Overall Health Index (%OHI):</div>
                          <div className="text-2xl font-bold text-green-700">{currentData?.ohi}</div>
                        </div>
                      </div>

                      {/* Active Parts Section */}
                      <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 text-blue-700">กลุ่ม Active Part</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                            <span className="font-medium">%Health Index:</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold">{currentData?.activePartHealth}</span>
                              <div className="w-20 h-4 bg-blue-600 rounded"></div>
                            </div>
                          </div>
                          
                          {currentData?.activeParts.map((part, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                              <span>{part.name}:</span>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{part.value}</span>
                                <div className="flex gap-1">
                                  <div 
                                    className="w-16 h-4 rounded"
                                    style={{ backgroundColor: part.color }}
                                  ></div>
                                  <div 
                                    className="w-16 h-4 rounded bg-gray-300"
                                    style={{ 
                                      background: `linear-gradient(to right, ${part.color} ${part.value2}%, #e5e7eb ${part.value2}%)` 
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600">{part.value2}%</span>
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
