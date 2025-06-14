
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

  const [results, setResults] = useState({
    weibullShape: '',
    weibullScale: '',
    reliability: '',
    failureRate: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = () => {
    if (!formData.equipment || !formData.timeInterval || !formData.leadTime) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    // Mock calculation - in real implementation, this would use actual Weibull formulas
    const mockResults = {
      weibullShape: (Math.random() * 2 + 1).toFixed(2),
      weibullScale: (Math.random() * 10 + 5).toFixed(2),
      reliability: (Math.random() * 0.3 + 0.7).toFixed(3),
      failureRate: (Math.random() * 0.05 + 0.01).toFixed(4)
    };

    setResults(mockResults);
    
    toast.success("คำนวณเสร็จสิ้น", {
      description: "ผลการคำนวณ Weibull ได้แสดงผลแล้ว",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0442AF] mb-8">Bushing, Arrester, OLTC</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">Weibull Calculation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">อุปกรณ์ :</Label>
                  <Select value={formData.equipment} onValueChange={(value) => handleInputChange('equipment', value)}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="เลือกอุปกรณ์" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="bushing">Bushing</SelectItem>
                      <SelectItem value="arrester">Arrester</SelectItem>
                      <SelectItem value="oltc">OLTC</SelectItem>
                      <SelectItem value="transformer">Transformer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Voltage Rating :</Label>
                  <Select value={formData.voltageRating} onValueChange={(value) => handleInputChange('voltageRating', value)}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="เลือก Voltage Rating" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="22kv">22 kV</SelectItem>
                      <SelectItem value="33kv">33 kV</SelectItem>
                      <SelectItem value="115kv">115 kV</SelectItem>
                      <SelectItem value="230kv">230 kV</SelectItem>
                      <SelectItem value="500kv">500 kV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Manufacturer :</Label>
                  <Select value={formData.manufacturer} onValueChange={(value) => handleInputChange('manufacturer', value)}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="เลือกผู้ผลิต" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="abb">ABB</SelectItem>
                      <SelectItem value="siemens">Siemens</SelectItem>
                      <SelectItem value="schneider">Schneider Electric</SelectItem>
                      <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                      <SelectItem value="toshiba">Toshiba</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Type :</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="เลือกประเภท" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="oil-filled">Oil-filled</SelectItem>
                      <SelectItem value="dry-type">Dry-type</SelectItem>
                      <SelectItem value="gas-insulated">Gas-insulated</SelectItem>
                      <SelectItem value="vacuum">Vacuum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">รายละเอียดความผิดปกติหรือเสียหาย :</Label>
                  <Select value={formData.faultDescription} onValueChange={(value) => handleInputChange('faultDescription', value)}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="เลือกรายละเอียด" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="insulation-failure">Insulation Failure</SelectItem>
                      <SelectItem value="mechanical-damage">Mechanical Damage</SelectItem>
                      <SelectItem value="overheating">Overheating</SelectItem>
                      <SelectItem value="contamination">Contamination</SelectItem>
                      <SelectItem value="aging">Aging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Time Interval for Failure Observation (years) :</Label>
                  <Input
                    value={formData.timeInterval}
                    onChange={(e) => handleInputChange('timeInterval', e.target.value)}
                    placeholder="กรอกช่วงเวลา"
                    className="border-gray-300"
                    type="number"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Lead Time (years) :</Label>
                  <Input
                    value={formData.leadTime}
                    onChange={(e) => handleInputChange('leadTime', e.target.value)}
                    placeholder="กรอก Lead Time"
                    className="border-gray-300"
                    type="number"
                  />
                </div>

                <div className="flex justify-center pt-6">
                  <Button 
                    onClick={handleCalculate}
                    className="px-12 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    คำนวณ
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">ผลการคำนวณ</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <Label className="text-gray-700 font-medium">Weibull Shape Parameter (β) :</Label>
                    <span className="font-bold text-blue-600">{results.weibullShape || '-'}</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <Label className="text-gray-700 font-medium">Weibull Scale Parameter (η) :</Label>
                    <span className="font-bold text-blue-600">{results.weibullScale || '-'}</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <Label className="text-gray-700 font-medium">Reliability :</Label>
                    <span className="font-bold text-green-600">{results.reliability || '-'}</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <Label className="text-gray-700 font-medium">Failure Rate :</Label>
                    <span className="font-bold text-red-600">{results.failureRate || '-'}</span>
                  </div>
                </div>

                {results.weibullShape && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">คำแนะนำ</h4>
                    <p className="text-sm text-blue-700">
                      จากผลการคำนวณ Weibull แสดงให้เห็นว่าอุปกรณ์มีความน่าเชื่อถือระดับ {results.reliability} 
                      และอัตราความเสียหายที่ {results.failureRate} ต่อปี
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WeibullCalculation;
