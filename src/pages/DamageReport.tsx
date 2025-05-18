import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { ChartPie, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, BarChart, Pie, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from "recharts";

const DamageReport = () => {
  const { toast } = useToast();
  const [showReport, setShowReport] = useState(false);
  const [groupBy, setGroupBy] = useState("region");
  
  const form = useForm({
    defaultValues: {
      useCondition: false,
      region: "",
      powerStation: "",
      manufacturer: "",
      transformer: "",
      environment: "",
      usageState: "",
      abnormalDetail: "",
      damagePart: "",
      damageLevel: "",
      cause: "",
      management: "",
    },
  });

  const mockData = [
    { name: 'ภาคเหนือ', value: 38, color: '#8884d8' },
    { name: 'ภาคกลาง', value: 25, color: '#83a6ed' },
    { name: 'ภาคตะวันออก', value: 18, color: '#8dd1e1' },
    { name: 'ภาคตะวันตก', value: 13, color: '#82ca9d' },
    { name: 'ภาคตะวันออกเฉียงเหนือ', value: 22, color: '#a4de6c' },
    { name: 'ภาคใต้', value: 15, color: '#d0ed57' },
  ];

  // Function to handle form submission
  const onSubmit = (values: any) => {
    toast({
      title: "สร้างรายงานสำเร็จ",
      description: "กำลังแสดงผลรายงานตามเงื่อนไขที่เลือก",
    });
    console.log(values);
    setShowReport(true);
  };

  // Function to handle double click for radio buttons
  const handleRadioDoubleClick = (id: string) => {
    // Check if the radio is already checked
    const radioInput = document.getElementById(id) as HTMLInputElement;
    if (radioInput && radioInput.checked) {
      // Uncheck it
      radioInput.checked = false;
      // Update the form value
      const name = radioInput.name;
      if (name) {
        form.setValue(name as any, false);
      }
    }
  };

  return (
    <DashboardLayout
      pageTitle="รายงานตามผู้ใช้งานสำหรับข้อมูลความเสียหาย"
      pageDescription="Damage Report Information"
    >
      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border-0">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">รายงานตามผู้ใช้งานสำหรับข้อมูลความเสียหาย</h2>
            <p className="text-gray-600 text-center">กรุณาเลือกหนึ่งเงื่อนไขในการสร้างรายงาน</p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Date Range Selection Section - MODIFIED: Removed "ระยะเวลา" dropdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-1 md:col-span-2">
                    <div className="flex text-blue-600 font-medium">เลือกเงื่อนไขในการสร้างกราฟ (เพียงหนึ่งเงื่อนไขเท่านั้น)</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>อายุเริ่มต้น:</Label>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกอายุเริ่มต้น" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 ปี</SelectItem>
                        <SelectItem value="5">5 ปี</SelectItem>
                        <SelectItem value="10">10 ปี</SelectItem>
                        <SelectItem value="15">15 ปี</SelectItem>
                        <SelectItem value="20">20 ปี</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>อายุสิ้นสุด:</Label>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกอายุสิ้นสุด" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 ปี</SelectItem>
                        <SelectItem value="10">10 ปี</SelectItem>
                        <SelectItem value="15">15 ปี</SelectItem>
                        <SelectItem value="20">20 ปี</SelectItem>
                        <SelectItem value="25">25 ปี</SelectItem>
                        <SelectItem value="30">30 ปี</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Filter Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* First Column */}
                  <div className="space-y-6">
                    {/* Region */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">เขต :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value="on" 
                              id="use-region" 
                              onDoubleClick={() => handleRadioDoubleClick("use-region")}
                            />
                            <Label htmlFor="use-region">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกเขต" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="north">ภาคเหนือ</SelectItem>
                        <SelectItem value="northeast">ภาคตะวันออกเฉียงเหนือ</SelectItem>
                        <SelectItem value="central">ภาคกลาง</SelectItem>
                        <SelectItem value="south">ภาคใต้</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Manufacturer */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">บริษัทผู้ผลิต :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value="on" 
                              id="use-manufacturer" 
                              onDoubleClick={() => handleRadioDoubleClick("use-manufacturer")}
                            />
                            <Label htmlFor="use-manufacturer">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกบริษัทผู้ผลิต" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="siemens">Siemens</SelectItem>
                        <SelectItem value="abb">ABB</SelectItem>
                        <SelectItem value="toshiba">Toshiba</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Environment */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">สภาพแวดล้อม :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value="on" 
                              id="use-environment" 
                              onDoubleClick={() => handleRadioDoubleClick("use-environment")}
                            />
                            <Label htmlFor="use-environment">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกสภาพแวดล้อม" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="indoor">Indoor</SelectItem>
                        <SelectItem value="outdoor">Outdoor</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Abnormal Detail */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">รายละเอียดความผิดปกติ :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value="on" 
                              id="use-abnormal" 
                              onDoubleClick={() => handleRadioDoubleClick("use-abnormal")}
                            />
                            <Label htmlFor="use-abnormal">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกรายละเอียดความผิดปกติ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="detail1">รายละเอียด 1</SelectItem>
                        <SelectItem value="detail2">รายละเอียด 2</SelectItem>
                        <SelectItem value="detail3">รายละเอียด 3</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Damage Part */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">ชิ้นส่วนที่เสียหาย :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value="on" 
                              id="use-part"
                              onDoubleClick={() => handleRadioDoubleClick("use-part")} 
                            />
                            <Label htmlFor="use-part">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกชิ้นส่วนที่เสียหาย" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="part1">HV Winding</SelectItem>
                        <SelectItem value="part2">LV Winding</SelectItem>
                        <SelectItem value="part3">TV Winding</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Cause */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">สาเหตุที่เกิดจริง :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value="on" 
                              id="use-cause" 
                              onDoubleClick={() => handleRadioDoubleClick("use-cause")}
                            />
                            <Label htmlFor="use-cause">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกสาเหตุที่เกิดจริง" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cause1">สาเหตุ 1</SelectItem>
                        <SelectItem value="cause2">สาเหตุ 2</SelectItem>
                        <SelectItem value="cause3">สาเหตุ 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Second Column */}
                  <div className="space-y-6">
                    {/* Power Station */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">สถานีไฟฟ้า :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value="on" 
                              id="use-station" 
                              onDoubleClick={() => handleRadioDoubleClick("use-station")}
                            />
                            <Label htmlFor="use-station">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกสถานีไฟฟ้า" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="station1">สถานีไฟฟ้า 1</SelectItem>
                        <SelectItem value="station2">สถานีไฟฟ้า 2</SelectItem>
                        <SelectItem value="station3">สถานีไฟฟ้า 3</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Transformer */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">หม้อแปลงไฟฟ้า :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value="on" 
                              id="use-transformer" 
                              onDoubleClick={() => handleRadioDoubleClick("use-transformer")}
                            />
                            <Label htmlFor="use-transformer">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="transformer1">หม้อแปลงไฟฟ้า 1</SelectItem>
                        <SelectItem value="transformer2">หม้อแปลงไฟฟ้า 2</SelectItem>
                        <SelectItem value="transformer3">หม้อแปลงไฟฟ้า 3</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Usage State */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">สถานะการใช้งาน :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value="on" 
                              id="use-state" 
                              onDoubleClick={() => handleRadioDoubleClick("use-state")}
                            />
                            <Label htmlFor="use-state">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกสถานะการใช้งาน" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">ใช้งาน</SelectItem>
                        <SelectItem value="inactive">ไม่ใช้งาน</SelectItem>
                        <SelectItem value="maintenance">ซ่อมบำรุง</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Equipment */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">กลุ่มอุปกรณ์ :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value="on" 
                              id="use-equipment" 
                              onDoubleClick={() => handleRadioDoubleClick("use-equipment")}
                            />
                            <Label htmlFor="use-equipment">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกกลุ่มอุปกรณ์" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="group1">กลุ่ม 1</SelectItem>
                        <SelectItem value="group2">กลุ่ม 2</SelectItem>
                        <SelectItem value="group3">กลุ่ม 3</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Damage Level */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">ระดับความเสียหาย :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value="on" 
                              id="use-level" 
                              onDoubleClick={() => handleRadioDoubleClick("use-level")}
                            />
                            <Label htmlFor="use-level">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกระดับความเสียหาย" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">ต่ำ</SelectItem>
                        <SelectItem value="medium">กลาง</SelectItem>
                        <SelectItem value="high">สูง</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Management */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">การจัดการ :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value="on" 
                              id="use-management" 
                              onDoubleClick={() => handleRadioDoubleClick("use-management")}
                            />
                            <Label htmlFor="use-management">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกการจัดการ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manage1">การจัดการ 1</SelectItem>
                        <SelectItem value="manage2">การจัดการ 2</SelectItem>
                        <SelectItem value="manage3">การจัดการ 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Group By Section - Updated from "สรุปเงื่อนไข" to "เลือกการแบ่งกลุ่ม (แบ่งตาม)" */}
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h3 className="text-lg font-medium mb-2">เลือกการแบ่งกลุ่ม (แบ่งตาม)</h3>
                  <Select value={groupBy} onValueChange={setGroupBy}>
                    <SelectTrigger className="w-full focus-visible:ring-0 border border-gray-300">
                      <SelectValue placeholder="เลือกวิธีการแบ่งกลุ่ม" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region">เขต</SelectItem>
                      <SelectItem value="station">สถานีไฟฟ้า</SelectItem>
                      <SelectItem value="manufacturer">บริษัทผู้ผลิต</SelectItem>
                      <SelectItem value="age">อายุการใช้งาน</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    className="w-full max-w-md bg-blue-600 hover:bg-blue-700"
                  >
                    สร้างรายงาน
                  </Button>
                </div>

                {/* Report Results */}
                {showReport && (
                  <div className="mt-10 pt-8 border-t border-gray-200 animate-fade-in">
                    <h3 className="text-xl font-bold mb-6 text-center">รายงานความเสียหาย (แบ่งตาม{
                      groupBy === "region" ? "เขต" : 
                      groupBy === "station" ? "สถานีไฟฟ้า" : 
                      groupBy === "manufacturer" ? "บริษัทผู้ผลิต" : "อายุการใช้งาน"
                    })</h3>
                    
                    <Tabs defaultValue="pie" className="w-full">
                      <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                        <TabsTrigger value="pie" className="flex items-center justify-center gap-2">
                          <ChartPie size={16} />
                          แผนภูมิวงกลม
                        </TabsTrigger>
                        <TabsTrigger value="bar" className="flex items-center justify-center gap-2">
                          <BarChart3 size={16} />
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
                                    data={mockData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={true}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                  >
                                    {mockData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                                  <Tooltip formatter={(value) => [`จำนวน: ${value}`, groupBy === "region" ? "เขต" : 
                                    groupBy === "station" ? "สถานีไฟฟ้า" : 
                                    groupBy === "manufacturer" ? "บริษัทผู้ผลิต" : "อายุการใช้งาน"]} />
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
                                  data={mockData}
                                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip formatter={(value) => [`จำนวน: ${value}`, groupBy === "region" ? "เขต" : 
                                    groupBy === "station" ? "สถานีไฟฟ้า" : 
                                    groupBy === "manufacturer" ? "บริษัทผู้ผลิต" : "อายุการใช้งาน"]} />
                                  <Legend />
                                  <Bar dataKey="value" name="จำนวนความเสียหาย">
                                    {mockData.map((entry, index) => (
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
                              <th className="border border-slate-200 p-2">{
                                groupBy === "region" ? "เขต" : 
                                groupBy === "station" ? "สถานีไฟฟ้า" : 
                                groupBy === "manufacturer" ? "บริษัทผู้ผลิต" : "อายุการใช้งาน"
                              }</th>
                              <th className="border border-slate-200 p-2">จำนวน</th>
                              <th className="border border-slate-200 p-2">เปอร์เซ็นต์</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockData.map((item, index) => {
                              const total = mockData.reduce((acc, curr) => acc + curr.value, 0);
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
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DamageReport;
