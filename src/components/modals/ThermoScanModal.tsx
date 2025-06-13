
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ThermoScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "view" | "edit";
  data?: any;
}

const ThermoScanModal: React.FC<ThermoScanModalProps> = ({
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
    loadPercentage: "",
    tempRiseAboveNormal: "",
    tempDelta: "",
    remark: ""
  });

  useEffect(() => {
    if (mode !== "add" && data) {
      setFormData({
        transformer: data.transformerName || "",
        testType: data.testType || "",
        inspector: data.inspector || "",
        inspectionDate: data.inspectionDate || "",
        operationId: data.operationId || "",
        loadPercentage: "",
        tempRiseAboveNormal: "",
        tempDelta: "°C",
        remark: ""
      });
    } else if (mode === "add") {
      setFormData({
        transformer: "",
        testType: "",
        inspector: "",
        inspectionDate: "",
        operationId: "",
        loadPercentage: "",
        tempRiseAboveNormal: "",
        tempDelta: "",
        remark: ""
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
            {mode === "add" ? "เพิ่มข้อมูล Thermo Scan" : 
             mode === "view" ? "ดูข้อมูล Thermo Scan" : 
             "แก้ไขข้อมูล Thermo Scan"}
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
              <Label>%Load ขณะตรวจสอบ :</Label>
              <Input 
                value={formData.loadPercentage} 
                onChange={(e) => setFormData(prev => ({...prev, loadPercentage: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุ %Load"
              />
            </div>

            <div>
              <Label>Temp. Rise Above Normal Temp. (Delta T) :</Label>
              <Input 
                value={formData.tempRiseAboveNormal} 
                onChange={(e) => setFormData(prev => ({...prev, tempRiseAboveNormal: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุอุณหภูมิ"
              />
            </div>

            <div>
              <Label>°C</Label>
              <Input 
                value={formData.tempDelta} 
                onChange={(e) => setFormData(prev => ({...prev, tempDelta: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="°C"
              />
            </div>

            <div>
              <Label>Remark :</Label>
              <Textarea 
                value={formData.remark} 
                onChange={(e) => setFormData(prev => ({...prev, remark: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุหมายเหตุ"
                rows={3}
              />
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

export default ThermoScanModal;
