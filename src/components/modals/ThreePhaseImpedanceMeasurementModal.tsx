
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

interface ThreePhaseImpedanceMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'view' | 'edit';
  data?: any;
}

const ThreePhaseImpedanceMeasurementModal = ({ isOpen, onClose, mode, data }: ThreePhaseImpedanceMeasurementModalProps) => {
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
    baseKVAHL: mode === 'create' ? '' : (data?.baseKVAHL || ''),
    baseKVAHT: mode === 'create' ? '' : (data?.baseKVAHT || ''),
    baseKVALT: mode === 'create' ? '' : (data?.baseKVALT || ''),
    // BETWEEN ENERGIZE : (H-L) sections
    hvMinTap: mode === 'create' ? 'Tap8L' : (data?.hvMinTap || 'Tap8L'),
    hvMinVoltageH1H2: mode === 'create' ? '0.0' : (data?.hvMinVoltageH1H2 || '0.0'),
    hvMinCurrentH1H2: mode === 'create' ? '0.0' : (data?.hvMinCurrentH1H2 || '0.0'),
    hvMinImpedanceH1H2: mode === 'create' ? '0.0' : (data?.hvMinImpedanceH1H2 || '0.0'),
    hvMinVoltageH2H3: mode === 'create' ? '0.0' : (data?.hvMinVoltageH2H3 || '0.0'),
    hvMinCurrentH2H3: mode === 'create' ? '0.0' : (data?.hvMinCurrentH2H3 || '0.0'),
    hvMinImpedanceH2H3: mode === 'create' ? '0.0' : (data?.hvMinImpedanceH2H3 || '0.0'),
    hvMinVoltageH3H1: mode === 'create' ? '0.0' : (data?.hvMinVoltageH3H1 || '0.0'),
    hvMinCurrentH3H1: mode === 'create' ? '0.0' : (data?.hvMinCurrentH3H1 || '0.0'),
    hvMinImpedanceH3H1: mode === 'create' ? '0.0' : (data?.hvMinImpedanceH3H1 || '0.0'),
    hvMinImpedanceForm: mode === 'create' ? 'MANUFACTURE' : (data?.hvMinImpedanceForm || 'MANUFACTURE'),
    hvMinImpedanceMeasurement: mode === 'create' ? '0.0' : (data?.hvMinImpedanceMeasurement || '0.0'),
    hvMinError: mode === 'create' ? '0.0' : (data?.hvMinError || '0.0'),
    // N TAP section
    hvNTapVoltageH1H2: mode === 'create' ? '0.0' : (data?.hvNTapVoltageH1H2 || '0.0'),
    hvNTapCurrentH1H2: mode === 'create' ? '0.0' : (data?.hvNTapCurrentH1H2 || '0.0'),
    hvNTapImpedanceH1H2: mode === 'create' ? '0.0' : (data?.hvNTapImpedanceH1H2 || '0.0'),
    hvNTapVoltageH2H3: mode === 'create' ? '0.0' : (data?.hvNTapVoltageH2H3 || '0.0'),
    hvNTapCurrentH2H3: mode === 'create' ? '0.0' : (data?.hvNTapCurrentH2H3 || '0.0'),
    hvNTapImpedanceH2H3: mode === 'create' ? '0.0' : (data?.hvNTapImpedanceH2H3 || '0.0'),
    hvNTapVoltageH3H1: mode === 'create' ? '0.0' : (data?.hvNTapVoltageH3H1 || '0.0'),
    hvNTapCurrentH3H1: mode === 'create' ? '0.0' : (data?.hvNTapCurrentH3H1 || '0.0'),
    hvNTapImpedanceH3H1: mode === 'create' ? '0.0' : (data?.hvNTapImpedanceH3H1 || '0.0'),
    hvNTapImpedanceForm: mode === 'create' ? 'MANUFACTURE' : (data?.hvNTapImpedanceForm || 'MANUFACTURE'),
    hvNTapImpedanceMeasurement: mode === 'create' ? '0.0' : (data?.hvNTapImpedanceMeasurement || '0.0'),
    hvNTapError: mode === 'create' ? '0.0' : (data?.hvNTapError || '0.0'),
    // 2R TAP section
    hv2RTapVoltageH1H2: mode === 'create' ? '0.0' : (data?.hv2RTapVoltageH1H2 || '0.0'),
    hv2RTapCurrentH1H2: mode === 'create' ? '0.0' : (data?.hv2RTapCurrentH1H2 || '0.0'),
    hv2RTapImpedanceH1H2: mode === 'create' ? '0.0' : (data?.hv2RTapImpedanceH1H2 || '0.0'),
    hv2RTapVoltageH2H3: mode === 'create' ? '0.0' : (data?.hv2RTapVoltageH2H3 || '0.0'),
    hv2RTapCurrentH2H3: mode === 'create' ? '0.0' : (data?.hv2RTapCurrentH2H3 || '0.0'),
    hv2RTapImpedanceH2H3: mode === 'create' ? '0.0' : (data?.hv2RTapImpedanceH2H3 || '0.0'),
    hv2RTapVoltageH3H1: mode === 'create' ? '0.0' : (data?.hv2RTapVoltageH3H1 || '0.0'),
    hv2RTapCurrentH3H1: mode === 'create' ? '0.0' : (data?.hv2RTapCurrentH3H1 || '0.0'),
    hv2RTapImpedanceH3H1: mode === 'create' ? '0.0' : (data?.hv2RTapImpedanceH3H1 || '0.0'),
    hv2RTapImpedanceForm: mode === 'create' ? 'MANUFACTURE' : (data?.hv2RTapImpedanceForm || 'MANUFACTURE'),
    hv2RTapImpedanceMeasurement: mode === 'create' ? '0.0' : (data?.hv2RTapImpedanceMeasurement || '0.0'),
    hv2RTapError: mode === 'create' ? '0.0' : (data?.hv2RTapError || '0.0'),
    // MAX TAP section
    hvMaxTap: mode === 'create' ? 'Tap1R' : (data?.hvMaxTap || 'Tap1R'),
    hvMaxVoltageH1H2: mode === 'create' ? '0.0' : (data?.hvMaxVoltageH1H2 || '0.0'),
    hvMaxCurrentH1H2: mode === 'create' ? '0.0' : (data?.hvMaxCurrentH1H2 || '0.0'),
    hvMaxImpedanceH1H2: mode === 'create' ? '0.0' : (data?.hvMaxImpedanceH1H2 || '0.0'),
    hvMaxVoltageH2H3: mode === 'create' ? '0.0' : (data?.hvMaxVoltageH2H3 || '0.0'),
    hvMaxCurrentH2H3: mode === 'create' ? '0.0' : (data?.hvMaxCurrentH2H3 || '0.0'),
    hvMaxImpedanceH2H3: mode === 'create' ? '0.0' : (data?.hvMaxImpedanceH2H3 || '0.0'),
    hvMaxVoltageH3H1: mode === 'create' ? '0.0' : (data?.hvMaxVoltageH3H1 || '0.0'),
    hvMaxCurrentH3H1: mode === 'create' ? '0.0' : (data?.hvMaxCurrentH3H1 || '0.0'),
    hvMaxImpedanceH3H1: mode === 'create' ? '0.0' : (data?.hvMaxImpedanceH3H1 || '0.0'),
    hvMaxImpedanceForm: mode === 'create' ? 'MANUFACTURE' : (data?.hvMaxImpedanceForm || 'MANUFACTURE'),
    hvMaxImpedanceMeasurement: mode === 'create' ? '0.0' : (data?.hvMaxImpedanceMeasurement || '0.0'),
    hvMaxError: mode === 'create' ? '0.0' : (data?.hvMaxError || '0.0'),
    // HT N TAP section
    htNTapVoltageH1H2: mode === 'create' ? '0.0' : (data?.htNTapVoltageH1H2 || '0.0'),
    htNTapCurrentH1H2: mode === 'create' ? '0.0' : (data?.htNTapCurrentH1H2 || '0.0'),
    htNTapImpedanceH1H2: mode === 'create' ? '0.0' : (data?.htNTapImpedanceH1H2 || '0.0'),
    htNTapVoltageH2H3: mode === 'create' ? '0.0' : (data?.htNTapVoltageH2H3 || '0.0'),
    htNTapCurrentH2H3: mode === 'create' ? '0.0' : (data?.htNTapCurrentH2H3 || '0.0'),
    htNTapImpedanceH2H3: mode === 'create' ? '0.0' : (data?.htNTapImpedanceH2H3 || '0.0'),
    htNTapVoltageH3H1: mode === 'create' ? '0.0' : (data?.htNTapVoltageH3H1 || '0.0'),
    htNTapCurrentH3H1: mode === 'create' ? '0.0' : (data?.htNTapCurrentH3H1 || '0.0'),
    htNTapImpedanceH3H1: mode === 'create' ? '0.0' : (data?.htNTapImpedanceH3H1 || '0.0'),
    htNTapImpedanceForm: mode === 'create' ? 'MANUFACTURE' : (data?.htNTapImpedanceForm || 'MANUFACTURE'),
    htNTapImpedanceMeasurement: mode === 'create' ? '0.0' : (data?.htNTapImpedanceMeasurement || '0.0'),
    htNTapError: mode === 'create' ? '0.0' : (data?.htNTapError || '0.0'),
    // LT N TAP section  
    ltNTapVoltageH1H2: mode === 'create' ? '0.0' : (data?.ltNTapVoltageH1H2 || '0.0'),
    ltNTapCurrentH1H2: mode === 'create' ? '0.0' : (data?.ltNTapCurrentH1H2 || '0.0'),
    ltNTapImpedanceH1H2: mode === 'create' ? '0.0' : (data?.ltNTapImpedanceH1H2 || '0.0'),
    ltNTapVoltageH2H3: mode === 'create' ? '0.0' : (data?.ltNTapVoltageH2H3 || '0.0'),
    ltNTapCurrentH2H3: mode === 'create' ? '0.0' : (data?.ltNTapCurrentH2H3 || '0.0'),
    ltNTapImpedanceH2H3: mode === 'create' ? '0.0' : (data?.ltNTapImpedanceH2H3 || '0.0'),
    ltNTapVoltageH3H1: mode === 'create' ? '0.0' : (data?.ltNTapVoltageH3H1 || '0.0'),
    ltNTapCurrentH3H1: mode === 'create' ? '0.0' : (data?.ltNTapCurrentH3H1 || '0.0'),
    ltNTapImpedanceH3H1: mode === 'create' ? '0.0' : (data?.ltNTapImpedanceH3H1 || '0.0'),
    ltNTapImpedanceForm: mode === 'create' ? 'MANUFACTURE' : (data?.ltNTapImpedanceForm || 'MANUFACTURE'),
    ltNTapImpedanceMeasurement: mode === 'create' ? '0.0' : (data?.ltNTapImpedanceMeasurement || '0.0'),
    ltNTapError: mode === 'create' ? '0.0' : (data?.ltNTapError || '0.0'),
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = () => {
    toast.success("คำนวณเสร็จสิ้น", {
      description: "ระบบได้คำนวณค่า Three Phase Impedance แล้ว",
    });
  };

  const handleSave = () => {
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: "ข้อมูล Three Phase Impedance Measurement ถูกบันทึกแล้ว",
    });
    onClose();
  };

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            {mode === 'create' ? 'เพิ่มข้อมูล' : mode === 'edit' ? 'แก้ไขข้อมูล' : 'แสดงข้อมูล'} Three Phase Impedance Measurement
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

          {/* Base KVA Section */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Base KVA (H-L) :</Label>
              <div className="flex items-center space-x-2">
                <Input
                  value={formData.baseKVAHL}
                  onChange={(e) => handleInputChange('baseKVAHL', e.target.value)}
                  readOnly={isReadOnly}
                />
                <span className="text-sm">kVA</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Base KVA (H-T) :</Label>
              <div className="flex items-center space-x-2">
                <Input
                  value={formData.baseKVAHT}
                  onChange={(e) => handleInputChange('baseKVAHT', e.target.value)}
                  readOnly={isReadOnly}
                />
                <span className="text-sm">kVA</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Base KVA (L-T) :</Label>
              <div className="flex items-center space-x-2">
                <Input
                  value={formData.baseKVALT}
                  onChange={(e) => handleInputChange('baseKVALT', e.target.value)}
                  readOnly={isReadOnly}
                />
                <span className="text-sm">kVA</span>
              </div>
            </div>
          </div>

          {/* BETWEEN ENERGIZE : (H-L) Sections */}
          {[
            { key: 'hvMin', title: 'Min Tap :', selectField: 'hvMinTap', selectValue: formData.hvMinTap, tapLabel: 'kV TAP' },
            { key: 'hvNTap', title: 'N TAP', selectField: null, tapLabel: null },
            { key: 'hv2RTap', title: '2R TAP', selectField: null, tapLabel: null },
            { key: 'hvMax', title: 'Min Tap :', selectField: 'hvMaxTap', selectValue: formData.hvMaxTap, tapLabel: 'kV TAP' },
            { key: 'htNTap', title: 'N TAP', selectField: null, tapLabel: null },
            { key: 'ltNTap', title: 'N TAP', selectField: null, tapLabel: null }
          ].map((section, index) => (
            <div key={section.key} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">
                BETWEEN ENERGIZE : (H-L)
              </h3>
              
              {/* Headers */}
              <div className="grid grid-cols-6 gap-4 mb-4 text-center text-sm">
                <div className="text-blue-600 font-semibold">WDG.</div>
                <div className="text-blue-600 font-semibold">
                  <div>WDG. ENERGIZE : H1-H2/H1-H0</div>
                  <div>WDG. SHORT : X1-X2-X3</div>
                  <div className="grid grid-cols-3 gap-1 mt-1">
                    <div>(V.)</div>
                    <div>(A.)</div>
                    <div>Z</div>
                  </div>
                </div>
                <div className="text-blue-600 font-semibold">
                  <div>WDG. ENERGIZE : H2-H3/H2-H0</div>
                  <div>WDG. SHORT : X2X0/X2X3</div>
                  <div className="grid grid-cols-3 gap-1 mt-1">
                    <div>(V.)</div>
                    <div>(A.)</div>
                    <div>Z</div>
                  </div>
                </div>
                <div className="text-blue-600 font-semibold">
                  <div>WDG. ENERGIZE : H3-H1/H3-H0</div>
                  <div>WDG. SHORT : X3X0/X3X1</div>
                  <div className="grid grid-cols-3 gap-1 mt-1">
                    <div>(V.)</div>
                    <div>(A.)</div>
                    <div>Z</div>
                  </div>
                </div>
                <div className="text-blue-600 font-semibold">
                  <div>%IMPEDANCE FORM</div>
                  <div className="grid grid-cols-2 gap-1 mt-1">
                    <div>%IMPEDANCE MEASUREMENT</div>
                    <div>%ERROR</div>
                  </div>
                </div>
                <div className="text-blue-600 font-semibold">REMARK</div>
              </div>

              {/* Data row */}
              <div className="grid grid-cols-6 gap-4 mb-4 items-center text-sm">
                <div className="space-y-2">
                  <div className="text-blue-600 font-semibold">{section.title}</div>
                  {section.selectField && (
                    <Select 
                      value={section.selectValue} 
                      onValueChange={(value) => handleInputChange(section.selectField, value)}
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
                  )}
                  {!section.selectField && (
                    <div className="text-red-600 font-semibold">{section.title}</div>
                  )}
                  {section.tapLabel && (
                    <div className="text-blue-600 font-semibold text-xs">{section.tapLabel}</div>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <Input
                    value={formData[`${section.key}VoltageH1H2`]}
                    onChange={(e) => handleInputChange(`${section.key}VoltageH1H2`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                  <Input
                    value={formData[`${section.key}CurrentH1H2`]}
                    onChange={(e) => handleInputChange(`${section.key}CurrentH1H2`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                  <Input
                    value={formData[`${section.key}ImpedanceH1H2`]}
                    onChange={(e) => handleInputChange(`${section.key}ImpedanceH1H2`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <Input
                    value={formData[`${section.key}VoltageH2H3`]}
                    onChange={(e) => handleInputChange(`${section.key}VoltageH2H3`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                  <Input
                    value={formData[`${section.key}CurrentH2H3`]}
                    onChange={(e) => handleInputChange(`${section.key}CurrentH2H3`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                  <Input
                    value={formData[`${section.key}ImpedanceH2H3`]}
                    onChange={(e) => handleInputChange(`${section.key}ImpedanceH2H3`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <Input
                    value={formData[`${section.key}VoltageH3H1`]}
                    onChange={(e) => handleInputChange(`${section.key}VoltageH3H1`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                  <Input
                    value={formData[`${section.key}CurrentH3H1`]}
                    onChange={(e) => handleInputChange(`${section.key}CurrentH3H1`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                  <Input
                    value={formData[`${section.key}ImpedanceH3H1`]}
                    onChange={(e) => handleInputChange(`${section.key}ImpedanceH3H1`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Select 
                    value={formData[`${section.key}ImpedanceForm`]} 
                    onValueChange={(value) => handleInputChange(`${section.key}ImpedanceForm`, value)}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger className="w-full text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MANUFACTURE">MANUFACTURE</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="grid grid-cols-2 gap-1">
                    <Input
                      value={formData[`${section.key}ImpedanceMeasurement`]}
                      onChange={(e) => handleInputChange(`${section.key}ImpedanceMeasurement`, e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center text-xs"
                    />
                    <Input
                      value={formData[`${section.key}Error`]}
                      onChange={(e) => handleInputChange(`${section.key}Error`, e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center text-xs"
                    />
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          ))}

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

export default ThreePhaseImpedanceMeasurementModal;
