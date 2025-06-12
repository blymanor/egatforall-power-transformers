
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Edit, Plus } from "lucide-react";

const TransformerRelocationInfo = () => {
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for transformers
  const transformerData = [
    { id: 1, name: "AN-472A", equipmentNo: "70000016001", manufacturer: "ABB", capacity: "50.0", status: "active", location: "สถานี 1" },
    { id: 2, name: "AN-K12A", equipmentNo: "70000016003", manufacturer: "OSAKA", capacity: "50.0", status: "inactive", location: "สถานี 2" },
    { id: 3, name: "AN-472B", equipmentNo: "70000016201", manufacturer: "Siemens", capacity: "300.0", status: "active", location: "สถานี 1" },
    { id: 4, name: "AN-473A", equipmentNo: "70000016202", manufacturer: "Hitachi", capacity: "300.0", status: "maintenance", location: "สถานี 3" },
    { id: 5, name: "AN-474A", equipmentNo: "70000016203", manufacturer: "Mitsubishi", capacity: "300.0", status: "active", location: "สถานี 3" },
    { id: 6, name: "AN-475A", equipmentNo: "70000016204", manufacturer: "OSAKA", capacity: "300.0", status: "inactive", location: "สถานี 2" },
  ];

  // Filter by status and search query
  const filteredData = transformerData.filter(item => {
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    const matchesSearch = searchQuery === "" || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.equipmentNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Pagination
  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (transformer) => {
    toast({
      title: "แก้ไขข้อมูล",
      description: `แก้ไขข้อมูลหม้อแปลง ${transformer.name}`,
    });
  };

  const handleRelocate = (transformer) => {
    toast({
      title: "ย้ายหม้อแปลง",
      description: `เริ่มกระบวนการย้ายหม้อแปลง ${transformer.name}`,
    });
  };

  return (
    <DashboardLayout
      pageTitle="ข้อมูลการย้ายหม้อแปลงไฟฟ้า"
      pageDescription="Transformer Relocation Information"
    >
      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        {/* Filters Section - moved status dropdown to right */}
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="ค้นหาหม้อแปลง..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 focus-visible:ring-0"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label className="text-gray-700 whitespace-nowrap">สถานะ:</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40 focus:ring-0 border border-gray-300">
                    <SelectValue placeholder="ทั้งหมด" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="active">ใช้งาน</SelectItem>
                    <SelectItem value="inactive">ไม่ใช้งาน</SelectItem>
                    <SelectItem value="maintenance">บำรุงรักษา</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Section - changed headers to icons */}
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-4 md:p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Equipment No.</TableHead>
                    <TableHead className="text-center">หม้อแปลงไฟฟ้า</TableHead>
                    <TableHead className="text-center">บริษัทผู้ผลิต</TableHead>
                    <TableHead className="text-center">พิกัดกำลังไฟฟ้า (MVA)</TableHead>
                    <TableHead className="text-center">สถานะ</TableHead>
                    <TableHead className="text-center w-16"><Edit className="h-4 w-4 mx-auto" /></TableHead>
                    <TableHead className="text-center w-16"><Plus className="h-4 w-4 mx-auto" /></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.length > 0 ? (
                    currentData.map((item) => (
                      <TableRow key={item.id} className="hover:bg-blue-50/30">
                        <TableCell className="text-center">{item.equipmentNo}</TableCell>
                        <TableCell className="text-center">{item.name}</TableCell>
                        <TableCell className="text-center">{item.manufacturer}</TableCell>
                        <TableCell className="text-center">{item.capacity}</TableCell>
                        <TableCell className="text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === 'active' ? 'bg-green-100 text-green-800' :
                            item.status === 'inactive' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.status === 'active' ? 'ใช้งาน' : 
                             item.status === 'inactive' ? 'ไม่ใช้งาน' : 'บำรุงรักษา'}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="p-2 hover:bg-blue-50" 
                            onClick={() => handleEdit(item)}
                          >
                            <Edit className="h-4 w-4 text-blue-600" />
                          </Button>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="p-2 hover:bg-green-50"
                            onClick={() => handleRelocate(item)}
                          >
                            <Plus className="h-4 w-4 text-green-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
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
                >
                  ก่อนหน้า
                </Button>
                
                {Array.from({ length: Math.min(3, totalPages) }).map((_, idx) => {
                  const page = currentPage <= 2 ? idx + 1 : 
                              currentPage >= totalPages - 1 ? totalPages - 2 + idx : 
                              currentPage - 1 + idx;
                  
                  if (page > 0 && page <= totalPages) {
                    return (
                      <Button 
                        key={page} 
                        variant={page === currentPage ? "default" : "outline"} 
                        className={page === currentPage ? "bg-blue-600 text-white" : ""}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    );
                  }
                  return null;
                })}
                
                <Button 
                  variant="outline" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                  ถัดไป
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransformerRelocationInfo;
