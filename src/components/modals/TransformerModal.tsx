
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

interface TransformerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
}

const TransformerModal: React.FC<TransformerModalProps> = ({ isOpen, onClose, isEditing }) => {
  // General Information Tab State
  const [deviceNo, setDeviceNo] = useState("");
  const [equipmentNo, setEquipmentNo] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [location, setLocation] = useState("");
  const [transformerType, setTransformerType] = useState("");
  const [phaseCount, setPhaseCount] = useState("");
  const [windingInsulation, setWindingInsulation] = useState("");
  const [vectorGroup, setVectorGroup] = useState("");
  const [manufactureYear, setManufactureYear] = useState("");
  const [ratedCapacity, setRatedCapacity] = useState("");
  const [ratedVoltage, setRatedVoltage] = useState("");
  const [primaryVoltage, setPrimaryVoltage] = useState("");
  const [secondaryVoltage, setSecondaryVoltage] = useState("");
  const [tertiaryVoltage, setTertiaryVoltage] = useState("");
  const [remark, setRemark] = useState("");

  // Accessories Tab State - Bushing
  const [bushingHvManufacturer, setBushingHvManufacturer] = useState("");
  const [bushingHvType, setBushingHvType] = useState("");
  const [bushingHvNameplate, setBushingHvNameplate] = useState("");
  const [bushingHvSerialH0, setBushingHvSerialH0] = useState("");
  const [bushingHvSerialH1, setBushingHvSerialH1] = useState("");
  const [bushingHvSerialH2, setBushingHvSerialH2] = useState("");

  const [bushingLvManufacturer, setBushingLvManufacturer] = useState("");
  const [bushingLvType, setBushingLvType] = useState("");
  const [bushingLvNameplate, setBushingLvNameplate] = useState("");
  const [bushingLvSerialX0, setBushingLvSerialX0] = useState("");
  const [bushingLvSerialX1, setBushingLvSerialX1] = useState("");
  const [bushingLvSerialX2, setBushingLvSerialX2] = useState("");

  const [bushingTvManufacturer, setBushingTvManufacturer] = useState("");
  const [bushingTvType, setBushingTvType] = useState("");
  const [bushingTvNameplate, setBushingTvNameplate] = useState("");
  const [bushingTvSerialY0, setBushingTvSerialY0] = useState("");
  const [bushingTvSerialY1, setBushingTvSerialY1] = useState("");
  const [bushingTvSerialY2, setBushingTvSerialY2] = useState("");

  // Arrester
  const [arresterHvManufacturer, setArresterHvManufacturer] = useState("");
  const [arresterHvType, setArresterHvType] = useState("");
  const [arresterHvNameplate, setArresterHvNameplate] = useState("");
  const [arresterHvSerialH0, setArresterHvSerialH0] = useState("");
  const [arresterHvSerialH1, setArresterHvSerialH1] = useState("");
  const [arresterHvSerialH2, setArresterHvSerialH2] = useState("");
  const [arresterHvGap, setArresterHvGap] = useState("gap");

  const [arresterLvManufacturer, setArresterLvManufacturer] = useState("");
  const [arresterLvType, setArresterLvType] = useState("");
  const [arresterLvNameplate, setArresterLvNameplate] = useState("");
  const [arresterLvSerialX0, setArresterLvSerialX0] = useState("");
  const [arresterLvSerialX1, setArresterLvSerialX1] = useState("");
  const [arresterLvSerialX2, setArresterLvSerialX2] = useState("");
  const [arresterLvGap, setArresterLvGap] = useState("gap");

  const [arresterTvManufacturer, setArresterTvManufacturer] = useState("");
  const [arresterTvType, setArresterTvType] = useState("");
  const [arresterTvNameplate, setArresterTvNameplate] = useState("");
  const [arresterTvSerialY0, setArresterTvSerialY0] = useState("");
  const [arresterTvSerialY1, setArresterTvSerialY1] = useState("");
  const [arresterTvSerialY2, setArresterTvSerialY2] = useState("");
  const [arresterTvGap, setArresterTvGap] = useState("gap");

  // OLTC
  const [oltcManufacturer, setOltcManufacturer] = useState("");
  const [oltcType, setOltcType] = useState("");
  const [oltcNameplate, setOltcNameplate] = useState("");
  const [oltcSerialH0, setOltcSerialH0] = useState("");
  const [oltcSerialH1, setOltcSerialH1] = useState("");
  const [oltcSerialH2, setOltcSerialH2] = useState("");
  
  const { toast } = useToast();

  const handleSubmit = () => {
    // Form validation for required fields
    if (!deviceNo || !equipmentNo || !manufacturer || !location || 
        !transformerType || !phaseCount || !windingInsulation || 
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
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "แก้ไขข้อมูลหม้อแปลงไฟฟ้า" : "เพิ่มข้อมูลหม้อแปลงไฟฟ้า"}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "ทำการแก้ไขข้อมูลหม้อแปลงไฟฟ้า โปรดกรอกข้อมูลให้ครบถ้วน"
              : "กรอกข้อมูลหม้อแปลงไฟฟ้าใหม่ ข้อมูลที่มีเครื่องหมาย * จำเป็นต้องกรอก"
            }
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">ข้อมูลทั่วไป</TabsTrigger>
            <TabsTrigger value="accessories">Accessories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              {/* First column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="equipmentNo">Equipment No. *</Label>
                  <Input 
                    id="equipmentNo" 
                    placeholder="กรอกหมายเลขอุปกรณ์" 
                    value={equipmentNo}
                    onChange={(e) => setEquipmentNo(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manufacturer">สัญญาเลขที่ *</Label>
                  <Input 
                    id="manufacturer" 
                    placeholder="กรอกเลขที่สัญญา" 
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transformerType">สถานีไฟฟ้า *</Label>
                  <Select value={transformerType} onValueChange={setTransformerType}>
                    <SelectTrigger className="w-full border border-gray-300">
                      <SelectValue placeholder="เลือกสถานีไฟฟ้า" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="power">เลือกสถานีไฟฟ้า</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">ชื่อหม้อแปลงไฟฟ้า *</Label>
                  <Input 
                    id="location" 
                    placeholder="กรอกชื่อหม้อแปลงไฟฟ้า" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ratedCapacity">พิกัดกำลัง (MVA) *</Label>
                  <Select value={ratedCapacity} onValueChange={setRatedCapacity}>
                    <SelectTrigger className="w-full border border-gray-300">
                      <SelectValue placeholder="กรอกพิกัดกำลังสูงสุด" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50">50 MVA</SelectItem>
                      <SelectItem value="100">100 MVA</SelectItem>
                      <SelectItem value="150">150 MVA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primaryVoltage">พิกัดแรงดันไฟฟ้า Primary, HV (kV) *</Label>
                  <Select value={primaryVoltage} onValueChange={setPrimaryVoltage}>
                    <SelectTrigger className="w-full border border-gray-300">
                      <SelectValue placeholder="กรอกพิกัดแรงดันไฟฟ้า Primary" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="115">115 kV</SelectItem>
                      <SelectItem value="230">230 kV</SelectItem>
                      <SelectItem value="500">500 kV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryVoltage">พิกัดแรงดันไฟฟ้า Secondary, LV (kV) *</Label>
                  <Select value={secondaryVoltage} onValueChange={setSecondaryVoltage}>
                    <SelectTrigger className="w-full border border-gray-300">
                      <SelectValue placeholder="กรอกพิกัดแรงดันไฟฟ้า Secondary" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="22">22 kV</SelectItem>
                      <SelectItem value="33">33 kV</SelectItem>
                      <SelectItem value="69">69 kV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tertiaryVoltage">พิกัดแรงดันไฟฟ้า Tertiary, TV (kV)</Label>
                  <Select value={tertiaryVoltage} onValueChange={setTertiaryVoltage}>
                    <SelectTrigger className="w-full border border-gray-300">
                      <SelectValue placeholder="กรอกพิกัดแรงดันไฟฟ้า Tertiary" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="13.8">13.8 kV</SelectItem>
                      <SelectItem value="22">22 kV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manufactureYear">วันที่นำเข้าใช้งาน *</Label>
                  <Input 
                    id="manufactureYear" 
                    placeholder="12/06/2025" 
                    type="text" 
                    value={manufactureYear}
                    onChange={(e) => setManufactureYear(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Second column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phaseCount">ชนิด Winding Insulation *</Label>
                  <Select value={windingInsulation} onValueChange={setWindingInsulation}>
                    <SelectTrigger className="w-full border border-gray-300">
                      <SelectValue placeholder="Paper" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paper">Paper</SelectItem>
                      <SelectItem value="oil">Oil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vectorGroup">Vector Group *</Label>
                  <Select value={vectorGroup} onValueChange={setVectorGroup}>
                    <SelectTrigger className="w-full border border-gray-300">
                      <SelectValue placeholder="กรอก Vector Group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ynd1">Ynd1</SelectItem>
                      <SelectItem value="dyn11">Dyn11</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phaseCount">จำนวนเฟส *</Label>
                  <Select value={phaseCount} onValueChange={setPhaseCount}>
                    <SelectTrigger className="w-full border border-gray-300">
                      <SelectValue placeholder="3" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deviceNo">คำแหน่งเฟส *</Label>
                  <Input 
                    id="deviceNo" 
                    placeholder="กรอกคำแหน่งเฟส" 
                    value={deviceNo}
                    onChange={(e) => setDeviceNo(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remark">ลักษณะการใช้งานหม้อแปลงไฟฟ้า</Label>
                  <Input 
                    id="remark" 
                    placeholder="กรอกลักษณะการใช้งาน" 
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">ชื่อไฟล์รูปภาพที่ต้องการเก็บ</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Button variant="outline" className="w-full">
                      Choose File
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">no file selected</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remarkDetails">รายละเอียดเพิ่มเติม (Remark)</Label>
                  <Textarea 
                    id="remarkDetails" 
                    placeholder="กรอกรายละเอียดเพิ่มเติม" 
                    rows={3} 
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="accessories" className="space-y-4">
            <div className="space-y-8 py-4">
              {/* Bushing Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Bushing</h3>
                
                {/* HV Section */}
                <div className="space-y-4">
                  <h4 className="font-medium">HV</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Manufacturer</Label>
                      <Input 
                        placeholder="กรอกชื่อผู้ผลิต" 
                        value={bushingHvManufacturer}
                        onChange={(e) => setBushingHvManufacturer(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Input 
                        placeholder="กรอกประเภท" 
                        value={bushingHvType}
                        onChange={(e) => setBushingHvType(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ปี่น Nameplate</Label>
                      <Input 
                        placeholder="กรอกปี่น" 
                        value={bushingHvNameplate}
                        onChange={(e) => setBushingHvNameplate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Serial No. H0</Label>
                      <Input 
                        placeholder="กรอก Serial No." 
                        value={bushingHvSerialH0}
                        onChange={(e) => setBushingHvSerialH0(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Serial No. H1</Label>
                      <Input 
                        placeholder="กรอก Serial No." 
                        value={bushingHvSerialH1}
                        onChange={(e) => setBushingHvSerialH1(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Serial No. H2</Label>
                      <Input 
                        placeholder="กรอก Serial No." 
                        value={bushingHvSerialH2}
                        onChange={(e) => setBushingHvSerialH2(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* LV Section */}
                <div className="space-y-4">
                  <h4 className="font-medium">LV</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Manufacturer</Label>
                      <Input 
                        placeholder="กรอกชื่อผู้ผลิต" 
                        value={bushingLvManufacturer}
                        onChange={(e) => setBushingLvManufacturer(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Input 
                        placeholder="กรอกประเภท" 
                        value={bushingLvType}
                        onChange={(e) => setBushingLvType(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ปี่น Nameplate</Label>
                      <Input 
                        placeholder="กรอกปี่น" 
                        value={bushingLvNameplate}
                        onChange={(e) => setBushingLvNameplate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Serial No. X0</Label>
                      <Input 
                        placeholder="กรอก Serial No." 
                        value={bushingLvSerialX0}
                        onChange={(e) => setBushingLvSerialX0(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Serial No. X1</Label>
                      <Input 
                        placeholder="กรอก Serial No." 
                        value={bushingLvSerialX1}
                        onChange={(e) => setBushingLvSerialX1(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Serial No. X2</Label>
                      <Input 
                        placeholder="กรอก Serial No." 
                        value={bushingLvSerialX2}
                        onChange={(e) => setBushingLvSerialX2(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* TV Section */}
                <div className="space-y-4">
                  <h4 className="font-medium">TV</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Manufacturer</Label>
                      <Input 
                        placeholder="กรอกชื่อผู้ผลิต" 
                        value={bushingTvManufacturer}
                        onChange={(e) => setBushingTvManufacturer(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Input 
                        placeholder="กรอกประเภท" 
                        value={bushingTvType}
                        onChange={(e) => setBushingTvType(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ปี่น Nameplate</Label>
                      <Input 
                        placeholder="กรอกปี่น" 
                        value={bushingTvNameplate}
                        onChange={(e) => setBushingTvNameplate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Serial No. Y0</Label>
                      <Input 
                        placeholder="กรอก Serial No." 
                        value={bushingTvSerialY0}
                        onChange={(e) => setBushingTvSerialY0(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Serial No. Y1</Label>
                      <Input 
                        placeholder="กรอก Serial No." 
                        value={bushingTvSerialY1}
                        onChange={(e) => setBushingTvSerialY1(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Serial No. Y2</Label>
                      <Input 
                        placeholder="กรอก Serial No." 
                        value={bushingTvSerialY2}
                        onChange={(e) => setBushingTvSerialY2(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrester Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Arrester</h3>
                
                {/* HV Section */}
                <div className="space-y-4">
                  <h4 className="font-medium">HV</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Manufacturer</Label>
                      <Input 
                        placeholder="กรอกชื่อผู้ผลิต" 
                        value={arresterHvManufacturer}
                        onChange={(e) => setArresterHvManufacturer(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Input 
                        placeholder="กรอกประเภท" 
                        value={arresterHvType}
                        onChange={(e) => setArresterHvType(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ปี่น Nameplate</Label>
                      <Input 
                        placeholder="กรอกปี่น" 
                        value={arresterHvNameplate}
                        onChange={(e) => setArresterHvNameplate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Serial No. H0</Label>
                      <Input 
                        placeholder="กรอก Serial No." 
                        value={arresterHvSerialH0}
                        onChange={(e) => setArresterHvSerialH0(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Serial No. H1</Label>
                      <Input 
                        placeholder="กรอก Serial No." 
                        value={arresterHvSerialH1}
                        onChange={(e) => setArresterHvSerialH1(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Serial No. H2</Label>
                      <Input 
                        placeholder="กรอก Serial No." 
                        value={arresterHvSerialH2}
                        onChange={(e) => setArresterHvSerialH2(e.target.value)}
                      />
                    </div>
                  </div>
                  <RadioGroup value={arresterHvGap} onValueChange={setArresterHvGap} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gap" id="hv-gap" />
                      <Label htmlFor="hv-gap">Gap</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gapless" id="hv-gapless" />
                      <Label htmlFor="hv-gapless">Gapless</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* LV Section */}
                <div className="space-y-4">
                  <h4 className="font-medium">LV</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Manufacturer</Label>
                      <Input 
                        placeholder="กรอกชื่อผู้ผลิต" 
                        value={arresterLvManufacturer}
                        onChange={(e) => setArresterLvManufacturer(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Input 
                        placeholder="กรอกประเภท" 
                        value={arresterLvType}
                        onChange={(e) => setArresterLvType(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ปี่น Nameplate</Label>
                      <Input 
                        placeholder="กรอกปี่น" 
                        value={arresterLvNameplate}
                        onChange={(e) => setArresterLvNameplate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Serial No. X0</Label>
                      <Input 
                        placeholder="กรอก Serial No." 
                        value={arresterLvSerialX0}
                        onChange={(e) => setArresterLvSerialX0(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Serial No. X1</Label>
                      <Input 
                        placeholder="กรอก Serial No." 
                        value={arresterLvSerialX1}
                        onChange={(e) => setArresterLvSerialX1(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Serial No. X2</Label>
                      <Input 
                        placeholder="กรอก Serial No." 
                        value={arresterLvSerialX2}
                        onChange={(e) => setArresterLvSerialX2(e.target.value)}
                      />
                    </div>
                  </div>
                  <RadioGroup value={arresterLvGap} onValueChange={setArresterLvGap} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gap" id="lv-gap" />
                      <Label htmlFor="lv-gap">Gap</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gapless" id="lv-gapless" />
                      <Label htmlFor="lv-gapless">Gapless</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* TV Section */}
                <div className="space-y-4">
                  <h4 className="font-medium">TV</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Manufacturer</Label>
                      <Input 
                        placeholder="กรอกชื่อผู้ผลิต" 
                        value={arresterTvManufacturer}
                        onChange={(e) => setArresterTvManufacturer(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Input 
                        placeholder="กรอกประเภท" 
                        value={arresterTvType}
                        onChange={(e) => setArresterTvType(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ปี่น Nameplate</Label>
                      <Input 
                        placeholder="กรอกปี่น" 
                        value={arresterTvNameplate}
                        onChange={(e) => setArresterTvNameplate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Serial No. Y0</Label>
                      <Input 
                        placeholder="กรอก Serial No." 
                        value={arresterTvSerialY0}
                        onChange={(e) => setArresterTvSerialY0(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Serial No. Y1</Label>
                      <Input 
                        placeholder="กรอก Serial No." 
                        value={arresterTvSerialY1}
                        onChange={(e) => setArresterTvSerialY1(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Serial No. Y2</Label>
                      <Input 
                        placeholder="กรอก Serial No." 
                        value={arresterTvSerialY2}
                        onChange={(e) => setArresterTvSerialY2(e.target.value)}
                      />
                    </div>
                  </div>
                  <RadioGroup value={arresterTvGap} onValueChange={setArresterTvGap} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gap" id="tv-gap" />
                      <Label htmlFor="tv-gap">Gap</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gapless" id="tv-gapless" />
                      <Label htmlFor="tv-gapless">Gapless</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* OLTC Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">OLTC</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Manufacturer</Label>
                    <Input 
                      placeholder="กรอกชื่อผู้ผลิต" 
                      value={oltcManufacturer}
                      onChange={(e) => setOltcManufacturer(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Input 
                      placeholder="กรอกประเภท" 
                      value={oltcType}
                      onChange={(e) => setOltcType(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>ปี่น Nameplate</Label>
                    <Input 
                      placeholder="กรอกปี่น" 
                      value={oltcNameplate}
                      onChange={(e) => setOltcNameplate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Serial No. H0</Label>
                    <Input 
                      placeholder="กรอก Serial No." 
                      value={oltcSerialH0}
                      onChange={(e) => setOltcSerialH0(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Serial No. H1</Label>
                    <Input 
                      placeholder="กรอก Serial No." 
                      value={oltcSerialH1}
                      onChange={(e) => setOltcSerialH1(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Serial No. H2</Label>
                    <Input 
                      placeholder="กรอก Serial No." 
                      value={oltcSerialH2}
                      onChange={(e) => setOltcSerialH2(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-end space-x-2 border-t pt-4 mt-2">
          <Button variant="outline" onClick={onClose}>
            ยกเลิก
          </Button>
          <Button type="button" onClick={handleSubmit} className="bg-[#1E5CFF] hover:bg-[#1E5CFF]/90">
            {isEditing ? "บันทึกการแก้ไข" : "เพิ่มข้อมูลหม้อแปลงไฟฟ้า"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransformerModal;
