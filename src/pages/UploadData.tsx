
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";

const UploadData = () => {
  const [testType, setTestType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!testType) {
      toast({
        title: "กรุณาเลือกชนิดการทดสอบ",
        variant: "destructive",
      });
      return;
    }

    if (!file) {
      toast({
        title: "กรุณาเลือกไฟล์",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "อัพโหลดไฟล์สำเร็จ",
      description: `อัพโหลดไฟล์ ${file.name} สำหรับ ${testType} เรียบร้อยแล้ว`,
    });
  };

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-black">Upload ข้อมูล</h1>
          <p className="text-gray-500">อัพโหลดข้อมูลการทดสอบหม้อแปลงไฟฟ้า</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="max-w-2xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <div className="bg-[#f0f4fa] rounded-md p-3 mb-4">
              <h2 className="text-lg font-semibold text-center text-gray-800">อัพโหลดไฟล์ข้อมูล</h2>
            </div>

            <div className="space-y-6 p-4 border border-gray-100 rounded-lg bg-white shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <label htmlFor="test-type" className="font-medium text-gray-700 col-span-1">
                  ชนิดการทดสอบ :
                </label>
                <div className="col-span-2">
                  <Select value={testType} onValueChange={setTestType}>
                    <SelectTrigger className="w-full bg-white border border-gray-200">
                      <SelectValue placeholder="Please Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electrical-test">Electrical Test</SelectItem>
                      <SelectItem value="oil-test">Oil Test</SelectItem>
                      <SelectItem value="visual-inspection">Visual Inspection</SelectItem>
                      <SelectItem value="oltc">OLTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                <label htmlFor="file-upload" className="font-medium text-gray-700">
                  ไฟล์ข้อมูล :
                </label>
                <div className="col-span-2 flex gap-2">
                  <div className="w-1/2 bg-gray-100 border border-gray-200 rounded py-2 px-3 text-center text-sm">
                    Choose File
                  </div>
                  <div className="w-1/2 border border-gray-200 rounded py-2 px-3 text-center text-sm text-gray-500">
                    {file ? file.name : "No File Chosen"}
                  </div>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className="w-full border-t border-gray-200 my-3"></div>

              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleUpload} 
                  className="w-full md:w-1/3 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2"
                >
                  <Upload size={16} />
                  UPLOAD
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UploadData;
