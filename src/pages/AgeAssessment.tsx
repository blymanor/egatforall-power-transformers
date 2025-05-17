
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const AgeAssessment = () => {
  const [dpLimit, setDpLimit] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "ค่า DP Limit บันทึกเรียบร้อย",
      description: `บันทึกค่า DP Limit: ${dpLimit} เรียบร้อยแล้ว`,
    });
  };

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-black">ค่าประเมินอายุ</h1>
          <p className="text-gray-500">การจัดการค่าประเมินอายุการใช้งานหม้อแปลงไฟฟ้า</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="max-w-2xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <div className="bg-[#f0f4fa] rounded-md p-3 mb-4">
              <h2 className="text-lg font-semibold text-center text-gray-800">ค่าการประเมินอายุ</h2>
            </div>

            <div className="space-y-6 p-4 border border-gray-100 rounded-lg bg-white shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                <label htmlFor="dp-limit" className="font-medium text-gray-700">
                  ค่า DP Limit :
                </label>
                <Input
                  id="dp-limit"
                  value={dpLimit}
                  onChange={(e) => setDpLimit(e.target.value)}
                  placeholder="กรุณาระบุค่า DP Limit"
                  className="w-full bg-white border border-gray-200 focus:border-blue-500"
                />
              </div>

              <div className="w-full border-t border-gray-200 my-3"></div>

              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleSave} 
                  className="w-full md:w-1/3 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Save
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AgeAssessment;
