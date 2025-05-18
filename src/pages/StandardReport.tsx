
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const StandardReport = () => {
  const { toast } = useToast();
  const [region, setRegion] = useState("");
  const [reportType, setReportType] = useState("");
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
      pageTitle="รายงานมาตรฐาน"
      pageDescription="Standard Reports"
    >
      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-lg font-bold mb-6">กรุณาเลือกเงื่อนไขในการสร้างรายงาน</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-6">
                <div className="space-y-4">
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
                  
                  <div className="flex items-center gap-4">
                    <Label className="w-36 text-gray-700 font-medium">ประเภทรายงาน :</Label>
                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger className="w-full focus-visible:ring-0 border border-gray-300">
                        <SelectValue placeholder="เลือกประเภทรายงาน" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="oil">รายงานผลการทดสอบน้ำมัน</SelectItem>
                        <SelectItem value="electrical">รายงานผลการทดสอบทางไฟฟ้า</SelectItem>
                        <SelectItem value="maintenance">รายงานการบำรุงรักษา</SelectItem>
                        <SelectItem value="defects">รายงานความผิดปกติ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="block text-gray-700 font-medium mb-2">ช่วงอายุการใช้งาน (ปี) :</Label>
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
                    </div>
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
              
              {/* Placeholder for additional options or preview */}
              <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                <h3 className="text-blue-800 font-medium mb-3">คำแนะนำ</h3>
                <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                  <li>เลือกเงื่อนไขที่ต้องการเพื่อสร้างรายงาน</li>
                  <li>สามารถเลือกช่วงอายุการใช้งานของหม้อแปลงได้</li>
                  <li>รายงานที่สร้างสามารถบันทึกเป็น PDF ได้</li>
                  <li>ผลลัพธ์จะแสดงหลังจากกดปุ่ม "สร้างรายงาน"</li>
                </ul>
              </div>
            </div>
            
            {showReport && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold mb-4">ผลลัพธ์รายงาน</h3>
                <div className="bg-white border border-gray-200 rounded-md p-4">
                  <p className="text-center text-gray-500 py-8">
                    ตัวอย่างรายงาน - จะแสดงข้อมูลตามเงื่อนไขที่เลือก
                  </p>
                </div>
                
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

export default StandardReport;
