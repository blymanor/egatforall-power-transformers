
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

const OilTestUpload = () => {
  const [selectedTest, setSelectedTest] = useState("");
  const { toast } = useToast();
  
  const handleUpload = () => {
    if (!selectedTest) {
      toast({
        title: "กรุณาเลือกชนิดการทดสอบ",
        description: "โปรดเลือกประเภทการทดสอบทางน้ำมันก่อนอัปโหลด",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "อัปโหลดข้อมูลสำเร็จ",
      description: `ข้อมูลการทดสอบ ${selectedTest} ได้รับการอัปโหลดเรียบร้อยแล้ว`,
    });
  };

  // Oil test types based on the provided image
  const oilTestTypes = [
    { id: "oil-aging", name: "Oil Aging" },
    { id: "oil-dga", name: "Oil DGA" },
    { id: "oil-furan", name: "Oil Furan" },
    { id: "oil-contamination", name: "Oil Contamination" },
    { id: "oltc-dga", name: "OLTC DGA" },
    { id: "oltc-contamination", name: "OLTC Oil Contamination" },
  ];

  return (
    <DashboardLayout>
      {/* Common page header with consistent styling and blue color */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-md sticky top-0 z-10 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-[#0442AF]">Power Transformers</h1>
          <p className="text-gray-500">ระบบหม้อแปลงไฟฟ้ากำลัง</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        {/* Section title */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">อัปโหลดข้อมูลการทดสอบทางน้ำมัน</h2>
          <p className="text-gray-600">อัปโหลดข้อมูลผลการทดสอบทางน้ำมันสำหรับหม้อแปลงไฟฟ้า</p>
        </div>
        
        <Card className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border-0">
          <CardContent className="p-6 space-y-6">
            <div className="bg-amber-50 rounded-md p-3 mb-4 border-l-4 border-amber-500">
              <h2 className="text-lg font-semibold text-center text-gray-800">การทดสอบทางน้ำมัน</h2>
            </div>
            
            <div className="space-y-6 p-5 border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label htmlFor="oil-test-type" className="font-medium text-gray-700">
                  ชนิดการทดสอบ:
                </label>
                <div className="col-span-2">
                  <Select value={selectedTest} onValueChange={setSelectedTest}>
                    <SelectTrigger className="w-full bg-white border border-gray-300 focus:border-amber-500">
                      <SelectValue placeholder="เลือกชนิดการทดสอบ" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {oilTestTypes.map((test) => (
                        <SelectItem key={test.id} value={test.id} className="hover:bg-amber-50">
                          {test.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label htmlFor="oil-test-file" className="font-medium text-gray-700">
                  ไฟล์ข้อมูล:
                </label>
                <div className="col-span-2">
                  <Input
                    id="oil-test-file"
                    type="file"
                    accept=".xlsx,.xls"
                    className="bg-white border border-gray-300"
                  />
                  <p className="text-gray-500 text-sm mt-1">รองรับไฟล์ Excel เท่านั้น</p>
                </div>
              </div>
              
              <div className="w-full border-t border-gray-200 my-3"></div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleUpload} 
                  className="w-full md:w-1/3 bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center font-medium"
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

export default OilTestUpload;
