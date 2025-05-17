
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WelcomeSection: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">ยินดีต้อนรับ</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          ระบบติดตามสถานะหม้อแปลงไฟฟ้าให้ง่ายปลอดภัยและมีประสิทธิภาพ
        </p>
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;
