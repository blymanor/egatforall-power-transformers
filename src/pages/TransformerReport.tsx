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
import { PieChart, BarChart, Pie, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TransformerReport = () => {
  const { toast } = useToast();
  const [region, setRegion] = useState("");
  const [station, setStation] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [transformer, setTransformer] = useState("");
  const [groupBy, setGroupBy] = useState("region");
  const [showReport, setShowReport] = useState(false);
  
  // Mock data for the pie chart
  const regionData = [
    { name: 'ภาคเหนือ', value: 25, color: '#0088FE' },
    { name: 'ภาคตะวันออกเฉียงเหนือ', value: 35, color: '#00C49F' },
    { name: 'ภาคกลาง', value: 30, color: '#FFBB28' },
    { name: 'ภาคใต้', value: 10, color: '#FF8042' },
  ];
  
  const stationData = [
    { name: 'สถานี 1', value: 15, color: '#0088FE' },
    { name: 'สถานี 2', value: 12, color: '#00C49F' },
    { name: 'สถานี 3', value: 18, color: '#FFBB28' },
    { name: 'สถานี 4', value: 22, color: '#FF8042' },
    { name: 'สถานี 5', value: 10, color: '#8884d8' },
    { name: 'สถานี 6', value: 13, color: '#82ca9d' },
  ];
  
  const manufacturerData = [
    { name: 'ABB', value: 28, color: '#0088FE' },
    { name: 'Siemens', value: 22, color: '#00C49F' },
    { name: 'Mitsubishi', value: 18, color: '#FFBB28' },
    { name: 'Hitachi', value: 15, color: '#FF8042' },
    { name: 'OSAKA', value: 10, color: '#8884d8' },
    { name: 'อื่นๆ', value: 7, color: '#82ca9d' },
  ];
  
  const ageData = [
    { name: '0-5 ปี', value: 20, color: '#0088FE' },
    { name: '6-10 ปี', value: 25, color: '#00C49F' },
    { name: '11-15 ปี', value: 35, color: '#FFBB28' },
    { name: '16-20 ปี', value: 15, color: '#FF8042' },
    { name: '21+ ปี', value: 5, color: '#8884d8' },
  ];

  const getReportData = () => {
    switch (groupBy) {
      case "region": return regionData;
      case "station": return stationData;
      case "manufacturer": return manufacturerData;
      case "age": return ageData;
      default: return regionData;
    }
  };
  
  const getGroupByLabel = () => {
    switch (groupBy) {
      case "region": return "เขต";
      case "station": return "สถานีไฟฟ้า";
      case "manufacturer": return "บริษัทผู้ผลิต";
      case "age": return "อายุการใช้งาน";
      default: return "เขต";
    }
  };
  
  const handleGenerateReport = () => {
    toast({
      title: "สร้างรายงานสำเร็จ",
      description: "กำลังแสดงผลรายงานตามเงื่อนไขที่เลือก",
    });
    setShowReport(true);
  };

  return (
    <DashboardLayout
      pageTitle="รายงานข้อมูลหม้อแปลงไฟฟ้า"
      pageDescription="Transformer Data Report"
    >
      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-8 text-center">รายงานตามผู้ใช้งานสำหรับหม้อแปลงไฟฟ้า</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-8">
              <div className="space-y-6">
                <h3 className="text-blue-600 font-medium text-lg">
                  เลือกเงื่อนไขในการสร้างรายงาน
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Label className="w-32 text-gray-700 font-medium text-right">เขต :</Label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger className="w-full ml-4 focus-visible:ring-0 border border-gray-300">
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

                  <div className="flex items-center">
                    <Label className="w-32 text-gray-700 font-medium text-right">สถานีไฟฟ้า :</Label>
                    <Select value={station} onValueChange={setStation}>
                      <SelectTrigger className="w-full ml-4 focus-visible:ring-0 border border-gray-300">
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

                  <div className="flex items-center">
                    <Label className="w-32 text-gray-700 font-medium text-right">บริษัทผู้ผลิต :</Label>
                    <Select value={manufacturer} onValueChange={setManufacturer}>
                      <SelectTrigger className="w-full ml-4 focus-visible:ring-0 border border-gray-300">
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

                  <div className="flex items-center">
                    <Label className="w-32 text-gray-700 font-medium text-right">หม้อแปลงไฟฟ้า :</Label>
                    <Select value={transformer} onValueChange={setTransformer}>
                      <SelectTrigger className="w-full ml-4 focus-visible:ring-0 border border-gray-300">
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
              
              <div className="space-y-6">
                <h3 className="text-blue-600 font-medium text-lg mb-4">
                  เลือกการแบ่งกลุ่ม (แบ่งตาม)
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      id="group-by-region" 
                      name="group-by" 
                      value="region" 
                      checked={groupBy === "region"} 
                      onChange={(e) => setGroupBy(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <Label htmlFor="group-by-region" className="text-gray-700">เขต</Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      id="group-by-station" 
                      name="group-by" 
                      value="station"
                      checked={groupBy === "station"} 
                      onChange={(e) => setGroupBy(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <Label htmlFor="group-by-station" className="text-gray-700">สถานีไฟฟ้า</Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      id="group-by-manufacturer" 
                      name="group-by" 
                      value="manufacturer"
                      checked={groupBy === "manufacturer"} 
                      onChange={(e) => setGroupBy(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <Label htmlFor="group-by-manufacturer" className="text-gray-700">บริษัทผู้ผลิต</Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      id="group-by-age" 
                      name="group-by" 
                      value="age"
                      checked={groupBy === "age"} 
                      onChange={(e) => setGroupBy(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <Label htmlFor="group-by-age" className="text-gray-700">อายุการใช้งาน</Label>
                  </div>
                </div>
                
                <div className="flex justify-center pt-6">
                  <Button 
                    onClick={handleGenerateReport} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg"
                  >
                    สร้างรายงาน
                  </Button>
                </div>
              </div>
            </div>
            
            {showReport && (
              <div className="mt-10 pt-8 border-t border-gray-200 animate-fade-in">
                <h3 className="text-xl font-bold mb-6 text-center">รายงานหม้อแปลงไฟฟ้า (แบ่งตาม{getGroupByLabel()})</h3>
                
                <Tabs defaultValue="pie" className="w-full">
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                    <TabsTrigger value="pie">แผนภูมิวงกลม</TabsTrigger>
                    <TabsTrigger value="bar">แผนภูมิแท่ง</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="pie" className="mt-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="h-96 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={getReportData()}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              >
                                {getReportData().map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                              <Tooltip formatter={(value) => [`จำนวน: ${value}`, getGroupByLabel()]} />
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
                              data={getReportData()}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip formatter={(value) => [`จำนวน: ${value}`, getGroupByLabel()]} />
                              <Legend />
                              <Bar dataKey="value" name="จำนวนหม้อแปลง">
                                {getReportData().map((entry, index) => (
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
                          <th className="border border-slate-200 p-2">{getGroupByLabel()}</th>
                          <th className="border border-slate-200 p-2">จำนวน</th>
                          <th className="border border-slate-200 p-2">เปอร์เซ็นต์</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getReportData().map((item, index) => {
                          const total = getReportData().reduce((acc, cur) => acc + cur.value, 0);
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

export default TransformerReport;
