
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface RegulatingPTModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "view" | "edit";
  data?: any;
}

const RegulatingPTModal: React.FC<RegulatingPTModalProps> = ({
  isOpen,
  onClose,
  mode,
  data
}) => {
  const [formData, setFormData] = useState({
    hasOperation: false,
    transformer: "",
    testType: "",
    inspector: "",
    inspectionDate: "",
    operationId: "",
    porcelainCondition: "",
    porcelainCleanliness: "",
    screwCondition: "",
    baseCondition: "",
    oilCondition: ""
  });

  useEffect(() => {
    if (mode !== "add" && data) {
      setFormData({
        hasOperation: true,
        transformer: data.transformerName || "",
        testType: data.testType || "",
        inspector: data.inspector || "",
        inspectionDate: data.inspectionDate || "",
        operationId: data.operationId || "",
        porcelainCondition: "ปกติ",
        porcelainCleanliness: "ปกติ",
        screwCondition: "ไม่มีสนิมเกิดขึ้น",
        baseCondition: "ปกติ",
        oilCondition: "ปกติ"
      });
    } else if (mode === "add") {
      setFormData({
        hasOperation: false,
        transformer: "",
        testType: "",
        inspector: "",
        inspectionDate: "",
        operationId: "",
        porcelainCondition: "",
        porcelainCleanliness: "",
        screwCondition: "",
        baseCondition: "",
        oilCondition: ""
      });
    }
  }, [mode, data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(mode === "add" ? "เพิ่มข้อมูลสำเร็จ" : "บันทึกข้อมูลสำเร็จ");
    onClose();
  };

  const isReadOnly = mode === "view";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "เพิ่มข้อมูล Regulating PT" : 
             mode === "view" ? "ดูข้อมูล Regulating PT" : 
             "แก้ไขข้อมูล Regulating PT"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="hasOperation" 
              checked={formData.hasOperation}
              onCheckedChange={(checked) => setFormData(prev => ({...prev, hasOperation: checked as boolean}))}
              disabled={isReadOnly}
            />
            <Label htmlFor="hasOperation">ไม่มีการใช้งาน :</Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>หม้อแปลงไฟฟ้า :</Label>
              <Select value={formData.transformer} onValueChange={(value) => setFormData(prev => ({...prev, transformer: value}))} disabled={isReadOnly}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AN-KT1A">AN-KT1A</SelectItem>
                  <SelectItem value="AT2-KT1A">AT2-KT1A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>รูปแบบการทดสอบ :</Label>
              <Select value={formData.testType} onValueChange={(value) => setFormData(prev => ({...prev, testType: value}))} disabled={isReadOnly}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกรูปแบบการทดสอบ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Weekly Test">Weekly Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>ผู้ตรวจสอบ :</Label>
              <Input value={formData.inspector} onChange={(e) => setFormData(prev => ({...prev, inspector: e.target.value}))} readOnly={isReadOnly} />
            </div>
            <div>
              <Label>วันที่ตรวจสอบ :</Label>
              <Input type="date" value={formData.inspectionDate} onChange={(e) => setFormData(prev => ({...prev, inspectionDate: e.target.value}))} readOnly={isReadOnly} />
            </div>
            <div>
              <Label>เลขคำสั่งปฏิบัติงาน :</Label>
              <Input value={formData.operationId} onChange={(e) => setFormData(prev => ({...prev, operationId: e.target.value}))} readOnly={isReadOnly} />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>สภาพ Porcelain :</Label>
              <Select value={formData.porcelainCondition} onValueChange={(value) => setFormData(prev => ({...prev, porcelainCondition: value}))} disabled={isReadOnly}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ปกติ">ปกติ</SelectItem>
                  <SelectItem value="ผิดปกติ">ผิดปกติ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>ความสะอาดของ Porcelain :</Label>
              <Select value={formData.porcelainCleanliness} onValueChange={(value) => setFormData(prev => ({...prev, porcelainCleanliness: value}))} disabled={isReadOnly}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ปกติ">ปกติ</SelectItem>
                  <SelectItem value="ผิดปกติ">ผิดปกติ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>การร้อยของน้ำปาน :</Label>
              <Select value={formData.screwCondition} onValueChange={(value) => setFormData(prev => ({...prev, screwCondition: value}))} disabled={isReadOnly}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ไม่มีสนิมเกิดขึ้น">ไม่มีสนิมเกิดขึ้น</SelectItem>
                  <SelectItem value="มีสนิมเกิดขึ้น">มีสนิมเกิดขึ้น</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>ระบบปราน :</Label>
              <Select value={formData.baseCondition} onValueChange={(value) => setFormData(prev => ({...prev, baseCondition: value}))} disabled={isReadOnly}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ปกติ">ปกติ</SelectItem>
                  <SelectItem value="ผิดปกติ">ผิดปกติ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>สีมอยลาน :</Label>
              <Select value={formData.oilCondition} onValueChange={(value) => setFormData(prev => ({...prev, oilCondition: value}))} disabled={isReadOnly}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ปกติ">ปกติ</SelectItem>
                  <SelectItem value="ผิดปกติ">ผิดปกติ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              ยกเลิก
            </Button>
            {mode !== "view" && (
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {mode === "add" ? "เพิ่มข้อมูล" : "บันทึกการแก้ไข"}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegulatingPTModal;
