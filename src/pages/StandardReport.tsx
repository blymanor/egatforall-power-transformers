
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
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StandardReport = () => {
  const { toast } = useToast();
  const [reportType, setReportType] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [startAge, setStartAge] = useState("");
  const [endAge, setEndAge] = useState("");
  
  // Mock data for charts
  const transformerAgeData = [
    { age: "0-5", count: 25 },
    { age: "6-10", count: 42 },
    { age: "11-15", count: 68 },
    { age: "16-20", count: 53 },
    { age: "21-25", count: 31 },
    { age: "26-30", count: 15 },
    { age: "31+", count: 7 }
  ];
  
  const transformerManufacturerData = [
    { name: "ABB", count: 87 },
    { name: "Siemens", count: 65 },
    { name: "Mitsubishi", count: 43 },
    { name: "Hitachi", count: 28 },
    { name: "OSAKA", count: 19 },
    { name: "อื่นๆ", count: 12 }
  ];
  
  const transformerRegionData = [
    { region: "ภาคเหนือ", count: 45 },
    { region: "ภาคตะวันออกเฉียงเหนือ", count: 78 },
    { region: "ภาคกลาง", count: 110 },
    { region: "ภาคตะวันออก", count: 53 },
    { region: "ภาคตะวันตก", count: 32 },
    { region: "ภาคใต้", count: 37 }
  ];
  
  const damageEquipmentGroupData = [
    { group: "Core", count: 12 },
    { group: "Winding", count: 38 },
    { group: "Bushing", count: 25 },
    { group: "Tap Changer", count: 19 },
    { group: "Tank", count: 8 },
    { group: "Cooling System", count: 15 },
    { group: "Protection Devices", count: 22 }
  ];
  
  const damagePartsData = [
    { part: "บุชชิ่ง HV", count: 18 },
    { part: "บุชชิ่ง LV", count: 12 },
    { part: "ขดลวด HV", count: 25 },
    { part: "ขดลวด LV", count: 22 },
    { part: "OLTC", count: 16 },
    { part: "อุปกรณ์ระบายความร้อน", count: 14 },
    { part: "ถังน้ำมัน", count: 7 },
    { part: "แกนเหล็ก", count: 9 },
    { part: "อุปกรณ์ป้องกัน", count: 13 }
  ];
  
  const damageDetailsData = [
    { detail: "น้ำมันรั่วซึม", count: 32 },
    { detail: "Short Circuit", count: 18 },
    { detail: "Overheating", count: 24 },
    { detail: "Mechanical Damage", count: 15 },
    { detail: "Insulation Failure", count: 28 },
    { detail: "Moisture Contamination", count: 12 },
    { detail: "Corrosion", count: 8 }
  ];
  
  const damageCauseData = [
    { cause: "อายุการใช้งานนาน", count: 42 },
    { cause: "ฟ้าผ่า", count: 23 },
    { cause: "ความชื้น", count: 18 },
    { cause: "การบำรุงรักษาไม่เหมาะสม", count: 25 },
    { cause: "การติดตั้งไม่ถูกต้อง", count: 14 },
    { cause: "สัตว์ทำลาย", count: 7 },
    { cause: "คุณภาพน้ำมันแย่", count: 11 }
  ];
  
  const damageSeverityData = [
    { severity: "ต่ำ", count: 45 },
    { severity: "ปานกลาง", count: 38 },
    { severity: "สูง", count: 22 },
    { severity: "รุนแรง", count: 8 }
  ];
  
  const damageManufacturerData = [
    { name: "ABB", count: 28 },
    { name: "Siemens", count: 22 },
    { name: "Mitsubishi", count: 15 },
    { name: "Hitachi", count: 12 },
    { name: "OSAKA", count: 8 },
    { name: "อื่นๆ", count: 5 }
  ];
  
  const damageRegionData = [
    { region: "ภาคเหนือ", count: 15 },
    { region: "ภาคตะวันออกเฉียงเหนือ", count: 32 },
    { region: "ภาคกลาง", count: 38 },
    { region: "ภาคตะวันออก", count: 19 },
    { region: "ภาคตะวันตก", count: 12 },
    { region: "ภาคใต้", count: 14 }
  ];
  
  const damageAgeData = [
    { age: "0-5", count: 8 },
    { age: "6-10", count: 15 },
    { age: "11-15", count: 26 },
    { age: "16-20", count: 32 },
    { age: "21-25", count: 22 },
    { age: "26-30", count: 12 },
    { age: "31+", count: 5 }
  ];

  const handleGenerateReport = (type) => {
    setReportType(type);
    toast({
      title: "รายงานถูกสร้างเรียบร้อย",
      description: "กำลังแสดงผลรายงาน" + getReportTitle(type),
    });
    setShowReport(true);
  };

  const getReportTitle = (type) => {
    switch (type) {
      case "transformerAge": return "ความสัมพันธ์ของจำนวนหม้อแปลงเมื่อเทียบกับอายุการใช้งาน";
      case "transformerManufacturer": return "ความสัมพันธ์ของจำนวนหม้อแปลงกับบริษัทผู้ผลิต";
      case "transformerRegion": return "ความสัมพันธ์ของจำนวนหม้อแปลงในแต่ละเขตสถานีไฟฟ้า";
      case "damageEquipmentGroup": return "จำนวนครั้งที่เกิดความเสียหายแบ่งตามกลุ่มอุปกรณ์";
      case "damageParts": return "จำนวนครั้งที่เกิดความเสียหายแบ่งตามชิ้นอุปกรณ์";
      case "damageDetails": return "จำนวนครั้งที่เกิดความเสียหายแบ่งตามรายละเอียดของความผิดปกติ";
      case "damageCause": return "จำนวนครั้งที่เกิดความเสียหายแบ่งตามสาเหตุที่แท้จริง";
      case "damageSeverity": return "จำนวนครั้งที่เกิดความเสียหายแบ่งตามระดับความรุนแรง";
      case "damageManufacturer": return "จำนวนครั้งที่เกิดความเสียหายแบ่งตามบริษัทผู้ผลิต";
      case "damageRegion": return "จำนวนครั้งที่เกิดความเสียหายแบ่งตามเขต";
      case "damageAge": return "จำนวนครั้งที่เกิดความเสียหายแบ่งตามอายุการใช้งาน";
      default: return "";
    }
  };

  const getReportData = () => {
    switch (reportType) {
      case "transformerAge": return transformerAgeData;
      case "transformerManufacturer": return transformerManufacturerData;
      case "transformerRegion": return transformerRegionData;
      case "damageEquipmentGroup": return damageEquipmentGroupData;
      case "damageParts": return damagePartsData;
      case "damageDetails": return damageDetailsData;
      case "damageCause": return damageCauseData;
      case "damageSeverity": return damageSeverityData;
      case "damageManufacturer": return damageManufacturerData;
      case "damageRegion": return damageRegionData;
      case "damageAge": return damageAgeData;
      default: return [];
    }
  };
  
  const getDataKeyForChart = () => {
    switch (reportType) {
      case "transformerAge": return { x: "age", y: "count" };
      case "transformerManufacturer": return { x: "name", y: "count" };
      case "transformerRegion": return { x: "region", y: "count" };
      case "damageEquipmentGroup": return { x: "group", y: "count" };
      case "damageParts": return { x: "part", y: "count" };
      case "damageDetails": return { x: "detail", y: "count" };
      case "damageCause": return { x: "cause", y: "count" };
      case "damageSeverity": return { x: "severity", y: "count" };
      case "damageManufacturer": return { x: "name", y: "count" };
      case "damageRegion": return { x: "region", y: "count" };
      case "damageAge": return { x: "age", y: "count" };
      default: return { x: "", y: "" };
    }
  };

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0442AF]">รายงานมาตรฐาน</h1>
          <p className="text-gray-500">แสดงความสัมพันธ์ทางสถิติเกี่ยวกับหม้อแปลงและข้อมูลความเสียหาย</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-8 bg-[#f0f4fa]">
        <Card className="shadow-md rounded-xl border-0">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6">รายงานความสัมพันธ์ของจำนวนหม้อแปลง</h2>
            
            <div className="space-y-8">
              {/* Transformer Age Report */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">แสดงความสัมพันธ์ของจำนวนหม้อแปลงเมื่อเทียบกับอายุการใช้งาน</h3>
                <div className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="space-y-2">
                    <Label htmlFor="start-age">ช่วงอายุเริ่มต้น</Label>
                    <Select value={startAge} onValueChange={setStartAge}>
                      <SelectTrigger id="start-age" className="w-40">
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
                      <SelectTrigger id="end-age" className="w-40">
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
                  <Button 
                    onClick={() => handleGenerateReport("transformerAge")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    แสดงข้อมูล
                  </Button>
                </div>
              </div>
              
              {/* Transformer Manufacturer Report */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">แสดงความสัมพันธ์ของจำนวนหม้อแปลงกับบริษัทผู้ผลิต</h3>
                <Button 
                  onClick={() => handleGenerateReport("transformerManufacturer")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  แสดงข้อมูล
                </Button>
              </div>
              
              {/* Transformer Region Report */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">แสดงความสัมพันธ์ของจำนวนหม้อแปลงในแต่ละเขตสถานีไฟฟ้า</h3>
                <Button 
                  onClick={() => handleGenerateReport("transformerRegion")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  แสดงข้อมูล
                </Button>
              </div>
              
              {/* Damage Equipment Group Report */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">แสดงจำนวนครั้งที่เกิดความเสียหายแบ่งตามกลุ่มอุปกรณ์</h3>
                <Button 
                  onClick={() => handleGenerateReport("damageEquipmentGroup")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  แสดงข้อมูล
                </Button>
              </div>
              
              {/* Damage Parts Report */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">แสดงจำนวนครั้งที่เกิดความเสียหายแบ่งตามชิ้นอุปกรณ์</h3>
                <Button 
                  onClick={() => handleGenerateReport("damageParts")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  แสดงข้อมูล
                </Button>
              </div>
              
              {/* Damage Details Report */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">แสดงจำนวนครั้งที่เกิดความเสียหายแบ่งตามรายละเอียดของความผิดปกติ</h3>
                <Button 
                  onClick={() => handleGenerateReport("damageDetails")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  แสดงข้อมูล
                </Button>
              </div>
              
              {/* Damage Cause Report */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">แสดงจำนวนครั้งที่เกิดความเสียหายแบ่งตามสาเหตุที่แท้จริง</h3>
                <Button 
                  onClick={() => handleGenerateReport("damageCause")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  แสดงข้อมูล
                </Button>
              </div>
              
              {/* Damage Severity Report */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">แสดงจำนวนครั้งที่เกิดความเสียหายแบ่งตามระดับความรุนแรง</h3>
                <Button 
                  onClick={() => handleGenerateReport("damageSeverity")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  แสดงข้อมูล
                </Button>
              </div>
              
              {/* Damage Manufacturer Report */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">แสดงจำนวนครั้งที่เกิดความเสียหายแบ่งตามบริษัทผู้ผลิต</h3>
                <Button 
                  onClick={() => handleGenerateReport("damageManufacturer")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  แสดงข้อมูล
                </Button>
              </div>
              
              {/* Damage Region Report */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">แสดงจำนวนครั้งที่เกิดความเสียหายแบ่งตามเขต</h3>
                <Button 
                  onClick={() => handleGenerateReport("damageRegion")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  แสดงข้อมูล
                </Button>
              </div>
              
              {/* Damage Age Report */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">แสดงจำนวนครั้งที่เกิดความเสียหายแบ่งตามอายุการใช้งาน</h3>
                <div className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="space-y-2">
                    <Label htmlFor="damage-start-age">ช่วงอายุเริ่มต้น</Label>
                    <Select>
                      <SelectTrigger id="damage-start-age" className="w-40">
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
                    <Label htmlFor="damage-end-age">ช่วงอายุสิ้นสุด</Label>
                    <Select>
                      <SelectTrigger id="damage-end-age" className="w-40">
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
                  <Button 
                    onClick={() => handleGenerateReport("damageAge")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    แสดงข้อมูล
                  </Button>
                </div>
              </div>
            </div>
            
            {showReport && (
              <div className="mt-10 pt-8 border-t border-gray-200 animate-fade-in">
                <h3 className="text-xl font-bold mb-4 text-center">{getReportTitle(reportType)}</h3>
                
                <Tabs defaultValue="chart" className="w-full mt-6">
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                    <TabsTrigger value="chart">แผนภูมิ</TabsTrigger>
                    <TabsTrigger value="table">ตาราง</TabsTrigger>
                  </TabsList>
                  <TabsContent value="chart">
                    <Card>
                      <CardContent className="p-6">
                        <div className="h-80 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={getReportData()}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey={getDataKeyForChart().x} />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey={getDataKeyForChart().y} name="จำนวน" fill="#3b82f6" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="table">
                    <Card>
                      <CardContent className="p-6">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-slate-100">
                                <th className="border border-slate-200 p-2">
                                  {(() => {
                                    switch (reportType) {
                                      case "transformerAge":
                                      case "damageAge":
                                        return "อายุการใช้งาน (ปี)";
                                      case "transformerManufacturer":
                                      case "damageManufacturer":
                                        return "ชื่อบริษัทผู้ผลิต";
                                      case "transformerRegion":
                                      case "damageRegion":
                                        return "เขตสถานีไฟฟ้า";
                                      case "damageEquipmentGroup":
                                        return "กลุ่มอุปกรณ์";
                                      case "damageParts":
                                        return "ชิ้นอุปกรณ์";
                                      case "damageDetails":
                                        return "รายละเอียดความผิดปกติ";
                                      case "damageCause":
                                        return "สาเหตุที่แท้จริง";
                                      case "damageSeverity":
                                        return "ระดับความรุนแรง";
                                      default:
                                        return "ประเภท";
                                    }
                                  })()}
                                </th>
                                <th className="border border-slate-200 p-2">จำนวน</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getReportData().map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                  <td className="border border-slate-200 p-2 text-center">
                                    {item[getDataKeyForChart().x]}
                                  </td>
                                  <td className="border border-slate-200 p-2 text-center">
                                    {item[getDataKeyForChart().y]}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                
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

export default StandardReport;
