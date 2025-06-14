
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Package } from "lucide-react";
import { toast } from "sonner";

const ComponentsInventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Mock data for components inventory
  const mockComponents = [
    { id: 1, name: "Bushing Type A", category: "Bushing", quantity: 25, unit: "ชิ้น", location: "คลัง A-01" },
    { id: 2, name: "Lightning Arrester 15kV", category: "Arrester", quantity: 12, unit: "ชิ้น", location: "คลัง B-02" },
    { id: 3, name: "OLTC Contact", category: "OLTC", quantity: 8, unit: "ชุด", location: "คลัง C-03" },
    { id: 4, name: "Cooling Fan Motor", category: "Cooling", quantity: 15, unit: "ชิ้น", location: "คลัง A-02" },
    { id: 5, name: "Pressure Relief Valve", category: "Safety", quantity: 6, unit: "ชิ้น", location: "คลัง D-01" },
  ];

  const categories = ["Bushing", "Arrester", "OLTC", "Cooling", "Safety"];

  const filteredComponents = mockComponents.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         component.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddComponent = () => {
    toast.success("เปิดฟอร์มเพิ่มอุปกรณ์ใหม่");
    // This would open a modal for adding new components
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl shadow-sm border border-green-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            คลังอุปกรณ์หม้อแปลงไฟฟ้า
          </h1>
          <p className="text-gray-500">จัดการและติดตามอุปกรณ์สำรองสำหรับหม้อแปลงไฟฟ้า</p>
        </div>

        {/* Search and Filter Controls */}
        <Card className="shadow-md border-none">
          <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-green-100">
            <CardTitle className="text-lg font-semibold text-green-700 flex items-center gap-2">
              <Search className="h-5 w-5" />
              ค้นหาและกรองข้อมูล
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>ค้นหาอุปกรณ์</Label>
                <Input
                  placeholder="ชื่ออุปกรณ์หรือประเภท"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ประเภทอุปกรณ์</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกประเภท" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">ทั้งหมด</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddComponent} className="w-full bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  เพิ่มอุปกรณ์ใหม่
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Components Table */}
        <Card className="shadow-md border-none">
          <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-green-100">
            <CardTitle className="text-lg font-semibold text-green-700 flex items-center gap-2">
              <Package className="h-5 w-5" />
              รายการอุปกรณ์ในคลัง
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-center">ลำดับ</TableHead>
                  <TableHead>ชื่ออุปกรณ์</TableHead>
                  <TableHead>ประเภท</TableHead>
                  <TableHead className="text-center">จำนวน</TableHead>
                  <TableHead className="text-center">หน่วย</TableHead>
                  <TableHead>ตำแหน่งในคลัง</TableHead>
                  <TableHead className="text-center">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComponents.map((component, index) => (
                  <TableRow key={component.id} className="hover:bg-gray-50">
                    <TableCell className="text-center font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{component.name}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {component.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">{component.quantity}</TableCell>
                    <TableCell className="text-center">{component.unit}</TableCell>
                    <TableCell>{component.location}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-2 justify-center">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toast.success("เปิดฟอร์มแก้ไขอุปกรณ์")}
                        >
                          แก้ไข
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toast.success("เปิดฟอร์มเบิกจ่ายอุปกรณ์")}
                        >
                          เบิกจ่าย
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ComponentsInventoryPage;
