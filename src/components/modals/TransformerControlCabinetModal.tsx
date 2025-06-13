
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface TransformerControlCabinetModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "view" | "edit";
  data?: any;
}

const TransformerControlCabinetModal: React.FC<TransformerControlCabinetModalProps> = ({
  isOpen,
  onClose,
  mode,
  data
}) => {
  const [formData, setFormData] = useState({
    transformer: "",
    testType: "",
    inspector: "",
    inspectionDate: "",
    operationId: "",
    corrosion: "",
    fanCondition: "",
    coolingSystemControl: "",
    operationDevice: "",
    wiringControl: ""
  });

  useEffect(() => {
    if (mode !== "add" && data) {
      setFormData({
        transformer: data.transformerName || "",
        testType: data.testType || "",
        inspector: data.inspector || "",
        inspectionDate: data.inspectionDate || "",
        operationId: data.operationId || "",
        corrosion: "ปกติ",
        fanCondition: "ไม่พบจังสิต",
        coolingSystemControl: "ปกติ",
        operationDevice: "ลากเลย",
        wiringControl: "ลากเลย"
      });
    } else if (mode === "add") {
      setFormData({
        transformer: "",
        testType: "",
        inspector: "",
        inspectionDate: "",
        operationId: "",
        corrosion: "",
        fanCondition: "",
        coolingSystemControl: "",
        operationDevice: "",
        wiringControl: ""
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
            {mode === "add" ? "เพิ่มข้อมูล Transformer Control Cabinet" : 
             mode === "view" ? "ดูข้อมูล Transformer Control Cabinet" : 
             "แก้ไขข้อมูล Transformer Control Cabinet"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
              <Label>ความผุกร่อน :</Label>
              <Select value={formData.corrosion} onValueChange={(value) => setFormData(prev => ({...prev, corrosion: value}))} disabled={isReadOnly}>
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
              <Label>สีที่กลีง :</Label>
              <Select value={formData.fanCondition} onValueChange={(value) => setFormData(prev => ({...prev, fanCondition: value}))} disabled={isReadOnly}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ไม่พบจังสิต">ไม่พบจังสิต</SelectItem>
                  <SelectItem value="พบจังสิต">พบจังสิต</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>ความเดียวของ Control :</Label>
              <Select value={formData.coolingSystemControl} onValueChange={(value) => setFormData(prev => ({...prev, coolingSystemControl: value}))} disabled={isReadOnly}>
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
              <Label>ปลากับมอยู่ :</Label>
              <Select value={formData.operationDevice} onValueChange={(value) => setFormData(prev => ({...prev, operationDevice: value}))} disabled={isReadOnly}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ลากเลย">ลากเลย</SelectItem>
                  <SelectItem value="มีปัญหา">มีปัญหา</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Wiring Control :</Label>
              <Select value={formData.wiringControl} onValueChange={(value) => setFormData(prev => ({...prev, wiringControl: value}))} disabled={isReadOnly}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ลากเลย">ลากเลย</SelectItem>
                  <SelectItem value="มีปัญหา">มีปัญหา</SelectItem>
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

export default TransformerControlCabinetModal;
