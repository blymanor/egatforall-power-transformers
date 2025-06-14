
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

interface DistributionRecord {
  id: number;
  date: string;
  amount: string;
}

interface YearlyRecord {
  id: number;
  year: string;
  amount: string;
  price: string;
}

const OilDistribution = () => {
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [editingItem1, setEditingItem1] = useState<DistributionRecord | null>(null);
  const [editingItem2, setEditingItem2] = useState<YearlyRecord | null>(null);
  const [searchDate1, setSearchDate1] = useState<Date>();
  const [searchDate2, setSearchDate2] = useState<Date>();
  
  const [formData1, setFormData1] = useState({
    date: undefined as Date | undefined,
    amount: ''
  });

  const [formData2, setFormData2] = useState({
    year: '',
    amount: '',
    price: ''
  });

  // Sample data for detailed distribution
  const [distributionData, setDistributionData] = useState<DistributionRecord[]>([
    { id: 1, date: '01/11/2010', amount: '350' },
    { id: 2, date: '15/12/2010', amount: '166' },
    { id: 3, date: '12/07/2011', amount: '58' },
    { id: 4, date: '22/12/2011', amount: '65' }
  ]);

  // Sample data for yearly summary
  const [yearlyData, setYearlyData] = useState<YearlyRecord[]>([
    { id: 1, year: '2006', amount: '512', price: '59.00' },
    { id: 2, year: '2007', amount: '476', price: '60.00' },
    { id: 3, year: '2008', amount: '1102', price: '61.00' },
    { id: 4, year: '2009', amount: '355', price: '61.00' }
  ]);

  const handleEdit1 = (item: DistributionRecord) => {
    setEditingItem1(item);
    setFormData1({
      date: new Date(),
      amount: item.amount
    });
    setIsModal1Open(true);
  };

  const handleEdit2 = (item: YearlyRecord) => {
    setEditingItem2(item);
    setFormData2({
      year: item.year,
      amount: item.amount,
      price: item.price
    });
    setIsModal2Open(true);
  };

  const handleAdd1 = () => {
    setEditingItem1(null);
    setFormData1({ date: undefined, amount: '' });
    setIsModal1Open(true);
  };

  const handleAdd2 = () => {
    setEditingItem2(null);
    setFormData2({ year: '', amount: '', price: '' });
    setIsModal2Open(true);
  };

  const handleSave1 = () => {
    if (editingItem1) {
      setDistributionData(prev => 
        prev.map(item => 
          item.id === editingItem1.id 
            ? { ...item, amount: formData1.amount, date: formData1.date ? format(formData1.date, "dd/MM/yyyy") : item.date }
            : item
        )
      );
      toast.success("แก้ไขข้อมูลสำเร็จ");
    } else {
      const newItem: DistributionRecord = {
        id: Math.max(...distributionData.map(i => i.id)) + 1,
        date: formData1.date ? format(formData1.date, "dd/MM/yyyy") : '',
        amount: formData1.amount
      };
      setDistributionData(prev => [...prev, newItem]);
      toast.success("เพิ่มข้อมูลสำเร็จ");
    }
    setIsModal1Open(false);
  };

  const handleSave2 = () => {
    if (editingItem2) {
      setYearlyData(prev => 
        prev.map(item => 
          item.id === editingItem2.id 
            ? { ...item, year: formData2.year, amount: formData2.amount, price: formData2.price }
            : item
        )
      );
      toast.success("แก้ไขข้อมูลสำเร็จ");
    } else {
      const newItem: YearlyRecord = {
        id: Math.max(...yearlyData.map(i => i.id)) + 1,
        year: formData2.year,
        amount: formData2.amount,
        price: formData2.price
      };
      setYearlyData(prev => [...prev, newItem]);
      toast.success("เพิ่มข้อมูลสำเร็จ");
    }
    setIsModal2Open(false);
  };

  const handleDelete1 = (id: number) => {
    setDistributionData(prev => prev.filter(item => item.id !== id));
    toast.success("ลบข้อมูลสำเร็จ");
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-[#0442AF] mb-6">รายการการเบิกจ่าย</h1>
          
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">รายละเอียดแต่ละครั้ง</TabsTrigger>
              <TabsTrigger value="yearly">สรุปรายปี</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="p-4 border rounded-md mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-blue-600">รายละเอียดแต่ละครั้ง</h2>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={handleAdd1}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      เพิ่มรายการใหม่
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {searchDate1 ? format(searchDate1, "dd/MM/yyyy") : "ค้นหาตามวันที่"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
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

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center bg-gray-600 text-white">วันที่เบิกน้ำมันไปใช้งาน</TableHead>
                      <TableHead className="text-center bg-gray-600 text-white">ปริมาณการเบิก [ถัง]</TableHead>
                      <TableHead className="text-center bg-gray-600 text-white">แก้ไข</TableHead>
                      <TableHead className="text-center bg-gray-600 text-white">ลบ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {distributionData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-center">{item.date}</TableCell>
                        <TableCell className="text-center">{item.amount}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit1(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete1(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="yearly" className="p-4 border rounded-md mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-blue-600">สรุปรายปี [ถัง]</h2>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={handleAdd2}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      เพิ่มรายการใหม่
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
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
                      <TableHead className="text-center bg-gray-600 text-white">รายการที่</TableHead>
                      <TableHead className="text-center bg-gray-600 text-white">ปีที่เบิกจ่ายน้ำมัน</TableHead>
                      <TableHead className="text-center bg-gray-600 text-white">ปริมาณการเบิก [ถัง/ปี]</TableHead>
                      <TableHead className="text-center bg-gray-600 text-white">ราคา [บาท/ลิตร]</TableHead>
                      <TableHead className="text-center bg-gray-600 text-white">แก้ไข</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {yearlyData.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-center">{index + 1}</TableCell>
                        <TableCell className="text-center">{item.year}</TableCell>
                        <TableCell className="text-center">{item.amount}</TableCell>
                        <TableCell className="text-center">{item.price}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit2(item)}
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

          {/* Modal 1 - Distribution Details */}
          <Dialog open={isModal1Open} onOpenChange={setIsModal1Open}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-center">
                  {editingItem1 ? 'แก้ไข' : 'เพิ่ม'}ปริมาณน้ำมันในคลังเริ่มต้น
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 p-4">
                <div className="space-y-2">
                  <Label>วันที่เบิกน้ำมันไปใช้งาน :</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData1.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData1.date ? format(formData1.date, "dd/MM/yyyy") : "เลือกวันที่"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData1.date}
                        onSelect={(date) => setFormData1(prev => ({ ...prev, date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>ปริมาณการเบิกต่อครั้ง [ถัง] :</Label>
                  <Input
                    value={formData1.amount}
                    onChange={(e) => setFormData1(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="กรอกปริมาณ"
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <Button onClick={handleSave1} className="px-8 bg-blue-600 hover:bg-blue-700">
                    บันทึก
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Modal 2 - Yearly Summary */}
          <Dialog open={isModal2Open} onOpenChange={setIsModal2Open}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-center">
                  {editingItem2 ? 'แก้ไข' : 'เพิ่ม'}ปริมาณน้ำมันในคลังเริ่มต้น
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 p-4">
                <div className="space-y-2">
                  <Label>ปีที่เบิกจ่ายน้ำมัน :</Label>
                  <Input
                    value={formData2.year}
                    onChange={(e) => setFormData2(prev => ({ ...prev, year: e.target.value }))}
                    placeholder="กรอกปี"
                  />
                </div>

                <div className="space-y-2">
                  <Label>ปริมาณการเบิก [ถัง/ปี] :</Label>
                  <Input
                    value={formData2.amount}
                    onChange={(e) => setFormData2(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="กรอกปริมาณ"
                  />
                </div>

                <div className="space-y-2">
                  <Label>ราคา [บาท/ลิตร] :</Label>
                  <Input
                    value={formData2.price}
                    onChange={(e) => setFormData2(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="กรอกราคา"
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <Button onClick={handleSave2} className="px-8 bg-blue-600 hover:bg-blue-700">
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

export default OilDistribution;
