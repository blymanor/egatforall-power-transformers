import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, BarChart, Pie, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from "recharts";

const DamageReport = () => {
  const { toast } = useToast();
  const [startAge, setStartAge] = useState("");
  const [endAge, setEndAge] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [region, setRegion] = useState("");
  const [station, setStation] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [oilType, setOilType] = useState("");
  const [equipmentParts, setEquipmentParts] = useState("");
  const [damageType, setDamageType] = useState("");
  const [severityLevel, setSeverityLevel] = useState("");
  const [damageLevel, setDamageLevel] = useState("");
  const [causeOfDamage, setCauseOfDamage] = useState("");
  const [maintenanceType, setMaintenanceType] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [showReport, setShowReport] = useState(false);
  
  // Mock data for charts - same colors as TransformerReport
  const mockChartData = [
    { name: 'ภาคเหนือ', value: 35, color: '#0088FE' },
    { name: 'ภาคตะวันออกเฉียงเหนือ', value: 25, color: '#00C49F' },
    { name: 'ภาคกลาง', value: 20, color: '#FFBB28' },
    { name: 'ภาคใต้', value: 15, color: '#FF8042' },
    { name: 'ภาคตะวันตก', value: 5, color: '#8884d8' },
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
          <h2 className="text-xl font-semibold text-gray-800">รายงานข้อมูลความเสียหาย</h2>
          <p className="text-gray-600">แสดงข้อมูลความเสียหายของหม้อแปลงตามเงื่อนไขต่าง ๆ</p>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6 md:p-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-black mb-2">รายงานตามผู้ใช้งานสำหรับข้อมูลความเสียหาย</h2>
              <p className="text-gray-600">กรุณาเลือกเงื่อนไขใน การสร้างรายงาน</p>
              <p className="text-blue-600 font-medium mt-1">เลือกเงื่อนไขในการสร้างรายงาน (เพียงเงื่อนไขใดเงื่อนไขหนึ่ง)</p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-16 gap-y-6 max-w-4xl mx-auto">
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">อายุเริ่มต้น:</Label>
                <div className="flex items-center gap-2">
                  <RadioGroup value="" onValueChange={() => {}} className="inline-flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="start-age" id="start-age" />
                      <Label htmlFor="start-age" className="text-gray-600">ไม่เลือกใช</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Select value={startAge} onValueChange={setStartAge}>
                  <SelectTrigger className="w-full focus-visible:ring-0 border border-gray-300">
                    <SelectValue placeholder="เลือกอายุเริ่มต้น" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {Array.from({length: 21}, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">อายุสิ้นสุด:</Label>
                <div className="flex items-center gap-2">
                  <RadioGroup value="" onValueChange={() => {}} className="inline-flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="end-age" id="end-age" />
                      <Label htmlFor="end-age" className="text-gray-600">ไม่เลือกใช</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Select value={endAge} onValueChange={setEndAge}>
                  <SelectTrigger className="w-full focus-visible:ring-0 border border-gray-300">
                    <SelectValue placeholder="เลือกอายุสิ้นสุด" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {Array.from({length: 21}, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">เขต :</Label>
                <div className="flex items-center gap-2">
                  <RadioGroup value="" onValueChange={() => {}} className="inline-flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="region-radio" id="region-radio" />
                      <Label htmlFor="region-radio" className="text-gray-600">ไม่เลือกใช</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="w-full focus-visible:ring-0 border border-gray-300">
                    <SelectValue placeholder="เลือกเขต" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="north">ภาคเหนือ</SelectItem>
                    <SelectItem value="northeast">ภาคตะวันออกเฉียงเหนือ</SelectItem>
                    <SelectItem value="central">ภาคกลาง</SelectItem>
                    <SelectItem value="south">ภาคใต้</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">สถานีไฟฟ้า :</Label>
                <div className="flex items-center gap-2">
                  <RadioGroup value="" onValueChange={() => {}} className="inline-flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="station-radio" id="station-radio" />
                      <Label htmlFor="station-radio" className="text-gray-600">ไม่เลือกใช</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Select value={station} onValueChange={setStation}>
                  <SelectTrigger className="w-full focus-visible:ring-0 border border-gray-300">
                    <SelectValue placeholder="เลือกสถานีไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="station1">สถานีไฟฟ้า 1</SelectItem>
                    <SelectItem value="station2">สถานีไฟฟ้า 2</SelectItem>
                    <SelectItem value="station3">สถานีไฟฟ้า 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">บริษัทผู้ผลิต :</Label>
                <div className="flex items-center gap-2">
                  <RadioGroup value="" onValueChange={() => {}} className="inline-flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="manufacturer-radio" id="manufacturer-radio" />
                      <Label htmlFor="manufacturer-radio" className="text-gray-600">ไม่เลือกใช</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Select value={manufacturer} onValueChange={setManufacturer}>
                  <SelectTrigger className="w-full focus-visible:ring-0 border border-gray-300">
                    <SelectValue placeholder="เลือกบริษัทผู้ผลิต" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="abb">ABB</SelectItem>
                    <SelectItem value="siemens">Siemens</SelectItem>
                    <SelectItem value="hitachi">Hitachi</SelectItem>
                    <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">หน้อยนปลงไฟฟ้า :</Label>
                <div className="flex items-center gap-2">
                  <RadioGroup value="" onValueChange={() => {}} className="inline-flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="oil-radio" id="oil-radio" />
                      <Label htmlFor="oil-radio" className="text-gray-600">ไม่เลือกใช</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Select value={oilType} onValueChange={setOilType}>
                  <SelectTrigger className="w-full focus-visible:ring-0 border border-gray-300">
                    <SelectValue placeholder="เลือกหน้อยนปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="type1">ประเภท 1</SelectItem>
                    <SelectItem value="type2">ประเภท 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">สถานะการใช้งาน :</Label>
                <div className="flex items-center gap-2">
                  <RadioGroup value="" onValueChange={() => {}} className="inline-flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="usage-radio" id="usage-radio" />
                      <Label htmlFor="usage-radio" className="text-gray-600">ไม่เลือกใช</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Select value={maintenanceType} onValueChange={setMaintenanceType}>
                  <SelectTrigger className="w-full focus-visible:ring-0 border border-gray-300">
                    <SelectValue placeholder="เลือกสถานะการใช้งาน" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="active">ใช้งานอยู่</SelectItem>
                    <SelectItem value="maintenance">บำรุงรักษา</SelectItem>
                    <SelectItem value="inactive">ไม่ใช้งาน</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">รายละเอียดความผิดปกติ :</Label>
                <div className="flex items-center gap-2">
                  <RadioGroup value="" onValueChange={() => {}} className="inline-flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="abnormal-radio" id="abnormal-radio" />
                      <Label htmlFor="abnormal-radio" className="text-gray-600">ไม่เลือกใช</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Select value={damageType} onValueChange={setDamageType}>
                  <SelectTrigger className="w-full focus-visible:ring-0 border border-gray-300">
                    <SelectValue placeholder="เลือกรายละเอียดความผิดปกติ" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="electrical">ระบบไฟฟ้า</SelectItem>
                    <SelectItem value="mechanical">ระบบกล</SelectItem>
                    <SelectItem value="thermal">ระบบความร้อน</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">กลุ่มอุปกรณ์ :</Label>
                <div className="flex items-center gap-2">
                  <RadioGroup value="" onValueChange={() => {}} className="inline-flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="equipment-radio" id="equipment-radio" />
                      <Label htmlFor="equipment-radio" className="text-gray-600">ไม่เลือกใช</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Select value={equipmentParts} onValueChange={setEquipmentParts}>
                  <SelectTrigger className="w-full focus-visible:ring-0 border border-gray-300">
                    <SelectValue placeholder="เลือกกลุ่มอุปกรณ์" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="primary">อุปกรณ์หลัก</SelectItem>
                    <SelectItem value="secondary">อุปกรณ์รอง</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">ขั้นส่วนที่เสียหาย :</Label>
                <div className="flex items-center gap-2">
                  <RadioGroup value="" onValueChange={() => {}} className="inline-flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="damage-part-radio" id="damage-part-radio" />
                      <Label htmlFor="damage-part-radio" className="text-gray-600">ไม่เลือกใช</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Select value={damageLevel} onValueChange={setDamageLevel}>
                  <SelectTrigger className="w-full focus-visible:ring-0 border border-gray-300">
                    <SelectValue placeholder="เลือกขั้นส่วนที่เสียหาย" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="minor">เล็กน้อย</SelectItem>
                    <SelectItem value="moderate">ปานกลาง</SelectItem>
                    <SelectItem value="severe">รุนแรง</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">ระดับความเสียหาย :</Label>
                <div className="flex items-center gap-2">
                  <RadioGroup value="" onValueChange={() => {}} className="inline-flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="severity-radio" id="severity-radio" />
                      <Label htmlFor="severity-radio" className="text-gray-600">ไม่เลือกใช</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Select value={severityLevel} onValueChange={setSeverityLevel}>
                  <SelectTrigger className="w-full focus-visible:ring-0 border border-gray-300">
                    <SelectValue placeholder="เลือกระดับความเสียหาย" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="low">ต่ำ</SelectItem>
                    <SelectItem value="medium">กลาง</SelectItem>
                    <SelectItem value="high">สูง</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">สาเหตุที่เกิดขึ้นรง :</Label>
                <div className="flex items-center gap-2">
                  <RadioGroup value="" onValueChange={() => {}} className="inline-flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cause-radio" id="cause-radio" />
                      <Label htmlFor="cause-radio" className="text-gray-600">ไม่เลือกใช</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Select value={causeOfDamage} onValueChange={setCauseOfDamage}>
                  <SelectTrigger className="w-full focus-visible:ring-0 border border-gray-300">
                    <SelectValue placeholder="เลือกสาเหตุที่เกิดขึ้นรง" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="aging">อายุการใช้งาน</SelectItem>
                    <SelectItem value="overload">โหลดเกิน</SelectItem>
                    <SelectItem value="weather">สภาพอากาศ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">การจัดการ :</Label>
                <div className="flex items-center gap-2">
                  <RadioGroup value="" onValueChange={() => {}} className="inline-flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="management-radio" id="management-radio" />
                      <Label htmlFor="management-radio" className="text-gray-600">ไม่เลือกใช</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Select value={groupBy} onValueChange={setGroupBy}>
                  <SelectTrigger className="w-full focus-visible:ring-0 border border-gray-300">
                    <SelectValue placeholder="เลือกการจัดการ" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="repair">ซ่อมแซม</SelectItem>
                    <SelectItem value="replace">เปลี่ยนใหม่</SelectItem>
                    <SelectItem value="monitor">ติดตามผล</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-8">
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">เลือกการแบ่งกลุ่ม (แบ่งตาม)</Label>
                <Select value={groupBy} onValueChange={setGroupBy}>
                  <SelectTrigger className="w-full max-w-md mx-auto focus-visible:ring-0 border border-gray-300">
                    <SelectValue placeholder="เขต" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="region">เขต</SelectItem>
                    <SelectItem value="station">สถานีไฟฟ้า</SelectItem>
                    <SelectItem value="manufacturer">บริษัทผู้ผลิต</SelectItem>
                    <SelectItem value="severity">ระดับความรุนแรง</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleGenerateReport}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
              >
                สร้างรายงาน
              </Button>
            </div>
            
            {showReport && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold mb-4">ผลลัพธ์รายงานความเสียหาย</h3>
                
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
                              <Tooltip formatter={(value) => [`จำนวน: ${value}`, 'จำนวนครั้งความเสียหาย']} />
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
                              <Tooltip formatter={(value) => [`จำนวน: ${value}`, 'จำนวนครั้งความเสียหาย']} />
                              <Legend />
                              <Bar dataKey="value" name="จำนวนครั้งความเสียหาย">
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
                          <th className="border border-slate-200 p-2">เขต/หมวดหมู่</th>
                          <th className="border border-slate-200 p-2">จำนวนครั้งความเสียหาย</th>
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

export default DamageReport;
