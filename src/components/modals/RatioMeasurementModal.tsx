
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

interface RatioMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'view' | 'edit';
  data?: any;
}

const RatioMeasurementModal = ({ isOpen, onClose, mode, data }: RatioMeasurementModalProps) => {
  const [formData, setFormData] = useState({
    transformer: mode === 'create' ? '' : (data?.transformer || ''),
    testType: mode === 'create' ? '' : (data?.testType || ''),
    testDate: mode === 'create' ? undefined : (data?.testDate || undefined),
    workOrderNo: mode === 'create' ? '' : (data?.workOrderNo || ''),
    inspector: mode === 'create' ? '' : (data?.inspector || ''),
    ambientTemp: mode === 'create' ? '' : (data?.ambientTemp || ''),
    humidity: mode === 'create' ? '' : (data?.humidity || ''),
    oilTemp: mode === 'create' ? '' : (data?.oilTemp || ''),
    wdgTemp: mode === 'create' ? '' : (data?.wdgTemp || ''),
    weather: mode === 'create' ? '' : (data?.weather || ''),
    // HV Winding Tap Settings
    hvMinTap: mode === 'create' ? 'Tap8L' : (data?.hvMinTap || 'Tap8L'),
    hvMaxTap: mode === 'create' ? 'Tap1R' : (data?.hvMaxTap || 'Tap1R'),
    // Dielectric Breakdown Voltage Test
    oltcGapDistance: mode === 'create' ? '' : (data?.oltcGapDistance || ''),
    mainTankGapDistance: mode === 'create' ? '' : (data?.mainTankGapDistance || ''),
    // OLTC breakdown values
    oltcBreakdowns: [
      { xi: '0.0', xiX2: '0.0' },
      { xi: '0.0', xiX2: '0.0' },
      { xi: '0.0', xiX2: '0.0' },
      { xi: '0.0', xiX2: '0.0' },
      { xi: '0.0', xiX2: '0.0' }
    ],
    oltcSumXi: '0.0',
    oltcAverageX: '0.0',
    oltcSumXiX2: '0.0',
    oltcSValue: '0.0',
    oltcCvValue: '0.0',
    // Main Tank breakdown values
    mainTankBreakdowns: [
      { xi: '0.0', xiX2: '0.0' },
      { xi: '0.0', xiX2: '0.0' },
      { xi: '0.0', xiX2: '0.0' },
      { xi: '0.0', xiX2: '0.0' },
      { xi: '0.0', xiX2: '0.0' }
    ],
    mainTankSumXi: '0.0',
    mainTankAverageX: '0.0',
    mainTankSumXiX2: '0.0',
    mainTankSValue: '0.0',
    mainTankCvValue: '0.0',
    // Insulation Power Factor Measurement
    insulationCF: mode === 'create' ? '' : (data?.insulationCF || ''),
    insulationTestKv: mode === 'create' ? '' : (data?.insulationTestKv || ''),
    // Oil samples data
    oilSamples: [
      { name: '1) OLTC', current: '0.0', watt: '0.0', powerFactor: '0.0', powerFactorCor: '0.0' },
      { name: '2) MAIN TANK', current: '0.0', watt: '0.0', powerFactor: '0.0', powerFactorCor: '0.0' }
    ]
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOltcBreakdownChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      oltcBreakdowns: prev.oltcBreakdowns.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleMainTankBreakdownChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      mainTankBreakdowns: prev.mainTankBreakdowns.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleOilSampleChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      oilSamples: prev.oilSamples.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSave = () => {
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: "ข้อมูล Ratio Measurement ถูกบันทึกแล้ว",
    });
    onClose();
  };

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            {mode === 'create' ? 'เพิ่มข้อมูล' : mode === 'edit' ? 'แก้ไขข้อมูล' : 'แสดงข้อมูล'} Ratio Measurement
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
              <Label>เลขที่คำสั่งปฏิบัติงาน :</Label>
              <Input
                value={formData.workOrderNo}
                onChange={(e) => handleInputChange('workOrderNo', e.target.value)}
                placeholder="เลขที่คำสั่งปฏิบัติงาน"
                readOnly={isReadOnly}
              />
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
              <Label>ผู้ตรวจสอบ :</Label>
              <Input
                value={formData.inspector}
                onChange={(e) => handleInputChange('inspector', e.target.value)}
                placeholder="กรอกชื่อผู้ตรวจสอบ"
                readOnly={isReadOnly}
              />
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

          {/* DIELECTRIC BREAKDOWN VOLTAGE TEST */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">DIELECTRIC BREAKDOWN VOLTAGE TEST</h3>
            
            <div className="mb-4">
              <h4 className="text-blue-600 font-semibold mb-2">OIL SAMPLE</h4>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-6">
              {/* OLTC Section */}
              <div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-blue-600 font-semibold">1) OLTC</div>
                  <div className="text-blue-600 font-semibold">2) MAIN TANK</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600 font-semibold">GAP DISTANCE (ASTM-D1816)</span>
                    <Input
                      value={formData.oltcGapDistance}
                      onChange={(e) => handleInputChange('oltcGapDistance', e.target.value)}
                      readOnly={isReadOnly}
                      className="w-16 text-center"
                    />
                    <span className="text-sm">mm.</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600 font-semibold">GAP DISTANCE (ASTM-D1816)</span>
                    <Input
                      value={formData.mainTankGapDistance}
                      onChange={(e) => handleInputChange('mainTankGapDistance', e.target.value)}
                      readOnly={isReadOnly}
                      className="w-16 text-center"
                    />
                    <span className="text-sm">mm.</span>
                  </div>
                  <div className="text-blue-600 font-semibold">BREAK DOWN (kV)</div>
                  <div className="text-blue-600 font-semibold">BREAK DOWN (kV)</div>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-2">
                  <div className="text-blue-600 font-semibold">BREAK DOWN</div>
                  <div className="text-blue-600 font-semibold text-center">Xi</div>
                  <div className="text-blue-600 font-semibold text-center">(Xi-X)²</div>
                  <div className="text-blue-600 font-semibold text-center">Xi</div>
                </div>

                {/* OLTC Data rows */}
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="grid grid-cols-4 gap-2 mb-2 items-center">
                    <div className="text-blue-600 font-semibold">{num}</div>
                    <Input
                      value={formData.oltcBreakdowns[num - 1]?.xi || '0.0'}
                      onChange={(e) => handleOltcBreakdownChange(num - 1, 'xi', e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center h-8"
                    />
                    <Input
                      value={formData.oltcBreakdowns[num - 1]?.xiX2 || '0.0'}
                      onChange={(e) => handleOltcBreakdownChange(num - 1, 'xiX2', e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center h-8"
                    />
                    <Input
                      value={formData.mainTankBreakdowns[num - 1]?.xi || '0.0'}
                      onChange={(e) => handleMainTankBreakdownChange(num - 1, 'xi', e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center h-8"
                    />
                  </div>
                ))}

                {/* Calculated fields */}
                <div className="grid grid-cols-4 gap-2 mb-2 items-center">
                  <div className="text-blue-600 font-semibold">ΣXi</div>
                  <Input
                    value={formData.oltcSumXi}
                    onChange={(e) => handleInputChange('oltcSumXi', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center h-8"
                  />
                  <div></div>
                  <Input
                    value={formData.mainTankSumXi}
                    onChange={(e) => handleInputChange('mainTankSumXi', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center h-8"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2 mb-2 items-center">
                  <div className="text-blue-600 font-semibold">X̄ = ΣXi / n</div>
                  <Input
                    value={formData.oltcAverageX}
                    onChange={(e) => handleInputChange('oltcAverageX', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center h-8"
                  />
                  <div></div>
                  <Input
                    value={formData.mainTankAverageX}
                    onChange={(e) => handleInputChange('mainTankAverageX', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center h-8"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2 mb-2 items-center">
                  <div className="text-blue-600 font-semibold">Σ(Xi - X̄)²</div>
                  <div></div>
                  <Input
                    value={formData.oltcSumXiX2}
                    onChange={(e) => handleInputChange('oltcSumXiX2', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center h-8"
                  />
                  <Input
                    value={formData.mainTankSumXiX2}
                    onChange={(e) => handleInputChange('mainTankSumXiX2', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center h-8"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2 mb-2 items-center">
                  <div className="text-blue-600 font-semibold">S = √Σ(Xi - X̄)² / (n - 1)</div>
                  <Input
                    value={formData.oltcSValue}
                    onChange={(e) => handleInputChange('oltcSValue', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center h-8"
                  />
                  <div></div>
                  <Input
                    value={formData.mainTankSValue}
                    onChange={(e) => handleInputChange('mainTankSValue', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center h-8"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2 mb-2 items-center">
                  <div className="text-blue-600 font-semibold">CV = S/X̄</div>
                  <Input
                    value={formData.oltcCvValue}
                    onChange={(e) => handleInputChange('oltcCvValue', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center h-8"
                  />
                  <div></div>
                  <Input
                    value={formData.mainTankCvValue}
                    onChange={(e) => handleInputChange('mainTankCvValue', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center h-8"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* INSULATION POWER FACTOR MEASUREMENT */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">INSULATION POWER FACTOR MEASUREMENT</h3>
            
            <div className="flex gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Label>CF :</Label>
                <Input
                  value={formData.insulationCF}
                  onChange={(e) => handleInputChange('insulationCF', e.target.value)}
                  readOnly={isReadOnly}
                  className="w-24"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label>Test (kV) :</Label>
                <Input
                  value={formData.insulationTestKv}
                  onChange={(e) => handleInputChange('insulationTestKv', e.target.value)}
                  readOnly={isReadOnly}
                  className="w-24"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-4 mb-4">
              <div className="text-blue-600 font-semibold">OIL SAMPLE</div>
              <div className="text-blue-600 font-semibold text-center">CURRENT(mA)</div>
              <div className="text-blue-600 font-semibold text-center">WATT</div>
              <div className="text-blue-600 font-semibold text-center">%POWER FACTOR</div>
              <div className="text-blue-600 font-semibold text-center">%POWER FACTOR (COR 20 °C)</div>
              <div className="text-blue-600 font-semibold text-center">REMARK</div>
            </div>

            {formData.oilSamples.map((sample, index) => (
              <div key={index} className="grid grid-cols-6 gap-4 mb-2 items-center">
                <div className="text-blue-600 font-semibold">{sample.name}</div>
                <Input
                  value={sample.current}
                  onChange={(e) => handleOilSampleChange(index, 'current', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={sample.watt}
                  onChange={(e) => handleOilSampleChange(index, 'watt', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={sample.powerFactor}
                  onChange={(e) => handleOilSampleChange(index, 'powerFactor', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={sample.powerFactorCor}
                  onChange={(e) => handleOilSampleChange(index, 'powerFactorCor', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <div></div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          {!isReadOnly && (
            <div className="flex justify-center space-x-4 pt-4">
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

export default RatioMeasurementModal;
