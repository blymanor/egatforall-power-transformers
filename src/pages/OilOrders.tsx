
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
      pricePerLiter: '350', 
      receivedDate: '01/11/2010', 
      testedAmount: '350' 
    },
    { 
      id: 2, 
      orderDate: '15/12/2010', 
      orderAmount: '166', 
      pricePerLiter: '166', 
      receivedDate: '15/12/2010', 
      testedAmount: '166' 
    },
    { 
      id: 3, 
      orderDate: '12/07/2011', 
      orderAmount: '58', 
      pricePerLiter: '58', 
      receivedDate: '12/07/2011', 
      testedAmount: '58' 
    },
    { 
      id: 4, 
      orderDate: '22/12/2011', 
      orderAmount: '65', 
      pricePerLiter: '65', 
      receivedDate: '22/12/2011', 
      testedAmount: '65' 
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
        id: Math.max(...ordersData.map(i => i.id)) + 1,
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
      <div className="p-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-[#0442AF] mb-6">รายการสั่งซื้อ/รับน้ำมัน</h1>
          
          <div className="mb-4">
            <Button 
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700"
            >
              เพิ่มรายการใหม่
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center bg-blue-600 text-white">วันที่สั่งซื้อ</TableHead>
                <TableHead className="text-center bg-blue-600 text-white">ปริมาณสั่งซื้อ [ถัง]</TableHead>
                <TableHead className="text-center bg-blue-600 text-white">ราคาต่อลิตร [บาท]</TableHead>
                <TableHead className="text-center bg-blue-600 text-white">วันที่ได้รับ</TableHead>
                <TableHead className="text-center bg-blue-600 text-white">ปริมาณที่ผ่านการทดสอบ [ถัง]</TableHead>
                <TableHead className="text-center bg-blue-600 text-white">แก้ไข</TableHead>
                <TableHead className="text-center bg-blue-600 text-white">ลบ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordersData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{item.orderDate}</TableCell>
                  <TableCell className="text-center">{item.orderAmount}</TableCell>
                  <TableCell className="text-center">{item.pricePerLiter}</TableCell>
                  <TableCell className="text-center">{item.receivedDate}</TableCell>
                  <TableCell className="text-center">{item.testedAmount}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Modal */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-center">
                  {editingItem ? 'แก้ไข' : 'เพิ่ม'}รายการสั่งซื้อ/รับน้ำมัน
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 p-4">
                <div className="space-y-2">
                  <Label>วันที่สั่งซื้อ :</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.orderDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.orderDate ? format(formData.orderDate, "dd/MM/yyyy") : "เลือกวันที่"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
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
                  <Label>ปริมาณการสั่งซื้อต่อครั้ง [ถัง] :</Label>
                  <Input
                    value={formData.orderAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, orderAmount: e.target.value }))}
                    placeholder="กรอกปริมาณ"
                  />
                </div>

                <div className="space-y-2">
                  <Label>ราคาที่การสั่งซื้อต่อลิตร [บาท] :</Label>
                  <Input
                    value={formData.pricePerLiter}
                    onChange={(e) => setFormData(prev => ({ ...prev, pricePerLiter: e.target.value }))}
                    placeholder="กรอกราคา"
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
                          !formData.receivedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.receivedDate ? format(formData.receivedDate, "dd/MM/yyyy") : "เลือกวันที่"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
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
                  <Label>ปริมาณที่ผ่านการทดสอบ [ถัง] :</Label>
                  <Input
                    value={formData.testedAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, testedAmount: e.target.value }))}
                    placeholder="กรอกปริมาณ"
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <Button onClick={handleSave} className="px-8 bg-blue-600 hover:bg-blue-700">
                    บันทึก
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
