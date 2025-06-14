
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
    transformer: mode === 'create' ? '' : (data?.transformer || ''),
    testType: mode === 'create' ? '' : (data?.testType || ''),
    testDate: mode === 'create' ? undefined : (data?.testDate || undefined),
    inspector: mode === 'create' ? '' : (data?.inspector || ''),
    ambientTemp: mode === 'create' ? '' : (data?.ambientTemp || ''),
    humidity: mode === 'create' ? '' : (data?.humidity || ''),
    oilTemp: mode === 'create' ? '' : (data?.oilTemp || ''),
    wdgTemp: mode === 'create' ? '' : (data?.wdgTemp || ''),
    weather: mode === 'create' ? '' : (data?.weather || ''),
    // HV WINDING DC Resistance
    hvMinTap: mode === 'create' ? 'Tap8L' : (data?.hvMinTap || 'Tap8L'),
    hvDCVoltageH1H0: mode === 'create' ? '0.0' : (data?.hvDCVoltageH1H0 || '0.0'),
    hvDCCurrentH1H0: mode === 'create' ? '0.0' : (data?.hvDCCurrentH1H0 || '0.0'),
    hvOhmH1H0: mode === 'create' ? '0.0' : (data?.hvOhmH1H0 || '0.0'),
    hvMaxErrorH1H0: mode === 'create' ? '0.0' : (data?.hvMaxErrorH1H0 || '0.0'),
    hvDCVoltageH2H0: mode === 'create' ? '0.0' : (data?.hvDCVoltageH2H0 || '0.0'),
    hvDCCurrentH2H0: mode === 'create' ? '0.0' : (data?.hvDCCurrentH2H0 || '0.0'),
    hvOhmH2H0: mode === 'create' ? '0.0' : (data?.hvOhmH2H0 || '0.0'),
    hvMaxErrorH2H0: mode === 'create' ? '0.0' : (data?.hvMaxErrorH2H0 || '0.0'),
    hvDCVoltageH2H3: mode === 'create' ? '0.0' : (data?.hvDCVoltageH2H3 || '0.0'),
    hvDCCurrentH2H3: mode === 'create' ? '0.0' : (data?.hvDCCurrentH2H3 || '0.0'),
    hvOhmH2H3: mode === 'create' ? '0.0' : (data?.hvOhmH2H3 || '0.0'),
    hvMaxErrorH2H3: mode === 'create' ? '0.0' : (data?.hvMaxErrorH2H3 || '0.0'),
    hvMaxErrorCMPhase: mode === 'create' ? '0.0' : (data?.hvMaxErrorCMPhase || '0.0'),
    hvMaxErrorPhase: mode === 'create' ? '0.0' : (data?.hvMaxErrorPhase || '0.0'),
    // MAX tap section
    hvMaxTap: mode === 'create' ? 'Tap1R' : (data?.hvMaxTap || 'Tap1R'),
    hvMaxDCVoltageH1H0: mode === 'create' ? '0.0' : (data?.hvMaxDCVoltageH1H0 || '0.0'),
    hvMaxDCCurrentH1H0: mode === 'create' ? '0.0' : (data?.hvMaxDCCurrentH1H0 || '0.0'),
    hvMaxOhmH1H0: mode === 'create' ? '0.0' : (data?.hvMaxOhmH1H0 || '0.0'),
    hvMaxMaxErrorH1H0: mode === 'create' ? '0.0' : (data?.hvMaxMaxErrorH1H0 || '0.0'),
    hvMaxDCVoltageH2H0: mode === 'create' ? '0.0' : (data?.hvMaxDCVoltageH2H0 || '0.0'),
    hvMaxDCCurrentH2H0: mode === 'create' ? '0.0' : (data?.hvMaxDCCurrentH2H0 || '0.0'),
    hvMaxOhmH2H0: mode === 'create' ? '0.0' : (data?.hvMaxOhmH2H0 || '0.0'),
    hvMaxMaxErrorH2H0: mode === 'create' ? '0.0' : (data?.hvMaxMaxErrorH2H0 || '0.0'),
    hvMaxDCVoltageH2H3: mode === 'create' ? '0.0' : (data?.hvMaxDCVoltageH2H3 || '0.0'),
    hvMaxDCCurrentH2H3: mode === 'create' ? '0.0' : (data?.hvMaxDCCurrentH2H3 || '0.0'),
    hvMaxOhmH2H3: mode === 'create' ? '0.0' : (data?.hvMaxOhmH2H3 || '0.0'),
    hvMaxMaxErrorH2H3: mode === 'create' ? '0.0' : (data?.hvMaxMaxErrorH2H3 || '0.0'),
    hvMaxMaxErrorCMPhase: mode === 'create' ? '0.0' : (data?.hvMaxMaxErrorCMPhase || '0.0'),
    hvMaxMaxErrorPhase: mode === 'create' ? '0.0' : (data?.hvMaxMaxErrorPhase || '0.0'),
    // LV WINDING DC Resistance
    lvNTapH1H0: mode === 'create' ? '0.0' : (data?.lvNTapH1H0 || '0.0'),
    lvNTapH2H0: mode === 'create' ? '0.0' : (data?.lvNTapH2H0 || '0.0'),
    lvNTapH2H3: mode === 'create' ? '0.0' : (data?.lvNTapH2H3 || '0.0'),
    lvNTapMaxErrorCMPhase: mode === 'create' ? '0.0' : (data?.lvNTapMaxErrorCMPhase || '0.0'),
    lvNTapMaxErrorPhase: mode === 'create' ? '0.0' : (data?.lvNTapMaxErrorPhase || '0.0'),
    // TV WINDING DC Resistance
    tvNTapH1H0: mode === 'create' ? '0.0' : (data?.tvNTapH1H0 || '0.0'),
    tvNTapH2H0: mode === 'create' ? '0.0' : (data?.tvNTapH2H0 || '0.0'),
    tvNTapH2H3: mode === 'create' ? '0.0' : (data?.tvNTapH2H3 || '0.0'),
    tvNTapMaxErrorCMPhase: mode === 'create' ? '0.0' : (data?.tvNTapMaxErrorCMPhase || '0.0'),
    tvNTapMaxErrorPhase: mode === 'create' ? '0.0' : (data?.tvNTapMaxErrorPhase || '0.0'),
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
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
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

          {/* HV WINDING Section */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">HV...WDG.</h3>
            
            {/* Headers */}
            <div className="grid grid-cols-8 gap-2 mb-4 text-center text-sm">
              <div className="text-blue-600 font-semibold">...TAP</div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : H1H0/H1H2</div>
                <div className="grid grid-cols-3 gap-1 mt-1">
                  <div>DC (V.)</div>
                  <div>DC (A.)</div>
                  <div>OHM</div>
                </div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>%MAXIMUM ERROR BETWEEN CM&PHASE</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : H1H0/H1H2</div>
                <div className="grid grid-cols-3 gap-1 mt-1">
                  <div>DC (V.)</div>
                  <div>DC (A.)</div>
                  <div>OHM</div>
                </div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>%MAXIMUM ERROR BETWEEN CM&PHASE</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : H1H0/H1H2</div>
                <div className="grid grid-cols-3 gap-1 mt-1">
                  <div>DC (V.)</div>
                  <div>DC (A.)</div>
                  <div>OHM</div>
                </div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>%MAXIMUM ERROR BETWEEN CM&PHASE</div>
              </div>
              <div className="text-blue-600 font-semibold">REMARK</div>
            </div>

            {/* MIN row */}
            <div className="grid grid-cols-8 gap-2 mb-2 items-center text-sm">
              <div className="text-blue-600 font-semibold">
                <div>MIN</div>
                <Select 
                  value={formData.hvMinTap} 
                  onValueChange={(value) => handleInputChange('hvMinTap', value)}
                  disabled={isReadOnly}
                >
                  <SelectTrigger className="w-full text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tap8L">Tap8L</SelectItem>
                    <SelectItem value="Tap1R">Tap1R</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <Input
                  value={formData.hvDCVoltageH1H0}
                  onChange={(e) => handleInputChange('hvDCVoltageH1H0', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
                <Input
                  value={formData.hvDCCurrentH1H0}
                  onChange={(e) => handleInputChange('hvDCCurrentH1H0', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
                <Input
                  value={formData.hvOhmH1H0}
                  onChange={(e) => handleInputChange('hvOhmH1H0', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
              </div>
              <Input
                value={formData.hvMaxErrorH1H0}
                onChange={(e) => handleInputChange('hvMaxErrorH1H0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center text-xs"
              />
              <div className="grid grid-cols-3 gap-1">
                <Input
                  value={formData.hvDCVoltageH2H0}
                  onChange={(e) => handleInputChange('hvDCVoltageH2H0', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
                <Input
                  value={formData.hvDCCurrentH2H0}
                  onChange={(e) => handleInputChange('hvDCCurrentH2H0', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
                <Input
                  value={formData.hvOhmH2H0}
                  onChange={(e) => handleInputChange('hvOhmH2H0', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
              </div>
              <Input
                value={formData.hvMaxErrorH2H0}
                onChange={(e) => handleInputChange('hvMaxErrorH2H0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center text-xs"
              />
              <div className="grid grid-cols-3 gap-1">
                <Input
                  value={formData.hvDCVoltageH2H3}
                  onChange={(e) => handleInputChange('hvDCVoltageH2H3', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
                <Input
                  value={formData.hvDCCurrentH2H3}
                  onChange={(e) => handleInputChange('hvDCCurrentH2H3', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
                <Input
                  value={formData.hvOhmH2H3}
                  onChange={(e) => handleInputChange('hvOhmH2H3', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-1">
                <Input
                  value={formData.hvMaxErrorCMPhase}
                  onChange={(e) => handleInputChange('hvMaxErrorCMPhase', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
                <Input
                  value={formData.hvMaxErrorPhase}
                  onChange={(e) => handleInputChange('hvMaxErrorPhase', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
              </div>
              <div></div>
            </div>

            {/* N row */}
            <div className="grid grid-cols-8 gap-2 mb-2 items-center text-sm">
              <div className="text-red-600 font-semibold">N</div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-center text-xs">0.0</div>
                <div className="text-center text-xs">0.0</div>
                <div className="text-center text-xs"></div>
              </div>
              <div className="text-center text-xs">0.0</div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-center text-xs">0.0</div>
                <div className="text-center text-xs"></div>
                <div className="text-center text-xs">0.0</div>
              </div>
              <div className="text-center text-xs">0.0</div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-center text-xs">0.0</div>
                <div className="text-center text-xs">0.0</div>
                <div className="text-center text-xs">0.0</div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center text-xs">0.0</div>
                <div className="text-center text-xs">0.0</div>
              </div>
              <div></div>
            </div>

            {/* 2R row */}
            <div className="grid grid-cols-8 gap-2 mb-2 items-center text-sm">
              <div className="text-blue-600 font-semibold">2R</div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-center text-xs">0.0</div>
                <div className="text-center text-xs">0.0</div>
                <div className="text-center text-xs"></div>
              </div>
              <div className="text-center text-xs">0.0</div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-center text-xs">0.0</div>
                <div className="text-center text-xs"></div>
                <div className="text-center text-xs">0.0</div>
              </div>
              <div className="text-center text-xs">0.0</div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-center text-xs">0.0</div>
                <div className="text-center text-xs">0.0</div>
                <div className="text-center text-xs">0.0</div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center text-xs">0.0</div>
                <div className="text-center text-xs">0.0</div>
              </div>
              <div></div>
            </div>

            {/* MAX row */}
            <div className="grid grid-cols-8 gap-2 mb-4 items-center text-sm">
              <div className="text-blue-600 font-semibold">
                <div>MAX</div>
                <Select 
                  value={formData.hvMaxTap} 
                  onValueChange={(value) => handleInputChange('hvMaxTap', value)}
                  disabled={isReadOnly}
                >
                  <SelectTrigger className="w-full text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tap1R">Tap1R</SelectItem>
                    <SelectItem value="Tap8L">Tap8L</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <Input
                  value={formData.hvMaxDCVoltageH1H0}
                  onChange={(e) => handleInputChange('hvMaxDCVoltageH1H0', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
                <Input
                  value={formData.hvMaxDCCurrentH1H0}
                  onChange={(e) => handleInputChange('hvMaxDCCurrentH1H0', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
                <Input
                  value={formData.hvMaxOhmH1H0}
                  onChange={(e) => handleInputChange('hvMaxOhmH1H0', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
              </div>
              <Input
                value={formData.hvMaxMaxErrorH1H0}
                onChange={(e) => handleInputChange('hvMaxMaxErrorH1H0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center text-xs"
              />
              <div className="grid grid-cols-3 gap-1">
                <Input
                  value={formData.hvMaxDCVoltageH2H0}
                  onChange={(e) => handleInputChange('hvMaxDCVoltageH2H0', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
                <Input
                  value={formData.hvMaxDCCurrentH2H0}
                  onChange={(e) => handleInputChange('hvMaxDCCurrentH2H0', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
                <Input
                  value={formData.hvMaxOhmH2H0}
                  onChange={(e) => handleInputChange('hvMaxOhmH2H0', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
              </div>
              <Input
                value={formData.hvMaxMaxErrorH2H0}
                onChange={(e) => handleInputChange('hvMaxMaxErrorH2H0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center text-xs"
              />
              <div className="grid grid-cols-3 gap-1">
                <Input
                  value={formData.hvMaxDCVoltageH2H3}
                  onChange={(e) => handleInputChange('hvMaxDCVoltageH2H3', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
                <Input
                  value={formData.hvMaxDCCurrentH2H3}
                  onChange={(e) => handleInputChange('hvMaxDCCurrentH2H3', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
                <Input
                  value={formData.hvMaxOhmH2H3}
                  onChange={(e) => handleInputChange('hvMaxOhmH2H3', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-1">
                <Input
                  value={formData.hvMaxMaxErrorCMPhase}
                  onChange={(e) => handleInputChange('hvMaxMaxErrorCMPhase', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
                <Input
                  value={formData.hvMaxMaxErrorPhase}
                  onChange={(e) => handleInputChange('hvMaxMaxErrorPhase', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-xs"
                />
              </div>
              <div></div>
            </div>
          </div>

          {/* LV WINDING Section */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">LV...WDG.</h3>
            
            {/* Headers */}
            <div className="grid grid-cols-6 gap-4 mb-4 text-center">
              <div></div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : H1H0/H1H2</div>
                <div>AC(mA)</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>%MAXIMUM ERROR BETWEEN CM&PHASE</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : H1H0/H1H2</div>
                <div>AC(mA)</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>%MAXIMUM ERROR BETWEEN PHASE</div>
              </div>
              <div className="text-blue-600 font-semibold">REMARK</div>
            </div>

            {/* ...TAP row */}
            <div className="grid grid-cols-6 gap-4 mb-2 items-center">
              <div className="text-blue-600 font-semibold">...TAP</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            {/* N row */}
            <div className="grid grid-cols-6 gap-4 mb-4 items-center">
              <div className="text-red-600 font-semibold">N</div>
              <Input
                value={formData.lvNTapH1H0}
                onChange={(e) => handleInputChange('lvNTapH1H0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.lvNTapMaxErrorCMPhase}
                onChange={(e) => handleInputChange('lvNTapMaxErrorCMPhase', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.lvNTapH2H0}
                onChange={(e) => handleInputChange('lvNTapH2H0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.lvNTapMaxErrorPhase}
                onChange={(e) => handleInputChange('lvNTapMaxErrorPhase', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <div></div>
            </div>
          </div>

          {/* TV WINDING Section */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">TV...WDG.</h3>
            
            {/* Headers */}
            <div className="grid grid-cols-6 gap-4 mb-4 text-center">
              <div></div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : H1H0/H1H2</div>
                <div>AC(mA)</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>%MAXIMUM ERROR BETWEEN CM&PHASE</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : H1H0/H1H2</div>
                <div>AC(mA)</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>%MAXIMUM ERROR BETWEEN PHASE</div>
              </div>
              <div className="text-blue-600 font-semibold">REMARK</div>
            </div>

            {/* ...TAP row */}
            <div className="grid grid-cols-6 gap-4 mb-2 items-center">
              <div className="text-blue-600 font-semibold">...TAP</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            {/* N row */}
            <div className="grid grid-cols-6 gap-4 mb-4 items-center">
              <div className="text-red-600 font-semibold">N</div>
              <Input
                value={formData.tvNTapH1H0}
                onChange={(e) => handleInputChange('tvNTapH1H0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.tvNTapMaxErrorCMPhase}
                onChange={(e) => handleInputChange('tvNTapMaxErrorCMPhase', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.tvNTapH2H0}
                onChange={(e) => handleInputChange('tvNTapH2H0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.tvNTapMaxErrorPhase}
                onChange={(e) => handleInputChange('tvNTapMaxErrorPhase', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <div></div>
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
