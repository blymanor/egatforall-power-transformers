
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Package, Database, Plus, Edit, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface StockRecord {
  id: number;
  date: string;
  withdrawal: number;
  purchase: number;
  stockAmount: number;
}

interface InitialStock {
  id: number;
  date: string;
  stockAmount: number;
}

const OilInventoryPage = () => {
  const [activeTab, setActiveTab] = useState<'stock' | 'initial'>('stock');
  const [stockRecords, setStockRecords] = useState<StockRecord[]>([
    { id: 1, date: '2024-01-15', withdrawal: 5, purchase: 20, stockAmount: 115 },
    { id: 2, date: '2024-02-10', withdrawal: 8, purchase: 0, stockAmount: 107 },
    { id: 3, date: '2024-03-05', withdrawal: 3, purchase: 15, stockAmount: 119 },
  ]);
  
  const [initialStocks, setInitialStocks] = useState<InitialStock[]>([
    { id: 1, date: '2024-01-01', stockAmount: 100 },
    { id: 2, date: '2024-02-01', stockAmount: 115 },
    { id: 3, date: '2024-03-01', stockAmount: 107 },
  ]);

  const [isInitialModalOpen, setIsInitialModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingItem, setEditingItem] = useState<InitialStock | null>(null);
  const [modalDate, setModalDate] = useState<Date | undefined>(undefined);
  const [modalStockAmount, setModalStockAmount] = useState('');
  const [searchDate, setSearchDate] = useState('');

  const handleEditInitial = (item: InitialStock) => {
    setEditingItem(item);
    setModalMode('edit');
    setModalDate(new Date(item.date));
    setModalStockAmount(item.stockAmount.toString());
    setIsInitialModalOpen(true);
  };

  const handleCreateInitial = () => {
    setEditingItem(null);
    setModalMode('create');
    setModalDate(undefined);
    setModalStockAmount('');
    setIsInitialModalOpen(true);
  };

  const handleSaveInitial = () => {
    if (!modalDate || !modalStockAmount) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const newItem: InitialStock = {
      id: modalMode === 'edit' ? editingItem!.id : Date.now(),
      date: format(modalDate, 'yyyy-MM-dd'),
      stockAmount: parseFloat(modalStockAmount),
    };

    if (modalMode === 'edit') {
      setInitialStocks(prev => prev.map(item => item.id === editingItem!.id ? newItem : item));
      toast.success("แก้ไขข้อมูลสำเร็จ");
    } else {
      setInitialStocks(prev => [...prev, newItem]);
      toast.success("เพิ่มข้อมูลสำเร็จ");
    }

    setIsInitialModalOpen(false);
    setModalDate(undefined);
    setModalStockAmount('');
    setEditingItem(null);
  };

  const filteredStockRecords = stockRecords.filter(record => 
    searchDate === '' || record.date.includes(searchDate)
  );

  const filteredInitialStocks = initialStocks.filter(stock =>
    searchDate === '' || stock.date.includes(searchDate)
  );

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            คลังรายการน้ำมัน
          </h1>
          <p className="text-gray-500">ระบบจัดการคลังน้ำมันหม้อแปลงไฟฟ้า</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === 'stock' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('stock')}
            className={cn(
              "transition-all duration-200",
              activeTab === 'stock' 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-gray-600 hover:text-blue-600"
            )}
          >
            <Package className="h-4 w-4 mr-2" />
            คลังน้ำมัน
          </Button>
          <Button
            variant={activeTab === 'initial' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('initial')}
            className={cn(
              "transition-all duration-200",
              activeTab === 'initial' 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-gray-600 hover:text-blue-600"
            )}
          >
            <Database className="h-4 w-4 mr-2" />
            ปริมาณน้ำมันเริ่มต้น
          </Button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6">
          {activeTab === 'stock' && (
            <Card className="shadow-md border-none">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <CardTitle className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    คลังน้ำมัน
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="ค้นหาตามวันที่..."
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="bg-blue-50 text-blue-700 text-center">ลำดับ</TableHead>
                        <TableHead className="bg-blue-50 text-blue-700 text-center">วันที่</TableHead>
                        <TableHead className="bg-blue-50 text-blue-700 text-center">เบิกจ่าย [ถัง]</TableHead>
                        <TableHead className="bg-blue-50 text-blue-700 text-center">ซื้อเพิ่ม [ถัง]</TableHead>
                        <TableHead className="bg-blue-50 text-blue-700 text-center">ปริมาณน้ำมันในคลัง [ถัง]</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStockRecords.map((record, index) => (
                        <TableRow key={record.id} className="hover:bg-blue-50/50">
                          <TableCell className="text-center">{index + 1}</TableCell>
                          <TableCell className="text-center">{format(new Date(record.date), 'dd/MM/yyyy')}</TableCell>
                          <TableCell className="text-center">{record.withdrawal}</TableCell>
                          <TableCell className="text-center">{record.purchase}</TableCell>
                          <TableCell className="text-center font-medium text-blue-700">{record.stockAmount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'initial' && (
            <Card className="shadow-md border-none">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <CardTitle className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    ปริมาณน้ำมันเริ่มต้น
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="ค้นหาตามวันที่..."
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button onClick={handleCreateInitial} className="bg-blue-600 hover:bg-blue-700">
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
                        <TableHead className="bg-blue-50 text-blue-700 text-center">วันที่</TableHead>
                        <TableHead className="bg-blue-50 text-blue-700 text-center">ปริมาณน้ำมันในคลัง</TableHead>
                        <TableHead className="bg-blue-50 text-blue-700 text-center">แก้ไข</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInitialStocks.map((stock, index) => (
                        <TableRow key={stock.id} className="hover:bg-blue-50/50">
                          <TableCell className="text-center">{index + 1}</TableCell>
                          <TableCell className="text-center">{format(new Date(stock.date), 'dd/MM/yyyy')}</TableCell>
                          <TableCell className="text-center font-medium text-blue-700">{stock.stockAmount} ถัง</TableCell>
                          <TableCell className="text-center">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditInitial(stock)}
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Modal for Initial Stock */}
        <Dialog open={isInitialModalOpen} onOpenChange={setIsInitialModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">
                {modalMode === 'edit' ? 'แก้ไข' : 'เพิ่ม'}ปริมาณน้ำมันในคลังเริ่มต้น
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
                        !modalDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {modalDate ? format(modalDate, "dd/MM/yyyy") : "เลือกวันที่"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={modalDate}
                      onSelect={setModalDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>ปริมาณน้ำมันในคลัง [ถัง] :</Label>
                <Input
                  type="number"
                  placeholder="เช่น 100"
                  value={modalStockAmount}
                  onChange={(e) => setModalStockAmount(e.target.value)}
                />
              </div>
              <div className="flex justify-center space-x-4 pt-4">
                <Button onClick={handleSaveInitial} className="px-8 bg-blue-600 hover:bg-blue-700">
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

export default OilInventoryPage;
