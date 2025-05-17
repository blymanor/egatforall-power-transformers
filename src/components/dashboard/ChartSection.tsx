
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, PieChart } from "lucide-react";

const ChartSection: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <BarChart className="mr-2 h-5 w-5" />
          แผนภูมิและกราฟ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar">
          <TabsList className="mb-4">
            <TabsTrigger value="bar" className="flex items-center">
              <BarChart className="mr-2 h-4 w-4" />
              Bar Chart
            </TabsTrigger>
            <TabsTrigger value="pie" className="flex items-center">
              <PieChart className="mr-2 h-4 w-4" />
              Pie Chart
            </TabsTrigger>
          </TabsList>
          <TabsContent value="bar" className="mt-0">
            <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-md border">
              <div className="flex h-full w-full p-4">
                {/* Simplified bar chart representation */}
                <div className="flex items-end justify-around w-full h-full gap-4">
                  <div className="flex flex-col items-center justify-end">
                    <div className="w-12 bg-green-500 rounded-t-sm" style={{ height: '60%' }}></div>
                    <span className="text-xs mt-1">สภาพดี</span>
                  </div>
                  <div className="flex flex-col items-center justify-end">
                    <div className="w-12 bg-yellow-500 rounded-t-sm" style={{ height: '25%' }}></div>
                    <span className="text-xs mt-1">ต้องซ่อม</span>
                  </div>
                  <div className="flex flex-col items-center justify-end">
                    <div className="w-12 bg-red-500 rounded-t-sm" style={{ height: '15%' }}></div>
                    <span className="text-xs mt-1">ชำรุด</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="pie" className="mt-0">
            <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-md border">
              <div className="relative h-32 w-32 rounded-full overflow-hidden">
                <div className="absolute inset-0" style={{ 
                  background: 'conic-gradient(#22c55e 0% 60%, #eab308 60% 85%, #ef4444 85% 100%)' 
                }}></div>
                <div className="absolute inset-[15%] bg-gray-50 rounded-full"></div>
              </div>
              <div className="ml-4">
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 bg-green-500 mr-2"></div>
                  <span className="text-sm">สภาพดี (60%)</span>
                </div>
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 bg-yellow-500 mr-2"></div>
                  <span className="text-sm">ต้องซ่อม (25%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 mr-2"></div>
                  <span className="text-sm">ชำรุด (15%)</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ChartSection;
