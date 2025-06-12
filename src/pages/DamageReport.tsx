
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DamageReport = () => {
  const [conditions, setConditions] = useState({
    startMonth: "",
    endMonth: "",
    region: "",
    manufacturer: "",
    waterContent: "",
    ageGroup: "",
    damageLevel: "",
    usage: "",
    groupBy: ""
  });

  const chartData = [
    { region: "เหนือ", count: 12 },
    { region: "ตะวันออกเฉียงเหนือ", count: 8 },
    { region: "กลาง", count: 15 },
    { region: "ใต้", count: 6 },
  ];

  return (
    <DashboardLayout>
      <div className="bg-[#f0f4fa] p-6">
        <div className="mb-4">
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
                <p className="text-gray-600">กรุณาเลือกหนึ่งช่องใน การสร้างรายงาน</p>
                <p className="text-blue-600 underline cursor-pointer">เลือกช่องใดใน การสร้างรายงาน (เพียงหนึ่งช่องใดช่องเท่านั้น)</p>
              </div>

              {/* Form Section */}
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium text-gray-700 mb-2 block">อายุเริ่มต้น:</Label>
                    <Select value={conditions.startMonth} onValueChange={(value) => setConditions({...conditions, startMonth: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกอายุเริ่มต้น" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 ปี</SelectItem>
                        <SelectItem value="5">5 ปี</SelectItem>
                        <SelectItem value="10">10 ปี</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label className="text-base font-medium text-gray-700">เขต :</Label>
                    <div className="flex items-center space-x-2">
                      <RadioGroup value={conditions.region} onValueChange={(value) => setConditions({...conditions, region: value})} className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="use" id="region-use" />
                          <Label htmlFor="region-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-use" id="region-no-use" />
                          <Label htmlFor="region-no-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div>
                    <Select value={conditions.region} onValueChange={(value) => setConditions({...conditions, region: value})}>
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

                  <div className="flex items-center space-x-4">
                    <Label className="text-base font-medium text-gray-700">บริษัทผู้ผลิต :</Label>
                    <div className="flex items-center space-x-2">
                      <RadioGroup value={conditions.manufacturer} onValueChange={(value) => setConditions({...conditions, manufacturer: value})} className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="use" id="manufacturer-use" />
                          <Label htmlFor="manufacturer-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-use" id="manufacturer-no-use" />
                          <Label htmlFor="manufacturer-no-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div>
                    <Select value={conditions.manufacturer} onValueChange={(value) => setConditions({...conditions, manufacturer: value})}>
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

                  <div className="flex items-center space-x-4">
                    <Label className="text-base font-medium text-gray-700">สภาพแวดล้อม :</Label>
                    <div className="flex items-center space-x-2">
                      <RadioGroup value={conditions.waterContent} onValueChange={(value) => setConditions({...conditions, waterContent: value})} className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="use" id="water-use" />
                          <Label htmlFor="water-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-use" id="water-no-use" />
                          <Label htmlFor="water-no-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div>
                    <Select value={conditions.waterContent} onValueChange={(value) => setConditions({...conditions, waterContent: value})}>
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

                  <div className="flex items-center space-x-4">
                    <Label className="text-base font-medium text-gray-700">รายละเอียดความผิดปกติ :</Label>
                    <div className="flex items-center space-x-2">
                      <RadioGroup value={conditions.damageLevel} onValueChange={(value) => setConditions({...conditions, damageLevel: value})} className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="use" id="damage-use" />
                          <Label htmlFor="damage-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-use" id="damage-no-use" />
                          <Label htmlFor="damage-no-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div>
                    <Select value={conditions.damageLevel} onValueChange={(value) => setConditions({...conditions, damageLevel: value})}>
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

                  <div className="flex items-center space-x-4">
                    <Label className="text-base font-medium text-gray-700">อันส่วนที่เสียหาย :</Label>
                    <div className="flex items-center space-x-2">
                      <RadioGroup className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="use" id="part-use" />
                          <Label htmlFor="part-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-use" id="part-no-use" />
                          <Label htmlFor="part-no-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกอันส่วนที่เสียหาย" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="winding">คอยล์</SelectItem>
                        <SelectItem value="core">แกนเหล็ก</SelectItem>
                        <SelectItem value="tank">ถัง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label className="text-base font-medium text-gray-700">สาเหตุที่เกิดความ :</Label>
                    <div className="flex items-center space-x-2">
                      <RadioGroup className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="use" id="cause-use" />
                          <Label htmlFor="cause-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-use" id="cause-no-use" />
                          <Label htmlFor="cause-no-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกสาเหตุที่เกิดความ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="overload">โอเวอร์โหลด</SelectItem>
                        <SelectItem value="aging">เสื่อมสภาพ</SelectItem>
                        <SelectItem value="environment">สิ่งแวดล้อม</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium text-gray-700 mb-2 block">อายุสิ้นสุด:</Label>
                    <Select value={conditions.endMonth} onValueChange={(value) => setConditions({...conditions, endMonth: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกอายุสิ้นสุด" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 ปี</SelectItem>
                        <SelectItem value="20">20 ปี</SelectItem>
                        <SelectItem value="30">30 ปี</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label className="text-base font-medium text-gray-700">สถานีไฟฟ้า :</Label>
                    <div className="flex items-center space-x-2">
                      <RadioGroup className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="use" id="station-use" />
                          <Label htmlFor="station-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-use" id="station-no-use" />
                          <Label htmlFor="station-no-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                      </RadioGroup>
                    </div>
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

                  <div className="flex items-center space-x-4">
                    <Label className="text-base font-medium text-gray-700">หม่อมฟองไฟฟ้า :</Label>
                    <div className="flex items-center space-x-2">
                      <RadioGroup className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="use" id="transformer-use" />
                          <Label htmlFor="transformer-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-use" id="transformer-no-use" />
                          <Label htmlFor="transformer-no-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                      </RadioGroup>
                    </div>
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

                  <div className="flex items-center space-x-4">
                    <Label className="text-base font-medium text-gray-700">สถานะการใช้งาน :</Label>
                    <div className="flex items-center space-x-2">
                      <RadioGroup value={conditions.usage} onValueChange={(value) => setConditions({...conditions, usage: value})} className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="use" id="usage-use" />
                          <Label htmlFor="usage-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-use" id="usage-no-use" />
                          <Label htmlFor="usage-no-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                      </RadioGroup>
                    </div>
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

                  <div className="flex items-center space-x-4">
                    <Label className="text-base font-medium text-gray-700">กลุ่มอุปกรณ์ :</Label>
                    <div className="flex items-center space-x-2">
                      <RadioGroup className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="use" id="group-use" />
                          <Label htmlFor="group-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-use" id="group-no-use" />
                          <Label htmlFor="group-no-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกกลุ่มอุปกรณ์" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="group1">กลุ่ม 1</SelectItem>
                        <SelectItem value="group2">กลุ่ม 2</SelectItem>
                        <SelectItem value="group3">กลุ่ม 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label className="text-base font-medium text-gray-700">ระดับความเสียหาย :</Label>
                    <div className="flex items-center space-x-2">
                      <RadioGroup className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="use" id="damage-level-use" />
                          <Label htmlFor="damage-level-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-use" id="damage-level-no-use" />
                          <Label htmlFor="damage-level-no-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกระดับความเสียหาย" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">ต่ำ</SelectItem>
                        <SelectItem value="medium">กลาง</SelectItem>
                        <SelectItem value="high">สูง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label className="text-base font-medium text-gray-700">การจัดการ :</Label>
                    <div className="flex items-center space-x-2">
                      <RadioGroup className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="use" id="management-use" />
                          <Label htmlFor="management-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-use" id="management-no-use" />
                          <Label htmlFor="management-no-use" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกการจัดการ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="repair">ซ่อมแซม</SelectItem>
                        <SelectItem value="replace">เปลี่ยน</SelectItem>
                        <SelectItem value="monitor">ติดตาม</SelectItem>
                      </SelectContent>
                    </Select>
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
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 text-lg rounded-lg">
                  สร้างรายงาน
                </Button>
              </div>

              {/* Chart Section */}
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
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DamageReport;
