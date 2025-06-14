
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

interface ArresterModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'view' | 'edit';
  data?: any;
}

const ArresterModal = ({ isOpen, onClose, mode, data }: ArresterModalProps) => {
  const [formData, setFormData] = useState({
    transformer: mode === 'create' ? '' : (data?.transformer || ''),
    testType: mode === 'create' ? '' : (data?.testType || ''),
    testDate: mode === 'create' ? undefined : (data?.testDate || undefined),
    workOrderNo: mode === 'create' ? '' : (data?.workOrderNo || ''),
    inspector: mode === 'create' ? '' : (data?.inspector || ''),
    testKv: mode === 'create' ? '' : (data?.testKv || ''),
    // Watt Loss Measurement
    wattLossData: [
      { phase: 'H1', current: '0.0', watt: '0.0', commissioning: '0.0', percentFromFirst: '0.0', insulationResistance: '0.0', commissioningIns: '0.0', percentFromFirstIns: '0.0', leakageCurrent: '0.0', commissioningLeakage: '0.0', percentFromFirstLeakage: '0.0' },
      { phase: 'H2', current: '0.0', watt: '0.0', commissioning: '0.0', percentFromFirst: '0.0', insulationResistance: '0.0', commissioningIns: '0.0', percentFromFirstIns: '0.0', leakageCurrent: '0.0', commissioningLeakage: '0.0', percentFromFirstLeakage: '0.0' },
      { phase: 'H3', current: '0.0', watt: '0.0', commissioning: '0.0', percentFromFirst: '0.0', insulationResistance: '0.0', commissioningIns: '0.0', percentFromFirstIns: '0.0', leakageCurrent: '0.0', commissioningLeakage: '0.0', percentFromFirstLeakage: '0.0' },
      { phase: 'X1', current: '0.0', watt: '0.0', commissioning: '0.0', percentFromFirst: '0.0', insulationResistance: '0.0', commissioningIns: '0.0', percentFromFirstIns: '0.0', leakageCurrent: '0.0', commissioningLeakage: '0.0', percentFromFirstLeakage: '0.0' },
      { phase: 'X2', current: '0.0', watt: '0.0', commissioning: '0.0', percentFromFirst: '0.0', insulationResistance: '0.0', commissioningIns: '0.0', percentFromFirstIns: '0.0', leakageCurrent: '0.0', commissioningLeakage: '0.0', percentFromFirstLeakage: '0.0' },
      { phase: 'X3', current: '0.0', watt: '0.0', commissioning: '0.0', percentFromFirst: '0.0', insulationResistance: '0.0', commissioningIns: '0.0', percentFromFirstIns: '0.0', leakageCurrent: '0.0', commissioningLeakage: '0.0', percentFromFirstLeakage: '0.0' },
      { phase: 'Y1', current: '0.0', watt: '0.0', commissioning: '0.0', percentFromFirst: '0.0', insulationResistance: '0.0', commissioningIns: '0.0', percentFromFirstIns: '0.0', leakageCurrent: '0.0', commissioningLeakage: '0.0', percentFromFirstLeakage: '0.0' },
      { phase: 'Y2', current: '0.0', watt: '0.0', commissioning: '0.0', percentFromFirst: '0.0', insulationResistance: '0.0', commissioningIns: '0.0', percentFromFirstIns: '0.0', leakageCurrent: '0.0', commissioningLeakage: '0.0', percentFromFirstLeakage: '0.0' },
      { phase: 'Y3', current: '0.0', watt: '0.0', commissioning: '0.0', percentFromFirst: '0.0', insulationResistance: '0.0', commissioningIns: '0.0', percentFromFirstIns: '0.0', leakageCurrent: '0.0', commissioningLeakage: '0.0', percentFromFirstLeakage: '0.0' }
    ]
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWattLossDataChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      wattLossData: prev.wattLossData.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSave = () => {
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: "ข้อมูล Arrester ถูกบันทึกแล้ว",
    });
    onClose();
  };

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            {mode === 'create' ? 'เพิ่มข้อมูล' : mode === 'edit' ? 'แก้ไขข้อมูล' : 'แสดงข้อมูล'} Arrester
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
              <Input
                value={formData.workOrderNo}
                onChange={(e) => handleInputChange('workOrderNo', e.target.value)}
                placeholder="เลขที่คำสั่งปฏิบัติงาน"
                readOnly={isReadOnly}
              />
            </div>

            <div className="space-y-2">
              <Label>Test (kV) :</Label>
              <Input
                value={formData.testKv}
                onChange={(e) => handleInputChange('testKv', e.target.value)}
                readOnly={isReadOnly}
              />
            </div>
          </div>

          {/* Measurement Table */}
          <div className="border rounded-lg p-4">
            <div className="grid grid-cols-12 gap-2 mb-4">
              <div className="text-blue-600 font-semibold">ARESSTER S/N</div>
              <div className="text-blue-600 font-semibold text-center">PHASE</div>
              <div className="text-blue-600 font-semibold text-center">CURRENT (mA)</div>
              <div className="text-blue-600 font-semibold text-center">WATT</div>
              <div className="text-blue-600 font-semibold text-center">WATT LOSS MEASUREMENT</div>
              <div className="text-blue-600 font-semibold text-center">INSULATION RESISTANCE MEASUREMENT</div>
              <div className="text-blue-600 font-semibold text-center">I-Leakage (mA)</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            <div className="grid grid-cols-12 gap-2 mb-2 text-sm">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div className="text-blue-600 font-semibold text-center">COMMISSIONING (OR FIRST TEST)</div>
              <div className="text-blue-600 font-semibold text-center">%FROM FIRST TEST</div>
              <div className="text-blue-600 font-semibold text-center">INSULATION RESISTANCE 2500 Vdc 1 Min.</div>
              <div className="text-blue-600 font-semibold text-center">COMMISSIONING (OR FIRST TEST)</div>
              <div className="text-blue-600 font-semibold text-center">%FROM FIRST TEST</div>
              <div className="text-blue-600 font-semibold text-center">LEAKAGE CURRENT (mA)</div>
              <div className="text-blue-600 font-semibold text-center">COMMISSIONING (OR FIRST TEST)</div>
              <div className="text-blue-600 font-semibold text-center">%FROM FIRST TEST</div>
            </div>

            {formData.wattLossData.map((data, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 mb-2 items-center">
                <div></div>
                <div className="text-blue-600 font-semibold">{data.phase}</div>
                <Input
                  value={data.current}
                  onChange={(e) => handleWattLossDataChange(index, 'current', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={data.watt}
                  onChange={(e) => handleWattLossDataChange(index, 'watt', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={data.commissioning}
                  onChange={(e) => handleWattLossDataChange(index, 'commissioning', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={data.percentFromFirst}
                  onChange={(e) => handleWattLossDataChange(index, 'percentFromFirst', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={data.insulationResistance}
                  onChange={(e) => handleWattLossDataChange(index, 'insulationResistance', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={data.commissioningIns}
                  onChange={(e) => handleWattLossDataChange(index, 'commissioningIns', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={data.percentFromFirstIns}
                  onChange={(e) => handleWattLossDataChange(index, 'percentFromFirstIns', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={data.leakageCurrent}
                  onChange={(e) => handleWattLossDataChange(index, 'leakageCurrent', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={data.commissioningLeakage}
                  onChange={(e) => handleWattLossDataChange(index, 'commissioningLeakage', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={data.percentFromFirstLeakage}
                  onChange={(e) => handleWattLossDataChange(index, 'percentFromFirstLeakage', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
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

export default ArresterModal;
