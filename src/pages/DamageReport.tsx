
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

const DamageReport = () => {
  const { toast } = useToast();
  const [region, setRegion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for damage reports
  const damageData = [
    { 
      id: 1, 
      equipmentNo: "Hitachi-Siemens", 
      status: "ต้นเก่า Spare", 
      manufacturer: "สถานีไฟฟ้า", 
    },
    { 
      id: 2, 
      equipmentNo: "ONAN", 
      status: "ต้นเก่า Spare", 
      manufacturer: "สถานีไฟฟ้า", 
    },
    { 
      id: 3, 
      equipmentNo: "Meiden", 
      status: "ต้นเก่า Spare", 
      manufacturer: "สถานีไฟฟ้า", 
    },
    { 
      id: 4, 
      equipmentNo: "Mitsubishi", 
      status: "ต้นเก่า Spare", 
      manufacturer: "สถานีไฟฟ้า", 
    },
    { 
      id: 5, 
      equipmentNo: "Hitachi-Siemens", 
      status: "ต้นเก่า Spare", 
      manufacturer: "สถานีไฟฟ้า", 
    },
    { 
      id: 6, 
      equipmentNo: "ONAN", 
      status: "ต้นเก่า Spare", 
      manufacturer: "สถานีไฟฟ้า", 
    },
    { 
      id: 7, 
      equipmentNo: "Meiden", 
      status: "ต้นเก่า Spare", 
      manufacturer: "สถานีไฟฟ้า", 
    },
    { 
      id: 8, 
      equipmentNo: "Mitsubishi", 
      status: "ต้นเก่า Spare", 
      manufacturer: "สถานีไฟฟ้า", 
    },
  ];

  const filteredData = damageData.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.equipmentNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRegion = region === "" || true; // In a real app, you would filter by region here
    
    return matchesSearch && matchesRegion;
  });

  const handleSearch = () => {
    toast({
      title: "กำลังค้นหา",
      description: `ค้นหาข้อมูลด้วยคำค้น: ${searchQuery}`,
    });
  };

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0442AF]">Power Transformers</h1>
          <p className="text-gray-500">ระบบหม้อแปลงไฟฟ้ากำลัง</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">รายงานข้อมูลความเสียหาย</h2>
          <p className="text-gray-600">แสดงข้อมูลความเสียหายของหม้อแปลงไฟฟ้า</p>
        </div>

        <Card className="bg-white shadow-md rounded-lg overflow-hidden border-0">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-end">
              <div className="w-full sm:w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เขต
                </label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="ทั้งหมด" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="ภาคกลาง">ภาคกลาง</SelectItem>
                    <SelectItem value="ภาคเหนือ">ภาคเหนือ</SelectItem>
                    <SelectItem value="ภาคตะวันออกเฉียงเหนือ">ภาคตะวันออกเฉียงเหนือ</SelectItem>
                    <SelectItem value="ภาคใต้">ภาคใต้</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-2/3 flex gap-2">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="ค้นหา..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Search className="w-4 h-4 mr-2" />
                  ค้นหา
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipment No.</TableHead>
                    <TableHead>ผู้ผลิต</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead className="text-center">จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.equipmentNo}</TableCell>
                      <TableCell>{item.manufacturer}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-gray-600 text-white text-xs rounded-full">
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="mx-1"
                          onClick={() => {
                            toast({
                              title: "กำลังเปิดข้อมูล",
                              description: `กำลังเปิดข้อมูลความเสียหาย ${item.equipmentNo}`,
                            });
                          }}
                        >
                          รายละเอียด
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                แสดง {filteredData.length} จาก {damageData.length} รายการ
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  ก่อนหน้า
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-50">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  ถัดไป
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DamageReport;
