
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
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TransformerReport = () => {
  const { toast } = useToast();
  const [region, setRegion] = useState("");
  const [station, setStation] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [transformer, setTransformer] = useState("");
  const [groupBy, setGroupBy] = useState("region");
  const [dateRange, setDateRange] = useState("month");
  const [showReport, setShowReport] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTransformer, setCurrentTransformer] = useState(null);

  // Mock data for the pie chart
  const reportData = [
    { name: 'ภาคเหนือ', value: 25, color: '#0088FE' },
    { name: 'ภาคตะวันออกเฉียงเหนือ', value: 35, color: '#00C49F' },
    { name: 'ภาคกลาง', value: 30, color: '#FFBB28' },
    { name: 'ภาคใต้', value: 10, color: '#FF8042' },
  ];

  // Mock data for the transformer table
  const transformerData = [
    { id: 1, name: "AN-A", equipmentNo: "70000016001", manufacturer: "Electro Bangkok", capacity: "50.0", actions: "" },
    { id: 2, name: "AN-K12A", equipmentNo: "70000016003", manufacturer: "OSAKA", capacity: "50.0", actions: "" },
    { id: 3, name: "AN-K12A", equipmentNo: "70000016201", manufacturer: "DoRan", capacity: "300.0", actions: "" },
    { id: 4, name: "AN-K12A", equipmentNo: "70000016201", manufacturer: "Siemens", capacity: "300.0", actions: "" },
    { id: 5, name: "AN-K12A", equipmentNo: "70000016201", manufacturer: "Siemens", capacity: "300.0", actions: "" },
    { id: 6, name: "AN-K12A", equipmentNo: "70000016201", manufacturer: "OSAKA", capacity: "300.0", actions: "" },
  ];

  const handleEdit = (transformer) => {
    setIsEditing(true);
    setCurrentTransformer(transformer);
    setShowAddEditModal(true);
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentTransformer(null);
    setShowAddEditModal(true);
  };

  const handleCloseModal = () => {
    setShowAddEditModal(false);
  };

  const handleSave = () => {
    toast({
      title: isEditing ? "บันทึกการแก้ไขสำเร็จ" : "เพิ่มรายการสำเร็จ",
      description: isEditing ? "แก้ไขข้อมูลหม้อแปลงไฟฟ้าเรียบร้อยแล้ว" : "เพิ่มข้อมูลหม้อแปลงไฟฟ้าเรียบร้อยแล้ว",
    });
    setShowAddEditModal(false);
  };
  
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
          <h1 className="text-2xl font-bold text-[#0442AF]">รายงานข้อมูลหม้อแปลงไฟฟ้า</h1>
          <p className="text-gray-500">Transformer Data Report</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-8 text-center">รายงานตามผู้ใช้งานสำหรับหม้อแปลงไฟฟ้า</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-blue-600 font-medium text-lg mb-4">
                    ช่วงเวลาของข้อมูล
                  </h3>
                  
                  <RadioGroup value={dateRange} onValueChange={setDateRange} className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="week" id="week" />
                      <Label htmlFor="week">รายสัปดาห์</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="month" id="month" />
                      <Label htmlFor="month">รายเดือน</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="quarter" id="quarter" />
                      <Label htmlFor="quarter">รายไตรมาส</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="year" id="year" />
                      <Label htmlFor="year">รายปี</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <h3 className="text-blue-600 font-medium text-lg">
                  เลือกเงื่อนไขในการสร้างรายงาน
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Label className="w-32 text-gray-700 font-medium text-right">เขต :</Label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger className="w-full">
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

                  <div className="flex items-center gap-4">
                    <Label className="w-32 text-gray-700 font-medium text-right">สถานีไฟฟ้า :</Label>
                    <Select value={station} onValueChange={setStation}>
                      <SelectTrigger className="w-full">
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

                  <div className="flex items-center gap-4">
                    <Label className="w-32 text-gray-700 font-medium text-right">บริษัทผู้ผลิต :</Label>
                    <Select value={manufacturer} onValueChange={setManufacturer}>
                      <SelectTrigger className="w-full">
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
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Label className="w-32 text-gray-700 font-medium text-right">หม้อแปลงไฟฟ้า :</Label>
                    <Select value={transformer} onValueChange={setTransformer}>
                      <SelectTrigger className="w-full">
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

                  <div className="flex items-center gap-4">
                    <Label className="w-32 text-gray-700 font-medium text-right">อายุใช้งาน :</Label>
                    <div className="flex items-center gap-2 w-full">
                      <Input type="number" placeholder="ต่ำสุด" className="w-full" />
                      <span>-</span>
                      <Input type="number" placeholder="สูงสุด" className="w-full" />
                      <span>ปี</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <h3 className="text-blue-600 font-medium text-lg mb-4">
                    เลือกการแบ่งกลุ่ม (แบ่งตาม)
                  </h3>

                  <div>
                    <RadioGroup value={groupBy} onValueChange={setGroupBy} className="flex flex-wrap gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="region" id="group-region" />
                        <Label htmlFor="group-region">เขต</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="station" id="group-station" />
                        <Label htmlFor="group-station">สถานีไฟฟ้า</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="manufacturer" id="group-manufacturer" />
                        <Label htmlFor="group-manufacturer">บริษัทผู้ผลิต</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="age" id="group-age" />
                        <Label htmlFor="group-age">อายุการใช้งาน</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <Button 
                onClick={handleGenerateReport} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg"
              >
                สร้างรายงาน
              </Button>
            </div>
            
            {showReport && (
              <div className="mt-10 pt-8 border-t border-gray-200 animate-fade-in">
                <h3 className="text-xl font-bold mb-4 text-center">ผลลัพธ์รายงานหม้อแปลงไฟฟ้า ({groupBy === 'region' ? 'แบ่งตามเขต' : 
                groupBy === 'station' ? 'แบ่งตามสถานีไฟฟ้า' : 
                groupBy === 'manufacturer' ? 'แบ่งตามบริษัทผู้ผลิต' : 'แบ่งตามอายุการใช้งาน'})</h3>
                
                <Tabs defaultValue="chart" className="w-full mt-6">
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                    <TabsTrigger value="chart">แผนภูมิ</TabsTrigger>
                    <TabsTrigger value="table">ตาราง</TabsTrigger>
                  </TabsList>
                  <TabsContent value="chart">
                    <Card>
                      <CardContent className="p-6">
                        <div className="h-80 w-full">
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
                                outerRadius={120}
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
                                <th className="border border-slate-200 p-2">เขต</th>
                                <th className="border border-slate-200 p-2">จำนวนหม้อแปลง</th>
                                <th className="border border-slate-200 p-2">เปอร์เซ็นต์</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reportData.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                  <td className="border border-slate-200 p-2 text-center">{item.name}</td>
                                  <td className="border border-slate-200 p-2 text-center">{item.value}</td>
                                  <td className="border border-slate-200 p-2 text-center">
                                    {(item.value / reportData.reduce((acc, curr) => acc + curr.value, 0) * 100).toFixed(1)}%
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

export default TransformerReport;
