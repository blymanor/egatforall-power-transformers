
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Database, MapPin } from "lucide-react";

const TransformerDetails = () => {
  const navigate = useNavigate();

  const transformerInfoSections = [
    {
      id: 1,
      title: "ข้อมูลหม้อแปลงไฟฟ้า",
      description: "จัดการข้อมูลพื้นฐานของหม้อแปลงไฟฟ้า",
      route: "/transformer-info/details",
      icon: Database
    },
    {
      id: 2,
      title: "ข้อมูลการย้ายหม้อแปลงไฟฟ้า",
      description: "จัดการข้อมูลการย้ายตำแหน่งหม้อแปลงไฟฟ้า",
      route: "/transformer-info/relocation",
      icon: MapPin
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
            ข้อมูลหม้อแปลงไฟฟ้า
          </h1>
          <p className="text-gray-600">
            เลือกประเภทข้อมูลหม้อแปลงไฟฟ้าที่ต้องการจัดการ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transformerInfoSections.map((section) => {
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

export default TransformerDetails;
