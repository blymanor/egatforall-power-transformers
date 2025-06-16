
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ArrowLeft, Eye, Plus, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import CustomPagination from "@/components/ui/custom-pagination";
import FactorScoreModal from "@/components/modals/FactorScoreModal";

interface FactorScoreData {
  id: number;
  no: number;
  group: string;
  name: string;
  hiFactor: number;
  meaning: string;
  lowerBound: number;
  upperBound: number;
  color: string;
}

const FactorScoreManagement = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "create" as "create" | "view" | "edit",
    data: null as FactorScoreData | null
  });

  // Mock data based on the image specifications
  const factorScoreData: FactorScoreData[] = [
    { id: 1, no: 1, group: "Active Part", name: "Core", hiFactor: 0, meaning: "Very Poor", lowerBound: 81.0, upperBound: 100.0, color: "00FF00" },
    { id: 2, no: 2, group: "Active Part", name: "Core", hiFactor: 1, meaning: "Poor", lowerBound: 61.0, upperBound: 80.0, color: "FFFF00" },
    { id: 3, no: 3, group: "Active Part", name: "Core", hiFactor: 2, meaning: "Need Caution", lowerBound: 41.0, upperBound: 60.0, color: "FF0000" },
    { id: 4, no: 4, group: "Active Part", name: "Core", hiFactor: 3, meaning: "Acceptable", lowerBound: 21.0, upperBound: 40.0, color: "1E5CFF" },
    { id: 5, no: 5, group: "Active Part", name: "Core", hiFactor: 4, meaning: "Good", lowerBound: 0.0, upperBound: 20.0, color: "FFFF00" },
    { id: 6, no: 6, group: "Active Part", name: "HV Winding", hiFactor: 0, meaning: "Very Poor", lowerBound: 61.0, upperBound: 100.0, color: "FF0000" },
    { id: 7, no: 7, group: "Active Part", name: "HV Winding", hiFactor: 1, meaning: "Poor", lowerBound: 51.0, upperBound: 60.0, color: "00FF00" },
    { id: 8, no: 8, group: "Active Part", name: "HV Winding", hiFactor: 2, meaning: "Need Caution", lowerBound: 36.0, upperBound: 50.0, color: "FFFF00" },
    { id: 9, no: 9, group: "Active Part", name: "HV Winding", hiFactor: 3, meaning: "Acceptable", lowerBound: 21.0, upperBound: 35.0, color: "FF0000" },
    { id: 10, no: 10, group: "Active Part", name: "HV Winding", hiFactor: 4, meaning: "Good", lowerBound: 0.0, upperBound: 20.0, color: "1E5CFF" },
    { id: 11, no: 11, group: "Active Part", name: "LV Winding", hiFactor: 0, meaning: "Very Poor", lowerBound: 61.0, upperBound: 100.0, color: "FFFF00" },
    { id: 12, no: 12, group: "Active Part", name: "LV Winding", hiFactor: 1, meaning: "Poor", lowerBound: 51.0, upperBound: 60.0, color: "FF0000" },
    { id: 13, no: 13, group: "Active Part", name: "LV Winding", hiFactor: 2, meaning: "Need Caution", lowerBound: 36.0, upperBound: 50.0, color: "FFFF00" },
    { id: 14, no: 14, group: "Active Part", name: "LV Winding", hiFactor: 3, meaning: "Acceptable", lowerBound: 21.0, upperBound: 35.0, color: "FF0000" },
    { id: 15, no: 15, group: "Active Part", name: "LV Winding", hiFactor: 4, meaning: "Good", lowerBound: 0.0, upperBound: 20.0, color: "00FF00" },
    { id: 16, no: 16, group: "Active Part", name: "TV Winding", hiFactor: 0, meaning: "Very Poor", lowerBound: 61.0, upperBound: 100.0, color: "FFFF00" },
    { id: 17, no: 17, group: "Active Part", name: "TV Winding", hiFactor: 1, meaning: "Poor", lowerBound: 51.0, upperBound: 60.0, color: "FF0000" }
  ];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(factorScoreData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = factorScoreData.slice(startIndex, endIndex);

  const openModal = (mode: "create" | "view" | "edit", data?: FactorScoreData) => {
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

  const handleView = (item: FactorScoreData) => {
    openModal("view", item);
  };

  const handleEdit = (item: FactorScoreData) => {
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

  const getColorDisplay = (colorCode: string) => {
    return (
      <span
        className="px-2 py-1 rounded text-black text-sm font-medium"
        style={{ backgroundColor: `#${colorCode}` }}
      >
        {colorCode}
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-4">
          <Button
            onClick={handleGoBack}
            variant="ghost"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 p-0 h-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            กลับไปหน้าจัดการข้อมูลการทดสอบ
          </Button>
        </div>

        <Card className="max-w-full overflow-hidden">
          <CardHeader className="bg-gray-50 flex flex-row items-center justify-between p-4">
            <CardTitle className="text-lg font-medium text-gray-800">
              คะแนน %Factor
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
                    <TableHead className="text-center w-20">ลำดับ</TableHead>
                    <TableHead className="text-center">Group</TableHead>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center w-32">HI Factor</TableHead>
                    <TableHead className="text-center">คำอธิบาย</TableHead>
                    <TableHead className="text-center w-32">Lower Bound</TableHead>
                    <TableHead className="text-center w-32">Upper Bound</TableHead>
                    <TableHead className="text-center w-32">สี</TableHead>
                    <TableHead className="text-center w-20">แก้ไข</TableHead>
                    <TableHead className="text-center w-20">แสดง</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map(item => (
                    <TableRow key={item.id} className="even:bg-gray-50">
                      <TableCell className="text-center font-medium">{item.no}</TableCell>
                      <TableCell className="text-center">{item.group}</TableCell>
                      <TableCell className="text-center">{item.name}</TableCell>
                      <TableCell className="text-center">{item.hiFactor}</TableCell>
                      <TableCell className="text-center">{item.meaning}</TableCell>
                      <TableCell className="text-center">{item.lowerBound}</TableCell>
                      <TableCell className="text-center">{item.upperBound}</TableCell>
                      <TableCell className="text-center">
                        {getColorDisplay(item.color)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          onClick={() => handleEdit(item)}
                          variant="ghost"
                          size="icon"
                          className="hover:bg-blue-100"
                        >
                          <Pencil className="h-4 w-4 text-blue-600" />
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
        
        <FactorScoreModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          mode={modalState.mode}
          data={modalState.data}
        />
      </div>
    </DashboardLayout>
  );
};

export default FactorScoreManagement;
