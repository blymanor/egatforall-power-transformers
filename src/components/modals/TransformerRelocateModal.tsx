
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface TransformerRelocateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const provinces = [
  "AMNAT CHAROEN",
  "BANGKOK",
  "CHIANG MAI",
  "CHIANG RAI",
  "PHUKET",
  "PHITSANULOK",
  "NAKHON RATCHASIMA",
  "UDON THANI",
  "KHON KAEN",
  "SURAT THANI"
];

const TransformerRelocateModal: React.FC<TransformerRelocateModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [equipmentNo, setEquipmentNo] = useState("");
  const [oldStation] = useState("PHITSANULOK 2"); // Pre-filled value
  const [newProvince, setNewProvince] = useState("");
  const [newTransformerName, setNewTransformerName] = useState("");
  const [relocateDate, setRelocateDate] = useState("");
  const [recorder, setRecorder] = useState("");

  const handleSave = () => {
    toast({
      title: "ย้ายหม้อแปลงสำเร็จ",
      description: "ข้อมูลการย้ายหม้อแปลงได้รับการบันทึกแล้ว",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">ย้ายเข้าหม้อแปลง</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="equipmentNo">Equipment No. :</Label>
            <Input
              id="equipmentNo"
              value={equipmentNo}
              onChange={(e) => setEquipmentNo(e.target.value)}
              placeholder="กรอก Equipment No."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="oldStation">สถานีเก่า :</Label>
            <Input
              id="oldStation"
              value={oldStation}
              readOnly
              className="bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newProvince">ย้ายไปสถานีใหม่ :</Label>
            <Select value={newProvince} onValueChange={setNewProvince}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกจังหวัด" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {provinces.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newTransformerName">ชื่อหม้อแปลงใหม่ (ใส่ KT1A,...) :</Label>
            <Input
              id="newTransformerName"
              value={newTransformerName}
              onChange={(e) => setNewTransformerName(e.target.value)}
              placeholder="เช่น KT1A"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relocateDate">วันที่ย้าย :</Label>
            <Input
              id="relocateDate"
              type="date"
              value={relocateDate}
              onChange={(e) => setRelocateDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recorder">ผู้บันทึก :</Label>
            <Input
              id="recorder"
              value={recorder}
              onChange={(e) => setRecorder(e.target.value)}
              placeholder="กรอกชื่อผู้บันทึก"
            />
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

export default TransformerRelocateModal;
