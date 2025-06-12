
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, User, Wrench, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface MaintenanceData {
  id: number;
  group: string;
  description: string;
  date: string;
  status: string;
  statusColor: string;
  bgColor: string;
  type: string;
  operator: string;
}

interface MaintenanceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  maintenanceData: MaintenanceData | null;
}

const MaintenanceDetailModal: React.FC<MaintenanceDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  maintenanceData 
}) => {
  if (!maintenanceData) return null;

  const getStatusIcon = () => {
    switch (maintenanceData.status) {
      case "เสร็จสิ้น":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "รอดำเนินการ":
        return <Clock className="h-5 w-5 text-amber-600" />;
      case "ฉุกเฉิน":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Wrench className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 flex items-center space-x-2">
            <Wrench className="h-6 w-6 text-blue-600" />
            <span>ข้อมูลการบำรุงรักษา</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* รหัสหม้อแปลง */}
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-full">
              <Wrench className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">รหัสหม้อแปลง</p>
              <p className="text-lg font-semibold text-gray-800">{maintenanceData.group}</p>
            </div>
          </div>

          {/* ประเภท */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-gray-100 rounded-full">
              <Wrench className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">ประเภท</p>
              <p className="text-lg font-semibold text-gray-800">{maintenanceData.type}</p>
              <p className="text-sm text-gray-500">{maintenanceData.description}</p>
            </div>
          </div>

          {/* วันที่ */}
          <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
            <div className="p-2 bg-purple-100 rounded-full">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">วันที่</p>
              <p className="text-lg font-semibold text-gray-800">{maintenanceData.date}</p>
            </div>
          </div>

          {/* สถานะ */}
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <div className="p-2 bg-green-100 rounded-full">
              {getStatusIcon()}
            </div>
            <div>
              <p className="text-sm text-gray-600">สถานะ</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${maintenanceData.statusColor} ${maintenanceData.bgColor}`}>
                {maintenanceData.status}
              </span>
            </div>
          </div>

          {/* ผู้ดำเนินการ */}
          <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
            <div className="p-2 bg-orange-100 rounded-full">
              <User className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">ผู้ดำเนินการ</p>
              <p className="text-lg font-semibold text-gray-800">{maintenanceData.operator}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose} variant="outline">
            ปิด
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MaintenanceDetailModal;
