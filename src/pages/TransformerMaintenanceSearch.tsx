
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search } from "lucide-react";

const TransformerMaintenanceSearch = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Form state for search conditions
  const [searchConditions, setSearchConditions] = useState({
    searchBy: "equipmentNo",
    searchValue: "",
    stationCondition: "",
    stationName: "",
    inspectionDate: "",
    inspectorName: ""
  });

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
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        {/* Header with blue left border like reference image */}
        <div className="mb-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h1 className="text-xl font-bold text-black">ค้นหาข้อมูลบำรุงรักษาหม้อแปลง</h1>
            <p className="text-base text-gray-600">Search Transformer Maintenance Data</p>
          </div>
        </div>

        {/* Search Form Section 1 */}
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-blue-600 mb-4">ค้นหาข้อมูลหม้อแปลงไฟฟ้า</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium text-gray-700 mb-2 block">คำสำคัญ :</Label>
                <Input
                  placeholder=""
                  value={searchConditions.searchValue}
                  onChange={(e) => setSearchConditions(prev => ({...prev, searchValue: e.target.value}))}
                  className="focus-visible:ring-0"
                />
              </div>

              <div>
                <Label className="text-base font-medium text-gray-700 mb-3 block">ค้นหาโดย :</Label>
                <RadioGroup 
                  value={searchConditions.searchBy} 
                  onValueChange={(value) => setSearchConditions(prev => ({...prev, searchBy: value}))}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="equipmentNo" id="equipmentNo" />
                    <Label htmlFor="equipmentNo" className="text-base text-gray-700 cursor-pointer">Equipment No.</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="transformerName" id="transformerName" />
                    <Label htmlFor="transformerName" className="text-base text-gray-700 cursor-pointer">ชื่อหม้อแปลง</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="stationName" id="stationName" />
                    <Label htmlFor="stationName" className="text-base text-gray-700 cursor-pointer">สถานีไฟฟ้า</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-start">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Form Section 2 */}
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-blue-600 mb-4">ค้นหาข้อมูลการทดสอบหม้อแปลงไฟฟ้า</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium text-gray-700 mb-2 block">ชนิดการทดสอบ :</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Please Select..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    <SelectItem value="visual">Visual Inspection</SelectItem>
                    <SelectItem value="electrical">Electrical Test</SelectItem>
                    <SelectItem value="oil">Oil Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-medium text-gray-700 mb-2 block">ชื่อหม้อแปลงไฟฟ้า :</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    <SelectItem value="an472a">AN-472A</SelectItem>
                    <SelectItem value="ank12a">AN-K12A</SelectItem>
                    <SelectItem value="an472b">AN-472B</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-start">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Form Section 3 */}
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-blue-600 mb-4">เลือกหม้อแปลงไฟฟ้าเพื่อทราบข้อมูลการทดสอบ Visual Inspection</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium text-gray-700 mb-2 block">ชื่อหม้อแปลงไฟฟ้า :</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    <SelectItem value="an472a">AN-472A</SelectItem>
                    <SelectItem value="ank12a">AN-K12A</SelectItem>
                    <SelectItem value="an472b">AN-472B</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-medium text-gray-700 mb-2 block">รูปแบบการทดสอบ :</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกรูปแบบการทดสอบ" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    <SelectItem value="routine">Routine Inspection</SelectItem>
                    <SelectItem value="detailed">Detailed Inspection</SelectItem>
                    <SelectItem value="emergency">Emergency Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-medium text-gray-700 mb-2 block">วันที่ตรวจสอบ :</Label>
                <Input
                  type="date"
                  value="2025-06-12"
                  className="focus-visible:ring-0"
                />
              </div>

              <div>
                <Label className="text-base font-medium text-gray-700 mb-2 block">ผู้ตรวจสอบ :</Label>
                <Input
                  placeholder=""
                  className="focus-visible:ring-0"
                />
              </div>

              <div>
                <Label className="text-base font-medium text-gray-700 mb-2 block">เลขที่ใบปฏิบัติงาน :</Label>
                <Input
                  placeholder=""
                  className="focus-visible:ring-0"
                />
              </div>

              <div className="flex justify-start">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
                  Done
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransformerMaintenanceSearch;
