
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import ReportForm from "@/components/reports/transformer/ReportForm";
import ReportResults from "@/components/reports/transformer/ReportResults";

const TransformerReport = () => {
  const { toast } = useToast();
  const [showResults, setShowResults] = useState(false);

  const handleSaveReport = () => {
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
            <h1 className="text-2xl font-bold text-gray-800 mb-2">ผลลัพธ์รายงานตามผู้ใช้งานสำหรับหม้อแปลงไฟฟ้า</h1>
            <p className="text-sm text-gray-600">Transformer User Report Results</p>
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

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 bg-[#f0f4fa]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">รายงานตามผู้ใช้งานสำหรับหม้อแปลงไฟฟ้า</h1>
          <p className="text-sm text-gray-600">Transformer User Report</p>
        </div>
        <ReportForm onSave={handleSaveReport} />
      </div>
    </DashboardLayout>
  );
};

export default TransformerReport;
