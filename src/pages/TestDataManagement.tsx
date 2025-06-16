
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Eye, Settings, BarChart3 } from "lucide-react";

const TestDataManagement = () => {
  const navigate = useNavigate();

  const testDataSections = [
    {
      id: 1,
      title: "หัวข้อ Visual Inspection",
      description: "จัดการหัวข้อการตรวจสอบด้วยตา",
      route: "/management/test-data/vi-topics",
      icon: Eye
    },
    {
      id: 2,
      title: "คะแนน %HI",
      description: "จัดการคะแนน %HI",
      route: "/management/test-data/hi-score",
      icon: BarChart3
    },
    {
      id: 3,
      title: "คะแนน %Factor",
      description: "จัดการคะแนน %Factor",
      route: "/management/test-data/factor-score",
      icon: BarChart3
    },
    {
      id: 4,
      title: "ข้อมูลการทดสอบอื่นๆ",
      description: "จัดการข้อมูลการทดสอบเพิ่มเติม",
      route: "/management/test-data/other-tests",
      icon: Settings
    }
  ];

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            จัดการข้อมูลการทดสอบ
          </h1>
          <p className="text-gray-600">
            เลือกประเภทข้อมูลการทดสอบที่ต้องการจัดการ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testDataSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Card key={section.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg font-medium text-gray-800">
                      {section.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4">
                    {section.description}
                  </p>
                  <Button 
                    onClick={() => handleNavigate(section.route)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    เข้าสู่หน้าจัดการ
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TestDataManagement;
