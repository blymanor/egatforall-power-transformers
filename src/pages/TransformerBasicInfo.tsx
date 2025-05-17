
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

const TransformerBasicInfo = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");

  // Form fields
  const [equipmentNo, setEquipmentNo] = useState("7000088630");
  const [transformerRegion, setTransformerRegion] = useState("ภาคเหนือ");
  const [transformerType, setTransformerType] = useState("ABB");
  const [transformerModel, setTransformerModel] = useState("KTTA");
  const [manufacturer, setManufacturer] = useState("ABB");
  const [serialNumber, setSerialNumber] = useState("3");
  const [transformerClass, setTransformerClass] = useState("A");
  const [capacity, setCapacity] = useState("50.0");
  const [primaryVoltage, setPrimaryVoltage] = useState("115.0");
  const [secondaryVoltage, setSecondaryVoltage] = useState("22.0");
  const [tertiaryVoltage, setTertiaryVoltage] = useState("11.0");
  const [manufacturingDate, setManufacturingDate] = useState("12/10/2007");
  const [insulationType, setInsulationType] = useState("Three Winding");
  const [vectorGroup, setVectorGroup] = useState("YNyn0");
  const [usageType, setUsageType] = useState("โรงงานอุตสาหกรรม");
  const [remarks, setRemarks] = useState("");

  // Relocation fields
  const [relocationEquipmentNo, setRelocationEquipmentNo] = useState("PMITSUBISHI-2");
  const [currentLocation, setCurrentLocation] = useState("จ.เชียงราย");
  const [transformerType2, setTransformerType2] = useState("ABB KTLA");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSave = () => {
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ข้อมูลพื้นฐานของหม้อแปลงถูกบันทึกเรียบร้อยแล้ว",
    });
  };

  const handleSaveRelocation = () => {
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ข้อมูลการเคลื่อนย้ายหม้อแปลงถูกบันทึกเรียบร้อยแล้ว",
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
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">ข้อมูลพื้นฐานของหม้อแปลง</h2>
          <p className="text-gray-600">จัดการข้อมูลพื้นฐานและการเคลื่อนย้ายของหม้อแปลงไฟฟ้า</p>
        </div>

        <Tabs defaultValue="general" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="general">ข้อมูลทั่วไป</TabsTrigger>
            <TabsTrigger value="relocation">การเคลื่อนย้าย</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-4">
            <Card className="bg-white shadow-md rounded-lg overflow-hidden border-0">
              <CardContent className="p-6">
                <div className="bg-blue-50 rounded-md p-3 mb-4 border-l-4 border-blue-500">
                  <h2 className="text-lg font-semibold text-center text-gray-800">แก้ไขข้อมูลหม้อแปลงไฟฟ้า</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Equipment No.
                    </label>
                    <Input 
                      value={equipmentNo}
                      onChange={(e) => setEquipmentNo(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      สัญญาเลขที่
                    </label>
                    <Input 
                      placeholder="สัญญาเลขที่"
                      className="w-full"
                      value="40/5-30-5-30-HO(K)"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      เขตพื้นที่
                    </label>
                    <Select value={transformerRegion} onValueChange={setTransformerRegion}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="เลือกเขตพื้นที่" />
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
                      ชื่อหม้อแปลงไฟฟ้า
                    </label>
                    <Select value={transformerType} onValueChange={setTransformerType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="เลือกชื่อหม้อแปลงไฟฟ้า" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ABB">ABB</SelectItem>
                        <SelectItem value="Siemens">Siemens</SelectItem>
                        <SelectItem value="Mitsubishi">Mitsubishi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      รูปแบบของหม้อแปลง
                    </label>
                    <Select value={transformerModel} onValueChange={setTransformerModel}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="เลือกรูปแบบของหม้อแปลง" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KTTA">KTTA</SelectItem>
                        <SelectItem value="KTLA">KTLA</SelectItem>
                        <SelectItem value="KTTB">KTTB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ผู้ผลิต
                    </label>
                    <Select value={manufacturer} onValueChange={setManufacturer}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="เลือกผู้ผลิต" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ABB">ABB</SelectItem>
                        <SelectItem value="Siemens">Siemens</SelectItem>
                        <SelectItem value="Mitsubishi">Mitsubishi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      หมายเลขผลิต
                    </label>
                    <Input 
                      value={serialNumber}
                      onChange={(e) => setSerialNumber(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      จำนวนเฟส
                    </label>
                    <Select value={transformerClass} onValueChange={setTransformerClass}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="เลือกจำนวนเฟส" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      สถิติกำลังไฟฟ้าสูงสุด (MVA)
                    </label>
                    <Input 
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      แรงดันไฟฟ้า Primary, HV (kV)
                    </label>
                    <Input 
                      value={primaryVoltage}
                      onChange={(e) => setPrimaryVoltage(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      แรงดันไฟฟ้า Secondary, LV (kV)
                    </label>
                    <Input 
                      value={secondaryVoltage}
                      onChange={(e) => setSecondaryVoltage(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      แรงดันไฟฟ้า Tertiary, TV (kV)
                    </label>
                    <Input 
                      value={tertiaryVoltage}
                      onChange={(e) => setTertiaryVoltage(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      วันที่ผลิต/ใช้งาน
                    </label>
                    <Input 
                      type="date"
                      value={manufacturingDate}
                      onChange={(e) => setManufacturingDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ฉนวน Winding Insulation
                    </label>
                    <Select value={insulationType} onValueChange={setInsulationType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="เลือกฉนวน" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Three Winding">Three Winding</SelectItem>
                        <SelectItem value="Single Winding">Single Winding</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vector Group
                    </label>
                    <Input 
                      value={vectorGroup}
                      onChange={(e) => setVectorGroup(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      สถานที่ใช้งานของหม้อแปลงไฟฟ้า
                    </label>
                    <Select value={usageType} onValueChange={setUsageType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="เลือกสถานที่ใช้งาน" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="โรงงานอุตสาหกรรม">โรงงานอุตสาหกรรม</SelectItem>
                        <SelectItem value="สถานีไฟฟ้า">สถานีไฟฟ้า</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      รายละเอียดเพิ่มเติม (Remark)
                    </label>
                    <Input 
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Accessories</h3>
                  
                  <h4 className="font-medium text-gray-700 mb-2">Bushing</h4>
                  <div className="space-y-4 mb-6">
                    {/* HV Bushing */}
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="w-10 inline-block">HV</span>
                        <div className="flex-1 grid grid-cols-4 gap-2">
                          <div>
                            <label className="block text-xs text-gray-500">Manufacturer</label>
                            <Select defaultValue="ABB">
                              <SelectTrigger className="w-full text-xs">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ABB">ABB</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500">Type</label>
                            <Input defaultValue="GOB 550" className="h-9 text-xs" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500">ปีที่ Nameplate</label>
                            <Input defaultValue="1993" className="h-9 text-xs" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center ml-10">
                        <span className="text-xs text-gray-500 w-24">Serial No.</span>
                        <div className="flex-1 grid grid-cols-4 gap-2">
                          <Input defaultValue="H1 30221B" className="h-8 text-xs" />
                          <Input defaultValue="H2 30221B" className="h-8 text-xs" />
                          <Input defaultValue="H3 30221B" className="h-8 text-xs" />
                        </div>
                      </div>
                    </div>
                    
                    {/* LV Bushing */}
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="w-10 inline-block">LV</span>
                        <div className="flex-1 grid grid-cols-4 gap-2">
                          <div>
                            <label className="block text-xs text-gray-500">Manufacturer</label>
                            <Select defaultValue="ABB">
                              <SelectTrigger className="w-full text-xs">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ABB">ABB</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500">Type</label>
                            <Input defaultValue="O Plus C" className="h-9 text-xs" />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500">ปีที่ Nameplate</label>
                            <Input defaultValue="1993" className="h-9 text-xs" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center ml-10">
                        <span className="text-xs text-gray-500 w-24">Serial No.</span>
                        <div className="flex-1 grid grid-cols-4 gap-2">
                          <Input defaultValue="X0 30221B" className="h-8 text-xs" />
                          <Input defaultValue="X1 30221B" className="h-8 text-xs" />
                          <Input defaultValue="X2 30221B" className="h-8 text-xs" />
                          <Input defaultValue="X3 30221B" className="h-8 text-xs" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-gray-700 mb-2">OLTC</h4>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-xs text-gray-500">Manufacturer</label>
                      <Select defaultValue="ABB">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ABB">ABB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">Type</label>
                      <Input defaultValue="UZF180230/3D" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">ปีที่ Nameplate</label>
                      <Input defaultValue="0" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <Button 
                    onClick={handleSave} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                  >
                    บันทึก
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="relocation" className="mt-4">
            <Card className="bg-white shadow-md rounded-lg overflow-hidden border-0">
              <CardContent className="p-6">
                <div className="bg-blue-50 rounded-md p-3 mb-4 border-l-4 border-blue-500">
                  <h2 className="text-lg font-semibold text-center text-gray-800">เคลื่อนย้ายหม้อแปลง</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Equipment No.
                    </label>
                    <Input 
                      value={relocationEquipmentNo}
                      onChange={(e) => setRelocationEquipmentNo(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      สถานที่ตั้ง
                    </label>
                    <Input 
                      value={currentLocation}
                      onChange={(e) => setCurrentLocation(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ชื่อหม้อแปลงไฟฟ้า (เช่น KTTA,...)
                    </label>
                    <Input 
                      value={transformerType2}
                      onChange={(e) => setTransformerType2(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      วันที่ย้าย
                    </label>
                    <Input 
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ผู้ย้ายทำ
                    </label>
                    <Input className="w-full" />
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <Button 
                    onClick={handleSaveRelocation} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                  >
                    บันทึก
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TransformerBasicInfo;
