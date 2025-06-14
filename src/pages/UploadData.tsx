
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const UploadData = () => {
  const { toast } = useToast();
  
  const handleUpload = () => {
    toast({
      title: "อัปโหลดข้อมูลสำเร็จ",
      description: "ข้อมูลของคุณได้รับการอัปโหลดเรียบร้อยแล้ว",
    });
  };

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
          <h2 className="text-xl font-semibold text-gray-800">Upload ข้อมูล</h2>
          <p className="text-gray-600">อัปโหลดข้อมูลสำหรับการวิเคราะห์และประมวลผล</p>
        </div>
        
        <Card className="bg-white shadow-md rounded-lg overflow-hidden border-0">
          <CardContent className="p-6">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid grid-cols-1 md:grid-cols-3 bg-gray-100 p-1 rounded-lg mb-4">
                <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  ข้อมูลทั่วไป
                </TabsTrigger>
                <TabsTrigger value="csv" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  ไฟล์ CSV
                </TabsTrigger>
                <TabsTrigger value="xl" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  ไฟล์ Excel
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="mt-4">
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-md p-3 mb-4 border-l-4 border-blue-500">
                    <h2 className="text-lg font-semibold text-center text-gray-800">อัปโหลดข้อมูลพื้นฐาน</h2>
                  </div>
                  
                  <div className="space-y-4 p-5 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <label htmlFor="file-upload" className="font-medium text-gray-700">
                        เลือกไฟล์:
                      </label>
                      <Input
                        id="file-upload"
                        type="file"
                        className="col-span-2 bg-white border border-gray-300"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <label htmlFor="upload-type" className="font-medium text-gray-700">
                        ประเภทข้อมูล:
                      </label>
                      <select
                        id="upload-type"
                        className="col-span-2 h-10 px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">เลือกประเภทข้อมูล</option>
                        <option value="transformer">ข้อมูลหม้อแปลง</option>
                        <option value="maintenance">ข้อมูลบำรุงรักษา</option>
                        <option value="test">ข้อมูลผลทดสอบ</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-center mt-6">
                      <Button 
                        onClick={handleUpload} 
                        className="w-full md:w-1/3 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center font-medium"
                      >
                        <Upload size={18} className="mr-2" />
                        อัปโหลด
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="csv" className="mt-4">
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-md p-3 mb-4 border-l-4 border-blue-500">
                    <h2 className="text-lg font-semibold text-center text-gray-800">อัปโหลดไฟล์ CSV</h2>
                  </div>
                  
                  <div className="space-y-4 p-5 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <label htmlFor="csv-file" className="font-medium text-gray-700">
                        เลือกไฟล์ CSV:
                      </label>
                      <Input
                        id="csv-file"
                        type="file"
                        accept=".csv"
                        className="col-span-2 bg-white border border-gray-300"
                      />
                    </div>
                    
                    <div className="flex justify-center mt-6">
                      <Button 
                        onClick={handleUpload} 
                        className="w-full md:w-1/3 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center font-medium"
                      >
                        <Upload size={18} className="mr-2" />
                        อัปโหลด CSV
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="xl" className="mt-4">
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-md p-3 mb-4 border-l-4 border-blue-500">
                    <h2 className="text-lg font-semibold text-center text-gray-800">อัปโหลดไฟล์ Excel</h2>
                  </div>
                  
                  <div className="space-y-4 p-5 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <label htmlFor="excel-file" className="font-medium text-gray-700">
                        เลือกไฟล์ Excel:
                      </label>
                      <Input
                        id="excel-file"
                        type="file"
                        accept=".xlsx,.xls"
                        className="col-span-2 bg-white border border-gray-300"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <label htmlFor="sheet-name" className="font-medium text-gray-700">
                        ชื่อชีท:
                      </label>
                      <Input
                        id="sheet-name"
                        placeholder="ระบุชื่อชีท (ไม่จำเป็น)"
                        className="col-span-2 bg-white border border-gray-300"
                      />
                    </div>
                    
                    <div className="flex justify-center mt-6">
                      <Button 
                        onClick={handleUpload} 
                        className="w-full md:w-1/3 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center font-medium"
                      >
                        <Upload size={18} className="mr-2" />
                        อัปโหลด Excel
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UploadData;
