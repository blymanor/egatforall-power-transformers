
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface OilAgingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "view" | "edit";
  data?: any;
}

const OilAgingModal: React.FC<OilAgingModalProps> = ({
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
    itf: "",
    nn: "",
    pf100: ""
  });

  useEffect(() => {
    if (mode !== "add" && data) {
      setFormData({
        transformer: data.transformerName || "",
        testType: data.testType || "",
        inspectionDate: data.inspectionDate || "",
        inspector: data.inspector || "",
        itf: "25.5",
        nn: "0.15",
        pf100: "0.85"
      });
    } else if (mode === "add") {
      setFormData({
        transformer: "",
        testType: "",
        inspectionDate: "",
        inspector: "",
        itf: "",
        nn: "",
        pf100: ""
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
            {mode === "add" ? "เพิ่มข้อมูล Oil Aging" : 
             mode === "view" ? "ดูข้อมูล Oil Aging" : 
             "แก้ไขข้อมูล Oil Aging"}
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
              <Label>IFT :</Label>
              <Input 
                value={formData.itf} 
                onChange={(e) => setFormData(prev => ({...prev, itf: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า IFT"
              />
            </div>

            <div>
              <Label>NN :</Label>
              <Input 
                value={formData.nn} 
                onChange={(e) => setFormData(prev => ({...prev, nn: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า NN"
              />
            </div>

            <div>
              <Label>PF100 :</Label>
              <Input 
                value={formData.pf100} 
                onChange={(e) => setFormData(prev => ({...prev, pf100: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า PF100"
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

export default OilAgingModal;
