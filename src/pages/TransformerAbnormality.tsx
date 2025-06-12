
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      title: "สร้างรายงานสำเร็จ",
      description: "รายงานความผิดปกติของหม้อแปลงไฟฟ้าถูกสร้างเรียบร้อยแล้ว"
    });
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-8 bg-[#f0f4fa]">
        {/* Header with blue left border */}
        <div className="mb-8">
          <div className="border-l-4 border-blue-500 pl-4">
            <h1 className="text-xl font-bold text-gray-800">รายงานความผิดปกติของหม้อแปลงไฟฟ้า</h1>
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="mx-auto shadow-lg rounded-xl overflow-hidden border-0 max-w-4xl">
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* เขต */}
                <div className="space-y-2">
                  <label className="text-lg font-medium text-gray-700">เขต</label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="focus:ring-0 focus-visible:ring-0 text-lg p-4 h-12">
                      <SelectValue placeholder="เลือกเขต" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-md">
                      <SelectItem value="เหนือ">เหนือ</SelectItem>
                      <SelectItem value="ตะวันออกเฉียงเหนือ">ตะวันออกเฉียงเหนือ</SelectItem>
                      <SelectItem value="กลาง">กลาง</SelectItem>
                      <SelectItem value="ใต้">ใต้</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* หม้อแปลงไฟฟ้า */}
                <div className="space-y-2">
                  <label className="text-lg font-medium text-gray-700">หม้อแปลงไฟฟ้า</label>
                  <Select value={selectedTransformer} onValueChange={setSelectedTransformer}>
                    <SelectTrigger className="focus:ring-0 focus-visible:ring-0 text-lg p-4 h-12">
                      <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-md">
                      <SelectItem value="transformer1">หม้อแปลง 1</SelectItem>
                      <SelectItem value="transformer2">หม้อแปลง 2</SelectItem>
                      <SelectItem value="transformer3">หม้อแปลง 3</SelectItem>
                      <SelectItem value="transformer4">หม้อแปลง 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* สร้างรายงาน Button */}
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={handleGenerateReport}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-xl font-medium rounded-lg"
                >
                  สร้างรายงาน
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransformerAbnormality;
