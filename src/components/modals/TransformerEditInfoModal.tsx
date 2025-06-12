
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface TransformerEditInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  transformer: {
    id: number;
    equipmentNo: string;
    manufacturer: string;
    status: string;
  } | null;
}

const manufacturers = [
  "Elektro Roxurg",
  "OSAKA", 
  "Meiden",
  "Mitsubishi"
];

const statuses = [
  "เป็นตัว Spare",
  "ถูกปลดออกจากระบบ", 
  "อยู่ในระหว่างซ่อม"
];

const TransformerEditInfoModal: React.FC<TransformerEditInfoModalProps> = ({ isOpen, onClose, transformer }) => {
  const { toast } = useToast();
  const [manufacturer, setManufacturer] = useState(transformer?.manufacturer || "");
  const [status, setStatus] = useState(transformer?.status || "");

  const handleSave = () => {
    toast({
      title: "แก้ไขข้อมูลสำเร็จ",
      description: "ข้อมูลหม้อแปลงได้รับการอัปเดตแล้ว",
    });
    onClose();
  };

  if (!transformer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">แก้ไขหม้อแปลง</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="equipmentNo">Equipment No. :</Label>
            <Input
              id="equipmentNo"
              value={transformer.equipmentNo}
              readOnly
              className="bg-gray-100"
            />
          </div>

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
                {statuses.map((sts) => (
                  <SelectItem key={sts} value={sts}>
                    {sts}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            ยกเลิก
          </Button>
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            บันทึก
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransformerEditInfoModal;
