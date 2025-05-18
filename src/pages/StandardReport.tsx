import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, BarChart, Pie, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { ChartPie, ChartBar } from "lucide-react";

const StandardReport = () => {
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState("");
  const [minAge, setMinAge] = useState("0");
  const [maxAge, setMaxAge] = useState("20");
  const [showReport, setShowReport] = useState(false);
  const [activeChartTab, setActiveChartTab] = useState("pie");
  
  // Mock data for charts
  const mockChartData = [
    { name: '0-5 ปี', value: 35, color: '#0088FE' },
    { name: '6-10 ปี', value: 25, color: '#00C49F' },
    { name: '11-15 ปี', value: 20, color: '#FFBB28' },
    { name: '16-20 ปี', value: 15, color: '#FF8042' },
    { name: '21+ ปี', value: 5, color: '#8884d8' },
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
      <div className="bg-[#f0f4fa] p-4 md:p-6">
        <div className="mb-2">
          <h2 className="text-xl font-semibold text-gray-800">รายงานมาตรฐาน</h2>
          <p className="text-gray-600">แสดงความสัมพันธ์ทางสถิติเกี่ยวกับหม้อแปลงและข้อมูลความเสียหาย</p>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-lg font-bold mb-6">กรุณาเลือกรายงานที่ต้องการ</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-6">
                <Select value={selectedReport} onValueChange={setSelectedReport}>
                  <SelectTrigger className="w-full focus-visible:ring-0 border border-gray-300">
                    <SelectValue placeholder="เลือกรายงานที่ต้องการ" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="age_relation">แสดงความสัมพันธ์ของจำนวนหม้อแปลงเมื่อเทียบกับอายุการใช้งาน</SelectItem>
                    <SelectItem value="manufacturer">แสดงความสัมพันธ์ของจำนวนหม้อแปลงกับบริษัทผู้ผลิต</SelectItem>
                    <SelectItem value="region">แสดงความสัมพันธ์ของจำนวนหม้อแปลงในแต่เขตสถานีไฟฟ้า</SelectItem>
                    <SelectItem value="damage_equipment_group">แสดงจำนวนครั้งที่เกิดความเสียหายแบ่งตามกลุ่มอุปกรณ์</SelectItem>
                    <SelectItem value="damage_equipment_parts">แสดงจำนวนครั้งที่เกิดความเสียหายแบ่งตามชิ้นอุปกรณ์</SelectItem>
                    <SelectItem value="damage_details">แสดงจำนวนครั้งที่เกิดความเสียหายแบ่งตามรายละเอียดของความผิดปกติ</SelectItem>
                    <SelectItem value="damage_cause">แสดงจำนวนครั้งที่เกิดความเสียหายแบ่งตามสาเหตุที่แท้จริง</SelectItem>
                    <SelectItem value="damage_severity">แสดงจำนวนครั้งที่เกิดความเสียหายแบ่งตามระดับความรุนแรง</SelectItem>
                    <SelectItem value="damage_manufacturer">แสดงจำนวนครั้งที่เกิดความเสียหายแบ่งตามบริษัทผู้ผลิต</SelectItem>
                    <SelectItem value="damage_region">แสดงจำนวนครั้งที่เกิดความเสียหายแบ่งตามเขต</SelectItem>
                    <SelectItem value="damage_age">แสดงจำนวนครั้งที่เกิดความเสียหายแบ่งตามอายุการใช้งาน</SelectItem>
                  </SelectContent>
                </Select>
                
                {(selectedReport === "age_relation" || selectedReport === "damage_age") && (
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Label className="text-gray-700">ช่วงอายุเริ่มต้น :</Label>
                      <Select value={minAge} onValueChange={setMinAge}>
                        <SelectTrigger className="w-24 focus-visible:ring-0 border border-gray-300">
                          <SelectValue placeholder="0" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {Array.from({length: 30}, (_, i) => (
                            <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Label className="text-gray-700">ช่วงอายุสิ้นสุด :</Label>
                      <Select value={maxAge} onValueChange={setMaxAge}>
                        <SelectTrigger className="w-24 focus-visible:ring-0 border border-gray-300">
                          <SelectValue placeholder="20" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {Array.from({length: 51}, (_, i) => (
                            <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                <div>
                  <Button 
                    onClick={handleGenerateReport}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                    disabled={!selectedReport}
                  >
                    แสดงข้อมูล
                  </Button>
                </div>
              </div>
            </div>
            
            {showReport && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold mb-4">ผลลัพธ์รายงาน</h3>
                
                <Tabs value={activeChartTab} onValueChange={setActiveChartTab} className="w-full">
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                    <TabsTrigger value="pie" className="flex items-center gap-2">
                      <ChartPie className="h-4 w-4" />
                      แผนภูมิวงกลม
                    </TabsTrigger>
                    <TabsTrigger value="bar" className="flex items-center gap-2">
                      <ChartBar className="h-4 w-4" />
                      แผนภูมิแท่ง
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="pie" className="mt-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="h-96 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={mockChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              >
                                {mockChartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                              <Tooltip formatter={(value) => [`จำนวน: ${value}`, 'จำนวนหม้อแปลง']} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="bar" className="mt-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="h-96 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={mockChartData}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip formatter={(value) => [`จำนวน: ${value}`, 'จำนวนหม้อแปลง']} />
                              <Legend />
                              <Bar dataKey="value" name="จำนวนหม้อแปลง">
                                {mockChartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-4">ตารางข้อมูล</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="border border-slate-200 p-2">ช่วงอายุ</th>
                          <th className="border border-slate-200 p-2">จำนวน</th>
                          <th className="border border-slate-200 p-2">เปอร์เซ็นต์</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockChartData.map((item, index) => {
                          const total = mockChartData.reduce((acc, cur) => acc + cur.value, 0);
                          const percent = ((item.value / total) * 100).toFixed(1);
                          return (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                              <td className="border border-slate-200 p-2 text-center">{item.name}</td>
                              <td className="border border-slate-200 p-2 text-center">{item.value}</td>
                              <td className="border border-slate-200 p-2 text-center">{percent}%</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                
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

export default StandardReport;
