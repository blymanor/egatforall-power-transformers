
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ElectricalTestUpload = () => {
  const [selectedTest, setSelectedTest] = useState("");
  const { toast } = useToast();
  
  const handleUpload = () => {
    if (!selectedTest) {
      toast({
        title: "กรุณาเลือกชนิดการทดสอบ",
        description: "โปรดเลือกประเภทการทดสอบทางไฟฟ้าก่อนอัปโหลด",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "อัปโหลดข้อมูลสำเร็จ",
      description: `ข้อมูลการทดสอบ ${selectedTest} ได้รับการอัปโหลดเรียบร้อยแล้ว`,
    });
  };

  // Electrical test types based on the provided image
  const electricalTestTypes = [
    { id: "dc-resistance", name: "DC Resistance Measurement" },
    { id: "exciting-current", name: "Exciting Current Measurement" },
    { id: "single-phase-impedance", name: "Single Phase Impedance Measurement" },
    { id: "three-phase-impedance", name: "Three Phase Impedance Measurement" },
    { id: "auto-transformer", name: "Auto Transformer Insulation" },
    { id: "two-winding", name: "Two Winding Insulation" },
    { id: "three-winding", name: "Three Winding Insulation" },
    { id: "ratio-measurement", name: "Ratio Measurement" },
    { id: "insulating-oil", name: "Insulating Oil" },
    { id: "arrester-testing", name: "Arrester Testing" },
    { id: "bushing-testing", name: "Bushing Testing" },
  ];

  return (
    <DashboardLayout>
      {/* Common page header with consistent styling */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-md sticky top-0 z-10 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Power Transformers</h1>
          <p className="text-gray-500">ระบบหม้อแปลงไฟฟ้ากำลัง</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        {/* Section title */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">อัปโหลดข้อมูลการทดสอบทางไฟฟ้า</h2>
          <p className="text-gray-600">อัปโหลดข้อมูลผลการทดสอบทางไฟฟ้าสำหรับหม้อแปลงไฟฟ้า</p>
        </div>
        
        <Card className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border-0">
          <CardContent className="p-6 space-y-6">
            <div className="bg-blue-100 rounded-md p-3 mb-4 border-l-4 border-blue-600">
              <h2 className="text-lg font-semibold text-center text-gray-800">การทดสอบทางไฟฟ้า</h2>
            </div>
            
            <div className="space-y-6 p-5 border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label htmlFor="electrical-test-type" className="font-medium text-gray-700">
                  ชนิดการทดสอบ:
                </label>
                <div className="col-span-2">
                  <Select value={selectedTest} onValueChange={setSelectedTest}>
                    <SelectTrigger className="w-full bg-white border border-gray-300 focus:border-blue-600">
                      <SelectValue placeholder="เลือกชนิดการทดสอบ" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {electricalTestTypes.map((test) => (
                        <SelectItem key={test.id} value={test.id} className="hover:bg-blue-50">
                          {test.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label htmlFor="transformer-id" className="font-medium text-gray-700">
                  รหัสหม้อแปลงไฟฟ้า:
                </label>
                <Input
                  id="transformer-id"
                  placeholder="ระบุรหัสหม้อแปลง"
                  className="col-span-2 bg-white border border-gray-300 focus:border-blue-600"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label htmlFor="test-date" className="font-medium text-gray-700">
                  วันที่ทดสอบ:
                </label>
                <Input
                  id="test-date"
                  type="date"
                  className="col-span-2 bg-white border border-gray-300 focus:border-blue-600"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label htmlFor="electrical-test-file" className="font-medium text-gray-700">
                  ไฟล์ข้อมูล:
                </label>
                <Input
                  id="electrical-test-file"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="col-span-2 bg-white border border-gray-300"
                />
              </div>
              
              <div className="w-full border-t border-gray-200 my-3"></div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleUpload} 
                  className="w-full md:w-1/3 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center font-medium"
                >
                  <Upload size={18} className="mr-2" />
                  อัปโหลดข้อมูล
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ElectricalTestUpload;
