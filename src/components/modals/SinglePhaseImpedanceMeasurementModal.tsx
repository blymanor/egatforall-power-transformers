
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

interface SinglePhaseImpedanceMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'view' | 'edit';
  data?: any;
}

const SinglePhaseImpedanceMeasurementModal = ({ isOpen, onClose, mode, data }: SinglePhaseImpedanceMeasurementModalProps) => {
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
    // HV-LV Impedance
    hvLvVoltage: data?.hvLvVoltage || '0.0',
    hvLvCurrent: data?.hvLvCurrent || '0.0',
    hvLvPower: data?.hvLvPower || '0.0',
    hvLvImpedance: data?.hvLvImpedance || '0.0',
    hvLvDeviation: data?.hvLvDeviation || '0.0',
    // HV-TV Impedance
    hvTvVoltage: data?.hvTvVoltage || '0.0',
    hvTvCurrent: data?.hvTvCurrent || '0.0',
    hvTvPower: data?.hvTvPower || '0.0',
    hvTvImpedance: data?.hvTvImpedance || '0.0',
    hvTvDeviation: data?.hvTvDeviation || '0.0',
    // LV-TV Impedance
    lvTvVoltage: data?.lvTvVoltage || '0.0',
    lvTvCurrent: data?.lvTvCurrent || '0.0',
    lvTvPower: data?.lvTvPower || '0.0',
    lvTvImpedance: data?.lvTvImpedance || '0.0',
    lvTvDeviation: data?.lvTvDeviation || '0.0',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = () => {
    toast.success("คำนวณเสร็จสิ้น", {
      description: "ระบบได้คำนวณค่า Single Phase Impedance แล้ว",
    });
  };

  const handleSave = () => {
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: "ข้อมูล Single Phase Impedance Measurement ถูกบันทึกแล้ว",
    });
    onClose();
  };

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            {mode === 'create' ? 'เพิ่มข้อมูล' : mode === 'edit' ? 'แก้ไขข้อมูล' : 'แสดงข้อมูล'} Single Phase Impedance Measurement
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

          {/* Single Phase Impedance Measurement Data */}
          <div className="space-y-6">
            {/* HV-LV Impedance */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">HV-LV Single Phase Impedance</h3>
              <div className="grid grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label>Voltage (V)</Label>
                  <Input
                    value={formData.hvLvVoltage}
                    onChange={(e) => handleInputChange('hvLvVoltage', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Current (A)</Label>
                  <Input
                    value={formData.hvLvCurrent}
                    onChange={(e) => handleInputChange('hvLvCurrent', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Power (W)</Label>
                  <Input
                    value={formData.hvLvPower}
                    onChange={(e) => handleInputChange('hvLvPower', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Impedance (%)</Label>
                  <Input
                    value={formData.hvLvImpedance}
                    onChange={(e) => handleInputChange('hvLvImpedance', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Deviation (%)</Label>
                  <Input
                    value={formData.hvLvDeviation}
                    onChange={(e) => handleInputChange('hvLvDeviation', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
            </div>

            {/* HV-TV Impedance */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">HV-TV Single Phase Impedance</h3>
              <div className="grid grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label>Voltage (V)</Label>
                  <Input
                    value={formData.hvTvVoltage}
                    onChange={(e) => handleInputChange('hvTvVoltage', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Current (A)</Label>
                  <Input
                    value={formData.hvTvCurrent}
                    onChange={(e) => handleInputChange('hvTvCurrent', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Power (W)</Label>
                  <Input
                    value={formData.hvTvPower}
                    onChange={(e) => handleInputChange('hvTvPower', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Impedance (%)</Label>
                  <Input
                    value={formData.hvTvImpedance}
                    onChange={(e) => handleInputChange('hvTvImpedance', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Deviation (%)</Label>
                  <Input
                    value={formData.hvTvDeviation}
                    onChange={(e) => handleInputChange('hvTvDeviation', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
            </div>

            {/* LV-TV Impedance */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">LV-TV Single Phase Impedance</h3>
              <div className="grid grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label>Voltage (V)</Label>
                  <Input
                    value={formData.lvTvVoltage}
                    onChange={(e) => handleInputChange('lvTvVoltage', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Current (A)</Label>
                  <Input
                    value={formData.lvTvCurrent}
                    onChange={(e) => handleInputChange('lvTvCurrent', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Power (W)</Label>
                  <Input
                    value={formData.lvTvPower}
                    onChange={(e) => handleInputChange('lvTvPower', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Impedance (%)</Label>
                  <Input
                    value={formData.lvTvImpedance}
                    onChange={(e) => handleInputChange('lvTvImpedance', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Deviation (%)</Label>
                  <Input
                    value={formData.lvTvDeviation}
                    onChange={(e) => handleInputChange('lvTvDeviation', e.target.value)}
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

export default SinglePhaseImpedanceMeasurementModal;
