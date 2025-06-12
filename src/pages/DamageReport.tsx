
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Search, Download, FileText, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReportResults from "@/components/reports/transformer/ReportResults";

const DamageReport = () => {
  const { toast } = useToast();
  const [showResults, setShowResults] = useState(false);
  
  // Single filter state
  const [selectedFilter, setSelectedFilter] = useState("");
  
  const [groupBy, setGroupBy] = useState("");

  const handleGenerateReport = () => {
    toast({
      title: "กำลังสร้างรายงาน",
      description: "กรุณารอสักครู่...",
    });
    
    setTimeout(() => {
      setShowResults(true);
      toast({
        title: "สร้างรายงานสำเร็จ",
        description: "รายงานได้ถูกสร้างเรียบร้อยแล้ว",
      });
    }, 1500);
  };

  const handleExportReport = () => {
    toast({
      title: "กำลังส่งออกรายงาน",
      description: "รายงานกำลังถูกดาวน์โหลด...",
    });
  };

  // Mock data for the report
  const mockReportData = [
    { name: "เหนือ", value: 25, color: "#3b82f6" },
    { name: "ตะวันออกเฉียงเหนือ", value: 30, color: "#10b981" },
    { name: "กลาง", value: 20, color: "#f59e0b" },
    { name: "ใต้", value: 15, color: "#ef4444" },
  ];

  const getGroupByLabel = () => {
    const labels: { [key: string]: string } = {
      region: "เขต",
      station: "สถานีไฟฟ้า",
      manufacturer: "ชื่อบริษัทผู้ผลิต",
      transformer: "หม้อแปลงไฟฟ้า",
      environment: "สภาพแวดล้อม",
      operatingCondition: "สภาวะการใช้งานขณะพบความผิดปกติ",
      abnormalityDetails: "รายละเอียดความผิดปกติหรือเสียหาย",
      equipmentGroup: "กลุ่มอุปกรณ์",
      damagedParts: "ชิ้นส่วนที่เสียหายหรือผิดปกติ",
      damageLevel: "ระดับความเสียหาย",
      rootCause: "สาเหตุที่แท้จริง",
      management: "การจัดการ"
    };
    return labels[groupBy] || "เขต";
  };

  const filterOptions = [
    { value: "region", label: "เขต" },
    { value: "station", label: "สถานีไฟฟ้า" },
    { value: "manufacturer", label: "ชื่อบริษัทผู้ผลิต" },
    { value: "transformer", label: "หม้อแปลงไฟฟ้า" },
    { value: "environment", label: "สภาพแวดล้อม" },
    { value: "operatingCondition", label: "สภาวะการใช้งานขณะพบความผิดปกติ" },
    { value: "abnormalityDetails", label: "รายละเอียดความผิดปกติหรือเสียหาย" },
    { value: "equipmentGroup", label: "กลุ่มอุปกรณ์" },
    { value: "damagedParts", label: "ชิ้นส่วนที่เสียหายหรือผิดปกติ" },
    { value: "damageLevel", label: "ระดับความเสียหาย" },
    { value: "rootCause", label: "สาเหตุที่แท้จริง" },
    { value: "management", label: "การจัดการ" }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 bg-[#f0f4fa]">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">รายงานข้อมูลความเสียหาย</h1>
          <p className="text-sm text-gray-600">Damage Information Report</p>
        </div>

        {/* Filter Form */}
        <Card className="shadow-md rounded-xl overflow-hidden border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b">
            <CardTitle className="text-xl font-semibold text-gray-800">เงื่อนไขการค้นหา</CardTitle>
            <p className="text-sm text-gray-600 mt-1">เลือกเงื่อนไขในการสร้างรายงานได้เพียงหนึ่งเงื่อนไข</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6">
              {/* เลือกประเภทเงื่อนไข */}
              <div className="space-y-2">
                <Label htmlFor="filterType">ประเภทเงื่อนไข :</Label>
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกประเภทเงื่อนไข" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {filterOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Configuration */}
        <Card className="shadow-md rounded-xl overflow-hidden border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b">
            <CardTitle className="text-xl font-semibold text-gray-800">การตั้งค่ารายงาน</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="groupBy">เลือกการแบ่งกลุ่ม(แบ่งตาม) :</Label>
                <Select value={groupBy} onValueChange={setGroupBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกการแบ่งกลุ่ม" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="region">เขต</SelectItem>
                    <SelectItem value="station">สถานีไฟฟ้า</SelectItem>
                    <SelectItem value="manufacturer">ชื่อบริษัทผู้ผลิต</SelectItem>
                    <SelectItem value="transformer">หม้อแปลงไฟฟ้า</SelectItem>
                    <SelectItem value="environment">สภาพแวดล้อม</SelectItem>
                    <SelectItem value="operatingCondition">สภาวะการใช้งานขณะพบความผิดปกติ</SelectItem>
                    <SelectItem value="abnormalityDetails">รายละเอียดความผิดปกติหรือเสียหาย</SelectItem>
                    <SelectItem value="equipmentGroup">กลุ่มอุปกรณ์</SelectItem>
                    <SelectItem value="damagedParts">ชิ้นส่วนที่เสียหายหรือผิดปกติ</SelectItem>
                    <SelectItem value="damageLevel">ระดับความเสียหาย</SelectItem>
                    <SelectItem value="rootCause">สาเหตุที่แท้จริง</SelectItem>
                    <SelectItem value="management">การจัดการ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button 
            onClick={handleGenerateReport}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2"
          >
            <BarChart3 className="h-5 w-5" />
            สร้างรายงาน
          </Button>
          <Button 
            onClick={handleExportReport}
            variant="outline"
            className="px-8 py-3 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg flex items-center gap-2"
          >
            <Download className="h-5 w-5" />
            ส่งออกรายงาน
          </Button>
        </div>

        {/* Report Results */}
        <ReportResults 
          data={mockReportData} 
          groupByLabel={getGroupByLabel()} 
          showReport={showResults} 
        />
      </div>
    </DashboardLayout>
  );
};

export default DamageReport;
