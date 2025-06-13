
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

interface AutoTransformerInsulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'view' | 'edit';
  data?: any;
}

const AutoTransformerInsulationModal = ({ isOpen, onClose, mode, data }: AutoTransformerInsulationModalProps) => {
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
    // HV Winding data
    hvH1H0H1H2: { acVolt: '0.0', acCurrent: '0.0' },
    hvH2H0H2H3: { acVolt: '0.0', acCurrent: '0.0' },
    hvH2H0H2H3_2: { acVolt: '0.0', acCurrent: '0.0' },
    hvRemark: '',
    // LV Winding data  
    lvX1X0X1X2: { acVolt: '0.0', acCurrent: '0.0' },
    lvX2X0X2X3: { acVolt: '0.0', acCurrent: '0.0' },
    lvX2X0X2X3_2: { acVolt: '0.0', acCurrent: '0.0' },
    lvRemark: '',
    // TV Winding data
    tvY1Y0Y1Y2: { acVolt: '0.0', acCurrent: '0.0' },
    tvY2Y3: { acVolt: '0.0', acCurrent: '0.0' },
    tvY2Y3_2: { acVolt: '0.0', acCurrent: '0.0' },
    tvRemark: '',
    // Additional HV data
    hvH1H0H1H2_2: { acVolt: '0.0', acCurrent: '0.0' },
    hvH2H0H2H3_3: { acVolt: '0.0', acCurrent: '0.0' },
    hvH2H0H2H3_4: { acVolt: '0.0', acCurrent: '0.0' },
    hvRemark2: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], [field]: value }
    }));
  };

  const handleCalculate = () => {
    toast.success("คำนวณเสร็จสิ้น", {
      description: "ระบบได้คำนวณค่าต่างๆ แล้ว",
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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
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

            <div className="space-y-2">
              <Label>ผู้ตรวจสอบ :</Label>
              <Input
                value={formData.inspector}
                onChange={(e) => handleInputChange('inspector', e.target.value)}
                placeholder="กรอกชื่อผู้ตรวจสอบ"
                readOnly={isReadOnly}
              />
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

          {/* HV Winding Section */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">HV...WDG.</h3>
            
            <div className="grid grid-cols-4 gap-4">
              <div className="text-sm font-medium text-blue-600">TERMINAL : H1H0/H1H2</div>
              <div className="text-sm font-medium text-blue-600">TERMINAL : H2H0/H2H3</div>
              <div className="text-sm font-medium text-blue-600">TERMINAL : H2H0/H2H3</div>
              <div className="text-sm font-medium text-blue-600">REMARK</div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-blue-600">AC(VOLT)</div>
                <Input
                  value={formData.hvH1H0H1H2.acVolt}
                  onChange={(e) => handleNestedInputChange('hvH1H0H1H2', 'acVolt', e.target.value)}
                  readOnly={isReadOnly}
                />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-blue-600">AC(mA)</div>
                <Input
                  value={formData.hvH2H0H2H3.acCurrent}
                  onChange={(e) => handleNestedInputChange('hvH2H0H2H3', 'acCurrent', e.target.value)}
                  readOnly={isReadOnly}
                />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-blue-600">AC(mA)</div>
                <Input
                  value={formData.hvH2H0H2H3_2.acCurrent}
                  onChange={(e) => handleNestedInputChange('hvH2H0H2H3_2', 'acCurrent', e.target.value)}
                  readOnly={isReadOnly}
                />
              </div>
              <div className="space-y-2">
                <Input
                  value={formData.hvRemark}
                  onChange={(e) => handleInputChange('hvRemark', e.target.value)}
                  readOnly={isReadOnly}
                />
              </div>
            </div>

            {/* Add more rows for MIN, N, 2R, MAX */}
            <div className="grid grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label className="text-blue-600">MIN</Label>
                <Select disabled={isReadOnly}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tap8L" />
                  </SelectTrigger>
                </Select>
              </div>
              <div className="space-y-2">
                <Input value="0.0" readOnly />
              </div>
              <div className="space-y-2">
                <Input value="0.0" readOnly />
              </div>
              <div className="space-y-2">
                <Input value="0.0" readOnly />
              </div>
              <div></div>
            </div>

            <div className="grid grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label className="text-red-600">N</Label>
              </div>
              <div className="space-y-2">
                <Input value="0.0" readOnly />
              </div>
              <div className="space-y-2">
                <Input value="0.0" readOnly />
              </div>
              <div className="space-y-2">
                <Input value="0.0" readOnly />
              </div>
              <div></div>
            </div>

            <div className="grid grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label className="text-red-600">2R</Label>
              </div>
              <div className="space-y-2">
                <Input value="0.0" readOnly />
              </div>
              <div className="space-y-2">
                <Input value="0.0" readOnly />
              </div>
              <div className="space-y-2">
                <Input value="0.0" readOnly />
              </div>
              <div></div>
            </div>

            <div className="grid grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label className="text-blue-600">MAX</Label>
                <Select disabled={isReadOnly}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tap1R" />
                  </SelectTrigger>
                </Select>
              </div>
              <div className="space-y-2">
                <Input value="0.0" readOnly />
              </div>
              <div className="space-y-2">
                <Input value="0.0" readOnly />
              </div>
              <div className="space-y-2">
                <Input value="0.0" readOnly />
              </div>
              <div></div>
            </div>
          </div>

          {/* LV Winding Section - Similar structure */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">LV...WDG.</h3>
            {/* Similar structure as HV but with different terminals */}
            <div className="grid grid-cols-4 gap-4">
              <div className="text-sm font-medium text-blue-600">TERMINAL : X1X0/X1X2</div>
              <div className="text-sm font-medium text-blue-600">TERMINAL : X2X0/X2X3</div>
              <div className="text-sm font-medium text-blue-600">TERMINAL : X2X0/X2X3</div>
              <div className="text-sm font-medium text-blue-600">REMARK</div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-blue-600">AC(VOLT)</div>
                <Input value="0.0" readOnly={isReadOnly} />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-blue-600">AC(mA)</div>
                <Input value="0.0" readOnly={isReadOnly} />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-blue-600">AC(mA)</div>
                <Input value="0.0" readOnly={isReadOnly} />
              </div>
              <div className="space-y-2">
                <Input readOnly={isReadOnly} />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-red-600">N</Label>
              </div>
              <div className="space-y-2">
                <Input value="0.0" readOnly />
              </div>
              <div className="space-y-2">
                <Input value="0.0" readOnly />
              </div>
              <div className="space-y-2">
                <Input value="0.0" readOnly />
              </div>
            </div>
          </div>

          {/* TV Winding Section */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">TV...WDG.</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-sm font-medium text-blue-600">TERMINAL : Y1Y0/Y1Y2</div>
              <div className="text-sm font-medium text-blue-600">TERMINAL : Y2Y3</div>
              <div className="text-sm font-medium text-blue-600">TERMINAL : Y2Y3</div>
              <div className="text-sm font-medium text-blue-600">REMARK</div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-blue-600">AC(VOLT)</div>
                <Input value="0.0" readOnly={isReadOnly} />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-blue-600">AC(mA)</div>
                <Input value="0.0" readOnly={isReadOnly} />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-blue-600">AC(mA)</div>
                <Input value="0.0" readOnly={isReadOnly} />
              </div>
              <div className="space-y-2">
                <Input readOnly={isReadOnly} />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-red-600">N</Label>
              </div>
              <div className="space-y-2">
                <Input value="0.0" readOnly />
              </div>
              <div className="space-y-2">
                <Input value="0.0" readOnly />
              </div>
              <div className="space-y-2">
                <Input value="0.0" readOnly />
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

export default AutoTransformerInsulationModal;
