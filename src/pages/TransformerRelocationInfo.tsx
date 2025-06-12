
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

const TransformerRelocationInfo = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock data for transformers
  const transformers = [
    { id: 1, deviceNo: "70000016001", equipmentNo: "AN-472A", manufacturer: "ABB", location: "Bangkok", region: "Central", substationName: "Substation A", status: "spare" },
    { id: 2, deviceNo: "70000016003", equipmentNo: "AN-K12A", manufacturer: "Siemens", location: "Chiang Mai", region: "North", substationName: "Substation B", status: "ถูกปลดออกจากระบบ" },
    { id: 3, deviceNo: "70000016201", equipmentNo: "AN-472B", manufacturer: "Hitachi", location: "Phuket", region: "South", substationName: "Substation C", status: "อยู่ในระหว่างซ่อม" },
  ];

  // Filter transformers based on search and status
  const filteredTransformers = transformers.filter(transformer => {
    const matchesSearch = searchQuery === "" || 
      transformer.deviceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transformer.equipmentNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transformer.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transformer.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || transformer.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (transformer) => {
    toast({
      title: "แก้ไขข้อมูล",
      description: `แก้ไขข้อมูลหม้อแปลง ${transformer.equipmentNo}`,
    });
  };

  const handleRelocate = (transformer) => {
    toast({
      title: "ย้ายเข้าหม้อแปลง",
      description: `ย้ายเข้าหม้อแปลง ${transformer.equipmentNo}`,
    });
  };

  const getStatusBadgeColor = (status) => {
    switch(status) {
      case "spare": return "bg-blue-100 text-blue-800";
      case "ถูกปลดออกจากระบบ": return "bg-red-100 text-red-800";
      case "อยู่ในระหว่างซ่อม": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const updateStatus = (transformerId, newStatus) => {
    // Update status logic here
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">การย้ายหม้อแปลงไฟฟ้า</h1>
          <p className="text-lg text-gray-600">Transformer Relocation Information</p>
        </div>

        {/* Search and Filter Section */}
        <Card className="shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6">
            <div className="flex justify-between items-center gap-4">
              {/* Left side - Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="ค้นหาหม้อแปลง..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 focus-visible:ring-0"
                />
              </div>

              {/* Right side - Status Filter */}
              <div className="flex items-center gap-2">
                <Label className="text-sm text-gray-600 whitespace-nowrap">สถานะ:</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-60 focus:ring-0 border border-gray-300">
                    <SelectValue placeholder="เลือกสถานะ" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="spare">spare</SelectItem>
                    <SelectItem value="ถูกปลดออกจากระบบ">ถูกปลดออกจากระบบ</SelectItem>
                    <SelectItem value="อยู่ในระหว่างซ่อม">อยู่ในระหว่างซ่อม</SelectItem>
                  </SelectContent>
                </Select>
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
                    <TableHead className="text-center">Device No.</TableHead>
                    <TableHead className="text-center">Equipment No.</TableHead>
                    <TableHead className="text-center">Manufacturer</TableHead>
                    <TableHead className="text-center">Location</TableHead>
                    <TableHead className="text-center">Region</TableHead>
                    <TableHead className="text-center">Substation Name</TableHead>
                    <TableHead className="text-center">สถานะ</TableHead>
                    <TableHead className="text-center">แก้ไข</TableHead>
                    <TableHead className="text-center">ย้ายเข้า</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransformers.length > 0 ? (
                    filteredTransformers.map((transformer) => (
                      <TableRow key={transformer.id} className="hover:bg-blue-50/30">
                        <TableCell className="text-center">{transformer.deviceNo}</TableCell>
                        <TableCell className="text-center">{transformer.equipmentNo}</TableCell>
                        <TableCell className="text-center">{transformer.manufacturer}</TableCell>
                        <TableCell className="text-center">{transformer.location}</TableCell>
                        <TableCell className="text-center">{transformer.region}</TableCell>
                        <TableCell className="text-center">{transformer.substationName}</TableCell>
                        <TableCell className="text-center">
                          <Select 
                            value={transformer.status} 
                            onValueChange={(newStatus) => updateStatus(transformer.id, newStatus)}
                          >
                            <SelectTrigger className="w-auto min-w-32 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white border shadow-md">
                              <SelectItem value="spare">spare</SelectItem>
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
                      <TableCell colSpan={9} className="h-24 text-center">
                        ไม่พบข้อมูลหม้อแปลงไฟฟ้า
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransformerRelocationInfo;
