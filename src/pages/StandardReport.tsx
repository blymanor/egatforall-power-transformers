
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StandardReport = () => {
  const { toast } = useToast();
  const [reportType, setReportType] = useState("monthly");
  const [showReport, setShowReport] = useState(false);
  
  // Mock data for the bar chart
  const monthlySalesData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 700 },
    { name: 'Jun', value: 500 },
    { name: 'Jul', value: 600 },
    { name: 'Aug', value: 900 },
    { name: 'Sep', value: 800 },
    { name: 'Oct', value: 700 },
    { name: 'Nov', value: 500 },
    { name: 'Dec', value: 400 },
  ];
  
  const handleGenerateReport = () => {
    toast({
      title: "รายงานถูกสร้างเรียบร้อย",
      description: "กำลังแสดงผลรายงานตามเงื่อนไขที่เลือก",
    });
    setShowReport(true);
  };

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0442AF]">รายงานมาตรฐาน</h1>
          <p className="text-gray-500">Standard Reports</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="mx-auto shadow-md rounded-xl border-0">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6">กรุณาเลือกเงื่อนไขสำหรับรายงานมาตรฐาน</h2>
            
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="report-date" className="font-medium">วันที่รายงาน</Label>
                  <Input 
                    id="report-date" 
                    type="date" 
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="report-type" className="font-medium">ประเภทรายงาน</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger id="report-type" className="w-full">
                      <SelectValue placeholder="เลือกประเภทรายงาน" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">รายวัน</SelectItem>
                      <SelectItem value="weekly">รายสัปดาห์</SelectItem>
                      <SelectItem value="monthly">รายเดือน</SelectItem>
                      <SelectItem value="quarterly">รายไตรมาส</SelectItem>
                      <SelectItem value="yearly">รายปี</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="filter-region" className="font-medium">เขตพื้นที่</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="filter-region" className="w-full">
                      <SelectValue placeholder="เลือกเขตพื้นที่" />
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
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="group-by" className="font-medium">จัดกลุ่มตาม</Label>
                  <Select defaultValue="region">
                    <SelectTrigger id="group-by" className="w-full">
                      <SelectValue placeholder="เลือกการจัดกลุ่ม" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region">เขตพื้นที่</SelectItem>
                      <SelectItem value="station">สถานีไฟฟ้า</SelectItem>
                      <SelectItem value="manufacturer">บริษัทผู้ผลิต</SelectItem>
                      <SelectItem value="status">สถานะการใช้งาน</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="report-format" className="font-medium">รูปแบบรายงาน</Label>
                  <Select defaultValue="chart">
                    <SelectTrigger id="report-format" className="w-full">
                      <SelectValue placeholder="เลือกรูปแบบรายงาน" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="table">ตาราง</SelectItem>
                      <SelectItem value="chart">แผนภูมิ</SelectItem>
                      <SelectItem value="both">ทั้งตารางและแผนภูมิ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleGenerateReport} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg"
                >
                  สร้างรายงาน
                </Button>
              </div>
            </div>
            
            {showReport && (
              <div className="mt-10 pt-8 border-t border-gray-200 animate-fade-in">
                <h3 className="text-xl font-bold mb-4 text-center">ผลลัพธ์รายงาน {reportType === 'monthly' ? 'รายเดือน' : 'รายงาน'}</h3>
                
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
                              data={monthlySalesData}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="value" name="มูลค่า" fill="#3b82f6" />
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
                                <th className="border border-slate-200 p-2">เดือน</th>
                                <th className="border border-slate-200 p-2">มูลค่า</th>
                              </tr>
                            </thead>
                            <tbody>
                              {monthlySalesData.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                  <td className="border border-slate-200 p-2 text-center">{item.name}</td>
                                  <td className="border border-slate-200 p-2 text-center">{item.value}</td>
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
