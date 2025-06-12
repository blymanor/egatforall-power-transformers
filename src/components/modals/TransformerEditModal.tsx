
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface TransformerEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const manufacturers = [
  "Elektro Busang",
  "Meiden",
  "Mitsubishi",
  "OSAKA",
  "ABB",
  "Siemens",
  "Hitachi"
];

const statuses = [
  "เป็น spare",
  "ถูกปลดออกจากระบบ",
  "อยู่ในระหว่างซ่อม"
];

const TransformerEditModal: React.FC<TransformerEditModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [manufacturer, setManufacturer] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");

  const handleSave = () => {
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ข้อมูลหม้อแปลงได้รับการอัปเดตแล้ว",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">แก้ไขข้อมูลหม้อแปลง</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="manufacturer">บริษัทผู้ผลิต :</Label>
            <Select value={manufacturer} onValueChange={setManufacturer}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกบริษัทผู้ผลิต" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {manufacturers.map((mfr) => (
                  <SelectItem key={mfr} value={mfr}>
                    {mfr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">สถานะ :</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกสถานะ" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {statuses.map((st) => (
                  <SelectItem key={st} value={st}>
                    {st}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">หมายเหตุ (ถ้ามี) :</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="กรอกหมายเหตุ..."
              className="min-h-[80px]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            ยกเลิก
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            บันทึก
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransformerEditModal;
