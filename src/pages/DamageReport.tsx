
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DamageReport = () => {
  const [selectedCondition, setSelectedCondition] = useState("");

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
              {/* Form Section with balanced layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-black mb-6">เลือกเงื่อนไขในการสร้างรายงาน</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <Label className="text-lg font-medium text-gray-700 mb-4 block">สถานะของหม้อแปลงไฟฟ้า</Label>
                      <RadioGroup value={selectedCondition} onValueChange={setSelectedCondition} className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="use-condition" id="use-condition" />
                          <Label htmlFor="use-condition" className="text-base text-gray-700 cursor-pointer">ใช้เงื่อนไข</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="good" id="good" />
                          <Label htmlFor="good" className="text-base text-gray-700 cursor-pointer">ดี</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="repair" id="repair" />
                          <Label htmlFor="repair" className="text-base text-gray-700 cursor-pointer">ต้องการซ่อมแซม</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="damaged" id="damaged" />
                          <Label htmlFor="damaged" className="text-base text-gray-700 cursor-pointer">ชำรุด</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="text-lg font-medium text-gray-700 mb-4 block">ประเภทหม้อแปลงไฟฟ้า</Label>
                      <RadioGroup className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="power" id="power" />
                          <Label htmlFor="power" className="text-base text-gray-700 cursor-pointer">Power</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="distribution" id="distribution" />
                          <Label htmlFor="distribution" className="text-base text-gray-700 cursor-pointer">Distribution</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="text-lg font-medium text-gray-700 mb-4 block">เขต</Label>
                      <RadioGroup className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="north" id="north" />
                          <Label htmlFor="north" className="text-base text-gray-700 cursor-pointer">เหนือ</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="northeast" id="northeast" />
                          <Label htmlFor="northeast" className="text-base text-gray-700 cursor-pointer">ตะวันออกเฉียงเหนือ</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="central" id="central" />
                          <Label htmlFor="central" className="text-base text-gray-700 cursor-pointer">กลาง</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="south" id="south" />
                          <Label htmlFor="south" className="text-base text-gray-700 cursor-pointer">ใต้</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-black mb-6">ข้อมูลเพิ่มเติม</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <Label className="text-lg font-medium text-gray-700 mb-4 block">บริษัทผู้ผลิต</Label>
                      <RadioGroup className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="abb" id="abb" />
                          <Label htmlFor="abb" className="text-base text-gray-700 cursor-pointer">ABB</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="siemens" id="siemens" />
                          <Label htmlFor="siemens" className="text-base text-gray-700 cursor-pointer">Siemens</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="hitachi" id="hitachi" />
                          <Label htmlFor="hitachi" className="text-base text-gray-700 cursor-pointer">Hitachi</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="mitsubishi" id="mitsubishi" />
                          <Label htmlFor="mitsubishi" className="text-base text-gray-700 cursor-pointer">Mitsubishi</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="text-lg font-medium text-gray-700 mb-4 block">ช่วงอายุการใช้งาน</Label>
                      <RadioGroup className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="0-10" id="age-0-10" />
                          <Label htmlFor="age-0-10" className="text-base text-gray-700 cursor-pointer">0-10 ปี</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="11-20" id="age-11-20" />
                          <Label htmlFor="age-11-20" className="text-base text-gray-700 cursor-pointer">11-20 ปี</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="21-30" id="age-21-30" />
                          <Label htmlFor="age-21-30" className="text-base text-gray-700 cursor-pointer">21-30 ปี</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="30+" id="age-30plus" />
                          <Label htmlFor="age-30plus" className="text-base text-gray-700 cursor-pointer">มากกว่า 30 ปี</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Report Button */}
              <div className="flex justify-center pt-6">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
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
