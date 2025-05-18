
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const TransformerRelocationInfo = () => {
  const { toast } = useToast();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRelocationModal, setShowRelocationModal] = useState(false);
  const [currentTransformer, setCurrentTransformer] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for transformers
  const transformerData = [
    { id: 1, equipmentNo: "70000016001", manufacturer: "Elektro Roxurg", status: "เป็น Spare" },
    { id: 2, equipmentNo: "70000016003", manufacturer: "OSAKA", status: "เป็น Spare" },
    { id: 3, equipmentNo: "70000016201", manufacturer: "Meiden", status: "เป็น Spare" },
    { id: 4, equipmentNo: "70000016202", manufacturer: "Mitsubishi", status: "เป็น Spare" },
    { id: 5, equipmentNo: "70000016203", manufacturer: "Elektro Roxurg", status: "เป็น Spare" },
    { id: 6, equipmentNo: "70000016204", manufacturer: "OSAKA", status: "เป็น Spare" },
    { id: 7, equipmentNo: "70000016205", manufacturer: "Meiden", status: "เป็น Spare" },
    { id: 8, equipmentNo: "70000016206", manufacturer: "Mitsubishi", status: "เป็น Spare" },
    { id: 9, equipmentNo: "70000016207", manufacturer: "Elektro Roxurg", status: "เป็น Spare" },
    { id: 10, equipmentNo: "70000016208", manufacturer: "OSAKA", status: "เป็น Spare" },
    { id: 11, equipmentNo: "70000016209", manufacturer: "Meiden", status: "เป็น Spare" },
    { id: 12, equipmentNo: "70000016210", manufacturer: "Mitsubishi", status: "เป็น Spare" },
  ];

  // Filter by region and search query
  const filteredData = transformerData.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.equipmentNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (transformer) => {
    setCurrentTransformer(transformer);
    setShowEditModal(true);
  };

  const handleRelocate = (transformer) => {
    setCurrentTransformer(transformer);
    setShowRelocationModal(true);
  };

  const handleStatusChange = (id, newStatus) => {
    // In a real app, update the status in the database
    toast({
      title: "สถานะถูกอัพเดทเรียบร้อย",
      description: `สถานะของหม้อแปลง ${id} ถูกเปลี่ยนเป็น ${newStatus} แล้ว`,
    });
  };

  const handleSaveEdit = () => {
    toast({
      title: "บันทึกการแก้ไขสำเร็จ",
      description: "แก้ไขข้อมูลหม้อแปลงไฟฟ้าเรียบร้อยแล้ว",
    });
    setShowEditModal(false);
  };

  const handleSaveRelocation = () => {
    toast({
      title: "บันทึกการย้ายหม้อแปลงสำเร็จ",
      description: "บันทึกข้อมูลการย้ายหม้อแปลงไฟฟ้าเรียบร้อยแล้ว",
    });
    setShowRelocationModal(false);
  };

  return (
    <DashboardLayout
      pageTitle="การย้ายหม้อแปลง"
      pageDescription="Transformer Relocation"
    >
      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        {/* Filters Section */}
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="ค้นหาหม้อแปลง..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-4 md:p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Equipment No.</TableHead>
                    <TableHead className="text-center">บริษัทผู้ผลิต</TableHead>
                    <TableHead className="text-center">สถานะ</TableHead>
                    <TableHead className="text-center">แก้ไขหม้อแปลง</TableHead>
                    <TableHead className="text-center">ย้ายเข้าหม้อแปลง</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.length > 0 ? (
                    currentData.map((item) => (
                      <TableRow key={item.id} className="hover:bg-blue-50/30">
                        <TableCell className="text-center">{item.equipmentNo}</TableCell>
                        <TableCell className="text-center">{item.manufacturer}</TableCell>
                        <TableCell className="text-center">
                          <Select defaultValue={item.status} onValueChange={(value) => handleStatusChange(item.id, value)}>
                            <SelectTrigger className="w-full max-w-[200px] mx-auto focus-visible:ring-0 border-none text-center justify-center">
                              <SelectValue placeholder="เลือกสถานะ" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border shadow-md">
                              <SelectItem value="เป็น Spare">เป็น Spare</SelectItem>
                              <SelectItem value="ถูกปลดออกจากระบบ">ถูกปลดออกจากระบบ</SelectItem>
                              <SelectItem value="อยู่ในระหว่างซ่อม">อยู่ในระหว่างซ่อม</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="outline" 
                            className="bg-slate-600 text-white hover:bg-slate-700 focus:ring-0"
                            onClick={() => handleEdit(item)}
                          >
                            แก้ไขหม้อแปลง
                          </Button>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="outline" 
                            className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-0"
                            onClick={() => handleRelocate(item)}
                          >
                            ย้ายเข้าหม้อแปลง
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        ไม่พบข้อมูลหม้อแปลงไฟฟ้า
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {filteredData.length > 0 && (
              <div className="flex justify-center items-center mt-6 space-x-2">
                <Button 
                  variant="outline" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="focus:ring-0"
                >
                  ก่อนหน้า
                </Button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                    const pagesToShow = 5;
                    let pageNum;
                    
                    if (totalPages <= pagesToShow) {
                      pageNum = idx + 1;
                    } else if (currentPage <= Math.ceil(pagesToShow / 2)) {
                      pageNum = idx + 1;
                    } else if (currentPage >= totalPages - Math.floor(pagesToShow / 2)) {
                      pageNum = totalPages - pagesToShow + idx + 1;
                    } else {
                      pageNum = currentPage - Math.floor(pagesToShow / 2) + idx;
                    }
                    
                    // Only render if pageNum is valid
                    if (pageNum > 0 && pageNum <= totalPages) {
                      return (
                        <Button 
                          key={pageNum} 
                          variant={pageNum === currentPage ? "default" : "outline"} 
                          className={`${pageNum === currentPage ? "bg-blue-600 text-white" : ""} focus:ring-0`}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    }
                    return null;
                  })}
                </div>
                
                <Button 
                  variant="outline" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="focus:ring-0"
                >
                  ถัดไป
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Transformer Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">แก้ไขข้อมูลหม้อแปลงไฟฟ้า</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="equipment-no">Equipment No.</Label>
              <Input 
                id="equipment-no" 
                defaultValue={currentTransformer?.equipmentNo} 
                disabled
                className="focus-visible:ring-0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-status">สถานะหม้อแปลงไฟฟ้า</Label>
              <Select defaultValue={currentTransformer?.status}>
                <SelectTrigger id="edit-status" className="focus:ring-0 focus-visible:ring-0">
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-md">
                  <SelectItem value="เป็น Spare">เป็น Spare</SelectItem>
                  <SelectItem value="ถูกปลดออกจากระบบ">ถูกปลดออกจากระบบ</SelectItem>
                  <SelectItem value="อยู่ในระหว่างซ่อม">อยู่ในระหว่างซ่อม</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-note">หมายเหตุ</Label>
              <Input 
                id="edit-note" 
                placeholder="กรอกหมายเหตุ (ถ้ามี)" 
                className="focus-visible:ring-0"
              />
            </div>
          </div>
          
          <DialogFooter className="sm:justify-end pt-2">
            <Button variant="outline" onClick={() => setShowEditModal(false)} className="mr-2 focus:ring-0">
              ยกเลิก
            </Button>
            <Button onClick={handleSaveEdit} className="bg-blue-600 hover:bg-blue-700 focus:ring-0">
              บันทึกการแก้ไข
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Relocation Modal */}
      <Dialog open={showRelocationModal} onOpenChange={setShowRelocationModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">เพิ่มการย้ายหม้อแปลง</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="relocation-equipment-no">Equipment No.</Label>
              <Input 
                id="relocation-equipment-no" 
                defaultValue={currentTransformer?.equipmentNo}
                disabled
                className="focus-visible:ring-0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="old-station">สถานีเก่า</Label>
              <Input 
                id="old-station" 
                placeholder="กรอกสถานีเก่า"
                className="focus-visible:ring-0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-station">ย้ายไปสถานีใหม่</Label>
              <Select>
                <SelectTrigger id="new-station" className="focus:ring-0 focus-visible:ring-0">
                  <SelectValue placeholder="เลือกสถานีใหม่" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-md">
                  <SelectItem value="สถานี 1">สถานีไฟฟ้า 1</SelectItem>
                  <SelectItem value="สถานี 2">สถานีไฟฟ้า 2</SelectItem>
                  <SelectItem value="สถานี 3">สถานีไฟฟ้า 3</SelectItem>
                  <SelectItem value="สถานี 4">สถานีไฟฟ้า 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-name">ชื่อหม้อแปลงใหม่ (ใส่ KT1A,...)</Label>
              <Input 
                id="new-name" 
                placeholder="กรอกชื่อหม้อแปลงใหม่" 
                className="focus-visible:ring-0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="relocation-date">วันที่ย้าย</Label>
              <Input 
                id="relocation-date" 
                type="date"
                className="focus-visible:ring-0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recorder">ผู้บันทึก</Label>
              <Input 
                id="recorder" 
                placeholder="ชื่อผู้บันทึก"
                className="focus-visible:ring-0"
              />
            </div>
          </div>
          
          <DialogFooter className="sm:justify-end pt-2">
            <Button variant="outline" onClick={() => setShowRelocationModal(false)} className="mr-2 focus:ring-0">
              ยกเลิก
            </Button>
            <Button onClick={handleSaveRelocation} className="bg-blue-600 hover:bg-blue-700 focus:ring-0">
              บันทึกการย้าย
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default TransformerRelocationInfo;
