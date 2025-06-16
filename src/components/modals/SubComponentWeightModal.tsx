
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface SubComponentWeightData {
  id: number;
  no: number;
  performGroup: string;
  name: string;
  wf: number;
}

interface SubComponentWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "view" | "edit";
  data?: SubComponentWeightData | null;
}

const SubComponentWeightModal = ({
  isOpen,
  onClose,
  mode,
  data
}: SubComponentWeightModalProps) => {
  const [formData, setFormData] = useState({
    performGroup: "",
    name: "",
    wf: ""
  });

  useEffect(() => {
    if (data && (mode === "view" || mode === "edit")) {
      setFormData({
        performGroup: data.performGroup,
        name: data.name,
        wf: data.wf.toString()
      });
    } else {
      setFormData({
        performGroup: "",
        name: "",
        wf: ""
      });
    }
  }, [data, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.performGroup || !formData.name || !formData.wf) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (mode === "create") {
      toast.success("เพิ่ม Weight อุปกรณ์ย่อย สำเร็จ");
    } else if (mode === "edit") {
      toast.success("แก้ไข Weight อุปกรณ์ย่อย สำเร็จ");
    }
    
    onClose();
  };

  const getModalTitle = () => {
    switch (mode) {
      case "create":
        return "เพิ่ม Weight อุปกรณ์ย่อย";
      case "edit":
        return "แก้ไข Weight อุปกรณ์ย่อย";
      case "view":
        return "แสดงข้อมูล Weight อุปกรณ์ย่อย";
      default:
        return "Weight อุปกรณ์ย่อย";
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
              <Label className="text-sm font-medium">Perform Group:</Label>
              <Input
                value={formData.performGroup}
                onChange={(e) => setFormData({ ...formData, performGroup: e.target.value })}
                placeholder="กรอก Perform Group"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Name:</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="กรอก Name"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Wf:</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.wf}
                onChange={(e) => setFormData({ ...formData, wf: e.target.value })}
                placeholder="กรอก Wf"
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

export default SubComponentWeightModal;
