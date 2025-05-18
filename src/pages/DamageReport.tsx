import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, BarChart, Pie, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from "recharts";

const DamageReport = () => {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minAge, setMinAge] = useState("0");
  const [maxAge, setMaxAge] = useState("20");
  const [region, setRegion] = useState("");
  const [station, setStation] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [transformer, setTransformer] = useState("");
  const [environment, setEnvironment] = useState("");
  const [operationalState, setOperationalState] = useState("");
  const [abnormalDetail, setAbnormalDetail] = useState("");
  const [equipmentGroup, setEquipmentGroup] = useState("");
  const [equipmentPart, setEquipmentPart] = useState("");
  const [damageSeverity, setDamageSeverity] = useState("");
  const [rootCause, setRootCause] = useState("");
  const [management, setManagement] = useState("");
  const [groupBy, setGroupBy] = useState("region");
  const [showReport, setShowReport] = useState(false);
  
  // Selection state for radio buttons
  const [useCondition, setUseCondition] = useState(false);
  
  // Condition checks for which dropdown is selected
  const selectedRegion = useCondition && region !== "";
  const selectedStation = useCondition && station !== "";
  const selectedManufacturer = useCondition && manufacturer !== "";
  const selectedTransformer = useCondition && transformer !== "";
  const selectedEnvironment = useCondition && environment !== "";
  const selectedOperationalState = useCondition && operationalState !== "";
  const selectedAbnormalDetail = useCondition && abnormalDetail !== "";
  const selectedEquipmentGroup = useCondition && equipmentGroup !== "";
  const selectedEquipmentPart = useCondition && equipmentPart !== "";
  const selectedDamageSeverity = useCondition && damageSeverity !== "";
  const selectedRootCause = useCondition && rootCause !== "";
  const selectedManagement = useCondition && management !== "";
  
  // Mock data for charts
  const mockChartData = [
    { name: '0-5 ปี', value: 12, color: '#0088FE' },
    { name: '6-10 ปี', value: 18, color: '#00C49F' },
    { name: '11-15 ปี', value: 25, color: '#FFBB28' },
    { name: '16-20 ปี', value: 16, color: '#FF8042' },
    { name: '21+ ปี', value: 9, color: '#8884d8' },
  ];
  
  const getGroupByLabel = () => {
    switch (groupBy) {
      case "region": return "เขต";
      case "station": return "สถานีไฟฟ้า";
      case "manufacturer": return "บริษัทผู้ผลิต";
      case "age": return "อายุการใช้งาน";
      case "environment": return "สภาพแวดล้อม";
      case "operationalState": return "สภาวะการใช้งาน";
      case "abnormalDetail": return "รายละเอียดความผิดปกติหรือเสียหาย";
      case "equipmentGroup": return "กลุ่มอุปกรณ์";
      case "equipmentPart": return "ชิ้นส่วนที่เสียหายหรือผิดปกติ";
      case "damageSeverity": return "ระดับความเสียหาย";
      case "rootCause": return "สาเหตุที่แท้จริง";
      case "management": return "การจัดการ";
      default: return "เขต";
    }
  };
  
  const handleGenerateReport = () => {
    toast({
      title: "สร้างรายงานสำเร็จ",
      description: "กำลังแสดงผลรายงานตามเงื่อนไขที่เลือก",
    });
    setShowReport(true);
  };

  return (
    <DashboardLayout>
      <div className="bg-[#f0f4fa] p-4 md:p-6">
        <div className="mb-2">
          <h2 className="text-xl font-semibold text-gray-800">รายงานข้อมูลความเสียหาย</h2>
          <p className="text-gray-600">Damage Data Report</p>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-lg font-bold mb-6 text-center">รายงานข้อมูลความเสียหาย</h2>
            <p className="text-center text-gray-600 mb-6">กรุณาเลือกเงื่อนไขในการสร้างรายงาน</p>
            
            <div className="space-y-8">
              {/* Date range selection */}
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <div className="flex items-center gap-2">
                  <Label className="text-gray-700 whitespace-nowrap">ช่วงอายุเริ่มต้น</Label>
                  <Select value={minAge} onValueChange={setMinAge}>
                    <SelectTrigger className="w-28 focus-visible:ring-0 border border-gray-300">
                      <SelectValue placeholder="เลือก" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {Array.from({length: 30}, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Label className="text-gray-700 whitespace-nowrap">ช่วงอายุสิ้นสุด</Label>
                  <Select value={maxAge} onValueChange={setMaxAge}>
                    <SelectTrigger className="w-28 focus-visible:ring-0 border border-gray-300">
                      <SelectValue placeholder="เลือก" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {Array.from({length: 51}, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-center text-blue-600 mb-6 font-medium">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={useCondition}
                    onChange={() => setUseCondition(!useCondition)}
                    className="w-4 h-4"
                  />
                  <span>ใช้เงื่อนไข</span>
                </label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Label className="w-28 text-gray-700">เขต :</Label>
                    <div className="flex items-center gap-2 flex-1">
                      <input 
                        type="radio"
                        checked={selectedRegion}
                        onChange={() => {}}
                        className="w-4 h-4"
                        disabled={!useCondition}
                      />
                      <Select 
                        value={region} 
                        onValueChange={setRegion} 
                        disabled={!useCondition}
                      >
                        <SelectTrigger className="flex-1 focus-visible:ring-0 border border-gray-300">
                          <SelectValue placeholder="เลือกเขต" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="all">ทั้งหมด</SelectItem>
                          <SelectItem value="north">ภาคเหนือ</SelectItem>
                          <SelectItem value="northeast">ภาคตะวันออกเฉียงเหนือ</SelectItem>
                          <SelectItem value="central">ภาคกลาง</SelectItem>
                          <SelectItem value="south">ภาคใต้</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Label className="w-28 text-gray-700">สถานีไฟฟ้า :</Label>
                    <div className="flex items-center gap-2 flex-1">
                      <input 
                        type="radio"
                        checked={selectedStation}
                        onChange={() => {}}
                        className="w-4 h-4"
                        disabled={!useCondition}
                      />
                      <Select 
                        value={station} 
                        onValueChange={setStation}
                        disabled={!useCondition}
                      >
                        <SelectTrigger className="flex-1 focus-visible:ring-0 border border-gray-300">
                          <SelectValue placeholder="เลือกสถานีไฟฟ้า" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="all">ทั้งหมด</SelectItem>
                          <SelectItem value="station1">สถานีไฟฟ้า 1</SelectItem>
                          <SelectItem value="station2">สถานีไฟฟ้า 2</SelectItem>
                          <SelectItem value="station3">สถานีไฟฟ้า 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Label className="w-28 text-gray-700">บริษัทผู้ผลิต :</Label>
                    <div className="flex items-center gap-2 flex-1">
                      <input 
                        type="radio"
                        checked={selectedManufacturer}
                        onChange={() => {}}
                        className="w-4 h-4"
                        disabled={!useCondition}
                      />
                      <Select 
                        value={manufacturer} 
                        onValueChange={setManufacturer}
                        disabled={!useCondition}
                      >
                        <SelectTrigger className="flex-1 focus-visible:ring-0 border border-gray-300">
                          <SelectValue placeholder="เลือกบริษัทผู้ผลิต" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="all">ทั้งหมด</SelectItem>
                          <SelectItem value="abb">ABB</SelectItem>
                          <SelectItem value="siemens">Siemens</SelectItem>
                          <SelectItem value="hitachi">Hitachi</SelectItem>
                          <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Label className="w-28 text-gray-700">หม้อแปลงไฟฟ้า :</Label>
                    <div className="flex items-center gap-2 flex-1">
                      <input 
                        type="radio"
                        checked={selectedTransformer}
                        onChange={() => {}}
                        className="w-4 h-4"
                        disabled={!useCondition}
                      />
                      <Select 
                        value={transformer} 
                        onValueChange={setTransformer}
                        disabled={!useCondition}
                      >
                        <SelectTrigger className="flex-1 focus-visible:ring-0 border border-gray-300">
                          <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="all">ทั้งหมด</SelectItem>
                          <SelectItem value="t1">AN-472A</SelectItem>
                          <SelectItem value="t2">AN-473A</SelectItem>
                          <SelectItem value="t3">AN-472B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Label className="w-28 text-gray-700">สภาพแวดล้อม :</Label>
                    <div className="flex items-center gap-2 flex-1">
                      <input 
                        type="radio"
                        checked={selectedEnvironment}
                        onChange={() => {}}
                        className="w-4 h-4"
                        disabled={!useCondition}
                      />
                      <Select 
                        value={environment} 
                        onValueChange={setEnvironment}
                        disabled={!useCondition}
                      >
                        <SelectTrigger className="flex-1 focus-visible:ring-0 border border-gray-300">
                          <SelectValue placeholder="เลือกสภาพแวดล้อม" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="all">ทั้งหมด</SelectItem>
                          <SelectItem value="normal">ปกติ</SelectItem>
                          <SelectItem value="high_temp">อุณหภูมิสูง</SelectItem>
                          <SelectItem value="humid">ความชื้นสูง</SelectItem>
                          <SelectItem value="coastal">พื้นที่ชายฝั่ง</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Label className="w-28 text-gray-700">สภาวะการใช้งาน :</Label>
                    <div className="flex items-center gap-2 flex-1">
                      <input 
                        type="radio"
                        checked={selectedOperationalState}
                        onChange={() => {}}
                        className="w-4 h-4"
                        disabled={!useCondition}
                      />
                      <Select 
                        value={operationalState} 
                        onValueChange={setOperationalState}
                        disabled={!useCondition}
                      >
                        <SelectTrigger className="flex-1 focus-visible:ring-0 border border-gray-300">
                          <SelectValue placeholder="เลือกสภาวะการใช้งาน" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="all">ทั้งหมด</SelectItem>
                          <SelectItem value="normal">ปกติ</SelectItem>
                          <SelectItem value="overload">โหลดเกิน</SelectItem>
                          <SelectItem value="idle">ไม่มีโหลด</SelectItem>
                          <SelectItem value="offline">ปลดวงจร</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Label className="w-28 text-gray-700">รายละเอียดความผิดปกติ :</Label>
                    <div className="flex items-center gap-2 flex-1">
                      <input 
                        type="radio"
                        checked={selectedAbnormalDetail}
                        onChange={() => {}}
                        className="w-4 h-4"
                        disabled={!useCondition}
                      />
                      <Select 
                        value={abnormalDetail} 
                        onValueChange={setAbnormalDetail}
                        disabled={!useCondition}
                      >
                        <SelectTrigger className="flex-1 focus-visible:ring-0 border border-gray-300">
                          <SelectValue placeholder="เลือกรายละเอียด" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="all">ทั้งหมด</SelectItem>
                          <SelectItem value="overheat">ความร้อนสูงผิดปกติ</SelectItem>
                          <SelectItem value="noise">เสียงผิดปกติ</SelectItem>
                          <SelectItem value="leak">น้ำมันรั่ว</SelectItem>
                          <SelectItem value="short">ไฟฟ้าลัดวงจร</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Label className="w-28 text-gray-700">กลุ่มอุปกรณ์ :</Label>
                    <div className="flex items-center gap-2 flex-1">
                      <input 
                        type="radio"
                        checked={selectedEquipmentGroup}
                        onChange={() => {}}
                        className="w-4 h-4"
                        disabled={!useCondition}
                      />
                      <Select 
                        value={equipmentGroup} 
                        onValueChange={setEquipmentGroup}
                        disabled={!useCondition}
                      >
                        <SelectTrigger className="flex-1 focus-visible:ring-0 border border-gray-300">
                          <SelectValue placeholder="เลือกกลุ่มอุปกรณ์" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="all">ทั้งหมด</SelectItem>
                          <SelectItem value="winding">ขดลวด</SelectItem>
                          <SelectItem value="core">แกนเหล็ก</SelectItem>
                          <SelectItem value="bushing">บุชชิ่ง</SelectItem>
                          <SelectItem value="cooling">ระบบระบายความร้อน</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Label className="w-28 text-gray-700">ชิ้นส่วนที่เสียหาย :</Label>
                    <div className="flex items-center gap-2 flex-1">
                      <input 
                        type="radio"
                        checked={selectedEquipmentPart}
                        onChange={() => {}}
                        className="w-4 h-4"
                        disabled={!useCondition}
                      />
                      <Select 
                        value={equipmentPart} 
                        onValueChange={setEquipmentPart}
                        disabled={!useCondition}
                      >
                        <SelectTrigger className="flex-1 focus-visible:ring-0 border border-gray-300">
                          <SelectValue placeholder="เลือกชิ้นส่วน" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="all">ทั้งหมด</SelectItem>
                          <SelectItem value="hvWinding">ขดลวดแรงสูง</SelectItem>
                          <SelectItem value="lvWinding">ขดลวดแรงต่ำ</SelectItem>
                          <SelectItem value="tankSeal">ซีลถัง</SelectItem>
                          <SelectItem value="radiator">หม้อระบายความร้อน</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Label className="w-28 text-gray-700">ระดับความเสียหาย :</Label>
                    <div className="flex items-center gap-2 flex-1">
                      <input 
                        type="radio"
                        checked={selectedDamageSeverity}
                        onChange={() => {}}
                        className="w-4 h-4"
                        disabled={!useCondition}
                      />
                      <Select 
                        value={damageSeverity} 
                        onValueChange={setDamageSeverity}
                        disabled={!useCondition}
                      >
                        <SelectTrigger className="flex-1 focus-visible:ring-0 border border-gray-300">
                          <SelectValue placeholder="เลือกระดับความเสียหาย" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="all">ทั้งหมด</SelectItem>
                          <SelectItem value="minor">เล็กน้อย</SelectItem>
                          <SelectItem value="moderate">ปานกลาง</SelectItem>
                          <SelectItem value="major">มาก</SelectItem>
                          <SelectItem value="critical">วิกฤต</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Label className="w-28 text-gray-700">สาเหตุที่แท้จริง :</Label>
                    <div className="flex items-center gap-2 flex-1">
                      <input 
                        type="radio"
                        checked={selectedRootCause}
                        onChange={() => {}}
                        className="w-4 h-4"
                        disabled={!useCondition}
                      />
                      <Select 
                        value={rootCause} 
                        onValueChange={setRootCause}
                        disabled={!useCondition}
                      >
                        <SelectTrigger className="flex-1 focus-visible:ring-0 border border-gray-300">
                          <SelectValue placeholder="เลือกสาเหตุ" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="all">ทั้งหมด</SelectItem>
                          <SelectItem value="wear">การเสื่อมสภาพตามอายุ</SelectItem>
                          <SelectItem value="defect">ข้อบกพร่องจากการผลิต</SelectItem>
                          <SelectItem value="overload">การใช้งานเกินกำลัง</SelectItem>
                          <SelectItem value="external">สาเหตุภายนอก</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Label className="w-28 text-gray-700">การจัดการ :</Label>
                    <div className="flex items-center gap-2 flex-1">
                      <input 
                        type="radio"
                        checked={selectedManagement}
                        onChange={() => {}}
                        className="w-4 h-4"
                        disabled={!useCondition}
                      />
                      <Select 
                        value={management} 
                        onValueChange={setManagement}
                        disabled={!useCondition}
                      >
                        <SelectTrigger className="flex-1 focus-visible:ring-0 border border-gray-300">
                          <SelectValue placeholder="เลือกวิธีจัดการ" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="all">ทั้งหมด</SelectItem>
                          <SelectItem value="repair">ซ่อมแซม</SelectItem>
                          <SelectItem value="replace">เปลี่ยนชิ้นส่วน</SelectItem>
                          <SelectItem value="monitor">ติดตามอาการ</SelectItem>
                          <SelectItem value="decommission">ปลดจากการใช้งาน</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-center gap-4">
                  <Label className="text-gray-700 font-bold">เลือกการแบ่งกลุ่ม (แบ่งตาม) :</Label>
                  <Select value={groupBy} onValueChange={setGroupBy}>
                    <SelectTrigger className="w-60 focus-visible:ring-0 border border-gray-300">
                      <SelectValue placeholder="เลือกการแบ่งกลุ่ม" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="region">เขต</SelectItem>
                      <SelectItem value="station">สถานีไฟฟ้า</SelectItem>
                      <SelectItem value="manufacturer">บริษัทผู้ผลิต</SelectItem>
                      <SelectItem value="age">อายุการใช้งาน</SelectItem>
                      <SelectItem value="environment">สภาพแวดล้อม</SelectItem>
                      <SelectItem value="operationalState">สภาวะการใช้งาน</SelectItem>
                      <SelectItem value="abnormalDetail">รายละเอียดความผิดปกติ</SelectItem>
                      <SelectItem value="equipmentGroup">กลุ่มอุปกรณ์</SelectItem>
                      <SelectItem value="equipmentPart">ชิ้นส่วนที่เสียหาย</SelectItem>
                      <SelectItem value="damageSeverity">ระดับความเสียหาย</SelectItem>
                      <SelectItem value="rootCause">สาเหตุที่แท้จริง</SelectItem>
                      <SelectItem value="management">การจัดการ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                  
                <div className="flex justify-center pt-6">
                  <Button 
                    onClick={handleGenerateReport}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                  >
                    สร้างรายงาน
                  </Button>
                </div>
              </div>
            </div>
            
            {showReport && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold mb-4">รายงานความเสียหายตาม{getGroupByLabel()}</h3>
                
                <Tabs defaultValue="pie" className="w-full">
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                    <TabsTrigger value="pie">แผนภูมิวงกลม</TabsTrigger>
                    <TabsTrigger value="bar">แผนภูมิแท่ง</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="pie" className="mt-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="h-96 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={mockChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              >
                                {mockChartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                              <Tooltip formatter={(value) => [`จำนวน: ${value}`, getGroupByLabel()]} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="bar" className="mt-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="h-96 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={mockChartData}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip formatter={(value) => [`จำนวน: ${value}`, getGroupByLabel()]} />
                              <Legend />
                              <Bar dataKey="value" name={`ความเสียหายตาม${getGroupByLabel()}`}>
                                {mockChartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-4">ตารางข้อมูล</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="border border-slate-200 p-2">{getGroupByLabel()}</th>
                          <th className="border border-slate-200 p-2">จำนวนความเสียหาย</th>
                          <th className="border border-slate-200 p-2">เปอร์เซ็นต์</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockChartData.map((item, index) => {
                          const total = mockChartData.reduce((acc, cur) => acc + cur.value, 0);
                          const percent = ((item.value / total) * 100).toFixed(1);
                          return (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                              <td className="border border-slate-200 p-2 text-center">{item.name}</td>
                              <td className="border border-slate-200 p-2 text-center">{item.value}</td>
                              <td className="border border-slate-200 p-2 text-center">{percent}%</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button className="bg-green-600 hover:bg-green-700">
                    ดาวน์โหลดรายงาน PDF
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DamageReport;
