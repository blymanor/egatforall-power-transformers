
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
      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        {/* Section title - increased font size */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">ค่าประเมินอายุ</h2>
          <p className="text-lg text-gray-600">การจัดการค่าประเมินอายุการใช้งานหม้อแปลงไฟฟ้า</p>
        </div>
        
        <Card className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border-0">
          <CardContent className="p-8 space-y-6">
            <div className="bg-blue-50 rounded-md p-4 mb-6 border-l-4 border-blue-500">
              <h2 className="text-xl font-semibold text-center text-gray-800">ค่าการประเมินอายุ</h2>
            </div>

            <div className="space-y-8 p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
                <label htmlFor="dp-limit" className="font-medium text-gray-700 text-lg">
                  ค่า DP Limit :
                </label>
                <Input
                  id="dp-limit"
                  value={dpLimit}
                  onChange={(e) => setDpLimit(e.target.value)}
                  placeholder="กรุณาระบุค่า DP Limit"
                  className="w-full bg-white border border-gray-300 focus:border-blue-500 text-lg p-6 h-auto"
                />
              </div>

              <div className="w-full border-t border-gray-200 my-4"></div>

              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleSave} 
                  className="w-full md:w-1/3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg py-6"
                >
                  บันทึก
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
