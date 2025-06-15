import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

const BasicTransformerData = () => {
  const [activeTab, setActiveTab] = useState("stations");
  
  // Station modal states
  const [isStationModalOpen, setIsStationModalOpen] = useState(false);
  const [stationModalMode, setStationModalMode] = useState<'create' | 'edit'>('create');
  const [editingStation, setEditingStation] = useState<any | null>(null);
  const [stationShortName, setStationShortName] = useState('');
  const [stationFullName, setStationFullName] = useState('');
  const [stationZone, setStationZone] = useState('');
  const [stationKv, setStationKv] = useState('');

  // Usage type states
  const [newUsageType, setNewUsageType] = useState('');
  const [editingUsageType, setEditingUsageType] = useState<{ id: number; name: string } | null>(null);
  const [editUsageTypeValue, setEditUsageTypeValue] = useState('');

  // Transformer manufacturer states
  const [newTransformerManufacturer, setNewTransformerManufacturer] = useState('');
  const [newTransformerScore, setNewTransformerScore] = useState('');
  const [editingTransformerManufacturer, setEditingTransformerManufacturer] = useState<{ id: number; name: string; score: string } | null>(null);
  const [editTransformerManufacturerName, setEditTransformerManufacturerName] = useState('');
  const [editTransformerManufacturerScore, setEditTransformerManufacturerScore] = useState('');

  // Bushing manufacturer states
  const [newBushingManufacturer, setNewBushingManufacturer] = useState('');
  const [editingBushingManufacturer, setEditingBushingManufacturer] = useState<{ id: number; name: string } | null>(null);
  const [editBushingManufacturerValue, setEditBushingManufacturerValue] = useState('');

  // Arrester manufacturer states
  const [newArresterManufacturer, setNewArresterManufacturer] = useState('');
  const [editingArresterManufacturer, setEditingArresterManufacturer] = useState<{ id: number; name: string } | null>(null);
  const [editArresterManufacturerValue, setEditArresterManufacturerValue] = useState('');

  // OLTC manufacturer states
  const [newOLTCManufacturer, setNewOLTCManufacturer] = useState('');
  const [editingOLTCManufacturer, setEditingOLTCManufacturer] = useState<{ id: number; name: string } | null>(null);
  const [editOLTCManufacturerValue, setEditOLTCManufacturerValue] = useState('');

  // Mock data for stations
  const [stations, setStations] = useState([
    { id: 1, shortName: "SH1", fullName: "SATTHAHIP 1", zone: "อปก.", kv: "115" },
    { id: 2, shortName: "SH2", fullName: "SATTHAHIP 2", zone: "อปก.", kv: "115" },
    { id: 3, shortName: "SM", fullName: "SAMUT SONGKHRAM", zone: "อปก.", kv: "115" },
    { id: 4, shortName: "SN1", fullName: "SAMUT SAKHON 1", zone: "อปก.", kv: "115" },
    { id: 5, shortName: "SN2", fullName: "SAMUT SAKHON 2", zone: "อปก.", kv: "115" },
    { id: 6, shortName: "SN3", fullName: "SAMUT SAKHON 3", zone: "อปก.", kv: "115" },
    { id: 7, shortName: "SN4", fullName: "SAMUT SAKHON 4", zone: "อปก.", kv: "230" },
    { id: 8, shortName: "SR1", fullName: "SARABURI 1", zone: "อปก.", kv: "115" },
    { id: 9, shortName: "SR2", fullName: "SARABURI 2", zone: "อปก.", kv: "115" },
    { id: 10, shortName: "SR3", fullName: "SARABURI 3", zone: "อปก.", kv: "115" },
    { id: 11, shortName: "SR4", fullName: "SARABURI 4", zone: "อปก.", kv: "115" },
    { id: 12, shortName: "TR", fullName: "TRAT", zone: "อปก.", kv: "115" },
    { id: 13, shortName: "AN", fullName: "AMNAT CHAROEN", zone: "อปก.", kv: "115" }
  ]);

  // Mock data for usage types
  const [usageTypes, setUsageTypes] = useState([
    { id: 1, name: "หม้อแปลงหลัก" },
    { id: 2, name: "หม้อแปลงสำรอง" },
    { id: 3, name: "หม้อแปลงสำหรับการทดสอบ" }
  ]);

  // Mock data for transformer manufacturers
  const [transformerManufacturers, setTransformerManufacturers] = useState([
    { id: 1, name: "ASEA", score: "1" },
    { id: 2, name: "National", score: "1" },
    { id: 3, name: "ABB", score: "2" },
    { id: 4, name: "Siemens", score: "2" }
  ]);

  // Mock data for bushing manufacturers
  const [bushingManufacturers, setBushingManufacturers] = useState([
    { id: 1, name: "ABB" },
    { id: 2, name: "ASEA" },
    { id: 3, name: "Siemens" }
  ]);

  // Mock data for arrester manufacturers
  const [arresterManufacturers, setArresterManufacturers] = useState([
    { id: 1, name: "ABB" },
    { id: 2, name: "AEG" },
    { id: 3, name: "Siemens" }
  ]);

  // Mock data for OLTC manufacturers
  const [oltcManufacturers, setOltcManufacturers] = useState([
    { id: 1, name: "ABB" },
    { id: 2, name: "ALSTHOM" },
    { id: 3, name: "Maschinenfabrik Reinhausen" }
  ]);

  // Station modal handlers
  const handleCreateStation = () => {
    setEditingStation(null);
    setStationModalMode('create');
    setStationShortName('');
    setStationFullName('');
    setStationZone('');
    setStationKv('');
    setIsStationModalOpen(true);
  };

  const handleEditStation = (station: any) => {
    setEditingStation(station);
    setStationModalMode('edit');
    setStationShortName(station.shortName);
    setStationFullName(station.fullName);
    setStationZone(station.zone);
    setStationKv(station.kv);
    setIsStationModalOpen(true);
  };

  const handleDeleteStation = (id: number) => {
    setStations(prev => prev.filter(station => station.id !== id));
    toast.success("ลบข้อมูลสำเร็จ");
  };

  const handleSaveStation = () => {
    if (!stationShortName || !stationFullName || !stationZone || !stationKv) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const newStation = {
      id: stationModalMode === 'edit' ? editingStation!.id : Date.now(),
      shortName: stationShortName,
      fullName: stationFullName,
      zone: stationZone,
      kv: stationKv
    };

    if (stationModalMode === 'edit') {
      setStations(prev => prev.map(station => station.id === editingStation!.id ? newStation : station));
      toast.success("แก้ไขข้อมูลสำเร็จ");
    } else {
      setStations(prev => [...prev, newStation]);
      toast.success("เพิ่มข้อมูลสำเร็จ");
    }

    setIsStationModalOpen(false);
    setStationShortName('');
    setStationFullName('');
    setStationZone('');
    setStationKv('');
    setEditingStation(null);
  };

  // Usage type handlers
  const handleSaveUsageType = () => {
    if (!newUsageType.trim()) {
      toast.error("กรุณากรอกข้อมูลลักษณะการใช้งาน");
      return;
    }

    const newType = {
      id: Date.now(),
      name: newUsageType
    };

    setUsageTypes(prev => [...prev, newType]);
    setNewUsageType('');
    toast.success("เพิ่มข้อมูลสำเร็จ");
  };

  const handleEditUsageType = (usageType: { id: number; name: string }) => {
    setEditingUsageType(usageType);
    setEditUsageTypeValue(usageType.name);
  };

  const handleSaveEditUsageType = () => {
    if (!editUsageTypeValue.trim()) {
      toast.error("กรุณากรอกข้อมูลลักษณะการใช้งาน");
      return;
    }

    setUsageTypes(prev => prev.map(type => 
      type.id === editingUsageType!.id 
        ? { ...type, name: editUsageTypeValue }
        : type
    ));
    setEditingUsageType(null);
    setEditUsageTypeValue('');
    toast.success("แก้ไขข้อมูลสำเร็จ");
  };

  const handleDeleteUsageType = (id: number) => {
    setUsageTypes(prev => prev.filter(type => type.id !== id));
    toast.success("ลบข้อมูลสำเร็จ");
  };

  // Transformer manufacturer handlers
  const handleSaveTransformerManufacturer = () => {
    if (!newTransformerManufacturer.trim() || !newTransformerScore.trim()) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const newManufacturer = {
      id: Date.now(),
      name: newTransformerManufacturer,
      score: newTransformerScore
    };

    setTransformerManufacturers(prev => [...prev, newManufacturer]);
    setNewTransformerManufacturer('');
    setNewTransformerScore('');
    toast.success("เพิ่มข้อมูลสำเร็จ");
  };

  const handleEditTransformerManufacturer = (manufacturer: { id: number; name: string; score: string }) => {
    setEditingTransformerManufacturer(manufacturer);
    setEditTransformerManufacturerName(manufacturer.name);
    setEditTransformerManufacturerScore(manufacturer.score);
  };

  const handleSaveEditTransformerManufacturer = () => {
    if (!editTransformerManufacturerName.trim() || !editTransformerManufacturerScore.trim()) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setTransformerManufacturers(prev => prev.map(manufacturer => 
      manufacturer.id === editingTransformerManufacturer!.id 
        ? { ...manufacturer, name: editTransformerManufacturerName, score: editTransformerManufacturerScore }
        : manufacturer
    ));
    setEditingTransformerManufacturer(null);
    setEditTransformerManufacturerName('');
    setEditTransformerManufacturerScore('');
    toast.success("แก้ไขข้อมูลสำเร็จ");
  };

  const handleDeleteTransformerManufacturer = (id: number) => {
    setTransformerManufacturers(prev => prev.filter(manufacturer => manufacturer.id !== id));
    toast.success("ลบข้อมูลสำเร็จ");
  };

  // Bushing manufacturer handlers
  const handleSaveBushingManufacturer = () => {
    if (!newBushingManufacturer.trim()) {
      toast.error("กรุณากรอกข้อมูลบริษัทผู้ผลิต");
      return;
    }

    const newManufacturer = {
      id: Date.now(),
      name: newBushingManufacturer
    };

    setBushingManufacturers(prev => [...prev, newManufacturer]);
    setNewBushingManufacturer('');
    toast.success("เพิ่มข้อมูลสำเร็จ");
  };

  const handleEditBushingManufacturer = (manufacturer: { id: number; name: string }) => {
    setEditingBushingManufacturer(manufacturer);
    setEditBushingManufacturerValue(manufacturer.name);
  };

  const handleSaveEditBushingManufacturer = () => {
    if (!editBushingManufacturerValue.trim()) {
      toast.error("กรุณากรอกข้อมูลบริษัทผู้ผลิต");
      return;
    }

    setBushingManufacturers(prev => prev.map(manufacturer => 
      manufacturer.id === editingBushingManufacturer!.id 
        ? { ...manufacturer, name: editBushingManufacturerValue }
        : manufacturer
    ));
    setEditingBushingManufacturer(null);
    setEditBushingManufacturerValue('');
    toast.success("แก้ไขข้อมูลสำเร็จ");
  };

  const handleDeleteBushingManufacturer = (id: number) => {
    setBushingManufacturers(prev => prev.filter(manufacturer => manufacturer.id !== id));
    toast.success("ลบข้อมูลสำเร็จ");
  };

  // Arrester manufacturer handlers
  const handleSaveArresterManufacturer = () => {
    if (!newArresterManufacturer.trim()) {
      toast.error("กรุณากรอกข้อมูลบริษัทผู้ผลิต");
      return;
    }

    const newManufacturer = {
      id: Date.now(),
      name: newArresterManufacturer
    };

    setArresterManufacturers(prev => [...prev, newManufacturer]);
    setNewArresterManufacturer('');
    toast.success("เพิ่มข้อมูลสำเร็จ");
  };

  const handleEditArresterManufacturer = (manufacturer: { id: number; name: string }) => {
    setEditingArresterManufacturer(manufacturer);
    setEditArresterManufacturerValue(manufacturer.name);
  };

  const handleSaveEditArresterManufacturer = () => {
    if (!editArresterManufacturerValue.trim()) {
      toast.error("กรุณากรอกข้อมูลบริษัทผู้ผลิต");
      return;
    }

    setArresterManufacturers(prev => prev.map(manufacturer => 
      manufacturer.id === editingArresterManufacturer!.id 
        ? { ...manufacturer, name: editArresterManufacturerValue }
        : manufacturer
    ));
    setEditingArresterManufacturer(null);
    setEditArresterManufacturerValue('');
    toast.success("แก้ไขข้อมูลสำเร็จ");
  };

  const handleDeleteArresterManufacturer = (id: number) => {
    setArresterManufacturers(prev => prev.filter(manufacturer => manufacturer.id !== id));
    toast.success("ลบข้อมูลสำเร็จ");
  };

  // OLTC manufacturer handlers
  const handleSaveOLTCManufacturer = () => {
    if (!newOLTCManufacturer.trim()) {
      toast.error("กรุณากรอกข้อมูลบริษัทผู้ผลิต");
      return;
    }

    const newManufacturer = {
      id: Date.now(),
      name: newOLTCManufacturer
    };

    setOltcManufacturers(prev => [...prev, newManufacturer]);
    setNewOLTCManufacturer('');
    toast.success("เพิ่มข้อมูลสำเร็จ");
  };

  const handleEditOLTCManufacturer = (manufacturer: { id: number; name: string }) => {
    setEditingOLTCManufacturer(manufacturer);
    setEditOLTCManufacturerValue(manufacturer.name);
  };

  const handleSaveEditOLTCManufacturer = () => {
    if (!editOLTCManufacturerValue.trim()) {
      toast.error("กรุณากรอกข้อมูลบริษัทผู้ผลิต");
      return;
    }

    setOltcManufacturers(prev => prev.map(manufacturer => 
      manufacturer.id === editingOLTCManufacturer!.id 
        ? { ...manufacturer, name: editOLTCManufacturerValue }
        : manufacturer
    ));
    setEditingOLTCManufacturer(null);
    setEditOLTCManufacturerValue('');
    toast.success("แก้ไขข้อมูลสำเร็จ");
  };

  const handleDeleteOLTCManufacturer = (id: number) => {
    setOltcManufacturers(prev => prev.filter(manufacturer => manufacturer.id !== id));
    toast.success("ลบข้อมูลสำเร็จ");
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            กำหนดค่าข้อมูล
          </h1>
          <p className="text-gray-500">จัดการข้อมูลพื้นฐานของระบบ</p>
        </div>

        {/* Main Content */}
        <Card className="shadow-md border-none">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-blue-50 border-b border-blue-100 rounded-t-lg rounded-b-none h-12">
                <TabsTrigger 
                  value="stations" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-t-lg rounded-b-none h-10 font-medium"
                >
                  สถานีไฟฟ้า
                </TabsTrigger>
                <TabsTrigger 
                  value="usage" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-t-lg rounded-b-none h-10 font-medium"
                >
                  ลักษณะการใช้งานหม้อแปลง
                </TabsTrigger>
                <TabsTrigger 
                  value="manufacturer" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-t-lg rounded-b-none h-10 font-medium"
                >
                  บริษัทผู้ผลิตหม้อแปลง
                </TabsTrigger>
                <TabsTrigger 
                  value="bushing" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-t-lg rounded-b-none h-10 font-medium"
                >
                  บริษัทผู้ผลิต Bushing
                </TabsTrigger>
                <TabsTrigger 
                  value="arrester" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-t-lg rounded-b-none h-10 font-medium"
                >
                  บริษัทผู้ผลิต Arrester
                </TabsTrigger>
                <TabsTrigger 
                  value="oltc" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-t-lg rounded-b-none h-10 font-medium"
                >
                  บริษัทผู้ผลิต OLTC
                </TabsTrigger>
              </TabsList>

              {/* Stations Tab */}
              <TabsContent value="stations" className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-blue-700">สถานีไฟฟ้า</h2>
                    <Button onClick={handleCreateStation} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      เพิ่มรายการ
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold text-center">ชื่อย่อสถานี</TableHead>
                          <TableHead className="font-semibold text-center">ชื่อเต็มสถานี</TableHead>
                          <TableHead className="font-semibold text-center">เขต</TableHead>
                          <TableHead className="font-semibold text-center">Kv</TableHead>
                          <TableHead className="font-semibold text-center">แก้ไข</TableHead>
                          <TableHead className="font-semibold text-center">ลบ</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stations.slice(0, 10).map((station) => (
                          <TableRow key={station.id} className="hover:bg-gray-50">
                            <TableCell className="text-center font-medium">{station.shortName}</TableCell>
                            <TableCell className="text-center">{station.fullName}</TableCell>
                            <TableCell className="text-center">{station.zone}</TableCell>
                            <TableCell className="text-center">{station.kv}</TableCell>
                            <TableCell className="text-center">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditStation(station)}
                                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TableCell>
                            <TableCell className="text-center">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteStation(station.id)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-end">
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
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <span className="px-4 py-2">...</span>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">13</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </TabsContent>

              {/* Usage Types Tab */}
              <TabsContent value="usage" className="p-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-blue-700">ลักษณะการใช้งานหม้อแปลง</h2>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold text-center">ลำดับ</TableHead>
                          <TableHead className="font-semibold text-center">ลักษณะการใช้งานหม้อแปลง</TableHead>
                          <TableHead className="font-semibold text-center">แก้ไข</TableHead>
                          <TableHead className="font-semibold text-center">ลบ</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {usageTypes.map((usageType, index) => (
                          <TableRow key={usageType.id} className="hover:bg-gray-50">
                            <TableCell className="text-center font-medium">{index + 1}</TableCell>
                            <TableCell className="text-center">
                              {editingUsageType?.id === usageType.id ? (
                                <Input
                                  value={editUsageTypeValue}
                                  onChange={(e) => setEditUsageTypeValue(e.target.value)}
                                  className="w-full"
                                />
                              ) : (
                                usageType.name
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {editingUsageType?.id === usageType.id ? (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={handleSaveEditUsageType}
                                  className="text-green-600 border-green-200 hover:bg-green-50"
                                >
                                  บันทึก
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditUsageType(usageType)}
                                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteUsageType(usageType.id)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Add New Usage Type */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">เพิ่มลักษณะการใช้งานของหม้อแปลง</span>
                    <Input
                      placeholder="ระบุลักษณะการใช้งาน"
                      value={newUsageType}
                      onChange={(e) => setNewUsageType(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSaveUsageType}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      SAVE
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Transformer Manufacturer Tab */}
              <TabsContent value="manufacturer" className="p-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-blue-700">บริษัทผู้ผลิตหม้อแปลง</h2>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold text-center">ลำดับ</TableHead>
                          <TableHead className="font-semibold text-center">บริษัทผู้ผลิต</TableHead>
                          <TableHead className="font-semibold text-center">คะแนน</TableHead>
                          <TableHead className="font-semibold text-center">แก้ไข</TableHead>
                          <TableHead className="font-semibold text-center">ลบ</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transformerManufacturers.map((manufacturer, index) => (
                          <TableRow key={manufacturer.id} className="hover:bg-gray-50">
                            <TableCell className="text-center font-medium">{index + 1}</TableCell>
                            <TableCell className="text-center">
                              {editingTransformerManufacturer?.id === manufacturer.id ? (
                                <Input
                                  value={editTransformerManufacturerName}
                                  onChange={(e) => setEditTransformerManufacturerName(e.target.value)}
                                  className="w-full"
                                />
                              ) : (
                                manufacturer.name
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {editingTransformerManufacturer?.id === manufacturer.id ? (
                                <Input
                                  value={editTransformerManufacturerScore}
                                  onChange={(e) => setEditTransformerManufacturerScore(e.target.value)}
                                  className="w-full"
                                />
                              ) : (
                                manufacturer.score
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {editingTransformerManufacturer?.id === manufacturer.id ? (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={handleSaveEditTransformerManufacturer}
                                  className="text-green-600 border-green-200 hover:bg-green-50"
                                >
                                  บันทึก
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditTransformerManufacturer(manufacturer)}
                                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteTransformerManufacturer(manufacturer.id)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-end">
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
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <span className="px-4 py-2">...</span>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">13</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>

                  {/* Add New Transformer Manufacturer */}
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-700 w-40">เพิ่มบริษัทผู้ผลิตหม้อแปลง:</span>
                      <Input
                        placeholder="ระบุบริษัทผู้ผลิต"
                        value={newTransformerManufacturer}
                        onChange={(e) => setNewTransformerManufacturer(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-700 w-40">Score:</span>
                      <Input
                        placeholder="ระบุคะแนน"
                        value={newTransformerScore}
                        onChange={(e) => setNewTransformerScore(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleSaveTransformerManufacturer}
                        className="bg-blue-600 hover:bg-blue-700 ml-4"
                      >
                        SAVE
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Bushing Manufacturer Tab */}
              <TabsContent value="bushing" className="p-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-blue-700">บริษัทผู้ผลิต Bushing</h2>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold text-center">ลำดับ</TableHead>
                          <TableHead className="font-semibold text-center">บริษัทผู้ผลิต</TableHead>
                          <TableHead className="font-semibold text-center">แก้ไข</TableHead>
                          <TableHead className="font-semibold text-center">ลบ</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bushingManufacturers.map((manufacturer, index) => (
                          <TableRow key={manufacturer.id} className="hover:bg-gray-50">
                            <TableCell className="text-center font-medium">{index + 1}</TableCell>
                            <TableCell className="text-center">
                              {editingBushingManufacturer?.id === manufacturer.id ? (
                                <Input
                                  value={editBushingManufacturerValue}
                                  onChange={(e) => setEditBushingManufacturerValue(e.target.value)}
                                  className="w-full"
                                />
                              ) : (
                                manufacturer.name
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {editingBushingManufacturer?.id === manufacturer.id ? (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={handleSaveEditBushingManufacturer}
                                  className="text-green-600 border-green-200 hover:bg-green-50"
                                >
                                  บันทึก
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditBushingManufacturer(manufacturer)}
                                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteBushingManufacturer(manufacturer.id)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-end">
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
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <span className="px-4 py-2">...</span>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">13</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>

                  {/* Add New Bushing Manufacturer */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">เพิ่มบริษัทผู้ผลิต Bushing:</span>
                    <Input
                      placeholder="ระบุบริษัทผู้ผลิต"
                      value={newBushingManufacturer}
                      onChange={(e) => setNewBushingManufacturer(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSaveBushingManufacturer}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      SAVE
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Arrester Manufacturer Tab */}
              <TabsContent value="arrester" className="p-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-blue-700">บริษัทผู้ผลิต Arrester</h2>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold text-center">ลำดับ</TableHead>
                          <TableHead className="font-semibold text-center">บริษัทผู้ผลิต</TableHead>
                          <TableHead className="font-semibold text-center">แก้ไข</TableHead>
                          <TableHead className="font-semibold text-center">ลบ</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {arresterManufacturers.map((manufacturer, index) => (
                          <TableRow key={manufacturer.id} className="hover:bg-gray-50">
                            <TableCell className="text-center font-medium">{index + 1}</TableCell>
                            <TableCell className="text-center">
                              {editingArresterManufacturer?.id === manufacturer.id ? (
                                <Input
                                  value={editArresterManufacturerValue}
                                  onChange={(e) => setEditArresterManufacturerValue(e.target.value)}
                                  className="w-full"
                                />
                              ) : (
                                manufacturer.name
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {editingArresterManufacturer?.id === manufacturer.id ? (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={handleSaveEditArresterManufacturer}
                                  className="text-green-600 border-green-200 hover:bg-green-50"
                                >
                                  บันทึก
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditArresterManufacturer(manufacturer)}
                                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteArresterManufacturer(manufacturer.id)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-end">
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
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <span className="px-4 py-2">...</span>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">13</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>

                  {/* Add New Arrester Manufacturer */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">เพิ่มบริษัทผู้ผลิต Arrester:</span>
                    <Input
                      placeholder="ระบุบริษัทผู้ผลิต"
                      value={newArresterManufacturer}
                      onChange={(e) => setNewArresterManufacturer(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSaveArresterManufacturer}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      SAVE
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* OLTC Manufacturer Tab */}
              <TabsContent value="oltc" className="p-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-blue-700">บริษัทผู้ผลิต OLTC</h2>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold text-center">ลำดับ</TableHead>
                          <TableHead className="font-semibold text-center">บริษัทผู้ผลิต</TableHead>
                          <TableHead className="font-semibold text-center">แก้ไข</TableHead>
                          <TableHead className="font-semibold text-center">ลบ</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {oltcManufacturers.map((manufacturer, index) => (
                          <TableRow key={manufacturer.id} className="hover:bg-gray-50">
                            <TableCell className="text-center font-medium">{index + 1}</TableCell>
                            <TableCell className="text-center">
                              {editingOLTCManufacturer?.id === manufacturer.id ? (
                                <Input
                                  value={editOLTCManufacturerValue}
                                  onChange={(e) => setEditOLTCManufacturerValue(e.target.value)}
                                  className="w-full"
                                />
                              ) : (
                                manufacturer.name
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {editingOLTCManufacturer?.id === manufacturer.id ? (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={handleSaveEditOLTCManufacturer}
                                  className="text-green-600 border-green-200 hover:bg-green-50"
                                >
                                  บันทึก
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditOLTCManufacturer(manufacturer)}
                                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteOLTCManufacturer(manufacturer.id)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-end">
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
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <span className="px-4 py-2">...</span>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">13</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>

                  {/* Add New OLTC Manufacturer */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">เพิ่มบริษัทผู้ผลิต OLTC:</span>
                    <Input
                      placeholder="ระบุบริษัทผู้ผลิต"
                      value={newOLTCManufacturer}
                      onChange={(e) => setNewOLTCManufacturer(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSaveOLTCManufacturer}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      SAVE
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Station Modal */}
        <Dialog open={isStationModalOpen} onOpenChange={setIsStationModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">
                {stationModalMode === 'edit' ? 'แก้ไขสถานีไฟฟ้า' : 'เพิ่มสถานีไฟฟ้า'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <Label>ชื่อย่อสถานี:</Label>
                <Input
                  placeholder="เช่น SH1"
                  value={stationShortName}
                  onChange={(e) => setStationShortName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ชื่อเต็มสถานี:</Label>
                <Input
                  placeholder="เช่น SATTHAHIP 1"
                  value={stationFullName}
                  onChange={(e) => setStationFullName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>เขต:</Label>
                <Input
                  placeholder="เช่น อปก."
                  value={stationZone}
                  onChange={(e) => setStationZone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Kv:</Label>
                <Input
                  placeholder="เช่น 115"
                  value={stationKv}
                  onChange={(e) => setStationKv(e.target.value)}
                />
              </div>
              <div className="flex justify-center space-x-4 pt-4">
                <Button onClick={handleSaveStation} className="px-8 bg-blue-600 hover:bg-blue-700">
                  บันทึก
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default BasicTransformerData;
