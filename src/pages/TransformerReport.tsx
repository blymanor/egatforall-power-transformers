
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
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const TransformerReport = () => {
  const { toast } = useToast();
  const [region, setRegion] = useState("");
  const [station, setStation] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [transformer, setTransformer] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTransformer, setCurrentTransformer] = useState(null);

  // Mock data for the pie chart
  const reportData = [
    { name: 'ภาคเหนือ', value: 25, color: '#0088FE' },
    { name: 'ภาคตะวันออกเฉียงเหนือ', value: 35, color: '#00C49F' },
    { name: 'ภาคกลาง', value: 30, color: '#FFBB28' },
    { name: 'ภาคใต้', value: 10, color: '#FF8042' },
  ];

  // Mock data for the transformer table
  const transformerData = [
    { id: 1, name: "AN-A", equipmentNo: "70000016001", manufacturer: "Electro Bangkok", capacity: "50.0", actions: "" },
    { id: 2, name: "AN-K12A", equipmentNo: "70000016003", manufacturer: "OSAKA", capacity: "50.0", actions: "" },
    { id: 3, name: "AN-K12A", equipmentNo: "70000016201", manufacturer: "DoRan", capacity: "300.0", actions: "" },
    { id: 4, name: "AN-K12A", equipmentNo: "70000016201", manufacturer: "Siemens", capacity: "300.0", actions: "" },
    { id: 5, name: "AN-K12A", equipmentNo: "70000016201", manufacturer: "Siemens", capacity: "300.0", actions: "" },
    { id: 6, name: "AN-K12A", equipmentNo: "70000016201", manufacturer: "OSAKA", capacity: "300.0", actions: "" },
    { id: 7, name: "AN-K12A", equipmentNo: "70000016201", manufacturer: "Siemens", capacity: "300.0", actions: "" },
    { id: 8, name: "AN-K12A", equipmentNo: "70000016201", manufacturer: "Siemens", capacity: "50.0", actions: "" },
    { id: 9, name: "AN-K12A", equipmentNo: "70000016201", manufacturer: "Siemens", capacity: "50.0", actions: "" },
    { id: 10, name: "AN-K12A", equipmentNo: "70000016201", manufacturer: "Electro", capacity: "50.0", actions: "" },
  ];

  const handleDone = () => {
    toast({
      title: "สร้างรายงานสำเร็จ",
      description: "กำลังสร้างรายงานตามเงื่อนไขที่เลือก",
    });
    setShowChart(true);
    setShowTable(false);
  };

  const handleEdit = (transformer) => {
    setIsEditing(true);
    setCurrentTransformer(transformer);
    setShowAddEditModal(true);
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentTransformer(null);
    setShowAddEditModal(true);
  };

  const handleCloseModal = () => {
    setShowAddEditModal(false);
  };

  const handleSave = () => {
    toast({
      title: isEditing ? "บันทึกการแก้ไขสำเร็จ" : "เพิ่มรายการสำเร็จ",
      description: isEditing ? "แก้ไขข้อมูลหม้อแปลงไฟฟ้าเรียบร้อยแล้ว" : "เพิ่มข้อมูลหม้อแปลงไฟฟ้าเรียบร้อยแล้ว",
    });
    setShowAddEditModal(false);
  };

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0442AF]">Power Transformers</h1>
          <p className="text-gray-500">ระบบหม้อแปลงไฟฟ้ากำลัง</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        {showTable ? (
          <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
            <CardContent className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">หม้อแปลงไฟฟ้า</h2>
                <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
                  + เพิ่มหม้อแปลงไฟฟ้า
                </Button>
              </div>

              <div className="flex items-center mb-4 space-x-2">
                <Label className="text-gray-700">เขต</Label>
                <Select value="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="north">ภาคเหนือ</SelectItem>
                    <SelectItem value="northeast">ภาคตะวันออกเฉียงเหนือ</SelectItem>
                    <SelectItem value="central">ภาคกลาง</SelectItem>
                    <SelectItem value="south">ภาคใต้</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>หม้อแปลงไฟฟ้า</TableHead>
                      <TableHead>Equipment No.</TableHead>
                      <TableHead>บริษัทผู้ผลิต</TableHead>
                      <TableHead>พิกัดกำลังไฟฟ้าสูงสุด (MVA)</TableHead>
                      <TableHead>แก้ไขรายการ</TableHead>
                      <TableHead>ลบรายการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transformerData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.equipmentNo}</TableCell>
                        <TableCell>{item.manufacturer}</TableCell>
                        <TableCell>{item.capacity}</TableCell>
                        <TableCell>
                          <Button variant="ghost" className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit(item)}>
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" className="text-red-600 hover:text-red-800">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-center items-center mt-6 space-x-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="outline" className="bg-blue-600 text-white">
                  1
                </Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">100</Button>
                <Button variant="outline">Next</Button>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {!showTable && (
          <Card className="mx-auto max-w-3xl shadow-md rounded-xl overflow-hidden border-0">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-center mb-8 bg-white rounded-full py-3 shadow-sm">
                รายงานตามผู้ใช้งานสำหรับหม้อแปลงไฟฟ้า
              </h2>

              <div className="space-y-6 mb-8">
                <h3 className="text-blue-600 font-medium text-lg">
                  เลือกเงื่อนไขในการสร้างกราฟ
                </h3>

                <div className="grid grid-cols-1 gap-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <Label className="w-32 text-gray-700 font-medium">เขต :</Label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger className="w-full sm:w-64">
                        <SelectValue placeholder="ทั้งหมด" />
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
                      <SelectTrigger className="w-full sm:w-64">
                        <SelectValue placeholder="ทั้งหมด" />
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
                      <SelectTrigger className="w-full sm:w-64">
                        <SelectValue placeholder="ทั้งหมด" />
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
                      <SelectTrigger className="w-full sm:w-64">
                        <SelectValue placeholder="ทั้งหมด" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">ทั้งหมด</SelectItem>
                        <SelectItem value="t1">AN-472A</SelectItem>
                        <SelectItem value="t2">AN-473A</SelectItem>
                        <SelectItem value="t3">AN-472B</SelectItem>
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
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue placeholder="เขต" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region">เขต</SelectItem>
                      <SelectItem value="station">สถานีไฟฟ้า</SelectItem>
                      <SelectItem value="manufacturer">บริษัทผู้ผลิต</SelectItem>
                      <SelectItem value="transformer">หม้อแปลงไฟฟ้า</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {showChart && (
                <div className="bg-white rounded-lg p-4 shadow-inner mb-8 animate-fade-in">
                  <h3 className="text-center text-lg font-medium mb-4">ผลลัพธ์การรายงาน</h3>
                  <div className="h-80">
                    <ChartContainer 
                      config={{
                        region1: { label: "ภาคเหนือ", color: "#0088FE" },
                        region2: { label: "ภาคตะวันออกเฉียงเหนือ", color: "#00C49F" },
                        region3: { label: "ภาคกลาง", color: "#FFBB28" },
                        region4: { label: "ภาคใต้", color: "#FF8042" },
                      }}
                    >
                      <PieChart>
                        <Pie
                          data={reportData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {reportData.map((entry, index) => (
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
        )}

        {/* Add/Edit Transformer Modal */}
        <Dialog open={showAddEditModal} onOpenChange={setShowAddEditModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isEditing ? "แก้ไขข้อมูลหม้อแปลงไฟฟ้า" : "เพิ่มข้อมูลหม้อแปลงไฟฟ้า"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <Label className="text-gray-700">Equipment No.</Label>
                <Input 
                  defaultValue={isEditing ? currentTransformer?.equipmentNo : ""} 
                  placeholder="Enter equipment number"
                />
                
                <Label className="text-gray-700">สัญญาเลขที่</Label>
                <Input 
                  defaultValue={isEditing ? "12345678" : ""} 
                  placeholder="Enter contract number"
                />
                
                <Label className="text-gray-700">สถานีไฟฟ้า</Label>
                <Select defaultValue={isEditing ? "station1" : ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select station" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="station1">สถานีไฟฟ้า 1</SelectItem>
                    <SelectItem value="station2">สถานีไฟฟ้า 2</SelectItem>
                    <SelectItem value="station3">สถานีไฟฟ้า 3</SelectItem>
                  </SelectContent>
                </Select>
                
                <Label className="text-gray-700">ชื่อหม้อแปลงไฟฟ้า</Label>
                <Input 
                  defaultValue={isEditing ? currentTransformer?.name : ""} 
                  placeholder="Enter transformer name"
                />
                
                <Label className="text-gray-700">หมายเลขผลิต</Label>
                <Select defaultValue={isEditing ? "123" : ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select serial number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="123">123</SelectItem>
                    <SelectItem value="124">124</SelectItem>
                    <SelectItem value="125">125</SelectItem>
                  </SelectContent>
                </Select>
                
                <Label className="text-gray-700">ตำแหน่งที่ตั้ง</Label>
                <Select defaultValue={isEditing ? "pos1" : ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pos1">ตำแหน่ง 1</SelectItem>
                    <SelectItem value="pos2">ตำแหน่ง 2</SelectItem>
                    <SelectItem value="pos3">ตำแหน่ง 3</SelectItem>
                  </SelectContent>
                </Select>
                
                <Label className="text-gray-700">พิกัดกำลังไฟฟ้าสูงสุด (MVA)</Label>
                <Input 
                  defaultValue={isEditing ? currentTransformer?.capacity : ""} 
                  placeholder="Enter capacity"
                />
                
                <Label className="text-gray-700">พิกัดแรงดันไฟฟ้า Primary, kV (kV)</Label>
                <Input 
                  defaultValue={isEditing ? "115" : ""} 
                  placeholder="Enter primary voltage"
                />
                
                <Label className="text-gray-700">พิกัดแรงดันไฟฟ้า Secondary, LV (kV)</Label>
                <Input 
                  defaultValue={isEditing ? "22" : ""} 
                  placeholder="Enter secondary voltage"
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={handleCloseModal}>Cancel</Button>
                <Button className="bg-blue-600" onClick={handleSave}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default TransformerReport;
