
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Eye, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import CustomPagination from "@/components/ui/custom-pagination";
import VisualInspectionModal from "@/components/modals/VisualInspectionModal";

interface VisualInspectionItem {
  id: number;
  no: number;
  name: string;
  testType?: string;
}

const VisualInspectionManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "create" as "create" | "view" | "edit",
    data: null as VisualInspectionItem | null
  });

  // Mock data based on the image
  const visualInspectionItems: VisualInspectionItem[] = [
    { id: 1, no: 1, name: "CORROSION" },
    { id: 2, no: 2, name: "OIL FAIL" },
    { id: 3, no: 3, name: "OIL LEVEL" },
    { id: 4, no: 4, name: "JEL COLOR" },
    { id: 5, no: 5, name: "BREATHER" },
    { id: 6, no: 6, name: "LOAD" },
    { id: 7, no: 7, name: "SOUND" },
    { id: 8, no: 8, name: "VIBRATION" },
    { id: 9, no: 9, name: "GROUND CONNECTOR" },
    { id: 10, no: 10, name: "FOUNDATION" },
    { id: 11, no: 11, name: "CORROSION" },
    { id: 12, no: 12, name: "PRESSURE" },
  ];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(visualInspectionItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = visualInspectionItems.slice(startIndex, endIndex);

  const openModal = (mode: "create" | "view" | "edit", data?: VisualInspectionItem) => {
    setModalState({ isOpen: true, mode, data: data || null });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, mode: "create", data: null });
  };

  const handleView = (item: VisualInspectionItem) => {
    openModal("view", item);
  };

  const handleAddNew = () => {
    openModal("create");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <Card className="max-w-full overflow-hidden">
          <CardHeader className="bg-gray-50 flex flex-row items-center justify-between p-4">
            <CardTitle className="text-lg font-medium text-gray-800">
              หัวข้อ Visual Inspection
            </CardTitle>
            <Button 
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              เพิ่มรายการ
            </Button>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-center w-24">ลำดับ</TableHead>
                    <TableHead className="text-center">ชื่อ</TableHead>
                    <TableHead className="text-center w-24">แสดง</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((item) => (
                    <TableRow key={item.id} className="even:bg-gray-50">
                      <TableCell className="text-center font-medium">{item.no}</TableCell>
                      <TableCell className="text-center">{item.name}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          onClick={() => handleView(item)}
                          variant="ghost"
                          size="icon"
                          className="hover:bg-blue-100"
                        >
                          <Eye className="h-4 w-4 text-blue-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="p-4 flex justify-end">
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </CardContent>
        </Card>
        
        <VisualInspectionModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          mode={modalState.mode}
          data={modalState.data}
        />
      </div>
    </DashboardLayout>
  );
};

export default VisualInspectionManagement;
