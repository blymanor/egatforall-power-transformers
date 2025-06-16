import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
interface VisualInspectionItem {
  id: number;
  no: number;
  name: string;
  testType?: string;
}
interface VisualInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "view" | "edit";
  data?: VisualInspectionItem | null;
}
const VisualInspectionModal = ({
  isOpen,
  onClose,
  mode,
  data
}: VisualInspectionModalProps) => {
  const [formData, setFormData] = useState({
    testType: "",
    conditionName: ""
  });
  const testTypeOptions = ["Conservator Tank", "General Condition", "Hot line Oil Filter", "Lighting Arrester", "Main Tank", "NGR", "OLTC Compartment", "OLTC Control Cabinet"];
  useEffect(() => {
    if (data && (mode === "view" || mode === "edit")) {
      setFormData({
        testType: data.testType || "General Condition",
        conditionName: data.name
      });
    } else {
      setFormData({
        testType: "",
        conditionName: ""
      });
    }
  }, [data, mode, isOpen]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.testType || !formData.conditionName) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    if (mode === "create") {
      toast.success("เพิ่ม Visual Inspection สำเร็จ");
    } else if (mode === "edit") {
      toast.success("แก้ไขข้อมูล Visual Inspection สำเร็จ");
    }
    onClose();
  };
  const getModalTitle = () => {
    switch (mode) {
      case "create":
        return "เพิ่ม Visual Inspection";
      case "view":
        return "แสดงข้อมูล Visual Inspection";
      case "edit":
        return "แก้ไข Visual Inspection";
      default:
        return "Visual Inspection";
    }
  };
  const isReadOnly = mode === "view";
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader className="text-white p-4 -m-6 mb-6 bg-slate-50 py-[10px]">
          <DialogTitle className="text-xl font-medium text-center text-slate-950">
            {getModalTitle()}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2 py-0">
              <Label className="text-sm font-medium">รูปแบบการทดสอบ:</Label>
              <Select value={formData.testType} onValueChange={value => setFormData({
              ...formData,
              testType: value
            })} disabled={isReadOnly}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกรูปแบบการทดสอบ" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {testTypeOptions.map(option => <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">ชื่อเงื่อนไขการทดสอบ:</Label>
              <Input value={formData.conditionName} onChange={e => setFormData({
              ...formData,
              conditionName: e.target.value
            })} placeholder="กรอกชื่อเงื่อนไขการทดสอบ" readOnly={isReadOnly} className={isReadOnly ? "bg-gray-100" : ""} />
            </div>
          </div>

          {!isReadOnly && <div className="flex justify-center pt-4 border-t border-gray-100">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Save
              </Button>
            </div>}
        </form>
      </DialogContent>
    </Dialog>;
};
export default VisualInspectionModal;