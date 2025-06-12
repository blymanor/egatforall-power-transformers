
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TransformerAbnormality = () => {
  const { toast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedTransformer, setSelectedTransformer] = useState("");

  const handleGenerateReport = () => {
    if (!selectedRegion || !selectedTransformer) {
      toast({
        title: "กรุณาเลือกข้อมูลให้ครบถ้วน",
        description: "กรุณาเลือกเขตและหม้อแปลงไฟฟ้า",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "กำลังสร้างรายงาน",
      description: "กรุณารอสักครู่...",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-[#f0f4fa] min-h-screen">
        {/* Header with blue left border */}
        <div className="mb-8">
          <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 py-4 rounded-r-lg">
            <h1 className="text-2xl font-bold text-gray-800 text-center">รายงานความผิดปกติของหม้อแปลงไฟฟ้า</h1>
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="max-w-4xl mx-auto shadow-lg rounded-xl overflow-hidden border-0">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - เขต */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-700 mb-6">เขต</h3>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="h-12 text-lg border-2 border-gray-200 rounded-lg">
                    <SelectValue placeholder="เลือกเขต" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg">
                    <SelectItem value="north">เหนือ</SelectItem>
                    <SelectItem value="northeast">ตะวันออกเฉียงเหนือ</SelectItem>
                    <SelectItem value="central">กลาง</SelectItem>
                    <SelectItem value="south">ใต้</SelectItem>
                    <SelectItem value="east">ตะวันออก</SelectItem>
                    <SelectItem value="west">ตะวันตก</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Right Column - หม้อแปลงไฟฟ้า */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-700 mb-6">หม้อแปลงไฟฟ้า</h3>
                <Select value={selectedTransformer} onValueChange={setSelectedTransformer}>
                  <SelectTrigger className="h-12 text-lg border-2 border-gray-200 rounded-lg">
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg">
                    <SelectItem value="transformer1">หม้อแปลง T1 - 115/22 kV</SelectItem>
                    <SelectItem value="transformer2">หม้อแปลง T2 - 230/115 kV</SelectItem>
                    <SelectItem value="transformer3">หม้อแปลง T3 - 500/230 kV</SelectItem>
                    <SelectItem value="transformer4">หม้อแปลง T4 - 115/22 kV</SelectItem>
                    <SelectItem value="transformer5">หม้อแปลง T5 - 230/115 kV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Generate Report Button */}
            <div className="flex justify-center mt-12">
              <Button 
                onClick={handleGenerateReport}
                className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransformerAbnormality;
