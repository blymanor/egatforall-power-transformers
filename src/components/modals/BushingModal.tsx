
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

interface BushingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'view' | 'edit';
  data?: any;
}

const BushingModal = ({ isOpen, onClose, mode, data }: BushingModalProps) => {
  const [formData, setFormData] = useState({
    transformer: mode === 'create' ? '' : (data?.transformer || ''),
    testType: mode === 'create' ? '' : (data?.testType || ''),
    testDate: mode === 'create' ? undefined : (data?.testDate || undefined),
    workOrderNo: mode === 'create' ? '' : (data?.workOrderNo || ''),
    inspector: mode === 'create' ? '' : (data?.inspector || ''),
    cor20C: mode === 'create' ? '' : (data?.cor20C || ''),
    testKv: mode === 'create' ? '' : (data?.testKv || ''),
    // Bushing data
    bushingData: [
      { phase: 'H1', serialNo: '', currentC1: '0.0', currentC2: '0.0', wattC1: '0.0', wattC2: '0.0', powerFactorC1Avg: '0.0', powerFactorC2Avg: '0.0', powerFactorC1Cor: '0.0', capC1: '', capC2: '' },
      { phase: 'H2', serialNo: '', currentC1: '0.0', currentC2: '0.0', wattC1: '0.0', wattC2: '0.0', powerFactorC1Avg: '0.0', powerFactorC2Avg: '0.0', powerFactorC1Cor: '0.0', capC1: '', capC2: '' },
      { phase: 'H3', serialNo: '', currentC1: '0.0', currentC2: '0.0', wattC1: '0.0', wattC2: '0.0', powerFactorC1Avg: '0.0', powerFactorC2Avg: '0.0', powerFactorC1Cor: '0.0', capC1: '', capC2: '' },
      { phase: 'X1', serialNo: '', currentC1: '0.0', currentC2: '0.0', wattC1: '0.0', wattC2: '0.0', powerFactorC1Avg: '0.0', powerFactorC2Avg: '0.0', powerFactorC1Cor: '0.0', capC1: '', capC2: '' },
      { phase: 'X2', serialNo: '', currentC1: '0.0', currentC2: '0.0', wattC1: '0.0', wattC2: '0.0', powerFactorC1Avg: '0.0', powerFactorC2Avg: '0.0', powerFactorC1Cor: '0.0', capC1: '', capC2: '' },
      { phase: 'X3', serialNo: '', currentC1: '0.0', currentC2: '0.0', wattC1: '0.0', wattC2: '0.0', powerFactorC1Avg: '0.0', powerFactorC2Avg: '0.0', powerFactorC1Cor: '0.0', capC1: '', capC2: '' },
      { phase: 'Y1', serialNo: '', currentC1: '0.0', currentC2: '0.0', wattC1: '0.0', wattC2: '0.0', powerFactorC1Avg: '0.0', powerFactorC2Avg: '0.0', powerFactorC1Cor: '0.0', capC1: '', capC2: '' },
      { phase: 'Y2', serialNo: '', currentC1: '0.0', currentC2: '0.0', wattC1: '0.0', wattC2: '0.0', powerFactorC1Avg: '0.0', powerFactorC2Avg: '0.0', powerFactorC1Cor: '0.0', capC1: '', capC2: '' },
      { phase: 'Y3', serialNo: '', currentC1: '0.0', currentC2: '0.0', wattC1: '0.0', wattC2: '0.0', powerFactorC1Avg: '0.0', powerFactorC2Avg: '0.0', powerFactorC1Cor: '0.0', capC1: '', capC2: '' }
    ]
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBushingDataChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      bushingData: prev.bushingData.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSave = () => {
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: "ข้อมูล Bushing ถูกบันทึกแล้ว",
    });
    onClose();
  };

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            {mode === 'create' ? 'เพิ่มข้อมูล' : mode === 'edit' ? 'แก้ไขข้อมูล' : 'แสดงข้อมูล'} Bushing
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
              <Label>COR 20°C :</Label>
              <Input
                value={formData.cor20C}
                onChange={(e) => handleInputChange('cor20C', e.target.value)}
                readOnly={isReadOnly}
              />
            </div>

            <div></div>

            <div className="space-y-2">
              <Label>Test (kV) :</Label>
              <Input
                value={formData.testKv}
                onChange={(e) => handleInputChange('testKv', e.target.value)}
                readOnly={isReadOnly}
              />
            </div>
          </div>

          {/* Bushing Measurement Table */}
          <div className="border rounded-lg p-4">
            <div className="grid grid-cols-11 gap-2 mb-4">
              <div className="text-blue-600 font-semibold">PHASE</div>
              <div className="text-blue-600 font-semibold text-center">BUSHING SERIAL NO.</div>
              <div className="text-blue-600 font-semibold text-center">CURRENT (mA):C1</div>
              <div className="text-blue-600 font-semibold text-center">CURRENT (mA):C2</div>
              <div className="text-blue-600 font-semibold text-center">WATT:C1</div>
              <div className="text-blue-600 font-semibold text-center">WATT:C2</div>
              <div className="text-blue-600 font-semibold text-center">%POWER FACTOR</div>
              <div className="text-blue-600 font-semibold text-center">CAP(pF):C1</div>
              <div className="text-blue-600 font-semibold text-center">CAP(pF):C2</div>
              <div></div>
              <div></div>
            </div>

            <div className="grid grid-cols-11 gap-2 mb-2 text-sm">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div className="text-blue-600 font-semibold text-center">C1:AVG C2:AVG C1:COR20°C</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            {formData.bushingData.map((data, index) => (
              <div key={index} className="grid grid-cols-11 gap-2 mb-2 items-center">
                <div className="text-blue-600 font-semibold">{data.phase}</div>
                <Input
                  value={data.serialNo}
                  onChange={(e) => handleBushingDataChange(index, 'serialNo', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={data.currentC1}
                  onChange={(e) => handleBushingDataChange(index, 'currentC1', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={data.currentC2}
                  onChange={(e) => handleBushingDataChange(index, 'currentC2', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={data.wattC1}
                  onChange={(e) => handleBushingDataChange(index, 'wattC1', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={data.wattC2}
                  onChange={(e) => handleBushingDataChange(index, 'wattC2', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <div className="flex space-x-1">
                  <Input
                    value={data.powerFactorC1Avg}
                    onChange={(e) => handleBushingDataChange(index, 'powerFactorC1Avg', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center h-8 w-12"
                  />
                  <Input
                    value={data.powerFactorC2Avg}
                    onChange={(e) => handleBushingDataChange(index, 'powerFactorC2Avg', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center h-8 w-12"
                  />
                  <Input
                    value={data.powerFactorC1Cor}
                    onChange={(e) => handleBushingDataChange(index, 'powerFactorC1Cor', e.target.value)}
                    readOnly={isReadOnly}
                    className="text-center h-8 w-12"
                  />
                </div>
                <Input
                  value={data.capC1}
                  onChange={(e) => handleBushingDataChange(index, 'capC1', e.target.value)}
                  readOnly={isReadOnly}
                  className="text-center h-8"
                />
                <Input
                  value={data.capC2}
                  onChange={(e) => handleBushingDataChange(index, 'capC2', e.target.value)}
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

export default BushingModal;
