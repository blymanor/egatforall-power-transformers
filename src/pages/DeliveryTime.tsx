
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const DeliveryTime = () => {
  const [deliveryDays, setDeliveryDays] = useState('90');

  const handleSave = () => {
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: "ระยะเวลาที่ได้รับน้ำมันถูกบันทึกแล้ว",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-[#0442AF] mb-8">ระยะเวลาที่ได้รับน้ำมัน</h1>
          
          <div className="bg-white border rounded-lg p-8 shadow-sm">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Label className="text-lg">ระยะเวลาที่ได้รับน้ำมัน :</Label>
              <Input
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                className="w-32 text-center text-lg"
                placeholder="90"
              />
              <span className="text-lg">วัน</span>
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={handleSave}
                className="px-12 py-3 text-lg bg-blue-600 hover:bg-blue-700"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeliveryTime;
