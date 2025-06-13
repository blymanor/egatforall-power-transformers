
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/ui/number-input";
import { toast } from "sonner";

const EconomicAnalysisFactorSetting = () => {
  const [formData, setFormData] = useState({
    interestRate: 3,
    inflationRate: 2,
    avgLoadPercentage: 75,
    transformerLoss: 3.5,
    newTransformerLife: 40,
    zeroScrapValueAge: 60,
    unpaidEnergyValue: 10.5,
    unavailability: 0.2,
    powerFactor: 95,
  });

  const handleChange = (field: string, value: number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save data logic would go here
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: "ข้อมูลถูกบันทึกเรียบร้อยแล้ว",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="bg-gray-100">
            <CardTitle className="text-2xl text-[#0442AF]">Factor Setting</CardTitle>
            <p className="text-lg text-gray-500">กรุณากรอกข้อมูลที่เกี่ยวข้องกับการวิเคราะห์</p>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Interest Rate */}
                <div className="space-y-3">
                  <Label htmlFor="interestRate" className="text-lg font-medium flex justify-between">
                    <span>อัตราดอกเบี้ย</span>
                    <span className="text-gray-500">[%]</span>
                  </Label>
                  <NumberInput
                    value={formData.interestRate}
                    onChange={(value) => handleChange("interestRate", value)}
                    min={0}
                    max={100}
                    step={0.1}
                    className="w-full h-12 text-lg"
                  />
                </div>

                {/* Inflation Rate */}
                <div className="space-y-3">
                  <Label htmlFor="inflationRate" className="text-lg font-medium flex justify-between">
                    <span>อัตราเงินเฟ้อ</span>
                    <span className="text-gray-500">[%]</span>
                  </Label>
                  <NumberInput
                    value={formData.inflationRate}
                    onChange={(value) => handleChange("inflationRate", value)}
                    min={0}
                    max={100}
                    step={0.1}
                    className="w-full h-12 text-lg"
                  />
                </div>

                {/* Average Load Percentage */}
                <div className="space-y-3">
                  <Label htmlFor="avgLoadPercentage" className="text-lg font-medium flex justify-between">
                    <span>% การจ่ายโหลดโดยเฉลี่ย</span>
                    <span className="text-gray-500">[%]</span>
                  </Label>
                  <NumberInput
                    value={formData.avgLoadPercentage}
                    onChange={(value) => handleChange("avgLoadPercentage", value)}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full h-12 text-lg"
                  />
                </div>

                {/* Transformer Loss */}
                <div className="space-y-3">
                  <Label htmlFor="transformerLoss" className="text-lg font-medium flex justify-between">
                    <span>ค่า Loss ของหม้อแปลง (no-load and load loss)</span>
                    <span className="text-gray-500">[Bath/kWh]</span>
                  </Label>
                  <NumberInput
                    value={formData.transformerLoss}
                    onChange={(value) => handleChange("transformerLoss", value)}
                    min={0}
                    step={0.01}
                    className="w-full h-12 text-lg"
                  />
                </div>

                {/* New Transformer Life */}
                <div className="space-y-3">
                  <Label htmlFor="newTransformerLife" className="text-lg font-medium flex justify-between">
                    <span>อายุใช้งานของหม้อแปลงใหม่ (project life)</span>
                    <span className="text-gray-500">[ปี]</span>
                  </Label>
                  <NumberInput
                    value={formData.newTransformerLife}
                    onChange={(value) => handleChange("newTransformerLife", value)}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full h-12 text-lg"
                  />
                </div>

                {/* Zero Scrap Value Age */}
                <div className="space-y-3">
                  <Label htmlFor="zeroScrapValueAge" className="text-lg font-medium flex justify-between">
                    <span>อายุหม้อแปลงปีที่ซากเป็นศูนย์</span>
                    <span className="text-gray-500">[ปี]</span>
                  </Label>
                  <NumberInput
                    value={formData.zeroScrapValueAge}
                    onChange={(value) => handleChange("zeroScrapValueAge", value)}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full h-12 text-lg"
                  />
                </div>

                {/* Unpaid Energy Value */}
                <div className="space-y-3">
                  <Label htmlFor="unpaidEnergyValue" className="text-lg font-medium flex justify-between">
                    <span>ค่าพลังงานที่ไม่ได้จ่ายไฟ</span>
                    <span className="text-gray-500">[Bath/kWh]</span>
                  </Label>
                  <NumberInput
                    value={formData.unpaidEnergyValue}
                    onChange={(value) => handleChange("unpaidEnergyValue", value)}
                    min={0}
                    step={0.01}
                    className="w-full h-12 text-lg"
                  />
                </div>

                {/* Unavailability */}
                <div className="space-y-3">
                  <Label htmlFor="unavailability" className="text-lg font-medium flex justify-between">
                    <span>Unavailability</span>
                    <span className="text-gray-500">[%]</span>
                  </Label>
                  <NumberInput
                    value={formData.unavailability}
                    onChange={(value) => handleChange("unavailability", value)}
                    min={0}
                    max={100}
                    step={0.01}
                    className="w-full h-12 text-lg"
                  />
                </div>

                {/* Power Factor */}
                <div className="space-y-3">
                  <Label htmlFor="powerFactor" className="text-lg font-medium flex justify-between">
                    <span>Power Factor</span>
                    <span className="text-gray-500">[%]</span>
                  </Label>
                  <NumberInput
                    value={formData.powerFactor}
                    onChange={(value) => handleChange("powerFactor", value)}
                    min={0}
                    max={100}
                    step={0.1}
                    className="w-full h-12 text-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button type="submit" className="bg-[#0442AF] hover:bg-[#03369c] text-lg px-8 py-3">
                  <span>บันทึกข้อมูล</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EconomicAnalysisFactorSetting;
