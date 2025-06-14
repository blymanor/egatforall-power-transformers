
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
import { CalendarIcon, FileText, BarChart3, Plus, Edit, Trash2, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DisbursementDetail {
  id: number;
  date: string;
  amount: number;
}

interface YearlySummary {
  id: number;
  year: number;
  totalAmount: number;
  pricePerLiter: number;
}

const DisbursementListPage = () => {
  const [activeTab, setActiveTab] = useState<'details' | 'yearly'>('details');
  
  const [disbursementDetails, setDisbursementDetails] = useState<DisbursementDetail[]>([
    { id: 1, date: '2024-01-15', amount: 5.5 },
    { id: 2, date: '2024-02-10', amount: 8.2 },
    { id: 3, date: '2024-03-05', amount: 3.7 },
  ]);
  
  const [yearlySummaries, setYearlySummaries] = useState<YearlySummary[]>([
    { id: 1, year: 2023, totalAmount: 45.5, pricePerLiter: 24.50 },
    { id: 2, year: 2024, totalAmount: 17.4, pricePerLiter: 26.75 },
  ]);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isYearlyModalOpen, setIsYearlyModalOpen] = useState(false);
  const [detailModalMode, setDetailModalMode] = useState<'create' | 'edit'>('create');
  const [yearlyModalMode, setYearlyModalMode] = useState<'create' | 'edit'>('create');
  const [editingDetail, setEditingDetail] = useState<DisbursementDetail | null>(null);
  const [editingYearly, setEditingYearly] = useState<YearlySummary | null>(null);
  
  const [detailModalDate, setDetailModalDate] = useState<Date | undefined>(undefined);
  const [detailModalAmount, setDetailModalAmount] = useState('');
  
  const [yearlyModalYear, setYearlyModalYear] = useState('');
  const [yearlyModalAmount, setYearlyModalAmount] = useState('');
  const [yearlyModalPrice, setYearlyModalPrice] = useState('');
  
  const [searchDate, setSearchDate] = useState('');

  // Detail Modal Functions
  const handleCreateDetail = () => {
    setEditingDetail(null);
    setDetailModalMode('create');
    setDetailModalDate(undefined);
    setDetailModalAmount('');
    setIsDetailModalOpen(true);
  };

  const handleEditDetail = (item: DisbursementDetail) => {
    setEditingDetail(item);
    setDetailModalMode('edit');
    setDetailModalDate(new Date(item.date));
    setDetailModalAmount(item.amount.toString());
    setIsDetailModalOpen(true);
  };

  const handleDeleteDetail = (id: number) => {
    setDisbursementDetails(prev => prev.filter(item => item.id !== id));
    toast.success("ลบข้อมูลสำเร็จ");
  };

  const handleSaveDetail = () => {
    if (!detailModalDate || !detailModalAmount) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const newItem: DisbursementDetail = {
      id: detailModalMode === 'edit' ? editingDetail!.id : Date.now(),
      date: format(detailModalDate, 'yyyy-MM-dd'),
      amount: parseFloat(detailModalAmount),
    };

    if (detailModalMode === 'edit') {
      setDisbursementDetails(prev => prev.map(item => item.id === editingDetail!.id ? newItem : item));
      toast.success("แก้ไขข้อมูลสำเร็จ");
    } else {
      setDisbursementDetails(prev => [...prev, newItem]);
      toast.success("เพิ่มข้อมูลสำเร็จ");
    }

    setIsDetailModalOpen(false);
    setDetailModalDate(undefined);
    setDetailModalAmount('');
    setEditingDetail(null);
  };

  // Yearly Modal Functions
  const handleCreateYearly = () => {
    setEditingYearly(null);
    setYearlyModalMode('create');
    setYearlyModalYear('');
    setYearlyModalAmount('');
    setYearlyModalPrice('');
    setIsYearlyModalOpen(true);
  };

  const handleEditYearly = (item: YearlySummary) => {
    setEditingYearly(item);
    setYearlyModalMode('edit');
    setYearlyModalYear(item.year.toString());
    setYearlyModalAmount(item.totalAmount.toString());
    setYearlyModalPrice(item.pricePerLiter.toString());
    setIsYearlyModalOpen(true);
  };

  const handleSaveYearly = () => {
    if (!yearlyModalYear || !yearlyModalAmount || !yearlyModalPrice) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const newItem: YearlySummary = {
      id: yearlyModalMode === 'edit' ? editingYearly!.id : Date.now(),
      year: parseInt(yearlyModalYear),
      totalAmount: parseFloat(yearlyModalAmount),
      pricePerLiter: parseFloat(yearlyModalPrice),
    };

    if (yearlyModalMode === 'edit') {
      setYearlySummaries(prev => prev.map(item => item.id === editingYearly!.id ? newItem : item));
      toast.success("แก้ไขข้อมูลสำเร็จ");
    } else {
      setYearlySummaries(prev => [...prev, newItem]);
      toast.success("เพิ่มข้อมูลสำเร็จ");
    }

    setIsYearlyModalOpen(false);
    setYearlyModalYear('');
    setYearlyModalAmount('');
    setYearlyModalPrice('');
    setEditingYearly(null);
  };

  const filteredDetails = disbursementDetails.filter(detail => 
    searchDate === '' || detail.date.includes(searchDate)
  );

  const filteredYearly = yearlySummaries.filter(yearly =>
    searchDate === '' || yearly.year.toString().includes(searchDate)
  );

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            รายการการเบิกจ่าย
          </h1>
          <p className="text-gray-500">ระบบจัดการรายการการเบิกจ่ายน้ำมันหม้อแปลงไฟฟ้า</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === 'details' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('details')}
            className={cn(
              "transition-all duration-200",
              activeTab === 'details' 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-gray-600 hover:text-blue-600"
            )}
          >
            <FileText className="h-4 w-4 mr-2" />
            รายละเอียดแต่ละครั้ง
          </Button>
          <Button
            variant={activeTab === 'yearly' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('yearly')}
            className={cn(
              "transition-all duration-200",
              activeTab === 'yearly' 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-gray-600 hover:text-blue-600"
            )}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            สรุปรายปี [ถัง]
          </Button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6">
          {activeTab === 'details' && (
            <Card className="shadow-md border-none">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <CardTitle className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    รายละเอียดแต่ละครั้ง
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
                    <Button onClick={handleCreateDetail} className="bg-blue-600 hover:bg-blue-700">
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
                        <TableHead className="bg-blue-50 text-blue-700 text-center">วันที่เบิกน้ำมันไปใช้งาน</TableHead>
                        <TableHead className="bg-blue-50 text-blue-700 text-center">ปริมาณการเบิก [ถัง]</TableHead>
                        <TableHead className="bg-blue-50 text-blue-700 text-center">แก้ไข</TableHead>
                        <TableHead className="bg-blue-50 text-blue-700 text-center">ลบ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDetails.map((detail, index) => (
                        <TableRow key={detail.id} className="hover:bg-blue-50/50">
                          <TableCell className="text-center">{index + 1}</TableCell>
                          <TableCell className="text-center">{format(new Date(detail.date), 'dd/MM/yyyy')}</TableCell>
                          <TableCell className="text-center font-medium text-blue-700">{detail.amount}</TableCell>
                          <TableCell className="text-center">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditDetail(detail)}
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteDetail(detail.id)}
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
          )}

          {activeTab === 'yearly' && (
            <Card className="shadow-md border-none">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <CardTitle className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    สรุปรายปี [ถัง]
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="ค้นหาตามปี..."
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button onClick={handleCreateYearly} className="bg-blue-600 hover:bg-blue-700">
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
                        <TableHead className="bg-blue-50 text-blue-700 text-center">รายการที่</TableHead>
                        <TableHead className="bg-blue-50 text-blue-700 text-center">ปีที่เบิกจ่ายน้ำมัน</TableHead>
                        <TableHead className="bg-blue-50 text-blue-700 text-center">ปริมาณการเบิก [ถัง/ปี]</TableHead>
                        <TableHead className="bg-blue-50 text-blue-700 text-center">ราคา [บาท/ลิตร]</TableHead>
                        <TableHead className="bg-blue-50 text-blue-700 text-center">แก้ไข</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredYearly.map((yearly, index) => (
                        <TableRow key={yearly.id} className="hover:bg-blue-50/50">
                          <TableCell className="text-center">{index + 1}</TableCell>
                          <TableCell className="text-center">{yearly.year}</TableCell>
                          <TableCell className="text-center font-medium text-blue-700">{yearly.totalAmount}</TableCell>
                          <TableCell className="text-center">{yearly.pricePerLiter}</TableCell>
                          <TableCell className="text-center">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditYearly(yearly)}
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

        {/* Detail Modal */}
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">
                แก้ไขปริมาณน้ำมันในคลังเริ่มต้น
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
                        !detailModalDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {detailModalDate ? format(detailModalDate, "dd/MM/yyyy") : "เลือกวันที่"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={detailModalDate}
                      onSelect={setDetailModalDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>ปริมาณการเบิกต่อครั้ง [ถัง] :</Label>
                <Input
                  type="number"
                  placeholder="เช่น 5.5"
                  value={detailModalAmount}
                  onChange={(e) => setDetailModalAmount(e.target.value)}
                />
              </div>
              <div className="flex justify-center space-x-4 pt-4">
                <Button onClick={handleSaveDetail} className="px-8 bg-blue-600 hover:bg-blue-700">
                  บันทึก
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Yearly Modal */}
        <Dialog open={isYearlyModalOpen} onOpenChange={setIsYearlyModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">
                แก้ไขปริมาณน้ำมันในคลังเริ่มต้น
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <Label>ปีที่เบิกจ่ายน้ำมัน :</Label>
                <Input
                  type="number"
                  placeholder="เช่น 2024"
                  value={yearlyModalYear}
                  onChange={(e) => setYearlyModalYear(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ปริมาณการเบิก [ถัง/ปี] :</Label>
                <Input
                  type="number"
                  placeholder="เช่น 45.5"
                  value={yearlyModalAmount}
                  onChange={(e) => setYearlyModalAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ราคา [บาท/ลิตร] :</Label>
                <Input
                  type="number"
                  placeholder="เช่น 25.50"
                  value={yearlyModalPrice}
                  onChange={(e) => setYearlyModalPrice(e.target.value)}
                />
              </div>
              <div className="flex justify-center space-x-4 pt-4">
                <Button onClick={handleSaveYearly} className="px-8 bg-blue-600 hover:bg-blue-700">
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

export default DisbursementListPage;
