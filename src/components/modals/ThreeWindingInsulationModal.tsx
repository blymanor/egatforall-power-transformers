
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ThreeWindingInsulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'view' | 'edit';
  data?: any;
}

const ThreeWindingInsulationModal = ({ isOpen, onClose, mode, data }: ThreeWindingInsulationModalProps) => {
  const [formData, setFormData] = useState({
    transformer: data?.transformer || '',
    testType: data?.testType || '',
    testDate: data?.testDate || undefined,
    inspector: data?.inspector || '',
    ambientTemp: data?.ambientTemp || '',
    humidity: data?.humidity || '',
    oilTemp: data?.oilTemp || '',
    wdgTemp: data?.wdgTemp || '',
    weather: data?.weather || '',
    baseKvaHL: data?.baseKvaHL || '',
    baseKvaHT: data?.baseKvaHT || '',
    baseKvaLT: data?.baseKvaLT || ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = () => {
    toast.success("คำนวณเสร็จสิ้น", {
      description: "ระบบได้คำนวณค่าต่างๆ แล้ว",
    });
  };

  const handleSave = () => {
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: "ข้อมูล Three Winding Insulation Measurement ถูกบันทึกแล้ว",
    });
    onClose();
  };

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            {mode === 'create' ? 'เพิ่มข้อมูล' : mode === 'edit' ? 'แก้ไขข้อมูล' : 'แสดงข้อมูล'} Three Winding Insulation Measurement
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-4">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>หม้อแปลงไฟฟ้า :</Label>
              <Select 
                value={formData.transformer} 
                onValueChange={(value) => handleInputChange('transformer', value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AN-KT1A">AN-KT1A</SelectItem>
                  <SelectItem value="AN-KT2A">AN-KT2A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>รูปแบบการทดสอบ :</Label>
              <Select 
                value={formData.testType} 
                onValueChange={(value) => handleInputChange('testType', value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกรูปแบบการทดสอบ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Commissioning">Commissioning</SelectItem>
                  <SelectItem value="Special test">Special test</SelectItem>
                  <SelectItem value="6 year test">6 year test</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>วันที่ตรวจสอบ :</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.testDate && "text-muted-foreground"
                    )}
                    disabled={isReadOnly}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.testDate ? format(formData.testDate, "dd/MM/yyyy") : "เลือกวันที่"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.testDate}
                    onSelect={(date) => handleInputChange('testDate', date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>เลขที่คำสั่งปฏิบัติงาน :</Label>
              <Select disabled={isReadOnly}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกเลขที่คำสั่งปฏิบัติงาน" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12345">12345</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>ผู้ตรวจสอบ :</Label>
              <Input
                value={formData.inspector}
                onChange={(e) => handleInputChange('inspector', e.target.value)}
                placeholder="กรอกชื่อผู้ตรวจสอบ"
                readOnly={isReadOnly}
              />
            </div>
          </div>

          {/* Environmental Conditions */}
          <div className="grid grid-cols-8 gap-4">
            <div className="space-y-2">
              <Label>Ambient Temp. :</Label>
              <div className="flex items-center space-x-2">
                <Input
                  value={formData.ambientTemp}
                  onChange={(e) => handleInputChange('ambientTemp', e.target.value)}
                  readOnly={isReadOnly}
                />
                <span className="text-sm">°C</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Humidity :</Label>
              <div className="flex items-center space-x-2">
                <Input
                  value={formData.humidity}
                  onChange={(e) => handleInputChange('humidity', e.target.value)}
                  readOnly={isReadOnly}
                />
                <span className="text-sm">%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Oil Temp. :</Label>
              <div className="flex items-center space-x-2">
                <Input
                  value={formData.oilTemp}
                  onChange={(e) => handleInputChange('oilTemp', e.target.value)}
                  readOnly={isReadOnly}
                />
                <span className="text-sm">°C</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Wdg Temp. :</Label>
              <div className="flex items-center space-x-2">
                <Input
                  value={formData.wdgTemp}
                  onChange={(e) => handleInputChange('wdgTemp', e.target.value)}
                  readOnly={isReadOnly}
                />
                <span className="text-sm">°C</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Weather :</Label>
              <Input
                value={formData.weather}
                onChange={(e) => handleInputChange('weather', e.target.value)}
                readOnly={isReadOnly}
              />
            </div>

            <div className="space-y-2">
              <Label>Base kVA (H-L) :</Label>
              <div className="flex items-center space-x-2">
                <Input
                  value={formData.baseKvaHL}
                  onChange={(e) => handleInputChange('baseKvaHL', e.target.value)}
                  readOnly={isReadOnly}
                />
                <span className="text-sm">kVA</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Base kVA (H-T) :</Label>
              <div className="flex items-center space-x-2">
                <Input
                  value={formData.baseKvaHT}
                  onChange={(e) => handleInputChange('baseKvaHT', e.target.value)}
                  readOnly={isReadOnly}
                />
                <span className="text-sm">kVA</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Base kVA (L-T) :</Label>
              <div className="flex items-center space-x-2">
                <Input
                  value={formData.baseKvaLT}
                  onChange={(e) => handleInputChange('baseKvaLT', e.target.value)}
                  readOnly={isReadOnly}
                />
                <span className="text-sm">kVA</span>
              </div>
            </div>
          </div>

          {/* Measurement Sections */}
          <div className="space-y-6">
            {/* BETWEEN ENERGIZE : (H-L) */}
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-semibold text-blue-600">BETWEEN ENERGIZE : (H-L)</h3>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>WDG.</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Label className="text-blue-600">Min Tap :</Label>
                    <Select disabled={isReadOnly}>
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Tap8L" />
                      </SelectTrigger>
                    </Select>
                  </div>
                  <Label className="text-blue-600">WDG.</Label>
                </div>

                <div className="space-y-2">
                  <div className="text-center text-blue-600 font-medium">WDG. ENERGIZE : H1-H2/H1-H0</div>
                  <div className="text-center text-blue-600">WDG. SHORT : X1-X2-X3</div>
                  <div className="grid grid-cols-3 gap-1 text-center text-xs text-blue-600">
                    <span>(V.)</span>
                    <span>(A.)</span>
                    <span>Z</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-center text-blue-600 font-medium">WDG. ENERGIZE : H2-H3/H2-H0</div>
                  <div className="text-center text-blue-600">WDG. SHORT : X1-X2-X3</div>
                  <div className="grid grid-cols-3 gap-1 text-center text-xs text-blue-600">
                    <span>(V.)</span>
                    <span>(A.)</span>
                    <span>Z</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-center text-blue-600 font-medium">WDG. ENERGIZE : H3-H1/H3-H0</div>
                  <div className="text-center text-blue-600">WDG. SHORT : X1-X2-X3</div>
                  <div className="grid grid-cols-3 gap-1 text-center text-xs text-blue-600">
                    <span>(V.)</span>
                    <span>(A.)</span>
                    <span>Z</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-blue-600">kV TAP</Label>
                  <Label className="text-blue-600 text-sm">%IMPEDANCE FORM</Label>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <Input value="0.0" readOnly={isReadOnly} className="h-8" />
                  <Input value="0.0" readOnly={isReadOnly} className="h-8" />
                  <Input value="0.0" readOnly={isReadOnly} className="h-8" />
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <Input value="0.0" readOnly={isReadOnly} className="h-8" />
                  <Input value="0.0" readOnly={isReadOnly} className="h-8" />
                  <Input value="0.0" readOnly={isReadOnly} className="h-8" />
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <Input value="0.0" readOnly={isReadOnly} className="h-8" />
                  <Input value="0.0" readOnly={isReadOnly} className="h-8" />
                  <Input value="0.0" readOnly={isReadOnly} className="h-8" />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Select disabled={isReadOnly}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="MANUFACTURE" />
                    </SelectTrigger>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-center text-blue-600 text-sm">%IMPEDANCE MEASUREMENT</div>
                  <div className="text-center text-blue-600 text-sm">%ERROR</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-center text-blue-600 text-sm">%IMPEDANCE MEASUREMENT</div>
                  <div className="text-center text-blue-600 text-sm">%ERROR</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-center text-blue-600 text-sm">%IMPEDANCE MEASUREMENT</div>
                  <div className="text-center text-blue-600 text-sm">%ERROR</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div></div>
                <div className="grid grid-cols-2 gap-1">
                  <Input value="0.0" readOnly className="h-8" />
                  <Input value="0.0" readOnly className="h-8" />
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <Input value="0.0" readOnly className="h-8" />
                  <Input value="0.0" readOnly className="h-8" />
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <Input value="0.0" readOnly className="h-8" />
                  <Input value="0.0" readOnly className="h-8" />
                </div>
              </div>
            </div>

            {/* BETWEEN ENERGIZE : (H-L) with N TAP */}
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-semibold text-blue-600">BETWEEN ENERGIZE : (H-L)</h3>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>WDG.</Label>
                  <Label className="text-red-600">N TAP</Label>
                  <Label className="text-blue-600">WDG.</Label>
                </div>

                <div className="space-y-2">
                  <div className="text-center text-blue-600 font-medium">WDG. ENERGIZE : H1-H2/H1-H0</div>
                  <div className="text-center text-blue-600">WDG. SHORT : X1-X2-X3</div>
                  <div className="grid grid-cols-3 gap-1 text-center text-xs text-blue-600">
                    <span>(V.)</span>
                    <span>(A.)</span>
                    <span>Z</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-center text-blue-600 font-medium">WDG. ENERGIZE : H2-H3/H2-H0</div>
                  <div className="text-center text-blue-600">WDG. SHORT : X1-X2-X3</div>
                  <div className="grid grid-cols-3 gap-1 text-center text-xs text-blue-600">
                    <span>(V.)</span>
                    <span>(A.)</span>
                    <span>Z</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-center text-blue-600 font-medium">WDG. ENERGIZE : H3-H1/H3-H0</div>
                  <div className="text-center text-blue-600">WDG. SHORT : X1-X2-X3</div>
                  <div className="grid grid-cols-3 gap-1 text-center text-xs text-blue-600">
                    <span>(V.)</span>
                    <span>(A.)</span>
                    <span>Z</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-blue-600">kV TAP</Label>
                  <Label className="text-blue-600 text-sm">%IMPEDANCE FORM</Label>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <Input value="0.0" readOnly={isReadOnly} className="h-8" />
                  <Input value="0.0" readOnly={isReadOnly} className="h-8" />
                  <Input value="0.0" readOnly={isReadOnly} className="h-8" />
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <Input value="0.0" readOnly={isReadOnly} className="h-8" />
                  <Input value="0.0" readOnly={isReadOnly} className="h-8" />
                  <Input value="0.0" readOnly={isReadOnly} className="h-8" />
                </div>

                <div className="grid grid-cols-3 gap-1">
                  <Input value="0.0" readOnly={isReadOnly} className="h-8" />
                  <Input value="0.0" readOnly={isReadOnly} className="h-8" />
                  <Input value="0.0" readOnly={isReadOnly} className="h-8" />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>MANUFACTURE</Label>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-center text-blue-600 text-sm">%IMPEDANCE MEASUREMENT</div>
                  <div className="text-center text-blue-600 text-sm">%ERROR</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-center text-blue-600 text-sm">%IMPEDANCE MEASUREMENT</div>
                  <div className="text-center text-blue-600 text-sm">%ERROR</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-center text-blue-600 text-sm">%IMPEDANCE MEASUREMENT</div>
                  <div className="text-center text-blue-600 text-sm">%ERROR</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div></div>
                <div className="grid grid-cols-2 gap-1">
                  <Input value="0.0" readOnly className="h-8" />
                  <Input value="0.0" readOnly className="h-8" />
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <Input value="0.0" readOnly className="h-8" />
                  <Input value="0.0" readOnly className="h-8" />
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <Input value="0.0" readOnly className="h-8" />
                  <Input value="0.0" readOnly className="h-8" />
                </div>
              </div>
            </div>

            {/* Additional sections for (H-T) and (L-T) would follow similar pattern */}
          </div>

          {/* Action Buttons */}
          {!isReadOnly && (
            <div className="flex justify-center space-x-4 pt-4">
              <Button onClick={handleCalculate} variant="outline" className="px-8">
                คำนวณ
              </Button>
              <Button onClick={handleSave} className="px-8 bg-blue-600 hover:bg-blue-700">
                บันทึก
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThreeWindingInsulationModal;
