
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";
import MaintenanceDetailModal from "@/components/modals/MaintenanceDetailModal";

const maintenanceItems = [
  {
    id: 1,
    group: "АN-472A",
    description: "ล้างทำความสะอาดและตรวจสอบ",
    date: "5 ม.ค. 2024",
    status: "เสร็จสิ้น",
    statusColor: "text-green-600",
    bgColor: "bg-green-50",
    icon: CheckCircle,
    type: "การบำรุงรักษาประจำ",
    operator: "นายสมชาย ใจดี"
  },
  {
    id: 2,
    group: "АN-473B",
    description: "ตรวจสอบประจำปี",
    date: "16 ธ.ค. 2023",
    status: "เสร็จสิ้น",
    statusColor: "text-green-600",
    bgColor: "bg-green-50",
    icon: CheckCircle,
    type: "การตรวจสอบประจำปี",
    operator: "นายวิชัย เทคนิค"
  },
  {
    id: 3,
    group: "АN-474C",
    description: "ติดตั้งอุปกรณ์ใหม่",
    date: "8 ธ.ค. 2023",
    status: "รอดำเนินการ",
    statusColor: "text-amber-600",
    bgColor: "bg-amber-50",
    icon: Clock,
    type: "การติดตั้งอุปกรณ์",
    operator: "นางสาวพิมพ์ใจ วิศวกร"
  },
  {
    id: 4,
    group: "АN-475E",
    description: "ซ่อมแซมเร่งด่วน",
    date: "ต้องการความสนใจ",
    status: "ฉุกเฉิน",
    statusColor: "text-red-600",
    bgColor: "bg-red-50",
    icon: AlertCircle,
    type: "การซ่อมแซมฉุกเฉิน",
    operator: "นายประชา ช่างไฟ"
  }
];

const RecentMaintenance: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<typeof maintenanceItems[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item: typeof maintenanceItems[0]) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 rounded-2xl overflow-hidden h-fit">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-6 bg-green-600 rounded-full"></div>
            <CardTitle className="text-lg font-bold text-gray-800">การบำรุงรักษาล่าสุด</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {maintenanceItems.map(item => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={item.id} 
                  className={`p-4 rounded-xl ${item.bgColor} border border-opacity-20 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]`}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-1 rounded-full ${item.statusColor}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{item.group}</h4>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{item.date}</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.statusColor} ${item.bgColor}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <MaintenanceDetailModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        maintenanceData={selectedItem}
      />
    </>
  );
};

export default RecentMaintenance;
