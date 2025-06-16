
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface MainComponentWeightData {
  id: number;
  no: number;
  activePart: number;
  bushing: number;
  arrester: number;
  oil: number;
  oltc: number;
}

interface MainComponentWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "view" | "edit";
  data?: MainComponentWeightData | null;
}

const MainComponentWeightModal = ({
  isOpen,
  onClose,
  mode,
  data
}: MainComponentWeightModalProps) => {
  const [formData, setFormData] = useState({
    activePart: "",
    bushing: "",
    arrester: "",
    oil: "",
    oltc: ""
  });

  useEffect(() => {
    if (data && (mode === "view" || mode === "edit")) {
      setFormData({
        activePart: data.activePart.toString(),
        bushing: data.bushing.toString(),
        arrester: data.arrester.toString(),
        oil: data.oil.toString(),
        oltc: data.oltc.toString()
      });
    } else {
      setFormData({
        activePart: "",
        bushing: "",
        arrester: "",
        oil: "",
        oltc: ""
      });
    }
  }, [data, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.activePart || !formData.bushing || !formData.arrester || !formData.oil || !formData.oltc) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (mode === "create") {
      toast.success("เพิ่ม Weight อุปกรณ์หลัก สำเร็จ");
    } else if (mode === "edit") {
      toast.success("แก้ไข Weight อุปกรณ์หลัก สำเร็จ");
    }
    
    onClose();
  };

  const getModalTitle = () => {
    switch (mode) {
      case "create":
        return "เพิ่ม Weight อุปกรณ์หลัก";
      case "edit":
        return "แก้ไข Weight อุปกรณ์หลัก";
      case "view":
        return "แสดงข้อมูล Weight อุปกรณ์หลัก";
      default:
        return "Weight อุปกรณ์หลัก";
    }
  };

  const isReadOnly = mode === "view";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader className="text-white p-4 -m-6 mb-6 bg-slate-50 py-[10px]">
          <DialogTitle className="text-xl font-medium text-center text-slate-950">
            {getModalTitle()}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Active Part:</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.activePart}
                onChange={(e) => setFormData({ ...formData, activePart: e.target.value })}
                placeholder="กรอก Active Part"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Bushing:</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.bushing}
                onChange={(e) => setFormData({ ...formData, bushing: e.target.value })}
                placeholder="กรอก Bushing"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Arrester:</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.arrester}
                onChange={(e) => setFormData({ ...formData, arrester: e.target.value })}
                placeholder="กรอก Arrester"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Oil:</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.oil}
                onChange={(e) => setFormData({ ...formData, oil: e.target.value })}
                placeholder="กรอก Oil"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">OLTC:</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.oltc}
                onChange={(e) => setFormData({ ...formData, oltc: e.target.value })}
                placeholder="กรอก OLTC"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>
          </div>

          {!isReadOnly && (
            <div className="flex justify-center pt-4 border-t border-gray-100">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Save
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MainComponentWeightModal;
