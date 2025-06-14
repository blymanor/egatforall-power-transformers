
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CostAnalysis = () => {
  const [orderingCosts, setOrderingCosts] = useState({
    procurementService: '',
    surveyService: '',
    directMaterialService: '',
    equipmentService: '',
    tenderService: '',
    insuranceService: '',
    claimService: '',
    forkliftService: '',
    copyService: '',
    catalogueService: ''
  });

  const [carryingCosts, setCarryingCosts] = useState({
    oilStacks: '',
    rentalCost: '',
    stockService: ''
  });

  const handleOrderingCostChange = (field: string, value: string) => {
    setOrderingCosts(prev => ({ ...prev, [field]: value }));
  };

  const handleCarryingCostChange = (field: string, value: string) => {
    setCarryingCosts(prev => ({ ...prev, [field]: value }));
  };

  const calculateOrderingCostTotal = () => {
    const values = Object.values(orderingCosts).map(v => parseFloat(v) || 0);
    return values.reduce((sum, value) => sum + value, 0).toFixed(2);
  };

  const calculateRentalTotal = () => {
    const stacks = parseFloat(carryingCosts.oilStacks) || 0;
    const cost = parseFloat(carryingCosts.rentalCost) || 0;
    return (stacks * cost * 12).toFixed(2); // Annual cost
  };

  const calculateStockTotal = () => {
    // Assume average oil price per barrel is 30000 THB for calculation
    const averageOilPrice = 30000;
    const servicePercentage = parseFloat(carryingCosts.stockService) || 0;
    return ((servicePercentage / 100) * averageOilPrice).toFixed(2);
  };

  const calculateCarryingCostTotal = () => {
    return (
      parseFloat(calculateRentalTotal()) + 
      parseFloat(calculateStockTotal())
    ).toFixed(2);
  };

  const handleSave = () => {
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: "ข้อมูลค่าใช้จ่ายถูกบันทึกแล้ว",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-[#0442AF] mb-6">รายการค่าใช้จ่าย</h1>

          <Tabs defaultValue="ordering" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ordering">Ordering Cost</TabsTrigger>
              <TabsTrigger value="carrying">Carrying Cost</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ordering" className="p-4 border rounded-md mt-4">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-blue-600">Ordering Cost</h2>
                
                <div className="space-y-2">
                  <Label>ค่าบริการงานจัดหาในประเทศ 10% ของมูลค่าน้ำมัน (ไม่เกิน 60,000) :</Label>
                  <Input
                    value={orderingCosts.procurementService}
                    onChange={(e) => handleOrderingCostChange('procurementService', e.target.value)}
                    placeholder="กรอกจำนวน"
                  />
                </div>

                <div className="space-y-2">
                  <Label>ค่าบริการงานแจ้งและสำรวจความเสียหายเนื่องจากการขนส่งและติดตั้ง 2700 บาท/วัน :</Label>
                  <Input
                    value={orderingCosts.surveyService}
                    onChange={(e) => handleOrderingCostChange('surveyService', e.target.value)}
                    placeholder="กรอกจำนวน"
                  />
                </div>

                <div className="space-y-2">
                  <Label>ค่าบริการพัสดุงานตรง 2% ของมูลค่าน้ำมัน :</Label>
                  <Input
                    value={orderingCosts.directMaterialService}
                    onChange={(e) => handleOrderingCostChange('directMaterialService', e.target.value)}
                    placeholder="กรอกจำนวน"
                  />
                </div>

                <div className="space-y-2">
                  <Label>ค่าบริการครุภัณฑ์เครื่องมือเครื่องใช้ 3% ของมูลค่าน้ำมัน :</Label>
                  <Input
                    value={orderingCosts.equipmentService}
                    onChange={(e) => handleOrderingCostChange('equipmentService', e.target.value)}
                    placeholder="กรอกจำนวน"
                  />
                </div>

                <div className="space-y-2">
                  <Label>ค่าบริการรับฝากขายหรือแจกแบบประกวดราคาและสอบราคางานจัดหาในประเทศ 1,900 บาท/เรื่อง :</Label>
                  <Input
                    value={orderingCosts.tenderService}
                    onChange={(e) => handleOrderingCostChange('tenderService', e.target.value)}
                    placeholder="กรอกจำนวน"
                  />
                </div>

                <div className="space-y-2">
                  <Label>ค่าบริการงานแจ้งเอาประกัน 160 บาท/เรื่อง :</Label>
                  <Input
                    value={orderingCosts.insuranceService}
                    onChange={(e) => handleOrderingCostChange('insuranceService', e.target.value)}
                    placeholder="กรอกจำนวน"
                  />
                </div>

                <div className="space-y-2">
                  <Label>ค่าบริการงานเรียกค่าใช้จ่ายในการออกของและอุปกรณ์ที่ขาดส่งจากคู่สัญญา 1,600 บาท/ชิ้นงาน :</Label>
                  <Input
                    value={orderingCosts.claimService}
                    onChange={(e) => handleOrderingCostChange('claimService', e.target.value)}
                    placeholder="กรอกจำนวน"
                  />
                </div>

                <div className="space-y-2">
                  <Label>ค่าบริการการใช้รถฟอร์คลิฟท์ 2,000 บาท/คัน/วัน :</Label>
                  <Input
                    value={orderingCosts.forkliftService}
                    onChange={(e) => handleOrderingCostChange('forkliftService', e.target.value)}
                    placeholder="กรอกจำนวน"
                  />
                </div>

                <div className="space-y-2">
                  <Label>ค่าบริการถ่ายเอกสาร 1 บาท/แผ่น :</Label>
                  <Input
                    value={orderingCosts.copyService}
                    onChange={(e) => handleOrderingCostChange('copyService', e.target.value)}
                    placeholder="กรอกจำนวน"
                  />
                </div>

                <div className="space-y-2">
                  <Label>ค่าจัดทำ catalogue และกำหนดรหัสพัสดุ 100 บาท/รายการ :</Label>
                  <Input
                    value={orderingCosts.catalogueService}
                    onChange={(e) => handleOrderingCostChange('catalogueService', e.target.value)}
                    placeholder="กรอกจำนวน"
                  />
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-50 rounded">
                  <span className="font-semibold">ค่าใช้จ่ายในการสั่ง รวมเป็น :</span>
                  <span className="text-xl font-bold text-blue-600">{calculateOrderingCostTotal()} บาท</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="carrying" className="p-4 border rounded-md mt-4">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-blue-600">Carrying Cost</h2>
                
                <div className="space-y-2">
                  <Label>โกดังวางน้ำมันซ้อนกัน :</Label>
                  <Input
                    value={carryingCosts.oilStacks}
                    onChange={(e) => handleCarryingCostChange('oilStacks', e.target.value)}
                    placeholder="กรอกจำนวน"
                  />
                  <span className="text-sm text-gray-500">[ถัง]</span>
                </div>

                <div className="space-y-2">
                  <Label>ค่าเช่าพื้นที่ :</Label>
                  <Input
                    value={carryingCosts.rentalCost}
                    onChange={(e) => handleCarryingCostChange('rentalCost', e.target.value)}
                    placeholder="กรอกจำนวน"
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">[บาท/ตารางเมตร/เดือน]</span>
                    <span>คิดเป็น: <span className="font-semibold">{calculateRentalTotal()}</span> [บาท/ถัง/ปี]</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>ค่าบริการงานพัสดุสำรองคลัง :</Label>
                  <Input
                    value={carryingCosts.stockService}
                    onChange={(e) => handleCarryingCostChange('stockService', e.target.value)}
                    placeholder="กรอกจำนวน"
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">[% ของราคาเฉลี่ยน้ำมัน 1 ถัง]</span>
                    <span>คิดเป็น: <span className="font-semibold">{calculateStockTotal()}</span> [บาท/ถัง/ปี]</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-blue-50 rounded">
                  <span className="font-semibold">ค่าใช้จ่ายในการเก็บ รวมเป็น :</span>
                  <span className="text-xl font-bold text-blue-600">{calculateCarryingCostTotal()} [บาท/ถัง/ปี]</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-center mt-6">
            <Button onClick={handleSave} className="px-12 py-3 bg-blue-600 hover:bg-blue-700">
              บันทึกข้อมูล
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CostAnalysis;
