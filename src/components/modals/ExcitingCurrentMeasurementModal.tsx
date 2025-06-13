
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

interface ExcitingCurrentMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'view' | 'edit';
  data?: any;
}

const ExcitingCurrentMeasurementModal = ({ isOpen, onClose, mode, data }: ExcitingCurrentMeasurementModalProps) => {
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
    // HV Winding data
    hvVoltage: data?.hvVoltage || '0.0',
    hvCurrent: data?.hvCurrent || '0.0',
    hvPower: data?.hvPower || '0.0',
    hvExcitingCurrent: data?.hvExcitingCurrent || '0.0',
    // LV Winding data
    lvVoltage: data?.lvVoltage || '0.0',
    lvCurrent: data?.lvCurrent || '0.0',
    lvPower: data?.lvPower || '0.0',
    lvExcitingCurrent: data?.lvExcitingCurrent || '0.0',
    // TV Winding data
    tvVoltage: data?.tvVoltage || '0.0',
    tvCurrent: data?.tvCurrent || '0.0',
    tvPower: data?.tvPower || '0.0',
    tvExcitingCurrent: data?.tvExcitingCurrent || '0.0',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = () => {
    toast.success("คำนวณเสร็จสิ้น", {
      description: "ระบบได้คำนวณค่า Exciting Current แล้ว",
    });
  };

  const handleSave = () => {
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: "ข้อมูล Exciting Current Measurement ถูกบันทึกแล้ว",
    });
    onClose();
  };

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            {mode === 'create' ? 'เพิ่มข้อมูล' : mode === 'edit' ? 'แก้ไขข้อมูล' : 'แสดงข้อมูล'} Exciting Current Measurement
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
              <Label>ผู้ตรวจสอบ :</Label>
              <Input
                value={formData.inspector}
                onChange={(e) => handleInputChange('inspector', e.target.value)}
                placeholder="กรอกชื่อผู้ตรวจสอบ"
                readOnly={isReadOnly}
              />
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
          </div>

          {/* Environmental Conditions */}
          <div className="grid grid-cols-5 gap-4">
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
          </div>

          {/* Measurement Data */}
          <div className="space-y-6">
            {/* HV WINDING */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">HV WINDING</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Voltage (V)</Label>
                  <Input
                    value={formData.hvVoltage}
                    onChange={(e) => handleInputChange('hvVoltage', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Current (A)</Label>
                  <Input
                    value={formData.hvCurrent}
                    onChange={(e) => handleInputChange('hvCurrent', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Power (W)</Label>
                  <Input
                    value={formData.hvPower}
                    onChange={(e) => handleInputChange('hvPower', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Exciting Current (%)</Label>
                  <Input
                    value={formData.hvExcitingCurrent}
                    onChange={(e) => handleInputChange('hvExcitingCurrent', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
            </div>

            {/* LV WINDING */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">LV WINDING</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Voltage (V)</Label>
                  <Input
                    value={formData.lvVoltage}
                    onChange={(e) => handleInputChange('lvVoltage', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Current (A)</Label>
                  <Input
                    value={formData.lvCurrent}
                    onChange={(e) => handleInputChange('lvCurrent', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Power (W)</Label>
                  <Input
                    value={formData.lvPower}
                    onChange={(e) => handleInputChange('lvPower', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Exciting Current (%)</Label>
                  <Input
                    value={formData.lvExcitingCurrent}
                    onChange={(e) => handleInputChange('lvExcitingCurrent', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
            </div>

            {/* TV WINDING */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">TV WINDING</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Voltage (V)</Label>
                  <Input
                    value={formData.tvVoltage}
                    onChange={(e) => handleInputChange('tvVoltage', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Current (A)</Label>
                  <Input
                    value={formData.tvCurrent}
                    onChange={(e) => handleInputChange('tvCurrent', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Power (W)</Label>
                  <Input
                    value={formData.tvPower}
                    onChange={(e) => handleInputChange('tvPower', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Exciting Current (%)</Label>
                  <Input
                    value={formData.tvExcitingCurrent}
                    onChange={(e) => handleInputChange('tvExcitingCurrent', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
            </div>
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

export default ExcitingCurrentMeasurementModal;
