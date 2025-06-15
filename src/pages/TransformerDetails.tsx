
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TransformerDetails = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            ข้อมูลหม้อแปลงไฟฟ้า
          </h1>
          <p className="text-gray-500">จัดการข้อมูลพื้นฐานของหม้อแปลงไฟฟ้า</p>
        </div>

        {/* Main Content */}
        <Card className="shadow-md border-none">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
            <CardTitle className="text-lg font-semibold text-blue-700">
              รายละเอียดหม้อแปลงไฟฟ้า
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600">หน้านี้กำลังอยู่ระหว่างการพัฒนา</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransformerDetails;
