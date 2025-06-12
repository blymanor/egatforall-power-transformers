
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wrench, CheckCircle, Clock, AlertCircle } from "lucide-react";

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
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "รอดำเนินการ":
        return <Clock className="h-4 w-4 text-amber-600" />;
      case "ฉุกเฉิน":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Wrench className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
            <Wrench className="h-5 w-5 text-gray-600" />
            <span>ข้อมูลการบำรุงรักษา</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* รหัสหม้อแปลง */}
          <div className="py-2">
            <p className="text-sm text-gray-500">รหัสหม้อแปลง</p>
            <p className="font-medium text-gray-900">{maintenanceData.group}</p>
          </div>

          {/* ประเภท */}
          <div className="py-2">
            <p className="text-sm text-gray-500">ประเภท</p>
            <p className="font-medium text-gray-900">{maintenanceData.type}</p>
            <p className="text-sm text-gray-600">{maintenanceData.description}</p>
          </div>

          {/* วันที่ */}
          <div className="py-2">
            <p className="text-sm text-gray-500">วันที่</p>
            <p className="font-medium text-gray-900">{maintenanceData.date}</p>
          </div>

          {/* สถานะ */}
          <div className="flex items-center space-x-3 py-2">
            {getStatusIcon()}
            <div>
              <p className="text-sm text-gray-500">สถานะ</p>
              <p className="font-medium text-gray-900">{maintenanceData.status}</p>
            </div>
          </div>

          {/* ผู้ดำเนินการ */}
          <div className="py-2">
            <p className="text-sm text-gray-500">ผู้ดำเนินการ</p>
            <p className="font-medium text-gray-900">{maintenanceData.operator}</p>
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
