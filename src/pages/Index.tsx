
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import StatusCard from "@/components/dashboard/StatusCard";
import ChartSection from "@/components/dashboard/ChartSection";
import RecentMaintenance from "@/components/dashboard/RecentMaintenance";
import QuickActions from "@/components/dashboard/QuickActions";
import TransformerTable from "@/components/dashboard/TransformerTable";
import RiskGraph from "@/components/dashboard/RiskGraph";
import FilterDropdown from "@/components/dashboard/FilterDropdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart } from "lucide-react";

const Index = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">EGATforALL Dashboard</h1>
          <p className="text-gray-500">ระบบติดตามสถานะหม้อแปลงไฟฟ้า</p>
        </div>
        <div className="flex gap-2">
          <FilterDropdown
            value={statusFilter}
            onValueChange={setStatusFilter}
          />
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">หน้าหลัก</TabsTrigger>
          <TabsTrigger value="charts" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            แผนภูมิและกราฟ
          </TabsTrigger>
          <TabsTrigger value="risk">การวิเคราะห์ความเสี่ยง</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatusCard title="สภาพดี" count={54} color="green" />
            <StatusCard title="ต้องซ่อม" count={23} color="yellow" />
            <StatusCard title="ชำรุด" count={8} color="red" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <WelcomeSection />
            <RecentMaintenance />
            <QuickActions />
          </div>

          <TransformerTable />
        </TabsContent>
        
        <TabsContent value="charts" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BarChart className="mr-2 h-5 w-5" />
                  สถานะหม้อแปลง
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md border">
                  <div className="flex h-full w-full p-4">
                    <div className="flex items-end justify-around w-full h-full gap-4">
                      <div className="flex flex-col items-center justify-end">
                        <div className="w-16 bg-green-500 rounded-t-sm" style={{ height: '70%' }}></div>
                        <span className="text-xs mt-1">สภาพดี</span>
                      </div>
                      <div className="flex flex-col items-center justify-end">
                        <div className="w-16 bg-yellow-500 rounded-t-sm" style={{ height: '30%' }}></div>
                        <span className="text-xs mt-1">ต้องซ่อม</span>
                      </div>
                      <div className="flex flex-col items-center justify-end">
                        <div className="w-16 bg-red-500 rounded-t-sm" style={{ height: '20%' }}></div>
                        <span className="text-xs mt-1">ชำรุด</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <PieChart className="mr-2 h-5 w-5" />
                  สัดส่วนความสำคัญ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md border">
                  <div className="relative h-48 w-48 rounded-full overflow-hidden">
                    <div className="absolute inset-0" style={{ 
                      background: 'conic-gradient(#22c55e 0% 40%, #eab308 40% 70%, #ef4444 70% 100%)' 
                    }}></div>
                    <div className="absolute inset-[15%] bg-gray-50 rounded-full flex items-center justify-center text-lg font-medium">100%</div>
                  </div>
                  <div className="ml-8">
                    <div className="flex items-center mb-2">
                      <div className="w-4 h-4 bg-green-500 mr-2"></div>
                      <span className="text-sm">ความสำคัญต่ำ (40%)</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="w-4 h-4 bg-yellow-500 mr-2"></div>
                      <span className="text-sm">ความสำคัญปานกลาง (30%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-500 mr-2"></div>
                      <span className="text-sm">ความสำคัญสูง (30%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="risk" className="mt-0">
          <RiskGraph />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Index;
