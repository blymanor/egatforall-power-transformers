
import React, { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";

interface DCResistanceMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "view" | "edit";
  data?: any;
}

const DCResistanceMeasurementModal = ({ 
  isOpen, 
  onClose, 
  mode,
  data 
}: DCResistanceMeasurementModalProps) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    transformer: data?.transformer || "",
    testType: data?.testType || "",
    testDate: data?.testDate || "",
    testNumber: data?.testNumber || "",
    tester: data?.tester || "",
    ambientTemp: data?.ambientTemp || "",
    humidity: data?.humidity || "",
    oilTemp: data?.oilTemp || "",
    wdgTemp: data?.wdgTemp || "",
    weather: data?.weather || "",
    calculatedValue: data?.calculatedValue || "0.0"
  });

  const handleSave = () => {
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ข้อมูล DC Resistance Measurement ถูกบันทึกเรียบร้อยแล้ว",
    });
    onClose();
  };

  const handleCalculate = () => {
    // Simple calculation example - in real implementation, this would be more complex
    const calculatedResult = Math.random() * 100;
    setFormData({ ...formData, calculatedValue: calculatedResult.toFixed(2) });
    
    toast({
      title: "คำนวณสำเร็จ",
      description: "ระบบได้คำนวณค่าผลลัพธ์เรียบร้อยแล้ว",
    });
  };

  const isReadonly = mode === "view";
  const isAdd = mode === "add";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" && "เพิ่มข้อมูล DC Resistance Measurement"}
            {mode === "edit" && "แก้ไขข้อมูล DC Resistance Measurement"}
            {mode === "view" && "ดูข้อมูล DC Resistance Measurement"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-4">
          {/* Header Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>หม้อแปลงไฟฟ้า :</Label>
              <Select
                value={formData.transformer}
                onValueChange={(value) => setFormData({ ...formData, transformer: value })}
                disabled={isReadonly}
              >
                <SelectTrigger>
                  <SelectValue placeholder={isAdd ? "เลือกหม้อแปลงไฟฟ้า" : "AN-KT1A"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AN-KT1A">AN-KT1A</SelectItem>
                  <SelectItem value="AT2-KT1A">AT2-KT1A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>รูปแบบการทดสอบ :</Label>
              <Select
                value={formData.testType}
                onValueChange={(value) => setFormData({ ...formData, testType: value })}
                disabled={isReadonly}
              >
                <SelectTrigger>
                  <SelectValue placeholder={isAdd ? "เลือกรูปแบบ" : "Commissioning"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Commissioning">Commissioning</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>วันที่ทดสอบ :</Label>
              <Input
                type="date"
                value={formData.testDate}
                onChange={(e) => setFormData({ ...formData, testDate: e.target.value })}
                readOnly={isReadonly}
              />
            </div>

            <div className="space-y-2">
              <Label>เลขที่คำสั่งปฏิบัติงาน :</Label>
              <Select
                value={formData.testNumber}
                onValueChange={(value) => setFormData({ ...formData, testNumber: value })}
                disabled={isReadonly}
              >
                <SelectTrigger>
                  <SelectValue placeholder={isAdd ? "เลือกเลขที่" : ""} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="001">001</SelectItem>
                  <SelectItem value="002">002</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>ผู้ทดสอบ :</Label>
              <Input
                value={formData.tester}
                onChange={(e) => setFormData({ ...formData, tester: e.target.value })}
                readOnly={isReadonly}
                placeholder={isAdd ? "กรอกชื่อผู้ทดสอบ" : ""}
              />
            </div>
          </div>

          {/* Environmental Conditions */}
          <div className="grid grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label>Ambient Temp. :</Label>
              <div className="flex items-center gap-1">
                <Input
                  value={formData.ambientTemp}
                  onChange={(e) => setFormData({ ...formData, ambientTemp: e.target.value })}
                  readOnly={isReadonly}
                  placeholder={isAdd ? "" : "25"}
                />
                <span className="text-xs">°C</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Humidity :</Label>
              <div className="flex items-center gap-1">
                <Input
                  value={formData.humidity}
                  onChange={(e) => setFormData({ ...formData, humidity: e.target.value })}
                  readOnly={isReadonly}
                  placeholder={isAdd ? "" : "60"}
                />
                <span className="text-xs">%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Oil Temp. :</Label>
              <div className="flex items-center gap-1">
                <Input
                  value={formData.oilTemp}
                  onChange={(e) => setFormData({ ...formData, oilTemp: e.target.value })}
                  readOnly={isReadonly}
                  placeholder={isAdd ? "" : "30"}
                />
                <span className="text-xs">°C</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Wdg Temp. :</Label>
              <div className="flex items-center gap-1">
                <Input
                  value={formData.wdgTemp}
                  onChange={(e) => setFormData({ ...formData, wdgTemp: e.target.value })}
                  readOnly={isReadonly}
                  placeholder={isAdd ? "" : "32"}
                />
                <span className="text-xs">°C</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Weather :</Label>
              <Input
                value={formData.weather}
                onChange={(e) => setFormData({ ...formData, weather: e.target.value })}
                readOnly={isReadonly}
                placeholder={isAdd ? "" : "Clear"}
              />
            </div>
          </div>

          {/* Measurement Tables */}
          <div className="space-y-4">
            {/* HV...WDG. Section */}
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-3">HV...WDG.</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th rowSpan={2} className="border border-gray-300 p-2">TERMINAL : H1H0/H1H2</th>
                      <th colSpan={2} className="border border-gray-300 p-2 text-blue-600">%MAXIMUM ERROR BETWEEN CM&PHASE</th>
                      <th rowSpan={2} className="border border-gray-300 p-2">TERMINAL : H1H0/H1H2</th>
                      <th colSpan={2} className="border border-gray-300 p-2 text-blue-600">%MAXIMUM ERROR BETWEEN CM&PHASE</th>
                      <th rowSpan={2} className="border border-gray-300 p-2">TERMINAL : H1H0/H1H2</th>
                      <th colSpan={2} className="border border-gray-300 p-2 text-blue-600">%MAXIMUM ERROR BETWEEN CM&PHASE</th>
                      <th colSpan={2} className="border border-gray-300 p-2 text-blue-600">%MAXIMUM ERROR BETWEEN PHASE</th>
                      <th rowSpan={2} className="border border-gray-300 p-2">REMARK</th>
                    </tr>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-300 p-2">DC (V.)</th>
                      <th className="border border-gray-300 p-2">DC (A.)</th>
                      <th className="border border-gray-300 p-2">OHM</th>
                      <th className="border border-gray-300 p-2">DC (V.)</th>
                      <th className="border border-gray-300 p-2">DC (A.)</th>
                      <th className="border border-gray-300 p-2">OHM</th>
                      <th className="border border-gray-300 p-2">DC (V.)</th>
                      <th className="border border-gray-300 p-2">DC (A.)</th>
                      <th className="border border-gray-300 p-2">OHM</th>
                      <th className="border border-gray-300 p-2">%MAXIMUM ERROR BETWEEN CM&PHASE</th>
                      <th className="border border-gray-300 p-2">%MAXIMUM ERROR BETWEEN PHASE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600 font-semibold">MIN</span>
                          <Select value="Tap8L" disabled={isReadonly}>
                            <SelectTrigger className="w-20 h-8">
                              <SelectValue />
                            </SelectTrigger>
                          </Select>
                        </div>
                      </td>
                      {Array.from({ length: 11 }, (_, i) => (
                        <td key={i} className="border border-gray-300 p-2">
                          <Input 
                            placeholder={!isAdd ? "0.0" : ""} 
                            readOnly={isReadonly}
                            className="w-16 h-8" 
                          />
                        </td>
                      ))}
                      <td className="border border-gray-300 p-2">
                        <Input readOnly={isReadonly} className="w-20 h-8" />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <span className="text-red-500 font-semibold">N</span>
                      </td>
                      {Array.from({ length: 11 }, (_, i) => (
                        <td key={i} className="border border-gray-300 p-2">
                          <Input 
                            placeholder={!isAdd ? "0.0" : ""} 
                            readOnly={isReadonly}
                            className="w-16 h-8" 
                          />
                        </td>
                      ))}
                      <td className="border border-gray-300 p-2">
                        <Input readOnly={isReadonly} className="w-20 h-8" />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <span className="text-red-500 font-semibold">2R</span>
                      </td>
                      {Array.from({ length: 11 }, (_, i) => (
                        <td key={i} className="border border-gray-300 p-2">
                          <Input 
                            placeholder={!isAdd ? "0.0" : ""} 
                            readOnly={isReadonly}
                            className="w-16 h-8" 
                          />
                        </td>
                      ))}
                      <td className="border border-gray-300 p-2">
                        <Input readOnly={isReadonly} className="w-20 h-8" />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600 font-semibold">MAX</span>
                          <Select value="Tap1R" disabled={isReadonly}>
                            <SelectTrigger className="w-20 h-8">
                              <SelectValue />
                            </SelectTrigger>
                          </Select>
                        </div>
                      </td>
                      {Array.from({ length: 11 }, (_, i) => (
                        <td key={i} className="border border-gray-300 p-2">
                          <Input 
                            placeholder={!isAdd ? "0.0" : ""} 
                            readOnly={isReadonly}
                            className="w-16 h-8" 
                          />
                        </td>
                      ))}
                      <td className="border border-gray-300 p-2">
                        <Input readOnly={isReadonly} className="w-20 h-8" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Similar tables for LV...WDG. and TV...WDG. would follow the same pattern */}
            
            {/* Calculated Result Display */}
            <div className="bg-blue-50 p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">ผลการคำนวณ:</Label>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-blue-600">{formData.calculatedValue}</span>
                  {!isReadonly && (
                    <Button onClick={handleCalculate} variant="outline">
                      คำนวณ
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4">
          <Button variant="outline" onClick={onClose}>
            {isReadonly ? "ปิด" : "ยกเลิก"}
          </Button>
          {!isReadonly && (
            <Button onClick={handleSave}>
              บันทึก
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DCResistanceMeasurementModal;
