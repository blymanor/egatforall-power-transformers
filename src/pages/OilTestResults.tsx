
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  ChevronDown, 
  Eye, 
  Pencil, 
  Search, 
  Trash2,
  Filter
} from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface TestRecord {
  id: number;
  transformerName: string;
  egatSn: string;
  testType: string;
  inspectionDate: string;
  operationId: string;
  inspector: string;
}

const OilTestResults = () => {
  const [selectedCategory, setSelectedCategory] = useState("oil-aging");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for the dropdown options with added icon info
  const categories = [
    { value: "oil-aging", label: "List all Oil Aging", icon: "insulating-oil" },
    { value: "oil-dga", label: "List all Oil DGA", icon: "insulating-oil" },
    { value: "oil-furan", label: "List all Oil Furan", icon: "insulating-oil" },
    { value: "oil-contamination", label: "List all Oil Contamination", icon: "insulating-oil" },
    { value: "oltc-dga", label: "List all OLTC DGA", icon: "insulating-oil" },
    { value: "hot-line-oil-filter", label: "List all Hot Line Oil Filter", icon: "hot-line-oil-filter" },
    { value: "oltc-oil-contamination", label: "List all OLTC Oil Contamination", icon: "insulating-oil" }
  ];

  // Dynamic mock data based on selected category
  const getMockRecords = (category: string): TestRecord[] => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      // Change data based on selected category
      transformerName: category.includes("oltc") ? `OLTC-${i+1}` : 
                      category === "oil-dga" ? `DGA-${i+1}` : 
                      category === "oil-furan" ? `FRN-${i+1}` : `AN-KT2A`,
      egatSn: `${7000000000 + parseInt(category.substring(0, 3), 36) + i}`,
      testType: category.includes("dga") ? "1 year test" :
                category.includes("furan") ? "6 year test" : 
                category.includes("contamination") ? "Monthly test" : "Weekly test",
      inspectionDate: `${(i % 28) + 1}/${(i % 12) + 1}/2023`,
      operationId: category === "oil-aging" ? `OA${i}00` : 
                  category === "oil-dga" ? `DGA${i}0` : `${i}${i}`,
      inspector: ["จุลศักดิ์", "สมชาย", "วิชัย", "นภดล", "ธีรศักดิ์"][i % 5]
    }));
  };

  // Get records based on selected category
  const records = getMockRecords(selectedCategory);

  // Filter records based on search query
  const filteredRecords = records.filter(record => 
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

  // Function to render the appropriate icon based on category
  const renderCategoryIcon = () => {
    const iconName = categories.find(c => c.value === selectedCategory)?.icon || "insulating-oil";
    
    // Using imported icons directly
    return (
      <div className="h-5 w-5 text-blue-500">
        {/* This would need to be dynamically imported in a real implementation */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {iconName === "hot-line-oil-filter" ? (
            <path d="M12 2v6M12 22v-6M4.93 10.93l1.41 1.41M18.07 10.93l-1.41 1.41M2 16h6M22 16h-6M5 22l3-3M19 22l-3-3M19 2l-3 3M5 2l3 3M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          ) : (
            <>
              <path d="M10 3v1M10 18v3M12 3v2M12 16v5M14 3v3M14 14v7M3 8h18M3 12h18M3 16h18" />
              <path d="M5 21V8M9 21V6M12 21V3M19 21V8" strokeDasharray="2" />
            </>
          )}
        </svg>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <Card className="max-w-full overflow-hidden">
          <CardHeader className="bg-gray-50 flex flex-row items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              {renderCategoryIcon()}
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
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">หัวข้อตารางที่ต้องการดู:</span>
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

export default OilTestResults;
