
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
import { Zap } from "lucide-react";

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

  // Sample transformer data - in a real app, this would come from an API
  const transformers = [
    { id: "TR001", name: "Transformer 001" },
    { id: "TR002", name: "Transformer 002" },
    { id: "TR003", name: "Transformer 003" },
    { id: "TR004", name: "Transformer 004" },
    { id: "TR005", name: "Transformer 005" },
  ];

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-black">Activate ผลการทดสอบ</h1>
          <p className="text-gray-500">เลือกหม้อแปลงไฟฟ้าและ Activate ผลการทดสอบ</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="max-w-2xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <div className="bg-[#f0f4fa] rounded-md p-3 mb-4">
              <h2 className="text-lg font-semibold text-center text-gray-800">เลือกหม้อแปลงไฟฟ้าเพื่อ Activate ผลทดสอบ</h2>
            </div>

            <div className="space-y-6 p-4 border border-gray-100 rounded-lg bg-white shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                <label htmlFor="transformer-select" className="font-medium text-gray-700">
                  เลือกหม้อแปลงไฟฟ้า:
                </label>
                <Select value={selectedTransformer} onValueChange={setSelectedTransformer}>
                  <SelectTrigger className="w-full bg-white border border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent>
                    {transformers.map((transformer) => (
                      <SelectItem key={transformer.id} value={transformer.id}>
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
                  className="w-full md:w-1/3 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2"
                >
                  <Zap size={20} className="mr-1" />
                  <span>Generate</span>
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
