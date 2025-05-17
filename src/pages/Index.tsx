
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatusCard from "@/components/dashboard/StatusCard";
import TransformerTable from "@/components/dashboard/TransformerTable";
import RiskGraph from "@/components/dashboard/RiskGraph";
import RegionDropdown from "@/components/dashboard/RegionDropdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";

const Index = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#1E5CFF]">Power Transformers</h1>
          <p className="text-gray-500">ระบบติดตามสถานะหม้อแปลงไฟฟ้า</p>
        </div>
        <RegionDropdown value={selectedRegion} onValueChange={setSelectedRegion} />
      </header>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatusCard title="สภาพดี" count={54} color="green" />
          <StatusCard title="ต้องซ่อม" count={23} color="yellow" />
          <StatusCard title="ชำรุด" count={8} color="red" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RiskGraph />
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <PieChart className="mr-2 h-5 w-5" />
                สัดส่วนความสำคัญ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white rounded-md border border-[#1E5CFF]/10">
                <div className="relative h-48 w-48 rounded-full overflow-hidden shadow-lg">
                  <div className="absolute inset-0" style={{ 
                    background: 'conic-gradient(#22c55e 0% 40%, #eab308 40% 70%, #ef4444 70% 100%)' 
                  }}></div>
                  <div className="absolute inset-[15%] bg-white rounded-full flex items-center justify-center text-lg font-medium text-[#1E5CFF]">100%</div>
                </div>
                <div className="ml-8">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-green-500 mr-2 rounded-sm shadow-sm"></div>
                    <span className="text-sm">ความสำคัญต่ำ (40%)</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-yellow-500 mr-2 rounded-sm shadow-sm"></div>
                    <span className="text-sm">ความสำคัญปานกลาง (30%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 mr-2 rounded-sm shadow-sm"></div>
                    <span className="text-sm">ความสำคัญสูง (30%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <TransformerTable statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      </div>
    </DashboardLayout>
  );
};

export default Index;
