
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const WeibullCalculation = () => {
  const [formData, setFormData] = useState({
    equipment: '',
    voltageRating: '',
    manufacturer: '',
    type: '',
    faultDescription: '',
    timeInterval: '',
    leadTime: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = () => {
    toast.success("คำนวณสำเร็จ", {
      description: "ระบบได้คำนวณผลลัพธ์เรียบร้อยแล้ว",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-[#0442AF] mb-6">Bushing, Arrester, OLTC</h1>
          
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-blue-600">Weibull Calculation</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>อุปกรณ์ :</Label>
                <Select value={formData.equipment} onValueChange={(value) => handleInputChange('equipment', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bushing" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="bushing">Bushing</SelectItem>
                    <SelectItem value="arrester">Arrester</SelectItem>
                    <SelectItem value="oltc">OLTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Voltage Rating :</Label>
                <Select value={formData.voltageRating} onValueChange={(value) => handleInputChange('voltageRating', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="11" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="11">11</SelectItem>
                    <SelectItem value="22">22</SelectItem>
                    <SelectItem value="33">33</SelectItem>
                    <SelectItem value="115">115</SelectItem>
                    <SelectItem value="230">230</SelectItem>
                    <SelectItem value="500">500</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Manufacturer :</Label>
                <Select value={formData.manufacturer} onValueChange={(value) => handleInputChange('manufacturer', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="abb">ABB</SelectItem>
                    <SelectItem value="siemens">Siemens</SelectItem>
                    <SelectItem value="ge">GE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Type :</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="oil-filled">Oil Filled</SelectItem>
                    <SelectItem value="resin-impregnated">Resin Impregnated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>รายละเอียดความผิดปกติหรือเสียหาย :</Label>
                <Select value={formData.faultDescription} onValueChange={(value) => handleInputChange('faultDescription', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="insulation-failure">Insulation Failure</SelectItem>
                    <SelectItem value="oil-leak">Oil Leak</SelectItem>
                    <SelectItem value="mechanical-damage">Mechanical Damage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Time Interval for Failure Observation (years) :</Label>
                <Input
                  value={formData.timeInterval}
                  onChange={(e) => handleInputChange('timeInterval', e.target.value)}
                  placeholder="กรอกระยะเวลา"
                />
              </div>

              <div className="space-y-2">
                <Label>Lead Time (years) :</Label>
                <Input
                  value={formData.leadTime}
                  onChange={(e) => handleInputChange('leadTime', e.target.value)}
                  placeholder="กรอกระยะเวลา"
                />
              </div>

              <div className="flex justify-center pt-6">
                <Button 
                  onClick={handleCalculate}
                  className="px-12 py-3 text-lg bg-blue-600 hover:bg-blue-700"
                >
                  Calculate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WeibullCalculation;
