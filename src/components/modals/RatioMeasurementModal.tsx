
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
    transformer: data?.transformer || '',
    testType: data?.testType || '',
    testDate: data?.testDate || undefined,
    inspector: data?.inspector || '',
    // Environmental conditions would be similar to other modals
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = () => {
    toast.success("คำนวณเสร็จสิ้น", {
      description: "ระบบได้คำนวณค่า Ratio Measurement แล้ว",
    });
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            {mode === 'create' ? 'เพิ่มข้อมูล' : mode === 'edit' ? 'แก้ไขข้อมูล' : 'แสดงข้อมูล'} Ratio Measurement
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-4">
          {/* Basic Information - similar structure */}
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
            {/* Add other basic fields similar to previous modals */}
          </div>

          {/* Ratio measurement specific fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">Ratio Measurement Data</h3>
            {/* Add specific ratio measurement inputs based on the image */}
            <div className="grid grid-cols-3 gap-4">
              <Input placeholder="Ratio 1" readOnly={isReadOnly} />
              <Input placeholder="Ratio 2" readOnly={isReadOnly} />
              <Input placeholder="Error %" readOnly={isReadOnly} />
            </div>
          </div>

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

export default RatioMeasurementModal;
