
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Edit } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OilRecord {
  id: number;
  date: string;
  amount: string;
}

const OilWarehouse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<OilRecord | null>(null);
  const [searchDate, setSearchDate] = useState<Date>();
  const [searchDate2, setSearchDate2] = useState<Date>();
  const [formData, setFormData] = useState({
    date: undefined as Date | undefined,
    amount: ''
  });

  // Sample data for first column
  const warehouseData = [
    { id: 1, date: '02/08/2010', withdraw: '-', purchase: '490', total: '702' },
    { id: 2, date: '01/11/2010', withdraw: '350', purchase: '-', total: '352' },
    { id: 3, date: '15/12/2010', withdraw: '166', purchase: '-', total: '186' },
    { id: 4, date: '12/07/2010', withdraw: '58', purchase: '-', total: '128' }
  ];

  // Sample data for second column
  const [initialAmountData, setInitialAmountData] = useState<OilRecord[]>([
    { id: 1, date: '02/08/2010', amount: '702' },
    { id: 2, date: '01/11/2010', amount: '352' },
    { id: 3, date: '15/12/2010', amount: '186' },
    { id: 4, date: '12/07/2010', amount: '128' }
  ]);

  const handleEdit = (item: OilRecord) => {
    setEditingItem(item);
    setFormData({
      date: new Date(),
      amount: item.amount
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      date: undefined,
      amount: ''
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      setInitialAmountData(prev => 
        prev.map(item => 
          item.id === editingItem.id 
            ? { ...item, amount: formData.amount, date: formData.date ? format(formData.date, "dd/MM/yyyy") : item.date }
            : item
        )
      );
      toast.success("แก้ไขข้อมูลสำเร็จ");
    } else {
      const newItem: OilRecord = {
        id: Math.max(...initialAmountData.map(i => i.id)) + 1,
        date: formData.date ? format(formData.date, "dd/MM/yyyy") : '',
        amount: formData.amount
      };
      setInitialAmountData(prev => [...prev, newItem]);
      toast.success("เพิ่มข้อมูลสำเร็จ");
    }
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-[#0442AF] mb-6">คลังรายการน้ำมัน</h1>
          
          <Tabs defaultValue="warehouse" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="warehouse">คลังน้ำมัน</TabsTrigger>
              <TabsTrigger value="initial">ปริมาณน้ำมันเริ่มต้น</TabsTrigger>
            </TabsList>
            
            <TabsContent value="warehouse" className="p-4 border rounded-md mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-blue-600">คลังน้ำมัน</h2>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {searchDate ? format(searchDate, "dd/MM/yyyy") : "ค้นหาตามวันที่"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={searchDate}
                        onSelect={setSearchDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center bg-gray-600 text-white">วันที่</TableHead>
                      <TableHead className="text-center bg-gray-600 text-white">เบิกจ่าย [ถัง]</TableHead>
                      <TableHead className="text-center bg-gray-600 text-white">ซื้อเพิ่ม [ถัง]</TableHead>
                      <TableHead className="text-center bg-gray-600 text-white">ปริมาณน้ำมันในคลัง [ถัง]</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {warehouseData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-center">{item.date}</TableCell>
                        <TableCell className="text-center">{item.withdraw}</TableCell>
                        <TableCell className="text-center">{item.purchase}</TableCell>
                        <TableCell className="text-center">{item.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="initial" className="p-4 border rounded-md mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-blue-600">ปริมาณน้ำมันเริ่มต้น</h2>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={handleAdd}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      เพิ่มรายการใหม่
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {searchDate2 ? format(searchDate2, "dd/MM/yyyy") : "ค้นหาตามวันที่"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={searchDate2}
                          onSelect={setSearchDate2}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center bg-gray-600 text-white">วันที่</TableHead>
                      <TableHead className="text-center bg-gray-600 text-white">ปริมาณน้ำมันในคลัง [ถัง]</TableHead>
                      <TableHead className="text-center bg-gray-600 text-white">แก้ไข</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {initialAmountData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-center">{item.date}</TableCell>
                        <TableCell className="text-center">{item.amount}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>

          {/* Modal */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-center">
                  {editingItem ? 'แก้ไข' : 'เพิ่ม'}ปริมาณน้ำมันในคลังเริ่มต้น
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 p-4">
                <div className="space-y-2">
                  <Label>วันที่ :</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, "dd/MM/yyyy") : "เลือกวันที่"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => setFormData(prev => ({ ...prev, date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>ปริมาณน้ำมันในคลัง [ถัง] :</Label>
                  <Input
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
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

export default OilWarehouse;
