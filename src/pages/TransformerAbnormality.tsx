
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const TransformerAbnormality = () => {
  const { toast } = useToast();
  const [reportGenerated, setReportGenerated] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteReporter, setDeleteReporter] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    equipmentNo: "",
    transformerName: "",
    station: "",
    abnormalityType: "",
    description: "",
    reportDate: "",
    reporter: ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateReport = () => {
    if (!formData.equipmentNo || !formData.transformerName || !formData.station || 
        !formData.abnormalityType || !formData.description) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "ข้อมูลที่จำเป็นยังไม่ครบถ้วน",
        variant: "destructive"
      });
      return;
    }

    setReportGenerated(true);
    toast({
      title: "สร้างรายงานสำเร็จ",
      description: "รายงานความผิดปกติของหม้อแปลงไฟฟ้าถูกสร้างเรียบร้อยแล้ว"
    });
  };

  const handleDeleteReport = () => {
    if (!deleteReporter.trim()) {
      toast({
        title: "กรุณาระบุชื่อผู้ลบรายงาน",
        description: "ข้อมูลผู้ลบรายงานจำเป็นต้องกรอก",
        variant: "destructive"
      });
      return;
    }

    setReportGenerated(false);
    setShowDeleteModal(false);
    setDeleteReporter("");
    toast({
      title: "ลบรายงานสำเร็จ",
      description: `รายงานถูกลบโดย ${deleteReporter}`
    });
  };

  const mockReportData = {
    equipmentNo: formData.equipmentNo || "AN-472A",
    transformerName: formData.transformerName || "Transformer 1",
    station: formData.station || "สถานี 1",
    abnormalityType: formData.abnormalityType || "Oil Leakage",
    description: formData.description || "มีการรั่วซึมของน้ำมันหม้อแปลงที่บริเวณฐานหม้อแปลง",
    reportDate: formData.reportDate || new Date().toLocaleDateString('th-TH'),
    reporter: formData.reporter || "วิศวกร สมชาย"
  };

  return (
    <DashboardLayout
      pageTitle="ความผิดปกติของหม้อแปลง"
      pageDescription="Transformer Abnormality"
    >
      <div className="p-4 md:p-8 space-y-8 bg-[#f0f4fa]">
        {/* Header with increased size */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">ความผิดปกติของหม้อแปลง</h1>
          <p className="text-xl text-gray-600">Transformer Abnormality</p>
        </div>

        {/* Report Form - increased size */}
        <Card className="mx-auto shadow-lg rounded-xl overflow-hidden border-0 max-w-6xl">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardTitle className="text-2xl font-bold text-center">รายงานความผิดปกติของหม้อแปลงไฟฟ้า</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="equipment-no" className="text-lg">Equipment No. *</Label>
                  <Input 
                    id="equipment-no" 
                    placeholder="กรอกรหัสอุปกรณ์"
                    value={formData.equipmentNo}
                    onChange={(e) => handleInputChange('equipmentNo', e.target.value)}
                    className="focus-visible:ring-0 text-lg p-4"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="transformer-name" className="text-lg">ชื่อหม้อแปลงไฟฟ้า *</Label>
                  <Input 
                    id="transformer-name" 
                    placeholder="กรอกชื่อหม้อแปลง"
                    value={formData.transformerName}
                    onChange={(e) => handleInputChange('transformerName', e.target.value)}
                    className="focus-visible:ring-0 text-lg p-4"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="station" className="text-lg">สถานีไฟฟ้า *</Label>
                  <Select value={formData.station} onValueChange={(value) => handleInputChange('station', value)}>
                    <SelectTrigger id="station" className="focus:ring-0 focus-visible:ring-0 text-lg p-4">
                      <SelectValue placeholder="เลือกสถานีไฟฟ้า" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-md">
                      <SelectItem value="สถานี 1">สถานีไฟฟ้า 1</SelectItem>
                      <SelectItem value="สถานี 2">สถานีไฟฟ้า 2</SelectItem>
                      <SelectItem value="สถานี 3">สถานีไฟฟ้า 3</SelectItem>
                      <SelectItem value="สถานี 4">สถานีไฟฟ้า 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="report-date" className="text-lg">วันที่รายงาน</Label>
                  <Input 
                    id="report-date" 
                    type="date"
                    value={formData.reportDate}
                    onChange={(e) => handleInputChange('reportDate', e.target.value)}
                    className="focus-visible:ring-0 text-lg p-4"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="abnormality-type" className="text-lg">ประเภทความผิดปกติ *</Label>
                  <Select value={formData.abnormalityType} onValueChange={(value) => handleInputChange('abnormalityType', value)}>
                    <SelectTrigger id="abnormality-type" className="focus:ring-0 focus-visible:ring-0 text-lg p-4">
                      <SelectValue placeholder="เลือกประเภทความผิดปกติ" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-md">
                      <SelectItem value="Oil Leakage">Oil Leakage</SelectItem>
                      <SelectItem value="Overheating">Overheating</SelectItem>
                      <SelectItem value="Unusual Sound">Unusual Sound</SelectItem>
                      <SelectItem value="Insulation Failure">Insulation Failure</SelectItem>
                      <SelectItem value="Other">อื่นๆ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reporter" className="text-lg">ผู้รายงาน</Label>
                  <Input 
                    id="reporter" 
                    placeholder="กรอกชื่อผู้รายงาน"
                    value={formData.reporter}
                    onChange={(e) => handleInputChange('reporter', e.target.value)}
                    className="focus-visible:ring-0 text-lg p-4"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-lg">รายละเอียดความผิดปกติ *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="อธิบายรายละเอียดความผิดปกติ"
                    rows={6}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="focus-visible:ring-0 text-lg p-4"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleGenerateReport}
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-xl font-medium rounded-lg"
              >
                สร้างรายงาน
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Report Results */}
        {reportGenerated && (
          <Card className="mx-auto shadow-lg rounded-xl overflow-hidden border-0 max-w-6xl">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardTitle className="text-2xl font-bold text-center">แสดงรายงาน</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <Label className="text-lg font-semibold text-gray-600">Equipment No.</Label>
                    <p className="text-xl text-gray-800">{mockReportData.equipmentNo}</p>
                  </div>
                  <div className="border-b pb-2">
                    <Label className="text-lg font-semibold text-gray-600">ชื่อหม้อแปลงไฟฟ้า</Label>
                    <p className="text-xl text-gray-800">{mockReportData.transformerName}</p>
                  </div>
                  <div className="border-b pb-2">
                    <Label className="text-lg font-semibold text-gray-600">สถานีไฟฟ้า</Label>
                    <p className="text-xl text-gray-800">{mockReportData.station}</p>
                  </div>
                  <div className="border-b pb-2">
                    <Label className="text-lg font-semibold text-gray-600">วันที่รายงาน</Label>
                    <p className="text-xl text-gray-800">{mockReportData.reportDate}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <Label className="text-lg font-semibold text-gray-600">ประเภทความผิดปกติ</Label>
                    <p className="text-xl text-gray-800">{mockReportData.abnormalityType}</p>
                  </div>
                  <div className="border-b pb-2">
                    <Label className="text-lg font-semibold text-gray-600">ผู้รายงาน</Label>
                    <p className="text-xl text-gray-800">{mockReportData.reporter}</p>
                  </div>
                  <div className="border-b pb-2">
                    <Label className="text-lg font-semibold text-gray-600">รายละเอียดความผิดปกติ</Label>
                    <p className="text-xl text-gray-800">{mockReportData.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={() => setShowDeleteModal(true)}
                  variant="destructive"
                  className="px-12 py-4 text-xl font-medium rounded-lg"
                >
                  บันทึกข้อมูล
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>ยืนยันการลบรายงาน</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-gray-600">กรุณาระบุชื่อผู้ที่ทำการลบรายงาน:</p>
            <Input
              placeholder="กรอกชื่อผู้ลบรายงาน"
              value={deleteReporter}
              onChange={(e) => setDeleteReporter(e.target.value)}
              className="focus-visible:ring-0"
            />
          </div>
          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              ยกเลิก
            </Button>
            <Button variant="destructive" onClick={handleDeleteReport}>
              ลบรายงาน
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default TransformerAbnormality;
