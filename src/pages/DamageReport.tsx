
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
  
  // Filter states
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedStation, setSelectedStation] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedTransformer, setSelectedTransformer] = useState("");
  const [selectedEnvironment, setSelectedEnvironment] = useState("");
  const [selectedOperatingCondition, setSelectedOperatingCondition] = useState("");
  const [selectedAbnormalityDetails, setSelectedAbnormalityDetails] = useState("");
  const [selectedEquipmentGroup, setSelectedEquipmentGroup] = useState("");
  const [selectedDamagedParts, setSelectedDamagedParts] = useState("");
  const [selectedDamageLevel, setSelectedDamageLevel] = useState("");
  const [selectedRootCause, setSelectedRootCause] = useState("");
  const [selectedManagement, setSelectedManagement] = useState("");
  
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

  if (showResults) {
    return (
      <DashboardLayout>
        <ReportResults 
          onBack={() => setShowResults(false)}
          reportType="damage"
          groupBy={groupBy}
        />
      </DashboardLayout>
    );
  }

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
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* เขต */}
              <div className="space-y-2">
                <Label htmlFor="region">เขต :</Label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกเขต" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="north">เหนือ</SelectItem>
                    <SelectItem value="northeast">ตะวันออกเฉียงเหนือ</SelectItem>
                    <SelectItem value="central">กลาง</SelectItem>
                    <SelectItem value="south">ใต้</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* สถานีไฟฟ้า */}
              <div className="space-y-2">
                <Label htmlFor="station">สถานีไฟฟ้า :</Label>
                <Select value={selectedStation} onValueChange={setSelectedStation}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกสถานีไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="station1">สถานี 1</SelectItem>
                    <SelectItem value="station2">สถานี 2</SelectItem>
                    <SelectItem value="station3">สถานี 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ชื่อบริษัทผู้ผลิต */}
              <div className="space-y-2">
                <Label htmlFor="manufacturer">ชื่อบริษัทผู้ผลิต :</Label>
                <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกบริษัทผู้ผลิต" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="abb">ABB</SelectItem>
                    <SelectItem value="siemens">Siemens</SelectItem>
                    <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* หม้อแปลงไฟฟ้า */}
              <div className="space-y-2">
                <Label htmlFor="transformer">หม้อแปลงไฟฟ้า :</Label>
                <Select value={selectedTransformer} onValueChange={setSelectedTransformer}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="transformer1">หม้อแปลง 1</SelectItem>
                    <SelectItem value="transformer2">หม้อแปลง 2</SelectItem>
                    <SelectItem value="transformer3">หม้อแปลง 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* สภาพแวดล้อม */}
              <div className="space-y-2">
                <Label htmlFor="environment">สภาพแวดล้อม :</Label>
                <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกสภาพแวดล้อม" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="indoor">ในอาคาร</SelectItem>
                    <SelectItem value="outdoor">กลางแจ้ง</SelectItem>
                    <SelectItem value="coastal">ชายฝั่งทะเล</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* สภาวะการใช้งานขณะพบความผิดปกติ */}
              <div className="space-y-2">
                <Label htmlFor="operatingCondition">สภาวะการใช้งานขณะพบความผิดปกติ :</Label>
                <Select value={selectedOperatingCondition} onValueChange={setSelectedOperatingCondition}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกสภาวะการใช้งาน" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="normal">ปกติ</SelectItem>
                    <SelectItem value="overload">โอเวอร์โหลด</SelectItem>
                    <SelectItem value="maintenance">ระหว่างบำรุงรักษา</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* รายละเอียดความผิดปกติหรือเสียหาย */}
              <div className="space-y-2">
                <Label htmlFor="abnormalityDetails">รายละเอียดความผิดปกติหรือเสียหาย :</Label>
                <Select value={selectedAbnormalityDetails} onValueChange={setSelectedAbnormalityDetails}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกรายละเอียด" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="electrical">ไฟฟ้า</SelectItem>
                    <SelectItem value="mechanical">เครื่องกล</SelectItem>
                    <SelectItem value="thermal">ความร้อน</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* กลุ่มอุปกรณ์ */}
              <div className="space-y-2">
                <Label htmlFor="equipmentGroup">กลุ่มอุปกรณ์ :</Label>
                <Select value={selectedEquipmentGroup} onValueChange={setSelectedEquipmentGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกกลุ่มอุปกรณ์" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="primary">อุปกรณ์หลัก</SelectItem>
                    <SelectItem value="secondary">อุปกรณ์รอง</SelectItem>
                    <SelectItem value="control">ระบบควบคุม</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ชิ้นส่วนที่เสียหายหรือผิดปกติ */}
              <div className="space-y-2">
                <Label htmlFor="damagedParts">ชิ้นส่วนที่เสียหายหรือผิดปกติ :</Label>
                <Select value={selectedDamagedParts} onValueChange={setSelectedDamagedParts}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกชิ้นส่วน" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="winding">คอยล์</SelectItem>
                    <SelectItem value="core">แกนเหล็ก</SelectItem>
                    <SelectItem value="tank">ถังน้ำมัน</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ระดับความเสียหาย */}
              <div className="space-y-2">
                <Label htmlFor="damageLevel">ระดับความเสียหาย :</Label>
                <Select value={selectedDamageLevel} onValueChange={setSelectedDamageLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกระดับความเสียหาย" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="minor">เล็กน้อย</SelectItem>
                    <SelectItem value="moderate">ปานกลาง</SelectItem>
                    <SelectItem value="severe">รุนแรง</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* สาเหตุที่แท้จริง */}
              <div className="space-y-2">
                <Label htmlFor="rootCause">สาเหตุที่แท้จริง :</Label>
                <Select value={selectedRootCause} onValueChange={setSelectedRootCause}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกสาเหตุ" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="aging">อายุการใช้งาน</SelectItem>
                    <SelectItem value="maintenance">การบำรุงรักษา</SelectItem>
                    <SelectItem value="environment">สภาพแวดล้อม</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* การจัดการ */}
              <div className="space-y-2">
                <Label htmlFor="management">การจัดการ :</Label>
                <Select value={selectedManagement} onValueChange={setSelectedManagement}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกการจัดการ" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="repair">ซ่อมแซม</SelectItem>
                    <SelectItem value="replace">เปลี่ยนใหม่</SelectItem>
                    <SelectItem value="monitor">ติดตาม</SelectItem>
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
                <Label htmlFor="groupBy">เลือกการแบ่งกลุ่ม :</Label>
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
      </div>
    </DashboardLayout>
  );
};

export default DamageReport;
