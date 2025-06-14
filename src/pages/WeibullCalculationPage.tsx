
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Settings } from "lucide-react";
import { toast } from "sonner";

const WeibullCalculationPage = () => {
  const [equipment, setEquipment] = useState('');
  const [voltageRating, setVoltageRating] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [type, setType] = useState('');
  const [failureDetails, setFailureDetails] = useState('');
  const [timeInterval, setTimeInterval] = useState('');
  const [leadTime, setLeadTime] = useState('');

  const handleCalculate = () => {
    if (!equipment || !voltageRating || !manufacturer || !type || !failureDetails || !timeInterval || !leadTime) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    // Mock calculation
    toast.success("คำนวณเสร็จสิ้น");
    console.log("Weibull calculation performed with:", {
      equipment,
      voltageRating,
      manufacturer,
      type,
      failureDetails,
      timeInterval,
      leadTime
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Bushing, Arrester, OLTC
          </h1>
          <p className="text-gray-500">ระบบคำนวณ Weibull สำหรับอุปกรณ์หม้อแปลงไฟฟ้า</p>
        </div>

        {/* Weibull Calculation Card */}
        <Card className="shadow-md border-none">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
            <CardTitle className="text-lg font-semibold text-blue-700 flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Weibull Calculation
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>อุปกรณ์ :</Label>
                  <Select value={equipment} onValueChange={setEquipment}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกอุปกรณ์" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bushing">Bushing</SelectItem>
                      <SelectItem value="arrester">Arrester</SelectItem>
                      <SelectItem value="oltc">OLTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Voltage Rating :</Label>
                  <Select value={voltageRating} onValueChange={setVoltageRating}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือก Voltage Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="22kv">22 kV</SelectItem>
                      <SelectItem value="115kv">115 kV</SelectItem>
                      <SelectItem value="230kv">230 kV</SelectItem>
                      <SelectItem value="500kv">500 kV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Manufacturer :</Label>
                  <Select value={manufacturer} onValueChange={setManufacturer}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกผู้ผลิต" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="abb">ABB</SelectItem>
                      <SelectItem value="siemens">Siemens</SelectItem>
                      <SelectItem value="ge">GE</SelectItem>
                      <SelectItem value="schneider">Schneider Electric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Type :</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกประเภท" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="type1">Type 1</SelectItem>
                      <SelectItem value="type2">Type 2</SelectItem>
                      <SelectItem value="type3">Type 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>รายละเอียดความผิดปกติหรือเสียหาย :</Label>
                  <Select value={failureDetails} onValueChange={setFailureDetails}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกรายละเอียด" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electrical">ไฟฟ้าขัดข้อง</SelectItem>
                      <SelectItem value="mechanical">เครื่องกลขัดข้อง</SelectItem>
                      <SelectItem value="aging">เสื่อมสภาพตามอายุใช้งาน</SelectItem>
                      <SelectItem value="environmental">สภาพแวดล้อม</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Time Interval for Failure Observation (years) :</Label>
                  <Input
                    type="number"
                    placeholder="กรอกจำนวนปี"
                    value={timeInterval}
                    onChange={(e) => setTimeInterval(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Lead Time (years) :</Label>
                  <Input
                    type="number"
                    placeholder="กรอกจำนวนปี"
                    value={leadTime}
                    onChange={(e) => setLeadTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleCalculate} 
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                คำนวณ
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default WeibullCalculationPage;
