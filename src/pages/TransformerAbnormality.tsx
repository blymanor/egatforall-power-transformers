
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TransformerAbnormality = () => {
  const { toast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedTransformer, setSelectedTransformer] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [formData, setFormData] = useState({
    equipmentNo: "",
    transformerCode: "AN-472C",
    discoveryDate: "12/06/2025",
    oltcPosition: "",
    condition: "",
    serviceUsage: "",
    abnormalityDetails: "",
    discoveryStartDate: "12/06/2025",
    discoveryStartTime: "12:30",
    discoveryEndDate: "12/06/2025",
    discoveryEndTime: "12:30",
    operatorName: "",
    relatedGroup: "",
    relatedPart: "",
    damageLevel: "",
    cause: "",
    management: "",
    additionalRemarks: "",
    reporter: ""
  });

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
      description: "กรุณากรอกข้อมูลความผิดปกติ"
    });
  };

  const handleSaveReport = () => {
    setShowForm(false);
    setShowReport(true);
    toast({
      title: "บันทึกรายงานสำเร็จ",
      description: "รายงานความผิดปกติได้ถูกบันทึกเรียบร้อยแล้ว"
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (showReport) {
    return (
      <DashboardLayout>
        <div className="p-4 md:p-8 space-y-8 bg-[#f0f4fa]">
          <div className="mb-8">
            <div className="border-l-4 border-blue-500 pl-4">
              <h1 className="text-xl font-bold text-gray-800">ผลลัพธ์</h1>
            </div>
          </div>

          <Card className="mx-auto shadow-lg rounded-xl overflow-hidden border-0 max-w-4xl">
            <CardContent className="p-8">
              <h2 className="text-lg font-bold mb-6">รายงานความผิดปกติของหม้อแปลงไฟฟ้า</h2>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div className="flex">
                  <span className="font-medium w-48">เขต</span>
                  <span>ภาคตะวันออกเฉียงเหนือ</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-48">หม้อแปลงไฟฟ้า</span>
                  <span>AN-472C</span>
                </div>
                
                <div className="flex">
                  <span className="font-medium w-48">Equipment No.</span>
                  <span>กกก</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-48">วันที่เกิดเหตุการณ์</span>
                  <span>-</span>
                </div>
                
                <div className="flex">
                  <span className="font-medium w-48">จำนวนครั้งในการทำงานของ OLTC</span>
                  <span>กก</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-48">สภาพแวดล้อม</span>
                  <span>กลางแจ้ง</span>
                </div>
                
                <div className="flex">
                  <span className="font-medium w-48">สภาวะการใช้งานขณะพบความผิดปกติ</span>
                  <span>โอเวอร์โหลด</span>
                </div>
                
                <div className="col-span-2">
                  <div className="flex">
                    <span className="font-medium w-48">รายละเอียดความผิดปกติ</span>
                    <span>กก</span>
                  </div>
                </div>
                
                <div className="flex">
                  <span className="font-medium w-48">วันที่ปลดออกจากระบบ</span>
                  <span>-</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-48">เวลาที่ปลดออกจากระบบ</span>
                  <span>-</span>
                </div>
                
                <div className="flex">
                  <span className="font-medium w-48">วันที่นำเข้าระบบ</span>
                  <span>-</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-48">เวลาที่นำเข้าระบบ</span>
                  <span>-</span>
                </div>
                
                <div className="flex">
                  <span className="font-medium w-48">เลขคำสั่งปฏิบัติงาน</span>
                  <span>กก</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-48">กลุ่มชิ้นส่วนที่เสียหายหรือผิดปกติ</span>
                  <span>OLTC</span>
                </div>
                
                <div className="flex">
                  <span className="font-medium w-48">ชิ้นส่วนที่เสียหายหรือผิดปกติ</span>
                  <span>บุชชิ่ง</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-48">ระดับความเสียหาย</span>
                  <span>Moderate</span>
                </div>
                
                <div className="flex">
                  <span className="font-medium w-48">สาเหตุที่แท้จริง</span>
                  <span>ความผิดพลาดในการติดตั้ง</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-48">การจัดการ</span>
                  <span>Replace</span>
                </div>
                
                <div className="col-span-2">
                  <div className="flex">
                    <span className="font-medium w-48">รายละเอียดเพิ่มเติม (Remark)</span>
                    <span>กก</span>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <div className="flex">
                    <span className="font-medium w-48">ผู้รายงาน</span>
                    <span>พท</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-4 mt-8">
                <Button 
                  onClick={() => setShowReport(false)}
                  variant="outline"
                  className="px-6 py-2 text-sm"
                >
                  แก้ไขข้อมูล
                </Button>
                <Button 
                  onClick={() => {
                    toast({
                      title: "ลบรายงานสำเร็จ",
                      description: "รายงานได้ถูกลบออกจากระบบ"
                    });
                    setShowReport(false);
                    setShowForm(false);
                    setSelectedRegion("");
                    setSelectedTransformer("");
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-sm"
                >
                  ลบรายงาน
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (showForm) {
    return (
      <DashboardLayout>
        <div className="p-4 md:p-8 space-y-8 bg-[#f0f4fa]">
          <div className="mb-8">
            <div className="border-l-4 border-blue-500 pl-4">
              <h1 className="text-xl font-bold text-gray-800">การรายงานข้อมูลความผิดปกติ</h1>
            </div>
          </div>

          <Card className="mx-auto shadow-lg rounded-xl overflow-hidden border-0 max-w-6xl">
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Basic Information Section */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">ข้อมูลพื้นฐาน</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">เขต</Label>
                      <div className="text-sm text-gray-600 p-2 bg-white rounded border">ภาคตะวันออกเฉียงเหนือ</div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">หม้อแปลงไฟฟ้า</Label>
                      <div className="text-sm text-gray-600 p-2 bg-white rounded border">{formData.transformerCode}</div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Equipment No.</Label>
                      <Input 
                        placeholder="กรุณากรอก Equipment No."
                        value={formData.equipmentNo}
                        onChange={(e) => handleInputChange('equipmentNo', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">วันที่เกิดเหตุการณ์</Label>
                      <Input 
                        type="date"
                        value={formData.discoveryDate}
                        onChange={(e) => handleInputChange('discoveryDate', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Operating Conditions Section */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">สภาวะการทำงาน</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">จำนวนครั้งในการทำงานของ OLTC</Label>
                      <Input 
                        placeholder="กรุณากรอกจำนวนครั้ง"
                        value={formData.oltcPosition}
                        onChange={(e) => handleInputChange('oltcPosition', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">สภาพแวดล้อม</Label>
                      <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="เลือกสภาพแวดล้อม" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="outdoor">กลางแจ้ง</SelectItem>
                          <SelectItem value="indoor">ในอาคาร</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label className="text-sm font-medium text-gray-700">สภาวะการใช้งานขณะพบความผิดปกติ</Label>
                      <Select value={formData.serviceUsage} onValueChange={(value) => handleInputChange('serviceUsage', value)}>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="เลือกสภาวะการใช้งาน" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="overload">โอเวอร์โหลด</SelectItem>
                          <SelectItem value="normal">ปกติ</SelectItem>
                          <SelectItem value="underload">โหลดต่ำ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Abnormality Details Section */}
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">รายละเอียดความผิดปกติ</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">รายละเอียดความผิดปกติ</Label>
                      <Textarea 
                        placeholder="กรุณากรอกรายละเอียดความผิดปกติของหม้อแปลงไฟฟ้า"
                        value={formData.abnormalityDetails}
                        onChange={(e) => handleInputChange('abnormalityDetails', e.target.value)}
                        className="text-sm min-h-[100px]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">กลุ่มชิ้นส่วนที่เสียหายหรือผิดปกติ</Label>
                        <Select value={formData.relatedGroup} onValueChange={(value) => handleInputChange('relatedGroup', value)}>
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="เลือกกลุ่มชิ้นส่วน" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="OLTC">OLTC</SelectItem>
                            <SelectItem value="bushings">Bushings</SelectItem>
                            <SelectItem value="cooling-system">ระบบหล่อเย็น</SelectItem>
                            <SelectItem value="protection-system">ระบบป้องกัน</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">ชิ้นส่วนที่เสียหายหรือผิดปกติ</Label>
                        <Select value={formData.relatedPart} onValueChange={(value) => handleInputChange('relatedPart', value)}>
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="เลือกชิ้นส่วน" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="bushing">บุชชิ่ง</SelectItem>
                            <SelectItem value="switch">สวิตช์</SelectItem>
                            <SelectItem value="contact">คอนแทค</SelectItem>
                            <SelectItem value="insulation">ฉนวน</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">ระดับความเสียหาย</Label>
                        <Select value={formData.damageLevel} onValueChange={(value) => handleInputChange('damageLevel', value)}>
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="เลือกระดับความเสียหาย" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="Minor">Minor</SelectItem>
                            <SelectItem value="Moderate">Moderate</SelectItem>
                            <SelectItem value="Major">Major</SelectItem>
                            <SelectItem value="Critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">สาเหตุที่แท้จริง</Label>
                        <Select value={formData.cause} onValueChange={(value) => handleInputChange('cause', value)}>
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="เลือกสาเหตุ" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="installation-error">ความผิดพลาดในการติดตั้ง</SelectItem>
                            <SelectItem value="maintenance-error">ความผิดพลาดในการบำรุงรักษา</SelectItem>
                            <SelectItem value="aging">การเสื่อมสภาพตามอายุการใช้งาน</SelectItem>
                            <SelectItem value="overload">โอเวอร์โหลด</SelectItem>
                            <SelectItem value="external-factors">ปัจจัยภายนอก</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">การจัดการ</Label>
                        <Select value={formData.management} onValueChange={(value) => handleInputChange('management', value)}>
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="เลือกการจัดการ" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="Replace">Replace</SelectItem>
                            <SelectItem value="Repair">Repair</SelectItem>
                            <SelectItem value="Maintenance">Maintenance</SelectItem>
                            <SelectItem value="Monitor">Monitor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Information Section */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">ข้อมูลเวลา</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">วันที่ปลดออกจากระบบ</Label>
                      <Input 
                        type="date"
                        value={formData.discoveryStartDate}
                        onChange={(e) => handleInputChange('discoveryStartDate', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">เวลาที่ปลดออกจากระบบ</Label>
                      <Input 
                        type="time"
                        value={formData.discoveryStartTime}
                        onChange={(e) => handleInputChange('discoveryStartTime', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">วันที่นำเข้าระบบ</Label>
                      <Input 
                        type="date"
                        value={formData.discoveryEndDate}
                        onChange={(e) => handleInputChange('discoveryEndDate', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">เวลาที่นำเข้าระบบ</Label>
                      <Input 
                        type="time"
                        value={formData.discoveryEndTime}
                        onChange={(e) => handleInputChange('discoveryEndTime', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">ข้อมูลเพิ่มเติม</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">เลขคำสั่งปฏิบัติงาน</Label>
                      <Input 
                        placeholder="กรุณากรอกเลขคำสั่ง"
                        value={formData.operatorName}
                        onChange={(e) => handleInputChange('operatorName', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">รายละเอียดเพิ่มเติม (Remark)</Label>
                      <Textarea 
                        placeholder="กรุณากรอกรายละเอียดเพิ่มเติม"
                        value={formData.additionalRemarks}
                        onChange={(e) => handleInputChange('additionalRemarks', e.target.value)}
                        className="text-sm min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">ผู้รายงาน</Label>
                      <Input 
                        placeholder="กรุณากรอกชื่อผู้รายงาน"
                        value={formData.reporter}
                        onChange={(e) => handleInputChange('reporter', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={handleSaveReport}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 text-sm font-medium rounded-lg"
                  >
                    บันทึกรายงาน
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-8 bg-[#f0f4fa]">
        <div className="mb-8">
          <div className="border-l-4 border-blue-500 pl-4">
            <h1 className="text-xl font-bold text-gray-800">รายงานความผิดปกติของหม้อแปลงไฟฟ้า</h1>
          </div>
        </div>

        <Card className="mx-auto shadow-lg rounded-xl overflow-hidden border-0 max-w-4xl">
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700">เขต</label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="focus:ring-0 focus-visible:ring-0 text-xs p-2 h-8">
                      <SelectValue placeholder="เลือกเขต" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-md">
                      <SelectItem value="เหนือ">เหนือ</SelectItem>
                      <SelectItem value="ตะวันออกเฉียงเหนือ">ตะวันออกเฉียงเหนือ</SelectItem>
                      <SelectItem value="กลาง">กลาง</SelectItem>
                      <SelectItem value="ใต้">ใต้</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-700">หม้อแปลงไฟฟ้า</label>
                  <Select value={selectedTransformer} onValueChange={setSelectedTransformer}>
                    <SelectTrigger className="focus:ring-0 focus-visible:ring-0 text-xs p-2 h-8">
                      <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-md">
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
              
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={handleGenerateReport}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-1 text-xs font-medium rounded-lg"
                >
                  สร้างรายงาน
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransformerAbnormality;
