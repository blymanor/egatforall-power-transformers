import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ChevronDown, Eye, Pencil, Search, Trash2, Shield, CloudLightning, Box, Droplet, Cpu, Thermometer, BarChart, Filter, Cable, Wrench, Workflow, Zap } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import GeneralConditionModal from "@/components/modals/GeneralConditionModal";
import BushingModal from "@/components/modals/BushingModal";
import LightningArresterModal from "@/components/modals/LightningArresterModal";
import ConservatorTankModal from "@/components/modals/ConservatorTankModal";
import MainTankModal from "@/components/modals/MainTankModal";
import HotLineOilFilterModal from "@/components/modals/HotLineOilFilterModal";

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
  
  // Modal states
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "add" as "add" | "view" | "edit",
    data: null as any
  });

  const categories = [
    { value: "general-condition", label: "List all General Condition", icon: "Shield" },
    { value: "bushing", label: "List all Bushing", icon: "CloudLightning" },
    { value: "lightning-arrester", label: "List all Lightning Arrester", icon: "Zap" },
    { value: "conservator-tank", label: "List all Conservator Tank", icon: "Box" },
    { value: "main-tank", label: "List all Main Tank", icon: "Droplet" },
    { value: "hot-line-oil-filter", label: "List all Hot Line Oil Filter", icon: "Filter" },
    { value: "radiator-cooling", label: "List all Radiator and Cooling System", icon: "Thermometer" },
    { value: "control-cabinet", label: "List all Transformer Control Cabinet", icon: "Cpu" },
    { value: "ngr", label: "List all NGR", icon: "Cable" },
    { value: "regulating-pt", label: "List all Regulating PT", icon: "Workflow" },
    { value: "oltc-compartment", label: "List all OLTC Compartment", icon: "Wrench" },
    { value: "oltc-control-cabinet", label: "List all OLTC Control Cabinet", icon: "BarChart" },
    { value: "thermo-scan", label: "List all Thermo Scan", icon: "Thermometer" }
  ];

  const getMockRecords = (category: string): InspectionRecord[] => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      transformerName: category.includes("oltc") ? `OLTC-${i+1}` : 
                      category === "bushing" ? `BSH-${i+1}` : 
                      category === "lightning-arrester" ? `LA-${i+1}` : `AN-KT1A`,
      egatSn: `${7000000000 + parseInt(category.substring(0, 3), 36) + i}`,
      testType: category.includes("cooling") ? "Monthly test" :
                category.includes("tank") ? "Quarterly test" : "Weekly test",
      inspectionDate: `${(i % 28) + 1}/${(i % 12) + 1}/2023`,
      operationId: category === "main-tank" ? `MT${i}00` : 
                  category === "ngr" ? `NGR${i}0` : `${i}${i}`,
      inspector: ["จุลศักดิ์", "สมชาย", "วิชัย", "นภดล", "ธีรศักดิ์"][i % 5]
    }));
  };

  const records = getMockRecords(selectedCategory);
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

  const openModal = (mode: "add" | "view" | "edit", data?: any) => {
    setModalState({ isOpen: true, mode, data });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, mode: "add", data: null });
  };

  const handleView = (id: number) => {
    const record = filteredRecords.find(r => r.id === id);
    openModal("view", record);
  };

  const handleEdit = (id: number) => {
    const record = filteredRecords.find(r => r.id === id);
    openModal("edit", record);
  };

  const handleDelete = (id: number) => {
    toast.info(`ลบข้อมูล ID: ${id}`, {
      description: "คุณต้องการลบข้อมูลนี้หรือไม่?",
    });
  };

  const handleCreate = () => {
    openModal("add");
  };

  const renderCategoryIcon = () => {
    const iconName = categories.find(c => c.value === selectedCategory)?.icon || "Shield";
    
    switch (iconName) {
      case "Shield": return <Shield className="h-5 w-5 text-blue-500" />;
      case "CloudLightning": return <CloudLightning className="h-5 w-5 text-blue-500" />;
      case "Zap": return <Zap className="h-5 w-5 text-blue-500" />;
      case "Box": return <Box className="h-5 w-5 text-blue-500" />;
      case "Droplet": return <Droplet className="h-5 w-5 text-blue-500" />;
      case "Filter": return <Filter className="h-5 w-5 text-blue-500" />;
      case "Thermometer": return <Thermometer className="h-5 w-5 text-blue-500" />;
      case "Cpu": return <Cpu className="h-5 w-5 text-blue-500" />;
      case "Cable": return <Cable className="h-5 w-5 text-blue-500" />;
      case "Workflow": return <Workflow className="h-5 w-5 text-blue-500" />;
      case "Wrench": return <Wrench className="h-5 w-5 text-blue-500" />;
      case "BarChart": return <BarChart className="h-5 w-5 text-blue-500" />;
      default: return <Shield className="h-5 w-5 text-blue-500" />;
    }
  };

  const renderModal = () => {
    const { isOpen, mode, data } = modalState;
    
    switch (selectedCategory) {
      case "general-condition":
        return <GeneralConditionModal isOpen={isOpen} onClose={closeModal} mode={mode} data={data} />;
      case "bushing":
        return <BushingModal isOpen={isOpen} onClose={closeModal} mode={mode} data={data} />;
      case "lightning-arrester":
        return <LightningArresterModal isOpen={isOpen} onClose={closeModal} mode={mode} data={data} />;
      case "conservator-tank":
        return <ConservatorTankModal isOpen={isOpen} onClose={closeModal} mode={mode} data={data} />;
      case "main-tank":
        return <MainTankModal isOpen={isOpen} onClose={closeModal} mode={mode} data={data} />;
      case "hot-line-oil-filter":
        return <HotLineOilFilterModal isOpen={isOpen} onClose={closeModal} mode={mode} data={data} />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <Card className="max-w-full overflow-hidden">
          <CardHeader className="bg-gray-50 flex flex-row items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {renderCategoryIcon()}
                <CardTitle className="text-lg font-medium">
                  {categories.find(c => c.value === selectedCategory)?.label}
                </CardTitle>
              </div>
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
                    <TableHead className="text-center">แสดง</TableHead>
                    <TableHead className="text-center">แก้ไข</TableHead>
                    <TableHead className="text-center">ลบ</TableHead>
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
              <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 text-white">
                เพิ่มข้อมูล
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
        
        {renderModal()}
      </div>
    </DashboardLayout>
  );
};

export default TransformerVisualInspection;
