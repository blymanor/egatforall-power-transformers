
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Plus, Edit, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomPagination from "@/components/ui/custom-pagination";
import TestScoreWeightModal from "@/components/modals/TestScoreWeightModal";

interface TestScoreWeightData {
  id: number;
  no: number;
  performGroup: string;
  subGroup: string;
  morePerform: string;
  evaluation: string;
  variable: string;
  variableMin: number;
  variableMax: number;
}

const TestScoreWeight = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "create" as "create" | "view" | "edit",
    data: null as TestScoreWeightData | null
  });

  // Mock data based on the image
  const testScoreWeightData: TestScoreWeightData[] = [
    {
      id: 1,
      no: 1,
      performGroup: "Active Part",
      subGroup: "Core",
      morePerform: "Core Insulation Resistance",
      evaluation: "Core",
      variable: "",
      variableMin: 0.0,
      variableMax: 0.0
    },
    {
      id: 2,
      no: 2,
      performGroup: "Active Part",
      subGroup: "HV Winding",
      morePerform: "Exciting Current",
      evaluation: "%Max. Idiff : 200V",
      variable: "I rated",
      variableMin: 0.0,
      variableMax: 50.0
    },
    {
      id: 3,
      no: 3,
      performGroup: "Active Part",
      subGroup: "HV Winding",
      morePerform: "Exciting Current",
      evaluation: "%Max. Idiff : 200V",
      variable: "I rated",
      variableMin: 50.01,
      variableMax: 10000.0
    },
    {
      id: 4,
      no: 4,
      performGroup: "Active Part",
      subGroup: "HV Winding",
      morePerform: "Exciting Current",
      evaluation: "%Max. Idiff : 10kV",
      variable: "I rated",
      variableMin: 0.0,
      variableMax: 50.0
    },
    {
      id: 5,
      no: 5,
      performGroup: "Active Part",
      subGroup: "HV Winding",
      morePerform: "Exciting Current",
      evaluation: "%Max. Idiff : 10kV",
      variable: "I rated",
      variableMin: 50.01,
      variableMax: 10000.0
    },
    {
      id: 6,
      no: 6,
      performGroup: "Active Part",
      subGroup: "HV Winding",
      morePerform: "1 Phase Leakage Impedance",
      evaluation: "%Max. Deviation : HV to LV",
      variable: "",
      variableMin: 0.0,
      variableMax: 0.0
    },
    {
      id: 7,
      no: 7,
      performGroup: "Active Part",
      subGroup: "HV Winding",
      morePerform: "1 Phase Leakage Impedance",
      evaluation: "%Max. Deviation : HV to TV",
      variable: "",
      variableMin: 0.0,
      variableMax: 0.0
    },
    {
      id: 8,
      no: 8,
      performGroup: "Active Part",
      subGroup: "HV Winding",
      morePerform: "3 Phase Equivalent Impedance",
      evaluation: "%Max. Deviation : HV to LV",
      variable: "",
      variableMin: 0.0,
      variableMax: 0.0
    },
    {
      id: 9,
      no: 9,
      performGroup: "Active Part",
      subGroup: "HV Winding",
      morePerform: "3 Phase Equivalent Impedance",
      evaluation: "%Max. Deviation : HV to TV",
      variable: "",
      variableMin: 0.0,
      variableMax: 0.0
    },
    {
      id: 10,
      no: 10,
      performGroup: "Active Part",
      subGroup: "HV Winding",
      morePerform: "Ratio",
      evaluation: "%Max. Error : HV to LV",
      variable: "",
      variableMin: 0.0,
      variableMax: 0.0
    }
  ];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(testScoreWeightData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = testScoreWeightData.slice(startIndex, endIndex);

  const openModal = (mode: "create" | "view" | "edit", data?: TestScoreWeightData) => {
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

  const handleView = (item: TestScoreWeightData) => {
    openModal("view", item);
  };

  const handleEdit = (item: TestScoreWeightData) => {
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
              Score และ Weight การทดสอบ
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
                    <TableHead className="text-center">Perform Group</TableHead>
                    <TableHead className="text-center">Sub Group</TableHead>
                    <TableHead className="text-center">More Perform</TableHead>
                    <TableHead className="text-center">Evaluation</TableHead>
                    <TableHead className="text-center">Variable</TableHead>
                    <TableHead className="text-center">Variable Min</TableHead>
                    <TableHead className="text-center">Variable Max</TableHead>
                    <TableHead className="text-center w-24">แก้ไข</TableHead>
                    <TableHead className="text-center w-24">แสดง</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((item) => (
                    <TableRow key={item.id} className="even:bg-gray-50">
                      <TableCell className="text-center font-medium">{item.no}</TableCell>
                      <TableCell className="text-center">{item.performGroup}</TableCell>
                      <TableCell className="text-center">{item.subGroup}</TableCell>
                      <TableCell className="text-center">{item.morePerform}</TableCell>
                      <TableCell className="text-center">{item.evaluation}</TableCell>
                      <TableCell className="text-center">{item.variable}</TableCell>
                      <TableCell className="text-center">{item.variableMin}</TableCell>
                      <TableCell className="text-center">{item.variableMax}</TableCell>
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
        
        <TestScoreWeightModal 
          isOpen={modalState.isOpen} 
          onClose={closeModal} 
          mode={modalState.mode} 
          data={modalState.data} 
        />
      </div>
    </DashboardLayout>
  );
};

export default TestScoreWeight;
