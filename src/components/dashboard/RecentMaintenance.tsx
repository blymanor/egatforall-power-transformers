
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const maintenanceItems = [
  {
    id: 1,
    group: "หม้อแปลง #1",
    description: "ล้างทำความสะอาด",
    date: "5/1/2024",
    status: "เสร็จสิ้น",
    statusColor: "text-green-600"
  },
  {
    id: 2,
    group: "หม้อแปลง #2",
    description: "ตรวจสอบประจำปี",
    date: "16/12/2023",
    status: "เสร็จสิ้น",
    statusColor: "text-green-600"
  },
  {
    id: 3,
    group: "หม้อแปลง #3",
    description: "ติดตั้งอุปกรณ์ใหม่",
    date: "8/12/2023",
    status: "รอดำเนินการ",
    statusColor: "text-amber-600"
  }
];

const RecentMaintenance: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">การบำรุงรักษาล่าสุด</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {maintenanceItems.map(item => (
            <div key={item.id} className="flex justify-between items-center border-b pb-2 last:border-b-0 last:pb-0">
              <div>
                <p className="font-medium">{item.group}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">{item.date}</p>
                <p className={`text-sm font-medium ${item.statusColor}`}>{item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentMaintenance;
