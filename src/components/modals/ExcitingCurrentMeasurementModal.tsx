
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

interface ExcitingCurrentMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "view" | "edit";
  data?: any;
}

const ExcitingCurrentMeasurementModal = ({ 
  isOpen, 
  onClose, 
  mode,
  data 
}: ExcitingCurrentMeasurementModalProps) => {
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
    hvWdgMinTap: data?.hvWdgMinTap || "",
    hvWdgNTap: data?.hvWdgNTap || "",
    hvWdg2RTap: data?.hvWdg2RTap || "",
    hvWdgMaxTap: data?.hvWdgMaxTap || "",
    lvWdgNTap: data?.lvWdgNTap || "",
    tvWdgNTap: data?.tvWdgNTap || "",
    hvWdgAcIvMinTap: data?.hvWdgAcIvMinTap || "",
    hvWdgAcIvNTap: data?.hvWdgAcIvNTap || "",
    // Terminal values
    h1h0h1h2: data?.h1h0h1h2 || "",
    h2h0h2h3: data?.h2h0h2h3 || "",
    h2h0h2h3_2: data?.h2h0h2h3_2 || "",
    x1x0x1x2: data?.x1x0x1x2 || "",
    x2x0x2x3: data?.x2x0x2x3 || "",
    x2x0x2x3_2: data?.x2x0x2x3_2 || "",
    y1y0y1y2: data?.y1y0y1y2 || "",
    y2y3: data?.y2y3 || "",
    y2y3_2: data?.y2y3_2 || "",
    h1h0h1h2_2: data?.h1h0h1h2_2 || "",
    h2h0h2h3_3: data?.h2h0h2h3_3 || "",
    h2h0h2h3_4: data?.h2h0h2h3_4 || "",
    // Remarks
    remarkHv: data?.remarkHv || "",
    remarkLv: data?.remarkLv || "",
    remarkTv: data?.remarkTv || "",
    remarkHv2: data?.remarkHv2 || ""
  });

  const handleSave = () => {
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ข้อมูล Exciting Current Measurement ถูกบันทึกเรียบร้อยแล้ว",
    });
    onClose();
  };

  const isReadonly = mode === "view";
  const isAdd = mode === "add";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" && "เพิ่มข้อมูล Exciting Current Measurement"}
            {mode === "edit" && "แก้ไขข้อมูล Exciting Current Measurement"}
            {mode === "view" && "ดูข้อมูล Exciting Current Measurement"}
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
                      <th className="border border-gray-300 p-2">AC(VOLT)</th>
                      <th className="border border-gray-300 p-2">TERMINAL : H1H0/H1H2</th>
                      <th className="border border-gray-300 p-2">TERMINAL : H2H0/H2H3</th>
                      <th className="border border-gray-300 p-2">TERMINAL : H2H0/H2H3</th>
                      <th className="border border-gray-300 p-2">REMARK</th>
                    </tr>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-300 p-2"></th>
                      <th className="border border-gray-300 p-2 text-blue-600">AC(mA)</th>
                      <th className="border border-gray-300 p-2 text-blue-600">AC(mA)</th>
                      <th className="border border-gray-300 p-2 text-blue-600">AC(mA)</th>
                      <th className="border border-gray-300 p-2"></th>
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
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" value={formData.h1h0h1h2} onChange={(e) => setFormData({ ...formData, h1h0h1h2: e.target.value })} readOnly={isReadonly} placeholder={!isAdd ? "150" : ""} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" value={formData.h2h0h2h3} onChange={(e) => setFormData({ ...formData, h2h0h2h3: e.target.value })} readOnly={isReadonly} placeholder={!isAdd ? "145" : ""} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" value={formData.h2h0h2h3_2} onChange={(e) => setFormData({ ...formData, h2h0h2h3_2: e.target.value })} readOnly={isReadonly} placeholder={!isAdd ? "148" : ""} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-20 h-8" value={formData.remarkHv} onChange={(e) => setFormData({ ...formData, remarkHv: e.target.value })} readOnly={isReadonly} />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <span className="text-red-500 font-semibold">N</span>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" placeholder={!isAdd ? "140" : ""} readOnly={isReadonly} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" placeholder={!isAdd ? "138" : ""} readOnly={isReadonly} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" placeholder={!isAdd ? "142" : ""} readOnly={isReadonly} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-20 h-8" readOnly={isReadonly} />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <span className="text-red-500 font-semibold">2R</span>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" placeholder={!isAdd ? "142" : ""} readOnly={isReadonly} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" placeholder={!isAdd ? "140" : ""} readOnly={isReadonly} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" placeholder={!isAdd ? "145" : ""} readOnly={isReadonly} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-20 h-8" readOnly={isReadonly} />
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
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" placeholder={!isAdd ? "135" : ""} readOnly={isReadonly} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" placeholder={!isAdd ? "132" : ""} readOnly={isReadonly} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" placeholder={!isAdd ? "138" : ""} readOnly={isReadonly} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-20 h-8" readOnly={isReadonly} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* LV...WDG. Section */}
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-3">LV...WDG.</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">AC(VOLT)</th>
                      <th className="border border-gray-300 p-2">TERMINAL : X1X0/X1X2</th>
                      <th className="border border-gray-300 p-2">TERMINAL : X2X0/X2X3</th>
                      <th className="border border-gray-300 p-2">TERMINAL : X2X0/X2X3</th>
                      <th className="border border-gray-300 p-2">REMARK</th>
                    </tr>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-300 p-2"></th>
                      <th className="border border-gray-300 p-2 text-blue-600">AC(mA)</th>
                      <th className="border border-gray-300 p-2 text-blue-600">AC(mA)</th>
                      <th className="border border-gray-300 p-2 text-blue-600">AC(mA)</th>
                      <th className="border border-gray-300 p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <span className="text-red-500 font-semibold">N</span>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" placeholder={!isAdd ? "25" : ""} readOnly={isReadonly} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" placeholder={!isAdd ? "24" : ""} readOnly={isReadonly} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" placeholder={!isAdd ? "26" : ""} readOnly={isReadonly} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-20 h-8" value={formData.remarkLv} onChange={(e) => setFormData({ ...formData, remarkLv: e.target.value })} readOnly={isReadonly} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TV...WDG. Section */}
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-3">TV...WDG.</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">AC(VOLT)</th>
                      <th className="border border-gray-300 p-2">TERMINAL : Y1Y0/Y1Y2</th>
                      <th className="border border-gray-300 p-2">TERMINAL : Y2Y3</th>
                      <th className="border border-gray-300 p-2">TERMINAL : Y2Y3</th>
                      <th className="border border-gray-300 p-2">REMARK</th>
                    </tr>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-300 p-2"></th>
                      <th className="border border-gray-300 p-2 text-blue-600">AC(mA)</th>
                      <th className="border border-gray-300 p-2 text-blue-600">AC(mA)</th>
                      <th className="border border-gray-300 p-2 text-blue-600">AC(mA)</th>
                      <th className="border border-gray-300 p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <span className="text-red-500 font-semibold">N</span>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" placeholder={!isAdd ? "8" : ""} readOnly={isReadonly} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" placeholder={!isAdd ? "7" : ""} readOnly={isReadonly} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" placeholder={!isAdd ? "9" : ""} readOnly={isReadonly} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-20 h-8" value={formData.remarkTv} onChange={(e) => setFormData({ ...formData, remarkTv: e.target.value })} readOnly={isReadonly} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* HV...WDG. (AC(kV)) Section */}
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-3">HV...WDG.</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">AC(kV)</th>
                      <th className="border border-gray-300 p-2">TERMINAL : H1H0/H1H2</th>
                      <th className="border border-gray-300 p-2">TERMINAL : H2H0/H2H3</th>
                      <th className="border border-gray-300 p-2">TERMINAL : H2H0/H2H3</th>
                      <th className="border border-gray-300 p-2">REMARK</th>
                    </tr>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-300 p-2"></th>
                      <th className="border border-gray-300 p-2 text-blue-600">AC(mA)</th>
                      <th className="border border-gray-300 p-2 text-blue-600">AC(mA)</th>
                      <th className="border border-gray-300 p-2 text-blue-600">AC(mA)</th>
                      <th className="border border-gray-300 p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">
                        <span className="text-red-500 font-semibold">N</span>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" placeholder={!isAdd ? "15" : ""} readOnly={isReadonly} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" placeholder={!isAdd ? "14" : ""} readOnly={isReadonly} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-16 h-8" placeholder={!isAdd ? "16" : ""} readOnly={isReadonly} />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <Input className="w-20 h-8" value={formData.remarkHv2} onChange={(e) => setFormData({ ...formData, remarkHv2: e.target.value })} readOnly={isReadonly} />
                      </td>
                    </tr>
                  </tbody>
                </table>
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

export default ExcitingCurrentMeasurementModal;
