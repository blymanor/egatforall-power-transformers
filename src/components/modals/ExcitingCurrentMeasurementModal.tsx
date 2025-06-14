
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

interface ExcitingCurrentMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'view' | 'edit';
  data?: any;
}

const ExcitingCurrentMeasurementModal = ({ isOpen, onClose, mode, data }: ExcitingCurrentMeasurementModalProps) => {
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
    // HV Winding AC(VOLT) section
    hvMinVoltage: mode === 'create' ? '0.0' : (data?.hvMinVoltage || '0.0'),
    hvNVoltage: mode === 'create' ? '0.0' : (data?.hvNVoltage || '0.0'),
    hv2RVoltage: mode === 'create' ? '0.0' : (data?.hv2RVoltage || '0.0'),
    hvMaxVoltage: mode === 'create' ? '0.0' : (data?.hvMaxVoltage || '0.0'),
    // HV Winding AC(mA) sections
    hvMinCurrentH1H0: mode === 'create' ? '0.0' : (data?.hvMinCurrentH1H0 || '0.0'),
    hvMinCurrentH2H0: mode === 'create' ? '0.0' : (data?.hvMinCurrentH2H0 || '0.0'),
    hvMinCurrentH2H3: mode === 'create' ? '0.0' : (data?.hvMinCurrentH2H3 || '0.0'),
    hvNCurrentH1H0: mode === 'create' ? '0.0' : (data?.hvNCurrentH1H0 || '0.0'),
    hvNCurrentH2H0: mode === 'create' ? '0.0' : (data?.hvNCurrentH2H0 || '0.0'),
    hvNCurrentH2H3: mode === 'create' ? '0.0' : (data?.hvNCurrentH2H3 || '0.0'),
    hv2RCurrentH1H0: mode === 'create' ? '0.0' : (data?.hv2RCurrentH1H0 || '0.0'),
    hv2RCurrentH2H0: mode === 'create' ? '0.0' : (data?.hv2RCurrentH2H0 || '0.0'),
    hv2RCurrentH2H3: mode === 'create' ? '0.0' : (data?.hv2RCurrentH2H3 || '0.0'),
    hvMaxCurrentH1H0: mode === 'create' ? '0.0' : (data?.hvMaxCurrentH1H0 || '0.0'),
    hvMaxCurrentH2H0: mode === 'create' ? '0.0' : (data?.hvMaxCurrentH2H0 || '0.0'),
    hvMaxCurrentH2H3: mode === 'create' ? '0.0' : (data?.hvMaxCurrentH2H3 || '0.0'),
    // LV Winding sections
    lvNCurrentX1X0: mode === 'create' ? '0.0' : (data?.lvNCurrentX1X0 || '0.0'),
    lvNCurrentX2X0: mode === 'create' ? '0.0' : (data?.lvNCurrentX2X0 || '0.0'),
    lvNCurrentX2X3: mode === 'create' ? '0.0' : (data?.lvNCurrentX2X3 || '0.0'),
    // TV Winding sections  
    tvNCurrentY1Y0: mode === 'create' ? '0.0' : (data?.tvNCurrentY1Y0 || '0.0'),
    tvNCurrentY2Y3: mode === 'create' ? '0.0' : (data?.tvNCurrentY2Y3 || '0.0'),
    // HV AC(kV) section
    hvACkVCurrentH1H0: mode === 'create' ? '0.0' : (data?.hvACkVCurrentH1H0 || '0.0'),
    hvACkVCurrentH2H0: mode === 'create' ? '0.0' : (data?.hvACkVCurrentH2H0 || '0.0'),
    hvACkVCurrentH2H3: mode === 'create' ? '0.0' : (data?.hvACkVCurrentH2H3 || '0.0'),
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = () => {
    toast.success("คำนวณเสร็จสิ้น", {
      description: "ระบบได้คำนวณค่า Exciting Current แล้ว",
    });
  };

  const handleSave = () => {
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: "ข้อมูล Exciting Current Measurement ถูกบันทึกแล้ว",
    });
    onClose();
  };

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            {mode === 'create' ? 'เพิ่มข้อมูล' : mode === 'edit' ? 'แก้ไขข้อมูล' : 'แสดงข้อมูล'} Exciting Current Measurement
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
            <div className="grid grid-cols-5 gap-4 mb-4 text-center">
              <div></div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : H1H0/H1H2</div>
                <div>AC(mA)</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : H2H0/H2H3</div>
                <div>AC(mA)</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : H2H0/H2H3</div>
                <div>AC(mA)</div>
              </div>
              <div className="text-blue-600 font-semibold">REMARK</div>
            </div>

            {/* AC(VOLT) row */}
            <div className="grid grid-cols-5 gap-4 mb-2 items-center">
              <div className="text-blue-600 font-semibold">AC(VOLT)</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            {/* MIN row */}
            <div className="grid grid-cols-5 gap-4 mb-2 items-center">
              <div className="text-blue-600 font-semibold">MIN</div>
              <Input
                value={formData.hvMinCurrentH1H0}
                onChange={(e) => handleInputChange('hvMinCurrentH1H0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.hvMinCurrentH2H0}
                onChange={(e) => handleInputChange('hvMinCurrentH2H0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.hvMinCurrentH2H3}
                onChange={(e) => handleInputChange('hvMinCurrentH2H3', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <div></div>
            </div>

            {/* N row */}
            <div className="grid grid-cols-5 gap-4 mb-2 items-center">
              <div className="text-red-600 font-semibold">N</div>
              <Input
                value={formData.hvNCurrentH1H0}
                onChange={(e) => handleInputChange('hvNCurrentH1H0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.hvNCurrentH2H0}
                onChange={(e) => handleInputChange('hvNCurrentH2H0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.hvNCurrentH2H3}
                onChange={(e) => handleInputChange('hvNCurrentH2H3', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <div></div>
            </div>

            {/* 2R row */}
            <div className="grid grid-cols-5 gap-4 mb-2 items-center">
              <div className="text-blue-600 font-semibold">2R</div>
              <Input
                value={formData.hv2RCurrentH1H0}
                onChange={(e) => handleInputChange('hv2RCurrentH1H0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.hv2RCurrentH2H0}
                onChange={(e) => handleInputChange('hv2RCurrentH2H0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.hv2RCurrentH2H3}
                onChange={(e) => handleInputChange('hv2RCurrentH2H3', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <div></div>
            </div>

            {/* MAX row */}
            <div className="grid grid-cols-5 gap-4 mb-4 items-center">
              <div className="text-blue-600 font-semibold">MAX</div>
              <Input
                value={formData.hvMaxCurrentH1H0}
                onChange={(e) => handleInputChange('hvMaxCurrentH1H0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.hvMaxCurrentH2H0}
                onChange={(e) => handleInputChange('hvMaxCurrentH2H0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.hvMaxCurrentH2H3}
                onChange={(e) => handleInputChange('hvMaxCurrentH2H3', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <div></div>
            </div>
          </div>

          {/* LV WINDING Section */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">LV...WDG.</h3>
            
            {/* Headers */}
            <div className="grid grid-cols-5 gap-4 mb-4 text-center">
              <div></div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : X1X0/X1X2</div>
                <div>AC(mA)</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : X2X0/X2X3</div>
                <div>AC(mA)</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : X2X0/X2X3</div>
                <div>AC(mA)</div>
              </div>
              <div className="text-blue-600 font-semibold">REMARK</div>
            </div>

            {/* AC(VOLT) row */}
            <div className="grid grid-cols-5 gap-4 mb-2 items-center">
              <div className="text-blue-600 font-semibold">AC(VOLT)</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            {/* N row */}
            <div className="grid grid-cols-5 gap-4 mb-4 items-center">
              <div className="text-red-600 font-semibold">N</div>
              <Input
                value={formData.lvNCurrentX1X0}
                onChange={(e) => handleInputChange('lvNCurrentX1X0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.lvNCurrentX2X0}
                onChange={(e) => handleInputChange('lvNCurrentX2X0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.lvNCurrentX2X3}
                onChange={(e) => handleInputChange('lvNCurrentX2X3', e.target.value)}
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
            <div className="grid grid-cols-5 gap-4 mb-4 text-center">
              <div></div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : Y1Y0/Y1Y2</div>
                <div>AC(mA)</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : Y2Y3</div>
                <div>AC(mA)</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : Y2Y3</div>
                <div>AC(mA)</div>
              </div>
              <div className="text-blue-600 font-semibold">REMARK</div>
            </div>

            {/* AC(VOLT) row */}
            <div className="grid grid-cols-5 gap-4 mb-2 items-center">
              <div className="text-blue-600 font-semibold">AC(VOLT)</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            {/* N row */}
            <div className="grid grid-cols-5 gap-4 mb-4 items-center">
              <div className="text-red-600 font-semibold">N</div>
              <Input
                value={formData.tvNCurrentY1Y0}
                onChange={(e) => handleInputChange('tvNCurrentY1Y0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.tvNCurrentY2Y3}
                onChange={(e) => handleInputChange('tvNCurrentY2Y3', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <div></div>
              <div></div>
            </div>
          </div>

          {/* HV AC(kV) Section */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">HV...WDG.</h3>
            
            {/* Headers */}
            <div className="grid grid-cols-5 gap-4 mb-4 text-center">
              <div></div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : H1H0/H1H2</div>
                <div>AC(mA)</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : H2H0/H2H3</div>
                <div>AC(mA)</div>
              </div>
              <div className="text-blue-600 font-semibold">
                <div>TERMINAL : H2H0/H2H3</div>
                <div>AC(mA)</div>
              </div>
              <div className="text-blue-600 font-semibold">REMARK</div>
            </div>

            {/* AC(kV) row */}
            <div className="grid grid-cols-5 gap-4 mb-2 items-center">
              <div className="text-blue-600 font-semibold">AC(kV)</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            {/* N row */}
            <div className="grid grid-cols-5 gap-4 mb-4 items-center">
              <div className="text-red-600 font-semibold">N</div>
              <Input
                value={formData.hvACkVCurrentH1H0}
                onChange={(e) => handleInputChange('hvACkVCurrentH1H0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.hvACkVCurrentH2H0}
                onChange={(e) => handleInputChange('hvACkVCurrentH2H0', e.target.value)}
                readOnly={isReadOnly}
                className="text-center"
              />
              <Input
                value={formData.hvACkVCurrentH2H3}
                onChange={(e) => handleInputChange('hvACkVCurrentH2H3', e.target.value)}
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

export default ExcitingCurrentMeasurementModal;
