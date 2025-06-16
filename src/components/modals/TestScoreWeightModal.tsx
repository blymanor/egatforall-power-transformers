
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface TestScoreWeightData {
  id: number;
  no: number;
  performGroup: string;
  subGroup: string;
  morePerform: string;
  evaluation: string;
  variable: string;
  variableMin: number;
  variableMax: number;
}

interface TestScoreWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "view" | "edit";
  data?: TestScoreWeightData | null;
}

const TestScoreWeightModal = ({
  isOpen,
  onClose,
  mode,
  data
}: TestScoreWeightModalProps) => {
  const [formData, setFormData] = useState({
    performGroup: "",
    subGroup: "",
    morePerform: "",
    evaluation: "",
    variable: "",
    variableMin: "",
    variableMax: ""
  });

  useEffect(() => {
    if (data && (mode === "view" || mode === "edit")) {
      setFormData({
        performGroup: data.performGroup,
        subGroup: data.subGroup,
        morePerform: data.morePerform,
        evaluation: data.evaluation,
        variable: data.variable,
        variableMin: data.variableMin.toString(),
        variableMax: data.variableMax.toString()
      });
    } else {
      setFormData({
        performGroup: "",
        subGroup: "",
        morePerform: "",
        evaluation: "",
        variable: "",
        variableMin: "",
        variableMax: ""
      });
    }
  }, [data, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.performGroup || !formData.subGroup || !formData.morePerform || !formData.evaluation) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (mode === "create") {
      toast.success("เพิ่ม Score และ Weight การทดสอบ สำเร็จ");
    } else if (mode === "edit") {
      toast.success("แก้ไข Score และ Weight การทดสอบ สำเร็จ");
    }
    
    onClose();
  };

  const getModalTitle = () => {
    switch (mode) {
      case "create":
        return "เพิ่ม Score และ Weight การทดสอบ";
      case "edit":
        return "แก้ไข Score และ Weight การทดสอบ";
      case "view":
        return "แสดงข้อมูล Score และ Weight การทดสอบ";
      default:
        return "Score และ Weight การทดสอบ";
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
              <Label className="text-sm font-medium">Sub Group:</Label>
              <Input
                value={formData.subGroup}
                onChange={(e) => setFormData({ ...formData, subGroup: e.target.value })}
                placeholder="กรอก Sub Group"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">More Perform:</Label>
              <Input
                value={formData.morePerform}
                onChange={(e) => setFormData({ ...formData, morePerform: e.target.value })}
                placeholder="กรอก More Perform"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Evaluation:</Label>
              <Input
                value={formData.evaluation}
                onChange={(e) => setFormData({ ...formData, evaluation: e.target.value })}
                placeholder="กรอก Evaluation"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Variable:</Label>
              <Input
                value={formData.variable}
                onChange={(e) => setFormData({ ...formData, variable: e.target.value })}
                placeholder="กรอก Variable"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Variable Min:</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.variableMin}
                onChange={(e) => setFormData({ ...formData, variableMin: e.target.value })}
                placeholder="กรอก Variable Min"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Variable Max:</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.variableMax}
                onChange={(e) => setFormData({ ...formData, variableMax: e.target.value })}
                placeholder="กรอก Variable Max"
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

export default TestScoreWeightModal;
