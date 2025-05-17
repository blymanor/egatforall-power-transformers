
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatusCard from "@/components/dashboard/StatusCard";
import TransformerTable from "@/components/dashboard/TransformerTable";
import RiskGraph from "@/components/dashboard/RiskGraph";
import RegionDropdown from "@/components/dashboard/RegionDropdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#1E5CFF]">Power Transformers</h1>
          <p className="text-gray-500">ระบบหม้อแปลงไฟฟ้ากำลัง</p>
        </div>
        <RegionDropdown value={selectedRegion} onValueChange={setSelectedRegion} />
      </header>

      <div className="p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatusCard title="Good Condition" count={54} color="green" />
          <StatusCard title="Needs Repair" count={23} color="yellow" />
          <StatusCard title="Faulty" count={8} color="red" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <RiskGraph />
        </div>

        <TransformerTable statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      </div>
    </DashboardLayout>
  );
};

export default Index;
