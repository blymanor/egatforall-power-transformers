
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Droplet } from "lucide-react";

const data = [
  { date: '01/2024', volume: 38.9, reorderLevel: 150, safetyStock: 100 },
  { date: '02/2024', volume: 77.7, reorderLevel: 150, safetyStock: 100 },
  { date: '03/2024', volume: 116.6, reorderLevel: 150, safetyStock: 100 },
  { date: '04/2024', volume: 155.5, reorderLevel: 150, safetyStock: 100 },
  { date: '05/2024', volume: 194.3, reorderLevel: 150, safetyStock: 100 },
  { date: '06/2024', volume: 233.2, reorderLevel: 150, safetyStock: 100 },
];

const chartConfig = {
  volume: {
    label: "ปริมาณน้ำมัน (ลิตร)",
    color: "#FF8C00"
  },
  reorderLevel: {
    label: "Re-order Level",
    color: "#FF4500"
  },
  safetyStock: {
    label: "Safety Stock",
    color: "#8B0000"
  }
};

const TransformerOilInventory = () => {
  return (
    <DashboardLayout>
      <div className="p-6 animate-fade-in">
        <div className="flex flex-col gap-6">
          {/* Header section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-blue-700">น้ำมันหม้อแปลง</h1>
              <p className="text-gray-500">ระบบจัดการน้ำมันหม้อแปลงไฟฟ้า</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              >
                <Droplet className="mr-2 h-4 w-4" />
                รายงานการใช้งานน้ำมัน
              </Button>
            </div>
          </div>
          
          {/* Data input card */}
          <Card className="bg-gradient-to-r from-blue-50 to-white border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-1">กรุณากรอกราคาน้ำมันที่เบิกจ่ายของปีที่ผ่านมา</h3>
                <p className="text-sm text-gray-500 mb-4">(เพื่อคำนวณการเติมอัตโนมัติ ฯ)</p>
                <Button 
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all"
                >
                  คลิกเพื่อกรอกข้อมูล
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Inventory summary */}
            <div className="lg:col-span-1">
              <Card className="h-full border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="border-b border-gray-100 bg-white">
                  <CardTitle className="text-lg font-semibold text-blue-700">สรุปข้อมูลน้ำมันหม้อแปลง</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <Droplet className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">ปริมาณน้ำมันคงเหลือ</p>
                        <h3 className="text-2xl font-bold text-blue-800">447 ลิตร</h3>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="text-gray-700 font-medium mb-1">สถานะ</div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                        <div className="text-base">เบิกใช้ได้ตามปกติ</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="text-gray-700 font-medium mb-1">Re-order Level</div>
                      <div className="text-base">150 ลิตร</div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="text-gray-700 font-medium mb-1">Safety Stock</div>
                      <div className="text-base">100 ลิตร</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right column - Chart and table */}
            <div className="lg:col-span-2 space-y-6">
              {/* Chart */}
              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="border-b border-gray-100 bg-white">
                  <CardTitle className="text-lg font-semibold text-blue-700">แนวโน้มปริมาณน้ำมันหม้อแปลง</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-72 w-full">
                    <ChartContainer config={chartConfig}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart 
                          data={data} 
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                          <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fontSize: 12 }} 
                            tickMargin={10}
                          />
                          <YAxis 
                            tick={{ fontSize: 12 }}
                            tickMargin={10}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend verticalAlign="bottom" height={36} />
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
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Data table */}
              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="border-b border-gray-100 bg-white flex flex-col md:flex-row justify-between items-start md:items-center">
                  <CardTitle className="text-lg font-semibold text-blue-700">ตารางข้อมูล</CardTitle>
                  
                  <div className="w-full md:w-64 mt-2 md:mt-0">
                    <Input 
                      placeholder="ค้นหาข้อมูล..." 
                      className="bg-white border border-gray-200"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="bg-gray-50 text-gray-700">วันที่</TableHead>
                          <TableHead className="bg-gray-50 text-gray-700">ปริมาณ (ลิตร)</TableHead>
                          <TableHead className="bg-gray-50 text-gray-700">Re-order Level</TableHead>
                          <TableHead className="bg-gray-50 text-gray-700">Safety Stock</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.map((row, index) => (
                          <TableRow key={index} className="hover:bg-gray-50">
                            <TableCell>{row.date}</TableCell>
                            <TableCell className="font-medium">{row.volume}</TableCell>
                            <TableCell>150</TableCell>
                            <TableCell>100</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="py-4 px-6 border-t border-gray-100">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TransformerOilInventory;
