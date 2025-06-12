
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, Edit, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TransformerModal from "@/components/modals/TransformerModal";
import { useToast } from "@/hooks/use-toast";

const TransformerBasicInfo = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for transformers - updated to match reference image
  const transformers = [
    { id: 1, deviceNo: "70000016001", equipmentNo: "AN-472A", manufacturer: "ABB", capacity: 50.0, condition: "แก้ไข", status: "ลบ" },
    { id: 2, deviceNo: "70000016003", equipmentNo: "AN-K12A", manufacturer: "OSAKA", capacity: 50.0, condition: "แก้ไข", status: "ลบ" },
    { id: 3, deviceNo: "70000016201", equipmentNo: "AN-472B", manufacturer: "Siemens", capacity: 300.0, condition: "แก้ไข", status: "ลบ" },
    { id: 4, deviceNo: "70000016202", equipmentNo: "AN-473A", manufacturer: "Hitachi", capacity: 300.0, condition: "แก้ไข", status: "ลบ" },
    { id: 5, deviceNo: "70000016203", equipmentNo: "AN-474A", manufacturer: "Mitsubishi", capacity: 300.0, condition: "แก้ไข", status: "ลบ" },
    { id: 6, deviceNo: "70000016204", equipmentNo: "AN-475A", manufacturer: "OSAKA", capacity: 300.0, condition: "แก้ไข", status: "ลบ" },
  ];

  // Filter transformers based on search and region
  const filteredTransformers = transformers.filter(transformer => {
    const matchesSearch = searchQuery === "" || 
      transformer.deviceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transformer.equipmentNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transformer.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const handleAddTransformer = () => {
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEdit = (transformer) => {
    setIsEditing(true);
    setIsModalOpen(true);
    toast({
      title: "แก้ไขข้อมูล",
      description: `แก้ไขข้อมูลหม้อแปลง ${transformer.equipmentNo}`,
    });
  };

  const handleDelete = (transformer) => {
    toast({
      title: "ลบข้อมูล",
      description: `ลบข้อมูลหม้อแปลง ${transformer.equipmentNo}`,
      variant: "destructive"
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 bg-[#f0f4fa]">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ข้อมูลพื้นฐานหม้อแปลงไฟฟ้า</h1>
          <p className="text-lg text-gray-600">Transformer Basic Information</p>
        </div>

        {/* Search and Filter Section */}
        <Card className="shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6">
            <div className="flex justify-between items-center gap-4">
              {/* Left side - Search and Add button */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 min-w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="ค้นหาหม้อแปลง..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 focus-visible:ring-0"
                  />
                </div>
                
                <Button 
                  onClick={handleAddTransformer}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
                >
                  เพิ่มหม้อแปลง
                </Button>
              </div>

              {/* Right side - Region Filter */}
              <div className="flex items-center gap-2">
                <Label className="text-sm text-gray-600 whitespace-nowrap">เขต:</Label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-48 focus:ring-0 border border-gray-300">
                    <SelectValue placeholder="เลือกเขต" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="North">เหนือ</SelectItem>
                    <SelectItem value="Northeast">ตะวันออกเฉียงเหนือ</SelectItem>
                    <SelectItem value="Central">กลาง</SelectItem>
                    <SelectItem value="South">ใต้</SelectItem>
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
                    <TableHead className="text-center">Equipment No.</TableHead>
                    <TableHead className="text-center">หมายเลขอุปกรณ์</TableHead>
                    <TableHead className="text-center">บริษัทผู้ผลิต</TableHead>
                    <TableHead className="text-center">กำลังไฟฟ้า (MVA)</TableHead>
                    <TableHead className="text-center">แก้ไข</TableHead>
                    <TableHead className="text-center">ลบ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransformers.length > 0 ? (
                    filteredTransformers.map((transformer) => (
                      <TableRow key={transformer.id} className="hover:bg-blue-50/30">
                        <TableCell className="text-center">{transformer.deviceNo}</TableCell>
                        <TableCell className="text-center">{transformer.equipmentNo}</TableCell>
                        <TableCell className="text-center">{transformer.manufacturer}</TableCell>
                        <TableCell className="text-center">{transformer.capacity}</TableCell>
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
                            onClick={() => handleDelete(transformer)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
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

      {/* Modal */}
      <TransformerModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEditing={isEditing}
      />
    </DashboardLayout>
  );
};

export default TransformerBasicInfo;
