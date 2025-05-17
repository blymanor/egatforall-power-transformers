
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Power, AlertTriangle } from "lucide-react";

const TransformerAbnormality = () => {
  const [region, setRegion] = useState("all");
  const [transformerType, setTransformerType] = useState("");

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0442AF] flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-[#0442AF]" />
            ความผิดปกติของหม้อแปลง
          </h1>
          <p className="text-gray-500">รายงานความผิดปกติของหม้อแปลงไฟฟ้า</p>
        </div>
      </header>

      <div className="p-4 md:p-6 bg-[#f0f4fa] min-h-screen">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5">
                <h2 className="text-xl font-semibold text-white">รายงานความผิดปกติของหม้อแปลงไฟฟ้า</h2>
              </div>
              
              <div className="p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      เขต:
                    </label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger 
                        className="w-full bg-white border-2 border-gray-200 focus:border-[#1E5CFF] focus:ring-1 focus:ring-[#1E5CFF] transition-all rounded-lg"
                      >
                        <SelectValue placeholder="เลือกเขตพื้นที่" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg">
                        <SelectItem value="all">ทั้งหมด</SelectItem>
                        <SelectItem value="north">เขตภาคเหนือ</SelectItem>
                        <SelectItem value="northeast">เขตภาคตะวันออกเฉียงเหนือ</SelectItem>
                        <SelectItem value="central">เขตภาคกลาง</SelectItem>
                        <SelectItem value="south">เขตภาคใต้</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Power className="h-4 w-4 text-blue-500" />
                      หม้อแปลงไฟฟ้า:
                    </label>
                    <Select value={transformerType} onValueChange={setTransformerType}>
                      <SelectTrigger 
                        className="w-full bg-white border-2 border-gray-200 focus:border-[#1E5CFF] focus:ring-1 focus:ring-[#1E5CFF] transition-all rounded-lg"
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

                <div className="w-full h-[1px] bg-gray-100"></div>

                <div className="flex justify-center">
                  <Button 
                    className="bg-[#1E5CFF] hover:bg-[#0442AF] text-white font-medium px-8 py-2.5 rounded-lg transition-all shadow-md hover:shadow-xl hover:translate-y-[-1px]"
                    size="lg"
                  >
                    Generate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border-0">
            <h3 className="text-lg font-medium text-gray-800 mb-4">ผลลัพธ์</h3>
            <p className="text-gray-500 text-center py-10">กรุณาเลือกข้อมูลและกดปุ่ม Generate เพื่อแสดงผลลัพธ์</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TransformerAbnormality;
