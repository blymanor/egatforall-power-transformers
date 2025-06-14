
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Save } from "lucide-react";
import { toast } from "sonner";

const OilReceiptDurationPage = () => {
  const [duration, setDuration] = useState('');

  const handleSave = () => {
    if (!duration) {
      toast.error("กรุณากรอกระยะเวลาที่ได้รับน้ำมัน");
      return;
    }

    // Mock save - ในการใช้งานจริงจะบันทึกลงฐานข้อมูล
    toast.success("บันทึกข้อมูลสำเร็จ");
    console.log("Duration saved:", duration);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            ระยะเวลาที่ได้รับน้ำมัน
          </h1>
          <p className="text-gray-500">กำหนดระยะเวลาในการรับน้ำมันหม้อแปลงไฟฟ้า</p>
        </div>

        {/* Form Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-md border-none">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
              <CardTitle className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                กำหนดระยะเวลา
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-lg font-medium">ระยะเวลาที่ได้รับน้ำมัน :</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      placeholder="กรอกจำนวนวัน"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="text-lg p-4"
                    />
                    <span className="text-lg font-medium text-gray-600">วัน</span>
                  </div>
                </div>

                <div className="flex justify-center pt-6">
                  <Button 
                    onClick={handleSave} 
                    className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-lg"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    บันทึกข้อมูล
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OilReceiptDurationPage;
