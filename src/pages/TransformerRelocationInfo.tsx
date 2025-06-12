import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Edit, ArrowRight } from "lucide-react";
import TransformerRelocateModal from "@/components/modals/TransformerRelocateModal";
import TransformerEditInfoModal from "@/components/modals/TransformerEditInfoModal";

const TransformerRelocationInfo = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [relocateModalOpen, setRelocateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransformer, setSelectedTransformer] = useState<any>(null);
  const itemsPerPage = 10;

  const [mockTransformers, setMockTransformers] = useState([
    {
      id: 1,
      equipmentNo: "7000016001",
      manufacturer: "Elektro Roxurg",
      status: "เป็นตัว Spare",
      name: "หม้อแปลง T1",
      location: "สถานี A",
      region: "เหนือ",
      capacity: "115/22 kV"
    },
    {
      id: 2,
      equipmentNo: "7000016003",
      manufacturer: "OSAKA",
      status: "เป็นตัว Spare",
      name: "หม้อแปลง T2",
      location: "สถานี B",
      region: "ตะวันออกเฉียงเหนือ",
      capacity: "230/115 kV"
    },
    {
      id: 3,
      equipmentNo: "7000016201",
      manufacturer: "Meiden",
      status: "เป็นตัว Spare",
      name: "หม้อแปลง T3",
      location: "สถานี C",
      region: "กลาง",
      capacity: "69/12 kV"
    },
    {
      id: 4,
      equipmentNo: "7000016202",
      manufacturer: "Mitsubishi",
      status: "เป็นตัว Spare",
      name: "หม้อแปลง T4",
      location: "สถานี D",
      region: "ใต้",
      capacity: "33/11 kV"
    },
    {
      id: 5,
      equipmentNo: "7000016203",
      manufacturer: "Elektro Roxurg",
      status: "เป็นตัว Spare",
      name: "หม้อแปลง T5",
      location: "สถานี E",
      region: "เหนือ",
      capacity: "115/22 kV"
    },
    {
      id: 6,
      equipmentNo: "7000016204",
      manufacturer: "OSAKA",
      status: "ถูกปลดออกจากระบบ",
      name: "หม้อแปลง T6",
      location: "สถานี F",
      region: "ตะวันออกเฉียงเหนือ",
      capacity: "230/115 kV"
    },
    {
      id: 7,
      equipmentNo: "7000016205",
      manufacturer: "Meiden",
      status: "อยู่ในระหว่างซ่อม",
      name: "หม้อแปลง T7",
      location: "สถานี G",
      region: "กลาง",
      capacity: "69/12 kV"
    },
    {
      id: 8,
      equipmentNo: "7000016206",
      manufacturer: "Mitsubishi",
      status: "เป็นตัว Spare",
      name: "หม้อแปลง T8",
      location: "สถานี H",
      region: "ใต้",
      capacity: "33/11 kV"
    },
    {
      id: 9,
      equipmentNo: "7000016207",
      manufacturer: "Elektro Roxurg",
      status: "ถูกปลดออกจากระบบ",
      name: "หม้อแปลง T9",
      location: "สถานี I",
      region: "เหนือ",
      capacity: "115/22 kV"
    },
    {
      id: 10,
      equipmentNo: "7000016208",
      manufacturer: "OSAKA",
      status: "อยู่ในระหว่างซ่อม",
      name: "หม้อแปลง T10",
      location: "สถานี J",
      region: "ตะวันออกเฉียงเหนือ",
      capacity: "230/115 kV"
    }
  ]);

  const filteredTransformers = mockTransformers.filter(transformer => {
    const matchesSearch = transformer.equipmentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transformer.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || transformer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTransformers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransformers = filteredTransformers.slice(startIndex, startIndex + itemsPerPage);

  const handleStatusChange = (transformerId: number, newStatus: string) => {
    setMockTransformers(prevTransformers =>
      prevTransformers.map(transformer =>
        transformer.id === transformerId
          ? { ...transformer, status: newStatus }
          : transformer
      )
    );
  };

  const handleEditClick = (transformer: any) => {
    setSelectedTransformer(transformer);
    setEditModalOpen(true);
  };

  const handleRelocateClick = (transformer: any) => {
    setSelectedTransformer(transformer);
    setRelocateModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 bg-[#f0f4fa]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">การย้ายหม้อแปลงไฟฟ้า</h1>
          <p className="text-sm text-gray-600">Transformer Relocation Management</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Input
                placeholder="ค้นหา Equipment No..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="สถานะทั้งหมด" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">สถานะทั้งหมด</SelectItem>
                  <SelectItem value="เป็นตัว Spare">เป็นตัว Spare</SelectItem>
                  <SelectItem value="ถูกปลดออกจากระบบ">ถูกปลดออกจากระบบ</SelectItem>
                  <SelectItem value="อยู่ในระหว่างซ่อม">อยู่ในระหว่างซ่อม</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Equipment No.</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">บริษัทผู้ผลิต</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">สถานะ</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">แก้ไขหม้อแปลง</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">ย้ายเข้าหม้อแปลง</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTransformers.map((transformer) => (
                  <tr key={transformer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 text-center">{transformer.equipmentNo}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-center">{transformer.manufacturer}</td>
                    <td className="px-6 py-4 text-sm text-center">
                      <Select 
                        value={transformer.status} 
                        onValueChange={(value) => handleStatusChange(transformer.id, value)}
                      >
                        <SelectTrigger className="w-full text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="เป็นตัว Spare">เป็นตัว Spare</SelectItem>
                          <SelectItem value="ถูกปลดออกจากระบบ">ถูกปลดออกจากระบบ</SelectItem>
                          <SelectItem value="อยู่ในระหว่างซ่อม">อยู่ในระหว่างซ่อม</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 h-8 w-8"
                        onClick={() => handleEditClick(transformer)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 h-8 w-8"
                        onClick={() => handleRelocateClick(transformer)}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 bg-white">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="text-sm px-2"
                >
                  ก่อนหน้า
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 ${
                          currentPage === pageNum 
                            ? "bg-blue-600 text-white hover:bg-blue-700" 
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="text-sm px-2"
                >
                  ถัดไป
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TransformerRelocateModal
        isOpen={relocateModalOpen}
        onClose={() => setRelocateModalOpen(false)}
        transformer={selectedTransformer}
      />

      <TransformerEditInfoModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        transformer={selectedTransformer}
      />
    </DashboardLayout>
  );
};

export default TransformerRelocationInfo;
