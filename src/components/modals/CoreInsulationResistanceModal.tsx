
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface CoreInsulationResistanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "view" | "edit";
  data?: any;
}

const CoreInsulationResistanceModal = ({ 
  isOpen, 
  onClose, 
  mode,
  data 
}: CoreInsulationResistanceModalProps) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    transformer: data?.transformer || "",
    testType: data?.testType || "",
    testDate: data?.testDate || "",
    testNumber: data?.testNumber || "",
    tester: data?.tester || "",
    resistance: data?.resistance || ""
  });

  const handleSave = () => {
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ข้อมูล Core Insulation Resistance ถูกบันทึกเรียบร้อยแล้ว",
    });
    onClose();
  };

  const isReadonly = mode === "view";
  const isAdd = mode === "add";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" && "เพิ่มข้อมูล Core Insulation Resistance"}
            {mode === "edit" && "แก้ไขข้อมูล Core Insulation Resistance"}
            {mode === "view" && "ดูข้อมูล Core Insulation Resistance"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="space-y-2">
            <Label htmlFor="transformer">หม้อแปลงไฟฟ้า :</Label>
            <Select
              value={formData.transformer}
              onValueChange={(value) => setFormData({ ...formData, transformer: value })}
              disabled={isReadonly}
            >
              <SelectTrigger>
                <SelectValue placeholder={isAdd ? "เลือกหม้อแปลงไฟฟ้า" : formData.transformer || "AN-KT1A"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AN-KT1A">AN-KT1A</SelectItem>
                <SelectItem value="AT2-KT1A">AT2-KT1A</SelectItem>
                <SelectItem value="AN-473A">AN-473A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="testType">รูปแบบการทดสอบ :</Label>
            <Select
              value={formData.testType}
              onValueChange={(value) => setFormData({ ...formData, testType: value })}
              disabled={isReadonly}
            >
              <SelectTrigger>
                <SelectValue placeholder={isAdd ? "เลือกรูปแบบการทดสอบ" : formData.testType || "Commissioning"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Commissioning">Commissioning</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="testDate">วันที่ทดสอบ :</Label>
            <Input
              id="testDate"
              type="date"
              value={formData.testDate}
              onChange={(e) => setFormData({ ...formData, testDate: e.target.value })}
              readOnly={isReadonly}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tester">เลขที่คำสั่งปฏิบัติงาน :</Label>
            <Select
              value={formData.testNumber}
              onValueChange={(value) => setFormData({ ...formData, testNumber: value })}
              disabled={isReadonly}
            >
              <SelectTrigger>
                <SelectValue placeholder={isAdd ? "เลือกเลขที่คำสั่งปฏิบัติงาน" : formData.testNumber} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="001">001</SelectItem>
                <SelectItem value="002">002</SelectItem>
                <SelectItem value="003">003</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tester">ผู้ทดสอบ :</Label>
            <Input
              id="tester"
              value={formData.tester}
              onChange={(e) => setFormData({ ...formData, tester: e.target.value })}
              readOnly={isReadonly}
              placeholder={isAdd ? "กรอกชื่อผู้ทดสอบ" : formData.tester}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resistance">Resistance :</Label>
            <div className="flex items-center gap-2">
              <Input
                id="resistance"
                value={formData.resistance}
                onChange={(e) => setFormData({ ...formData, resistance: e.target.value })}
                readOnly={isReadonly}
                placeholder={isAdd ? "กรอกค่า Resistance" : formData.resistance}
              />
              <span className="text-sm text-gray-500">MΩ</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4">
          <Button variant="outline" onClick={onClose}>
            {isReadonly ? "ปิด" : "ยกเลิก"}
          </Button>
          {!isReadonly && (
            <Button onClick={handleSave}>
              บันทึก
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoreInsulationResistanceModal;
