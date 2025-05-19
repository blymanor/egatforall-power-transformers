
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const data = [
  { date: '01/2024', volume: 38.9 },
  { date: '02/2024', volume: 77.7 },
  { date: '03/2024', volume: 116.6 },
  { date: '04/2024', volume: 155.5 },
  { date: '05/2024', volume: 194.3 },
  { date: '06/2024', volume: 233.2 },
];

const TransformerOilInventory = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <Card className="max-w-full overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white p-6 border-b">
            <CardTitle className="text-xl font-bold text-blue-700">
              น้ำมันหม้อแปลง
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              {/* Top card with title and action button */}
              <Card className="mb-8 bg-gray-50 border border-gray-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-1">กรุณากรอกราคาน้ำมันที่เบิกจ่ายของปีที่ผ่านมา</h3>
                    <p className="text-sm text-gray-500 mb-2">(เพื่อคำนวณการเติมอัตโนมัติ ฯ)</p>
                    <Button 
                      className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                    >
                      คลิกเพื่อกรอกข้อมูล
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Oil inventory overview */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">ปริมาณน้ำมันคงเหลือ 447 ลิตร</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-md border border-gray-200">
                    <div className="text-gray-700 font-medium mb-2">Action</div>
                    <div className="text-base">เบิกใช้ได้ตามปกติ</div>
                  </div>
                </div>
                
                {/* Chart */}
                <div className="bg-white rounded-md border border-gray-200 p-4 h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid stroke="#f5f5f5" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="volume" 
                        name="ปริมาณน้ำมัน (ลิตร)" 
                        stroke="#FF8C00" 
                        fill="#FFE4B5" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="reorderLevel" 
                        name="Re-order Level" 
                        stroke="#FF4500" 
                        fill="#FF4500" 
                        fillOpacity={0.3} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="safetyStock" 
                        name="Safety Stock" 
                        stroke="#8B0000" 
                        fill="#8B0000" 
                        fillOpacity={0.3} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Legend */}
                <div className="flex justify-end mt-3 gap-6">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-orange-400 mr-2"></div>
                    <span className="text-sm">Re-order Level</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-700 mr-2"></div>
                    <span className="text-sm">Safety Stock</span>
                  </div>
                </div>
              </div>
              
              {/* Data table */}
              <div className="bg-white p-4 rounded-md border border-gray-200">
                <h3 className="text-lg font-medium mb-4">ตารางข้อมูล</h3>
                <div className="overflow-x-auto">
                  <Table className="bg-white">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="bg-gray-50">วันที่</TableHead>
                        <TableHead className="bg-gray-50">ปริมาณ (ลิตร)</TableHead>
                        <TableHead className="bg-gray-50">Re-order Level</TableHead>
                        <TableHead className="bg-gray-50">Safety Stock</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.volume}</TableCell>
                          <TableCell>150</TableCell>
                          <TableCell>100</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransformerOilInventory;
