
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface ConservatorTankModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "view" | "edit";
  data?: any;
}

const ConservatorTankModal: React.FC<ConservatorTankModalProps> = ({
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
    oilLeakage: "",
    oilLevel: "",
    cleanliness: "",
    breather: "",
    oltcOilLeakage: "",
    oltcOilLevel: "",
    oltcCleanliness: "",
    oltcSilicaGel: "",
    oltcBreather: ""
  });

  useEffect(() => {
    if (mode !== "add" && data) {
      setFormData({
        transformer: data.transformerName || "",
        testType: data.testType || "",
        inspector: data.inspector || "",
        inspectionDate: data.inspectionDate || "",
        operationId: data.operationId || "",
        oilLeakage: "ปกติ",
        oilLevel: "ปกติ",
        cleanliness: "ไม่มีสะกดเก็บ",
        breather: "ปกติ (ใส)",
        oltcOilLeakage: "ปกติ",
        oltcOilLevel: "ปกติ",
        oltcCleanliness: "ไม่มีสะกดเก็บ",
        oltcSilicaGel: "ปกติ",
        oltcBreather: "ปกติ (ใส)"
      });
    } else if (mode === "add") {
      setFormData({
        transformer: "",
        testType: "",
        inspector: "",
        inspectionDate: "",
        operationId: "",
        oilLeakage: "",
        oilLevel: "",
        cleanliness: "",
        breather: "",
        oltcOilLeakage: "",
        oltcOilLevel: "",
        oltcCleanliness: "",
        oltcSilicaGel: "",
        oltcBreather: ""
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "เพิ่มข้อมูล Conservator Tank" : 
             mode === "view" ? "ดูข้อมูล Conservator Tank" : 
             "แก้ไขข้อมูล Conservator Tank"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
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

          {/* MAINTANK */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">MAINTANK</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>ความผุกร่อน :</Label>
                <Select value={formData.oilLeakage} onValueChange={(value) => setFormData(prev => ({...prev, oilLeakage: value}))} disabled={isReadOnly}>
                  <SelectTrigger>
                    <SelectValue placeholder="ปกติ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ปกติ">ปกติ</SelectItem>
                    <SelectItem value="ผิดปกติ">ผิดปกติ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>การรั่วซึมของน้ำมัน :</Label>
                <Select value={formData.oilLevel} onValueChange={(value) => setFormData(prev => ({...prev, oilLevel: value}))} disabled={isReadOnly}>
                  <SelectTrigger>
                    <SelectValue placeholder="ปกติ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ปกติ">ปกติ</SelectItem>
                    <SelectItem value="ผิดปกติ">ผิดปกติ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>ระดับน้ำมัน :</Label>
                <Select value={formData.cleanliness} onValueChange={(value) => setFormData(prev => ({...prev, cleanliness: value}))} disabled={isReadOnly}>
                  <SelectTrigger>
                    <SelectValue placeholder="ไม่มีสะกดเก็บ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ไม่มีสะกดเก็บ">ไม่มีสะกดเก็บ</SelectItem>
                    <SelectItem value="มีสะกดเก็บ">มีสะกดเก็บ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>ระดับน้ำมัน :</Label>
                <Select value={formData.breather} onValueChange={(value) => setFormData(prev => ({...prev, breather: value}))} disabled={isReadOnly}>
                  <SelectTrigger>
                    <SelectValue placeholder="ปกติ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ปกติ">ปกติ</SelectItem>
                    <SelectItem value="ผิดปกติ">ผิดปกติ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Breather :</Label>
                <Select value={formData.breather} onValueChange={(value) => setFormData(prev => ({...prev, breather: value}))} disabled={isReadOnly}>
                  <SelectTrigger>
                    <SelectValue placeholder="ปกติ (ใส)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ปกติ (ใส)">ปกติ (ใส)</SelectItem>
                    <SelectItem value="ผิดปกติ">ผิดปกติ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* OLTC */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">OLTC</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>ความผุกร่อน :</Label>
                <Select value={formData.oltcOilLeakage} onValueChange={(value) => setFormData(prev => ({...prev, oltcOilLeakage: value}))} disabled={isReadOnly}>
                  <SelectTrigger>
                    <SelectValue placeholder="ปกติ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ปกติ">ปกติ</SelectItem>
                    <SelectItem value="ผิดปกติ">ผิดปกติ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>การรั่วซึมของน้ำมัน :</Label>
                <Select value={formData.oltcOilLevel} onValueChange={(value) => setFormData(prev => ({...prev, oltcOilLevel: value}))} disabled={isReadOnly}>
                  <SelectTrigger>
                    <SelectValue placeholder="ปกติ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ปกติ">ปกติ</SelectItem>
                    <SelectItem value="ผิดปกติ">ผิดปกติ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>ระดับน้ำมัน :</Label>
                <Select value={formData.oltcCleanliness} onValueChange={(value) => setFormData(prev => ({...prev, oltcCleanliness: value}))} disabled={isReadOnly}>
                  <SelectTrigger>
                    <SelectValue placeholder="ไม่มีสะกดเก็บ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ไม่มีสะกดเก็บ">ไม่มีสะกดเก็บ</SelectItem>
                    <SelectItem value="มีสะกดเก็บ">มีสะกดเก็บ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>สีของ Silica Gel :</Label>
                <Select value={formData.oltcSilicaGel} onValueChange={(value) => setFormData(prev => ({...prev, oltcSilicaGel: value}))} disabled={isReadOnly}>
                  <SelectTrigger>
                    <SelectValue placeholder="ปกติ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ปกติ">ปกติ</SelectItem>
                    <SelectItem value="ผิดปกติ">ผิดปกติ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Breather :</Label>
                <Select value={formData.oltcBreather} onValueChange={(value) => setFormData(prev => ({...prev, oltcBreather: value}))} disabled={isReadOnly}>
                  <SelectTrigger>
                    <SelectValue placeholder="ปกติ (ใส)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ปกติ (ใส)">ปกติ (ใส)</SelectItem>
                    <SelectItem value="ผิดปกติ">ผิดปกติ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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

export default ConservatorTankModal;
