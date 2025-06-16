
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ArrowLeft, Eye, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import CustomPagination from "@/components/ui/custom-pagination";
import VisualInspectionCriteriaModal from "@/components/modals/VisualInspectionCriteriaModal";

interface VisualInspectionCriterion {
  id: number;
  no: number;
  visualInspection: string;
  description: string;
  color: string;
  score: number;
}

const VisualInspectionCriteria = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "create" as "create" | "view",
    data: null as VisualInspectionCriterion | null
  });

  // Mock data based on the image
  const criteriaData: VisualInspectionCriterion[] = [
    { id: 1, no: 1, visualInspection: "OIL PUMP", description: "ปกติ", color: "00FF00", score: 1 },
    { id: 2, no: 2, visualInspection: "OIL PUMP", description: "มีเสียงดัง", color: "FFFF00", score: 2 },
    { id: 3, no: 3, visualInspection: "OIL PUMP", description: "ไม่ทำงาน", color: "FF0000", score: 3 },
    { id: 4, no: 4, visualInspection: "ANIMAL", description: "ไม่พบร่องรอย", color: "00FF00", score: 1 },
    { id: 5, no: 5, visualInspection: "ANIMAL", description: "พบยากร่องรอยกัด", color: "FFFF00", score: 2 },
    { id: 6, no: 6, visualInspection: "ANIMAL", description: "พบร่องรอย", color: "FF0000", score: 3 },
    { id: 7, no: 7, visualInspection: "ANIMAL", description: "ไม่พบร่องรอย", color: "00FF00", score: 1 },
    { id: 8, no: 8, visualInspection: "ANIMAL", description: "พบยากร่องรอยกัด", color: "FFFF00", score: 2 },
    { id: 9, no: 9, visualInspection: "ANIMAL", description: "พบร่องรอย", color: "FF0000", score: 3 },
    { id: 10, no: 10, visualInspection: "ANIMAL", description: "ไม่พบร่องรอย", color: "00FF00", score: 1 },
    { id: 11, no: 11, visualInspection: "ANIMAL", description: "พบยากร่องรอยกัด", color: "FFFF00", score: 2 },
    { id: 12, no: 12, visualInspection: "ANIMAL", description: "พบร่องรอย", color: "FF0000", score: 3 },
    { id: 13, no: 13, visualInspection: "ANIMAL PROTECTION", description: "สภาพดี", color: "FFFF00", score: 1 },
    { id: 14, no: 14, visualInspection: "ANIMAL PROTECTION", description: "สภาพยาง", color: "FF0000", score: 2 },
    { id: 15, no: 15, visualInspection: "ANIMAL PROTECTION", description: "ใช้งานไม่ได้", color: "00FF00", score: 3 },
    { id: 16, no: 16, visualInspection: "BREATHER", description: "ปกติ", color: "FFFF00", score: 1 },
    { id: 17, no: 17, visualInspection: "BREATHER", description: "น้ำมันใส่อยู่กึ่งหนึ่ง", color: "FF0000", score: 2 }
  ];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(criteriaData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = criteriaData.slice(startIndex, endIndex);

  const openModal = (mode: "create" | "view", data?: VisualInspectionCriterion) => {
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

  const handleView = (item: VisualInspectionCriterion) => {
    openModal("view", item);
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
              เกณฑ์ Visual Inspection
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
                    <TableHead className="text-center">Visual Inspection</TableHead>
                    <TableHead className="text-center">คำอธิบาย</TableHead>
                    <TableHead className="text-center w-32">สี</TableHead>
                    <TableHead className="text-center w-20">คะแนน</TableHead>
                    <TableHead className="text-center w-20">แสดง</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map(item => (
                    <TableRow key={item.id} className="even:bg-gray-50">
                      <TableCell className="text-center font-medium">{item.no}</TableCell>
                      <TableCell className="text-center">{item.visualInspection}</TableCell>
                      <TableCell className="text-center">{item.description}</TableCell>
                      <TableCell className="text-center">
                        {getColorDisplay(item.color)}
                      </TableCell>
                      <TableCell className="text-center">{item.score}</TableCell>
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
        
        <VisualInspectionCriteriaModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          mode={modalState.mode}
          data={modalState.data}
        />
      </div>
    </DashboardLayout>
  );
};

export default VisualInspectionCriteria;
