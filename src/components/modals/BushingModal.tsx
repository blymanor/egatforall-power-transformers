
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

interface BushingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'view' | 'edit';
  data?: any;
}

const BushingModal = ({ isOpen, onClose, mode, data }: BushingModalProps) => {
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
    // HV Bushing Test Data
    hvBushingVoltage: data?.hvBushingVoltage || '0.0',
    hvBushingCurrent: data?.hvBushingCurrent || '0.0',
    hvBushingPower: data?.hvBushingPower || '0.0',
    hvBushingPowerFactor: data?.hvBushingPowerFactor || '0.0',
    hvBushingCapacitance: data?.hvBushingCapacitance || '0.0',
    hvBushingC1: data?.hvBushingC1 || '0.0',
    hvBushingC2: data?.hvBushingC2 || '0.0',
    hvBushingTanDelta: data?.hvBushingTanDelta || '0.0',
    // LV Bushing Test Data
    lvBushingVoltage: data?.lvBushingVoltage || '0.0',
    lvBushingCurrent: data?.lvBushingCurrent || '0.0',
    lvBushingPower: data?.lvBushingPower || '0.0',
    lvBushingPowerFactor: data?.lvBushingPowerFactor || '0.0',
    lvBushingCapacitance: data?.lvBushingCapacitance || '0.0',
    lvBushingC1: data?.lvBushingC1 || '0.0',
    lvBushingC2: data?.lvBushingC2 || '0.0',
    lvBushingTanDelta: data?.lvBushingTanDelta || '0.0',
    // TV Bushing Test Data
    tvBushingVoltage: data?.tvBushingVoltage || '0.0',
    tvBushingCurrent: data?.tvBushingCurrent || '0.0',
    tvBushingPower: data?.tvBushingPower || '0.0',
    tvBushingPowerFactor: data?.tvBushingPowerFactor || '0.0',
    tvBushingCapacitance: data?.tvBushingCapacitance || '0.0',
    tvBushingC1: data?.tvBushingC1 || '0.0',
    tvBushingC2: data?.tvBushingC2 || '0.0',
    tvBushingTanDelta: data?.tvBushingTanDelta || '0.0',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = () => {
    toast.success("คำนวณเสร็จสิ้น", {
      description: "ระบบได้คำนวณค่า Bushing แล้ว",
    });
  };

  const handleSave = () => {
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: "ข้อมูล Bushing ถูกบันทึกแล้ว",
    });
    onClose();
  };

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            {mode === 'create' ? 'เพิ่มข้อมูล' : mode === 'edit' ? 'แก้ไขข้อมูล' : 'แสดงข้อมูล'} Bushing
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

          {/* Bushing Test Data */}
          <div className="space-y-6">
            {/* HV Bushing */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">HV Bushing Test</h3>
              <div className="grid grid-cols-8 gap-2">
                <div className="space-y-2">
                  <Label>Voltage (V)</Label>
                  <Input
                    value={formData.hvBushingVoltage}
                    onChange={(e) => handleInputChange('hvBushingVoltage', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Current (A)</Label>
                  <Input
                    value={formData.hvBushingCurrent}
                    onChange={(e) => handleInputChange('hvBushingCurrent', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Power (W)</Label>
                  <Input
                    value={formData.hvBushingPower}
                    onChange={(e) => handleInputChange('hvBushingPower', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Power Factor (%)</Label>
                  <Input
                    value={formData.hvBushingPowerFactor}
                    onChange={(e) => handleInputChange('hvBushingPowerFactor', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Capacitance (pF)</Label>
                  <Input
                    value={formData.hvBushingCapacitance}
                    onChange={(e) => handleInputChange('hvBushingCapacitance', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>C1 (pF)</Label>
                  <Input
                    value={formData.hvBushingC1}
                    onChange={(e) => handleInputChange('hvBushingC1', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>C2 (pF)</Label>
                  <Input
                    value={formData.hvBushingC2}
                    onChange={(e) => handleInputChange('hvBushingC2', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tan δ (%)</Label>
                  <Input
                    value={formData.hvBushingTanDelta}
                    onChange={(e) => handleInputChange('hvBushingTanDelta', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
            </div>

            {/* LV Bushing */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">LV Bushing Test</h3>
              <div className="grid grid-cols-8 gap-2">
                <div className="space-y-2">
                  <Label>Voltage (V)</Label>
                  <Input
                    value={formData.lvBushingVoltage}
                    onChange={(e) => handleInputChange('lvBushingVoltage', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Current (A)</Label>
                  <Input
                    value={formData.lvBushingCurrent}
                    onChange={(e) => handleInputChange('lvBushingCurrent', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Power (W)</Label>
                  <Input
                    value={formData.lvBushingPower}
                    onChange={(e) => handleInputChange('lvBushingPower', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Power Factor (%)</Label>
                  <Input
                    value={formData.lvBushingPowerFactor}
                    onChange={(e) => handleInputChange('lvBushingPowerFactor', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Capacitance (pF)</Label>
                  <Input
                    value={formData.lvBushingCapacitance}
                    onChange={(e) => handleInputChange('lvBushingCapacitance', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>C1 (pF)</Label>
                  <Input
                    value={formData.lvBushingC1}
                    onChange={(e) => handleInputChange('lvBushingC1', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>C2 (pF)</Label>
                  <Input
                    value={formData.lvBushingC2}
                    onChange={(e) => handleInputChange('lvBushingC2', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tan δ (%)</Label>
                  <Input
                    value={formData.lvBushingTanDelta}
                    onChange={(e) => handleInputChange('lvBushingTanDelta', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
            </div>

            {/* TV Bushing */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">TV Bushing Test</h3>
              <div className="grid grid-cols-8 gap-2">
                <div className="space-y-2">
                  <Label>Voltage (V)</Label>
                  <Input
                    value={formData.tvBushingVoltage}
                    onChange={(e) => handleInputChange('tvBushingVoltage', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Current (A)</Label>
                  <Input
                    value={formData.tvBushingCurrent}
                    onChange={(e) => handleInputChange('tvBushingCurrent', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Power (W)</Label>
                  <Input
                    value={formData.tvBushingPower}
                    onChange={(e) => handleInputChange('tvBushingPower', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Power Factor (%)</Label>
                  <Input
                    value={formData.tvBushingPowerFactor}
                    onChange={(e) => handleInputChange('tvBushingPowerFactor', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Capacitance (pF)</Label>
                  <Input
                    value={formData.tvBushingCapacitance}
                    onChange={(e) => handleInputChange('tvBushingCapacitance', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>C1 (pF)</Label>
                  <Input
                    value={formData.tvBushingC1}
                    onChange={(e) => handleInputChange('tvBushingC1', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>C2 (pF)</Label>
                  <Input
                    value={formData.tvBushingC2}
                    onChange={(e) => handleInputChange('tvBushingC2', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tan δ (%)</Label>
                  <Input
                    value={formData.tvBushingTanDelta}
                    onChange={(e) => handleInputChange('tvBushingTanDelta', e.target.value)}
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

export default BushingModal;
