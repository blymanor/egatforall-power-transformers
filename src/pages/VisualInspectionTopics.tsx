import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ArrowLeft, Eye, Plus, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomPagination from "@/components/ui/custom-pagination";
import VisualInspectionModal from "@/components/modals/VisualInspectionModal";
interface VisualInspectionTopic {
  id: number;
  no: number;
  name: string;
  testType?: string;
}
const VisualInspectionTopics = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "create" as "create" | "view" | "edit",
    data: null as VisualInspectionTopic | null
  });

  // Mock data for visual inspection topics
  const visualInspectionTopics: VisualInspectionTopic[] = [{
    id: 1,
    no: 1,
    name: "CORROSION",
    testType: "General Condition"
  }, {
    id: 2,
    no: 2,
    name: "OIL FAIL",
    testType: "Main Tank"
  }, {
    id: 3,
    no: 3,
    name: "OIL LEVEL",
    testType: "Conservator Tank"
  }, {
    id: 4,
    no: 4,
    name: "JEL COLOR",
    testType: "General Condition"
  }, {
    id: 5,
    no: 5,
    name: "BREATHER",
    testType: "Conservator Tank"
  }, {
    id: 6,
    no: 6,
    name: "LOAD",
    testType: "General Condition"
  }, {
    id: 7,
    no: 7,
    name: "SOUND",
    testType: "General Condition"
  }, {
    id: 8,
    no: 8,
    name: "VIBRATION",
    testType: "General Condition"
  }, {
    id: 9,
    no: 9,
    name: "GROUND CONNECTOR",
    testType: "General Condition"
  }, {
    id: 10,
    no: 10,
    name: "FOUNDATION",
    testType: "General Condition"
  }, {
    id: 11,
    no: 11,
    name: "TANK CORROSION",
    testType: "Main Tank"
  }, {
    id: 12,
    no: 12,
    name: "PRESSURE",
    testType: "Main Tank"
  }];
  const itemsPerPage = 10;
  const totalPages = Math.ceil(visualInspectionTopics.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = visualInspectionTopics.slice(startIndex, endIndex);
  const openModal = (mode: "create" | "view" | "edit", data?: VisualInspectionTopic) => {
    setModalState({
      isOpen: true,
      mode,
      data: data || null
    });
  };
  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: "create",
      data: null
    });
  };
  const handleView = (item: VisualInspectionTopic) => {
    openModal("view", item);
  };
  const handleEdit = (item: VisualInspectionTopic) => {
    openModal("edit", item);
  };
  const handleAddNew = () => {
    openModal("create");
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleGoBack = () => {
    navigate("/management/test-data");
  };
  return <DashboardLayout>
      <div className="p-6">
        <div className="mb-4">
          <Button onClick={handleGoBack} variant="ghost" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 p-0 h-auto">
            <ArrowLeft className="h-4 w-4" />
            กลับไปหน้าจัดการข้อมูลการทดสอบ
          </Button>
        </div>

        <Card className="max-w-full overflow-hidden">
          <CardHeader className="bg-gray-50 flex flex-row items-center justify-between p-4">
            <CardTitle className="text-lg font-medium text-gray-800">
              หัวข้อ Visual Inspection
            </CardTitle>
            <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
              <Plus className="h-4 w-4" />
              เพิ่มหัวข้อใหม่
            </Button>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-center w-20">ลำดับ</TableHead>
                    <TableHead className="text-center">ชื่อหัวข้อ</TableHead>
                    
                    <TableHead className="text-center w-32">จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map(item => <TableRow key={item.id} className="even:bg-gray-50">
                      <TableCell className="text-center font-medium">{item.no}</TableCell>
                      <TableCell className="text-center">{item.name}</TableCell>
                      
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button onClick={() => handleView(item)} variant="ghost" size="icon" className="hover:bg-blue-100">
                            <Eye className="h-4 w-4 text-blue-600" />
                          </Button>
                          
                        </div>
                      </TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </div>
            
            <div className="p-4 flex justify-end">
              <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </CardContent>
        </Card>
        
        <VisualInspectionModal isOpen={modalState.isOpen} onClose={closeModal} mode={modalState.mode} data={modalState.data} />
      </div>
    </DashboardLayout>;
};
export default VisualInspectionTopics;