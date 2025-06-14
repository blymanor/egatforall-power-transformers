
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, DollarSign } from "lucide-react";
import { toast } from "sonner";

const ExpenseListPage = () => {
  // Ordering Cost states
  const [domesticService, setDomesticService] = useState('');
  const [damageInspection, setDamageInspection] = useState('');
  const [directSupplies, setDirectSupplies] = useState('');
  const [equipment, setEquipment] = useState('');
  const [bidAnnouncement, setBidAnnouncement] = useState('');
  const [insurance, setInsurance] = useState('');
  const [deficiencyFee, setDeficiencyFee] = useState('');
  const [forklift, setForklift] = useState('');
  const [photocopy, setPhotocopy] = useState('');
  const [catalogue, setCatalogue] = useState('');

  // Carrying Cost states
  const [warehouseCapacity, setWarehouseCapacity] = useState('');
  const [rentalCost, setRentalCost] = useState('');
  const [storageService, setStorageService] = useState('');

  // Calculate total ordering cost
  const calculateOrderingTotal = () => {
    const values = [
      parseFloat(domesticService) || 0,
      parseFloat(damageInspection) || 0,
      parseFloat(directSupplies) || 0,
      parseFloat(equipment) || 0,
      parseFloat(bidAnnouncement) || 0,
      parseFloat(insurance) || 0,
      parseFloat(deficiencyFee) || 0,
      parseFloat(forklift) || 0,
      parseFloat(photocopy) || 0,
      parseFloat(catalogue) || 0,
    ];
    return values.reduce((sum, val) => sum + val, 0);
  };

  // Calculate carrying cost per barrel per year
  const calculateCarryingCostPerBarrel = () => {
    const rental = parseFloat(rentalCost) || 0;
    const capacity = parseFloat(warehouseCapacity) || 1;
    return (rental * 12) / capacity; // บาท/ถัง/ปี
  };

  const calculateStorageServiceCost = () => {
    const service = parseFloat(storageService) || 0;
    return service; // % ของราคาเฉลี่ยน้ำมัน 1 ถัง
  };

  const calculateTotalCarryingCost = () => {
    return calculateCarryingCostPerBarrel() + calculateStorageServiceCost();
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            รายการค่าใช้จ่าย
          </h1>
          <p className="text-gray-500">ระบบจัดการค่าใช้จ่ายในการสั่งซื้อและเก็บรักษาน้ำมันหม้อแปลงไฟฟ้า</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ordering Cost */}
          <Card className="shadow-md border-none">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
              <CardTitle className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Ordering Cost
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>ค่าบริการงานจัดหาในประเทศ 10% ของมูลค่าน้ำมัน (ไม่เกิน 60,000) :</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={domesticService}
                  onChange={(e) => setDomesticService(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ค่าบริการงานแจ้งและสำรวจความเสียหายเนื่องจากการขนส่งและติดตั้ง 2700 บาท/วัน :</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={damageInspection}
                  onChange={(e) => setDamageInspection(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ค่าบริการพัสดุงานตรง 2% ของมูลค่าน้ำมัน :</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={directSupplies}
                  onChange={(e) => setDirectSupplies(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ค่าบริการครุภัณฑ์เครื่องมือเครื่องใช้ 3% ของมูลค่าน้ำมัน :</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ค่าบริการรับฝากขายหรือแจกแบบประกวดราคาและสอบราคางานจัดหาในประเทศ 1,900 บาท/เรื่อง :</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={bidAnnouncement}
                  onChange={(e) => setBidAnnouncement(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ค่าบริการงานแจ้งเอาประกัน 160 บาท/เรื่อง :</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ค่าบริการงานเรียกค่าใช้จ่ายในการออกของและอุปกรณ์ที่ขาดส่งจากคู่สัญญา 1,600 บาท/ชิ้นงาน :</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={deficiencyFee}
                  onChange={(e) => setDeficiencyFee(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ค่าบริการการใช้รถฟอร์คลิฟท์ 2,000 บาท/คัน/วัน :</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={forklift}
                  onChange={(e) => setForklift(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ค่าบริการถ่ายเอกสาร 1 บาท/แผ่น :</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={photocopy}
                  onChange={(e) => setPhotocopy(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ค่าจัดทำ catalogue และกำหนดรหัสพัสดุ 100 บาท/รายการ :</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={catalogue}
                  onChange={(e) => setCatalogue(e.target.value)}
                />
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <Label className="font-semibold">ค่าใช้จ่ายในการสั่ง รวมเป็น :</Label>
                  <span className="text-xl font-bold text-blue-700">
                    {calculateOrderingTotal().toLocaleString()} บาท
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Carrying Cost */}
          <Card className="shadow-md border-none">
            <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-green-100">
              <CardTitle className="text-lg font-semibold text-green-700 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Carrying Cost
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>โกดังวางน้ำมันซ้อนกัน :</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="0"
                    value={warehouseCapacity}
                    onChange={(e) => setWarehouseCapacity(e.target.value)}
                  />
                  <span className="text-sm text-gray-500">[ถัง]</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>ค่าเช่าพื้นที่ :</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="0"
                    value={rentalCost}
                    onChange={(e) => setRentalCost(e.target.value)}
                  />
                  <span className="text-sm text-gray-500">[บาท/ตารางเมตร/เดือน]</span>
                </div>
                <div className="flex justify-between items-center bg-blue-50 p-3 rounded">
                  <span className="text-sm">คิดเป็น :</span>
                  <span className="font-semibold text-blue-700">
                    {calculateCarryingCostPerBarrel().toLocaleString()} [บาท/ถัง/ปี]
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>ค่าบริการงานพัสดุสำรองคลัง :</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="0"
                    value={storageService}
                    onChange={(e) => setStorageService(e.target.value)}
                  />
                  <span className="text-sm text-gray-500">[% ของราคาเฉลี่ยน้ำมัน 1 ถัง]</span>
                </div>
                <div className="flex justify-between items-center bg-blue-50 p-3 rounded">
                  <span className="text-sm">คิดเป็น :</span>
                  <span className="font-semibold text-blue-700">
                    {calculateStorageServiceCost().toLocaleString()} [บาท/ถัง/ปี]
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <Label className="font-semibold">ค่าใช้จ่ายในการเก็บ รวมเป็น :</Label>
                  <span className="text-xl font-bold text-green-700">
                    {calculateTotalCarryingCost().toLocaleString()} [บาท/ถัง/ปี]
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ExpenseListPage;
