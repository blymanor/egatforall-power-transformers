
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import ReportForm from "@/components/reports/transformer/ReportForm";
import ReportResults from "@/components/reports/transformer/ReportResults";

const TransformerReport = () => {
  const { toast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedTransformer, setSelectedTransformer] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleGenerateReport = () => {
    if (!selectedRegion || !selectedTransformer) {
      toast({
        title: "กรุณาเลือกข้อมูลให้ครบถ้วน",
        description: "กรุณาเลือกเขตและหม้อแปลงไฟฟ้า",
        variant: "destructive"
      });
      return;
    }

    setShowForm(true);
    toast({
      title: "เปิดฟอร์มรายงาน",
      description: "กรุณากรอกข้อมูลการรายงาน"
    });
  };

  const handleSaveReport = () => {
    setShowForm(false);
    setShowResults(true);
    toast({
      title: "บันทึกรายงานสำเร็จ",
      description: "รายงานได้ถูกบันทึกเรียบร้อยแล้ว"
    });
  };

  if (showResults) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-6 bg-[#f0f4fa]">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">ผลลัพธ์รายงานข้อมูลหม้อแปลงไฟฟ้า</h1>
            <p className="text-sm text-gray-600">Transformer Information Report Results</p>
          </div>
          <ReportResults 
            data={[]} 
            groupByLabel="เขต" 
            showReport={true} 
          />
        </div>
      </DashboardLayout>
    );
  }

  if (showForm) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-6 bg-[#f0f4fa]">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">กรอกข้อมูลรายงานหม้อแปลงไฟฟ้า</h1>
            <p className="text-sm text-gray-600">Fill Transformer Report Information</p>
          </div>
          <ReportForm onSave={handleSaveReport} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 bg-[#f0f4fa]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">รายงานข้อมูลหม้อแปลงไฟฟ้า</h1>
          <p className="text-sm text-gray-600">Transformer Information Report</p>
        </div>

        <Card className="shadow-md rounded-xl overflow-hidden border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b">
            <CardTitle className="text-xl font-semibold text-gray-800">เลือกเงื่อนไขในการสร้างรายงาน</CardTitle>
            <p className="text-xs text-gray-600 mt-1">เลือกเขตและหม้อแปลงไฟฟ้าที่ต้องการสร้างรายงาน</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">เขต</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกเขต" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="เหนือ">เหนือ</SelectItem>
                    <SelectItem value="ตะวันออกเฉียงเหนือ">ตะวันออกเฉียงเหนือ</SelectItem>
                    <SelectItem value="กลาง">กลาง</SelectItem>
                    <SelectItem value="ใต้">ใต้</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">หม้อแปลงไฟฟ้า</label>
                <Select value={selectedTransformer} onValueChange={setSelectedTransformer}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="T1">หม้อแปลง T1</SelectItem>
                    <SelectItem value="T2">หม้อแปลง T2</SelectItem>
                    <SelectItem value="T3">หม้อแปลง T3</SelectItem>
                    <SelectItem value="T4">หม้อแปลง T4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleGenerateReport}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              >
                สร้างรายงาน
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransformerReport;
