
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface VisualInspectionCriterion {
  id: number;
  no: number;
  visualInspection: string;
  description: string;
  color: string;
  score: number;
}

interface VisualInspectionCriteriaModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "view";
  data?: VisualInspectionCriterion | null;
}

const VisualInspectionCriteriaModal = ({
  isOpen,
  onClose,
  mode,
  data
}: VisualInspectionCriteriaModalProps) => {
  const [formData, setFormData] = useState({
    visualInspection: "",
    description: "",
    color: "",
    score: ""
  });

  const colorOptions = [
    { value: "00FF00", label: "00FF00" },
    { value: "FFFF00", label: "FFFF00" },
    { value: "FF0000", label: "FF0000" }
  ];

  useEffect(() => {
    if (data && mode === "view") {
      setFormData({
        visualInspection: data.visualInspection,
        description: data.description,
        color: data.color,
        score: data.score.toString()
      });
    } else {
      setFormData({
        visualInspection: "",
        description: "",
        color: "",
        score: ""
      });
    }
  }, [data, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.visualInspection || !formData.description || !formData.color || !formData.score) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (mode === "create") {
      toast.success("เพิ่มเกณฑ์ Visual Inspection สำเร็จ");
    }
    
    onClose();
  };

  const getModalTitle = () => {
    switch (mode) {
      case "create":
        return "เพิ่มเกณฑ์ Visual Inspection";
      case "view":
        return "แสดงข้อมูลเกณฑ์ Visual Inspection";
      default:
        return "เกณฑ์ Visual Inspection";
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
              <Label className="text-sm font-medium">Visual Inspection:</Label>
              <Input
                value={formData.visualInspection}
                onChange={(e) => setFormData({ ...formData, visualInspection: e.target.value })}
                placeholder="กรอก Visual Inspection"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">คำอธิบาย:</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="กรอกคำอธิบาย"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">สี:</Label>
              <Select
                value={formData.color}
                onValueChange={(value) => setFormData({ ...formData, color: value })}
                disabled={isReadOnly}
              >
                <SelectTrigger className={isReadOnly ? "bg-gray-100" : ""}>
                  <SelectValue placeholder="เลือกสี" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {colorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: `#${option.value}` }}
                        />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">คะแนน:</Label>
              <Input
                type="number"
                value={formData.score}
                onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                placeholder="กรอกคะแนน"
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

export default VisualInspectionCriteriaModal;
