
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrderRecord {
  id: number;
  orderDate: string;
  orderAmount: string;
  pricePerLiter: string;
  receivedDate: string;
  testedAmount: string;
}

const OilOrders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<OrderRecord | null>(null);
  const [searchDate1, setSearchDate1] = useState<Date>();
  const [searchDate2, setSearchDate2] = useState<Date>();
  const [formData, setFormData] = useState({
    orderDate: undefined as Date | undefined,
    orderAmount: '',
    pricePerLiter: '',
    receivedDate: undefined as Date | undefined,
    testedAmount: ''
  });

  const [ordersData, setOrdersData] = useState<OrderRecord[]>([
    { 
      id: 1, 
      orderDate: '01/11/2010', 
      orderAmount: '350', 
      pricePerLiter: '59.00', 
      receivedDate: '15/11/2010', 
      testedAmount: '350' 
    },
    { 
      id: 2, 
      orderDate: '15/12/2010', 
      orderAmount: '166', 
      pricePerLiter: '60.00', 
      receivedDate: '30/12/2010', 
      testedAmount: '166' 
    },
    { 
      id: 3, 
      orderDate: '12/07/2011', 
      orderAmount: '200', 
      pricePerLiter: '61.00', 
      receivedDate: '25/07/2011', 
      testedAmount: '200' 
    }
  ]);

  const handleEdit = (item: OrderRecord) => {
    setEditingItem(item);
    setFormData({
      orderDate: new Date(),
      orderAmount: item.orderAmount,
      pricePerLiter: item.pricePerLiter,
      receivedDate: new Date(),
      testedAmount: item.testedAmount
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      orderDate: undefined,
      orderAmount: '',
      pricePerLiter: '',
      receivedDate: undefined,
      testedAmount: ''
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.orderAmount || !formData.pricePerLiter || !formData.testedAmount) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (editingItem) {
      setOrdersData(prev => 
        prev.map(item => 
          item.id === editingItem.id 
            ? { 
                ...item, 
                orderDate: formData.orderDate ? format(formData.orderDate, "dd/MM/yyyy") : item.orderDate,
                orderAmount: formData.orderAmount,
                pricePerLiter: formData.pricePerLiter,
                receivedDate: formData.receivedDate ? format(formData.receivedDate, "dd/MM/yyyy") : item.receivedDate,
                testedAmount: formData.testedAmount
              }
            : item
        )
      );
      toast.success("แก้ไขข้อมูลสำเร็จ");
    } else {
      const newItem: OrderRecord = {
        id: Math.max(...ordersData.map(i => i.id), 0) + 1,
        orderDate: formData.orderDate ? format(formData.orderDate, "dd/MM/yyyy") : '',
        orderAmount: formData.orderAmount,
        pricePerLiter: formData.pricePerLiter,
        receivedDate: formData.receivedDate ? format(formData.receivedDate, "dd/MM/yyyy") : '',
        testedAmount: formData.testedAmount
      };
      setOrdersData(prev => [...prev, newItem]);
      toast.success("เพิ่มข้อมูลสำเร็จ");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setOrdersData(prev => prev.filter(item => item.id !== id));
    toast.success("ลบข้อมูลสำเร็จ");
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0442AF] mb-8">รายการสั่งซื้อ/รับน้ำมัน</h1>
          
          <div className="bg-white rounded-lg shadow-md">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-t-lg bg-gray-100">
                <TabsTrigger 
                  value="orders" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg m-1"
                >
                  รายการสั่งซื้อ/รับน้ำมัน
                </TabsTrigger>
                <TabsTrigger 
                  value="summary"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg m-1"
                >
                  สรุปรายการ
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="orders" className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-blue-600">รายการสั่งซื้อ/รับน้ำมัน</h2>
                    <div className="flex space-x-3">
                      <Button 
                        onClick={handleAdd}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                      >
                        เพิ่มรายการใหม่
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-[240px] justify-start text-left font-normal border-gray-300">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {searchDate1 ? format(searchDate1, "dd/MM/yyyy") : "ค้นหาตามวันที่"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white border shadow-lg" align="start">
                          <Calendar
                            mode="single"
                            selected={searchDate1}
                            onSelect={setSearchDate1}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-600">
                          <TableHead className="text-center text-white font-semibold">วันที่สั่งซื้อ</TableHead>
                          <TableHead className="text-center text-white font-semibold">ปริมาณสั่งซื้อ [ถัง]</TableHead>
                          <TableHead className="text-center text-white font-semibold">ราคาต่อลิตร [บาท]</TableHead>
                          <TableHead className="text-center text-white font-semibold">วันที่ได้รับ</TableHead>
                          <TableHead className="text-center text-white font-semibold">ปริมาณที่ผ่านการทดสอบ [ถัง]</TableHead>
                          <TableHead className="text-center text-white font-semibold">แก้ไข</TableHead>
                          <TableHead className="text-center text-white font-semibold">ลบ</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ordersData.map((item) => (
                          <TableRow key={item.id} className="hover:bg-gray-50">
                            <TableCell className="text-center">{item.orderDate}</TableCell>
                            <TableCell className="text-center font-semibold">{item.orderAmount}</TableCell>
                            <TableCell className="text-center">{item.pricePerLiter}</TableCell>
                            <TableCell className="text-center">{item.receivedDate}</TableCell>
                            <TableCell className="text-center font-semibold">{item.testedAmount}</TableCell>
                            <TableCell className="text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(item)}
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TableCell>
                            <TableCell className="text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(item.id)}
                                className="text-red-600 hover:text-red-800 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="summary" className="p-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-blue-600">สรุปรายการสั่งซื้อ/รับน้ำมัน</h2>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[240px] justify-start text-left font-normal border-gray-300">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {searchDate2 ? format(searchDate2, "dd/MM/yyyy") : "ค้นหาตามวันที่"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white border shadow-lg" align="start">
                        <Calendar
                          mode="single"
                          selected={searchDate2}
                          onSelect={setSearchDate2}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-600">ยอดสั่งซื้อทั้งหมด</h3>
                      <p className="text-2xl font-bold text-blue-800">
                        {ordersData.reduce((sum, item) => sum + parseInt(item.orderAmount), 0)} ถัง
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-600">ยอดที่ผ่านการทดสอบ</h3>
                      <p className="text-2xl font-bold text-green-800">
                        {ordersData.reduce((sum, item) => sum + parseInt(item.testedAmount), 0)} ถัง
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-yellow-600">ราคาเฉลี่ย</h3>
                      <p className="text-2xl font-bold text-yellow-800">
                        {ordersData.length > 0 ? 
                          (ordersData.reduce((sum, item) => sum + parseFloat(item.pricePerLiter), 0) / ordersData.length).toFixed(2) 
                          : '0.00'} บาท/ลิตร
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Modal */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-md bg-white">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-center text-gray-800">
                  {editingItem ? 'แก้ไข' : 'เพิ่ม'}รายการสั่งซื้อ/รับน้ำมัน
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 p-4">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">วันที่สั่งซื้อ :</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-gray-300",
                          !formData.orderDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.orderDate ? format(formData.orderDate, "dd/MM/yyyy") : "เลือกวันที่"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border shadow-lg" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.orderDate}
                        onSelect={(date) => setFormData(prev => ({ ...prev, orderDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">ปริมาณการสั่งซื้อต่อครั้ง [ถัง] :</Label>
                  <Input
                    value={formData.orderAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, orderAmount: e.target.value }))}
                    placeholder="กรอกปริมาณ"
                    className="border-gray-300"
                    type="number"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">ราคาที่การสั่งซื้อต่อลิตร [บาท] :</Label>
                  <Input
                    value={formData.pricePerLiter}
                    onChange={(e) => setFormData(prev => ({ ...prev, pricePerLiter: e.target.value }))}
                    placeholder="กรอกราคา"
                    className="border-gray-300"
                    type="number"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">วันที่ได้รับ :</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-gray-300",
                          !formData.receivedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.receivedDate ? format(formData.receivedDate, "dd/MM/yyyy") : "เลือกวันที่"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border shadow-lg" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.receivedDate}
                        onSelect={(date) => setFormData(prev => ({ ...prev, receivedDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">ปริมาณที่ผ่านการทดสอบ [ถัง] :</Label>
                  <Input
                    value={formData.testedAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, testedAmount: e.target.value }))}
                    placeholder="กรอกปริมาณ"
                    className="border-gray-300"
                    type="number"
                  />
                </div>

                <div className="flex justify-center space-x-4 pt-4">
                  <Button 
                    onClick={handleSave} 
                    className="px-8 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    บันทึก
                  </Button>
                  <Button 
                    onClick={() => setIsModalOpen(false)} 
                    variant="outline"
                    className="px-8 border-gray-300 text-gray-700"
                  >
                    ยกเลิก
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OilOrders;
