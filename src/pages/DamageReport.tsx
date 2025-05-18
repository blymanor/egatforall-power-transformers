
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
import { Input } from "@/components/ui/input";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DamageReport = () => {
  const { toast } = useToast();
  const [region, setRegion] = useState("");
  const [station, setStation] = useState("");
  const [damageType, setDamageType] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState("pie");

  // Mock data for the pie chart
  const damageTypeData = [
    { name: 'อุปกรณ์หม้อแปลง', value: 35, color: '#0088FE' },
    { name: 'ระบบไฟฟ้า', value: 25, color: '#00C49F' },
    { name: 'ระบบน้ำมัน', value: 20, color: '#FFBB28' },
    { name: 'อุปกรณ์เชื่อมต่อ', value: 15, color: '#FF8042' },
    { name: 'อื่นๆ', value: 5, color: '#FF5733' },
  ];

  // Mock data for bar chart
  const monthlyDamageData = [
    { name: 'ม.ค.', value: 12 },
    { name: 'ก.พ.', value: 8 },
    { name: 'มี.ค.', value: 15 },
    { name: 'เม.ย.', value: 6 },
    { name: 'พ.ค.', value: 10 },
    { name: 'มิ.ย.', value: 9 },
    { name: 'ก.ค.', value: 14 },
    { name: 'ส.ค.', value: 11 },
    { name: 'ก.ย.', value: 7 },
    { name: 'ต.ค.', value: 13 },
    { name: 'พ.ย.', value: 9 },
    { name: 'ธ.ค.', value: 10 },
  ];

  const handleGenerateReport = () => {
    toast({
      title: "สร้างรายงานสำเร็จ",
      description: "กำลังแสดงผลรายงานตามเงื่อนไขที่เลือก",
    });
    setShowReport(true);
  };

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0442AF]">รายงานข้อมูลความเสียหาย</h1>
          <p className="text-gray-500">Damage Reports</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-center mb-8">รายงานข้อมูลความเสียหายหม้อแปลงไฟฟ้า</h2>

            <div className="space-y-8">
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  variant={selectedReportType === "pie" ? "default" : "outline"}
                  onClick={() => setSelectedReportType("pie")}
                  className="px-6"
                >
                  ประเภทความเสียหาย
                </Button>
                <Button
                  variant={selectedReportType === "bar" ? "default" : "outline"}
                  onClick={() => setSelectedReportType("bar")}
                  className="px-6"
                >
                  สถิติรายเดือน
                </Button>
                <Button
                  variant={selectedReportType === "severity" ? "default" : "outline"}
                  onClick={() => setSelectedReportType("severity")}
                  className="px-6"
                >
                  ความรุนแรง
                </Button>
                <Button
                  variant={selectedReportType === "location" ? "default" : "outline"}
                  onClick={() => setSelectedReportType("location")}
                  className="px-6"
                >
                  ตำแหน่งที่พบ
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-40 text-gray-700 font-medium sm:text-right">ช่วงวันที่เริ่มต้น :</Label>
                  <Input 
                    type="date" 
                    value={dateFrom} 
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full sm:w-64" 
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-40 text-gray-700 font-medium sm:text-right">ช่วงวันที่สิ้นสุด :</Label>
                  <Input 
                    type="date" 
                    value={dateTo} 
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full sm:w-64" 
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-40 text-gray-700 font-medium sm:text-right">เขต :</Label>
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
                  <Label className="w-40 text-gray-700 font-medium sm:text-right">สถานีไฟฟ้า :</Label>
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
                  <Label className="w-40 text-gray-700 font-medium sm:text-right">ประเภทความเสียหาย :</Label>
                  <Select value={damageType} onValueChange={setDamageType}>
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue placeholder="ทั้งหมด" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="equipment">อุปกรณ์หม้อแปลง</SelectItem>
                      <SelectItem value="electrical">ระบบไฟฟ้า</SelectItem>
                      <SelectItem value="oil">ระบบน้ำมัน</SelectItem>
                      <SelectItem value="connection">อุปกรณ์เชื่อมต่อ</SelectItem>
                      <SelectItem value="other">อื่นๆ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-40 text-gray-700 font-medium sm:text-right">การแบ่งกลุ่ม :</Label>
                  <Select value={groupBy} onValueChange={setGroupBy}>
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue placeholder="เลือกการแบ่งกลุ่ม" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="type">ประเภทความเสียหาย</SelectItem>
                      <SelectItem value="month">รายเดือน</SelectItem>
                      <SelectItem value="region">เขตพื้นที่</SelectItem>
                      <SelectItem value="severity">ระดับความรุนแรง</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Button 
                  onClick={handleGenerateReport} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg"
                >
                  สร้างรายงาน
                </Button>
              </div>
            </div>

            {showReport && (
              <div className="mt-10 pt-8 border-t border-gray-200 animate-fade-in">
                <h3 className="text-xl font-bold mb-4 text-center">
                  ผลลัพธ์รายงานความเสียหาย
                  {selectedReportType === "pie" ? ": แบ่งตามประเภทความเสียหาย" : 
                   selectedReportType === "bar" ? ": สถิติรายเดือน" :
                   selectedReportType === "severity" ? ": ระดับความรุนแรง" : ": ตำแหน่งที่พบ"}
                </h3>
                
                <Tabs defaultValue="chart" className="w-full mt-6">
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                    <TabsTrigger value="chart">แผนภูมิ</TabsTrigger>
                    <TabsTrigger value="table">ตาราง</TabsTrigger>
                  </TabsList>
                  <TabsContent value="chart">
                    <Card>
                      <CardContent className="p-6">
                        <div className="h-80 w-full">
                          {selectedReportType === "bar" ? (
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={monthlyDamageData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" name="จำนวนความเสียหาย" fill="#3b82f6" />
                              </BarChart>
                            </ResponsiveContainer>
                          ) : (
                            <ChartContainer 
                              config={{
                                equipment: { label: "อุปกรณ์หม้อแปลง", color: "#0088FE" },
                                electrical: { label: "ระบบไฟฟ้า", color: "#00C49F" },
                                oil: { label: "ระบบน้ำมัน", color: "#FFBB28" },
                                connection: { label: "อุปกรณ์เชื่อมต่อ", color: "#FF8042" },
                                other: { label: "อื่นๆ", color: "#FF5733" },
                              }}
                            >
                              <PieChart>
                                <Pie
                                  data={damageTypeData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={true}
                                  outerRadius={120}
                                  fill="#8884d8"
                                  dataKey="value"
                                  nameKey="name"
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                  {damageTypeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                                <ChartTooltip />
                              </PieChart>
                            </ChartContainer>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="table">
                    <Card>
                      <CardContent className="p-6">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-slate-100">
                                <th className="border border-slate-200 p-2">
                                  {selectedReportType === "bar" ? "เดือน" : "ประเภทความเสียหาย"}
                                </th>
                                <th className="border border-slate-200 p-2">จำนวน</th>
                                <th className="border border-slate-200 p-2">เปอร์เซ็นต์</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(selectedReportType === "bar" ? monthlyDamageData : damageTypeData).map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                  <td className="border border-slate-200 p-2 text-center">{item.name}</td>
                                  <td className="border border-slate-200 p-2 text-center">{item.value}</td>
                                  <td className="border border-slate-200 p-2 text-center">
                                    {(item.value / (selectedReportType === "bar" ? 
                                      monthlyDamageData.reduce((acc, curr) => acc + curr.value, 0) : 
                                      damageTypeData.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(1)}%
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-end mt-6">
                  <Button className="bg-green-600 hover:bg-green-700">
                    ดาวน์โหลดรายงาน PDF
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DamageReport;
