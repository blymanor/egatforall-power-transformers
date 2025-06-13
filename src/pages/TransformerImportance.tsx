import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

interface TransformerData {
  id: string;
  transformerCode: string;
  substation: string;
  zone: string;
  region: string;
  province: string;
  district: string;
  voltageLevel: string;
  capacity: string;
  manufacturer: string;
  year: string;
  importance: 'สูงมาก' | 'สูง' | 'ปานกลาง' | 'ต่ำ';
  installationDate: string;
  lastMaintenance: string;
  nextMaintenance: string;
  operationHours: string;
  loadFactor: string;
  conditionIndex: string;
  criticalityScore: string;
  businessImpact: string;
  riskLevel: string;
}

const initialData: TransformerData[] = [
  {
    id: "1",
    transformerCode: "TR-001",
    substation: "สถานีไฟฟ้าบางกรวย",
    zone: "กรุงเทพและปริมณฑล",
    region: "ภาคกลาง",
    province: "นนทบุรี",
    district: "บางกรวย",
    voltageLevel: "115/22 kV",
    capacity: "50 MVA",
    manufacturer: "ABB",
    year: "2018",
    importance: 'สูงมาก',
    installationDate: "15/03/2018",
    lastMaintenance: "10/01/2024",
    nextMaintenance: "10/01/2025",
    operationHours: "52,800",
    loadFactor: "85%",
    conditionIndex: "92",
    criticalityScore: "8.5",
    businessImpact: "สูงมาก",
    riskLevel: "ต่ำ"
  },
  {
    id: "2",
    transformerCode: "TR-002",
    substation: "สถานีไฟฟ้าลาดกระบัง",
    zone: "กรุงเทพและปริมณฑล",
    region: "ภาคกลาง",
    province: "กรุงเทพ",
    district: "ลาดกระบัง",
    voltageLevel: "115/22 kV",
    capacity: "30 MVA",
    manufacturer: "Siemens",
    year: "2020",
    importance: 'สูง',
    installationDate: "20/07/2020",
    lastMaintenance: "15/02/2024",
    nextMaintenance: "15/02/2025",
    operationHours: "35,040",
    loadFactor: "78%",
    conditionIndex: "88",
    criticalityScore: "7.2",
    businessImpact: "สูง",
    riskLevel: "ปานกลาง"
  }
];

const TransformerImportance = () => {
  const [data, setData] = useState<TransformerData[]>(initialData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TransformerData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<Partial<TransformerData>>({});

  const getImportanceBadgeColor = (importance: string) => {
    switch (importance) {
      case 'สูงมาก': return 'bg-red-100 text-red-800 border-red-200';
      case 'สูง': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'ปานกลาง': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ต่ำ': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredData = data.filter(item =>
    item.transformerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.substation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    if (!formData.transformerCode || !formData.substation) {
      toast.error("กรุณากรอกข้อมูลที่จำเป็น");
      return;
    }

    const newItem: TransformerData = {
      id: (data.length + 1).toString(),
      transformerCode: formData.transformerCode || "",
      substation: formData.substation || "",
      zone: formData.zone || "",
      region: formData.region || "",
      province: formData.province || "",
      district: formData.district || "",
      voltageLevel: formData.voltageLevel || "",
      capacity: formData.capacity || "",
      manufacturer: formData.manufacturer || "",
      year: formData.year || "",
      importance: formData.importance || 'ปานกลาง',
      installationDate: formData.installationDate || "",
      lastMaintenance: formData.lastMaintenance || "",
      nextMaintenance: formData.nextMaintenance || "",
      operationHours: formData.operationHours || "",
      loadFactor: formData.loadFactor || "",
      conditionIndex: formData.conditionIndex || "",
      criticalityScore: formData.criticalityScore || "",
      businessImpact: formData.businessImpact || "",
      riskLevel: formData.riskLevel || ""
    };

    setData([...data, newItem]);
    setIsAddModalOpen(false);
    resetForm();
    toast.success("เพิ่มข้อมูลสำเร็จ");
  };

  const handleEdit = (item: TransformerData) => {
    setEditingItem(item);
    setFormData(item);
    setIsEditModalOpen(true);
  };

  const handleUpdate = () => {
    if (!editingItem || !formData.transformerCode || !formData.substation) {
      toast.error("กรุณากรอกข้อมูลที่จำเป็น");
      return;
    }

    const updatedData = data.map(item =>
      item.id === editingItem.id ? { ...item, ...formData } : item
    );

    setData(updatedData);
    setIsEditModalOpen(false);
    setEditingItem(null);
    resetForm();
    toast.success("แก้ไขข้อมูลสำเร็จ");
  };

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id));
    toast.success("ลบข้อมูลสำเร็จ");
  };

  const resetForm = () => {
    setFormData({});
  };

  const FormFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0">
      <div className="space-y-2">
        <Label htmlFor="transformerCode">รหัสหม้อแปลง *</Label>
        <Input
          id="transformerCode"
          value={formData.transformerCode || ""}
          onChange={(e) => setFormData({ ...formData, transformerCode: e.target.value })}
          className="border-gray-300"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="substation">สถานีไฟฟ้า *</Label>
        <Input
          id="substation"
          value={formData.substation || ""}
          onChange={(e) => setFormData({ ...formData, substation: e.target.value })}
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="zone">เขต</Label>
        <Input
          id="zone"
          value={formData.zone || ""}
          onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="region">ภาค</Label>
        <Input
          id="region"
          value={formData.region || ""}
          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="province">จังหวัด</Label>
        <Input
          id="province"
          value={formData.province || ""}
          onChange={(e) => setFormData({ ...formData, province: e.target.value })}
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="district">อำเภอ</Label>
        <Input
          id="district"
          value={formData.district || ""}
          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="voltageLevel">ระดับแรงดัน</Label>
        <Input
          id="voltageLevel"
          value={formData.voltageLevel || ""}
          onChange={(e) => setFormData({ ...formData, voltageLevel: e.target.value })}
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="capacity">ความจุ</Label>
        <Input
          id="capacity"
          value={formData.capacity || ""}
          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="manufacturer">ผู้ผลิต</Label>
        <Input
          id="manufacturer"
          value={formData.manufacturer || ""}
          onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="year">ปีที่ผลิต</Label>
        <Input
          id="year"
          value={formData.year || ""}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="importance">ระดับความสำคัญ</Label>
        <Select
          value={formData.importance || ""}
          onValueChange={(value) => setFormData({ ...formData, importance: value as TransformerData['importance'] })}
        >
          <SelectTrigger className="border-gray-300">
            <SelectValue placeholder="เลือกระดับความสำคัญ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="สูงมาก">สูงมาก</SelectItem>
            <SelectItem value="สูง">สูง</SelectItem>
            <SelectItem value="ปานกลาง">ปานกลาง</SelectItem>
            <SelectItem value="ต่ำ">ต่ำ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="installationDate">วันที่ติดตั้ง</Label>
        <Input
          id="installationDate"
          value={formData.installationDate || ""}
          onChange={(e) => setFormData({ ...formData, installationDate: e.target.value })}
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastMaintenance">การบำรุงรักษาล่าสุด</Label>
        <Input
          id="lastMaintenance"
          value={formData.lastMaintenance || ""}
          onChange={(e) => setFormData({ ...formData, lastMaintenance: e.target.value })}
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nextMaintenance">การบำรุงรักษาครั้งถัดไป</Label>
        <Input
          id="nextMaintenance"
          value={formData.nextMaintenance || ""}
          onChange={(e) => setFormData({ ...formData, nextMaintenance: e.target.value })}
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="operationHours">ชั่วโมงการทำงาน</Label>
        <Input
          id="operationHours"
          value={formData.operationHours || ""}
          onChange={(e) => setFormData({ ...formData, operationHours: e.target.value })}
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="loadFactor">ค่าตัวประกอบการใช้โหลด</Label>
        <Input
          id="loadFactor"
          value={formData.loadFactor || ""}
          onChange={(e) => setFormData({ ...formData, loadFactor: e.target.value })}
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="conditionIndex">ดัชนีสภาพ</Label>
        <Input
          id="conditionIndex"
          value={formData.conditionIndex || ""}
          onChange={(e) => setFormData({ ...formData, conditionIndex: e.target.value })}
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="criticalityScore">คะแนนความสำคัญ</Label>
        <Input
          id="criticalityScore"
          value={formData.criticalityScore || ""}
          onChange={(e) => setFormData({ ...formData, criticalityScore: e.target.value })}
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessImpact">ผลกระทบทางธุรกิจ</Label>
        <Input
          id="businessImpact"
          value={formData.businessImpact || ""}
          onChange={(e) => setFormData({ ...formData, businessImpact: e.target.value })}
          className="border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="riskLevel">ระดับความเสี่ยง</Label>
        <Input
          id="riskLevel"
          value={formData.riskLevel || ""}
          onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value })}
          className="border-gray-300"
        />
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader className="bg-white border-b">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="text-2xl font-bold text-blue-700">ความสำคัญหม้อแปลง</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="ค้นหารหัสหม้อแปลง, สถานีไฟฟ้า, เขต..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300"
                  />
                </div>
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => { resetForm(); setIsAddModalOpen(true); }} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      เพิ่มข้อมูล
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                    <DialogHeader className="border-b pb-4">
                      <DialogTitle className="text-xl font-semibold text-blue-700">เพิ่มข้อมูลหม้อแปลง</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <FormFields />
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="border-gray-300">
                        ยกเลิก
                      </Button>
                      <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
                        เพิ่มข้อมูล
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="font-semibold text-blue-800 text-center">รหัสหม้อแปลง</TableHead>
                    <TableHead className="font-semibold text-blue-800 text-center">สถานีไฟฟ้า</TableHead>
                    <TableHead className="font-semibold text-blue-800 text-center">เขต</TableHead>
                    <TableHead className="font-semibold text-blue-800 text-center">ภาค</TableHead>
                    <TableHead className="font-semibold text-blue-800 text-center">จังหวัด</TableHead>
                    <TableHead className="font-semibold text-blue-800 text-center">ระดับแรงดัน</TableHead>
                    <TableHead className="font-semibold text-blue-800 text-center">ความจุ</TableHead>
                    <TableHead className="font-semibold text-blue-800 text-center">ระดับความสำคัญ</TableHead>
                    <TableHead className="font-semibold text-blue-800 text-center">การจัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-blue-50">
                      <TableCell className="text-center font-medium">{item.transformerCode}</TableCell>
                      <TableCell className="text-center">{item.substation}</TableCell>
                      <TableCell className="text-center">{item.zone}</TableCell>
                      <TableCell className="text-center">{item.region}</TableCell>
                      <TableCell className="text-center">{item.province}</TableCell>
                      <TableCell className="text-center">{item.voltageLevel}</TableCell>
                      <TableCell className="text-center">{item.capacity}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={getImportanceBadgeColor(item.importance)}>
                          {item.importance}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item)}
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
            <DialogHeader className="border-b pb-4">
              <DialogTitle className="text-xl font-semibold text-blue-700">แก้ไขข้อมูลหม้อแปลง</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <FormFields />
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)} className="border-gray-300">
                ยกเลิก
              </Button>
              <Button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700">
                บันทึกการแก้ไข
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default TransformerImportance;
