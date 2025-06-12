
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface TransformerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing?: boolean;
}

const TransformerModal: React.FC<TransformerModalProps> = ({ isOpen, onClose, isEditing = false }) => {
  const { toast } = useToast();
  
  // Basic Info states
  const [equipmentNo, setEquipmentNo] = useState("");
  const [deviceNo, setDeviceNo] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [capacity, setCapacity] = useState("");
  const [region, setRegion] = useState("");
  
  // Accessories states
  const [nameplateYear, setNameplateYear] = useState("");
  const [accessoryType, setAccessoryType] = useState("");
  const [accessoryManufacturer, setAccessoryManufacturer] = useState("");

  const handleSave = () => {
    const action = isEditing ? "แก้ไข" : "เพิ่ม";
    toast({
      title: `${action}ข้อมูลสำเร็จ`,
      description: `ข้อมูลหม้อแปลงได้รับการ${action}แล้ว`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {isEditing ? "แก้ไขหม้อแปลงไฟฟ้า" : "เพิ่มหม้อแปลงไฟฟ้า"}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="accessories">Accessories</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="deviceNo">หมายเลขอุปกรณ์ :</Label>
                <Input
                  id="deviceNo"
                  value={deviceNo}
                  onChange={(e) => setDeviceNo(e.target.value)}
                  placeholder="กรอกหมายเลขอุปกรณ์"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="manufacturer">บริษัทผู้ผลิต :</Label>
                <Select value={manufacturer} onValueChange={setManufacturer}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกบริษัทผู้ผลิต" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="abb">ABB</SelectItem>
                    <SelectItem value="siemens">Siemens</SelectItem>
                    <SelectItem value="osaka">OSAKA</SelectItem>
                    <SelectItem value="hitachi">Hitachi</SelectItem>
                    <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">กำลังไฟฟ้า (MVA) :</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="กรอกกำลังไฟฟ้า"
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="region">เขต :</Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกเขต" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="north">เหนือ</SelectItem>
                    <SelectItem value="northeast">ตะวันออกเฉียงเหนือ</SelectItem>
                    <SelectItem value="central">กลาง</SelectItem>
                    <SelectItem value="south">ใต้</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="accessories" className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nameplateYear">ปีใน Nameplate :</Label>
                <Input
                  id="nameplateYear"
                  value={nameplateYear}
                  onChange={(e) => setNameplateYear(e.target.value)}
                  placeholder="กรอกปี"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accessoryType">ประเภท Accessories :</Label>
                <Select value={accessoryType} onValueChange={setAccessoryType}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกประเภท" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="cooling">ระบบระบายความร้อน</SelectItem>
                    <SelectItem value="protection">ระบบป้องกัน</SelectItem>
                    <SelectItem value="monitoring">ระบบตรวจสอบ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="accessoryManufacturer">บริษัทผู้ผลิต Accessories :</Label>
                <Select value={accessoryManufacturer} onValueChange={setAccessoryManufacturer}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกบริษัทผู้ผลิต" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="abb">ABB</SelectItem>
                    <SelectItem value="siemens">Siemens</SelectItem>
                    <SelectItem value="schneider">Schneider Electric</SelectItem>
                    <SelectItem value="ge">General Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

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

export default TransformerModal;
