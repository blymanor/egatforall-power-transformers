
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface BushingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "view" | "edit";
  data?: any;
}

const BushingModal: React.FC<BushingModalProps> = ({
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
    hvPorcelainColor: "",
    hvPorcelainCrack: "",
    hvOilLeakage: "",
    hvCleanliness: "",
    hvSoundCondition: "",
    lvPorcelainColor: "",
    lvPorcelainCrack: "",
    lvOilLeakage: "",
    lvCleanliness: "",
    lvSoundCondition: "",
    tvPorcelainColor: "",
    tvPorcelainCrack: "",
    tvOilLeakage: "",
    tvCleanliness: "",
    tvSoundCondition: ""
  });

  useEffect(() => {
    if (mode !== "add" && data) {
      setFormData({
        transformer: data.transformerName || "",
        testType: data.testType || "",
        inspector: data.inspector || "",
        inspectionDate: data.inspectionDate || "",
        operationId: data.operationId || "",
        hvPorcelainColor: "ปกติ",
        hvPorcelainCrack: "ปกติ",
        hvOilLeakage: "ไม่มีการแป่น",
        hvCleanliness: "ปกติ",
        hvSoundCondition: "ปกติ (ใส)",
        lvPorcelainColor: "ปกติ",
        lvPorcelainCrack: "ปกติ",
        lvOilLeakage: "ไม่มีการแป่น",
        lvCleanliness: "ปกติ",
        lvSoundCondition: "ปกติ (ใส)",
        tvPorcelainColor: "ปกติ",
        tvPorcelainCrack: "ปกติ",
        tvOilLeakage: "ไม่มีการแป่น",
        tvCleanliness: "ปกติ",
        tvSoundCondition: "ปกติ (ใส)"
      });
    } else if (mode === "add") {
      setFormData({
        transformer: "",
        testType: "",
        inspector: "",
        inspectionDate: "",
        operationId: "",
        hvPorcelainColor: "",
        hvPorcelainCrack: "",
        hvOilLeakage: "",
        hvCleanliness: "",
        hvSoundCondition: "",
        lvPorcelainColor: "",
        lvPorcelainCrack: "",
        lvOilLeakage: "",
        lvCleanliness: "",
        lvSoundCondition: "",
        tvPorcelainColor: "",
        tvPorcelainCrack: "",
        tvOilLeakage: "",
        tvCleanliness: "",
        tvSoundCondition: ""
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "เพิ่มข้อมูล Bushing" : 
             mode === "view" ? "ดูข้อมูล Bushing" : 
             "แก้ไขข้อมูล Bushing"}
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

          {/* HV BUSHING */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">HV BUSHING</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>สภาพ Porcelain :</Label>
                <Select value={formData.hvPorcelainColor} onValueChange={(value) => setFormData(prev => ({...prev, hvPorcelainColor: value}))} disabled={isReadOnly}>
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
                <Label>ความแตกของ Porcelain :</Label>
                <Select value={formData.hvPorcelainCrack} onValueChange={(value) => setFormData(prev => ({...prev, hvPorcelainCrack: value}))} disabled={isReadOnly}>
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
                <Select value={formData.hvOilLeakage} onValueChange={(value) => setFormData(prev => ({...prev, hvOilLeakage: value}))} disabled={isReadOnly}>
                  <SelectTrigger>
                    <SelectValue placeholder="ไม่มีการแป่น" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ไม่มีการแป่น">ไม่มีการแป่น</SelectItem>
                    <SelectItem value="มีการแป่น">มีการแป่น</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>ระดับน้ำมัน :</Label>
                <Select value={formData.hvCleanliness} onValueChange={(value) => setFormData(prev => ({...prev, hvCleanliness: value}))} disabled={isReadOnly}>
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
                <Label>สีของน้ำมัน :</Label>
                <Select value={formData.hvSoundCondition} onValueChange={(value) => setFormData(prev => ({...prev, hvSoundCondition: value}))} disabled={isReadOnly}>
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

          {/* LV BUSHING */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">LV BUSHING</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>สภาพ Porcelain :</Label>
                <Select value={formData.lvPorcelainColor} onValueChange={(value) => setFormData(prev => ({...prev, lvPorcelainColor: value}))} disabled={isReadOnly}>
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
                <Label>ความแตกของ Porcelain :</Label>
                <Select value={formData.lvPorcelainCrack} onValueChange={(value) => setFormData(prev => ({...prev, lvPorcelainCrack: value}))} disabled={isReadOnly}>
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
                <Select value={formData.lvOilLeakage} onValueChange={(value) => setFormData(prev => ({...prev, lvOilLeakage: value}))} disabled={isReadOnly}>
                  <SelectTrigger>
                    <SelectValue placeholder="ไม่มีการแป่น" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ไม่มีการแป่น">ไม่มีการแป่น</SelectItem>
                    <SelectItem value="มีการแป่น">มีการแป่น</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>ระดับน้ำมัน :</Label>
                <Select value={formData.lvCleanliness} onValueChange={(value) => setFormData(prev => ({...prev, lvCleanliness: value}))} disabled={isReadOnly}>
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
                <Label>สีของน้ำมัน :</Label>
                <Select value={formData.lvSoundCondition} onValueChange={(value) => setFormData(prev => ({...prev, lvSoundCondition: value}))} disabled={isReadOnly}>
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

          {/* TV BUSHING */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">TV BUSHING</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>สภาพ Porcelain :</Label>
                <Select value={formData.tvPorcelainColor} onValueChange={(value) => setFormData(prev => ({...prev, tvPorcelainColor: value}))} disabled={isReadOnly}>
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
                <Label>ความแตกของ Porcelain :</Label>
                <Select value={formData.tvPorcelainCrack} onValueChange={(value) => setFormData(prev => ({...prev, tvPorcelainCrack: value}))} disabled={isReadOnly}>
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
                <Select value={formData.tvOilLeakage} onValueChange={(value) => setFormData(prev => ({...prev, tvOilLeakage: value}))} disabled={isReadOnly}>
                  <SelectTrigger>
                    <SelectValue placeholder="ไม่มีการแป่น" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ไม่มีการแป่น">ไม่มีการแป่น</SelectItem>
                    <SelectItem value="มีการแป่น">มีการแป่น</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>ระดับน้ำมัน :</Label>
                <Select value={formData.tvCleanliness} onValueChange={(value) => setFormData(prev => ({...prev, tvCleanliness: value}))} disabled={isReadOnly}>
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
                <Label>สีของน้ำมัน :</Label>
                <Select value={formData.tvSoundCondition} onValueChange={(value) => setFormData(prev => ({...prev, tvSoundCondition: value}))} disabled={isReadOnly}>
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

export default BushingModal;
