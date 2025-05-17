
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatusCard from "@/components/dashboard/StatusCard";
import TransformerTable from "@/components/dashboard/TransformerTable";
import RiskGraph from "@/components/dashboard/RiskGraph";
import RegionDropdown from "@/components/dashboard/RegionDropdown";
import { Database, Wrench, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");

  // Calculate total transformers (sum of all three categories)
  const totalTransformers = 54 + 23 + 8; // 85 total transformers

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0442AF]">Power Transformers</h1>
          <p className="text-gray-500">ระบบหม้อแปลงไฟฟ้ากำลัง</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatusCard 
            title="Total Transformers" 
            count={totalTransformers} 
            color="green" 
            icon={<Database className="text-blue-600" />} 
          />
          <StatusCard 
            title="Needs Repair" 
            count={23} 
            color="yellow" 
            icon={<Wrench className="text-yellow-500" />} 
          />
          <StatusCard 
            title="Faulty" 
            count={8} 
            color="red" 
            icon={<AlertCircle className="text-red-500" />} 
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Region dropdown in its own card */}
          <Card className="bg-white shadow-sm border border-gray-100">
            <CardContent className="p-4">
              <h2 className="text-xl font-bold text-black mb-3">Region Filter</h2>
              <div className="w-full">
                <RegionDropdown 
                  value={selectedRegion} 
                  onValueChange={setSelectedRegion} 
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Risk Graph in its own card - completely independent of filters */}
          <RiskGraph />
        </div>

        <TransformerTable 
          statusFilter={statusFilter} 
          setStatusFilter={setStatusFilter} 
          selectedRegion={selectedRegion}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;
