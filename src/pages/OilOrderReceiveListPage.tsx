
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ShoppingCart, Plus, Edit, Trash2, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface OilOrder {
  id: number;
  orderDate: string;
  orderAmount: number;
  pricePerLiter: number;
  receivedDate: string;
  testedAmount: number;
}

const OilOrderReceiveListPage = () => {
  const [orders, setOrders] = useState<OilOrder[]>([
    { 
      id: 1, 
      orderDate: '2024-01-10', 
      orderAmount: 20, 
      pricePerLiter: 24.50, 
      receivedDate: '2024-01-15', 
      testedAmount: 19.8 
    },
    { 
      id: 2, 
      orderDate: '2024-02-05', 
      orderAmount: 15, 
      pricePerLiter: 25.75, 
      receivedDate: '2024-02-08', 
      testedAmount: 15 
    },
    { 
      id: 3, 
      orderDate: '2024-03-01', 
      orderAmount: 25, 
      pricePerLiter: 26.25, 
      receivedDate: '2024-03-05', 
      testedAmount: 24.5 
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingOrder, setEditingOrder] = useState<OilOrder | null>(null);
  
  const [modalOrderDate, setModalOrderDate] = useState<Date | undefined>(undefined);
  const [modalOrderAmount, setModalOrderAmount] = useState('');
  const [modalPricePerLiter, setModalPricePerLiter] = useState('');
  const [modalReceivedDate, setModalReceivedDate] = useState<Date | undefined>(undefined);
  const [modalTestedAmount, setModalTestedAmount] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleEdit = (order: OilOrder) => {
    setEditingOrder(order);
    setModalMode('edit');
    setModalOrderDate(new Date(order.orderDate));
    setModalOrderAmount(order.orderAmount.toString());
    setModalPricePerLiter(order.pricePerLiter.toString());
    setModalReceivedDate(new Date(order.receivedDate));
    setModalTestedAmount(order.testedAmount.toString());
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setOrders(prev => prev.filter(order => order.id !== id));
    toast.success("ลบข้อมูลสำเร็จ");
  };

  const handleSave = () => {
    if (!modalOrderDate || !modalOrderAmount || !modalPricePerLiter || !modalReceivedDate || !modalTestedAmount) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const newOrder: OilOrder = {
      id: modalMode === 'edit' ? editingOrder!.id : Date.now(),
      orderDate: format(modalOrderDate, 'yyyy-MM-dd'),
      orderAmount: parseFloat(modalOrderAmount),
      pricePerLiter: parseFloat(modalPricePerLiter),
      receivedDate: format(modalReceivedDate, 'yyyy-MM-dd'),
      testedAmount: parseFloat(modalTestedAmount),
    };

    if (modalMode === 'edit') {
      setOrders(prev => prev.map(order => order.id === editingOrder!.id ? newOrder : order));
      toast.success("แก้ไขข้อมูลสำเร็จ");
    } else {
      setOrders(prev => [...prev, newOrder]);
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

  const filteredOrders = orders.filter(order => 
    searchTerm === '' || 
    order.orderDate.includes(searchTerm) || 
    order.receivedDate.includes(searchTerm) ||
    order.orderAmount.toString().includes(searchTerm)
  );

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            รายการสั่งซื้อ/รับน้ำมัน
          </h1>
          <p className="text-gray-500">ระบบจัดการรายการสั่งซื้อและรับน้ำมันหม้อแปลงไฟฟ้า</p>
        </div>

        {/* Main Content */}
        <Card className="shadow-md border-none">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                รายการสั่งซื้อ/รับน้ำมัน
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="ค้นหาข้อมูล..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  เพิ่มรายการใหม่
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-blue-50 text-blue-700 text-center">ลำดับ</TableHead>
                    <TableHead className="bg-blue-50 text-blue-700 text-center">วันที่สั่งซื้อ</TableHead>
                    <TableHead className="bg-blue-50 text-blue-700 text-center">ปริมาณสั่งซื้อ [ถัง]</TableHead>
                    <TableHead className="bg-blue-50 text-blue-700 text-center">ราคาต่อลิตร [บาท]</TableHead>
                    <TableHead className="bg-blue-50 text-blue-700 text-center">วันที่ได้รับ</TableHead>
                    <TableHead className="bg-blue-50 text-blue-700 text-center">ปริมาณที่ผ่านการทดสอบ [ถัง]</TableHead>
                    <TableHead className="bg-blue-50 text-blue-700 text-center">แก้ไข</TableHead>
                    <TableHead className="bg-blue-50 text-blue-700 text-center">ลบ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order, index) => (
                    <TableRow key={order.id} className="hover:bg-blue-50/50">
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell className="text-center">{format(new Date(order.orderDate), 'dd/MM/yyyy')}</TableCell>
                      <TableCell className="text-center font-medium text-blue-700">{order.orderAmount}</TableCell>
                      <TableCell className="text-center">{order.pricePerLiter}</TableCell>
                      <TableCell className="text-center">{format(new Date(order.receivedDate), 'dd/MM/yyyy')}</TableCell>
                      <TableCell className="text-center font-medium text-green-700">{order.testedAmount}</TableCell>
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
                {modalMode === 'edit' ? 'แก้ไข' : 'เพิ่ม'}รายการสั่งซื้อ/รับน้ำมัน
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

export default OilOrderReceiveListPage;
