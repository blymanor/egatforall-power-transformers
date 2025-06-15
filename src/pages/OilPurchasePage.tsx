
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Search, Download, Edit, Trash2, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const OilPurchasePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingOrder, setEditingOrder] = useState<any | null>(null);
  const [modalOrderDate, setModalOrderDate] = useState<Date | undefined>(undefined);
  const [modalOrderAmount, setModalOrderAmount] = useState('');
  const [modalPricePerLiter, setModalPricePerLiter] = useState('');
  const [modalReceivedDate, setModalReceivedDate] = useState<Date | undefined>(undefined);
  const [modalTestedAmount, setModalTestedAmount] = useState('');

  // Mock data for oil purchase orders
  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      id: "PO-2024-001",
      orderDate: "2024-01-15",
      supplier: "Shell Thailand",
      oilType: "Transformer Oil - High Performance",
      orderAmount: 5,
      unit: "ถัง",
      unitPrice: 45.50,
      totalAmount: 227500,
      status: "completed",
      receivedDate: "2024-01-20",
      testedAmount: 4.8
    },
    {
      id: "PO-2024-002", 
      orderDate: "2024-02-10",
      supplier: "PTT Oil and Retail",
      oilType: "Transformer Oil - Standard",
      orderAmount: 3,
      unit: "ถัง",
      unitPrice: 42.00,
      totalAmount: 126000,
      status: "pending",
      receivedDate: "2024-02-25",
      testedAmount: 3
    },
    {
      id: "PO-2024-003",
      orderDate: "2024-03-05",
      supplier: "Bangchak Corporation",
      oilType: "Transformer Oil - Premium",
      orderAmount: 2.5,
      unit: "ถัง",
      unitPrice: 48.75,
      totalAmount: 121875,
      status: "in_transit",
      receivedDate: "2024-03-15",
      testedAmount: 2.4
    }
  ]);

  const handleCreate = () => {
    setEditingOrder(null);
    setModalMode('create');
    setModalOrderDate(undefined);
    setModalOrderAmount('');
    setModalPricePerLiter('');
    setModalReceivedDate(undefined);
    setModalTestedAmount('');
    setIsModalOpen(true);
  };

  const handleEdit = (order: any) => {
    setEditingOrder(order);
    setModalMode('edit');
    setModalOrderDate(new Date(order.orderDate));
    setModalOrderAmount(order.orderAmount.toString());
    setModalPricePerLiter(order.unitPrice.toString());
    setModalReceivedDate(new Date(order.receivedDate));
    setModalTestedAmount(order.testedAmount.toString());
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setPurchaseOrders(prev => prev.filter(order => order.id !== id));
    toast.success("ลบข้อมูลสำเร็จ");
  };

  const handleSave = () => {
    if (!modalOrderDate || !modalOrderAmount || !modalPricePerLiter || !modalReceivedDate || !modalTestedAmount) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const newOrder = {
      id: modalMode === 'edit' ? editingOrder!.id : `PO-${Date.now()}`,
      orderDate: format(modalOrderDate, 'yyyy-MM-dd'),
      orderAmount: parseFloat(modalOrderAmount),
      unitPrice: parseFloat(modalPricePerLiter),
      receivedDate: format(modalReceivedDate, 'yyyy-MM-dd'),
      testedAmount: parseFloat(modalTestedAmount),
      supplier: modalMode === 'edit' ? editingOrder!.supplier : "New Supplier",
      oilType: modalMode === 'edit' ? editingOrder!.oilType : "Transformer Oil",
      unit: "ถัง",
      totalAmount: parseFloat(modalOrderAmount) * parseFloat(modalPricePerLiter) * 200, // assuming 200L per tank
      status: "pending"
    };

    if (modalMode === 'edit') {
      setPurchaseOrders(prev => prev.map(order => order.id === editingOrder!.id ? newOrder : order));
      toast.success("แก้ไขข้อมูลสำเร็จ");
    } else {
      setPurchaseOrders(prev => [...prev, newOrder]);
      toast.success("เพิ่มข้อมูลสำเร็จ");
    }

    setIsModalOpen(false);
    setModalOrderDate(undefined);
    setModalOrderAmount('');
    setModalPricePerLiter('');
    setModalReceivedDate(undefined);
    setModalTestedAmount('');
    setEditingOrder(null);
  };

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
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesDateFrom = !dateFrom || order.orderDate >= dateFrom;
    const matchesDateTo = !dateTo || order.orderDate <= dateTo;
    
    return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
  });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            รายการสั่งซื้อ/รับน้ำมัน
          </h1>
          <p className="text-gray-500">จัดการข้อมูลการสั่งซื้อและรับน้ำมันหม้อแปลงไฟฟ้า</p>
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
                    <SelectItem value="all">ทั้งหมด</SelectItem>
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
                    <Download className="h-4 w-4 mr-2" />
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
              <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                เพิ่มรายการใหม่
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-center">ลำดับ</TableHead>
                    <TableHead className="font-semibold text-center">วันที่สั่งซื้อ</TableHead>
                    <TableHead className="font-semibold text-center">ปริมาณสั่งซื้อ [ถัง]</TableHead>
                    <TableHead className="font-semibold text-center">ราคาต่อลิตร [บาท]</TableHead>
                    <TableHead className="font-semibold text-center">วันที่ได้รับ</TableHead>
                    <TableHead className="font-semibold text-center">ปริมาณที่ผ่านการทดสอบ [ถัง]</TableHead>
                    <TableHead className="font-semibold text-center">แก้ไข</TableHead>
                    <TableHead className="font-semibold text-center">ลบ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order, index) => (
                    <TableRow key={order.id} className="hover:bg-gray-50">
                      <TableCell className="text-center font-medium">
                        {index + 1}
                      </TableCell>
                      <TableCell className="text-center">{format(new Date(order.orderDate), 'dd/MM/yyyy')}</TableCell>
                      <TableCell className="text-center">
                        {order.orderAmount}
                      </TableCell>
                      <TableCell className="text-center">
                        {order.unitPrice.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">{format(new Date(order.receivedDate), 'dd/MM/yyyy')}</TableCell>
                      <TableCell className="text-center">
                        {order.testedAmount}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(order)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(order.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-center">
                แก้ไขปริมาณน้ำมันในคลังเริ่มต้น
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>วันที่สั่งซื้อ :</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !modalOrderDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {modalOrderDate ? format(modalOrderDate, "dd/MM/yyyy") : "เลือกวันที่"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={modalOrderDate}
                        onSelect={setModalOrderDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>ปริมาณการสั่งซื้อต่อครั้ง [ถัง] :</Label>
                  <Input
                    type="number"
                    placeholder="เช่น 20"
                    value={modalOrderAmount}
                    onChange={(e) => setModalOrderAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>ราคาที่การสั่งซื้อต่อลิตร [บาท] :</Label>
                  <Input
                    type="number"
                    placeholder="เช่น 24.50"
                    value={modalPricePerLiter}
                    onChange={(e) => setModalPricePerLiter(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>วันที่ได้รับ :</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !modalReceivedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {modalReceivedDate ? format(modalReceivedDate, "dd/MM/yyyy") : "เลือกวันที่"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={modalReceivedDate}
                        onSelect={setModalReceivedDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-2">
                <Label>ปริมาณที่ผ่านการทดสอบ [ถัง] :</Label>
                <Input
                  type="number"
                  placeholder="เช่น 19.8"
                  value={modalTestedAmount}
                  onChange={(e) => setModalTestedAmount(e.target.value)}
                />
              </div>
              <div className="flex justify-center space-x-4 pt-4">
                <Button onClick={handleSave} className="px-8 bg-blue-600 hover:bg-blue-700">
                  บันทึก
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default OilPurchasePage;
