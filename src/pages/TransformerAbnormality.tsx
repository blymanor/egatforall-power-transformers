
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Power, AlertTriangle, Check, CalendarIcon } from "lucide-react";

const TransformerAbnormality = () => {
  const [region, setRegion] = useState("all");
  const [transformerType, setTransformerType] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    region: "",
    transformerCode: "AN-KT1A",
    equipmentNumber: "",
    inspectionDate: "",
    oltcOperations: "",
    environment: "ไม่เกี่ยวข้อง",
    operationStatus: "ขณะติดตั้ง",
    abnormalityDetails: "ปกติ",
    reportDate: "",
    reportTime: "00",
    receiptDate: "",
    receiptTime: "00",
    reference: "",
    relatedParts: "Active Part",
    affectedParts: "แกนเหล็ก",
    severityLevel: "Minor",
    currentStatus: "ออกแบบผิด",
    action: "Repair",
    remarks: "",
    reporter: ""
  });

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    setShowForm(true);
    setShowResults(false);
  };

  const handleSave = () => {
    setShowForm(false);
    setShowResults(true);
  };

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0442AF]">
            Power Transformers
          </h1>
          <p className="text-gray-500">ระบบหม้อแปลงไฟฟ้ากำลัง</p>
        </div>
      </header>

      <div className="p-4 md:p-6 bg-[#f0f4fa] min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-[#0442AF]" />
            ความผิดปกติของหม้อแปลง
          </h2>

          <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden mb-8">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5">
                <h2 className="text-xl font-semibold text-white">รายงานความผิดปกติของหม้อแปลงไฟฟ้า</h2>
              </div>
              
              <div className="p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      เขต:
                    </label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger 
                        className="w-full bg-white border-2 border-gray-200 focus:border-[#1E5CFF] focus:ring-1 focus:ring-[#1E5CFF] transition-all rounded-lg"
                      >
                        <SelectValue placeholder="เลือกเขตพื้นที่" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg">
                        <SelectItem value="all">ทั้งหมด</SelectItem>
                        <SelectItem value="north">เขตภาคเหนือ</SelectItem>
                        <SelectItem value="northeast">เขตภาคตะวันออกเฉียงเหนือ</SelectItem>
                        <SelectItem value="central">เขตภาคกลาง</SelectItem>
                        <SelectItem value="south">เขตภาคใต้</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Power className="h-4 w-4 text-blue-500" />
                      หม้อแปลงไฟฟ้า:
                    </label>
                    <Select value={transformerType} onValueChange={setTransformerType}>
                      <SelectTrigger 
                        className="w-full bg-white border-2 border-gray-200 focus:border-[#1E5CFF] focus:ring-1 focus:ring-[#1E5CFF] transition-all rounded-lg"
                      >
                        <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg">
                        <SelectItem value="AN-KT1A">AN-KT1A</SelectItem>
                        <SelectItem value="AN-KT2A">AN-KT2A</SelectItem>
                        <SelectItem value="AN-KT3A">AN-KT3A</SelectItem>
                        <SelectItem value="AN-KT4A">AN-KT4A</SelectItem>
                        <SelectItem value="AN-KT5A">AN-KT5A</SelectItem>
                        <SelectItem value="AN-KT6A">AN-KT6A</SelectItem>
                        <SelectItem value="AN-KT7A">AN-KT7A</SelectItem>
                        <SelectItem value="AN-KT8A">AN-KT8A</SelectItem>
                        <SelectItem value="AN-KT9A">AN-KT9A</SelectItem>
                        <SelectItem value="AN-KT10A">AN-KT10A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-gray-100"></div>

                <div className="flex justify-center">
                  <Button 
                    className="bg-[#1E5CFF] hover:bg-[#0442AF] text-white font-medium px-8 py-2.5 rounded-lg transition-all shadow-md hover:shadow-xl hover:translate-y-[-1px]"
                    size="lg"
                    onClick={handleGenerate}
                  >
                    Generate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {showForm && (
            <Card className="bg-white rounded-xl shadow-lg border-0 mb-8 overflow-hidden animate-fade-in">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5">
                  <h3 className="text-lg font-medium text-white">กรอกรายละเอียดความผิดปกติของหม้อแปลงไฟฟ้า</h3>
                </div>
                
                <div className="p-6 grid grid-cols-2 gap-x-8 gap-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">เขต</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      {region === "north" ? "เขตภาคเหนือ" : 
                       region === "northeast" ? "เขตภาคตะวันออกเฉียงเหนือ" :
                       region === "central" ? "เขตภาคกลาง" :
                       region === "south" ? "เขตภาคใต้" : "ทั้งหมด"}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">หม้อแปลงไฟฟ้า</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      {transformerType || formData.transformerCode}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Equipment No.</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <input 
                        type="text" 
                        className="bg-white border border-gray-200 rounded-md px-3 py-1.5 w-full"
                        value={formData.equipmentNumber}
                        onChange={(e) => handleFormChange('equipmentNumber', e.target.value)}
                        placeholder="กรุณากรอก Equipment Number"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">วันที่ตรวจสอบครั้งสุดท้าย</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <input 
                        type="date" 
                        className="bg-white border border-gray-200 rounded-md px-3 py-1.5 w-full"
                        value={formData.inspectionDate}
                        onChange={(e) => handleFormChange('inspectionDate', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">จำนวนครั้งในการทำงานของ OLTC</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <input 
                        type="text" 
                        className="bg-white border border-gray-200 rounded-md px-3 py-1.5 w-full"
                        value={formData.oltcOperations}
                        onChange={(e) => handleFormChange('oltcOperations', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">สภาพแวดล้อม</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <Select 
                        value={formData.environment} 
                        onValueChange={(value) => handleFormChange('environment', value)}
                      >
                        <SelectTrigger className="w-full border-gray-200">
                          <SelectValue placeholder="เลือกสภาพแวดล้อม" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ไม่เกี่ยวข้อง">ไม่เกี่ยวข้อง</SelectItem>
                          <SelectItem value="เกี่ยวข้อง">เกี่ยวข้อง</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">สภาวะการใช้งานขณะพบความผิดปกติ</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <Select 
                        value={formData.operationStatus} 
                        onValueChange={(value) => handleFormChange('operationStatus', value)}
                      >
                        <SelectTrigger className="w-full border-gray-200">
                          <SelectValue placeholder="เลือกสถานะ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ขณะติดตั้ง">ขณะติดตั้ง</SelectItem>
                          <SelectItem value="ขณะตรวจสอบ">ขณะตรวจสอบ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">รายละเอียดความผิดปกติ</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <Select 
                        value={formData.abnormalityDetails} 
                        onValueChange={(value) => handleFormChange('abnormalityDetails', value)}
                      >
                        <SelectTrigger className="w-full border-gray-200">
                          <SelectValue placeholder="เลือกรายละเอียด" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ปกติ">ปกติ</SelectItem>
                          <SelectItem value="ผิดปกติ">ผิดปกติ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">วันที่ออกรายงาน</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <input 
                        type="date" 
                        className="bg-white border border-gray-200 rounded-md px-3 py-1.5 w-full"
                        value={formData.reportDate}
                        onChange={(e) => handleFormChange('reportDate', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">เวลาที่ออกรายงาน</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <Select 
                        value={formData.reportTime} 
                        onValueChange={(value) => handleFormChange('reportTime', value)}
                      >
                        <SelectTrigger className="w-full border-gray-200">
                          <SelectValue placeholder="เลือกเวลา" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="00">00:00</SelectItem>
                          <SelectItem value="01">01:00</SelectItem>
                          <SelectItem value="02">02:00</SelectItem>
                          <SelectItem value="03">03:00</SelectItem>
                          <SelectItem value="04">04:00</SelectItem>
                          <SelectItem value="05">05:00</SelectItem>
                          <SelectItem value="06">06:00</SelectItem>
                          <SelectItem value="07">07:00</SelectItem>
                          <SelectItem value="08">08:00</SelectItem>
                          <SelectItem value="09">09:00</SelectItem>
                          <SelectItem value="10">10:00</SelectItem>
                          <SelectItem value="11">11:00</SelectItem>
                          <SelectItem value="12">12:00</SelectItem>
                          <SelectItem value="13">13:00</SelectItem>
                          <SelectItem value="14">14:00</SelectItem>
                          <SelectItem value="15">15:00</SelectItem>
                          <SelectItem value="16">16:00</SelectItem>
                          <SelectItem value="17">17:00</SelectItem>
                          <SelectItem value="18">18:00</SelectItem>
                          <SelectItem value="19">19:00</SelectItem>
                          <SelectItem value="20">20:00</SelectItem>
                          <SelectItem value="21">21:00</SelectItem>
                          <SelectItem value="22">22:00</SelectItem>
                          <SelectItem value="23">23:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">วันที่เข้าระบบ</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <input 
                        type="date" 
                        className="bg-white border border-gray-200 rounded-md px-3 py-1.5 w-full"
                        value={formData.receiptDate}
                        onChange={(e) => handleFormChange('receiptDate', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">เวลาที่เข้าระบบ</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <Select 
                        value={formData.receiptTime} 
                        onValueChange={(value) => handleFormChange('receiptTime', value)}
                      >
                        <SelectTrigger className="w-full border-gray-200">
                          <SelectValue placeholder="เลือกเวลา" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="00">00:00</SelectItem>
                          <SelectItem value="01">01:00</SelectItem>
                          <SelectItem value="02">02:00</SelectItem>
                          <SelectItem value="03">03:00</SelectItem>
                          <SelectItem value="04">04:00</SelectItem>
                          <SelectItem value="05">05:00</SelectItem>
                          <SelectItem value="06">06:00</SelectItem>
                          <SelectItem value="07">07:00</SelectItem>
                          <SelectItem value="08">08:00</SelectItem>
                          <SelectItem value="09">09:00</SelectItem>
                          <SelectItem value="10">10:00</SelectItem>
                          <SelectItem value="11">11:00</SelectItem>
                          <SelectItem value="12">12:00</SelectItem>
                          <SelectItem value="13">13:00</SelectItem>
                          <SelectItem value="14">14:00</SelectItem>
                          <SelectItem value="15">15:00</SelectItem>
                          <SelectItem value="16">16:00</SelectItem>
                          <SelectItem value="17">17:00</SelectItem>
                          <SelectItem value="18">18:00</SelectItem>
                          <SelectItem value="19">19:00</SelectItem>
                          <SelectItem value="20">20:00</SelectItem>
                          <SelectItem value="21">21:00</SelectItem>
                          <SelectItem value="22">22:00</SelectItem>
                          <SelectItem value="23">23:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">เลขที่อ้างอิงปัญหา</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <input 
                        type="text" 
                        className="bg-white border border-gray-200 rounded-md px-3 py-1.5 w-full"
                        value={formData.reference}
                        onChange={(e) => handleFormChange('reference', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">กลุ่มชิ้นส่วนที่เสียหายหรือผิดปกติ</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <Select 
                        value={formData.relatedParts} 
                        onValueChange={(value) => handleFormChange('relatedParts', value)}
                      >
                        <SelectTrigger className="w-full border-gray-200">
                          <SelectValue placeholder="เลือกชิ้นส่วน" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active Part">Active Part</SelectItem>
                          <SelectItem value="Passive Part">Passive Part</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">ชิ้นส่วนที่เสียหายหรือผิดปกติ</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <Select 
                        value={formData.affectedParts} 
                        onValueChange={(value) => handleFormChange('affectedParts', value)}
                      >
                        <SelectTrigger className="w-full border-gray-200">
                          <SelectValue placeholder="เลือกชิ้นส่วน" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="แกนเหล็ก">แกนเหล็ก</SelectItem>
                          <SelectItem value="ขดลวด">ขดลวด</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">ระดับความเสียหาย</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <Select 
                        value={formData.severityLevel} 
                        onValueChange={(value) => handleFormChange('severityLevel', value)}
                      >
                        <SelectTrigger className="w-full border-gray-200">
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
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">สาเหตุที่แท้จริง</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <Select 
                        value={formData.currentStatus} 
                        onValueChange={(value) => handleFormChange('currentStatus', value)}
                      >
                        <SelectTrigger className="w-full border-gray-200">
                          <SelectValue placeholder="เลือกสาเหตุ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ออกแบบผิด">ออกแบบผิด</SelectItem>
                          <SelectItem value="ติดตั้งไม่ถูกวิธี">ติดตั้งไม่ถูกวิธี</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">การจัดการ</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <Select 
                        value={formData.action} 
                        onValueChange={(value) => handleFormChange('action', value)}
                      >
                        <SelectTrigger className="w-full border-gray-200">
                          <SelectValue placeholder="เลือกการจัดการ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Repair">Repair</SelectItem>
                          <SelectItem value="Replace">Replace</SelectItem>
                          <SelectItem value="Monitor">Monitor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-medium text-gray-700">รายละเอียดเพิ่มเติม (Remark)</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <Textarea 
                        className="w-full bg-white border border-gray-200 rounded-md"
                        value={formData.remarks}
                        onChange={(e) => handleFormChange('remarks', e.target.value)}
                        placeholder="กรอกรายละเอียดเพิ่มเติม..."
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">ผู้รายงาน</label>
                    <div className="flex items-center border-b border-gray-200 pb-2">
                      <input 
                        type="text" 
                        className="bg-white border border-gray-200 rounded-md px-3 py-1.5 w-full"
                        value={formData.reporter}
                        onChange={(e) => handleFormChange('reporter', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center p-6">
                  <Button 
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2"
                  >
                    <Check size={18} />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="bg-white rounded-xl p-6 shadow-lg border-0">
            <h3 className="text-lg font-medium text-gray-800 mb-4">ผลลัพธ์</h3>
            
            {showResults ? (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 animate-fade-in">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">เขต</p>
                      <p className="font-medium">
                        {region === "north" ? "เขตภาคเหนือ" : 
                         region === "northeast" ? "เขตภาคตะวันออกเฉียงเหนือ" :
                         region === "central" ? "เขตภาคกลาง" :
                         region === "south" ? "เขตภาคใต้" : "ทั้งหมด"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">หม้อแปลงไฟฟ้า</p>
                      <p className="font-medium">
                        {transformerType || formData.transformerCode}
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full h-[1px] bg-gray-200"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">Equipment No.</p>
                      <p className="font-medium">{formData.equipmentNumber || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">วันที่ตรวจสอบครั้งสุดท้าย</p>
                      <p className="font-medium">{formData.inspectionDate || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">จำนวนครั้งในการทำงานของ OLTC</p>
                      <p className="font-medium">{formData.oltcOperations || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">สภาพแวดล้อม</p>
                      <p className="font-medium">{formData.environment}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">สภาวะการใช้งานขณะพบความผิดปกติ</p>
                      <p className="font-medium">{formData.operationStatus}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">รายละเอียดความผิดปกติ</p>
                      <p className="font-medium">{formData.abnormalityDetails}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">วันที่ออกรายงาน</p>
                      <p className="font-medium">{formData.reportDate || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">เวลาที่ออกรายงาน</p>
                      <p className="font-medium">{formData.reportTime}:00</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">วันที่เข้าระบบ</p>
                      <p className="font-medium">{formData.receiptDate || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">เวลาที่เข้าระบบ</p>
                      <p className="font-medium">{formData.receiptTime}:00</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">เลขที่อ้างอิงปัญหา</p>
                      <p className="font-medium">{formData.reference || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">กลุ่มชิ้นส่วนที่เสียหายหรือผิดปกติ</p>
                      <p className="font-medium">{formData.relatedParts}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">ชิ้นส่วนที่เสียหายหรือผิดปกติ</p>
                      <p className="font-medium">{formData.affectedParts}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">ระดับความเสียหาย</p>
                      <p className="font-medium">{formData.severityLevel}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">สาเหตุที่แท้จริง</p>
                      <p className="font-medium">{formData.currentStatus}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-500">การจัดการ</p>
                      <p className="font-medium">{formData.action}</p>
                    </div>
                  </div>

                  {formData.remarks && (
                    <>
                      <div className="w-full h-[1px] bg-gray-200"></div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">รายละเอียดเพิ่มเติม (Remark)</p>
                        <p className="font-medium">{formData.remarks}</p>
                      </div>
                    </>
                  )}
                  
                  {formData.reporter && (
                    <>
                      <div className="w-full h-[1px] bg-gray-200"></div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">ผู้รายงาน</p>
                        <p className="font-medium">{formData.reporter}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-10">กรุณากดปุ่ม Generate และกรอกรายละเอียดเพื่อแสดงผลลัพธ์</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TransformerAbnormality;
