
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Droplet, ChartLine, AlertCircle, RefreshCw } from "lucide-react";

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
    color: "#3B82F6"
  },
  reorderLevel: {
    label: "Re-order Level",
    color: "#F59E0B"
  },
  safetyStock: {
    label: "Safety Stock",
    color: "#EF4444"
  }
};

const TransformerOilInventory = () => {
  return (
    <DashboardLayout>
      <div className="p-6 animate-fade-in">
        <div className="flex flex-col gap-8">
          {/* Header section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">น้ำมันหม้อแปลง</h1>
              <p className="text-gray-500">ระบบจัดการน้ำมันหม้อแปลงไฟฟ้า</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Droplet className="mr-2 h-4 w-4" />
                รายงานการใช้งานน้ำมัน
              </Button>
            </div>
          </div>
          
          {/* Data input card */}
          <Card className="bg-gradient-to-r from-blue-50 to-white border-none shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardContent className="p-6">
              <div className="text-center relative overflow-hidden p-4">
                <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl transform -translate-x-1/2"></div>
                <h3 className="text-lg font-medium mb-1 relative z-10">กรุณากรอกราคาน้ำมันที่เบิกจ่ายของปีที่ผ่านมา</h3>
                <p className="text-sm text-gray-500 mb-4 relative z-10">(เพื่อคำนวณการเติมอัตโนมัติ ฯ)</p>
                <Button 
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all relative z-10"
                >
                  คลิกเพื่อกรอกข้อมูล
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left column - Inventory summary */}
            <div className="lg:col-span-3">
              <Card className="h-full border-none shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-b from-white to-blue-50/50">
                <CardHeader className="border-b border-blue-100 bg-white rounded-t-lg">
                  <CardTitle className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                    <Droplet className="h-5 w-5 text-blue-500" />
                    สรุปข้อมูลน้ำมันหม้อแปลง
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-4 shadow-md">
                        <Droplet className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">ปริมาณน้ำมันคงเหลือ</p>
                        <h3 className="text-2xl font-bold text-blue-800">447 ลิตร</h3>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-all duration-300">
                      <div className="text-gray-700 font-medium mb-2">สถานะ</div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                        <div className="text-base font-medium text-green-700">เบิกใช้ได้ตามปกติ</div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-all duration-300">
                      <div className="text-gray-700 font-medium mb-2">Re-order Level</div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                        <div className="text-base font-medium">150 ลิตร</div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-all duration-300">
                      <div className="text-gray-700 font-medium mb-2">Safety Stock</div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                        <div className="text-base font-medium">100 ลิตร</div>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      อัพเดทข้อมูล
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right column - Chart and table */}
            <div className="lg:col-span-9 space-y-8">
              {/* Chart */}
              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white rounded-t-lg flex flex-row justify-between items-center">
                  <CardTitle className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                    <ChartLine className="h-5 w-5 text-blue-500" />
                    แนวโน้มปริมาณน้ำมันหม้อแปลง
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 bg-white">
                  {/* Fixed height with increased size */}
                  <div className="h-96 max-h-96 w-full">
                    <ChartContainer config={chartConfig}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart 
                          data={data} 
                          margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
                        >
                          <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fontSize: 12 }} 
                            tickMargin={10}
                            height={30}
                          />
                          <YAxis 
                            tick={{ fontSize: 12 }}
                            tickMargin={10}
                            width={50}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend 
                            verticalAlign="bottom" 
                            height={36} 
                            wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="volume" 
                            name="ปริมาณน้ำมัน (ลิตร)" 
                            stroke="#3B82F6" 
                            fill="#DBEAFE" 
                            fillOpacity={0.8}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="reorderLevel" 
                            name="Re-order Level" 
                            stroke="#F59E0B" 
                            fill="#F59E0B" 
                            fillOpacity={0.3} 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="safetyStock" 
                            name="Safety Stock" 
                            stroke="#EF4444" 
                            fill="#EF4444" 
                            fillOpacity={0.3} 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Data table */}
              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white rounded-t-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <CardTitle className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                    ตารางข้อมูล
                  </CardTitle>
                  
                  <div className="w-full md:w-64">
                    <Input 
                      placeholder="ค้นหาข้อมูล..." 
                      className="bg-white border border-blue-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="bg-blue-50 text-blue-700 text-center">วันที่</TableHead>
                          <TableHead className="bg-blue-50 text-blue-700 text-center">ปริมาณ (ลิตร)</TableHead>
                          <TableHead className="bg-blue-50 text-blue-700 text-center">Re-order Level</TableHead>
                          <TableHead className="bg-blue-50 text-blue-700 text-center">Safety Stock</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.map((row, index) => (
                          <TableRow key={index} className="hover:bg-blue-50/50 transition-colors duration-200">
                            <TableCell className="text-center font-medium">{row.date}</TableCell>
                            <TableCell className="text-center font-medium text-blue-700">{row.volume}</TableCell>
                            <TableCell className="text-center text-amber-600">150</TableCell>
                            <TableCell className="text-center text-red-600">100</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="py-4 px-6 border-t border-gray-100 bg-white rounded-b-lg">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" className="hover:bg-blue-50 hover:text-blue-700 transition-colors" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive className="bg-blue-600">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" className="hover:bg-blue-50 hover:text-blue-700 transition-colors">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" className="hover:bg-blue-50 hover:text-blue-700 transition-colors">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" className="hover:bg-blue-50 hover:text-blue-700 transition-colors" />
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
