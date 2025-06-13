
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface OLTCOilContaminationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "view" | "edit";
  data?: any;
}

const OLTCOilContaminationModal: React.FC<OLTCOilContaminationModalProps> = ({
  isOpen,
  onClose,
  mode,
  data
}) => {
  const [formData, setFormData] = useState({
    transformer: "",
    testType: "",
    inspectionDate: "",
    inspector: "",
    oltcType: "",
    color: "",
    waterContent: ""
  });

  useEffect(() => {
    if (mode !== "add" && data) {
      setFormData({
        transformer: data.transformerName || "",
        testType: data.testType || "",
        inspectionDate: data.inspectionDate || "",
        inspector: data.inspector || "",
        oltcType: "Resistive LTC",
        color: "2.0",
        waterContent: "18"
      });
    } else if (mode === "add") {
      setFormData({
        transformer: "",
        testType: "",
        inspectionDate: "",
        inspector: "",
        oltcType: "",
        color: "",
        waterContent: ""
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
            {mode === "add" ? "เพิ่มข้อมูล OLTC Oil Contamination" : 
             mode === "view" ? "ดูข้อมูล OLTC Oil Contamination" : 
             "แก้ไขข้อมูล OLTC Oil Contamination"}
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
              <Label>รูปแบบการตรวจสอบ :</Label>
              <Select value={formData.testType} onValueChange={(value) => setFormData(prev => ({...prev, testType: value}))} disabled={isReadOnly}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกรูปแบบการตรวจสอบ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Commissioning">Commissioning</SelectItem>
                  <SelectItem value="Annual Test">Annual Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>วันที่ตรวจสอบ :</Label>
              <Input 
                type="date" 
                value={formData.inspectionDate} 
                onChange={(e) => setFormData(prev => ({...prev, inspectionDate: e.target.value}))} 
                readOnly={isReadOnly} 
              />
            </div>
            <div>
              <Label>ผู้ตรวจสอบ :</Label>
              <Input 
                value={formData.inspector} 
                onChange={(e) => setFormData(prev => ({...prev, inspector: e.target.value}))} 
                readOnly={isReadOnly} 
              />
            </div>
          </div>

          <div>
            <Label>ชนิด OLTC :</Label>
            <Select value={formData.oltcType} onValueChange={(value) => setFormData(prev => ({...prev, oltcType: value}))} disabled={isReadOnly}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกชนิด OLTC" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Resistive LTC">Resistive LTC</SelectItem>
                <SelectItem value="Reactor LTC">Reactor LTC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Color:</Label>
              <Input 
                value={formData.color} 
                onChange={(e) => setFormData(prev => ({...prev, color: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า Color"
              />
            </div>

            <div>
              <Label>Water Content :</Label>
              <Input 
                value={formData.waterContent} 
                onChange={(e) => setFormData(prev => ({...prev, waterContent: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า Water Content"
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

export default OLTCOilContaminationModal;
