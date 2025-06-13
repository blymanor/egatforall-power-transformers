
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface GeneralConditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "view" | "edit";
  data?: any;
}

const GeneralConditionModal: React.FC<GeneralConditionModalProps> = ({
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
    maxLoad: "",
    transformerSound: "",
    vibration: "",
    groundingConnector: "",
    foundation: "",
    animalProtection: ""
  });

  useEffect(() => {
    if (mode !== "add" && data) {
      setFormData({
        transformer: data.transformerName || "",
        testType: data.testType || "",
        inspector: data.inspector || "",
        inspectionDate: data.inspectionDate || "",
        operationId: data.operationId || "",
        maxLoad: "<60%",
        transformerSound: "ปกติ",
        vibration: "ปกติ",
        groundingConnector: "ปกติ",
        foundation: "ปกติ",
        animalProtection: "สภาพปกติ"
      });
    } else if (mode === "add") {
      setFormData({
        transformer: "",
        testType: "",
        inspector: "",
        inspectionDate: "",
        operationId: "",
        maxLoad: "",
        transformerSound: "",
        vibration: "",
        groundingConnector: "",
        foundation: "",
        animalProtection: ""
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
            {mode === "add" ? "เพิ่มข้อมูล General Condition" : 
             mode === "view" ? "ดูข้อมูล General Condition" : 
             "แก้ไขข้อมูล General Condition"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="transformer">หม้อแปลงไฟฟ้า :</Label>
            <Select value={formData.transformer} onValueChange={(value) => setFormData(prev => ({...prev, transformer: value}))} disabled={isReadOnly}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AN-KT1A">AN-KT1A</SelectItem>
                <SelectItem value="AT2-KT1A">AT2-KT1A</SelectItem>
                <SelectItem value="AN-473A">AN-473A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="testType">รูปแบบการทดสอบ :</Label>
            <Select value={formData.testType} onValueChange={(value) => setFormData(prev => ({...prev, testType: value}))} disabled={isReadOnly}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกรูปแบบการทดสอบ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Weekly test">Weekly test</SelectItem>
                <SelectItem value="Monthly test">Monthly test</SelectItem>
                <SelectItem value="Quarterly test">Quarterly test</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="inspector">ผู้ตรวจสอบ :</Label>
            <Input
              id="inspector"
              value={formData.inspector}
              onChange={(e) => setFormData(prev => ({...prev, inspector: e.target.value}))}
              readOnly={isReadOnly}
            />
          </div>

          <div>
            <Label htmlFor="inspectionDate">วันที่ตรวจสอบ :</Label>
            <Input
              id="inspectionDate"
              type="date"
              value={formData.inspectionDate}
              onChange={(e) => setFormData(prev => ({...prev, inspectionDate: e.target.value}))}
              readOnly={isReadOnly}
            />
          </div>

          <div>
            <Label htmlFor="operationId">เลขคำสั่งปฏิบัติงาน :</Label>
            <Input
              id="operationId"
              value={formData.operationId}
              onChange={(e) => setFormData(prev => ({...prev, operationId: e.target.value}))}
              readOnly={isReadOnly}
            />
          </div>

          <div>
            <Label htmlFor="maxLoad">Max, Load ของหม้อแปลง :</Label>
            <Select value={formData.maxLoad} onValueChange={(value) => setFormData(prev => ({...prev, maxLoad: value}))} disabled={isReadOnly}>
              <SelectTrigger>
                <SelectValue placeholder="เลือก Max Load" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="<60%">&lt;60%</SelectItem>
                <SelectItem value="60-80%">60-80%</SelectItem>
                <SelectItem value=">80%">&gt;80%</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="transformerSound">เสียงของหม้อแปลง :</Label>
            <Select value={formData.transformerSound} onValueChange={(value) => setFormData(prev => ({...prev, transformerSound: value}))} disabled={isReadOnly}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกสถานะเสียง" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ปกติ">ปกติ</SelectItem>
                <SelectItem value="ผิดปกติ">ผิดปกติ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="vibration">การสั่นสะเทือน :</Label>
            <Select value={formData.vibration} onValueChange={(value) => setFormData(prev => ({...prev, vibration: value}))} disabled={isReadOnly}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกสถานะการสั่นสะเทือน" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ปกติ">ปกติ</SelectItem>
                <SelectItem value="ผิดปกติ">ผิดปกติ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="groundingConnector">Grounding Connector :</Label>
            <Select value={formData.groundingConnector} onValueChange={(value) => setFormData(prev => ({...prev, groundingConnector: value}))} disabled={isReadOnly}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกสถานะ Grounding Connector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ปกติ">ปกติ</SelectItem>
                <SelectItem value="ผิดปกติ">ผิดปกติ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="foundation">Foundation :</Label>
            <Select value={formData.foundation} onValueChange={(value) => setFormData(prev => ({...prev, foundation: value}))} disabled={isReadOnly}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกสถานะ Foundation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ปกติ">ปกติ</SelectItem>
                <SelectItem value="ผิดปกติ">ผิดปกติ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="animalProtection">Animal Protection :</Label>
            <Select value={formData.animalProtection} onValueChange={(value) => setFormData(prev => ({...prev, animalProtection: value}))} disabled={isReadOnly}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกสถานะ Animal Protection" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="สภาพปกติ">สภาพปกติ</SelectItem>
                <SelectItem value="สภาพผิดปกติ">สภาพผิดปกติ</SelectItem>
              </SelectContent>
            </Select>
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

export default GeneralConditionModal;
