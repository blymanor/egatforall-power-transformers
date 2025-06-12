
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DamageReport = () => {
  const [conditions, setConditions] = useState({
    startAge: "",
    endAge: "",
    region: false,
    station: false,
    manufacturer: false,
    transformer: false,
    waterContent: false,
    usage: false,
    ageGroup: "",
    damageLevel: false,
    groupBy: ""
  });

  const [showReport, setShowReport] = useState(false);

  const chartData = [
    { region: "เหนือ", count: 12 },
    { region: "ตะวันออกเฉียงเหนือ", count: 8 },
    { region: "กลาง", count: 15 },
    { region: "ใต้", count: 6 },
  ];

  const handleShowReport = () => {
    setShowReport(true);
  };

  // Generate age options from 0-20
  const ageOptions = Array.from({ length: 21 }, (_, i) => i);

  return (
    <DashboardLayout>
      <div className="bg-[#f0f4fa] p-6">
        <div className="border-l-4 border-blue-500 pl-4 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">รายงานข้อมูลความเสียหาย</h2>
          <p className="text-lg text-gray-600">Damage Report</p>
        </div>
      </div>

      <div className="p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-gray-800">รายงานตามผู้ใช้งานสำหรับข้อมูลความเสียหาย</h1>
                <p className="text-gray-600">สามารถเลือกได้เพียงแค่หนึ่งเงื่อนไขในการสร้างรายงาน</p>
              </div>

              {/* Form Section */}
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium text-gray-700 mb-2 block">อายุเริ่มต้น:</Label>
                    <Select value={conditions.startAge} onValueChange={(value) => setConditions({...conditions, startAge: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกอายุเริ่มต้น" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageOptions.map(age => (
                          <SelectItem key={age} value={age.toString()}>{age} ปี</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={conditions.region} 
                        onCheckedChange={(checked) => setConditions({...conditions, region: checked})}
                        id="region-use" 
                      />
                      <Label htmlFor="region-use" className="text-base font-medium text-gray-700 cursor-pointer">เขต : ใช้เงื่อนไข</Label>
                    </div>

                    <div>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกเขต" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="north">เหนือ</SelectItem>
                          <SelectItem value="northeast">ตะวันออกเฉียงเหนือ</SelectItem>
                          <SelectItem value="central">กลาง</SelectItem>
                          <SelectItem value="south">ใต้</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={conditions.manufacturer} 
                        onCheckedChange={(checked) => setConditions({...conditions, manufacturer: checked})}
                        id="manufacturer-use" 
                      />
                      <Label htmlFor="manufacturer-use" className="text-base font-medium text-gray-700 cursor-pointer">บริษัทผู้ผลิต : ใช้เงื่อนไข</Label>
                    </div>

                    <div>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกบริษัทผู้ผลิต" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="abb">ABB</SelectItem>
                          <SelectItem value="siemens">Siemens</SelectItem>
                          <SelectItem value="hitachi">Hitachi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={conditions.waterContent} 
                        onCheckedChange={(checked) => setConditions({...conditions, waterContent: checked})}
                        id="water-use" 
                      />
                      <Label htmlFor="water-use" className="text-base font-medium text-gray-700 cursor-pointer">สภาพแวดล้อม : ใช้เงื่อนไข</Label>
                    </div>

                    <div>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกสภาพแวดล้อม" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dry">แห้ง</SelectItem>
                          <SelectItem value="humid">ชื้น</SelectItem>
                          <SelectItem value="wet">เปียก</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={conditions.damageLevel} 
                        onCheckedChange={(checked) => setConditions({...conditions, damageLevel: checked})}
                        id="damage-use" 
                      />
                      <Label htmlFor="damage-use" className="text-base font-medium text-gray-700 cursor-pointer">รายละเอียดความผิดปกติ : ใช้เงื่อนไข</Label>
                    </div>

                    <div>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกรายละเอียดความผิดปกติ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minor">เล็กน้อย</SelectItem>
                          <SelectItem value="moderate">ปานกลาง</SelectItem>
                          <SelectItem value="severe">รุนแรง</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium text-gray-700 mb-2 block">อายุสิ้นสุด:</Label>
                    <Select value={conditions.endAge} onValueChange={(value) => setConditions({...conditions, endAge: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกอายุสิ้นสุด" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageOptions.map(age => (
                          <SelectItem key={age} value={age.toString()}>{age} ปี</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={conditions.station} 
                        onCheckedChange={(checked) => setConditions({...conditions, station: checked})}
                        id="station-use" 
                      />
                      <Label htmlFor="station-use" className="text-base font-medium text-gray-700 cursor-pointer">สถานีไฟฟ้า : ใช้เงื่อนไข</Label>
                    </div>

                    <div>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกสถานีไฟฟ้า" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="station1">สถานี 1</SelectItem>
                          <SelectItem value="station2">สถานี 2</SelectItem>
                          <SelectItem value="station3">สถานี 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={conditions.transformer} 
                        onCheckedChange={(checked) => setConditions({...conditions, transformer: checked})}
                        id="transformer-use" 
                      />
                      <Label htmlFor="transformer-use" className="text-base font-medium text-gray-700 cursor-pointer">หม่อมฟองไฟฟ้า : ใช้เงื่อนไข</Label>
                    </div>

                    <div>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกหม่อมฟองไฟฟ้า" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="type1">ชนิด 1</SelectItem>
                          <SelectItem value="type2">ชนิด 2</SelectItem>
                          <SelectItem value="type3">ชนิด 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={conditions.usage} 
                        onCheckedChange={(checked) => setConditions({...conditions, usage: checked})}
                        id="usage-use" 
                      />
                      <Label htmlFor="usage-use" className="text-base font-medium text-gray-700 cursor-pointer">สถานะการใช้งาน : ใช้เงื่อนไข</Label>
                    </div>

                    <div>
                      <Select value={conditions.usage} onValueChange={(value) => setConditions({...conditions, usage: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกสถานะการใช้งาน" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">ใช้งาน</SelectItem>
                          <SelectItem value="standby">สำรอง</SelectItem>
                          <SelectItem value="maintenance">ซ่อมบำรุง</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Group By Section */}
              <div className="border-t pt-6">
                <Label className="text-lg font-medium text-gray-700 mb-4 block">เลือกการแบ่งกลุ่ม (แบ่งตาม)</Label>
                <Select value={conditions.groupBy} onValueChange={(value) => setConditions({...conditions, groupBy: value})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="เขต" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="region">เขต</SelectItem>
                    <SelectItem value="manufacturer">บริษัทผู้ผลิต</SelectItem>
                    <SelectItem value="age">อายุ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Generate Report Button */}
              <div className="flex justify-center pt-6">
                <Button 
                  onClick={handleShowReport}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 text-lg rounded-lg"
                >
                  แสดงรายงาน
                </Button>
              </div>

              {/* Chart Section */}
              {showReport && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-black mb-6">ผลลัพธ์รายงาน</h3>
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="region" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#dc2626" name="จำนวนหม้อแปลงชำรุด" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DamageReport;
