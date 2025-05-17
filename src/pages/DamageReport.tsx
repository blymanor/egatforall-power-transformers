
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

const DamageReport = () => {
  const { toast } = useToast();
  const [region, setRegion] = useState("");
  const [station, setStation] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [transformer, setTransformer] = useState("");
  const [environment, setEnvironment] = useState("");
  const [operationCondition, setOperationCondition] = useState("");
  const [abnormalityDetail, setAbnormalityDetail] = useState("");
  const [equipmentGroup, setEquipmentGroup] = useState("");
  const [damagedComponent, setDamagedComponent] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [rootCause, setRootCause] = useState("");
  const [management, setManagement] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [showChart, setShowChart] = useState(false);

  // Mock data for the pie chart
  const damageData = [
    { name: 'การเสื่อมสภาพตามอายุ', value: 45, color: '#0088FE' },
    { name: 'ความผิดพลาดจากผู้ปฏิบัติงาน', value: 25, color: '#00C49F' },
    { name: 'สภาพแวดล้อมไม่เหมาะสม', value: 30, color: '#FF8042' },
  ];

  const handleDone = () => {
    toast({
      title: "สร้างรายงานสำเร็จ",
      description: "กำลังสร้างรายงานตามเงื่อนไขที่เลือก",
    });
    setShowChart(true);
  };

  // Common styles for select triggers
  const selectTriggerClass = "w-full sm:w-64 border border-gray-300";

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0442AF]">Power Transformers</h1>
          <p className="text-gray-500">ระบบหม้อแปลงไฟฟ้ากำลัง</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="mx-auto max-w-3xl shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-center mb-8 bg-white rounded-full py-3 shadow-sm">
              รายงานตามผู้ใช้งานสำหรับข้อมูลความเสียหาย
            </h2>

            <div className="space-y-6 mb-8">
              <h3 className="text-blue-600 font-medium text-lg">
                เลือกเงื่อนไขในการสร้างกราฟ (เลือกได้เพียงหนึ่งเงื่อนไขเท่านั้น)
              </h3>

              <div className="grid grid-cols-1 gap-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-32 text-gray-700 font-medium">อายุ :</Label>
                  <div className="grid grid-cols-2 gap-4 w-full sm:w-64">
                    <div>
                      <Label className="text-sm text-gray-500 mb-1">เริ่มต้น</Label>
                      <Input 
                        type="number" 
                        value={ageMin} 
                        onChange={(e) => setAgeMin(e.target.value)}
                        placeholder="0"
                        className="w-full" 
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500 mb-1">สิ้นสุด</Label>
                      <Input 
                        type="number" 
                        value={ageMax} 
                        onChange={(e) => setAgeMax(e.target.value)}
                        placeholder="50"
                        className="w-full" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-32 text-gray-700 font-medium">เขต :</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Please Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="north">ภาคเหนือ</SelectItem>
                      <SelectItem value="northeast">ภาคตะวันออกเฉียงเหนือ</SelectItem>
                      <SelectItem value="central">ภาคกลาง</SelectItem>
                      <SelectItem value="south">ภาคใต้</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-32 text-gray-700 font-medium">สถานีไฟฟ้า :</Label>
                  <Select value={station} onValueChange={setStation}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Please Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="station1">สถานีไฟฟ้า 1</SelectItem>
                      <SelectItem value="station2">สถานีไฟฟ้า 2</SelectItem>
                      <SelectItem value="station3">สถานีไฟฟ้า 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-32 text-gray-700 font-medium">ชื่อบริษัทผู้ผลิต :</Label>
                  <Select value={manufacturer} onValueChange={setManufacturer}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Please Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="abb">ABB</SelectItem>
                      <SelectItem value="siemens">Siemens</SelectItem>
                      <SelectItem value="hitachi">Hitachi</SelectItem>
                      <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-32 text-gray-700 font-medium">หม้อแปลงไฟฟ้า :</Label>
                  <Select value={transformer} onValueChange={setTransformer}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Please Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="t1">AN-472A</SelectItem>
                      <SelectItem value="t2">AN-473A</SelectItem>
                      <SelectItem value="t3">AN-472B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-32 text-gray-700 font-medium">สภาพแวดล้อม :</Label>
                  <Select value={environment} onValueChange={setEnvironment}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Please Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="env1">ในร่ม</SelectItem>
                      <SelectItem value="env2">กลางแจ้ง</SelectItem>
                      <SelectItem value="env3">ทะเล</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-32 text-gray-700 font-medium whitespace-normal sm:whitespace-nowrap">สภาวะการใช้งาน <br className="sm:hidden" />ขณะพบความผิดปกติ :</Label>
                  <Select value={operationCondition} onValueChange={setOperationCondition}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Please Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="op1">ขณะใช้งาน</SelectItem>
                      <SelectItem value="op2">ขณะซ่อมบำรุง</SelectItem>
                      <SelectItem value="op3">ขณะหยุดการใช้งาน</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-32 text-gray-700 font-medium whitespace-normal sm:whitespace-nowrap">รายละเอียดความ<br className="sm:hidden" />ผิดปกติหรือเสียหาย :</Label>
                  <Select value={abnormalityDetail} onValueChange={setAbnormalityDetail}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Please Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="abn1">Oil Leak</SelectItem>
                      <SelectItem value="abn2">Overheating</SelectItem>
                      <SelectItem value="abn3">Bushing Failure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-32 text-gray-700 font-medium">กลุ่มอุปกรณ์ :</Label>
                  <Select value={equipmentGroup} onValueChange={setEquipmentGroup}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Please Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="eq1">Main Body</SelectItem>
                      <SelectItem value="eq2">Cooling System</SelectItem>
                      <SelectItem value="eq3">Control System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-32 text-gray-700 font-medium whitespace-normal sm:whitespace-nowrap">ชิ้นส่วนที่เสียหาย<br className="sm:hidden" />หรือผิดปกติ :</Label>
                  <Select value={damagedComponent} onValueChange={setDamagedComponent}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Please Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="comp1">Bushing</SelectItem>
                      <SelectItem value="comp2">Radiator</SelectItem>
                      <SelectItem value="comp3">Gasket</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-32 text-gray-700 font-medium">ระดับความเสียหาย :</Label>
                  <Select value={riskLevel} onValueChange={setRiskLevel}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Please Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="low">ต่ำ</SelectItem>
                      <SelectItem value="medium">ปานกลาง</SelectItem>
                      <SelectItem value="high">สูง</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-32 text-gray-700 font-medium">สาเหตุที่แท้จริง :</Label>
                  <Select value={rootCause} onValueChange={setRootCause}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Please Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="cause1">การเสื่อมสภาพตามอายุ</SelectItem>
                      <SelectItem value="cause2">ความผิดพลาดจากผู้ปฏิบัติงาน</SelectItem>
                      <SelectItem value="cause3">สภาพแวดล้อมไม่เหมาะสม</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Label className="w-32 text-gray-700 font-medium">การจัดการ :</Label>
                  <Select value={management} onValueChange={setManagement}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Please Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="mgmt1">ซ่อมแซม</SelectItem>
                      <SelectItem value="mgmt2">เปลี่ยนอะไหล่</SelectItem>
                      <SelectItem value="mgmt3">เปลี่ยนทั้งหมด</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <h3 className="text-blue-600 font-medium text-lg">
                เลือกการแบ่งกลุ่ม (แบ่งตาม)
              </h3>

              <div>
                <Select value={groupBy} onValueChange={setGroupBy}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="เขต" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="region">เขต</SelectItem>
                    <SelectItem value="station">สถานีไฟฟ้า</SelectItem>
                    <SelectItem value="manufacturer">บริษัทผู้ผลิต</SelectItem>
                    <SelectItem value="transformer">หม้อแปลงไฟฟ้า</SelectItem>
                    <SelectItem value="environment">สภาพแวดล้อม</SelectItem>
                    <SelectItem value="abnormality">ความผิดปกติ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {showChart && (
              <div className="bg-white rounded-lg p-4 shadow-inner mb-8 animate-fade-in">
                <h3 className="text-center text-lg font-medium mb-4">ผลลัพธ์การรายงานข้อมูลความเสียหาย</h3>
                <div className="h-80">
                  <ChartContainer 
                    config={{
                      cause1: { label: "การเสื่อมสภาพตามอายุ", color: "#0088FE" },
                      cause2: { label: "ความผิดพลาดจากผู้ปฏิบัติงาน", color: "#00C49F" },
                      cause3: { label: "สภาพแวดล้อมไม่เหมาะสม", color: "#FF8042" },
                    }}
                  >
                    <PieChart>
                      <Pie
                        data={damageData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {damageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                      <ChartTooltip />
                    </PieChart>
                  </ChartContainer>
                </div>
              </div>
            )}

            <div className="flex justify-center mt-10">
              <Button 
                onClick={handleDone} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-12"
              >
                Done
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DamageReport;
