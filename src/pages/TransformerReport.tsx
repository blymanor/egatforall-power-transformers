
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

const TransformerReport = () => {
  const { toast } = useToast();
  const [region, setRegion] = useState("");
  const [station, setStation] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [transformer, setTransformer] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [showChart, setShowChart] = useState(false);

  // Mock data for the pie chart
  const reportData = [
    { name: 'ภาคเหนือ', value: 25, color: '#0088FE' },
    { name: 'ภาคตะวันออกเฉียงเหนือ', value: 35, color: '#00C49F' },
    { name: 'ภาคกลาง', value: 30, color: '#FFBB28' },
    { name: 'ภาคใต้', value: 10, color: '#FF8042' },
  ];

  const handleDone = () => {
    toast({
      title: "สร้างรายงานสำเร็จ",
      description: "กำลังสร้างรายงานตามเงื่อนไขที่เลือก",
    });
    setShowChart(true);
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
        <Card className="mx-auto max-w-3xl shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-center mb-8 bg-white rounded-full py-3 shadow-sm">
              รายงานตามผู้ใช้งานสำหรับหม้อแปลงไฟฟ้า
            </h2>

            <div className="space-y-6 mb-8">
              <h3 className="text-blue-600 font-medium text-lg">
                เลือกเงื่อนไขในการสร้างกราฟ
              </h3>

              <div className="grid grid-cols-1 gap-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-32 text-gray-700 font-medium">เขต :</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue placeholder="ทั้งหมด" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="north">ภาคเหนือ</SelectItem>
                      <SelectItem value="northeast">ภาคตะวันออกเฉียงเหนือ</SelectItem>
                      <SelectItem value="central">ภาคกลาง</SelectItem>
                      <SelectItem value="south">ภาคใต้</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-32 text-gray-700 font-medium">สถานีไฟฟ้า :</Label>
                  <Select value={station} onValueChange={setStation}>
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue placeholder="ทั้งหมด" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="station1">สถานีไฟฟ้า 1</SelectItem>
                      <SelectItem value="station2">สถานีไฟฟ้า 2</SelectItem>
                      <SelectItem value="station3">สถานีไฟฟ้า 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-32 text-gray-700 font-medium">ชื่อบริษัทผู้ผลิต :</Label>
                  <Select value={manufacturer} onValueChange={setManufacturer}>
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue placeholder="ทั้งหมด" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="abb">ABB</SelectItem>
                      <SelectItem value="siemens">Siemens</SelectItem>
                      <SelectItem value="hitachi">Hitachi</SelectItem>
                      <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-32 text-gray-700 font-medium">หม้อแปลงไฟฟ้า :</Label>
                  <Select value={transformer} onValueChange={setTransformer}>
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue placeholder="ทั้งหมด" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="t1">AN-472A</SelectItem>
                      <SelectItem value="t2">AN-473A</SelectItem>
                      <SelectItem value="t3">AN-472B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <h3 className="text-blue-600 font-medium text-lg">
                เลือกการแบ่งกลุ่ม (แบ่งตาม)
              </h3>

              <div>
                <Select value={groupBy} onValueChange={setGroupBy}>
                  <SelectTrigger className="w-full sm:w-64">
                    <SelectValue placeholder="เขต" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="region">เขต</SelectItem>
                    <SelectItem value="station">สถานีไฟฟ้า</SelectItem>
                    <SelectItem value="manufacturer">บริษัทผู้ผลิต</SelectItem>
                    <SelectItem value="transformer">หม้อแปลงไฟฟ้า</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {showChart && (
              <div className="bg-white rounded-lg p-4 shadow-inner mb-8 animate-fade-in">
                <h3 className="text-center text-lg font-medium mb-4">ผลลัพธ์การรายงาน</h3>
                <div className="h-80">
                  <ChartContainer 
                    config={{
                      region1: { label: "ภาคเหนือ", color: "#0088FE" },
                      region2: { label: "ภาคตะวันออกเฉียงเหนือ", color: "#00C49F" },
                      region3: { label: "ภาคกลาง", color: "#FFBB28" },
                      region4: { label: "ภาคใต้", color: "#FF8042" },
                    }}
                  >
                    <PieChart>
                      <Pie
                        data={reportData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {reportData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                      <ChartTooltip />
                    </PieChart>
                  </ChartContainer>
                </div>
              </div>
            )}

            <div className="flex justify-center mt-10">
              <Button 
                onClick={handleDone} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-12"
              >
                Done
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransformerReport;
