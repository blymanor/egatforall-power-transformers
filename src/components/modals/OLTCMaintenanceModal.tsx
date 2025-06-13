
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OLTCMaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'view' | 'edit';
  data?: any;
}

const OLTCMaintenanceModal: React.FC<OLTCMaintenanceModalProps> = ({ 
  isOpen, 
  onClose, 
  mode,
  data 
}) => {
  const isReadOnly = mode === 'view';
  const title = mode === 'add' ? 'เพิ่มข้อมูล OLTC' : mode === 'edit' ? 'แก้ไขข้อมูล OLTC' : 'ข้อมูล OLTC';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="transformer">หม้อแปลงไฟฟ้า</Label>
              <Select disabled={isReadOnly} defaultValue={mode !== 'add' ? 'AN-KT2A' : undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AN-KT2A">AN-KT2A</SelectItem>
                  <SelectItem value="AT2-KT1A">AT2-KT1A</SelectItem>
                  <SelectItem value="AN-473A">AN-473A</SelectItem>
                  <SelectItem value="AN-474A">AN-474A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="testType">รูปแบบการทดสอบ</Label>
              <Select disabled={isReadOnly} defaultValue={mode !== 'add' ? 'Commissioning' : undefined}>
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

            <div>
              <Label htmlFor="inspector">ผู้ตรวจสอบ</Label>
              <Input 
                id="inspector" 
                readOnly={isReadOnly}
                defaultValue={mode !== 'add' ? 'จุมพล' : ''}
                placeholder="กรอกชื่อผู้ตรวจสอบ"
              />
            </div>

            <div>
              <Label htmlFor="inspectionDate">วันที่ตรวจสอบ</Label>
              <Input 
                id="inspectionDate" 
                type="date"
                readOnly={isReadOnly}
                defaultValue={mode !== 'add' ? '2022-11-30' : ''}
              />
            </div>

            <div>
              <Label htmlFor="operationNumber">เลขคำสั่งปฏิบัติงาน</Label>
              <Input 
                id="operationNumber" 
                readOnly={isReadOnly}
                defaultValue={mode !== 'add' ? '10123456' : ''}
                placeholder="กรอกเลขคำสั่งปฏิบัติงาน"
              />
            </div>

            <div>
              <Label htmlFor="oltcType">ชนิด OLTC</Label>
              <Select disabled={isReadOnly} defaultValue={mode !== 'add' ? 'Type A' : undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกชนิด OLTC" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Type A">Type A</SelectItem>
                  <SelectItem value="Type B">Type B</SelectItem>
                  <SelectItem value="Type C">Type C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Transition Resistance Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Transition Resistance</h3>
            
            {/* Phase A */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">PHASE A</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phaseA_r1">R1</Label>
                  <Input 
                    id="phaseA_r1" 
                    readOnly={isReadOnly}
                    defaultValue={mode !== 'add' ? '1.23' : ''}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="phaseA_r2">R2</Label>
                  <Input 
                    id="phaseA_r2" 
                    readOnly={isReadOnly}
                    defaultValue={mode !== 'add' ? '1.45' : ''}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Phase B */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">PHASE B</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phaseB_r1">R1</Label>
                  <Input 
                    id="phaseB_r1" 
                    readOnly={isReadOnly}
                    defaultValue={mode !== 'add' ? '1.34' : ''}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="phaseB_r2">R2</Label>
                  <Input 
                    id="phaseB_r2" 
                    readOnly={isReadOnly}
                    defaultValue={mode !== 'add' ? '1.56' : ''}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Phase C */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">PHASE C</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phaseC_r1">R1</Label>
                  <Input 
                    id="phaseC_r1" 
                    readOnly={isReadOnly}
                    defaultValue={mode !== 'add' ? '1.28' : ''}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="phaseC_r2">R2</Label>
                  <Input 
                    id="phaseC_r2" 
                    readOnly={isReadOnly}
                    defaultValue={mode !== 'add' ? '1.42' : ''}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Wear Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">CONTACT WEAR (mm./100,000 operations)</h3>
            
            {/* Phase A Contact Wear */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">PHASE A</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phaseA_stationary">Stationary</Label>
                  <Input 
                    id="phaseA_stationary" 
                    readOnly={isReadOnly}
                    defaultValue={mode !== 'add' ? '0.15' : ''}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="phaseA_moving">Moving</Label>
                  <Input 
                    id="phaseA_moving" 
                    readOnly={isReadOnly}
                    defaultValue={mode !== 'add' ? '0.18' : ''}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Phase B Contact Wear */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">PHASE B</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phaseB_stationary">Stationary</Label>
                  <Input 
                    id="phaseB_stationary" 
                    readOnly={isReadOnly}
                    defaultValue={mode !== 'add' ? '0.16' : ''}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="phaseB_moving">Moving</Label>
                  <Input 
                    id="phaseB_moving" 
                    readOnly={isReadOnly}
                    defaultValue={mode !== 'add' ? '0.19' : ''}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Phase C Contact Wear */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">PHASE C</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phaseC_stationary">Stationary</Label>
                  <Input 
                    id="phaseC_stationary" 
                    readOnly={isReadOnly}
                    defaultValue={mode !== 'add' ? '0.14' : ''}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="phaseC_moving">Moving</Label>
                  <Input 
                    id="phaseC_moving" 
                    readOnly={isReadOnly}
                    defaultValue={mode !== 'add' ? '0.17' : ''}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button onClick={onClose} variant="outline">
            {mode === 'view' ? 'ปิด' : 'ยกเลิก'}
          </Button>
          {mode !== 'view' && (
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              {mode === 'add' ? 'เพิ่มข้อมูล' : 'บันทึกการแก้ไข'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OLTCMaintenanceModal;
