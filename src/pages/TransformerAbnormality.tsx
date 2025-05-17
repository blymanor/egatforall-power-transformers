
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const TransformerAbnormality = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleGenerate = () => {
    setDialogOpen(true);
  };

  const handleSaveReport = () => {
    setDialogOpen(false);
    toast({
      title: "Report Generated",
      description: "รายงานความผิดปกติของหม้อแปลงไฟฟ้าถูกสร้างเรียบร้อยแล้ว",
    });
  };

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0442AF]">Power Transformers</h1>
          <p className="text-gray-500">ระบบหม้อแปลงไฟฟ้ากำลัง</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        {/* Section title without icon */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">ความผิดปกติของหม้อแปลง</h2>
          <p className="text-gray-600">การบันทึกและจัดการข้อมูลความผิดปกติของหม้อแปลงไฟฟ้า</p>
        </div>

        <Card className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border-0">
          <CardContent className="p-6 space-y-6">
            <div className="bg-blue-50 rounded-md p-3 mb-4 border-l-4 border-blue-500">
              <h2 className="text-lg font-semibold text-center text-gray-800">รายงานความผิดปกติของหม้อแปลงไฟฟ้า</h2>
            </div>

            <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Device No.
                  </label>
                  <Input placeholder="Enter device number" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Equipment No.
                  </label>
                  <Input placeholder="Enter equipment number" className="w-full" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ประเภทความผิดปกติ
                  </label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="เลือกประเภทความผิดปกติ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electrical">ทางไฟฟ้า</SelectItem>
                      <SelectItem value="mechanical">ทางกล</SelectItem>
                      <SelectItem value="thermal">ทางความร้อน</SelectItem>
                      <SelectItem value="other">อื่นๆ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    วันที่พบความผิดปกติ
                  </label>
                  <Input type="date" className="w-full" />
                </div>
              </div>

              <div className="w-full border-t border-gray-200 my-3"></div>

              <div className="flex justify-end">
                <Button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Generate Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal Dialog for Report Generation */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">รายงานความผิดปกติของหม้อแปลงไฟฟ้า</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เลขคำสั่งปฏิบัติงาน
              </label>
              <Input placeholder="กรุณากรอกเลขคำสั่งปฏิบัติงาน" className="w-full" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                รายละเอียดความผิดปกติ
              </label>
              <Textarea
                placeholder="กรุณากรอกรายละเอียดความผิดปกติของหม้อแปลงไฟฟ้า"
                className="w-full min-h-[150px]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                การดำเนินการที่ผ่านมา
              </label>
              <Textarea
                placeholder="กรุณากรอกรายละเอียดการดำเนินการที่ผ่านมา"
                className="w-full min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button 
              onClick={handleSaveReport} 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              บันทึกรายงาน
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default TransformerAbnormality;
