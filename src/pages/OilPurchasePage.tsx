
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, FileDownload } from "lucide-react";
import { toast } from "sonner";

const OilPurchasePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Mock data for oil purchase orders
  const purchaseOrders = [
    {
      id: "PO-2024-001",
      date: "2024-01-15",
      supplier: "Shell Thailand",
      oilType: "Transformer Oil - High Performance",
      quantity: 5000,
      unit: "ลิตร",
      unitPrice: 45.50,
      totalAmount: 227500,
      status: "completed",
      deliveryDate: "2024-01-20"
    },
    {
      id: "PO-2024-002", 
      date: "2024-02-10",
      supplier: "PTT Oil and Retail",
      oilType: "Transformer Oil - Standard",
      quantity: 3000,
      unit: "ลิตร",
      unitPrice: 42.00,
      totalAmount: 126000,
      status: "pending",
      deliveryDate: "2024-02-25"
    },
    {
      id: "PO-2024-003",
      date: "2024-03-05",
      supplier: "Bangchak Corporation",
      oilType: "Transformer Oil - Premium",
      quantity: 2500,
      unit: "ลิตร",
      unitPrice: 48.75,
      totalAmount: 121875,
      status: "in_transit",
      deliveryDate: "2024-03-15"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">สำเร็จ</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">รอดำเนินการ</Badge>;
      case 'in_transit':
        return <Badge className="bg-blue-100 text-blue-800">กำลังจัดส่ง</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const handleExport = () => {
    toast.success("ส่งออกข้อมูลเรียบร้อย");
  };

  const filteredOrders = purchaseOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.oilType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    const matchesDateFrom = !dateFrom || order.date >= dateFrom;
    const matchesDateTo = !dateTo || order.date <= dateTo;
    
    return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
  });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            รายการสั่งซื้อน้ำมัน
          </h1>
          <p className="text-gray-500">จัดการข้อมูลการสั่งซื้อน้ำมันหม้อแปลงไฟฟ้า</p>
        </div>

        {/* Search and Filter Card */}
        <Card className="shadow-md border-none">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
            <CardTitle className="text-lg font-semibold text-blue-700 flex items-center gap-2">
              <Search className="h-5 w-5" />
              ค้นหาและกรอง
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label>ค้นหา</Label>
                <Input
                  placeholder="เลขที่ PO, ผู้จำหน่าย, ประเภทน้ำมัน"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>สถานะ</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกสถานะ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">ทั้งหมด</SelectItem>
                    <SelectItem value="completed">สำเร็จ</SelectItem>
                    <SelectItem value="pending">รอดำเนินการ</SelectItem>
                    <SelectItem value="in_transit">กำลังจัดส่ง</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>วันที่เริ่มต้น</Label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>วันที่สิ้นสุด</Label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="invisible">Actions</Label>
                <div className="flex gap-2">
                  <Button onClick={handleExport} variant="outline" className="flex-1">
                    <FileDownload className="h-4 w-4 mr-2" />
                    ส่งออก
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Purchase Orders Table */}
        <Card className="shadow-md border-none">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold text-blue-700">
                รายการสั่งซื้อ ({filteredOrders.length} รายการ)
              </CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                สั่งซื้อใหม่
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">เลขที่ PO</TableHead>
                    <TableHead className="font-semibold">วันที่สั่งซื้อ</TableHead>
                    <TableHead className="font-semibold">ผู้จำหน่าย</TableHead>
                    <TableHead className="font-semibold">ประเภทน้ำมัน</TableHead>
                    <TableHead className="font-semibold">จำนวน</TableHead>
                    <TableHead className="font-semibold">ราคาต่อหน่วย</TableHead>
                    <TableHead className="font-semibold">ราคารวม</TableHead>
                    <TableHead className="font-semibold">วันที่ส่งมอบ</TableHead>
                    <TableHead className="font-semibold">สถานะ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-blue-600">
                        {order.id}
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell>{order.oilType}</TableCell>
                      <TableCell>
                        {order.quantity.toLocaleString()} {order.unit}
                      </TableCell>
                      <TableCell>
                        ฿{order.unitPrice.toFixed(2)}
                      </TableCell>
                      <TableCell className="font-semibold">
                        ฿{order.totalAmount.toLocaleString()}
                      </TableCell>
                      <TableCell>{order.deliveryDate}</TableCell>
                      <TableCell>
                        {getStatusBadge(order.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OilPurchasePage;
