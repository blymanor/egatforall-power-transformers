
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ChevronDown, Eye, Pencil, Search, Trash2 } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface InspectionRecord {
  id: number;
  transformerName: string;
  egatSn: string;
  testType: string;
  inspectionDate: string;
  operationId: string;
  inspector: string;
}

const TransformerVisualInspection = () => {
  const [selectedCategory, setSelectedCategory] = useState("general-condition");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for the dropdown options
  const categories = [
    { value: "general-condition", label: "List all General Condition" },
    { value: "bushing", label: "List all Bushing" },
    { value: "lightning-arrester", label: "List all Lightning Arrester" },
    { value: "conservator-tank", label: "List all Conservator Tank" },
    { value: "main-tank", label: "List all Main Tank" },
    { value: "hot-line-oil-filter", label: "List all Hot Line Oil Filter" },
    { value: "radiator-cooling", label: "List all Radiator and Cooling System" },
    { value: "control-cabinet", label: "List all Transformer Control Cabinet" },
    { value: "ngr", label: "List all NGR" },
    { value: "regulating-pt", label: "List all Regulating PT" },
    { value: "oltc-compartment", label: "List all OLTC Compartment" },
    { value: "oltc-control-cabinet", label: "List all OLTC Control Cabinet" },
    { value: "thermo-scan", label: "List all Thermo Scan" }
  ];

  // Mock data for inspection records
  const mockRecords: InspectionRecord[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    transformerName: "AN-KT1A",
    egatSn: "7000016200",
    testType: "Weekly test",
    inspectionDate: "30/1/2012",
    operationId: i === 8 ? "00000000" : i === 9 ? "0000111" : "00",
    inspector: "จุลศักดิ์"
  }));

  // Filter records based on search query
  const filteredRecords = mockRecords.filter(record => 
    record.transformerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.egatSn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.operationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.inspector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    toast.info(`เลือกแสดงข้อมูล ${categories.find(c => c.value === value)?.label}`, {
      description: "กำลังโหลดข้อมูล",
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("กำลังค้นหาข้อมูล", {
      description: `ค้นหา "${searchQuery}"`,
    });
  };

  const handleView = (id: number) => {
    toast.info(`ดูข้อมูล ID: ${id}`, {
      description: "กำลังโหลดข้อมูล",
    });
  };

  const handleEdit = (id: number) => {
    toast.info(`แก้ไขข้อมูล ID: ${id}`, {
      description: "กำลังโหลดข้อมูล",
    });
  };

  const handleDelete = (id: number) => {
    toast.info(`ลบข้อมูล ID: ${id}`, {
      description: "คุณต้องการลบข้อมูลนี้หรือไม่?",
    });
  };

  const handleCreate = () => {
    toast.success("สร้างรายการใหม่", {
      description: "กำลังเปิดฟอร์มสำหรับสร้างรายการใหม่",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <Card className="max-w-full overflow-hidden">
          <CardHeader className="bg-gray-50 flex flex-row items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <ChevronDown className="h-5 w-5 text-gray-500" />
              <CardTitle className="text-lg font-medium">
                {categories.find(c => c.value === selectedCategory)?.label}
              </CardTitle>
            </div>
            <div className="flex items-center">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="ค้นหา"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64 h-9"
                />
              </form>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-row items-center justify-between p-4">
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="overflow-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-center w-16">No.</TableHead>
                    <TableHead className="text-center">หม้อแปลงไฟฟ้า</TableHead>
                    <TableHead className="text-center">EGAT S/N</TableHead>
                    <TableHead className="text-center">รูปแบบการทดสอบ</TableHead>
                    <TableHead className="text-center">วันที่ตรวจสอบ</TableHead>
                    <TableHead className="text-center">เลขที่สั่งปฏิบัติงาน</TableHead>
                    <TableHead className="text-center">ผู้ตรวจสอบ</TableHead>
                    <TableHead className="text-center">Show</TableHead>
                    <TableHead className="text-center">Update</TableHead>
                    <TableHead className="text-center">Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id} className="even:bg-gray-50">
                      <TableCell className="text-center">{record.id}</TableCell>
                      <TableCell className="text-center">{record.transformerName}</TableCell>
                      <TableCell className="text-center">{record.egatSn}</TableCell>
                      <TableCell className="text-center">{record.testType}</TableCell>
                      <TableCell className="text-center">{record.inspectionDate}</TableCell>
                      <TableCell className="text-center">{record.operationId}</TableCell>
                      <TableCell className="text-center">{record.inspector}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          onClick={() => handleView(record.id)}
                          variant="ghost"
                          size="icon"
                          className="hover:bg-blue-100"
                        >
                          <Eye className="h-4 w-4 text-blue-600" />
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          onClick={() => handleEdit(record.id)}
                          variant="ghost"
                          size="icon"
                          className="hover:bg-blue-100"
                        >
                          <Pencil className="h-4 w-4 text-blue-600" />
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          onClick={() => handleDelete(record.id)}
                          variant="ghost"
                          size="icon"
                          className="hover:bg-red-100"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <Button onClick={handleCreate} variant="outline" size="sm" className="flex items-center gap-1 border-blue-600 text-blue-600">
                <span className="text-lg font-bold">+</span> Create
              </Button>
              
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">206</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransformerVisualInspection;
