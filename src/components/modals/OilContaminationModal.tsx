
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface OilContaminationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "view" | "edit";
  data?: any;
}

const OilContaminationModal: React.FC<OilContaminationModalProps> = ({
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
    fal2: "",
    acf2: "",
    fol2: "",
    hmf5: "",
    mef5: ""
  });

  useEffect(() => {
    if (mode !== "add" && data) {
      setFormData({
        transformer: data.transformerName || "",
        testType: data.testType || "",
        inspectionDate: data.inspectionDate || "",
        inspector: data.inspector || "",
        fal2: "0.35",
        acf2: "0.28",
        fol2: "0.42",
        hmf5: "0.15",
        mef5: "0.08"
      });
    } else if (mode === "add") {
      setFormData({
        transformer: "",
        testType: "",
        inspectionDate: "",
        inspector: "",
        fal2: "",
        acf2: "",
        fol2: "",
        hmf5: "",
        mef5: ""
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
            {mode === "add" ? "เพิ่มข้อมูล Oil Contamination" : 
             mode === "view" ? "ดูข้อมูล Oil Contamination" : 
             "แก้ไขข้อมูล Oil Contamination"}
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

          <div className="space-y-4">
            <div>
              <Label>2FAL [ppb] :</Label>
              <Input 
                value={formData.fal2} 
                onChange={(e) => setFormData(prev => ({...prev, fal2: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า 2FAL"
              />
            </div>

            <div>
              <Label>2ACF [ppb] :</Label>
              <Input 
                value={formData.acf2} 
                onChange={(e) => setFormData(prev => ({...prev, acf2: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า 2ACF"
              />
            </div>

            <div>
              <Label>2FOL [ppb] :</Label>
              <Input 
                value={formData.fol2} 
                onChange={(e) => setFormData(prev => ({...prev, fol2: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า 2FOL"
              />
            </div>

            <div>
              <Label>5HMF [ppb] :</Label>
              <Input 
                value={formData.hmf5} 
                onChange={(e) => setFormData(prev => ({...prev, hmf5: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า 5HMF"
              />
            </div>

            <div>
              <Label>5MEF [ppb] :</Label>
              <Input 
                value={formData.mef5} 
                onChange={(e) => setFormData(prev => ({...prev, mef5: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า 5MEF"
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

export default OilContaminationModal;
