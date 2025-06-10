
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatusCard from "@/components/dashboard/StatusCard";
import TransformerTable from "@/components/dashboard/TransformerTable";
import RiskGraph from "@/components/dashboard/RiskGraph";
import RegionDropdown from "@/components/dashboard/RegionDropdown";
import WelcomeSection from "@/components/dashboard/WelcomeSection";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentMaintenance from "@/components/dashboard/RecentMaintenance";
import { Database, Wrench, AlertCircle, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");

  // Calculate total transformers (sum of all three categories)
  const totalTransformers = 54 + 23 + 8; // 85 total transformers

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative px-6 py-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  ระบบจัดการหม้อแปลงไฟฟ้า
                </h1>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                  ติดตามและควบคุมสถานะหม้อแปลงไฟฟ้าได้อย่างมีประสิทธิภาพ
                </p>
                <div className="flex items-center justify-center space-x-8 pt-4">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-green-300" />
                    <span className="text-sm font-medium">ระบบออนไลน์</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-300" />
                    <span className="text-sm font-medium">อัพเดทแบบเรียลไทม์</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Welcome and Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <WelcomeSection />
            </div>
            <div className="lg:col-span-1">
              <QuickActions />
            </div>
          </div>

          {/* Status Cards - Redesigned */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatusCard 
              title="หม้อแปลงทั้งหมด" 
              count={totalTransformers} 
              color="green" 
              icon={<Database className="text-blue-600" />}
              className="transform hover:scale-105 transition-all duration-300"
            />
            <StatusCard 
              title="ต้องการซ่อมแซม" 
              count={23} 
              color="yellow" 
              icon={<Wrench className="text-orange-600" />}
              className="transform hover:scale-105 transition-all duration-300"
            />
            <StatusCard 
              title="ชำรุด" 
              count={8} 
              color="red" 
              icon={<AlertCircle className="text-red-600" />}
              className="transform hover:scale-105 transition-all duration-300"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Risk Graph and Region Filter */}
            <div className="xl:col-span-2 space-y-6">
              {/* Region Filter */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                      <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                      <span>เลือกเขต</span>
                    </h2>
                  </div>
                  <RegionDropdown 
                    value={selectedRegion} 
                    onValueChange={setSelectedRegion} 
                  />
                </CardContent>
              </Card>
              
              {/* Risk Graph */}
              <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden border-0">
                <RiskGraph />
              </div>
            </div>

            {/* Right Column - Recent Maintenance */}
            <div className="xl:col-span-1">
              <RecentMaintenance />
            </div>
          </div>

          {/* Transformer Table */}
          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden border-0">
            <TransformerTable 
              statusFilter={statusFilter} 
              setStatusFilter={setStatusFilter} 
              selectedRegion={selectedRegion}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
