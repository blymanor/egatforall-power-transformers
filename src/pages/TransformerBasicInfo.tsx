
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTabs, DialogTab } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TransformerBasicInfo = () => {
  const { toast } = useToast();
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTransformer, setCurrentTransformer] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("basic");

  // Mock data for transformers
  const transformerData = [
    { id: 1, name: "AN-472A", station: "สถานี 1", equipmentNo: "70000016001", manufacturer: "ABB", capacity: "50.0", primaryVoltage: "115", secondaryVoltage: "22", installDate: "2015-06-15", serialNo: "T-123456", location: "Indoor" },
    { id: 2, name: "AN-K12A", station: "สถานี 2", equipmentNo: "70000016003", manufacturer: "OSAKA", capacity: "50.0", primaryVoltage: "115", secondaryVoltage: "22", installDate: "2016-03-22", serialNo: "T-234567", location: "Outdoor" },
    { id: 3, name: "AN-472B", station: "สถานี 1", equipmentNo: "70000016201", manufacturer: "Siemens", capacity: "300.0", primaryVoltage: "115", secondaryVoltage: "22", installDate: "2018-09-10", serialNo: "T-345678", location: "Indoor" },
    { id: 4, name: "AN-473A", station: "สถานี 3", equipmentNo: "70000016202", manufacturer: "Hitachi", capacity: "300.0", primaryVoltage: "115", secondaryVoltage: "33", installDate: "2019-11-05", serialNo: "T-456789", location: "Outdoor" },
    { id: 5, name: "AN-474A", station: "สถานี 3", equipmentNo: "70000016203", manufacturer: "Mitsubishi", capacity: "300.0", primaryVoltage: "115", secondaryVoltage: "22", installDate: "2020-07-18", serialNo: "T-567890", location: "Indoor" },
    { id: 6, name: "AN-475A", station: "สถานี 2", equipmentNo: "70000016204", manufacturer: "OSAKA", capacity: "300.0", primaryVoltage: "115", secondaryVoltage: "22", installDate: "2021-02-28", serialNo: "T-678901", location: "Outdoor" },
    { id: 7, name: "AN-476A", station: "สถานี 4", equipmentNo: "70000016205", manufacturer: "ABB", capacity: "150.0", primaryVoltage: "115", secondaryVoltage: "33", installDate: "2017-05-14", serialNo: "T-789012", location: "Indoor" },
    { id: 8, name: "AN-477A", station: "สถานี 1", equipmentNo: "70000016206", manufacturer: "Siemens", capacity: "150.0", primaryVoltage: "115", secondaryVoltage: "22", installDate: "2016-08-20", serialNo: "T-890123", location: "Outdoor" },
  ];

  // Filter by region and search query
  const filteredData = transformerData.filter(item => {
    const matchesRegion = selectedRegion === "all" || item.station.includes(selectedRegion);
    const matchesSearch = searchQuery === "" || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.equipmentNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesRegion && matchesSearch;
  });

  // Pagination
  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentTransformer(null);
    setActiveTab("basic");
    setShowAddEditModal(true);
  };

  const handleEdit = (transformer) => {
    setIsEditing(true);
    setCurrentTransformer(transformer);
    setActiveTab("basic");
    setShowAddEditModal(true);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    toast({
      title: "ลบรายการสำเร็จ",
      description: "ข้อมูลหม้อแปลงไฟฟ้าถูกลบเรียบร้อยแล้ว",
    });
  };

  const handleSave = () => {
    toast({
      title: isEditing ? "บันทึกการแก้ไขสำเร็จ" : "เพิ่มรายการสำเร็จ",
      description: isEditing ? "แก้ไขข้อมูลหม้อแปลงไฟฟ้าเรียบร้อยแล้ว" : "เพิ่มข้อมูลหม้อแปลงไฟฟ้าเรียบร้อยแล้ว",
    });
    setShowAddEditModal(false);
  };

  return (
    <DashboardLayout>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0442AF]">ข้อมูลพื้นฐานหม้อแปลงไฟฟ้า</h1>
          <p className="text-gray-500">Transformer Basic Information</p>
        </div>
      </header>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <h2 className="text-xl font-bold">หม้อแปลงไฟฟ้า</h2>
                
                <div className="flex items-center gap-3">
                  <Label className="text-gray-700">เขต:</Label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="ทั้งหมด" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="สถานี 1">สถานี 1</SelectItem>
                      <SelectItem value="สถานี 2">สถานี 2</SelectItem>
                      <SelectItem value="สถานี 3">สถานี 3</SelectItem>
                      <SelectItem value="สถานี 4">สถานี 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="ค้นหาหม้อแปลง..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                + เพิ่มหม้อแปลงไฟฟ้า
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">หม้อแปลงไฟฟ้า</TableHead>
                    <TableHead className="text-center">Equipment No.</TableHead>
                    <TableHead className="text-center">บริษัทผู้ผลิต</TableHead>
                    <TableHead className="text-center">พิกัดกำลังไฟฟ้า (MVA)</TableHead>
                    <TableHead className="text-center">แก้ไข</TableHead>
                    <TableHead className="text-center">ลบ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.length > 0 ? (
                    currentData.map((item) => (
                      <TableRow key={item.id} className="hover:bg-blue-50/30">
                        <TableCell className="text-center">{item.name}</TableCell>
                        <TableCell className="text-center">{item.equipmentNo}</TableCell>
                        <TableCell className="text-center">{item.manufacturer}</TableCell>
                        <TableCell className="text-center">{item.capacity}</TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="ghost" 
                            className="text-blue-600 hover:text-blue-800" 
                            onClick={() => handleEdit(item)}
                          >
                            แก้ไข
                          </Button>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="ghost" 
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDelete(item.id)}
                          >
                            ลบ
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
                
                {totalPages > 3 && currentPage < totalPages - 1 && (
                  <>
                    {currentPage < totalPages - 2 && <span>...</span>}
                    <Button 
                      variant={currentPage === totalPages ? "default" : "outline"}
                      className={currentPage === totalPages ? "bg-blue-600 text-white" : ""}
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
                
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

      {/* Add/Edit Transformer Modal with Tabs */}
      <Dialog open={showAddEditModal} onOpenChange={setShowAddEditModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{isEditing ? "แก้ไขข้อมูลหม้อแปลงไฟฟ้า" : "เพิ่มข้อมูลหม้อแปลงไฟฟ้า"}</DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">ข้อมูลทั่วไป</TabsTrigger>
              <TabsTrigger value="accessories">Accessories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="equipment-no">Equipment No.</Label>
                    <Input 
                      id="equipment-no" 
                      defaultValue={isEditing ? currentTransformer?.equipmentNo : ""} 
                      placeholder="กรอกรหัสอุปกรณ์"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contract-no">สัญญาเลขที่</Label>
                    <Input 
                      id="contract-no" 
                      defaultValue={isEditing ? "12345678" : ""} 
                      placeholder="กรอกเลขที่สัญญา"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="station">สถานีไฟฟ้า</Label>
                    <Select defaultValue={isEditing ? currentTransformer?.station : ""}>
                      <SelectTrigger id="station">
                        <SelectValue placeholder="เลือกสถานีไฟฟ้า" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="สถานี 1">สถานีไฟฟ้า 1</SelectItem>
                        <SelectItem value="สถานี 2">สถานีไฟฟ้า 2</SelectItem>
                        <SelectItem value="สถานี 3">สถานีไฟฟ้า 3</SelectItem>
                        <SelectItem value="สถานี 4">สถานีไฟฟ้า 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="transformer-name">ชื่อหม้อแปลงไฟฟ้า</Label>
                    <Input 
                      id="transformer-name" 
                      defaultValue={isEditing ? currentTransformer?.name : ""} 
                      placeholder="กรอกชื่อหม้อแปลง"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="manufacturer">บริษัทผู้ผลิต</Label>
                    <Select defaultValue={isEditing ? currentTransformer?.manufacturer : ""}>
                      <SelectTrigger id="manufacturer">
                        <SelectValue placeholder="เลือกบริษัทผู้ผลิต" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ABB">ABB</SelectItem>
                        <SelectItem value="Siemens">Siemens</SelectItem>
                        <SelectItem value="Hitachi">Hitachi</SelectItem>
                        <SelectItem value="Mitsubishi">Mitsubishi</SelectItem>
                        <SelectItem value="OSAKA">OSAKA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="manufacturer-no">หมายเลขผู้ผลิต</Label>
                    <Input 
                      id="manufacturer-no" 
                      defaultValue={isEditing ? currentTransformer?.serialNo : ""} 
                      placeholder="กรอกหมายเลขผู้ผลิต"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phase-count">จำนวนเฟส</Label>
                    <Select defaultValue="3">
                      <SelectTrigger id="phase-count">
                        <SelectValue placeholder="เลือกจำนวนเฟส" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phase-position">ตำแหน่งเฟส</Label>
                    <Input 
                      id="phase-position" 
                      placeholder="กรอกตำแหน่งเฟส"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">พิกัดกำลังไฟฟ้าสูงสุด (MVA)</Label>
                    <Input 
                      id="capacity" 
                      type="number"
                      defaultValue={isEditing ? currentTransformer?.capacity : ""} 
                      placeholder="กรอกพิกัดกำลังไฟฟ้า"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primary-voltage">พิกัดแรงดันไฟฟ้า Primary, HV (kV)</Label>
                    <Input 
                      id="primary-voltage" 
                      type="number"
                      defaultValue={isEditing ? currentTransformer?.primaryVoltage : ""} 
                      placeholder="กรอกพิกัดแรงดันไฟฟ้า Primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondary-voltage">พิกัดแรงดันไฟฟ้า Secondary, LV (kV)</Label>
                    <Input 
                      id="secondary-voltage" 
                      type="number"
                      defaultValue={isEditing ? currentTransformer?.secondaryVoltage : ""} 
                      placeholder="กรอกพิกัดแรงดันไฟฟ้า Secondary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tertiary-voltage">พิกัดแรงดันไฟฟ้า Tertiary, TV (kV)</Label>
                    <Input 
                      id="tertiary-voltage" 
                      type="number"
                      placeholder="กรอกพิกัดแรงดันไฟฟ้า Tertiary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="install-date">วันที่นำเข้าใช้งาน</Label>
                    <Input 
                      id="install-date" 
                      type="date"
                      defaultValue={isEditing ? currentTransformer?.installDate : ""} 
                      placeholder="เลือกวันที่นำเข้าใช้งาน"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="winding-insulation">ชนิด Winding Insulation</Label>
                    <Select defaultValue="paper">
                      <SelectTrigger id="winding-insulation">
                        <SelectValue placeholder="เลือกชนิด Winding Insulation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paper">Paper</SelectItem>
                        <SelectItem value="nomex">Nomex</SelectItem>
                        <SelectItem value="other">อื่นๆ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="vector-group">Vector Group</Label>
                    <Input 
                      id="vector-group" 
                      placeholder="กรอก Vector Group"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="usage">ลักษณะการใช้งานหม้อแปลงไฟฟ้า</Label>
                    <Input 
                      id="usage" 
                      placeholder="กรอกลักษณะการใช้งาน"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="remark">รายละเอียดเพิ่มเติม (Remark)</Label>
                    <Input 
                      id="remark" 
                      placeholder="กรอกรายละเอียดเพิ่มเติม"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">ชื่อไฟล์รูปภาพที่ต้องการเก็บ</Label>
                    <Input 
                      id="image" 
                      type="file"
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="accessories" className="py-4">
              <div className="space-y-10">
                {/* Bushing Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold border-b pb-2">Bushing</h3>
                  
                  {/* HV Bushing */}
                  <div className="space-y-4">
                    <h4 className="text-md font-medium">HV</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="hv-bushing-manufacturer">Manufacturer</Label>
                        <Input id="hv-bushing-manufacturer" placeholder="กรอกชื่อผู้ผลิต" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="hv-bushing-type">Type</Label>
                        <Input id="hv-bushing-type" placeholder="กรอกประเภท" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="hv-bushing-year">ปีใน Nameplate</Label>
                        <Input id="hv-bushing-year" placeholder="กรอกปี" className="mt-1" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="hv-bushing-serial-h0">Serial No. H0</Label>
                        <Input id="hv-bushing-serial-h0" placeholder="กรอก Serial No." className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="hv-bushing-serial-h1">Serial No. H1</Label>
                        <Input id="hv-bushing-serial-h1" placeholder="กรอก Serial No." className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="hv-bushing-serial-h2">Serial No. H2</Label>
                        <Input id="hv-bushing-serial-h2" placeholder="กรอก Serial No." className="mt-1" />
                      </div>
                    </div>
                  </div>
                  
                  {/* LV Bushing */}
                  <div className="space-y-4">
                    <h4 className="text-md font-medium">LV</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="lv-bushing-manufacturer">Manufacturer</Label>
                        <Input id="lv-bushing-manufacturer" placeholder="กรอกชื่อผู้ผลิต" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lv-bushing-type">Type</Label>
                        <Input id="lv-bushing-type" placeholder="กรอกประเภท" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lv-bushing-year">ปีใน Nameplate</Label>
                        <Input id="lv-bushing-year" placeholder="กรอกปี" className="mt-1" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="lv-bushing-serial-x0">Serial No. X0</Label>
                        <Input id="lv-bushing-serial-x0" placeholder="กรอก Serial No." className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lv-bushing-serial-x1">Serial No. X1</Label>
                        <Input id="lv-bushing-serial-x1" placeholder="กรอก Serial No." className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lv-bushing-serial-x2">Serial No. X2</Label>
                        <Input id="lv-bushing-serial-x2" placeholder="กรอก Serial No." className="mt-1" />
                      </div>
                    </div>
                  </div>
                  
                  {/* TV Bushing */}
                  <div className="space-y-4">
                    <h4 className="text-md font-medium">TV</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="tv-bushing-manufacturer">Manufacturer</Label>
                        <Input id="tv-bushing-manufacturer" placeholder="กรอกชื่อผู้ผลิต" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="tv-bushing-type">Type</Label>
                        <Input id="tv-bushing-type" placeholder="กรอกประเภท" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="tv-bushing-year">ปีใน Nameplate</Label>
                        <Input id="tv-bushing-year" placeholder="กรอกปี" className="mt-1" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="tv-bushing-serial-y0">Serial No. Y0</Label>
                        <Input id="tv-bushing-serial-y0" placeholder="กรอก Serial No." className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="tv-bushing-serial-y1">Serial No. Y1</Label>
                        <Input id="tv-bushing-serial-y1" placeholder="กรอก Serial No." className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="tv-bushing-serial-y2">Serial No. Y2</Label>
                        <Input id="tv-bushing-serial-y2" placeholder="กรอก Serial No." className="mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Arrester Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold border-b pb-2">Arrester</h3>
                  
                  {/* HV Arrester */}
                  <div className="space-y-4">
                    <h4 className="text-md font-medium">HV</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="hv-arrester-manufacturer">Manufacturer</Label>
                        <Input id="hv-arrester-manufacturer" placeholder="กรอกชื่อผู้ผลิต" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="hv-arrester-type">Type</Label>
                        <Input id="hv-arrester-type" placeholder="กรอกประเภท" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="hv-arrester-year">ปีใน Nameplate</Label>
                        <Input id="hv-arrester-year" placeholder="กรอกปี" className="mt-1" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="hv-arrester-serial-h0">Serial No. H0</Label>
                        <Input id="hv-arrester-serial-h0" placeholder="กรอก Serial No." className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="hv-arrester-serial-h1">Serial No. H1</Label>
                        <Input id="hv-arrester-serial-h1" placeholder="กรอก Serial No." className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="hv-arrester-serial-h2">Serial No. H2</Label>
                        <Input id="hv-arrester-serial-h2" placeholder="กรอก Serial No." className="mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 mt-2">
                      <RadioGroup defaultValue="gap" className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="gap" id="hv-gap" />
                          <Label htmlFor="hv-gap">Gap</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="gapless" id="hv-gapless" />
                          <Label htmlFor="hv-gapless">Gapless</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  
                  {/* LV Arrester */}
                  <div className="space-y-4">
                    <h4 className="text-md font-medium">LV</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="lv-arrester-manufacturer">Manufacturer</Label>
                        <Input id="lv-arrester-manufacturer" placeholder="กรอกชื่อผู้ผลิต" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lv-arrester-type">Type</Label>
                        <Input id="lv-arrester-type" placeholder="กรอกประเภท" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lv-arrester-year">ปีใน Nameplate</Label>
                        <Input id="lv-arrester-year" placeholder="กรอกปี" className="mt-1" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="lv-arrester-serial-x0">Serial No. X0</Label>
                        <Input id="lv-arrester-serial-x0" placeholder="กรอก Serial No." className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lv-arrester-serial-x1">Serial No. X1</Label>
                        <Input id="lv-arrester-serial-x1" placeholder="กรอก Serial No." className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lv-arrester-serial-x2">Serial No. X2</Label>
                        <Input id="lv-arrester-serial-x2" placeholder="กรอก Serial No." className="mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 mt-2">
                      <RadioGroup defaultValue="gap" className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="gap" id="lv-gap" />
                          <Label htmlFor="lv-gap">Gap</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="gapless" id="lv-gapless" />
                          <Label htmlFor="lv-gapless">Gapless</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  
                  {/* TV Arrester */}
                  <div className="space-y-4">
                    <h4 className="text-md font-medium">TV</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="tv-arrester-manufacturer">Manufacturer</Label>
                        <Input id="tv-arrester-manufacturer" placeholder="กรอกชื่อผู้ผลิต" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="tv-arrester-type">Type</Label>
                        <Input id="tv-arrester-type" placeholder="กรอกประเภท" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="tv-arrester-year">ปีใน Nameplate</Label>
                        <Input id="tv-arrester-year" placeholder="กรอกปี" className="mt-1" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="tv-arrester-serial-y0">Serial No. Y0</Label>
                        <Input id="tv-arrester-serial-y0" placeholder="กรอก Serial No." className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="tv-arrester-serial-y1">Serial No. Y1</Label>
                        <Input id="tv-arrester-serial-y1" placeholder="กรอก Serial No." className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="tv-arrester-serial-y2">Serial No. Y2</Label>
                        <Input id="tv-arrester-serial-y2" placeholder="กรอก Serial No." className="mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 mt-2">
                      <RadioGroup defaultValue="gap" className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="gap" id="tv-gap" />
                          <Label htmlFor="tv-gap">Gap</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="gapless" id="tv-gapless" />
                          <Label htmlFor="tv-gapless">Gapless</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                
                {/* OLTC Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">OLTC</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="oltc-manufacturer">Manufacturer</Label>
                      <Input id="oltc-manufacturer" placeholder="กรอกชื่อผู้ผลิต" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="oltc-type">Type</Label>
                      <Input id="oltc-type" placeholder="กรอกประเภท" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="oltc-year">ปีใน Nameplate</Label>
                      <Input id="oltc-year" placeholder="กรอกปี" className="mt-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="oltc-serial-h0">Serial No. H0</Label>
                      <Input id="oltc-serial-h0" placeholder="กรอก Serial No." className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="oltc-serial-h1">Serial No. H1</Label>
                      <Input id="oltc-serial-h1" placeholder="กรอก Serial No." className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="oltc-serial-h2">Serial No. H2</Label>
                      <Input id="oltc-serial-h2" placeholder="กรอก Serial No." className="mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="sm:justify-end pt-2">
            <Button variant="outline" onClick={() => setShowAddEditModal(false)} className="mr-2">
              ยกเลิก
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              {isEditing ? "บันทึกการแก้ไข" : "เพิ่มหม้อแปลงไฟฟ้า"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default TransformerBasicInfo;
