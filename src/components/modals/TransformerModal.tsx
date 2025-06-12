
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface TransformerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
}

const TransformerModal: React.FC<TransformerModalProps> = ({ isOpen, onClose, isEditing }) => {
  // Add state for form fields
  const [deviceNo, setDeviceNo] = useState("");
  const [equipmentNo, setEquipmentNo] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState("");
  const [substationName, setSubstationName] = useState("");
  const [transformerType, setTransformerType] = useState("");
  const [phasePosition, setPhasePosition] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const [manufactureYear, setManufactureYear] = useState("");
  const [ratedCapacity, setRatedCapacity] = useState("");
  const [ratedVoltage, setRatedVoltage] = useState("");
  const [primaryVoltage, setPrimaryVoltage] = useState("");
  const [secondaryVoltage, setSecondaryVoltage] = useState("");
  const [tertiaryVoltage, setTertiaryVoltage] = useState("");
  const [remark, setRemark] = useState("");
  
  const { toast } = useToast();

  const handleSubmit = () => {
    // Form validation
    if (!deviceNo || !equipmentNo || !manufacturer || !location || !region || 
        !substationName || !transformerType || !phasePosition || 
        !manufactureYear || !ratedCapacity || !ratedVoltage) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "ข้อมูลที่มีเครื่องหมาย * จำเป็นต้องกรอก",
        variant: "destructive"
      });
      return;
    }
    
    // Submit form data
    toast({
      title: isEditing ? "แก้ไขข้อมูลสำเร็จ" : "เพิ่มข้อมูลสำเร็จ",
      description: isEditing ? "แก้ไขข้อมูลหม้อแปลงไฟฟ้าเรียบร้อยแล้ว" : "เพิ่มหม้อแปลงไฟฟ้าใหม่เรียบร้อยแล้ว"
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "แก้ไขหม้อแปลงไฟฟ้า" : "เพิ่มหม้อแปลงไฟฟ้า"}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "ทำการแก้ไขข้อมูลหม้อแปลงไฟฟ้า โปรดกรอกข้อมูลให้ครบถ้วน"
              : "กรอกข้อมูลหม้อแปลงไฟฟ้าใหม่ ข้อมูลที่มีเครื่องหมาย * จำเป็นต้องกรอก"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* First column */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deviceNo">Device No. *</Label>
              <Input 
                id="deviceNo" 
                placeholder="รหัสอุปกรณ์" 
                value={deviceNo}
                onChange={(e) => setDeviceNo(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="equipmentNo">Equipment No. *</Label>
              <Input 
                id="equipmentNo" 
                placeholder="หมายเลขอุปกรณ์" 
                value={equipmentNo}
                onChange={(e) => setEquipmentNo(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="manufacturer">Manufacturer *</Label>
              <Input 
                id="manufacturer" 
                placeholder="บริษัทผู้ผลิต" 
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input 
                id="location" 
                placeholder="สถานที่ติดตั้ง" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region *</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger id="region" className="w-full border border-gray-300">
                  <SelectValue placeholder="เลือกเขต" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north">North</SelectItem>
                  <SelectItem value="northeast">Northeast</SelectItem>
                  <SelectItem value="central">Central</SelectItem>
                  <SelectItem value="south">South</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="substationName">Substation Name *</Label>
              <Input 
                id="substationName" 
                placeholder="ชื่อสถานีไฟฟ้า" 
                value={substationName}
                onChange={(e) => setSubstationName(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transformerType">Transformer Type *</Label>
              <Select value={transformerType} onValueChange={setTransformerType}>
                <SelectTrigger id="transformerType" className="w-full border border-gray-300">
                  <SelectValue placeholder="เลือกประเภทหม้อแปลง" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="power">Power Transformer</SelectItem>
                  <SelectItem value="distribution">Distribution Transformer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phasePosition">Phase Position *</Label>
              <Select value={phasePosition} onValueChange={setPhasePosition}>
                <SelectTrigger id="phasePosition" className="w-full border border-gray-300">
                  <SelectValue placeholder="เลือกตำแหน่งเฟส" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Phase</SelectItem>
                  <SelectItem value="three">Three Phase</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageFileName">ชื่อไฟล์รูปภาพที่ต้องการเก็บ</Label>
              <Input 
                id="imageFileName" 
                placeholder="ชื่อไฟล์รูปภาพ" 
                value={imageFileName}
                onChange={(e) => setImageFileName(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Second column */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="manufactureYear">Manufacture Year *</Label>
              <Input 
                id="manufactureYear" 
                placeholder="ปีที่ผลิต" 
                type="number" 
                value={manufactureYear}
                onChange={(e) => setManufactureYear(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ratedCapacity">Rated Capacity (MVA) *</Label>
              <Input 
                id="ratedCapacity" 
                placeholder="พิกัดกำลัง" 
                type="number" 
                step="0.01" 
                value={ratedCapacity}
                onChange={(e) => setRatedCapacity(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ratedVoltage">Rated Voltage (kV) *</Label>
              <Input 
                id="ratedVoltage" 
                placeholder="แรงดันไฟฟ้า" 
                type="number" 
                step="0.01" 
                value={ratedVoltage}
                onChange={(e) => setRatedVoltage(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryVoltage">พิกัดแรงดันไฟฟ้า Primary, HV (kV)</Label>
              <Input 
                id="primary-voltage" 
                type="number"
                placeholder="กรอกพิกัดแรงดันไฟฟ้า Primary"
                className="w-full focus-visible:ring-0"
                value={primaryVoltage}
                onChange={(e) => setPrimaryVoltage(e.target.value)}
              />
            </div>
                  
            <div className="space-y-2">
              <Label htmlFor="secondaryVoltage">พิกัดแรงดันไฟฟ้า Secondary, LV (kV)</Label>
              <Input 
                id="secondary-voltage" 
                type="number"
                placeholder="กรอกพิกัดแรงดันไฟฟ้า Secondary"
                className="w-full focus-visible:ring-0"
                value={secondaryVoltage}
                onChange={(e) => setSecondaryVoltage(e.target.value)}
              />
            </div>
                  
            <div className="space-y-2">
              <Label htmlFor="tertiaryVoltage">พิกัดแรงดันไฟฟ้า Tertiary, TV (kV)</Label>
              <Input 
                id="tertiary-voltage" 
                type="number"
                placeholder="กรอกพิกัดแรงดันไฟฟ้า Tertiary"
                className="w-full focus-visible:ring-0"
                value={tertiaryVoltage}
                onChange={(e) => setTertiaryVoltage(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="remark">รายละเอียดเพิ่มเติม (Remark)</Label>
              <Textarea 
                id="remark" 
                placeholder="ข้อมูลเพิ่มเติม" 
                rows={4} 
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-end space-x-2 border-t pt-4 mt-2">
          <Button variant="outline" onClick={onClose}>
            ยกเลิก
          </Button>
          <Button type="button" onClick={handleSubmit}>
            {isEditing ? "บันทึกการแก้ไข" : "เพิ่มหม้อแปลง"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransformerModal;
