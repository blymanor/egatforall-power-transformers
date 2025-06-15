
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

// Mock data for the criteria table based on the reference image
const criteriaData = [
  {
    id: 1,
    no: 1,
    criteria: "Load Pattern(%LPF)",
    busVoltage: "-",
    veryLow: "≤ 20",
    low: "21 - 40", 
    moderate: "41 - 65",
    high: "66 - 85",
    veryHigh: "≥ 86",
    extremelyHigh: "-",
    score: "",
    weight: "2"
  },
  {
    id: 2,
    no: 2,
    criteria: "Load Shedding",
    busVoltage: "-",
    veryLow: "Step 1",
    low: "Step 1",
    moderate: "Step 1",
    high: "Step 1",
    veryHigh: "Step 1",
    extremelyHigh: "No shed or",
    score: "",
    weight: "3"
  },
  {
    id: 3,
    no: 3,
    criteria: "N-1 Criteria",
    busVoltage: "-",
    veryLow: "Yes",
    low: "-",
    moderate: "-",
    high: "-",
    veryHigh: "No",
    extremelyHigh: "-",
    score: "",
    weight: "7"
  },
  {
    id: 4,
    no: 4,
    criteria: "System Stability",
    busVoltage: "-",
    veryLow: "Loading 115",
    low: "Loading 115",
    moderate: "Loading 115",
    high: "Tie 230/115",
    veryHigh: "Tie 230/115",
    extremelyHigh: "-",
    score: "",
    weight: "3"
  },
  {
    id: 5,
    no: 5,
    criteria: "Application/Use",
    busVoltage: "-",
    veryLow: "Mobile",
    low: "Cold Standby",
    moderate: "Hot Standby",
    high: "In-Service",
    veryHigh: "-",
    extremelyHigh: "-",
    score: "",
    weight: "2"
  },
  {
    id: 6,
    no: 6,
    criteria: "System Fault Level(MVA)",
    busVoltage: "> 115",
    veryLow: "≤ 10000",
    low: "10000",
    moderate: "10000",
    high: "10000",
    veryHigh: "≤ 10000",
    extremelyHigh: "-",
    score: "",
    weight: "7"
  },
  {
    id: 7,
    no: 7,
    criteria: "Probability of Force Outage per 5 years",
    busVoltage: "-",
    veryLow: "≤ 0",
    low: "-",
    moderate: "1 - 2",
    high: "-",
    veryHigh: "≥ 3",
    extremelyHigh: "-",
    score: "",
    weight: "2"
  },
  {
    id: 8,
    no: 8,
    criteria: "Damage of property",
    busVoltage: "-",
    veryLow: "-",
    low: "-",
    moderate: "-",
    high: "-",
    veryHigh: "-",
    extremelyHigh: "-",
    score: "",
    weight: "0"
  },
  {
    id: 9,
    no: 9,
    criteria: "Social aspects",
    busVoltage: "-",
    veryLow: "อยุธยา",
    low: "-",
    moderate: "-",
    high: "-",
    veryHigh: "-",
    extremelyHigh: "-",
    score: "",
    weight: "0"
  },
  {
    id: 10,
    no: 10,
    criteria: "Public Image",
    busVoltage: "-",
    veryLow: "No",
    low: "-",
    moderate: "-",
    high: "-",
    veryHigh: "-",
    extremelyHigh: "-",
    score: "",
    weight: "0"
  },
  {
    id: 11,
    no: 11,
    criteria: "Pollution",
    busVoltage: "-",
    veryLow: "Light",
    low: "Medium",
    moderate: "High",
    high: "Very High",
    veryHigh: "-",
    extremelyHigh: "-",
    score: "",
    weight: "0"
  },
  {
    id: 12,
    no: 12,
    criteria: "Brand",
    busVoltage: "-",
    veryLow: "-",
    low: "-",
    moderate: "-",
    high: "-",
    veryHigh: "-",
    extremelyHigh: "-",
    score: "",
    weight: "0"
  }
];

const TransformerImportanceData = () => {
  const [activeTab, setActiveTab] = useState("criteria");
  const [tableData, setTableData] = useState(criteriaData);

  const handleScoreChange = (id: number, value: string) => {
    setTableData(prev => prev.map(item => 
      item.id === id ? { ...item, score: value } : item
    ));
  };

  const handleWeightChange = (id: number, value: string) => {
    setTableData(prev => prev.map(item => 
      item.id === id ? { ...item, weight: value } : item
    ));
  };

  const handleSave = () => {
    toast.success("บันทึกข้อมูลสำเร็จ");
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <Card className="max-w-7xl mx-auto">
          <CardHeader className="bg-blue-50 border-b">
            <CardTitle className="text-xl text-blue-700">
              กำหนดข้อมูลความสำคัญหม้อแปลง
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger 
                  value="criteria" 
                  className="bg-blue-600 text-white data-[state=active]:bg-blue-700"
                >
                  Criteria
                </TabsTrigger>
                <TabsTrigger 
                  value="risk" 
                  className="bg-gray-200 text-gray-700 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Risk
                </TabsTrigger>
                <TabsTrigger 
                  value="x-scale" 
                  className="bg-gray-200 text-gray-700 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  X-Scale
                </TabsTrigger>
                <TabsTrigger 
                  value="y-scale" 
                  className="bg-gray-200 text-gray-700 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Y-Scale
                </TabsTrigger>
              </TabsList>

              <TabsContent value="criteria" className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Score Color</h3>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead rowSpan={2} className="text-center text-white bg-gray-700 w-16 border-r border-gray-500 hover:bg-gray-700">
                            No.
                          </TableHead>
                          <TableHead rowSpan={2} className="text-center text-white bg-gray-700 w-40 border-r border-gray-500 hover:bg-gray-700">
                            Criteria
                          </TableHead>
                          <TableHead rowSpan={2} className="text-center text-white bg-gray-700 w-20 border-r border-gray-500 hover:bg-gray-700">
                            BUS Voltage [kV]
                          </TableHead>
                          <TableHead colSpan={6} className="text-center text-white bg-gray-700 border-r border-gray-500 hover:bg-gray-700">
                            Score
                          </TableHead>
                          <TableHead rowSpan={2} className="text-center text-white bg-gray-700 w-20 border-r border-gray-500 hover:bg-gray-700">
                            Score
                          </TableHead>
                          <TableHead rowSpan={2} className="text-center text-white bg-gray-700 w-20 hover:bg-gray-700">
                            Weight (1-5)
                          </TableHead>
                        </TableRow>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-center text-black bg-white text-xs border-r border-gray-500 px-2 hover:bg-white">
                            Very Low = 1
                          </TableHead>
                          <TableHead className="text-center text-black bg-white text-xs border-r border-gray-500 px-2 hover:bg-white">
                            Low = 2
                          </TableHead>
                          <TableHead className="text-center text-black bg-white text-xs border-r border-gray-500 px-2 hover:bg-white">
                            Moderate = 3
                          </TableHead>
                          <TableHead className="text-center text-black bg-white text-xs border-r border-gray-500 px-2 hover:bg-white">
                            High = 4
                          </TableHead>
                          <TableHead className="text-center text-black bg-white text-xs border-r border-gray-500 px-2 hover:bg-white">
                            Very High = 5
                          </TableHead>
                          <TableHead className="text-center text-black bg-white text-xs border-r border-gray-500 px-2 hover:bg-white">
                            Extremely High = 6
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="bg-white">
                        {tableData.map((item) => (
                          <TableRow key={item.id} className="hover:bg-gray-50">
                            <TableCell className="text-center font-medium border-r border-gray-200">
                              {item.no}
                            </TableCell>
                            <TableCell className="text-left px-3 border-r border-gray-200">
                              {item.criteria}
                            </TableCell>
                            <TableCell className="text-center border-r border-gray-200">
                              {item.busVoltage}
                            </TableCell>
                            <TableCell className="text-center text-xs px-2 border-r border-gray-200">
                              {item.veryLow}
                            </TableCell>
                            <TableCell className="text-center text-xs px-2 border-r border-gray-200">
                              {item.low}
                            </TableCell>
                            <TableCell className="text-center text-xs px-2 border-r border-gray-200">
                              {item.moderate}
                            </TableCell>
                            <TableCell className="text-center text-xs px-2 border-r border-gray-200">
                              {item.high}
                            </TableCell>
                            <TableCell className="text-center text-xs px-2 border-r border-gray-200">
                              {item.veryHigh}
                            </TableCell>
                            <TableCell className="text-center text-xs px-2 border-r border-gray-200">
                              {item.extremelyHigh}
                            </TableCell>
                            <TableCell className="border-r border-gray-200">
                              <Input
                                type="number"
                                min="1"
                                max="6"
                                value={item.score}
                                onChange={(e) => handleScoreChange(item.id, e.target.value)}
                                className="h-8 text-center text-sm"
                                placeholder=""
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                min="0"
                                max="10"
                                value={item.weight}
                                onChange={(e) => handleWeightChange(item.id, e.target.value)}
                                className="h-8 text-center text-sm"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button 
                      onClick={handleSave} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="risk" className="space-y-6">
                <div className="text-center py-20 text-gray-500">
                  Risk tab content will be implemented here
                </div>
              </TabsContent>

              <TabsContent value="x-scale" className="space-y-6">
                <div className="text-center py-20 text-gray-500">
                  X-Scale tab content will be implemented here
                </div>
              </TabsContent>

              <TabsContent value="y-scale" className="space-y-6">
                <div className="text-center py-20 text-gray-500">
                  Y-Scale tab content will be implemented here
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransformerImportanceData;
