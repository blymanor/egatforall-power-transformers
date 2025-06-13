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
import CoreInsulationResistanceModal from "@/components/modals/CoreInsulationResistanceModal";
import ExcitingCurrentMeasurementModal from "@/components/modals/ExcitingCurrentMeasurementModal";
import DCResistanceMeasurementModal from "@/components/modals/DCResistanceMeasurementModal";
import SinglePhaseImpedanceMeasurementModal from "@/components/modals/SinglePhaseImpedanceMeasurementModal";
import ThreePhaseImpedanceMeasurementModal from "@/components/modals/ThreePhaseImpedanceMeasurementModal";
import AutoTransformerInsulationMeasurementModal from "@/components/modals/AutoTransformerInsulationMeasurementModal";
import TwoWindingInsulationMeasurementModal from "@/components/modals/TwoWindingInsulationMeasurementModal";
import ThreeWindingInsulationMeasurementModal from "@/components/modals/ThreeWindingInsulationMeasurementModal";
import RatioMeasurementModal from "@/components/modals/RatioMeasurementModal";
import InsulatingOilModal from "@/components/modals/InsulatingOilModal";
import ArresterModal from "@/components/modals/ArresterModal";
import BushingModal from "@/components/modals/BushingModal";

interface TestRecord {
  id: number;
  transformerName: string;
  egatSn: string;
  testType: string;
  inspectionDate: string;
  operationId: string;
  inspector: string;
}

const ElectricalTestResults = () => {
  const [selectedCategory, setSelectedCategory] = useState("core-insulation-resistance");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Modal states
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "create" as "create" | "view" | "edit",
    data: null as any
  });

  const categories = [
    { value: "core-insulation-resistance", label: "List all Core Insulation Resistance", icon: "core-insulation-resistance" },
    { value: "exciting-current", label: "List all Exciting Current Measurement", icon: "exciting-current" },
    { value: "dc-resistance-measurement", label: "List all DC Resistance Measurement", icon: "dc-resistance-measurement" },
    { value: "single-phase-impedance-measurement", label: "List all Single Phase Impedance Measurement", icon: "single-phase-impedance-measurement" },
    { value: "three-phase-impedance-measurement", label: "List all Three Phase Impedance Measurement", icon: "three-phase-impedance-measurement" },
    { value: "auto-transformer-insulation-measurement", label: "List all Auto Transformer Insulation Measurement", icon: "auto-transformer-insulation-measurement" },
    { value: "two-winding-insulation-measurement", label: "List all Two Winding Insulation Measurement", icon: "two-winding-insulation-measurement" },
    { value: "three-winding-insulation-measurement", label: "List all Three Winding Insulation Measurement", icon: "three-winding-insulation-measurement" },
    { value: "ratio-measurement", label: "List all Ratio Measurement", icon: "ratio-measurement" },
    { value: "insulating-oil", label: "List all Insulating Oil", icon: "insulating-oil" },
    { value: "arrester", label: "List all Arrester", icon: "arrester" },
    { value: "bushing", label: "List all Bushing", icon: "bushing" }
  ];

  const getMockRecords = (category: string): TestRecord[] => {
    const categoryNameMap: {[key: string]: string} = {
      "core-insulation-resistance": "Core",
      "exciting-current": "Exciting",
      "dc-resistance-measurement": "DC",
      "single-phase-impedance-measurement": "1Ph",
      "three-phase-impedance-measurement": "3Ph",
      "auto-transformer-insulation-measurement": "AutoTR",
      "two-winding-insulation-measurement": "2Wind",
      "three-winding-insulation-measurement": "3Wind",
      "ratio-measurement": "Ratio",
      "insulating-oil": "Oil",
      "arrester": "Arrest",
      "bushing": "Bush"
    };
    
    const prefix = categoryNameMap[category] || "Test";
    
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      transformerName: `AN-KT2A`,
      egatSn: `700000${i}200`,
      testType: i % 2 === 0 ? "Commissioning" : (i % 3 === 0 ? "Special test" : "6 year test"),
      inspectionDate: `30/11/2022`,
      operationId: i % 2 === 0 ? (i % 3 === 0 ? "10123456" : (i === 0 ? "9999" : "11")) : (i % 4 === 0 ? "1111111" : (i % 5 === 0 ? "11111" : "111")),
      inspector: "จุมพล"
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

  const openModal = (mode: "create" | "view" | "edit", data?: any) => {
    setModalState({ isOpen: true, mode, data });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, mode: "create", data: null });
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
    openModal("create");
  };

  const renderCategoryIcon = () => {
    const iconName = categories.find(c => c.value === selectedCategory)?.icon || "core-insulation-resistance";
    
    return (
      <div className="h-5 w-5 text-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v8M12 22v-8M4.93 12H2m20 0h-2.93M7 12a5 5 0 1 0 10 0 5 5 0 1 0-10 0z" />
        </svg>
      </div>
    );
  };

  const renderModal = () => {
    const { isOpen, mode, data } = modalState;
    
    switch (selectedCategory) {
      case "core-insulation-resistance":
        return <CoreInsulationResistanceModal isOpen={isOpen} onClose={closeModal} mode={mode} data={data} />;
      case "exciting-current":
        return <ExcitingCurrentMeasurementModal isOpen={isOpen} onClose={closeModal} mode={mode} data={data} />;
      case "dc-resistance-measurement":
        return <DCResistanceMeasurementModal isOpen={isOpen} onClose={closeModal} mode={mode} data={data} />;
      case "single-phase-impedance-measurement":
        return <SinglePhaseImpedanceMeasurementModal isOpen={isOpen} onClose={closeModal} mode={mode} data={data} />;
      case "three-phase-impedance-measurement":
        return <ThreePhaseImpedanceMeasurementModal isOpen={isOpen} onClose={closeModal} mode={mode} data={data} />;
      case "auto-transformer-insulation-measurement":
        return <AutoTransformerInsulationMeasurementModal isOpen={isOpen} onClose={closeModal} mode={mode} data={data} />;
      case "two-winding-insulation-measurement":
        return <TwoWindingInsulationMeasurementModal isOpen={isOpen} onClose={closeModal} mode={mode} data={data} />;
      case "three-winding-insulation-measurement":
        return <ThreeWindingInsulationMeasurementModal isOpen={isOpen} onClose={closeModal} mode={mode} data={data} />;
      case "ratio-measurement":
        return <RatioMeasurementModal isOpen={isOpen} onClose={closeModal} mode={mode} data={data} />;
      case "insulating-oil":
        return <InsulatingOilModal isOpen={isOpen} onClose={closeModal} mode={mode} data={data} />;
      case "arrester":
        return <ArresterModal isOpen={isOpen} onClose={closeModal} mode={mode} data={data} />;
      case "bushing":
        return <BushingModal isOpen={isOpen} onClose={closeModal} mode={mode} data={data} />;
      default:
        return null;
    }
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
              <div className="flex items-center space-x-3 ml-4">
                <span className="text-sm font-medium text-gray-700">หัวข้อตารางที่ต้องการดู:</span>
                <Select
                  value={selectedCategory}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="w-full md:w-72">
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

export default ElectricalTestResults;
