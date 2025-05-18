import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DamageReport = () => {
  const { toast } = useToast();
  const [region, setRegion] = useState("");
  const [minAge, setMinAge] = useState("0");
  const [maxAge, setMaxAge] = useState("20");
  const [showReport, setShowReport] = useState(false);
  
  const handleGenerateReport = () => {
    toast({
      title: "สร้างรายงานสำเร็จ",
      description: "กำลังแสดงผลรายงานตามเงื่อนไขที่เลือก",
    });
    setShowReport(true);
  };

  return (
    <DashboardLayout
      pageTitle="รายงานข้อมูลความเสียหาย"
      pageDescription="Damage Data Report"
    >
      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-lg font-bold mb-6">กรุณาเลือกเงื่อนไขในการสร้างรายงานข้อมูลความเสียหาย</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Label className="w-36 text-gray-700 font-medium pt-2">เงื่อนไขทางอายุการใช้งาน :</Label>
                    <div className="space-y-2 flex-1">
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Label className="text-gray-700">จาก</Label>
                              <Select value={minAge} onValueChange={setMinAge}>
                                <SelectTrigger className="w-20 focus-visible:ring-0 border border-gray-300">
                                  <SelectValue placeholder="0" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  {Array.from({length: 51}, (_, i) => (
                                    <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Label className="text-gray-700">ถึง</Label>
                              <Select value={maxAge} onValueChange={setMaxAge}>
                                <SelectTrigger className="w-20 focus-visible:ring-0 border border-gray-300">
                                  <SelectValue placeholder="20" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  {Array.from({length: 51}, (_, i) => (
                                    <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <Label className="text-gray-700">ปี</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Label className="w-36 text-gray-700 font-medium">เขต :</Label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger className="w-full focus-visible:ring-0 border border-gray-300">
                        <SelectValue placeholder="เลือกเขต" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="all">ทั้งหมด</SelectItem>
                        <SelectItem value="north">ภาคเหนือ</SelectItem>
                        <SelectItem value="northeast">ภาคตะวันออกเฉียงเหนือ</SelectItem>
                        <SelectItem value="central">ภาคกลาง</SelectItem>
                        <SelectItem value="south">ภาคใต้</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleGenerateReport}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    สร้างรายงาน
                  </Button>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                <h3 className="text-blue-800 font-medium mb-3">คำแนะนำ</h3>
                <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                  <li>เลือกช่วงอายุการใช้งานของหม้อแปลงที่ต้องการสร้างรายงาน</li>
                  <li>เลือกเขตที่ต้องการแสดงข้อมูลความเสียหาย</li>
                  <li>รายงานแสดงสถิติความเสียหายตามอายุการใช้งานและพื้นที่</li>
                  <li>ผลลัพธ์จะแสดงหลังจากกดปุ่ม "สร้างรายงาน"</li>
                </ul>
              </div>
            </div>
            
            {showReport && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold mb-4">รายงานความเสียหายตามช่วงอายุการใช้งาน</h3>
                
                <Tabs defaultValue="table" className="w-full">
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                    <TabsTrigger value="table">ตาราง</TabsTrigger>
                    <TabsTrigger value="chart">แผนภูมิ</TabsTrigger>
                    <TabsTrigger value="details">รายละเอียด</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="table" className="mt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-blue-50">
                            <th className="border border-gray-300 p-2">ช่วงอายุ (ปี)</th>
                            <th className="border border-gray-300 p-2">จำนวนความเสียหาย</th>
                            <th className="border border-gray-300 p-2">เปอร์เซ็นต์</th>
                            <th className="border border-gray-300 p-2">ค่าเฉลี่ยต่อเครื่อง</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 p-2 text-center">0-5</td>
                            <td className="border border-gray-300 p-2 text-center">12</td>
                            <td className="border border-gray-300 p-2 text-center">15%</td>
                            <td className="border border-gray-300 p-2 text-center">0.4</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2 text-center">6-10</td>
                            <td className="border border-gray-300 p-2 text-center">18</td>
                            <td className="border border-gray-300 p-2 text-center">22.5%</td>
                            <td className="border border-gray-300 p-2 text-center">0.6</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2 text-center">11-15</td>
                            <td className="border border-gray-300 p-2 text-center">25</td>
                            <td className="border border-gray-300 p-2 text-center">31.25%</td>
                            <td className="border border-gray-300 p-2 text-center">0.8</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2 text-center">16-20</td>
                            <td className="border border-gray-300 p-2 text-center">16</td>
                            <td className="border border-gray-300 p-2 text-center">20%</td>
                            <td className="border border-gray-300 p-2 text-center">0.7</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2 text-center">21+</td>
                            <td className="border border-gray-300 p-2 text-center">9</td>
                            <td className="border border-gray-300 p-2 text-center">11.25%</td>
                            <td className="border border-gray-300 p-2 text-center">1.1</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="chart" className="mt-4">
                    <div className="bg-white border border-gray-200 rounded-md p-4">
                      <p className="text-center text-gray-500 py-8">
                        แผนภูมิแสดงสัดส่วนความเสียหายตามช่วงอายุ
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-4">
                    <div className="bg-white border border-gray-200 rounded-md p-4">
                      <p className="text-center text-gray-500 py-8">
                        รายละเอียดความเสียหายแยกตามประเภทและช่วงอายุ
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-end mt-4">
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
