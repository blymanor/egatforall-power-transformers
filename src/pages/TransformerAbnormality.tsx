
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TransformerAbnormality = () => {
  const [region, setRegion] = useState("all");
  const [transformerType, setTransformerType] = useState("");

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0442AF]">ความผิดปกติของหม้อแปลง</h1>
          <p className="text-gray-500">รายงานความผิดปกติของหม้อแปลงไฟฟ้า</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="w-full max-w-4xl mx-auto shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2 border-b border-gray-100">
            <CardTitle className="text-lg font-semibold text-[#0442AF]">
              รายงานความผิดปกติของหม้อแปลงไฟฟ้า
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                  เขต:
                </label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger 
                    className="w-full border-2 border-gray-200 focus:border-[#1E5CFF] focus:ring-1 focus:ring-[#1E5CFF] transition-all"
                  >
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="north">เขตภาคเหนือ</SelectItem>
                    <SelectItem value="northeast">เขตภาคตะวันออกเฉียงเหนือ</SelectItem>
                    <SelectItem value="central">เขตภาคกลาง</SelectItem>
                    <SelectItem value="south">เขตภาคใต้</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="transformer-type" className="block text-sm font-medium text-gray-700">
                  หม้อแปลงไฟฟ้า:
                </label>
                <Select value={transformerType} onValueChange={setTransformerType}>
                  <SelectTrigger 
                    className="w-full border-2 border-gray-200 focus:border-[#1E5CFF] focus:ring-1 focus:ring-[#1E5CFF] transition-all"
                  >
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg">
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="type1">หม้อแปลงประเภท 1</SelectItem>
                    <SelectItem value="type2">หม้อแปลงประเภท 2</SelectItem>
                    <SelectItem value="type3">หม้อแปลงประเภท 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <Button 
                className="bg-[#1E5CFF] hover:bg-[#0442AF] text-white font-medium px-10 py-2 rounded-md transition-colors shadow-md hover:shadow-lg"
              >
                Generate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransformerAbnormality;
