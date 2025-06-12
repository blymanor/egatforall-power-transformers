
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
import { Search } from "lucide-react";

const TransformerMaintenanceSearch = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for maintenance records
  const maintenanceData = [
    { id: 1, equipmentNo: "70000016001", transformerName: "AN-472A", maintenanceType: "Preventive", date: "2024-01-15", technician: "วิศวกร สมชาย", status: "Completed", nextDue: "2024-07-15" },
    { id: 2, equipmentNo: "70000016003", transformerName: "AN-K12A", maintenanceType: "Corrective", date: "2024-02-20", technician: "วิศวกร สมหญิง", status: "In Progress", nextDue: "2024-08-20" },
    { id: 3, equipmentNo: "70000016201", transformerName: "AN-472B", maintenanceType: "Preventive", date: "2024-03-10", technician: "วิศวกร สมศักดิ์", status: "Completed", nextDue: "2024-09-10" },
    { id: 4, equipmentNo: "70000016202", transformerName: "AN-473A", maintenanceType: "Emergency", date: "2024-04-05", technician: "วิศวกร สมพงษ์", status: "Completed", nextDue: "2024-10-05" },
    { id: 5, equipmentNo: "70000016203", transformerName: "AN-474A", maintenanceType: "Preventive", date: "2024-05-12", technician: "วิศวกร สมใจ", status: "Scheduled", nextDue: "2024-11-12" },
  ];

  // Filter data
  const filteredData = maintenanceData.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.equipmentNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.transformerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.technician.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesYear = selectedYear === "all" || item.date.includes(selectedYear);
    const matchesType = selectedType === "all" || item.maintenanceType === selectedType;
    
    return matchesSearch && matchesYear && matchesType;
  });

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (maintenance) => {
    toast({
      title: "แก้ไขข้อมูล",
      description: `แก้ไขข้อมูลการบำรุงรักษา ${maintenance.transformerName}`,
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      case "Scheduled": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout
      pageTitle="ค้นหาข้อมูลบำรุงรักษาหม้อแปลง"
      pageDescription="Search Transformer Maintenance Data"
    >
      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        {/* Header with black text */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-black mb-2">ค้นหาข้อมูลบำรุงรักษาหม้อแปลง</h1>
          <p className="text-lg text-gray-600">Search Transformer Maintenance Data</p>
        </div>

        {/* Search and Filter Section */}
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="ค้นหา Equipment No., ชื่อหม้อแปลง, ช่างเทคนิค..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 focus-visible:ring-0"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-sm text-gray-600">ปี</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="focus:ring-0 border border-gray-300">
                    <SelectValue placeholder="เลือกปี" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-sm text-gray-600">ประเภทการบำรุงรักษา</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="focus:ring-0 border border-gray-300">
                    <SelectValue placeholder="เลือกประเภท" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="Preventive">Preventive</SelectItem>
                    <SelectItem value="Corrective">Corrective</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  ค้นหา
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Table */}
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-4 md:p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Equipment No.</TableHead>
                    <TableHead className="text-center">ชื่อหม้อแปลง</TableHead>
                    <TableHead className="text-center">ประเภทการบำรุงรักษา</TableHead>
                    <TableHead className="text-center">วันที่</TableHead>
                    <TableHead className="text-center">ช่างเทคนิค</TableHead>
                    <TableHead className="text-center">สถานะ</TableHead>
                    <TableHead className="text-center">กำหนดครั้งถัดไป</TableHead>
                    <TableHead className="text-center">แก้ไข</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.length > 0 ? (
                    currentData.map((item) => (
                      <TableRow key={item.id} className="hover:bg-blue-50/30">
                        <TableCell className="text-center">{item.equipmentNo}</TableCell>
                        <TableCell className="text-center">{item.transformerName}</TableCell>
                        <TableCell className="text-center">{item.maintenanceType}</TableCell>
                        <TableCell className="text-center">{new Date(item.date).toLocaleDateString('th-TH')}</TableCell>
                        <TableCell className="text-center">{item.technician}</TableCell>
                        <TableCell className="text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">{new Date(item.nextDue).toLocaleDateString('th-TH')}</TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="ghost" 
                            className="text-blue-600 hover:text-blue-800" 
                            onClick={() => handleEdit(item)}
                          >
                            แก้ไข
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        ไม่พบข้อมูลการบำรุงรักษา
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
                  const page = idx + 1;
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

export default TransformerMaintenanceSearch;
