import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const TransformerRelocationInfo = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for transformers
  const mockTransformers = [
    {
      id: 1,
      name: "หม้อแปลง T1",
      location: "สถานี A",
      region: "เหนือ",
      status: "operational",
      capacity: "115/22 kV",
      manufacturer: "ABB"
    },
    {
      id: 2,
      name: "หม้อแปลง T2",
      location: "สถานี B",
      region: "ตะวันออกเฉียงเหนือ",
      status: "maintenance",
      capacity: "230/115 kV",
      manufacturer: "Siemens"
    },
    {
      id: 3,
      name: "หม้อแปลง T3",
      location: "สถานี C",
      region: "กลาง",
      status: "damaged",
      capacity: "69/12 kV",
      manufacturer: "Mitsubishi"
    },
    {
      id: 4,
      name: "หม้อแปลง T4",
      location: "สถานี D",
      region: "ใต้",
      status: "operational",
      capacity: "33/11 kV",
      manufacturer: "Hitachi"
    },
    {
      id: 5,
      name: "หม้อแปลง T5",
      location: "สถานี E",
      region: "เหนือ",
      status: "maintenance",
      capacity: "115/22 kV",
      manufacturer: "ABB"
    },
    {
      id: 6,
      name: "หม้อแปลง T6",
      location: "สถานี F",
      region: "ตะวันออกเฉียงเหนือ",
      status: "operational",
      capacity: "230/115 kV",
      manufacturer: "Siemens"
    },
    {
      id: 7,
      name: "หม้อแปลง T7",
      location: "สถานี G",
      region: "กลาง",
      status: "damaged",
      capacity: "69/12 kV",
      manufacturer: "Mitsubishi"
    },
    {
      id: 8,
      name: "หม้อแปลง T8",
      location: "สถานี H",
      region: "ใต้",
      status: "operational",
      capacity: "33/11 kV",
      manufacturer: "Hitachi"
    },
    {
      id: 9,
      name: "หม้อแปลง T9",
      location: "สถานี I",
      region: "เหนือ",
      status: "maintenance",
      capacity: "115/22 kV",
      manufacturer: "ABB"
    },
    {
      id: 10,
      name: "หม้อแปลง T10",
      location: "สถานี J",
      region: "ตะวันออกเฉียงเหนือ",
      status: "operational",
      capacity: "230/115 kV",
      manufacturer: "Siemens"
    },
    {
      id: 11,
      name: "หม้อแปลง T11",
      location: "สถานี K",
      region: "กลาง",
      status: "damaged",
      capacity: "69/12 kV",
      manufacturer: "Mitsubishi"
    },
    {
      id: 12,
      name: "หม้อแปลง T12",
      location: "สถานี L",
      region: "ใต้",
      status: "operational",
      capacity: "33/11 kV",
      manufacturer: "Hitachi"
    }
  ];

  const filteredTransformers = mockTransformers.filter(transformer => {
    const matchesSearch = transformer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transformer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || transformer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTransformers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransformers = filteredTransformers.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-600 bg-green-100";
      case "maintenance":
        return "text-yellow-600 bg-yellow-100";
      case "damaged":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational":
        return "ปกติ";
      case "maintenance":
        return "ซ่อมบำรุง";
      case "damaged":
        return "ชำรุด";
      default:
        return status;
    }
  };

  const handleStatusChange = (transformerId: number, newStatus: string) => {
    // Update the status immediately (in real app, this would be an API call)
    console.log(`Updating transformer ${transformerId} status to ${newStatus}`);
    
    toast({
      title: "อัปเดตสถานะสำเร็จ",
      description: `สถานะของหม้อแปลงได้ถูกเปลี่ยนเป็น ${getStatusText(newStatus)}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 bg-[#f0f4fa] text-lg">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">การย้ายหม้อแปลงไฟฟ้า</h1>
          <p className="text-lg text-gray-600">Transformer Relocation Management</p>
        </div>

        {/* Search and Filter */}
        <Card className="shadow-md rounded-xl overflow-hidden border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b">
            <CardTitle className="text-2xl font-semibold text-gray-800">ค้นหาและกรองข้อมูล</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="search" className="text-lg">ค้นหาหม้อแปลง</Label>
                <Input
                  id="search"
                  placeholder="ป้อนชื่อหม้อแปลงหรือสถานที่"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-lg p-4 h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-lg">กรองตามสถานะ</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="text-lg p-4 h-12">
                    <SelectValue placeholder="เลือกสถานะ" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="operational">ปกติ</SelectItem>
                    <SelectItem value="maintenance">ซ่อมบำรุง</SelectItem>
                    <SelectItem value="damaged">ชำรุด</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transformer Table */}
        <Card className="shadow-md rounded-xl overflow-hidden border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b">
            <CardTitle className="text-2xl font-semibold text-gray-800">รายการหม้อแปลงไฟฟ้า</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ชื่อหม้อแปลง</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">สถานที่ตั้ง</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">เขต</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ระดับแรงดัน</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ผู้ผลิต</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">การดำเนินการ</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentTransformers.map((transformer) => (
                    <tr key={transformer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">{transformer.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">{transformer.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">{transformer.region}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">{transformer.capacity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900">{transformer.manufacturer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center">
                          <Select 
                            value={transformer.status} 
                            onValueChange={(value) => handleStatusChange(transformer.id, value)}
                          >
                            <SelectTrigger className="w-32 text-sm justify-center">
                              <SelectValue>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transformer.status)}`}>
                                  {getStatusText(transformer.status)}
                                </span>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem value="operational">ปกติ</SelectItem>
                              <SelectItem value="maintenance">ซ่อมบำรุง</SelectItem>
                              <SelectItem value="damaged">ชำรุด</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                        >
                          ย้าย
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  แสดง {startIndex + 1} ถึง {Math.min(startIndex + itemsPerPage, filteredTransformers.length)} จาก {filteredTransformers.length} รายการ
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="text-sm"
                  >
                    ก่อนหน้า
                  </Button>
                  <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded">
                    หน้า {currentPage} จาก {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="text-sm"
                  >
                    ถัดไป
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransformerRelocationInfo;
