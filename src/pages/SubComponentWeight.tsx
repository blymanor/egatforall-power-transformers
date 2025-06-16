
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Plus, Edit, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomPagination from "@/components/ui/custom-pagination";
import SubComponentWeightModal from "@/components/modals/SubComponentWeightModal";

interface SubComponentWeightData {
  id: number;
  no: number;
  performGroup: string;
  name: string;
  wf: number;
}

const SubComponentWeight = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "create" as "create" | "view" | "edit",
    data: null as SubComponentWeightData | null
  });

  // Mock data based on the image
  const subComponentWeightData: SubComponentWeightData[] = [
    { id: 1, no: 1, performGroup: "Active Part", name: "Core", wf: 12.7 },
    { id: 2, no: 2, performGroup: "Active Part", name: "HV Winding", wf: 36.3 },
    { id: 3, no: 3, performGroup: "Active Part", name: "LV Winding", wf: 34.6 },
    { id: 4, no: 4, performGroup: "Active Part", name: "TV Winding", wf: 16.4 },
    { id: 5, no: 5, performGroup: "Arrester", name: "H1", wf: 16.2 },
    { id: 6, no: 6, performGroup: "Arrester", name: "H2", wf: 16.5 },
    { id: 7, no: 7, performGroup: "Arrester", name: "H3", wf: 16.5 },
    { id: 8, no: 8, performGroup: "Arrester", name: "X1", wf: 10.9 },
    { id: 9, no: 9, performGroup: "Arrester", name: "X2", wf: 10.9 },
    { id: 10, no: 10, performGroup: "Arrester", name: "X3", wf: 10.5 },
    { id: 11, no: 11, performGroup: "Arrester", name: "Y1", wf: 6.3 },
    { id: 12, no: 12, performGroup: "Arrester", name: "Y2", wf: 6.1 },
    { id: 13, no: 13, performGroup: "Arrester", name: "Y3", wf: 6.1 },
    { id: 14, no: 14, performGroup: "Bushing", name: "H0", wf: 2.05 },
    { id: 15, no: 15, performGroup: "Bushing", name: "H1", wf: 15.4 },
    { id: 16, no: 16, performGroup: "Bushing", name: "H2", wf: 15.4 },
    { id: 17, no: 17, performGroup: "Bushing", name: "H3", wf: 15.4 },
  ];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(subComponentWeightData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = subComponentWeightData.slice(startIndex, endIndex);

  const openModal = (mode: "create" | "view" | "edit", data?: SubComponentWeightData) => {
    setModalState({ isOpen: true, mode, data: data || null });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, mode: "create", data: null });
  };

  const handleView = (item: SubComponentWeightData) => {
    openModal("view", item);
  };

  const handleEdit = (item: SubComponentWeightData) => {
    openModal("edit", item);
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
              Weight อุปกรณ์ย่อย
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
                    <TableHead className="text-center">Perform Group</TableHead>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Wf</TableHead>
                    <TableHead className="text-center w-24">แก้ไข</TableHead>
                    <TableHead className="text-center w-24">แสดง</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((item) => (
                    <TableRow key={item.id} className="even:bg-gray-50">
                      <TableCell className="text-center font-medium">{item.no}</TableCell>
                      <TableCell className="text-center">{item.performGroup}</TableCell>
                      <TableCell className="text-center">{item.name}</TableCell>
                      <TableCell className="text-center">{item.wf}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          onClick={() => handleEdit(item)}
                          variant="ghost"
                          size="icon"
                          className="hover:bg-blue-100"
                        >
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                      </TableCell>
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
            
            <div className="p-4 flex justify-center">
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </CardContent>
        </Card>
        
        <SubComponentWeightModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          mode={modalState.mode}
          data={modalState.data}
        />
      </div>
    </DashboardLayout>
  );
};

export default SubComponentWeight;
