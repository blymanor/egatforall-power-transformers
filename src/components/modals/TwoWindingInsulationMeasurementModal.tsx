
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

interface TwoWindingInsulationMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'view' | 'edit';
  data?: any;
}

const TwoWindingInsulationMeasurementModal = ({ isOpen, onClose, mode, data }: TwoWindingInsulationMeasurementModalProps) => {
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
    // Insulation Resistance Measurement
    hvLvVdc: mode === 'create' ? '' : (data?.hvLvVdc || ''),
    hvLvAt1Min: mode === 'create' ? '0.0' : (data?.hvLvAt1Min || '0.0'),
    hvLvAt10Min: mode === 'create' ? '0.0' : (data?.hvLvAt10Min || '0.0'),
    hvLvPI: mode === 'create' ? '0.0' : (data?.hvLvPI || '0.0'),
    lvHVdc: mode === 'create' ? '' : (data?.lvHVdc || ''),
    lvHAt1Min: mode === 'create' ? '0.0' : (data?.lvHAt1Min || '0.0'),
    lvHAt10Min: mode === 'create' ? '0.0' : (data?.lvHAt10Min || '0.0'),
    lvHPI: mode === 'create' ? '0.0' : (data?.lvHPI || '0.0'),
    // Insulation Power Factor and Capacitance Measurement
    cor20C: mode === 'create' ? '' : (data?.cor20C || ''),
    testKv: mode === 'create' ? '' : (data?.testKv || ''),
    // Row 1
    hvLvCurrentAvg: mode === 'create' ? '0.0' : (data?.hvLvCurrentAvg || '0.0'),
    hvLvWattAvg: mode === 'create' ? '0.0' : (data?.hvLvWattAvg || '0.0'),
    hvLvPowerFactorAvg: mode === 'create' ? '0.0' : (data?.hvLvPowerFactorAvg || '0.0'),
    hvLvPowerFactorCor20: mode === 'create' ? '0.0' : (data?.hvLvPowerFactorCor20 || '0.0'),
    hvLvCapAvg: mode === 'create' ? '' : (data?.hvLvCapAvg || ''),
    hvLvRemark: mode === 'create' ? 'CH+CHT' : (data?.hvLvRemark || 'CH+CHT'),
    // Row 2
    hvGuCurrentAvg: mode === 'create' ? '0.0' : (data?.hvGuCurrentAvg || '0.0'),
    hvGuWattAvg: mode === 'create' ? '0.0' : (data?.hvGuWattAvg || '0.0'),
    hvGuPowerFactorAvg: mode === 'create' ? '0.0' : (data?.hvGuPowerFactorAvg || '0.0'),
    hvGuPowerFactorCor20: mode === 'create' ? '0.0' : (data?.hvGuPowerFactorCor20 || '0.0'),
    hvGuCapAvg: mode === 'create' ? '' : (data?.hvGuCapAvg || ''),
    hvGuRemark: mode === 'create' ? 'CH+CHT' : (data?.hvGuRemark || 'CH+CHT'),
    // Row 3
    lvHvCurrentAvg: mode === 'create' ? '0.0' : (data?.lvHvCurrentAvg || '0.0'),
    lvHvWattAvg: mode === 'create' ? '0.0' : (data?.lvHvWattAvg || '0.0'),
    lvHvPowerFactorAvg: mode === 'create' ? '0.0' : (data?.lvHvPowerFactorAvg || '0.0'),
    lvHvPowerFactorCor20: mode === 'create' ? '0.0' : (data?.lvHvPowerFactorCor20 || '0.0'),
    lvHvCapAvg: mode === 'create' ? '' : (data?.lvHvCapAvg || ''),
    lvHvRemark: mode === 'create' ? 'CH' : (data?.lvHvRemark || 'CH'),
    // Row 4
    lvGuCurrentAvg: mode === 'create' ? '0.0' : (data?.lvGuCurrentAvg || '0.0'),
    lvGuWattAvg: mode === 'create' ? '0.0' : (data?.lvGuWattAvg || '0.0'),
    lvGuPowerFactorAvg: mode === 'create' ? '0.0' : (data?.lvGuPowerFactorAvg || '0.0'),
    lvGuPowerFactorCor20: mode === 'create' ? '0.0' : (data?.lvGuPowerFactorCor20 || '0.0'),
    lvGuCapAvg: mode === 'create' ? '' : (data?.lvGuCapAvg || ''),
    lvGuRemark: mode === 'create' ? 'CT+CHT' : (data?.lvGuRemark || 'CT+CHT'),
    // Calculated Results
    calculatedCurrent1: mode === 'create' ? '0.0' : (data?.calculatedCurrent1 || '0.0'),
    calculatedWatt1: mode === 'create' ? '0.0' : (data?.calculatedWatt1 || '0.0'),
    calculatedCurrent2: mode === 'create' ? '0.0' : (data?.calculatedCurrent2 || '0.0'),
    calculatedWatt2: mode === 'create' ? '0.0' : (data?.calculatedWatt2 || '0.0'),
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = () => {
    toast.success("คำนวณเสร็จสิ้น", {
      description: "ระบบได้คำนวณค่า Two Winding Insulation Measurement แล้ว",
    });
  };

  const handleSave = () => {
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: "ข้อมูล Two Winding Insulation Measurement ถูกบันทึกแล้ว",
    });
    onClose();
  };

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            {mode === 'create' ? 'เพิ่มข้อมูล' : mode === 'edit' ? 'แก้ไขข้อมูล' : 'แสดงข้อมูล'} Two Winding Insulation Measurement
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

          {/* INSULATION RESISTANCE MEASUREMENT */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">INSULATION RESISTANCE MEASUREMENT</h3>
            
            <div className="grid grid-cols-7 gap-4 mb-4">
              <div className="text-blue-600 font-semibold">TEST CONNECTIONS</div>
              <div className="text-blue-600 font-semibold text-center">TEST</div>
              <div className="text-blue-600 font-semibold text-center">MΩ</div>
              <div></div>
              <div className="text-blue-600 font-semibold text-center">PI = MΩ at 10th Min/MΩ at 1st Min</div>
              <div></div>
              <div></div>
            </div>

            <div className="grid grid-cols-7 gap-4 mb-2 items-center text-blue-600 font-semibold text-sm">
              <div>No.</div>
              <div>EN.</div>
              <div>GR.</div>
              <div>Vdc.</div>
              <div>at 1st Min</div>
              <div>at 10th Min</div>
              <div></div>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-7 gap-4 mb-2 items-center">
              <div className="text-blue-600 font-semibold">1</div>
              <div className="text-blue-600 font-semibold">HV</div>
              <div className="text-blue-600 font-semibold">LV</div>
              <Input
                value={formData.hvLvVdc}
                onChange={(e) => handleInputChange('hvLvVdc', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.hvLvAt1Min}
                onChange={(e) => handleInputChange('hvLvAt1Min', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.hvLvAt10Min}
                onChange={(e) => handleInputChange('hvLvAt10Min', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.hvLvPI}
                onChange={(e) => handleInputChange('hvLvPI', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-7 gap-4 mb-4 items-center">
              <div className="text-blue-600 font-semibold">2</div>
              <div className="text-blue-600 font-semibold">LV</div>
              <div className="text-blue-600 font-semibold">H</div>
              <Input
                value={formData.lvHVdc}
                onChange={(e) => handleInputChange('lvHVdc', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.lvHAt1Min}
                onChange={(e) => handleInputChange('lvHAt1Min', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.lvHAt10Min}
                onChange={(e) => handleInputChange('lvHAt10Min', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.lvHPI}
                onChange={(e) => handleInputChange('lvHPI', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
            </div>
          </div>

          {/* INSULATION POWER FACTOR AND CAPACITANCE MEASUREMENT */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">INSULATION POWER FACTOR AND CAPACITANCE MEASUREMENT</h3>
            
            <div className="flex gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Label>COR 20 °C :</Label>
                <Input
                  value={formData.cor20C}
                  onChange={(e) => handleInputChange('cor20C', e.target.value)}
                  readOnly={isReadOnly}
                  className="w-24"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label>TEST (kV) :</Label>
                <Input
                  value={formData.testKv}
                  onChange={(e) => handleInputChange('testKv', e.target.value)}
                  readOnly={isReadOnly}
                  className="w-24"
                />
              </div>
            </div>

            <div className="grid grid-cols-9 gap-2 mb-4">
              <div className="text-blue-600 font-semibold">TEST CONNECTIONS</div>
              <div className="text-blue-600 font-semibold text-center">CURRENT(mA)</div>
              <div className="text-blue-600 font-semibold text-center">WATT</div>
              <div className="text-blue-600 font-semibold text-center">%POWER FACTOR</div>
              <div className="text-blue-600 font-semibold text-center">CAP(pF)</div>
              <div className="text-blue-600 font-semibold text-center">REMARK</div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            <div className="grid grid-cols-9 gap-2 mb-2 items-center text-blue-600 font-semibold text-sm">
              <div>No.</div>
              <div>EN.</div>
              <div>GR.</div>
              <div>GU.</div>
              <div>AVG.</div>
              <div>AVG.</div>
              <div>AVG.</div>
              <div>COR 20 °C</div>
              <div>AVG.</div>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-9 gap-2 mb-2 items-center">
              <div className="text-blue-600 font-semibold">1</div>
              <div className="text-blue-600 font-semibold">HV</div>
              <div className="text-blue-600 font-semibold">LV</div>
              <div className="text-blue-600 font-semibold">-</div>
              <Input
                value={formData.hvLvCurrentAvg}
                onChange={(e) => handleInputChange('hvLvCurrentAvg', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <Input
                value={formData.hvLvWattAvg}
                onChange={(e) => handleInputChange('hvLvWattAvg', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <Input
                value={formData.hvLvPowerFactorAvg}
                onChange={(e) => handleInputChange('hvLvPowerFactorAvg', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <Input
                value={formData.hvLvPowerFactorCor20}
                onChange={(e) => handleInputChange('hvLvPowerFactorCor20', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <div className="text-center text-blue-600">{formData.hvLvRemark}</div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-9 gap-2 mb-2 items-center">
              <div className="text-blue-600 font-semibold">2</div>
              <div className="text-blue-600 font-semibold">HV</div>
              <div className="text-blue-600 font-semibold">-</div>
              <div className="text-blue-600 font-semibold">LV</div>
              <Input
                value={formData.hvGuCurrentAvg}
                onChange={(e) => handleInputChange('hvGuCurrentAvg', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <Input
                value={formData.hvGuWattAvg}
                onChange={(e) => handleInputChange('hvGuWattAvg', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <Input
                value={formData.hvGuPowerFactorAvg}
                onChange={(e) => handleInputChange('hvGuPowerFactorAvg', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <Input
                value={formData.hvGuPowerFactorCor20}
                onChange={(e) => handleInputChange('hvGuPowerFactorCor20', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <div className="text-center text-blue-600">{formData.hvGuRemark}</div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-9 gap-2 mb-2 items-center">
              <div className="text-blue-600 font-semibold">3</div>
              <div className="text-blue-600 font-semibold">LV</div>
              <div className="text-blue-600 font-semibold">HV</div>
              <div className="text-blue-600 font-semibold">-</div>
              <Input
                value={formData.lvHvCurrentAvg}
                onChange={(e) => handleInputChange('lvHvCurrentAvg', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <Input
                value={formData.lvHvWattAvg}
                onChange={(e) => handleInputChange('lvHvWattAvg', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <Input
                value={formData.lvHvPowerFactorAvg}
                onChange={(e) => handleInputChange('lvHvPowerFactorAvg', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <Input
                value={formData.lvHvPowerFactorCor20}
                onChange={(e) => handleInputChange('lvHvPowerFactorCor20', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <div className="text-center text-blue-600">{formData.lvHvRemark}</div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-9 gap-2 mb-2 items-center">
              <div className="text-blue-600 font-semibold">4</div>
              <div className="text-blue-600 font-semibold">LV</div>
              <div className="text-blue-600 font-semibold">-</div>
              <div className="text-blue-600 font-semibold">HV</div>
              <Input
                value={formData.lvGuCurrentAvg}
                onChange={(e) => handleInputChange('lvGuCurrentAvg', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <Input
                value={formData.lvGuWattAvg}
                onChange={(e) => handleInputChange('lvGuWattAvg', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <Input
                value={formData.lvGuPowerFactorAvg}
                onChange={(e) => handleInputChange('lvGuPowerFactorAvg', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <Input
                value={formData.lvGuPowerFactorCor20}
                onChange={(e) => handleInputChange('lvGuPowerFactorCor20', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <div className="text-center text-blue-600">{formData.lvGuRemark}</div>
            </div>

            {/* CALCULATED RESULT */}
            <div className="grid grid-cols-9 gap-2 mt-4 items-center">
              <div className="text-blue-600 font-semibold">CALCULATED RESULT</div>
              <div></div>
              <div></div>
              <div></div>
              <Input
                value={formData.calculatedCurrent1}
                onChange={(e) => handleInputChange('calculatedCurrent1', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <Input
                value={formData.calculatedWatt1}
                onChange={(e) => handleInputChange('calculatedWatt1', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <div></div>
              <div></div>
              <div></div>
            </div>

            <div className="grid grid-cols-9 gap-2 items-center">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <Input
                value={formData.calculatedCurrent2}
                onChange={(e) => handleInputChange('calculatedCurrent2', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <Input
                value={formData.calculatedWatt2}
                onChange={(e) => handleInputChange('calculatedWatt2', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <div></div>
              <div></div>
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

export default TwoWindingInsulationMeasurementModal;
