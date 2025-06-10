
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, BarChart3 } from "lucide-react";

const WelcomeSection: React.FC = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              ยินดีต้อนรับสู่ระบบ Power Transformers
            </h2>
            <p className="text-gray-600 text-lg">
              ควบคุมและติดตามหม้อแปลงไฟฟ้าของคุณได้อย่างมีประสิทธิภาพ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">ปลอดภัย</h3>
              <p className="text-sm text-blue-700">ระบบรักษาความปลอดภัยสูง</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl">
            <div className="p-2 bg-green-600 rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900">เสถียร</h3>
              <p className="text-sm text-green-700">การทำงานที่เสถียรและเชื่อถือได้</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl">
            <div className="p-2 bg-purple-600 rounded-lg">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-purple-900">มีประสิทธิภาพ</h3>
              <p className="text-sm text-purple-700">รายงานและวิเคราะห์แบบเรียลไทม์</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;
