
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, BarChart, Pie, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from "recharts";

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface ReportResultsProps {
  data: ChartData[];
  groupByLabel: string;
  showReport: boolean;
}

const ReportResults: React.FC<ReportResultsProps> = ({ data, groupByLabel, showReport }) => {
  if (!showReport) return null;
  
  const total = data.reduce((acc, cur) => acc + cur.value, 0);
  
  return (
    <div className="mt-10 pt-8 border-t border-gray-200 animate-fade-in">
      <h3 className="text-xl font-bold mb-6 text-center">รายงานหม้อแปลงไฟฟ้า (แบ่งตาม{groupByLabel})</h3>
      
      <Tabs defaultValue="pie" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="pie">แผนภูมิวงกลม</TabsTrigger>
          <TabsTrigger value="bar">แผนภูมิแท่ง</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pie" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="chart-container w-full" style={{ height: "400px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, bottom: 60, left: 0 }}>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="40%"
                      labelLine={true}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend 
                      layout="horizontal" 
                      verticalAlign="bottom"
                      align="center" 
                      wrapperStyle={{ 
                        paddingTop: "20px",
                        bottom: 0
                      }}
                    />
                    <Tooltip formatter={(value) => [`จำนวน: ${value}`, groupByLabel]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bar" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="chart-container w-full" style={{ height: "400px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`จำนวน: ${value}`, groupByLabel]} />
                    <Legend 
                      layout="horizontal" 
                      verticalAlign="bottom"
                      align="center"
                      wrapperStyle={{ 
                        paddingTop: "20px",
                        bottom: 0
                      }}
                    />
                    <Bar dataKey="value" name="จำนวนหม้อแปลง">
                      {data.map((entry, index) => (
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
                <th className="border border-slate-200 p-2">{groupByLabel}</th>
                <th className="border border-slate-200 p-2">จำนวน</th>
                <th className="border border-slate-200 p-2">เปอร์เซ็นต์</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
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
  );
};

export default ReportResults;
