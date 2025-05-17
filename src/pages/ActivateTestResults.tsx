
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ActivateTestResults = () => {
  const [selectedTransformer, setSelectedTransformer] = useState("");
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!selectedTransformer) {
      toast({
        title: "กรุณาเลือกหม้อแปลงไฟฟ้า",
        description: "โปรดเลือกหม้อแปลงไฟฟ้าก่อนทำการ Activate",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Activate ผลการทดสอบเรียบร้อย",
      description: `ผลการทดสอบของหม้อแปลงไฟฟ้า ${selectedTransformer} ได้รับการ Activate แล้ว`,
    });
  };

  // Transformer data as requested
  const transformers = [
    { id: "AT1", name: "AT1-KT1A" },
    { id: "AT2", name: "AT2-KT1A" },
    { id: "AT3", name: "AT3-KT1A" },
    { id: "AT4", name: "AT4-KT1A" },
    { id: "AT5", name: "AT5-KT1A" },
    { id: "AT6", name: "AT6-KT1A" },
  ];

  return (
    <DashboardLayout>
      {/* Common page header with consistent styling and blue color */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-md sticky top-0 z-10 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-[#0442AF]">Power Transformers</h1>
          <p className="text-gray-500">ระบบหม้อแปลงไฟฟ้ากำลัง</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        {/* Section title */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Activate ผลการทดสอบ</h2>
          <p className="text-gray-600">เลือกหม้อแปลงไฟฟ้าและ Activate ผลการทดสอบ</p>
        </div>
        
        <Card className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border-0">
          <CardContent className="p-6 space-y-4">
            <div className="bg-blue-50 rounded-md p-3 mb-4 border-l-4 border-blue-500">
              <h2 className="text-lg font-semibold text-center text-gray-800">เลือกหม้อแปลงไฟฟ้าเพื่อ Activate ผลทดสอบ</h2>
            </div>

            <div className="space-y-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                <label htmlFor="transformer-select" className="font-medium text-gray-700">
                  เลือกหม้อแปลงไฟฟ้า:
                </label>
                <Select value={selectedTransformer} onValueChange={setSelectedTransformer}>
                  <SelectTrigger className="w-full bg-white border border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {transformers.map((transformer) => (
                      <SelectItem key={transformer.id} value={transformer.id} className="hover:bg-blue-50">
                        {transformer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full border-t border-gray-200 my-3"></div>

              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleGenerate} 
                  className="w-full md:w-1/3 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ActivateTestResults;
