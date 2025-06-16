
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Plus, Edit, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomPagination from "@/components/ui/custom-pagination";
import MainComponentWeightModal from "@/components/modals/MainComponentWeightModal";

interface MainComponentWeightData {
  id: number;
  no: number;
  activePart: number;
  bushing: number;
  arrester: number;
  oil: number;
  oltc: number;
}

const MainComponentWeight = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "create" as "create" | "view" | "edit",
    data: null as MainComponentWeightData | null
  });

  // Mock data based on the image
  const mainComponentWeightData: MainComponentWeightData[] = [
    {
      id: 1,
      no: 1,
      activePart: 34.9,
      bushing: 22.1,
      arrester: 6.1,
      oil: 9.6,
      oltc: 27.3
    },
    {
      id: 2,
      no: 2,
      activePart: 34.9,
      bushing: 22.1,
      arrester: 6.1,
      oil: 9.6,
      oltc: 27.3
    },
    {
      id: 3,
      no: 3,
      activePart: 34.9,
      bushing: 22.1,
      arrester: 6.1,
      oil: 9.6,
      oltc: 27.3
    },
    {
      id: 4,
      no: 4,
      activePart: 34.9,
      bushing: 22.1,
      arrester: 6.1,
      oil: 9.6,
      oltc: 27.3
    },
    {
      id: 5,
      no: 5,
      activePart: 34.9,
      bushing: 22.1,
      arrester: 6.1,
      oil: 9.6,
      oltc: 27.3
    },
    {
      id: 6,
      no: 6,
      activePart: 34.9,
      bushing: 22.1,
      arrester: 6.1,
      oil: 9.6,
      oltc: 27.3
    },
    {
      id: 7,
      no: 7,
      activePart: 34.9,
      bushing: 22.1,
      arrester: 6.1,
      oil: 9.6,
      oltc: 27.3
    },
    {
      id: 8,
      no: 8,
      activePart: 34.9,
      bushing: 22.1,
      arrester: 6.1,
      oil: 9.6,
      oltc: 27.3
    },
    {
      id: 9,
      no: 9,
      activePart: 34.9,
      bushing: 22.1,
      arrester: 6.1,
      oil: 9.6,
      oltc: 27.3
    },
    {
      id: 10,
      no: 10,
      activePart: 34.9,
      bushing: 22.1,
      arrester: 6.1,
      oil: 9.6,
      oltc: 27.3
    }
  ];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(mainComponentWeightData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = mainComponentWeightData.slice(startIndex, endIndex);

  const openModal = (mode: "create" | "view" | "edit", data?: MainComponentWeightData) => {
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

  const handleView = (item: MainComponentWeightData) => {
    openModal("view", item);
  };

  const handleEdit = (item: MainComponentWeightData) => {
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
              Weight อุปกรณ์หลัก
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
                    <TableHead className="text-center w-16">ID</TableHead>
                    <TableHead className="text-center">Active Part</TableHead>
                    <TableHead className="text-center">Bushing</TableHead>
                    <TableHead className="text-center">Arrester</TableHead>
                    <TableHead className="text-center">Oil</TableHead>
                    <TableHead className="text-center">OLTC</TableHead>
                    <TableHead className="text-center w-24">แก้ไข</TableHead>
                    <TableHead className="text-center w-24">แสดง</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((item) => (
                    <TableRow key={item.id} className="even:bg-gray-50">
                      <TableCell className="text-center font-medium">{item.no}</TableCell>
                      <TableCell className="text-center">{item.activePart}</TableCell>
                      <TableCell className="text-center">{item.bushing}</TableCell>
                      <TableCell className="text-center">{item.arrester}</TableCell>
                      <TableCell className="text-center">{item.oil}</TableCell>
                      <TableCell className="text-center">{item.oltc}</TableCell>
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
        
        <MainComponentWeightModal 
          isOpen={modalState.isOpen} 
          onClose={closeModal} 
          mode={modalState.mode} 
          data={modalState.data} 
        />
      </div>
    </DashboardLayout>
  );
};

export default MainComponentWeight;
