
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CostAnalysis = () => {
  const [orderingCosts, setOrderingCosts] = useState({
    domestic: '60000000.0',
    notification: '2700',
    directGoods: '0',
    equipment: '0',
    auction: '1900',
    insurance: '160',
    deficiencyCall: '1600',
    forklift: '2000',
    document: '1',
    catalog: '100'
  });

  const [carryingCosts, setCarryingCosts] = useState({
    warehouseCapacity: '4.0',
    rentalCost: '35.0',
    storageCost: '15.0'
  });

  const calculateOrderingTotal = () => {
    return Object.values(orderingCosts)
      .reduce((sum, value) => sum + parseFloat(value || '0'), 0);
  };

  const calculateRentalPerTankPerYear = () => {
    const capacity = parseFloat(carryingCosts.warehouseCapacity || '0');
    const rental = parseFloat(carryingCosts.rentalCost || '0');
    return capacity > 0 ? (rental / capacity * 12).toFixed(1) : '0.0';
  };

  const calculateStoragePerTankPerYear = () => {
    const percentage = parseFloat(carryingCosts.storageCost || '0');
    // Assuming average oil price per tank is 131,000 baht (example)
    const avgOilPrice = 131000;
    return ((percentage / 100) * avgOilPrice).toFixed(10);
  };

  const calculateCarryingTotal = () => {
    const rental = parseFloat(calculateRentalPerTankPerYear());
    const storage = parseFloat(calculateStoragePerTankPerYear());
    return (rental + storage).toFixed(10);
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-[#0442AF] mb-6">รายการค่าใช้จ่าย</h1>
          
          {/* Ordering Cost Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Ordering Cost</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="flex-1">ค่าบริการงานจัดหาในประเทศ 10% ของมูลค่าน้ำมัน (ไม่เกิน 60,000) :</Label>
                <Input
                  value={orderingCosts.domestic}
                  onChange={(e) => setOrderingCosts(prev => ({ ...prev, domestic: e.target.value }))}
                  className="w-32 ml-4"
                />
              </div>

              <div className="flex justify-between items-center">
                <Label className="flex-1">ค่าบริการงานแจ้งและสำรวจความเสียหายเนื่องจากการขนส่งและติดตั้ง 2700 บาท/วัน :</Label>
                <Input
                  value={orderingCosts.notification}
                  onChange={(e) => setOrderingCosts(prev => ({ ...prev, notification: e.target.value }))}
                  className="w-32 ml-4"
                />
              </div>

              <div className="flex justify-between items-center">
                <Label className="flex-1">ค่าบริการพัสดุงานตรง 2% ของมูลค่าน้ำมัน :</Label>
                <Input
                  value={orderingCosts.directGoods}
                  onChange={(e) => setOrderingCosts(prev => ({ ...prev, directGoods: e.target.value }))}
                  className="w-32 ml-4"
                />
              </div>

              <div className="flex justify-between items-center">
                <Label className="flex-1">ค่าบริการครุภัณฑ์เครื่องมือเครื่องใช้ 3% ของมูลค่าน้ำมัน :</Label>
                <Input
                  value={orderingCosts.equipment}
                  onChange={(e) => setOrderingCosts(prev => ({ ...prev, equipment: e.target.value }))}
                  className="w-32 ml-4"
                />
              </div>

              <div className="flex justify-between items-center">
                <Label className="flex-1">ค่าบริการรับฝากขายหรือแจกแบบประกวดราคาและสอบราคางานจัดหาในประเทศ 1,900 บาท/เรื่อง :</Label>
                <Input
                  value={orderingCosts.auction}
                  onChange={(e) => setOrderingCosts(prev => ({ ...prev, auction: e.target.value }))}
                  className="w-32 ml-4"
                />
              </div>

              <div className="flex justify-between items-center">
                <Label className="flex-1">ค่าบริการงานแจ้งเอาประกัน 160 บาท/เรื่อง :</Label>
                <Input
                  value={orderingCosts.insurance}
                  onChange={(e) => setOrderingCosts(prev => ({ ...prev, insurance: e.target.value }))}
                  className="w-32 ml-4"
                />
              </div>

              <div className="flex justify-between items-center">
                <Label className="flex-1">ค่าบริการงานเรียกค่าใช้จ่ายในการออกของและอุปกรณ์ที่ขาดส่งจากคู่สัญญา 1,600 บาท/ชิ้นงาน :</Label>
                <Input
                  value={orderingCosts.deficiencyCall}
                  onChange={(e) => setOrderingCosts(prev => ({ ...prev, deficiencyCall: e.target.value }))}
                  className="w-32 ml-4"
                />
              </div>

              <div className="flex justify-between items-center">
                <Label className="flex-1">ค่าบริการการใช้รถฟอร์คลิฟท์ 2,000 บาท/คัน/วัน :</Label>
                <Input
                  value={orderingCosts.forklift}
                  onChange={(e) => setOrderingCosts(prev => ({ ...prev, forklift: e.target.value }))}
                  className="w-32 ml-4"
                />
              </div>

              <div className="flex justify-between items-center">
                <Label className="flex-1">ค่าบริการถ่ายเอกสาร 1 บาท/แผ่น :</Label>
                <Input
                  value={orderingCosts.document}
                  onChange={(e) => setOrderingCosts(prev => ({ ...prev, document: e.target.value }))}
                  className="w-32 ml-4"
                />
              </div>

              <div className="flex justify-between items-center">
                <Label className="flex-1">ค่าจัดทำ catalogue และกำหนดรหัสพัสดุ 100 บาท/รายการ :</Label>
                <Input
                  value={orderingCosts.catalog}
                  onChange={(e) => setOrderingCosts(prev => ({ ...prev, catalog: e.target.value }))}
                  className="w-32 ml-4"
                />
              </div>

              <div className="flex justify-end items-center font-bold text-lg pt-4">
                <Label className="mr-4">ค่าใช้จ่ายในการสั่ง รวมเป็น :</Label>
                <span className="text-blue-600">{calculateOrderingTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Carrying Cost Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Carrying Cost</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="flex-1">โกดังวางน้ำมันซ้อนกัน :</Label>
                <div className="flex items-center">
                  <Input
                    value={carryingCosts.warehouseCapacity}
                    onChange={(e) => setCarryingCosts(prev => ({ ...prev, warehouseCapacity: e.target.value }))}
                    className="w-32 mr-2"
                  />
                  <span>[ถัง]</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Label className="flex-1">ค่าเช่าพื้นที่ :</Label>
                <div className="flex items-center">
                  <Input
                    value={carryingCosts.rentalCost}
                    onChange={(e) => setCarryingCosts(prev => ({ ...prev, rentalCost: e.target.value }))}
                    className="w-32 mr-2"
                  />
                  <span className="mr-4">[บาท/ตารางเมตร/เดือน]</span>
                  <span className="mr-2">คิดเป็น :</span>
                  <span className="font-bold text-blue-600">{calculateRentalPerTankPerYear()}</span>
                  <span className="ml-2">[บาท/ถัง/ปี]</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Label className="flex-1">ค่าบริการงานพัสดุสำรองคลัง :</Label>
                <div className="flex items-center">
                  <Input
                    value={carryingCosts.storageCost}
                    onChange={(e) => setCarryingCosts(prev => ({ ...prev, storageCost: e.target.value }))}
                    className="w-32 mr-2"
                  />
                  <span className="mr-4">[% ของราคาเฉลี่ยน้ำมัน 1 ถัง]</span>
                  <span className="mr-2">คิดเป็น :</span>
                  <span className="font-bold text-blue-600">{calculateStoragePerTankPerYear()}</span>
                  <span className="ml-2">[บาท/ถัง/ปี]</span>
                </div>
              </div>

              <div className="flex justify-end items-center font-bold text-lg pt-4">
                <Label className="mr-4">ค่าใช้จ่ายในการเก็บ รวมเป็น :</Label>
                <span className="text-blue-600">{calculateCarryingTotal()}</span>
                <span className="ml-2">[บาท/ถัง/ปี]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CostAnalysis;
