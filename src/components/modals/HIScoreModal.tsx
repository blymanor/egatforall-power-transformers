
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface HIScoreData {
  id: number;
  no: number;
  testGroup: string;
  minScore: number;
  maxScore: number;
  description: string;
  details: string;
  color: string;
}

interface HIScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "view" | "edit";
  data?: HIScoreData | null;
}

const HIScoreModal = ({
  isOpen,
  onClose,
  mode,
  data
}: HIScoreModalProps) => {
  const [formData, setFormData] = useState({
    testGroup: "",
    minScore: "",
    maxScore: "",
    description: "",
    details: "",
    color: ""
  });

  const colorOptions = [
    { value: "00FF00", label: "00FF00" },
    { value: "FFFF00", label: "FFFF00" },
    { value: "FF0000", label: "FF0000" },
    { value: "1E5CFF", label: "1E5CFF" }
  ];

  useEffect(() => {
    if (data && (mode === "view" || mode === "edit")) {
      setFormData({
        testGroup: data.testGroup,
        minScore: data.minScore.toString(),
        maxScore: data.maxScore.toString(),
        description: data.description,
        details: data.details,
        color: data.color
      });
    } else {
      setFormData({
        testGroup: "",
        minScore: "",
        maxScore: "",
        description: "",
        details: "",
        color: ""
      });
    }
  }, [data, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.testGroup || !formData.minScore || !formData.maxScore || !formData.description || !formData.details || !formData.color) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (mode === "create") {
      toast.success("เพิ่มคะแนน %HI สำเร็จ");
    } else if (mode === "edit") {
      toast.success("แก้ไขคะแนน %HI สำเร็จ");
    }
    
    onClose();
  };

  const getModalTitle = () => {
    switch (mode) {
      case "create":
        return "เพิ่มคะแนน %HI";
      case "edit":
        return "แก้ไขคะแนน %HI";
      case "view":
        return "แสดงข้อมูลคะแนน %HI";
      default:
        return "คะแนน %HI";
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
              <Label className="text-sm font-medium">ชื่อกลุ่มการทดสอบ:</Label>
              <Input
                value={formData.testGroup}
                onChange={(e) => setFormData({ ...formData, testGroup: e.target.value })}
                placeholder="กรอกชื่อกลุ่มการทดสอบ"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">คะแนนตํ่าสุด:</Label>
              <Input
                type="number"
                value={formData.minScore}
                onChange={(e) => setFormData({ ...formData, minScore: e.target.value })}
                placeholder="กรอกคะแนนตํ่าสุด"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">คะแนนสูงสุด:</Label>
              <Input
                type="number"
                value={formData.maxScore}
                onChange={(e) => setFormData({ ...formData, maxScore: e.target.value })}
                placeholder="กรอกคะแนนสูงสุด"
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
              <Label className="text-sm font-medium">รายละเอียด:</Label>
              <Input
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="กรอกรายละเอียด"
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

export default HIScoreModal;
