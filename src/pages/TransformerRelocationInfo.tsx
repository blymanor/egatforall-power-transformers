import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, Edit, ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import TransformerEditModal from "@/components/modals/TransformerEditModal";
import TransformerRelocateModal from "@/components/modals/TransformerRelocateModal";
import CustomPagination from "@/components/ui/custom-pagination";

const TransformerRelocationInfo = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRelocateModalOpen, setIsRelocateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for transformers - updated to show different statuses
  const transformers = [
    // เป็น spare status (5 items)
    { id: 1, deviceNo: "70000016201", equipmentNo: "Electro Busang", location: "Bangkok", status: "เป็น spare" },
    { id: 2, deviceNo: "70000016202", equipmentNo: "Meiden", location: "Chiang Mai", status: "เป็น spare" },
    { id: 3, deviceNo: "70000016203", equipmentNo: "Meiden", location: "Phuket", status: "เป็น spare" },
    { id: 4, deviceNo: "70000016204", equipmentNo: "Mitsubishi", location: "Bangkok", status: "เป็น spare" },
    { id: 5, deviceNo: "70000016205", equipmentNo: "Electro Busang", location: "Chiang Mai", status: "เป็น spare" },
    
    // ถูกปลดออกจากระบบ status (5 items)
    { id: 6, deviceNo: "70000016206", equipmentNo: "OSAKA", location: "Phuket", status: "ถูกปลดออกจากระบบ" },
    { id: 7, deviceNo: "70000016207", equipmentNo: "Meiden", location: "Bangkok", status: "ถูกปลดออกจากระบบ" },
    { id: 8, deviceNo: "70000016208", equipmentNo: "Mitsubishi", location: "Chiang Mai", status: "ถูกปลดออกจากระบบ" },
    { id: 9, deviceNo: "70000016209", equipmentNo: "Electro Busang", location: "Phuket", status: "ถูกปลดออกจากระบบ" },
    { id: 10, deviceNo: "70000016210", equipmentNo: "OSAKA", location: "Bangkok", status: "ถูกปลดออกจากระบบ" },
    
    // อยู่ในระหว่างซ่อม status (5 items)
    { id: 11, deviceNo: "70000016211", equipmentNo: "Mitsubishi", location: "Chiang Mai", status: "อยู่ในระหว่างซ่อม" },
    { id: 12, deviceNo: "70000016212", equipmentNo: "Mitsubishi", location: "Phuket", status: "อยู่ในระหว่างซ่อม" },
    { id: 13, deviceNo: "70000016213", equipmentNo: "ABB", location: "Bangkok", status: "อยู่ในระหว่างซ่อม" },
    { id: 14, deviceNo: "70000016214", equipmentNo: "Siemens", location: "Chiang Mai", status: "อยู่ในระหว่างซ่อม" },
    { id: 15, deviceNo: "70000016215", equipmentNo: "Hitachi", location: "Phuket", status: "อยู่ในระหว่างซ่อม" },
  ];

  // Filter transformers based on search and status
  const filteredTransformers = transformers.filter(transformer => {
    const matchesSearch = searchQuery === "" || 
      transformer.deviceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transformer.equipmentNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transformer.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || transformer.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredTransformers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredTransformers.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (transformer) => {
    setIsEditModalOpen(true);
  };

  const handleRelocate = (transformer) => {
    setIsRelocateModalOpen(true);
  };

  const updateStatus = (transformerId, newStatus) => {
    toast({
      title: "อัปเดตสถานะ",
      description: `เปลี่ยนสถานะเป็น ${newStatus}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 bg-[#f0f4fa]">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">การย้ายหม้อแปลงไฟฟ้า</h1>
          <p className="text-sm text-gray-600">transformer relocation information</p>
        </div>

        {/* Search and Filter Section */}
        <Card className="shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6">
            <div className="flex justify-between items-center gap-4">
              {/* Left side - Status Filter */}
              <div className="flex items-center gap-2">
                <Label className="text-base text-gray-600 whitespace-nowrap">สถานะ:</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-72 focus:ring-0 border border-gray-300 text-base">
                    <SelectValue placeholder="เลือกสถานะ" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="เป็น spare">เป็น spare</SelectItem>
                    <SelectItem value="ถูกปลดออกจากระบบ">ถูกปลดออกจากระบบ</SelectItem>
                    <SelectItem value="อยู่ในระหว่างซ่อม">อยู่ในระหว่างซ่อม</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Right side - Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="ค้นหาหม้อแปลง..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 focus-visible:ring-0 text-base"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center text-base">Equipment No.</TableHead>
                    <TableHead className="text-center text-base">บริษัทผู้ผลิต</TableHead>
                    <TableHead className="text-center text-base">สถานะ</TableHead>
                    <TableHead className="text-center text-base">แก้ไข</TableHead>
                    <TableHead className="text-center text-base">ย้ายเข้า</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.length > 0 ? (
                    currentData.map((transformer) => (
                      <TableRow key={transformer.id} className="hover:bg-blue-50/30">
                        <TableCell className="text-center text-base">{transformer.deviceNo}</TableCell>
                        <TableCell className="text-center text-base">{transformer.equipmentNo}</TableCell>
                        <TableCell className="text-center">
                          <Select 
                            value={transformer.status} 
                            onValueChange={(newStatus) => updateStatus(transformer.id, newStatus)}
                          >
                            <SelectTrigger className="w-auto min-w-40 h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white border shadow-md">
                              <SelectItem value="เป็น spare">เป็น spare</SelectItem>
                              <SelectItem value="ถูกปลดออกจากระบบ">ถูกปลดออกจากระบบ</SelectItem>
                              <SelectItem value="อยู่ในระหว่างซ่อม">อยู่ในระหว่างซ่อม</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEdit(transformer)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRelocate(transformer)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-base">
                        ไม่พบข้อมูลหม้อแปลงไฟฟ้า
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex justify-center">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Modals */}
      <TransformerEditModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
      <TransformerRelocateModal 
        isOpen={isRelocateModalOpen}
        onClose={() => setIsRelocateModalOpen(false)}
      />
    </DashboardLayout>
  );
};

export default TransformerRelocationInfo;
