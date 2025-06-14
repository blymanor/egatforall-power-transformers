
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
    transformer: mode === 'create' ? '' : (data?.transformer || ''),
    testType: mode === 'create' ? '' : (data?.testType || ''),
    testDate: mode === 'create' ? undefined : (data?.testDate || undefined),
    inspector: mode === 'create' ? '' : (data?.inspector || ''),
    ambientTemp: mode === 'create' ? '' : (data?.ambientTemp || ''),
    humidity: mode === 'create' ? '' : (data?.humidity || ''),
    oilTemp: mode === 'create' ? '' : (data?.oilTemp || ''),
    wdgTemp: mode === 'create' ? '' : (data?.wdgTemp || ''),
    weather: mode === 'create' ? '' : (data?.weather || ''),
    // BETWEEN ENERGIZE : (H-L) sections
    hvMinTap: mode === 'create' ? 'Tap8L' : (data?.hvMinTap || 'Tap8L'),
    hvMinVoltageH1H0: mode === 'create' ? '0.0' : (data?.hvMinVoltageH1H0 || '0.0'),
    hvMinCurrentH1H0: mode === 'create' ? '0.0' : (data?.hvMinCurrentH1H0 || '0.0'),
    hvMinImpedanceH1H0: mode === 'create' ? '0.0' : (data?.hvMinImpedanceH1H0 || '0.0'),
    hvMinVoltageH2H0: mode === 'create' ? '0.0' : (data?.hvMinVoltageH2H0 || '0.0'),
    hvMinCurrentH2H0: mode === 'create' ? '0.0' : (data?.hvMinCurrentH2H0 || '0.0'),
    hvMinImpedanceH2H0: mode === 'create' ? '0.0' : (data?.hvMinImpedanceH2H0 || '0.0'),
    hvMinVoltageH3H0: mode === 'create' ? '0.0' : (data?.hvMinVoltageH3H0 || '0.0'),
    hvMinCurrentH3H0: mode === 'create' ? '0.0' : (data?.hvMinCurrentH3H0 || '0.0'),
    hvMinImpedanceH3H0: mode === 'create' ? '0.0' : (data?.hvMinImpedanceH3H0 || '0.0'),
    hvMinCommissioning: mode === 'create' ? 'COMMISSIONING' : (data?.hvMinCommissioning || 'COMMISSIONING'),
    hvMinDeviation: mode === 'create' ? '0.0' : (data?.hvMinDeviation || '0.0'),
    // N TAP section
    hvNTapVoltageH1H0: mode === 'create' ? '0.0' : (data?.hvNTapVoltageH1H0 || '0.0'),
    hvNTapCurrentH1H0: mode === 'create' ? '0.0' : (data?.hvNTapCurrentH1H0 || '0.0'),
    hvNTapImpedanceH1H0: mode === 'create' ? '0.0' : (data?.hvNTapImpedanceH1H0 || '0.0'),
    hvNTapVoltageH2H0: mode === 'create' ? '0.0' : (data?.hvNTapVoltageH2H0 || '0.0'),
    hvNTapCurrentH2H0: mode === 'create' ? '0.0' : (data?.hvNTapCurrentH2H0 || '0.0'),
    hvNTapImpedanceH2H0: mode === 'create' ? '0.0' : (data?.hvNTapImpedanceH2H0 || '0.0'),
    hvNTapVoltageH3H0: mode === 'create' ? '0.0' : (data?.hvNTapVoltageH3H0 || '0.0'),
    hvNTapCurrentH3H0: mode === 'create' ? '0.0' : (data?.hvNTapCurrentH3H0 || '0.0'),
    hvNTapImpedanceH3H0: mode === 'create' ? '0.0' : (data?.hvNTapImpedanceH3H0 || '0.0'),
    hvNTapCommissioning: mode === 'create' ? 'COMMISSIONING' : (data?.hvNTapCommissioning || 'COMMISSIONING'),
    hvNTapDeviation: mode === 'create' ? '0.0' : (data?.hvNTapDeviation || '0.0'),
    // 2R TAP section
    hv2RTapVoltageH1H0: mode === 'create' ? '0.0' : (data?.hv2RTapVoltageH1H0 || '0.0'),
    hv2RTapCurrentH1H0: mode === 'create' ? '0.0' : (data?.hv2RTapCurrentH1H0 || '0.0'),
    hv2RTapImpedanceH1H0: mode === 'create' ? '0.0' : (data?.hv2RTapImpedanceH1H0 || '0.0'),
    hv2RTapVoltageH2H0: mode === 'create' ? '0.0' : (data?.hv2RTapVoltageH2H0 || '0.0'),
    hv2RTapCurrentH2H0: mode === 'create' ? '0.0' : (data?.hv2RTapCurrentH2H0 || '0.0'),
    hv2RTapImpedanceH2H0: mode === 'create' ? '0.0' : (data?.hv2RTapImpedanceH2H0 || '0.0'),
    hv2RTapVoltageH3H0: mode === 'create' ? '0.0' : (data?.hv2RTapVoltageH3H0 || '0.0'),
    hv2RTapCurrentH3H0: mode === 'create' ? '0.0' : (data?.hv2RTapCurrentH3H0 || '0.0'),
    hv2RTapImpedanceH3H0: mode === 'create' ? '0.0' : (data?.hv2RTapImpedanceH3H0 || '0.0'),
    hv2RTapCommissioning: mode === 'create' ? 'COMMISSIONING' : (data?.hv2RTapCommissioning || 'COMMISSIONING'),
    hv2RTapDeviation: mode === 'create' ? '0.0' : (data?.hv2RTapDeviation || '0.0'),
    // MAX TAP section
    hvMaxTap: mode === 'create' ? 'Tap1R' : (data?.hvMaxTap || 'Tap1R'),
    hvMaxVoltageH1H0: mode === 'create' ? '0.0' : (data?.hvMaxVoltageH1H0 || '0.0'),
    hvMaxCurrentH1H0: mode === 'create' ? '0.0' : (data?.hvMaxCurrentH1H0 || '0.0'),
    hvMaxImpedanceH1H0: mode === 'create' ? '0.0' : (data?.hvMaxImpedanceH1H0 || '0.0'),
    hvMaxVoltageH2H0: mode === 'create' ? '0.0' : (data?.hvMaxVoltageH2H0 || '0.0'),
    hvMaxCurrentH2H0: mode === 'create' ? '0.0' : (data?.hvMaxCurrentH2H0 || '0.0'),
    hvMaxImpedanceH2H0: mode === 'create' ? '0.0' : (data?.hvMaxImpedanceH2H0 || '0.0'),
    hvMaxVoltageH3H0: mode === 'create' ? '0.0' : (data?.hvMaxVoltageH3H0 || '0.0'),
    hvMaxCurrentH3H0: mode === 'create' ? '0.0' : (data?.hvMaxCurrentH3H0 || '0.0'),
    hvMaxImpedanceH3H0: mode === 'create' ? '0.0' : (data?.hvMaxImpedanceH3H0 || '0.0'),
    hvMaxCommissioning: mode === 'create' ? 'COMMISSIONING' : (data?.hvMaxCommissioning || 'COMMISSIONING'),
    hvMaxDeviation: mode === 'create' ? '0.0' : (data?.hvMaxDeviation || '0.0'),
    // HT N TAP section
    htNTapVoltageH1H0: mode === 'create' ? '0.0' : (data?.htNTapVoltageH1H0 || '0.0'),
    htNTapCurrentH1H0: mode === 'create' ? '0.0' : (data?.htNTapCurrentH1H0 || '0.0'),
    htNTapImpedanceH1H0: mode === 'create' ? '0.0' : (data?.htNTapImpedanceH1H0 || '0.0'),
    htNTapVoltageH2H0: mode === 'create' ? '0.0' : (data?.htNTapVoltageH2H0 || '0.0'),
    htNTapCurrentH2H0: mode === 'create' ? '0.0' : (data?.htNTapCurrentH2H0 || '0.0'),
    htNTapImpedanceH2H0: mode === 'create' ? '0.0' : (data?.htNTapImpedanceH2H0 || '0.0'),
    htNTapVoltageH3H0: mode === 'create' ? '0.0' : (data?.htNTapVoltageH3H0 || '0.0'),
    htNTapCurrentH3H0: mode === 'create' ? '0.0' : (data?.htNTapCurrentH3H0 || '0.0'),
    htNTapImpedanceH3H0: mode === 'create' ? '0.0' : (data?.htNTapImpedanceH3H0 || '0.0'),
    htNTapCommissioning: mode === 'create' ? 'COMMISSIONING' : (data?.htNTapCommissioning || 'COMMISSIONING'),
    htNTapDeviation: mode === 'create' ? '0.0' : (data?.htNTapDeviation || '0.0'),
    // LT N TAP section  
    ltNTapVoltageH1H0: mode === 'create' ? '0.0' : (data?.ltNTapVoltageH1H0 || '0.0'),
    ltNTapCurrentH1H0: mode === 'create' ? '0.0' : (data?.ltNTapCurrentH1H0 || '0.0'),
    ltNTapImpedanceH1H0: mode === 'create' ? '0.0' : (data?.ltNTapImpedanceH1H0 || '0.0'),
    ltNTapVoltageH2H0: mode === 'create' ? '0.0' : (data?.ltNTapVoltageH2H0 || '0.0'),
    ltNTapCurrentH2H0: mode === 'create' ? '0.0' : (data?.ltNTapCurrentH2H0 || '0.0'),
    ltNTapImpedanceH2H0: mode === 'create' ? '0.0' : (data?.ltNTapImpedanceH2H0 || '0.0'),
    ltNTapVoltageH3H0: mode === 'create' ? '0.0' : (data?.ltNTapVoltageH3H0 || '0.0'),
    ltNTapCurrentH3H0: mode === 'create' ? '0.0' : (data?.ltNTapCurrentH3H0 || '0.0'),
    ltNTapImpedanceH3H0: mode === 'create' ? '0.0' : (data?.ltNTapImpedanceH3H0 || '0.0'),
    ltNTapCommissioning: mode === 'create' ? 'COMMISSIONING' : (data?.ltNTapCommissioning || 'COMMISSIONING'),
    ltNTapDeviation: mode === 'create' ? '0.0' : (data?.ltNTapDeviation || '0.0'),
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
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
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

          {/* BETWEEN ENERGIZE : (H-L) Sections */}
          {[
            { key: 'hvMin', title: 'Min Tap :', selectField: 'hvMinTap', selectValue: formData.hvMinTap },
            { key: 'hvNTap', title: 'N TAP', selectField: null },
            { key: 'hv2RTap', title: '2R TAP', selectField: null },
            { key: 'hvMax', title: 'Min Tap :', selectField: 'hvMaxTap', selectValue: formData.hvMaxTap },
            { key: 'htNTap', title: 'N TAP', selectField: null },
            { key: 'ltNTap', title: 'N TAP', selectField: null }
          ].map((section, index) => (
            <div key={section.key} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">
                BETWEEN ENERGIZE : (H-L)
              </h3>
              
              {/* Headers */}
              <div className="grid grid-cols-6 gap-4 mb-4 text-center">
                <div className="text-blue-600 font-semibold">WDG.</div>
                <div className="text-blue-600 font-semibold">
                  <div>WDG. ENERGIZE : H1H0/H1H2</div>
                  <div className="grid grid-cols-3 gap-1 mt-1">
                    <div>(V.)</div>
                    <div>(A.)</div>
                    <div>Z</div>
                  </div>
                </div>
                <div className="text-blue-600 font-semibold">
                  <div>WDG. ENERGIZE : H2H0/H2H3</div>
                  <div className="grid grid-cols-3 gap-1 mt-1">
                    <div>(V.)</div>
                    <div>(A.)</div>
                    <div>Z</div>
                  </div>
                </div>
                <div className="text-blue-600 font-semibold">
                  <div>WDG. ENERGIZE : H3H0/H3H1</div>
                  <div className="grid grid-cols-3 gap-1 mt-1">
                    <div>(V.)</div>
                    <div>(A.)</div>
                    <div>Z</div>
                  </div>
                </div>
                <div className="text-blue-600 font-semibold">
                  <div>COMMISSIONING OR FIRST TEST :</div>
                  <div>%DEVIATION</div>
                </div>
                <div className="text-blue-600 font-semibold">REMARK</div>
              </div>

              {/* Data row */}
              <div className="grid grid-cols-6 gap-4 mb-4 items-center">
                <div className="space-y-2">
                  <div className="text-blue-600 font-semibold">{section.title}</div>
                  {section.selectField && (
                    <Select 
                      value={section.selectValue} 
                      onValueChange={(value) => handleInputChange(section.selectField, value)}
                      disabled={isReadOnly}
                    >
                      <SelectTrigger className="w-full">
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
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <Input
                    value={formData[`${section.key}VoltageH1H0`]}
                    onChange={(e) => handleInputChange(`${section.key}VoltageH1H0`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-sm"
                  />
                  <Input
                    value={formData[`${section.key}CurrentH1H0`]}
                    onChange={(e) => handleInputChange(`${section.key}CurrentH1H0`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-sm"
                  />
                  <Input
                    value={formData[`${section.key}ImpedanceH1H0`]}
                    onChange={(e) => handleInputChange(`${section.key}ImpedanceH1H0`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-sm"
                  />
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <Input
                    value={formData[`${section.key}VoltageH2H0`]}
                    onChange={(e) => handleInputChange(`${section.key}VoltageH2H0`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-sm"
                  />
                  <Input
                    value={formData[`${section.key}CurrentH2H0`]}
                    onChange={(e) => handleInputChange(`${section.key}CurrentH2H0`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-sm"
                  />
                  <Input
                    value={formData[`${section.key}ImpedanceH2H0`]}
                    onChange={(e) => handleInputChange(`${section.key}ImpedanceH2H0`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-sm"
                  />
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <Input
                    value={formData[`${section.key}VoltageH3H0`]}
                    onChange={(e) => handleInputChange(`${section.key}VoltageH3H0`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-sm"
                  />
                  <Input
                    value={formData[`${section.key}CurrentH3H0`]}
                    onChange={(e) => handleInputChange(`${section.key}CurrentH3H0`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-sm"
                  />
                  <Input
                    value={formData[`${section.key}ImpedanceH3H0`]}
                    onChange={(e) => handleInputChange(`${section.key}ImpedanceH3H0`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Select 
                    value={formData[`${section.key}Commissioning`]} 
                    onValueChange={(value) => handleInputChange(`${section.key}Commissioning`, value)}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="COMMISSIONING">COMMISSIONING</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={formData[`${section.key}Deviation`]}
                    onChange={(e) => handleInputChange(`${section.key}Deviation`, e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center"
                  />
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

export default SinglePhaseImpedanceMeasurementModal;
