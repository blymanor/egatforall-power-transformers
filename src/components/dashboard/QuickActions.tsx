
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Settings, Upload } from "lucide-react";

const QuickActions: React.FC = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 rounded-2xl overflow-hidden h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
          <CardTitle className="text-lg font-bold text-gray-800">การดำเนินการด่วน</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button className="w-full justify-start space-x-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6">
            <Plus className="h-4 w-4" />
            <span>เพิ่มหม้อแปลงใหม่</span>
          </Button>
          
          <Button className="w-full justify-start space-x-3 bg-green-600 hover:bg-green-700 text-white rounded-xl py-6">
            <Settings className="h-4 w-4" />
            <span>บันทึกการบำรุงรักษา</span>
          </Button>
          
          <Button className="w-full justify-start space-x-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-6">
            <FileText className="h-4 w-4" />
            <span>ดูรายงานล่าสุด</span>
          </Button>
          
          <Button className="w-full justify-start space-x-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-6">
            <Upload className="h-4 w-4" />
            <span>อัพโหลดข้อมูล</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
