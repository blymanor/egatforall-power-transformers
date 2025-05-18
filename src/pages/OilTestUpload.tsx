
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, File, CheckCircle } from "lucide-react";

const OilTestUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select an Excel file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulating upload
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
      toast({
        title: "Upload Successful",
        description: "Your oil test data has been uploaded successfully.",
      });
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        {/* Section title with larger text */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">อัปโหลดข้อมูลการทดสอบทางน้ำมัน</h2>
          <p className="text-lg text-gray-600">อัปโหลดข้อมูลผลการทดสอบทางน้ำมันสำหรับหม้อแปลงไฟฟ้า</p>
        </div>

        <Card className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border-0">
          <CardContent className="p-8 space-y-6">
            <div className="bg-blue-50 rounded-md p-4 mb-6 border-l-4 border-blue-500">
              <h2 className="text-xl font-semibold text-center text-gray-800">อัปโหลดข้อมูล</h2>
            </div>

            <div className="space-y-8 p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
                <label htmlFor="test-type" className="text-lg font-medium text-gray-700">
                  ชนิดการทดสอบ:
                </label>
                <Select>
                  <SelectTrigger id="test-type" className="w-full h-14 text-lg">
                    <SelectValue placeholder="เลือกชนิดการทดสอบ" />
                  </SelectTrigger>
                  <SelectContent className="text-lg">
                    <SelectItem value="oil-aging">Oil Aging</SelectItem>
                    <SelectItem value="oil-dga">Oil DGA</SelectItem>
                    <SelectItem value="oil-furan">Oil Furan</SelectItem>
                    <SelectItem value="oil-contamination">Oil Contamination</SelectItem>
                    <SelectItem value="oltc-dga">OLTC DGA</SelectItem>
                    <SelectItem value="oltc-oil-contamination">OLTC Oil Contamination</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 items-center gap-6">
                <label className="block text-lg font-medium text-gray-700">
                  อัปโหลดไฟล์ :
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors flex flex-col items-center justify-center gap-4">
                  {!isUploaded ? (
                    <>
                      <Upload className="h-14 w-14 text-blue-500" />
                      <div className="text-lg text-gray-600">
                        <p className="font-medium">คลิกเพื่อเลือกไฟล์หรือลากและวางที่นี่</p>
                        <p className="text-sm text-gray-500 mt-1">รองรับไฟล์ Excel เท่านั้น (.xlsx, .xls)</p>
                      </div>
                      <Input
                        type="file"
                        id="file-upload"
                        accept=".xlsx,.xls"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md text-lg inline-block"
                      >
                        เลือกไฟล์
                      </label>
                      {file && (
                        <div className="mt-4 flex items-center gap-2 text-gray-700">
                          <File className="h-5 w-5" />
                          <span className="text-lg">{file.name}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <CheckCircle className="h-16 w-16 text-green-500" />
                      <p className="text-xl font-medium text-green-600">อัปโหลดไฟล์สำเร็จ</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleUpload}
                  disabled={!file || isUploading || isUploaded}
                  className="w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg py-6"
                >
                  {isUploading ? "กำลังอัปโหลด..." : "อัปโหลดข้อมูล"}
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
