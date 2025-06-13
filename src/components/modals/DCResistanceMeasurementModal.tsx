
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

interface DCResistanceMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'view' | 'edit';
  data?: any;
}

const DCResistanceMeasurementModal = ({ isOpen, onClose, mode, data }: DCResistanceMeasurementModalProps) => {
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
    // HV WINDING DC Resistance
    hvPhaseA: data?.hvPhaseA || '0.0',
    hvPhaseB: data?.hvPhaseB || '0.0',
    hvPhaseC: data?.hvPhaseC || '0.0',
    hvAverage: data?.hvAverage || '0.0',
    hvMaxError: data?.hvMaxError || '0.0',
    hvDeviation: data?.hvDeviation || '0.0',
    // LV WINDING DC Resistance
    lvPhaseA: data?.lvPhaseA || '0.0',
    lvPhaseB: data?.lvPhaseB || '0.0',
    lvPhaseC: data?.lvPhaseC || '0.0',
    lvAverage: data?.lvAverage || '0.0',
    lvMaxError: data?.lvMaxError || '0.0',
    lvDeviation: data?.lvDeviation || '0.0',
    // TV WINDING DC Resistance
    tvPhaseA: data?.tvPhaseA || '0.0',
    tvPhaseB: data?.tvPhaseB || '0.0',
    tvPhaseC: data?.tvPhaseC || '0.0',
    tvAverage: data?.tvAverage || '0.0',
    tvMaxError: data?.tvMaxError || '0.0',
    tvDeviation: data?.tvDeviation || '0.0',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = () => {
    toast.success("คำนวณเสร็จสิ้น", {
      description: "ระบบได้คำนวณค่า DC Resistance แล้ว",
    });
  };

  const handleSave = () => {
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: "ข้อมูล DC Resistance Measurement ถูกบันทึกแล้ว",
    });
    onClose();
  };

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            {mode === 'create' ? 'เพิ่มข้อมูล' : mode === 'edit' ? 'แก้ไขข้อมูล' : 'แสดงข้อมูล'} DC Resistance Measurement
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

          {/* DC Resistance Measurement Data */}
          <div className="space-y-6">
            {/* HV WINDING */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">HV WINDING DC Resistance (Ω)</h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="space-y-2">
                  <Label>Phase A</Label>
                  <Input
                    value={formData.hvPhaseA}
                    onChange={(e) => handleInputChange('hvPhaseA', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phase B</Label>
                  <Input
                    value={formData.hvPhaseB}
                    onChange={(e) => handleInputChange('hvPhaseB', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phase C</Label>
                  <Input
                    value={formData.hvPhaseC}
                    onChange={(e) => handleInputChange('hvPhaseC', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Average</Label>
                  <Input
                    value={formData.hvAverage}
                    onChange={(e) => handleInputChange('hvAverage', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Error (%)</Label>
                  <Input
                    value={formData.hvMaxError}
                    onChange={(e) => handleInputChange('hvMaxError', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Deviation (%)</Label>
                  <Input
                    value={formData.hvDeviation}
                    onChange={(e) => handleInputChange('hvDeviation', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
            </div>

            {/* LV WINDING */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">LV WINDING DC Resistance (Ω)</h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="space-y-2">
                  <Label>Phase A</Label>
                  <Input
                    value={formData.lvPhaseA}
                    onChange={(e) => handleInputChange('lvPhaseA', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phase B</Label>
                  <Input
                    value={formData.lvPhaseB}
                    onChange={(e) => handleInputChange('lvPhaseB', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phase C</Label>
                  <Input
                    value={formData.lvPhaseC}
                    onChange={(e) => handleInputChange('lvPhaseC', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Average</Label>
                  <Input
                    value={formData.lvAverage}
                    onChange={(e) => handleInputChange('lvAverage', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Error (%)</Label>
                  <Input
                    value={formData.lvMaxError}
                    onChange={(e) => handleInputChange('lvMaxError', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Deviation (%)</Label>
                  <Input
                    value={formData.lvDeviation}
                    onChange={(e) => handleInputChange('lvDeviation', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
            </div>

            {/* TV WINDING */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">TV WINDING DC Resistance (Ω)</h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="space-y-2">
                  <Label>Phase A</Label>
                  <Input
                    value={formData.tvPhaseA}
                    onChange={(e) => handleInputChange('tvPhaseA', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phase B</Label>
                  <Input
                    value={formData.tvPhaseB}
                    onChange={(e) => handleInputChange('tvPhaseB', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phase C</Label>
                  <Input
                    value={formData.tvPhaseC}
                    onChange={(e) => handleInputChange('tvPhaseC', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Average</Label>
                  <Input
                    value={formData.tvAverage}
                    onChange={(e) => handleInputChange('tvAverage', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Error (%)</Label>
                  <Input
                    value={formData.tvMaxError}
                    onChange={(e) => handleInputChange('tvMaxError', e.target.value)}
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Deviation (%)</Label>
                  <Input
                    value={formData.tvDeviation}
                    onChange={(e) => handleInputChange('tvDeviation', e.target.value)}
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

export default DCResistanceMeasurementModal;
