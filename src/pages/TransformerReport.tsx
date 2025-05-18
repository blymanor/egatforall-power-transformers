
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ReportForm from "@/components/reports/transformer/ReportForm";
import ReportResults from "@/components/reports/transformer/ReportResults";
import useTransformerReportData from "@/hooks/useTransformerReportData";

const TransformerReport = () => {
  const { toast } = useToast();
  const [region, setRegion] = useState("all");
  const [station, setStation] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [transformer, setTransformer] = useState("");
  const [groupBy, setGroupBy] = useState("region");
  const [showReport, setShowReport] = useState(false);
  
  const { reportData, groupByLabel } = useTransformerReportData(groupBy);
  
  const handleGenerateReport = () => {
    toast({
      title: "สร้างรายงานสำเร็จ",
      description: "กำลังแสดงผลรายงานตามเงื่อนไขที่เลือก",
    });
    setShowReport(true);
  };

  const handleGroupByChange = (value: string) => {
    // If the same value is clicked again, reset to default "region"
    if (value === groupBy) {
      setGroupBy("region");
    } else {
      setGroupBy(value);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-[#f0f4fa] p-4 md:p-6">
        <div className="mb-2">
          <h2 className="text-xl font-semibold text-gray-800">รายงานข้อมูลหม้อแปลงไฟฟ้า</h2>
          <p className="text-gray-600">Transformer Data Report</p>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-lg font-bold mb-6">เลือกเงื่อนไขในการสร้างรายงาน</h2>
            
            <ReportForm 
              region={region}
              setRegion={setRegion}
              station={station}
              setStation={setStation}
              manufacturer={manufacturer}
              setManufacturer={setManufacturer}
              transformer={transformer}
              setTransformer={setTransformer}
              groupBy={groupBy}
              setGroupBy={handleGroupByChange}
              onGenerateReport={handleGenerateReport}
            />
            
            <ReportResults 
              data={reportData} 
              groupByLabel={groupByLabel} 
              showReport={showReport} 
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransformerReport;
