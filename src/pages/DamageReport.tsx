
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PieChart, BarChart, Pie, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const DamageReport = () => {
  const { toast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState("region");
  const [startAge, setStartAge] = useState("");
  const [endAge, setEndAge] = useState("");
  const [region, setRegion] = useState("");
  const [station, setStation] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [transformer, setTransformer] = useState("");
  const [environment, setEnvironment] = useState("");
  const [operatingCondition, setOperatingCondition] = useState("");
  const [faultDetail, setFaultDetail] = useState("");
  const [equipmentGroup, setEquipmentGroup] = useState("");
  const [damagedPart, setDamagedPart] = useState("");
  const [damageLevel, setDamageLevel] = useState("");
  const [actualCause, setActualCause] = useState("");
  const [management, setManagement] = useState("");
  const [groupBy, setGroupBy] = useState("region");
  const [showReport, setShowReport] = useState(false);

  // Mock data for charts
  const chartData = {
    region: [
      { name: 'ภาคเหนือ', value: 12, color: '#0088FE' },
      { name: 'ภาคตะวันออกเฉียงเหนือ', value: 18, color: '#00C49F' },
      { name: 'ภาคกลาง', value: 22, color: '#FFBB28' },
      { name: 'ภาคใต้', value: 8, color: '#FF8042' },
    ],
    age: [
      { name: '0-5 ปี', value: 5, color: '#0088FE' },
      { name: '6-10 ปี', value: 10, color: '#00C49F' },
      { name: '11-15 ปี', value: 15, color: '#FFBB28' },
      { name: '16-20 ปี', value: 18, color: '#FF8042' },
      { name: '21+ ปี', value: 12, color: '#8884d8' },
    ],
    manufacturer: [
      { name: 'ABB', value: 15, color: '#0088FE' },
      { name: 'Siemens', value: 12, color: '#00C49F' },
      { name: 'Mitsubishi', value: 8, color: '#FFBB28' },
      { name: 'Hitachi', value: 10, color: '#FF8042' },
      { name: 'OSAKA', value: 6, color: '#8884d8' },
      { name: 'อื่นๆ', value: 4, color: '#82ca9d' },
    ],
    environment: [
      { name: 'Indoor', value: 25, color: '#0088FE' },
      { name: 'Outdoor', value: 35, color: '#00C49F' },
    ],
    operatingCondition: [
      { name: 'ปกติ', value: 30, color: '#0088FE' },
      { name: 'โอเวอร์โหลด', value: 15, color: '#00C49F' },
      { name: 'สภาพอากาศเลวร้าย', value: 10, color: '#FFBB28' },
      { name: 'อื่นๆ', value: 5, color: '#FF8042' },
    ],
    faultDetail: [
      { name: 'Short Circuit', value: 18, color: '#0088FE' },
      { name: 'Oil Leakage', value: 12, color: '#00C49F' },
      { name: 'Insulation Failure', value: 15, color: '#FFBB28' },
      { name: 'Overheating', value: 10, color: '#FF8042' },
      { name: 'อื่นๆ', value: 5, color: '#8884d8' },
    ],
    equipmentGroup: [
      { name: 'Core', value: 8, color: '#0088FE' },
      { name: 'Winding', value: 15, color: '#00C49F' },
      { name: 'Bushing', value: 12, color: '#FFBB28' },
      { name: 'Tap Changer', value: 10, color: '#FF8042' },
      { name: 'Tank', value: 6, color: '#8884d8' },
      { name: 'Cooling System', value: 9, color: '#82ca9d' },
    ],
    damagedPart: [
      { name: 'บุชชิ่ง HV', value: 8, color: '#0088FE' },
      { name: 'บุชชิ่ง LV', value: 6, color: '#00C49F' },
      { name: 'ขดลวด HV', value: 12, color: '#FFBB28' },
      { name: 'ขดลวด LV', value: 10, color: '#FF8042' },
      { name: 'OLTC', value: 8, color: '#8884d8' },
      { name: 'อุปกรณ์ระบายความร้อน', value: 7, color: '#82ca9d' },
      { name: 'ถังน้ำมัน', value: 4, color: '#ffc658' },
      { name: 'แกนเหล็ก', value: 5, color: '#8dd1e1' },
    ],
    damageLevel: [
      { name: 'ต่ำ', value: 25, color: '#0088FE' },
      { name: 'ปานกลาง', value: 18, color: '#00C49F' },
      { name: 'สูง', value: 10, color: '#FFBB28' },
      { name: 'รุนแรง', value: 7, color: '#FF8042' },
    ],
    actualCause: [
      { name: 'อายุการใช้งานนาน', value: 18, color: '#0088FE' },
      { name: 'ฟ้าผ่า', value: 12, color: '#00C49F' },
      { name: 'ความชื้น', value: 10, color: '#FFBB28' },
      { name: 'การบำรุงรักษาไม่เหมาะสม', value: 14, color: '#FF8042' },
      { name: 'การติดตั้งไม่ถูกต้อง', value: 8, color: '#8884d8' },
      { name: 'อื่นๆ', value: 6, color: '#82ca9d' },
    ],
    management: [
      { name: 'ซ่อมบำรุงทันที', value: 20, color: '#0088FE' },
      { name: 'วางแผนซ่อมบำรุงในอนาคต', value: 15, color: '#00C49F' },
      { name: 'เปลี่ยนอะไหล่', value: 18, color: '#FFBB28' },
      { name: 'เปลี่ยนหม้อแปลงใหม่', value: 7, color: '#FF8042' },
      { name: 'อื่นๆ', value: 5, color: '#8884d8' },
    ],
  };

  const getReportData = () => {
    return chartData[selectedFilter] || [];
  };
  
  const getGroupByLabel = () => {
    switch (selectedFilter) {
      case "region": return "เขต";
      case "age": return "อายุการใช้งาน";
      case "manufacturer": return "บริษัทผู้ผลิต";
      case "environment": return "สภาพแวดล้อม";
      case "operatingCondition": return "สภาวะการใช้งานขณะพบความผิดปกติ";
      case "faultDetail": return "รายละเอียดความผิดปกติ";
      case "equipmentGroup": return "กลุ่มอุปกรณ์";
      case "damagedPart": return "ชิ้นส่วนที่เสียหาย";
      case "damageLevel": return "ระดับความเสียหาย";
      case "actualCause": return "สาเหตุที่แท้จริง";
      case "management": return "การจัดการ";
      default: return "เงื่อนไข";
    }
  };
  
  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    setGroupBy(value);
  };
  
  const handleGenerateReport = () => {
    toast({
      title: "สร้างรายงานสำเร็จ",
      description: `กำลังแสดงผลรายงานความเสียหายแบ่งตาม${getGroupByLabel()}`,
    });
    setShowReport(true);
  };

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0442AF]">รายงานข้อมูลความเสียหาย</h1>
          <p className="text-gray-500">Damage Report</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 text-center">รายงานข้อมูลความเสียหาย</h2>
            <p className="text-center text-gray-500 mb-8">กรุณาเลือกหนึ่งเงื่อนไขในการสร้างรายงาน</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-4">
                  <h3 className="font-medium mb-4 text-blue-600">เงื่อนไขทางอายุการใช้งาน</h3>
                  <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="space-y-2">
                      <Label htmlFor="start-age">ช่วงอายุเริ่มต้น</Label>
                      <Select value={startAge} onValueChange={setStartAge}>
                        <SelectTrigger id="start-age" className="w-full">
                          <SelectValue placeholder="เลือกช่วงอายุ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0 ปี</SelectItem>
                          <SelectItem value="5">5 ปี</SelectItem>
                          <SelectItem value="10">10 ปี</SelectItem>
                          <SelectItem value="15">15 ปี</SelectItem>
                          <SelectItem value="20">20 ปี</SelectItem>
                          <SelectItem value="25">25 ปี</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-age">ช่วงอายุสิ้นสุด</Label>
                      <Select value={endAge} onValueChange={setEndAge}>
                        <SelectTrigger id="end-age" className="w-full">
                          <SelectValue placeholder="เลือกช่วงอายุ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 ปี</SelectItem>
                          <SelectItem value="10">10 ปี</SelectItem>
                          <SelectItem value="15">15 ปี</SelectItem>
                          <SelectItem value="20">20 ปี</SelectItem>
                          <SelectItem value="25">25 ปี</SelectItem>
                          <SelectItem value="30">30 ปี</SelectItem>
                          <SelectItem value="35">35+ ปี</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <RadioGroup className="flex">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="age" id="age-filter" checked={selectedFilter === 'age'} onClick={() => handleFilterChange('age')} />
                          <Label htmlFor="age-filter">ใช้เงื่อนไขนี้</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <Label htmlFor="region" className="text-gray-700 font-medium">เขต :</Label>
                      <RadioGroup className="flex">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="region" id="region-filter" checked={selectedFilter === 'region'} onClick={() => handleFilterChange('region')} />
                          <Label htmlFor="region-filter">ใช้เงื่อนไขนี้</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger id="region" className="w-full">
                        <SelectValue placeholder="เลือกเขต" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">ทั้งหมด</SelectItem>
                        <SelectItem value="north">ภาคเหนือ</SelectItem>
                        <SelectItem value="northeast">ภาคตะวันออกเฉียงเหนือ</SelectItem>
                        <SelectItem value="central">ภาคกลาง</SelectItem>
                        <SelectItem value="south">ภาคใต้</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <Label htmlFor="station" className="text-gray-700 font-medium">สถานีไฟฟ้า :</Label>
                      <RadioGroup className="flex">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="station" id="station-filter" checked={selectedFilter === 'station'} onClick={() => handleFilterChange('station')} />
                          <Label htmlFor="station-filter">ใช้เงื่อนไขนี้</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Select value={station} onValueChange={setStation}>
                      <SelectTrigger id="station" className="w-full">
                        <SelectValue placeholder="เลือกสถานีไฟฟ้า" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">ทั้งหมด</SelectItem>
                        <SelectItem value="station1">สถานีไฟฟ้า 1</SelectItem>
                        <SelectItem value="station2">สถานีไฟฟ้า 2</SelectItem>
                        <SelectItem value="station3">สถานีไฟฟ้า 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <Label htmlFor="manufacturer" className="text-gray-700 font-medium">บริษัทผู้ผลิต :</Label>
                      <RadioGroup className="flex">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="manufacturer" id="manufacturer-filter" checked={selectedFilter === 'manufacturer'} onClick={() => handleFilterChange('manufacturer')} />
                          <Label htmlFor="manufacturer-filter">ใช้เงื่อนไขนี้</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Select value={manufacturer} onValueChange={setManufacturer}>
                      <SelectTrigger id="manufacturer" className="w-full">
                        <SelectValue placeholder="เลือกบริษัทผู้ผลิต" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">ทั้งหมด</SelectItem>
                        <SelectItem value="abb">ABB</SelectItem>
                        <SelectItem value="siemens">Siemens</SelectItem>
                        <SelectItem value="hitachi">Hitachi</SelectItem>
                        <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <Label htmlFor="transformer" className="text-gray-700 font-medium">หม้อแปลงไฟฟ้า :</Label>
                      <RadioGroup className="flex">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="transformer" id="transformer-filter" checked={selectedFilter === 'transformer'} onClick={() => handleFilterChange('transformer')} />
                          <Label htmlFor="transformer-filter">ใช้เงื่อนไขนี้</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Select value={transformer} onValueChange={setTransformer}>
                      <SelectTrigger id="transformer" className="w-full">
                        <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">ทั้งหมด</SelectItem>
                        <SelectItem value="t1">AN-472A</SelectItem>
                        <SelectItem value="t2">AN-473A</SelectItem>
                        <SelectItem value="t3">AN-472B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <Label htmlFor="environment" className="text-gray-700 font-medium">สภาพแวดล้อม :</Label>
                      <RadioGroup className="flex">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="environment" id="environment-filter" checked={selectedFilter === 'environment'} onClick={() => handleFilterChange('environment')} />
                          <Label htmlFor="environment-filter">ใช้เงื่อนไขนี้</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Select value={environment} onValueChange={setEnvironment}>
                      <SelectTrigger id="environment" className="w-full">
                        <SelectValue placeholder="เลือกสภาพแวดล้อม" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">ทั้งหมด</SelectItem>
                        <SelectItem value="indoor">Indoor</SelectItem>
                        <SelectItem value="outdoor">Outdoor</SelectItem>
                        <SelectItem value="substation">Substation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <Label htmlFor="operating-condition" className="text-gray-700 font-medium">สภาวะการใช้งาน :</Label>
                      <RadioGroup className="flex">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="operatingCondition" id="operating-condition-filter" checked={selectedFilter === 'operatingCondition'} onClick={() => handleFilterChange('operatingCondition')} />
                          <Label htmlFor="operating-condition-filter">ใช้เงื่อนไขนี้</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Select value={operatingCondition} onValueChange={setOperatingCondition}>
                      <SelectTrigger id="operating-condition" className="w-full">
                        <SelectValue placeholder="เลือกสภาวะการใช้งาน" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">ทั้งหมด</SelectItem>
                        <SelectItem value="normal">ปกติ</SelectItem>
                        <SelectItem value="overload">โอเวอร์โหลด</SelectItem>
                        <SelectItem value="bad-weather">สภาพอากาศเลวร้าย</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <Label htmlFor="fault-detail" className="text-gray-700 font-medium">รายละเอียดความผิดปกติ :</Label>
                      <RadioGroup className="flex">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="faultDetail" id="fault-detail-filter" checked={selectedFilter === 'faultDetail'} onClick={() => handleFilterChange('faultDetail')} />
                          <Label htmlFor="fault-detail-filter">ใช้เงื่อนไขนี้</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Select value={faultDetail} onValueChange={setFaultDetail}>
                      <SelectTrigger id="fault-detail" className="w-full">
                        <SelectValue placeholder="เลือกรายละเอียดความผิดปกติ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">ทั้งหมด</SelectItem>
                        <SelectItem value="short-circuit">Short Circuit</SelectItem>
                        <SelectItem value="oil-leakage">Oil Leakage</SelectItem>
                        <SelectItem value="insulation-failure">Insulation Failure</SelectItem>
                        <SelectItem value="overheating">Overheating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <Label htmlFor="equipment-group" className="text-gray-700 font-medium">กลุ่มอุปกรณ์ :</Label>
                      <RadioGroup className="flex">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="equipmentGroup" id="equipment-group-filter" checked={selectedFilter === 'equipmentGroup'} onClick={() => handleFilterChange('equipmentGroup')} />
                          <Label htmlFor="equipment-group-filter">ใช้เงื่อนไขนี้</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Select value={equipmentGroup} onValueChange={setEquipmentGroup}>
                      <SelectTrigger id="equipment-group" className="w-full">
                        <SelectValue placeholder="เลือกกลุ่มอุปกรณ์" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">ทั้งหมด</SelectItem>
                        <SelectItem value="core">Core</SelectItem>
                        <SelectItem value="winding">Winding</SelectItem>
                        <SelectItem value="bushing">Bushing</SelectItem>
                        <SelectItem value="tap-changer">Tap Changer</SelectItem>
                        <SelectItem value="tank">Tank</SelectItem>
                        <SelectItem value="cooling-system">Cooling System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <Label htmlFor="damaged-part" className="text-gray-700 font-medium">ชิ้นส่วนที่เสียหาย :</Label>
                      <RadioGroup className="flex">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="damagedPart" id="damaged-part-filter" checked={selectedFilter === 'damagedPart'} onClick={() => handleFilterChange('damagedPart')} />
                          <Label htmlFor="damaged-part-filter">ใช้เงื่อนไขนี้</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Select value={damagedPart} onValueChange={setDamagedPart}>
                      <SelectTrigger id="damaged-part" className="w-full">
                        <SelectValue placeholder="เลือกชิ้นส่วนที่เสียหาย" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">ทั้งหมด</SelectItem>
                        <SelectItem value="bushing-hv">บุชชิ่ง HV</SelectItem>
                        <SelectItem value="bushing-lv">บุชชิ่ง LV</SelectItem>
                        <SelectItem value="winding-hv">ขดลวด HV</SelectItem>
                        <SelectItem value="winding-lv">ขดลวด LV</SelectItem>
                        <SelectItem value="oltc">OLTC</SelectItem>
                        <SelectItem value="cooling">อุปกรณ์ระบายความร้อน</SelectItem>
                        <SelectItem value="tank">ถังน้ำมัน</SelectItem>
                        <SelectItem value="core">แกนเหล็ก</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <Label htmlFor="damage-level" className="text-gray-700 font-medium">ระดับความเสียหาย :</Label>
                      <RadioGroup className="flex">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="damageLevel" id="damage-level-filter" checked={selectedFilter === 'damageLevel'} onClick={() => handleFilterChange('damageLevel')} />
                          <Label htmlFor="damage-level-filter">ใช้เงื่อนไขนี้</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Select value={damageLevel} onValueChange={setDamageLevel}>
                      <SelectTrigger id="damage-level" className="w-full">
                        <SelectValue placeholder="เลือกระดับความเสียหาย" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">ทั้งหมด</SelectItem>
                        <SelectItem value="low">ต่ำ</SelectItem>
                        <SelectItem value="medium">ปานกลาง</SelectItem>
                        <SelectItem value="high">สูง</SelectItem>
                        <SelectItem value="critical">รุนแรง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <Label htmlFor="actual-cause" className="text-gray-700 font-medium">สาเหตุที่แท้จริง :</Label>
                      <RadioGroup className="flex">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="actualCause" id="actual-cause-filter" checked={selectedFilter === 'actualCause'} onClick={() => handleFilterChange('actualCause')} />
                          <Label htmlFor="actual-cause-filter">ใช้เงื่อนไขนี้</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Select value={actualCause} onValueChange={setActualCause}>
                      <SelectTrigger id="actual-cause" className="w-full">
                        <SelectValue placeholder="เลือกสาเหตุที่แท้จริง" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">ทั้งหมด</SelectItem>
                        <SelectItem value="aging">อายุการใช้งานนาน</SelectItem>
                        <SelectItem value="lightning">ฟ้าผ่า</SelectItem>
                        <SelectItem value="humidity">ความชื้น</SelectItem>
                        <SelectItem value="improper-maintenance">การบำรุงรักษาไม่เหมาะสม</SelectItem>
                        <SelectItem value="improper-installation">การติดตั้งไม่ถูกต้อง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <Label htmlFor="management" className="text-gray-700 font-medium">การจัดการ :</Label>
                      <RadioGroup className="flex">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="management" id="management-filter" checked={selectedFilter === 'management'} onClick={() => handleFilterChange('management')} />
                          <Label htmlFor="management-filter">ใช้เงื่อนไขนี้</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Select value={management} onValueChange={setManagement}>
                      <SelectTrigger id="management" className="w-full">
                        <SelectValue placeholder="เลือกการจัดการ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">ทั้งหมด</SelectItem>
                        <SelectItem value="immediate-repair">ซ่อมบำรุงทันที</SelectItem>
                        <SelectItem value="planned-maintenance">วางแผนซ่อมบำรุงในอนาคต</SelectItem>
                        <SelectItem value="parts-replacement">เปลี่ยนอะไหล่</SelectItem>
                        <SelectItem value="transformer-replacement">เปลี่ยนหม้อแปลงใหม่</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                  <h3 className="text-xl font-bold mb-4 text-center">สรุปเงื่อนไข</h3>
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="font-medium">เงื่อนไขที่เลือก:</p>
                      <p className="ml-4 text-blue-600">{getGroupByLabel()}</p>
                    </div>
                    <p className="text-sm text-gray-500">กรุณาเลือกหนึ่งเงื่อนไขโดยคลิกที่ "ใช้เงื่อนไขนี้" ถัดจากตัวเลือกที่ต้องการ</p>
                  </div>
                  <div className="flex justify-center pt-4">
                    <Button 
                      onClick={handleGenerateReport} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg w-full"
                    >
                      สร้างรายงาน
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {showReport && (
              <div className="mt-10 pt-8 border-t border-gray-200 animate-fade-in">
                <h3 className="text-xl font-bold mb-6 text-center">รายงานความเสียหายแบ่งตาม{getGroupByLabel()}</h3>
                
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
                                data={getReportData()}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              >
                                {getReportData().map((entry, index) => (
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
                              data={getReportData()}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip formatter={(value) => [`จำนวน: ${value}`, 'ความเสียหาย']} />
                              <Legend />
                              <Bar dataKey="value" name="จำนวนความเสียหาย">
                                {getReportData().map((entry, index) => (
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
                          <th className="border border-slate-200 p-2">จำนวน</th>
                          <th className="border border-slate-200 p-2">เปอร์เซ็นต์</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getReportData().map((item, index) => {
                          const total = getReportData().reduce((acc, cur) => acc + cur.value, 0);
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
