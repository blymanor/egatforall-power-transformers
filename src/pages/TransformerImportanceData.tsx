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
    veryLow: { type: "input_with_prefix", prefix: "≤", value: "" },
    low: { type: "input_range", value1: "", value2: "" },
    moderate: { type: "input_range", value1: "", value2: "" },
    high: { type: "input_range", value1: "", value2: "" },
    veryHigh: { type: "input_with_prefix", prefix: "≥", value: "" },
    extremelyHigh: "-",
    score: "",
    weight: ""
  },
  {
    id: 2,
    no: 2,
    criteria: "Load Shedding",
    busVoltage: "-",
    veryLow: { type: "input", value: "" },
    low: { type: "input_range", value1: "", value2: "" },
    moderate: { type: "input_range", value1: "", value2: "" },
    high: { type: "input_range", value1: "", value2: "" },
    veryHigh: { type: "input_with_prefix", prefix: "≥", value: "" },
    extremelyHigh: { type: "input", value: "" },
    score: "",
    weight: ""
  },
  {
    id: 3,
    no: 3,
    criteria: "N-1 Criteria",
    busVoltage: "-",
    veryLow: { type: "input", value: "" },
    low: { type: "input_range", value1: "", value2: "" },
    moderate: { type: "input_range", value1: "", value2: "" },
    high: { type: "input_range", value1: "", value2: "" },
    veryHigh: { type: "input_with_prefix", prefix: "≥", value: "" },
    extremelyHigh: "-",
    score: "",
    weight: ""
  },
  {
    id: 4,
    no: 4,
    criteria: "System Stability",
    busVoltage: "-",
    veryLow: { type: "input", value: "" },
    low: { type: "input_range", value1: "", value2: "" },
    moderate: { type: "input_range", value1: "", value2: "" },
    high: { type: "input_range", value1: "", value2: "" },
    veryHigh: { type: "input_with_prefix", prefix: "≥", value: "" },
    extremelyHigh: "-",
    score: "",
    weight: ""
  },
  {
    id: 5,
    no: 5,
    criteria: "Application/Use",
    busVoltage: "-",
    veryLow: { type: "input", value: "" },
    low: { type: "input_range", value1: "", value2: "" },
    moderate: { type: "input_range", value1: "", value2: "" },
    high: { type: "input_range", value1: "", value2: "" },
    veryHigh: "-",
    extremelyHigh: "-",
    score: "",
    weight: ""
  },
  {
    id: 6,
    no: 6,
    criteria: "System Fault Level(MVA)",
    busVoltage: { type: "input_with_prefix", prefix: ">", value: "" },
    veryLow: { type: "input_with_prefix", prefix: "≤", value: "" },
    low: { type: "input_range", value1: "", value2: "" },
    moderate: { type: "input_range", value1: "", value2: "" },
    high: { type: "input_range", value1: "", value2: "" },
    veryHigh: { type: "input_with_prefix", prefix: "≥", value: "" },
    extremelyHigh: "-",
    score: "",
    weight: "",
    isSystemFault: true,
    subRow: {
      busVoltage: { type: "input_with_prefix", prefix: "≤", value: "" },
      veryLow: { type: "input_with_prefix", prefix: "≤", value: "" },
      low: { type: "input_range", value1: "", value2: "" },
      moderate: { type: "input_range", value1: "", value2: "" },
      high: { type: "input_range", value1: "", value2: "" },
      veryHigh: { type: "input_with_prefix", prefix: "≥", value: "" },
      extremelyHigh: "-"
    }
  },
  {
    id: 7,
    no: 7,
    criteria: "Probability of Force Outage per 5 years",
    busVoltage: "-",
    veryLow: { type: "input_with_prefix", prefix: "≤", value: "" },
    low: { type: "input_range", value1: "", value2: "" },
    moderate: { type: "input_range", value1: "", value2: "" },
    high: { type: "input_range", value1: "", value2: "" },
    veryHigh: { type: "input_with_prefix", prefix: "≥", value: "" },
    extremelyHigh: "-",
    score: "",
    weight: ""
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
    weight: ""
  },
  {
    id: 9,
    no: 9,
    criteria: "Social aspects",
    busVoltage: "-",
    veryLow: { type: "input", value: "" },
    low: { type: "input_range", value1: "", value2: "" },
    moderate: { type: "input_range", value1: "", value2: "" },
    high: { type: "input_range", value1: "", value2: "" },
    veryHigh: { type: "input_with_prefix", prefix: "≥", value: "" },
    extremelyHigh: "-",
    score: "",
    weight: ""
  },
  {
    id: 10,
    no: 10,
    criteria: "Public Image",
    busVoltage: "-",
    veryLow: { type: "input", value: "" },
    low: { type: "input_range", value1: "", value2: "" },
    moderate: { type: "input_range", value1: "", value2: "" },
    high: { type: "input_range", value1: "", value2: "" },
    veryHigh: { type: "input_with_prefix", prefix: "≥", value: "" },
    extremelyHigh: "-",
    score: "",
    weight: ""
  },
  {
    id: 11,
    no: 11,
    criteria: "Pollution",
    busVoltage: "-",
    veryLow: { type: "input", value: "" },
    low: { type: "input_range", value1: "", value2: "" },
    moderate: { type: "input_range", value1: "", value2: "" },
    high: { type: "input_range", value1: "", value2: "" },
    veryHigh: "-",
    extremelyHigh: "-",
    score: "",
    weight: ""
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
    weight: ""
  }
];

// Risk data based on the provided image - converted to input fields with placeholders
const riskData = [
  {
    id: 1,
    dStart: "",
    dEnd: "",
    risk: "",
    action: "",
    placeholders: {
      dStart: "0",
      dEnd: "14",
      risk: "Very Low",
      action: "Normal maintance"
    }
  },
  {
    id: 2,
    dStart: "",
    dEnd: "",
    risk: "",
    action: "",
    placeholders: {
      dStart: "15",
      dEnd: "28",
      risk: "Low",
      action: "Inspection"
    }
  },
  {
    id: 3,
    dStart: "",
    dEnd: "",
    risk: "",
    action: "",
    placeholders: {
      dStart: "29",
      dEnd: "56",
      risk: "Moderate",
      action: "Investigation"
    }
  },
  {
    id: 4,
    dStart: "",
    dEnd: "",
    risk: "",
    action: "",
    placeholders: {
      dStart: "57",
      dEnd: "105",
      risk: "High",
      action: "Relocate/Repair/Refurbish"
    }
  },
  {
    id: 5,
    dStart: "",
    dEnd: "",
    risk: "",
    action: "",
    placeholders: {
      dStart: "106",
      dEnd: "142",
      risk: "Very High",
      action: "Replace"
    }
  }
];

// X-Scale data
const xScaleData = [
  {
    id: 1,
    iiStart: "",
    iiEnd: "",
    importance: "",
    action: "",
    color: "",
    placeholders: {
      iiStart: "0",
      iiEnd: "40",
      importance: "Low",
      action: "Normal maintenance",
      color: "00FF00"
    }
  },
  {
    id: 2,
    iiStart: "",
    iiEnd: "",
    importance: "",
    action: "",
    color: "",
    placeholders: {
      iiStart: "41",
      iiEnd: "60",
      importance: "Moderate",
      action: "Need Careful Attention",
      color: "FFFF00"
    }
  },
  {
    id: 3,
    iiStart: "",
    iiEnd: "",
    importance: "",
    action: "",
    color: "",
    placeholders: {
      iiStart: "61",
      iiEnd: "100",
      importance: "High",
      action: "Reduce Importance Index",
      color: "FF0000"
    }
  }
];

// Y-Scale data
const yScaleData = [
  {
    id: 1,
    iiStart: "",
    iiEnd: "",
    importance: "",
    action: "",
    placeholders: {
      iiStart: "0",
      iiEnd: "15",
      importance: "Low",
      action: "Normal maintenance"
    }
  },
  {
    id: 2,
    iiStart: "",
    iiEnd: "",
    importance: "",
    action: "",
    placeholders: {
      iiStart: "16",
      iiEnd: "30",
      importance: "Moderate",
      action: "Need Careful Attention"
    }
  },
  {
    id: 3,
    iiStart: "",
    iiEnd: "",
    importance: "",
    action: "",
    placeholders: {
      iiStart: "31",
      iiEnd: "100",
      importance: "High",
      action: "Immediately Assess Risk"
    }
  }
];

const TransformerImportanceData = () => {
  const [activeTab, setActiveTab] = useState("criteria");
  const [tableData, setTableData] = useState(criteriaData);
  const [riskTableData, setRiskTableData] = useState(riskData);
  const [xScaleTableData, setXScaleTableData] = useState(xScaleData);
  const [yScaleTableData, setYScaleTableData] = useState(yScaleData);

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

  const handleCriteriaValueChange = (id: number, field: string, subField: string, value: string, isSubRow: boolean = false) => {
    setTableData(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item };
        
        if (isSubRow && updatedItem.subRow) {
          if (typeof updatedItem.subRow[field] === 'object' && updatedItem.subRow[field] !== null) {
            updatedItem.subRow[field] = { ...updatedItem.subRow[field], [subField]: value };
          }
        } else {
          if (typeof updatedItem[field] === 'object' && updatedItem[field] !== null) {
            updatedItem[field] = { ...updatedItem[field], [subField]: value };
          }
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const handleRiskDataChange = (id: number, field: string, value: string) => {
    setRiskTableData(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleXScaleDataChange = (id: number, field: string, value: string) => {
    setXScaleTableData(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleYScaleDataChange = (id: number, field: string, value: string) => {
    setYScaleTableData(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const renderCellContent = (item: any, field: string, isSubRow: boolean = false) => {
    const value = isSubRow ? item.subRow?.[field] : item[field];
    
    if (typeof value === 'object' && value !== null) {
      if (value.type === 'input_with_prefix') {
        return (
          <div className="flex items-center justify-center gap-1">
            <span className="text-xs">{value.prefix}</span>
            <Input
              type="text"
              value={value.value}
              onChange={(e) => handleCriteriaValueChange(item.id, field, 'value', e.target.value, isSubRow)}
              className="h-6 w-12 text-center text-xs p-1"
              placeholder=""
            />
          </div>
        );
      } else if (value.type === 'input_range') {
        return (
          <div className="flex flex-col items-center justify-center gap-1">
            <Input
              type="text"
              value={value.value1}
              onChange={(e) => handleCriteriaValueChange(item.id, field, 'value1', e.target.value, isSubRow)}
              className="h-6 w-16 text-center text-xs p-1"
              placeholder=""
            />
            <span className="text-xs">-</span>
            <Input
              type="text"
              value={value.value2}
              onChange={(e) => handleCriteriaValueChange(item.id, field, 'value2', e.target.value, isSubRow)}
              className="h-6 w-16 text-center text-xs p-1"
              placeholder=""
            />
          </div>
        );
      } else if (value.type === 'input') {
        return (
          <Input
            type="text"
            value={value.value}
            onChange={(e) => handleCriteriaValueChange(item.id, field, 'value', e.target.value, isSubRow)}
            className="h-6 w-16 text-center text-xs p-1"
            placeholder=""
          />
        );
      }
    }
    
    return <span className="text-xs">{value}</span>;
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
              <TabsList className="grid w-full grid-cols-4 mb-6 bg-transparent p-0 gap-0 h-auto">
                <TabsTrigger 
                  value="criteria" 
                  className="data-[state=active]:bg-blue-700 data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-700 bg-gray-200 text-gray-700 rounded-t-lg rounded-b-none border-r border-white/20 first:rounded-tl-lg last:rounded-tr-lg"
                >
                  Criteria
                </TabsTrigger>
                <TabsTrigger 
                  value="risk" 
                  className="data-[state=active]:bg-blue-700 data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-700 bg-gray-200 text-gray-700 rounded-t-lg rounded-b-none border-r border-white/20"
                >
                  Risk
                </TabsTrigger>
                <TabsTrigger 
                  value="x-scale" 
                  className="data-[state=active]:bg-blue-700 data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-700 bg-gray-200 text-gray-700 rounded-t-lg rounded-b-none border-r border-white/20"
                >
                  X-Scale
                </TabsTrigger>
                <TabsTrigger 
                  value="y-scale" 
                  className="data-[state=active]:bg-blue-700 data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-700 bg-gray-200 text-gray-700 rounded-t-lg rounded-b-none"
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
                          <React.Fragment key={item.id}>
                            <TableRow className="hover:bg-gray-50" style={{ height: item.isSystemFault ? '60px' : 'auto' }}>
                              <TableCell 
                                className="text-center font-medium border-r border-gray-200" 
                                rowSpan={item.isSystemFault ? 2 : 1}
                              >
                                {item.no}
                              </TableCell>
                              <TableCell 
                                className="text-left px-3 border-r border-gray-200" 
                                rowSpan={item.isSystemFault ? 2 : 1}
                              >
                                {item.criteria}
                              </TableCell>
                              <TableCell className="text-center border-r border-gray-200 py-2">
                                {renderCellContent(item, 'busVoltage')}
                              </TableCell>
                              <TableCell className="text-center text-xs px-2 border-r border-gray-200 py-2">
                                {renderCellContent(item, 'veryLow')}
                              </TableCell>
                              <TableCell className="text-center text-xs px-2 border-r border-gray-200 py-2">
                                {renderCellContent(item, 'low')}
                              </TableCell>
                              <TableCell className="text-center text-xs px-2 border-r border-gray-200 py-2">
                                {renderCellContent(item, 'moderate')}
                              </TableCell>
                              <TableCell className="text-center text-xs px-2 border-r border-gray-200 py-2">
                                {renderCellContent(item, 'high')}
                              </TableCell>
                              <TableCell className="text-center text-xs px-2 border-r border-gray-200 py-2">
                                {renderCellContent(item, 'veryHigh')}
                              </TableCell>
                              <TableCell className="text-center text-xs px-2 border-r border-gray-200 py-2">
                                {renderCellContent(item, 'extremelyHigh')}
                              </TableCell>
                              <TableCell 
                                className="border-r border-gray-200" 
                                rowSpan={item.isSystemFault ? 2 : 1}
                              >
                                <Input
                                  type="text"
                                  value={item.score}
                                  onChange={(e) => handleScoreChange(item.id, e.target.value)}
                                  className="h-8 text-center text-sm"
                                  placeholder=""
                                />
                              </TableCell>
                              <TableCell rowSpan={item.isSystemFault ? 2 : 1}>
                                <Input
                                  type="text"
                                  value={item.weight}
                                  onChange={(e) => handleWeightChange(item.id, e.target.value)}
                                  className="h-8 text-center text-sm"
                                />
                              </TableCell>
                            </TableRow>
                            {item.isSystemFault && item.subRow && (
                              <TableRow className="hover:bg-gray-50" style={{ height: '60px' }}>
                                <TableCell className="text-center border-r border-gray-200 py-2">
                                  {renderCellContent(item, 'busVoltage', true)}
                                </TableCell>
                                <TableCell className="text-center text-xs px-2 border-r border-gray-200 py-2">
                                  {renderCellContent(item, 'veryLow', true)}
                                </TableCell>
                                <TableCell className="text-center text-xs px-2 border-r border-gray-200 py-2">
                                  {renderCellContent(item, 'low', true)}
                                </TableCell>
                                <TableCell className="text-center text-xs px-2 border-r border-gray-200 py-2">
                                  {renderCellContent(item, 'moderate', true)}
                                </TableCell>
                                <TableCell className="text-center text-xs px-2 border-r border-gray-200 py-2">
                                  {renderCellContent(item, 'high', true)}
                                </TableCell>
                                <TableCell className="text-center text-xs px-2 border-r border-gray-200 py-2">
                                  {renderCellContent(item, 'veryHigh', true)}
                                </TableCell>
                                <TableCell className="text-center text-xs px-2 border-r border-gray-200 py-2">
                                  {renderCellContent(item, 'extremelyHigh', true)}
                                </TableCell>
                              </TableRow>
                            )}
                          </React.Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button 
                      onClick={handleSave} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="risk" className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">การคำนวณระยะ "d"</h3>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-center text-white bg-gray-700 w-32 border-r border-gray-500 hover:bg-gray-700">
                            d
                          </TableHead>
                          <TableHead className="text-center text-white bg-gray-700 w-40 border-r border-gray-500 hover:bg-gray-700">
                            Risk
                          </TableHead>
                          <TableHead className="text-center text-white bg-gray-700 hover:bg-gray-700">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="bg-white">
                        {riskTableData.map((item, index) => (
                          <TableRow key={item.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                            <TableCell className="text-center border-r border-gray-200 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <Input
                                  type="text"
                                  value={item.dStart}
                                  onChange={(e) => handleRiskDataChange(item.id, 'dStart', e.target.value)}
                                  className="h-8 w-16 text-center text-sm"
                                  placeholder={item.placeholders.dStart}
                                />
                                <span>-</span>
                                <Input
                                  type="text"
                                  value={item.dEnd}
                                  onChange={(e) => handleRiskDataChange(item.id, 'dEnd', e.target.value)}
                                  className="h-8 w-16 text-center text-sm"
                                  placeholder={item.placeholders.dEnd}
                                />
                              </div>
                            </TableCell>
                            <TableCell className="text-center border-r border-gray-200 py-4">
                              <Input
                                type="text"
                                value={item.risk}
                                onChange={(e) => handleRiskDataChange(item.id, 'risk', e.target.value)}
                                className="h-8 text-center text-sm"
                                placeholder={item.placeholders.risk}
                              />
                            </TableCell>
                            <TableCell className="text-center py-4">
                              <Input
                                type="text"
                                value={item.action}
                                onChange={(e) => handleRiskDataChange(item.id, 'action', e.target.value)}
                                className="h-8 text-center text-sm"
                                placeholder={item.placeholders.action}
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
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="x-scale" className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">ปรับค่าในแนวแกน X</h3>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-center text-white bg-gray-700 w-32 border-r border-gray-500 hover:bg-gray-700">
                            %II
                          </TableHead>
                          <TableHead className="text-center text-white bg-gray-700 w-40 border-r border-gray-500 hover:bg-gray-700">
                            Importance
                          </TableHead>
                          <TableHead className="text-center text-white bg-gray-700 w-40 border-r border-gray-500 hover:bg-gray-700">
                            Action
                          </TableHead>
                          <TableHead className="text-center text-white bg-gray-700 hover:bg-gray-700">
                            Color
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="bg-white">
                        {xScaleTableData.map((item, index) => (
                          <TableRow key={item.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                            <TableCell className="text-center border-r border-gray-200 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <Input
                                  type="text"
                                  value={item.iiStart}
                                  onChange={(e) => handleXScaleDataChange(item.id, 'iiStart', e.target.value)}
                                  className="h-8 w-16 text-center text-sm"
                                  placeholder={item.placeholders.iiStart}
                                />
                                <span>-</span>
                                <Input
                                  type="text"
                                  value={item.iiEnd}
                                  onChange={(e) => handleXScaleDataChange(item.id, 'iiEnd', e.target.value)}
                                  className="h-8 w-16 text-center text-sm"
                                  placeholder={item.placeholders.iiEnd}
                                />
                              </div>
                            </TableCell>
                            <TableCell className="text-center border-r border-gray-200 py-4">
                              <Input
                                type="text"
                                value={item.importance}
                                onChange={(e) => handleXScaleDataChange(item.id, 'importance', e.target.value)}
                                className="h-8 text-center text-sm"
                                placeholder={item.placeholders.importance}
                              />
                            </TableCell>
                            <TableCell className="text-center border-r border-gray-200 py-4">
                              <Input
                                type="text"
                                value={item.action}
                                onChange={(e) => handleXScaleDataChange(item.id, 'action', e.target.value)}
                                className="h-8 text-center text-sm"
                                placeholder={item.placeholders.action}
                              />
                            </TableCell>
                            <TableCell className="text-center py-4">
                              <div className="flex items-center justify-center gap-2">
                                <Input
                                  type="text"
                                  value={item.color}
                                  onChange={(e) => handleXScaleDataChange(item.id, 'color', e.target.value)}
                                  className="h-8 w-20 text-center text-sm"
                                  placeholder={item.placeholders.color}
                                />
                                <div 
                                  className="w-6 h-6 border border-gray-300 rounded"
                                  style={{ 
                                    backgroundColor: item.color.startsWith('#') ? item.color : (item.color ? `#${item.color}` : item.placeholders.color ? `#${item.placeholders.color}` : '#ffffff')
                                  }}
                                ></div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button 
                      onClick={handleSave} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="y-scale" className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">ปรับค่าในแนวแกน Y</h3>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-center text-white bg-gray-700 w-32 border-r border-gray-500 hover:bg-gray-700">
                            %II
                          </TableHead>
                          <TableHead className="text-center text-white bg-gray-700 w-40 border-r border-gray-500 hover:bg-gray-700">
                            Importance
                          </TableHead>
                          <TableHead className="text-center text-white bg-gray-700 hover:bg-gray-700">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="bg-white">
                        {yScaleTableData.map((item, index) => (
                          <TableRow key={item.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                            <TableCell className="text-center border-r border-gray-200 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <Input
                                  type="text"
                                  value={item.iiStart}
                                  onChange={(e) => handleYScaleDataChange(item.id, 'iiStart', e.target.value)}
                                  className="h-8 w-16 text-center text-sm"
                                  placeholder={item.placeholders.iiStart}
                                />
                                <span>-</span>
                                <Input
                                  type="text"
                                  value={item.iiEnd}
                                  onChange={(e) => handleYScaleDataChange(item.id, 'iiEnd', e.target.value)}
                                  className="h-8 w-16 text-center text-sm"
                                  placeholder={item.placeholders.iiEnd}
                                />
                              </div>
                            </TableCell>
                            <TableCell className="text-center border-r border-gray-200 py-4">
                              <Input
                                type="text"
                                value={item.importance}
                                onChange={(e) => handleYScaleDataChange(item.id, 'importance', e.target.value)}
                                className="h-8 text-center text-sm"
                                placeholder={item.placeholders.importance}
                              />
                            </TableCell>
                            <TableCell className="text-center py-4">
                              <Input
                                type="text"
                                value={item.action}
                                onChange={(e) => handleYScaleDataChange(item.id, 'action', e.target.value)}
                                className="h-8 text-center text-sm"
                                placeholder={item.placeholders.action}
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
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg"
                    >
                      Save
                    </Button>
                  </div>
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
