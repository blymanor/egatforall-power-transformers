
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

interface ThreeWindingInsulationMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'view' | 'edit';
  data?: any;
}

const ThreeWindingInsulationMeasurementModal = ({ isOpen, onClose, mode, data }: ThreeWindingInsulationMeasurementModalProps) => {
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
    hvLvTvVdc: mode === 'create' ? '' : (data?.hvLvTvVdc || ''),
    hvLvTvAt1Min: mode === 'create' ? '0.0' : (data?.hvLvTvAt1Min || '0.0'),
    hvLvTvAt10Min: mode === 'create' ? '0.0' : (data?.hvLvTvAt10Min || '0.0'),
    hvLvTvPI: mode === 'create' ? '0.0' : (data?.hvLvTvPI || '0.0'),
    lvHvTvVdc: mode === 'create' ? '' : (data?.lvHvTvVdc || ''),
    lvHvTvAt1Min: mode === 'create' ? '0.0' : (data?.lvHvTvAt1Min || '0.0'),
    lvHvTvAt10Min: mode === 'create' ? '0.0' : (data?.lvHvTvAt10Min || '0.0'),
    lvHvTvPI: mode === 'create' ? '0.0' : (data?.lvHvTvPI || '0.0'),
    tvHvLvVdc: mode === 'create' ? '' : (data?.tvHvLvVdc || ''),
    tvHvLvAt1Min: mode === 'create' ? '0.0' : (data?.tvHvLvAt1Min || '0.0'),
    tvHvLvAt10Min: mode === 'create' ? '0.0' : (data?.tvHvLvAt10Min || '0.0'),
    tvHvLvPI: mode === 'create' ? '0.0' : (data?.tvHvLvPI || '0.0'),
    // Insulation Power Factor and Capacitance Measurement
    cor20C: mode === 'create' ? '' : (data?.cor20C || ''),
    testKv: mode === 'create' ? '' : (data?.testKv || ''),
    // Measurement rows data
    measurements: [
      { en: 'HV', gr: 'LV', gu: 'TV', current: '0.0', watt: '0.0', powerFactor: '0.0', powerFactorCor: '0.0', cap: '', remark: 'CHV+C' },
      { en: 'HV', gr: '-', gu: 'LV+TV', current: '0.0', watt: '0.0', powerFactor: '0.0', powerFactorCor: '0.0', cap: '', remark: 'CHV+CH' },
      { en: 'LV', gr: 'HV', gu: 'HV', current: '0.0', watt: '0.0', powerFactor: '0.0', powerFactorCor: '0.0', cap: '', remark: 'CH' },
      { en: 'LV', gr: '-', gu: 'HV+TV', current: '0.0', watt: '0.0', powerFactor: '0.0', powerFactorCor: '0.0', cap: '', remark: 'CLT+CL' },
      { en: 'TV', gr: 'HV', gu: 'LV', current: '0.0', watt: '0.0', powerFactor: '0.0', powerFactorCor: '0.0', cap: '', remark: 'CL' },
      { en: 'TV', gr: '-', gu: 'HV+LV', current: '0.0', watt: '0.0', powerFactor: '0.0', powerFactorCor: '0.0', cap: '', remark: 'CT+CHTL' }
    ],
    // Calculated Results
    calculatedResults: [
      { current: '0.0', watt: '0.0', remark: 'CHT(1-2)' },
      { current: '0.0', watt: '0.0', remark: 'CLT(3-4)' },
      { current: '0.0', watt: '0.0', remark: 'CTH(5-6)' }
    ]
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMeasurementChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      measurements: prev.measurements.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleCalculatedResultChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      calculatedResults: prev.calculatedResults.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleCalculate = () => {
    toast.success("คำนวณเสร็จสิ้น", {
      description: "ระบบได้คำนวณค่า Three Winding Insulation Measurement แล้ว",
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
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
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
              <div className="text-blue-600 font-semibold">LV+TV</div>
              <Input
                value={formData.hvLvTvVdc}
                onChange={(e) => handleInputChange('hvLvTvVdc', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.hvLvTvAt1Min}
                onChange={(e) => handleInputChange('hvLvTvAt1Min', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.hvLvTvAt10Min}
                onChange={(e) => handleInputChange('hvLvTvAt10Min', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.hvLvTvPI}
                onChange={(e) => handleInputChange('hvLvTvPI', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-7 gap-4 mb-2 items-center">
              <div className="text-blue-600 font-semibold">2</div>
              <div className="text-blue-600 font-semibold">LV</div>
              <div className="text-blue-600 font-semibold">HV+TV</div>
              <Input
                value={formData.lvHvTvVdc}
                onChange={(e) => handleInputChange('lvHvTvVdc', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.lvHvTvAt1Min}
                onChange={(e) => handleInputChange('lvHvTvAt1Min', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.lvHvTvAt10Min}
                onChange={(e) => handleInputChange('lvHvTvAt10Min', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.lvHvTvPI}
                onChange={(e) => handleInputChange('lvHvTvPI', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-7 gap-4 mb-4 items-center">
              <div className="text-blue-600 font-semibold">3</div>
              <div className="text-blue-600 font-semibold">TV</div>
              <div className="text-blue-600 font-semibold">HV+LV</div>
              <Input
                value={formData.tvHvLvVdc}
                onChange={(e) => handleInputChange('tvHvLvVdc', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.tvHvLvAt1Min}
                onChange={(e) => handleInputChange('tvHvLvAt1Min', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.tvHvLvAt10Min}
                onChange={(e) => handleInputChange('tvHvLvAt10Min', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.tvHvLvPI}
                onChange={(e) => handleInputChange('tvHvLvPI', e.target.value)}
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

            {/* Measurement Rows */}
            {formData.measurements.map((measurement, index) => (
              <div key={index} className="grid grid-cols-9 gap-2 mb-2 items-center">
                <div className="text-blue-600 font-semibold">{index + 1}</div>
                <div className="text-blue-600 font-semibold">{measurement.en}</div>
                <div className="text-blue-600 font-semibold">{measurement.gr}</div>
                <div className="text-blue-600 font-semibold">{measurement.gu}</div>
                <Input
                  value={measurement.current}
                  onChange={(e) => handleMeasurementChange(index, 'current', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={measurement.watt}
                  onChange={(e) => handleMeasurementChange(index, 'watt', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={measurement.powerFactor}
                  onChange={(e) => handleMeasurementChange(index, 'powerFactor', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={measurement.powerFactorCor}
                  onChange={(e) => handleMeasurementChange(index, 'powerFactorCor', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <div className="text-center text-blue-600">{measurement.remark}</div>
              </div>
            ))}

            {/* CALCULATED RESULT */}
            <div className="grid grid-cols-9 gap-2 mt-4 items-center">
              <div className="text-blue-600 font-semibold">CALCULATED RESULT</div>
              <div></div>
              <div></div>
              <div></div>
              <Input
                value={formData.calculatedResults[0].current}
                onChange={(e) => handleCalculatedResultChange(0, 'current', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <Input
                value={formData.calculatedResults[0].watt}
                onChange={(e) => handleCalculatedResultChange(0, 'watt', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <div></div>
              <div></div>
              <div className="text-center text-blue-600">{formData.calculatedResults[0].remark}</div>
            </div>

            <div className="grid grid-cols-9 gap-2 items-center">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <Input
                value={formData.calculatedResults[1].current}
                onChange={(e) => handleCalculatedResultChange(1, 'current', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <Input
                value={formData.calculatedResults[1].watt}
                onChange={(e) => handleCalculatedResultChange(1, 'watt', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <div></div>
              <div></div>
              <div className="text-center text-blue-600">{formData.calculatedResults[1].remark}</div>
            </div>

            <div className="grid grid-cols-9 gap-2 items-center">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <Input
                value={formData.calculatedResults[2].current}
                onChange={(e) => handleCalculatedResultChange(2, 'current', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <Input
                value={formData.calculatedResults[2].watt}
                onChange={(e) => handleCalculatedResultChange(2, 'watt', e.target.value)}
                readOnly={isReadOnly}
                className="text-center h-8"
              />
              <div></div>
              <div></div>
              <div className="text-center text-blue-600">{formData.calculatedResults[2].remark}</div>
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

export default ThreeWindingInsulationMeasurementModal;
