
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const TransformerAbnormality = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [region, setRegion] = useState("");
  const [transformer, setTransformer] = useState("");
  const [reportData, setReportData] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  
  // Form fields for the modal dialog
  const [workOrderNumber, setWorkOrderNumber] = useState("");
  const [abnormalityDetails, setAbnormalityDetails] = useState("");
  const [oltcCheckCount, setOltcCheckCount] = useState("");
  const [environmentCondition, setEnvironmentCondition] = useState("");
  const [operatingCondition, setOperatingCondition] = useState("");
  const [abnormalityDuration, setAbnormalityDuration] = useState("");
  const [lastInspectionDate, setLastInspectionDate] = useState("");
  const [lastInspectionTime, setLastInspectionTime] = useState("");
  const [systemEntryDate, setSystemEntryDate] = useState("");
  const [systemEntryTime, setSystemEntryTime] = useState("");
  const [abnormalComponentGroup, setAbnormalComponentGroup] = useState("");
  const [abnormalComponent, setAbnormalComponent] = useState("");
  const [damageLevel, setDamageLevel] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [action, setAction] = useState("");
  const [remarks, setRemarks] = useState("");
  const [operator, setOperator] = useState("");

  const handleGenerate = () => {
    if (!region || !transformer) {
      toast({
        title: "กรุณาเลือกข้อมูลให้ครบถ้วน",
        description: "ต้องเลือกเขตและหม้อแปลงไฟฟ้าก่อนทำการสร้างรายงาน",
        variant: "destructive",
      });
      return;
    }
    setDialogOpen(true);
  };

  const handleSaveReport = () => {
    if (!workOrderNumber) {
      toast({
        title: "กรุณากรอกเลขคำสั่งปฏิบัติงาน",
        description: "ต้องกรอกเลขคำสั่งปฏิบัติงานก่อนทำการบันทึกรายงาน",
        variant: "destructive",
      });
      return;
    }
    
    // Create report data from form inputs
    const newReportData = {
      region,
      transformer,
      workOrderNumber,
      abnormalityDetails,
      oltcCheckCount,
      environmentCondition,
      operatingCondition,
      abnormalityDuration,
      lastInspectionDate,
      lastInspectionTime,
      systemEntryDate,
      systemEntryTime,
      abnormalComponentGroup,
      abnormalComponent,
      damageLevel,
      currentStatus,
      action,
      remarks,
      operator
    };
    
    setReportData(newReportData);
    setShowResults(true);
    setDialogOpen(false);
    
    toast({
      title: "รายงานถูกบันทึกเรียบร้อยแล้ว",
      description: "รายงานความผิดปกติของหม้อแปลงไฟฟ้าถูกสร้างและบันทึกเรียบร้อยแล้ว",
    });
  };

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0442AF]">Power Transformers</h1>
          <p className="text-gray-500">ระบบหม้อแปลงไฟฟ้ากำลัง</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        {/* Section title without icon */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">ความผิดปกติของหม้อแปลง</h2>
          <p className="text-gray-600">การบันทึกและจัดการข้อมูลความผิดปกติของหม้อแปลงไฟฟ้า</p>
        </div>

        <Card className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border-0">
          <CardContent className="p-6 space-y-6">
            <div className="bg-blue-50 rounded-md p-3 mb-4 border-l-4 border-blue-500">
              <h2 className="text-lg font-semibold text-center text-gray-800">รายงานความผิดปกติของหม้อแปลงไฟฟ้า</h2>
            </div>

            <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    เขต
                  </label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="เลือกเขต" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ภาคกลาง">ภาคกลาง</SelectItem>
                      <SelectItem value="ภาคเหนือ">ภาคเหนือ</SelectItem>
                      <SelectItem value="ภาคตะวันออกเฉียงเหนือ">ภาคตะวันออกเฉียงเหนือ</SelectItem>
                      <SelectItem value="ภาคใต้">ภาคใต้</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    หม้อแปลงไฟฟ้า
                  </label>
                  <Select value={transformer} onValueChange={setTransformer}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AN-472A">AN-472A</SelectItem>
                      <SelectItem value="AN-472B">AN-472B</SelectItem>
                      <SelectItem value="AN-472C">AN-472C</SelectItem>
                      <SelectItem value="AN-472D">AN-472D</SelectItem>
                      <SelectItem value="AN-472E">AN-472E</SelectItem>
                      <SelectItem value="AN-472F">AN-472F</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="w-full border-t border-gray-200 my-3"></div>

              <div className="flex justify-end">
                <Button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Generate Report
                </Button>
              </div>
            </div>
            
            {/* Results Section */}
            {showResults && reportData && (
              <div className="mt-8">
                <div className="bg-blue-50 rounded-md p-3 mb-4 border-l-4 border-blue-500">
                  <h2 className="text-lg font-semibold text-center text-gray-800">ผลลัพธ์</h2>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl font-medium text-gray-800 mb-4">รายงานความผิดปกติของหม้อแปลงไฟฟ้า</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <p className="text-sm text-gray-500">เขต</p>
                      <p className="font-medium">{reportData.region}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">หม้อแปลงไฟฟ้า</p>
                      <p className="font-medium">{reportData.transformer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">เลขคำสั่งปฏิบัติงาน</p>
                      <p className="font-medium">{reportData.workOrderNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">จำนวนครั้งในการทำงานของ OLTC</p>
                      <p className="font-medium">{reportData.oltcCheckCount || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">สภาพแวดล้อม</p>
                      <p className="font-medium">{reportData.environmentCondition || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">สภาวะการใช้งานขณะพบความผิดปกติ</p>
                      <p className="font-medium">{reportData.operatingCondition || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ระยะเวลาความผิดปกติ</p>
                      <p className="font-medium">{reportData.abnormalityDuration || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">วันที่ลงตรวจระบบ</p>
                      <p className="font-medium">{reportData.lastInspectionDate || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">เวลาที่ลงตรวจระบบ</p>
                      <p className="font-medium">{reportData.lastInspectionTime || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">วันที่เข้าระบบ</p>
                      <p className="font-medium">{reportData.systemEntryDate || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">เวลาที่เข้าระบบ</p>
                      <p className="font-medium">{reportData.systemEntryTime || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">กลุ่มชิ้นส่วนที่เสียหายหรือผิดปกติ</p>
                      <p className="font-medium">{reportData.abnormalComponentGroup || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ชิ้นส่วนที่เสียหายหรือผิดปกติ</p>
                      <p className="font-medium">{reportData.abnormalComponent || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ระดับความเสียหาย</p>
                      <p className="font-medium">{reportData.damageLevel || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">สถานะที่เกิดขึ้น</p>
                      <p className="font-medium">{reportData.currentStatus || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">การดำเนินการ</p>
                      <p className="font-medium">{reportData.action || "-"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">รายละเอียดความผิดปกติ</p>
                      <p className="font-medium whitespace-pre-wrap">{reportData.abnormalityDetails || "-"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">รายละเอียดเพิ่มเติม (Remark)</p>
                      <p className="font-medium whitespace-pre-wrap">{reportData.remarks || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ผู้รายงาน</p>
                      <p className="font-medium">{reportData.operator || "-"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal Dialog for Report Generation */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center">รายงานความผิดปกติของหม้อแปลงไฟฟ้า</DialogTitle>
            <DialogDescription className="text-center text-gray-500">
              กรอกรายละเอียดเพิ่มเติมเกี่ยวกับความผิดปกติของหม้อแปลงไฟฟ้า
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-1 gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    เขต
                  </label>
                  <Input value={region} className="w-full bg-gray-100" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    หม้อแปลงไฟฟ้า
                  </label>
                  <Input value={transformer} className="w-full bg-gray-100" readOnly />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เลขคำสั่งปฏิบัติงาน
                </label>
                <Input 
                  placeholder="กรุณากรอกเลขคำสั่งปฏิบัติงาน" 
                  className="w-full"
                  value={workOrderNumber}
                  onChange={(e) => setWorkOrderNumber(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  จำนวนครั้งในการทำงานของ OLTC
                </label>
                <Input 
                  placeholder="กรุณาระบุจำนวนครั้ง" 
                  className="w-full"
                  value={oltcCheckCount}
                  onChange={(e) => setOltcCheckCount(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  สภาพแวดล้อม
                </label>
                <Select value={environmentCondition} onValueChange={setEnvironmentCondition}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="เลือกสภาพแวดล้อม" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ในร่ม">ในร่ม</SelectItem>
                    <SelectItem value="กลางแจ้ง">กลางแจ้ง</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  สภาวะการใช้งานขณะพบความผิดปกติ
                </label>
                <Select value={operatingCondition} onValueChange={setOperatingCondition}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="เลือกสภาวะการใช้งาน" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ปกติ">ปกติ</SelectItem>
                    <SelectItem value="โอเวอร์โหลด">โอเวอร์โหลด</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ระยะเวลาความผิดปกติ
                </label>
                <Select value={abnormalityDuration} onValueChange={setAbnormalityDuration}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="เลือกระยะเวลา" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="สั้น">สั้น</SelectItem>
                    <SelectItem value="ปานกลาง">ปานกลาง</SelectItem>
                    <SelectItem value="ยาว">ยาว</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    วันที่ลงตรวจระบบ
                  </label>
                  <Input 
                    type="date"
                    className="w-full"
                    value={lastInspectionDate}
                    onChange={(e) => setLastInspectionDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    เวลาที่ลงตรวจระบบ
                  </label>
                  <Input 
                    type="time"
                    className="w-full"
                    value={lastInspectionTime}
                    onChange={(e) => setLastInspectionTime(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    วันที่เข้าระบบ
                  </label>
                  <Input 
                    type="date"
                    className="w-full"
                    value={systemEntryDate}
                    onChange={(e) => setSystemEntryDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    เวลาที่เข้าระบบ
                  </label>
                  <Input 
                    type="time"
                    className="w-full"
                    value={systemEntryTime}
                    onChange={(e) => setSystemEntryTime(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  กลุ่มชิ้นส่วนที่เสียหายหรือผิดปกติ
                </label>
                <Select value={abnormalComponentGroup} onValueChange={setAbnormalComponentGroup}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="เลือกส่วนที่เสียหาย" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active Part">Active Part</SelectItem>
                    <SelectItem value="ระบบระบายความร้อน">ระบบระบายความร้อน</SelectItem>
                    <SelectItem value="OLTC">OLTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชิ้นส่วนที่เสียหายหรือผิดปกติ
                </label>
                <Select value={abnormalComponent} onValueChange={setAbnormalComponent}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="เลือกชิ้นส่วนที่เสียหาย" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="แกนเหล็ก">แกนเหล็ก</SelectItem>
                    <SelectItem value="ขดลวด">ขดลวด</SelectItem>
                    <SelectItem value="บุชชิ่ง">บุชชิ่ง</SelectItem>
                    <SelectItem value="อื่นๆ">อื่นๆ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ระดับความเสียหาย
                </label>
                <Select value={damageLevel} onValueChange={setDamageLevel}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="เลือกระดับความเสียหาย" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Minor">Minor</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Major">Major</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  สถานะที่เกิดขึ้น
                </label>
                <Select value={currentStatus} onValueChange={setCurrentStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="เลือกสถานะ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ตรวจสอบ/เฝ้าระวัง">ตรวจสอบ/เฝ้าระวัง</SelectItem>
                    <SelectItem value="กำลังสอบสวน">กำลังสอบสวน</SelectItem>
                    <SelectItem value="กำลังซ่อมแซม">กำลังซ่อมแซม</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  การดำเนินการ
                </label>
                <Select value={action} onValueChange={setAction}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="เลือกการดำเนินการ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Repair">Repair</SelectItem>
                    <SelectItem value="Replace">Replace</SelectItem>
                    <SelectItem value="Monitor">Monitor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  รายละเอียดความผิดปกติ
                </label>
                <Textarea
                  placeholder="กรุณากรอกรายละเอียดความผิดปกติของหม้อแปลงไฟฟ้า"
                  className="w-full min-h-[100px]"
                  value={abnormalityDetails}
                  onChange={(e) => setAbnormalityDetails(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  รายละเอียดเพิ่มเติม (Remark)
                </label>
                <Textarea
                  placeholder="กรุณากรอกรายละเอียดเพิ่มเติมถ้ามี"
                  className="w-full min-h-[80px]"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ผู้รายงาน
                </label>
                <Input 
                  placeholder="กรุณากรอกชื่อผู้รายงาน" 
                  className="w-full"
                  value={operator}
                  onChange={(e) => setOperator(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-center">
            <Button 
              onClick={handleSaveReport} 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              บันทึกรายงาน
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default TransformerAbnormality;
