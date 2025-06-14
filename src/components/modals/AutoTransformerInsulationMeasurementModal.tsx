
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

interface AutoTransformerInsulationMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'view' | 'edit';
  data?: any;
}

const AutoTransformerInsulationMeasurementModal = ({ isOpen, onClose, mode, data }: AutoTransformerInsulationMeasurementModalProps) => {
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
    // INSULATION RESISTANCE MEASUREMENT
    insulation1Voltage: mode === 'create' ? '0.0' : (data?.insulation1Voltage || '0.0'),
    insulation1At1Min: mode === 'create' ? '0.0' : (data?.insulation1At1Min || '0.0'),
    insulation1At10Min: mode === 'create' ? '0.0' : (data?.insulation1At10Min || '0.0'),
    insulation1PI: mode === 'create' ? '0.0' : (data?.insulation1PI || '0.0'),
    insulation2Voltage: mode === 'create' ? '0.0' : (data?.insulation2Voltage || '0.0'),
    insulation2At1Min: mode === 'create' ? '0.0' : (data?.insulation2At1Min || '0.0'),
    insulation2At10Min: mode === 'create' ? '0.0' : (data?.insulation2At10Min || '0.0'),
    insulation2PI: mode === 'create' ? '0.0' : (data?.insulation2PI || '0.0'),
    // INSULATION POWER FACTOR AND CAPACITANCE MEASUREMENT
    test1Current: mode === 'create' ? '0.0' : (data?.test1Current || '0.0'),
    test1Watt: mode === 'create' ? '0.0' : (data?.test1Watt || '0.0'),
    test1PowerFactor: mode === 'create' ? '0.0' : (data?.test1PowerFactor || '0.0'),
    test1PowerFactorCor20: mode === 'create' ? '0.0' : (data?.test1PowerFactorCor20 || '0.0'),
    test1Capacitance: mode === 'create' ? '0.0' : (data?.test1Capacitance || '0.0'),
    test1Remark: mode === 'create' ? 'CH+CHT' : (data?.test1Remark || 'CH+CHT'),
    test2Current: mode === 'create' ? '0.0' : (data?.test2Current || '0.0'),
    test2Watt: mode === 'create' ? '0.0' : (data?.test2Watt || '0.0'),
    test2PowerFactor: mode === 'create' ? '0.0' : (data?.test2PowerFactor || '0.0'),
    test2PowerFactorCor20: mode === 'create' ? '0.0' : (data?.test2PowerFactorCor20 || '0.0'),
    test2Capacitance: mode === 'create' ? '0.0' : (data?.test2Capacitance || '0.0'),
    test2Remark: mode === 'create' ? 'CH+CHT' : (data?.test2Remark || 'CH+CHT'),
    test3Current: mode === 'create' ? '0.0' : (data?.test3Current || '0.0'),
    test3Watt: mode === 'create' ? '0.0' : (data?.test3Watt || '0.0'),
    test3PowerFactor: mode === 'create' ? '0.0' : (data?.test3PowerFactor || '0.0'),
    test3PowerFactorCor20: mode === 'create' ? '0.0' : (data?.test3PowerFactorCor20 || '0.0'),
    test3Capacitance: mode === 'create' ? '0.0' : (data?.test3Capacitance || '0.0'),
    test3Remark: mode === 'create' ? 'CH' : (data?.test3Remark || 'CH'),
    test4Current: mode === 'create' ? '0.0' : (data?.test4Current || '0.0'),
    test4Watt: mode === 'create' ? '0.0' : (data?.test4Watt || '0.0'),
    test4PowerFactor: mode === 'create' ? '0.0' : (data?.test4PowerFactor || '0.0'),
    test4PowerFactorCor20: mode === 'create' ? '0.0' : (data?.test4PowerFactorCor20 || '0.0'),
    test4Capacitance: mode === 'create' ? '0.0' : (data?.test4Capacitance || '0.0'),
    test4Remark: mode === 'create' ? 'CT +CHT' : (data?.test4Remark || 'CT +CHT'),
    calculatedResult1Current: mode === 'create' ? '0.0' : (data?.calculatedResult1Current || '0.0'),
    calculatedResult1Watt: mode === 'create' ? '0.0' : (data?.calculatedResult1Watt || '0.0'),
    calculatedResult1PowerFactor: mode === 'create' ? '0.0' : (data?.calculatedResult1PowerFactor || '0.0'),
    calculatedResult1PowerFactorCor20: mode === 'create' ? '0.0' : (data?.calculatedResult1PowerFactorCor20 || '0.0'),
    calculatedResult1Capacitance: mode === 'create' ? '0.0' : (data?.calculatedResult1Capacitance || '0.0'),
    calculatedResult1Remark: mode === 'create' ? 'CHT(3-2)' : (data?.calculatedResult1Remark || 'CHT(3-2)'),
    calculatedResult2Current: mode === 'create' ? '0.0' : (data?.calculatedResult2Current || '0.0'),
    calculatedResult2Watt: mode === 'create' ? '0.0' : (data?.calculatedResult2Watt || '0.0'),
    calculatedResult2PowerFactor: mode === 'create' ? '0.0' : (data?.calculatedResult2PowerFactor || '0.0'),
    calculatedResult2PowerFactorCor20: mode === 'create' ? '0.0' : (data?.calculatedResult2PowerFactorCor20 || '0.0'),
    calculatedResult2Capacitance: mode === 'create' ? '0.0' : (data?.calculatedResult2Capacitance || '0.0'),
    calculatedResult2Remark: mode === 'create' ? 'CTH(3-4)' : (data?.calculatedResult2Remark || 'CTH(3-4)'),
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = () => {
    toast.success("คำนวณเสร็จสิ้น", {
      description: "ระบบได้คำนวณค่า Auto Transformer Insulation แล้ว",
    });
  };

  const handleSave = () => {
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: "ข้อมูล Auto Transformer Insulation Measurement ถูกบันทึกแล้ว",
    });
    onClose();
  };

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            {mode === 'create' ? 'เพิ่มข้อมูล' : mode === 'edit' ? 'แก้ไขข้อมูล' : 'แสดงข้อมูล'} Auto Transformer Insulation Measurement
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

          {/* INSULATION RESISTANCE MEASUREMENT */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">INSULATION RESISTANCE MEASUREMENT</h3>
            
            {/* Headers */}
            <div className="grid grid-cols-6 gap-4 mb-4 text-center">
              <div className="text-blue-600 font-semibold">TEST CONNECTIONS</div>
              <div className="text-blue-600 font-semibold">TEST</div>
              <div className="text-blue-600 font-semibold">
                <div>MΩ</div>
                <div className="text-sm">at 1<sup>st</sup>Min</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>at 10<sup>th</sup>Min</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>PI = MΩ at 10<sup>th</sup>Min/MΩ at 1<sup>st</sup>Min</div>
              </div>
              <div></div>
            </div>

            {/* Data rows */}
            <div className="grid grid-cols-6 gap-4 mb-2 items-center">
              <div className="space-y-1">
                <div className="text-blue-600 font-semibold">No.</div>
                <div className="text-blue-600 font-semibold">1</div>
                <div className="text-blue-600 font-semibold">2</div>
              </div>
              <div className="space-y-1">
                <div className="text-blue-600 font-semibold">Vdc.</div>
                <Input
                  value={formData.insulation1Voltage}
                  onChange={(e) => handleInputChange('insulation1Voltage', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-sm"
                />
                <Input
                  value={formData.insulation2Voltage}
                  onChange={(e) => handleInputChange('insulation2Voltage', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-sm"
                />
              </div>
              <div className="space-y-1">
                <div></div>
                <Input
                  value={formData.insulation1At1Min}
                  onChange={(e) => handleInputChange('insulation1At1Min', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-sm"
                />
                <Input
                  value={formData.insulation2At1Min}
                  onChange={(e) => handleInputChange('insulation2At1Min', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-sm"
                />
              </div>
              <div className="space-y-1">
                <div></div>
                <Input
                  value={formData.insulation1At10Min}
                  onChange={(e) => handleInputChange('insulation1At10Min', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-sm"
                />
                <Input
                  value={formData.insulation2At10Min}
                  onChange={(e) => handleInputChange('insulation2At10Min', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-sm"
                />
              </div>
              <div className="space-y-1">
                <div></div>
                <Input
                  value={formData.insulation1PI}
                  onChange={(e) => handleInputChange('insulation1PI', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-sm"
                />
                <Input
                  value={formData.insulation2PI}
                  onChange={(e) => handleInputChange('insulation2PI', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center text-sm"
                />
              </div>
              <div className="space-y-1">
                <div></div>
                <div className="text-center text-sm font-semibold text-blue-600">HV-LV</div>
                <div className="text-center text-sm font-semibold text-blue-600">TV</div>
              </div>
            </div>
          </div>

          {/* INSULATION POWER FACTOR AND CAPACITANCE MEASUREMENT */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">INSULATION POWER FACTOR AND CAPACITANCE MEASUREMENT</h3>
            
            <div className="text-sm mb-2">COR 20 °C</div>
            
            {/* Headers */}
            <div className="grid grid-cols-7 gap-2 mb-4 text-center text-sm">
              <div className="text-blue-600 font-semibold">TEST CONNECTIONS</div>
              <div className="text-blue-600 font-semibold">
                <div>CURRENT(mA)</div>
                <div>AVG.</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>WATT</div>
                <div>AVG.</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>%POWER FACTOR</div>
                <div>AVG.</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>COR 20 °C</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>CAP(pF)</div>
                <div>AVG.</div>
              </div>
              <div className="text-blue-600 font-semibold">REMARK</div>
            </div>

            {/* Data rows */}
            <div className="space-y-2">
              {/* Row headers */}
              <div className="grid grid-cols-7 gap-2 items-center text-sm">
                <div className="space-y-1">
                  <div className="text-blue-600 font-semibold">No.</div>
                  <div className="text-blue-600 font-semibold">1</div>
                  <div className="text-blue-600 font-semibold">2</div>
                  <div className="text-blue-600 font-semibold">3</div>
                  <div className="text-blue-600 font-semibold">4</div>
                  <div className="text-blue-600 font-semibold">CALCULATED RESULT</div>
                </div>
                <div className="space-y-1">
                  <div className="text-blue-600 font-semibold">EN.</div>
                  <div className="text-blue-600 font-semibold">HV-LV</div>
                  <div className="text-blue-600 font-semibold">HV-LV</div>
                  <div className="text-blue-600 font-semibold">TV</div>
                  <div className="text-blue-600 font-semibold">TV</div>
                  <div className="text-xs">0.0<br/>0.0</div>
                </div>
                <div className="space-y-1">
                  <div className="text-blue-600 font-semibold">GR.</div>
                  <div className="text-blue-600 font-semibold">TV</div>
                  <div className="text-blue-600 font-semibold">-</div>
                  <div className="text-blue-600 font-semibold">HV-LV</div>
                  <div className="text-blue-600 font-semibold">-</div>
                  <div className="text-xs">0.0<br/>0.0</div>
                </div>
                <div className="space-y-1">
                  <div className="text-blue-600 font-semibold">GU.</div>
                  <div className="text-blue-600 font-semibold">-</div>
                  <div className="text-blue-600 font-semibold">TV</div>
                  <div className="text-blue-600 font-semibold">-</div>
                  <div className="text-blue-600 font-semibold">HV-LV</div>
                  <div className="text-xs">0.0<br/>0.0</div>
                </div>
                <div className="space-y-1">
                  <div></div>
                  <Input
                    value={formData.test1Current}
                    onChange={(e) => handleInputChange('test1Current', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                  <Input
                    value={formData.test2Current}
                    onChange={(e) => handleInputChange('test2Current', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                  <Input
                    value={formData.test3Current}
                    onChange={(e) => handleInputChange('test3Current', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                  <Input
                    value={formData.test4Current}
                    onChange={(e) => handleInputChange('test4Current', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                  <div className="space-y-1">
                    <Input
                      value={formData.calculatedResult1Current}
                      onChange={(e) => handleInputChange('calculatedResult1Current', e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center text-xs"
                    />
                    <Input
                      value={formData.calculatedResult2Current}
                      onChange={(e) => handleInputChange('calculatedResult2Current', e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center text-xs"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div></div>
                  <Input
                    value={formData.test1Watt}
                    onChange={(e) => handleInputChange('test1Watt', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                  <Input
                    value={formData.test2Watt}
                    onChange={(e) => handleInputChange('test2Watt', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                  <Input
                    value={formData.test3Watt}
                    onChange={(e) => handleInputChange('test3Watt', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                  <Input
                    value={formData.test4Watt}
                    onChange={(e) => handleInputChange('test4Watt', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                  <div className="space-y-1">
                    <Input
                      value={formData.calculatedResult1Watt}
                      onChange={(e) => handleInputChange('calculatedResult1Watt', e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center text-xs"
                    />
                    <Input
                      value={formData.calculatedResult2Watt}
                      onChange={(e) => handleInputChange('calculatedResult2Watt', e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center text-xs"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div></div>
                  <div className="space-y-1">
                    <Input
                      value={formData.test1PowerFactor}
                      onChange={(e) => handleInputChange('test1PowerFactor', e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center text-xs"
                    />
                    <Input
                      value={formData.test1PowerFactorCor20}
                      onChange={(e) => handleInputChange('test1PowerFactorCor20', e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Input
                      value={formData.test2PowerFactor}
                      onChange={(e) => handleInputChange('test2PowerFactor', e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center text-xs"
                    />
                    <Input
                      value={formData.test2PowerFactorCor20}
                      onChange={(e) => handleInputChange('test2PowerFactorCor20', e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Input
                      value={formData.test3PowerFactor}
                      onChange={(e) => handleInputChange('test3PowerFactor', e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center text-xs"
                    />
                    <Input
                      value={formData.test3PowerFactorCor20}
                      onChange={(e) => handleInputChange('test3PowerFactorCor20', e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Input
                      value={formData.test4PowerFactor}
                      onChange={(e) => handleInputChange('test4PowerFactor', e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center text-xs"
                    />
                    <Input
                      value={formData.test4PowerFactorCor20}
                      onChange={(e) => handleInputChange('test4PowerFactorCor20', e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="space-y-1">
                      <Input
                        value={formData.calculatedResult1PowerFactor}
                        onChange={(e) => handleInputChange('calculatedResult1PowerFactor', e.target.value)}
                        readOnly={isReadOnly}
                        className="text-center text-xs"
                      />
                      <Input
                        value={formData.calculatedResult1PowerFactorCor20}
                        onChange={(e) => handleInputChange('calculatedResult1PowerFactorCor20', e.target.value)}
                        readOnly={isReadOnly}
                        className="text-center text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Input
                        value={formData.calculatedResult2PowerFactor}
                        onChange={(e) => handleInputChange('calculatedResult2PowerFactor', e.target.value)}
                        readOnly={isReadOnly}
                        className="text-center text-xs"
                      />
                      <Input
                        value={formData.calculatedResult2PowerFactorCor20}
                        onChange={(e) => handleInputChange('calculatedResult2PowerFactorCor20', e.target.value)}
                        readOnly={isReadOnly}
                        className="text-center text-xs"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div></div>
                  <Input
                    value={formData.test1Capacitance}
                    onChange={(e) => handleInputChange('test1Capacitance', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                  <Input
                    value={formData.test2Capacitance}
                    onChange={(e) => handleInputChange('test2Capacitance', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                  <Input
                    value={formData.test3Capacitance}
                    onChange={(e) => handleInputChange('test3Capacitance', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                  <Input
                    value={formData.test4Capacitance}
                    onChange={(e) => handleInputChange('test4Capacitance', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center text-xs"
                  />
                  <div className="space-y-1">
                    <Input
                      value={formData.calculatedResult1Capacitance}
                      onChange={(e) => handleInputChange('calculatedResult1Capacitance', e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center text-xs"
                    />
                    <Input
                      value={formData.calculatedResult2Capacitance}
                      onChange={(e) => handleInputChange('calculatedResult2Capacitance', e.target.value)}
                      readOnly={isReadOnly}
                      className="text-center text-xs"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div></div>
                  <div className="text-center text-xs">{formData.test1Remark}</div>
                  <div className="text-center text-xs">{formData.test2Remark}</div>
                  <div className="text-center text-xs">{formData.test3Remark}</div>
                  <div className="text-center text-xs">{formData.test4Remark}</div>
                  <div className="space-y-1">
                    <div className="text-center text-xs">{formData.calculatedResult1Remark}</div>
                    <div className="text-center text-xs">{formData.calculatedResult2Remark}</div>
                  </div>
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

export default AutoTransformerInsulationMeasurementModal;
