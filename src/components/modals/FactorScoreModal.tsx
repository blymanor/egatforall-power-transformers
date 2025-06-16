
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface FactorScoreData {
  id: number;
  no: number;
  group: string;
  name: string;
  hiFactor: number;
  meaning: string;
  lowerBound: number;
  upperBound: number;
  color: string;
}

interface FactorScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "view" | "edit";
  data?: FactorScoreData | null;
}

const FactorScoreModal = ({
  isOpen,
  onClose,
  mode,
  data
}: FactorScoreModalProps) => {
  const [formData, setFormData] = useState({
    group: "",
    name: "",
    hiFactor: "",
    meaning: "",
    lowerBound: "",
    upperBound: "",
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
        group: data.group,
        name: data.name,
        hiFactor: data.hiFactor.toString(),
        meaning: data.meaning,
        lowerBound: data.lowerBound.toString(),
        upperBound: data.upperBound.toString(),
        color: data.color
      });
    } else {
      setFormData({
        group: "",
        name: "",
        hiFactor: "",
        meaning: "",
        lowerBound: "",
        upperBound: "",
        color: ""
      });
    }
  }, [data, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.group || !formData.name || !formData.hiFactor || !formData.meaning || !formData.lowerBound || !formData.upperBound || !formData.color) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (mode === "create") {
      toast.success("เพิ่มคะแนน %Factor สำเร็จ");
    } else if (mode === "edit") {
      toast.success("แก้ไขคะแนน %Factor สำเร็จ");
    }
    
    onClose();
  };

  const getModalTitle = () => {
    switch (mode) {
      case "create":
        return "เพิ่มคะแนน %Factor";
      case "edit":
        return "แก้ไขคะแนน %Factor";
      case "view":
        return "แสดงข้อมูลคะแนน %Factor";
      default:
        return "คะแนน %Factor";
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
              <Label className="text-sm font-medium">Group:</Label>
              <Input
                value={formData.group}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                placeholder="กรอก Group"
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
              <Label className="text-sm font-medium">HI Factor:</Label>
              <Input
                type="number"
                value={formData.hiFactor}
                onChange={(e) => setFormData({ ...formData, hiFactor: e.target.value })}
                placeholder="กรอก HI Factor"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">คำอธิบาย:</Label>
              <Input
                value={formData.meaning}
                onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
                placeholder="กรอกคำอธิบาย"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Lower Bound:</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.lowerBound}
                onChange={(e) => setFormData({ ...formData, lowerBound: e.target.value })}
                placeholder="กรอก Lower Bound"
                readOnly={isReadOnly}
                className={isReadOnly ? "bg-gray-100" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Upper Bound:</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.upperBound}
                onChange={(e) => setFormData({ ...formData, upperBound: e.target.value })}
                placeholder="กรอก Upper Bound"
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

export default FactorScoreModal;
