
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const TransformerAbnormality = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deviceNo, setDeviceNo] = useState("");
  const [equipmentNo, setEquipmentNo] = useState("");
  const [abnormalType, setAbnormalType] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [reportData, setReportData] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  
  // Form fields for the modal dialog
  const [workOrderNumber, setWorkOrderNumber] = useState("");
  const [abnormalityDetails, setAbnormalityDetails] = useState("");
  const [previousActions, setPreviousActions] = useState("");
  const [environmentCondition, setEnvironmentCondition] = useState("");
  const [abnormalityStatus, setAbnormalityStatus] = useState("");
  const [abnormalityLevel, setAbnormalityLevel] = useState("");
  const [activePart, setActivePart] = useState("");
  const [affectedComponent, setAffectedComponent] = useState("");
  const [severityLevel, setSeverityLevel] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [action, setAction] = useState("");

  const handleGenerate = () => {
    if (!deviceNo || !equipmentNo || !abnormalType || !date) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "ต้องกรอกข้อมูลทุกช่องก่อนทำการสร้างรายงาน",
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
      deviceNo,
      equipmentNo,
      abnormalType,
      date: date ? format(date, "dd/MM/yyyy") : "",
      workOrderNumber,
      abnormalityDetails,
      previousActions,
      environmentCondition,
      abnormalityStatus,
      abnormalityLevel,
      activePart,
      affectedComponent,
      severityLevel,
      currentStatus,
      action
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
                    Device No.
                  </label>
                  <Input 
                    placeholder="Enter device number" 
                    className="w-full"
                    value={deviceNo}
                    onChange={(e) => setDeviceNo(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Equipment No.
                  </label>
                  <Input 
                    placeholder="Enter equipment number" 
                    className="w-full"
                    value={equipmentNo}
                    onChange={(e) => setEquipmentNo(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ประเภทความผิดปกติ
                  </label>
                  <Select value={abnormalType} onValueChange={setAbnormalType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="เลือกประเภทความผิดปกติ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electrical">ทางไฟฟ้า</SelectItem>
                      <SelectItem value="mechanical">ทางกล</SelectItem>
                      <SelectItem value="thermal">ทางความร้อน</SelectItem>
                      <SelectItem value="other">อื่นๆ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    วันที่พบความผิดปกติ
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "dd/MM/yyyy") : "เลือกวันที่"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
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
                      <p className="font-medium">{reportData.deviceNo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">หม้อแปลงไฟฟ้า</p>
                      <p className="font-medium">{reportData.equipmentNo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">เลขคำสั่งปฏิบัติงาน</p>
                      <p className="font-medium">{reportData.workOrderNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">วันที่พบความผิดปกติ</p>
                      <p className="font-medium">{reportData.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ประเภทความผิดปกติ</p>
                      <p className="font-medium">
                        {reportData.abnormalType === "electrical" ? "ทางไฟฟ้า" : 
                         reportData.abnormalType === "mechanical" ? "ทางกล" : 
                         reportData.abnormalType === "thermal" ? "ทางความร้อน" : "อื่นๆ"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">สภาพแวดล้อม</p>
                      <p className="font-medium">{reportData.environmentCondition || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">สภาวะการใช้งาน</p>
                      <p className="font-medium">{reportData.abnormalityStatus || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ระยะเวลา</p>
                      <p className="font-medium">{reportData.abnormalityLevel || "-"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">ส่วนที่พบความผิดปกติ</p>
                      <p className="font-medium">{reportData.activePart || "-"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">ชิ้นส่วนที่เสียหาย</p>
                      <p className="font-medium">{reportData.affectedComponent || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ระดับความเสียหาย</p>
                      <p className="font-medium">{reportData.severityLevel || "-"}</p>
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
                      <p className="text-sm text-gray-500">การดำเนินการที่ผ่านมา</p>
                      <p className="font-medium whitespace-pre-wrap">{reportData.previousActions || "-"}</p>
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
                  การดำเนินการที่ผ่านมา
                </label>
                <Textarea
                  placeholder="กรุณากรอกรายละเอียดการดำเนินการที่ผ่านมา"
                  className="w-full min-h-[80px]"
                  value={previousActions}
                  onChange={(e) => setPreviousActions(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    สภาพแวดล้อม
                  </label>
                  <Select value={environmentCondition} onValueChange={setEnvironmentCondition}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="เลือกสภาพแวดล้อม" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indoor">ในร่ม</SelectItem>
                      <SelectItem value="outdoor">กลางแจ้ง</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    สภาวะการใช้งานขณะพบความผิดปกติ
                  </label>
                  <Select value={abnormalityStatus} onValueChange={setAbnormalityStatus}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="เลือกสภาวะ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">ปกติ</SelectItem>
                      <SelectItem value="overload">โอเวอร์โหลด</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ระยะเวลาความผิดปกติ
                </label>
                <Select value={abnormalityLevel} onValueChange={setAbnormalityLevel}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="เลือกระยะเวลา" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">สั้น</SelectItem>
                    <SelectItem value="medium">ปานกลาง</SelectItem>
                    <SelectItem value="long">ยาว</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  กลุ่มชิ้นส่วนที่เสียหายหรือผิดปกติ
                </label>
                <Select value={activePart} onValueChange={setActivePart}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="เลือกส่วนที่เสียหาย" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active-part">Active Part</SelectItem>
                    <SelectItem value="cooling">ระบบระบายความร้อน</SelectItem>
                    <SelectItem value="oltc">OLTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชิ้นส่วนที่เสียหายหรือผิดปกติ
                </label>
                <Input 
                  placeholder="ระบุชิ้นส่วนที่เสียหาย" 
                  className="w-full"
                  value={affectedComponent}
                  onChange={(e) => setAffectedComponent(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ระดับความเสียหาย
                  </label>
                  <Select value={severityLevel} onValueChange={setSeverityLevel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="เลือกระดับความเสียหาย" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minor">Minor</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="major">Major</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    สถานะปัจจุบัน
                  </label>
                  <Select value={currentStatus} onValueChange={setCurrentStatus}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="เลือกสถานะ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monitoring">Monitoring</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="repairing">Repairing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                    <SelectItem value="repair">Repair</SelectItem>
                    <SelectItem value="replace">Replace</SelectItem>
                    <SelectItem value="monitor">Monitor</SelectItem>
                  </SelectContent>
                </Select>
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
