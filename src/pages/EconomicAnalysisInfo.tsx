import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const EconomicAnalysisInfo = () => {
  const [selectedTransformer, setSelectedTransformer] = useState<string>("");
  const [activeTab, setActiveTab] = useState("repair-data");
  
  // Mock transformer data
  const transformers = [
    { id: "1", name: "AN-KT1A", equipmentNo: "7000016200" },
    { id: "2", name: "BN-KT1B", equipmentNo: "7000016201" },
    { id: "3", name: "CN-KT1C", equipmentNo: "7000016202" },
  ];
  
  // Mock transformer details
  const transformerDetails = {
    equipmentNo: "7000016200",
    hvRating: "115.0",
    mvaRating: "50.0",
    firstEnergized: "12/02/2007",
    endOfLife: "49.67",
    expectedLifetime: "19.36",
    remainingLife: "30.32",
    overallCondition: "74.35",
  };

  // Form data for different options
  const [repairData, setRepairData] = useState({
    usageYears: "25",
    failureRiskCost: "0",
    maintenanceCost: "1500000",
    disposalCost: "0",
    winding: { new: true, repair: false, cost: "0" },
    bushing: { oip: true, rip: false, cost: "0" },
    arrester: { gap: true, gaplessSilicon: false, gaplessPorcelain: false, cost: "0" },
    oltc: { 
      oil1Chamber: true, 
      oil2Chambers: false, 
      oil3Chambers: false, 
      vacuum: false, 
      others: false,
      cost: "0" 
    },
    hotLineOilFilter: { chamber12: true, chambers3: false, cost: "0" },
    cooling: "0",
    overhaul: "0",
    overhaulRefurbish: "0",
    replacingRubberBag: "0",
    replacingBCT: "2508740",
    others: "2508740",
    totalCost: "2508740",
  });

  const [option1Data, setOption1Data] = useState({
    replacementCost: "7000000000",
    noLoadLoss: "85",
    loadLoss: "250",
    failureRiskCost: "0",
    maintenanceCost: "1500000",
    disposalCost: "0",
    winding: { new: true, repair: false, cost: "0" },
    bushing: { oip: true, rip: false, cost: "0" },
    arrester: { gap: true, gaplessSilicon: false, gaplessPorcelain: false, cost: "0" },
    oltc: { 
      oil1Chamber: true, 
      oil2Chambers: false, 
      oil3Chambers: false, 
      vacuum: false, 
      others: false,
      cost: "0" 
    },
    hotLineOilFilter: { chamber12: true, chambers3: false, cost: "0" },
    cooling: "0",
    overhaul: "0",
    overhaulRefurbish: "0",
    replacingRubberBag: "0",
    replacingBCT: "2508740",
    others: "2508740",
    totalCost: "2508740",
  });

  const [option2Data, setOption2Data] = useState({
    newTransformerCost: "25",
    ratedPower: "700000000",
    noLoadLoss: "85",
    loadLoss: "250",
    failureRiskCost: "0",
    maintenanceCost: "1500000",
    disposalCost: "0",
  });

  const [option3Data, setOption3Data] = useState({
    newTransformerCost: "25",
    ratedPower: "700000000",
    noLoadLoss: "85",
    loadLoss: "250",
    failureRiskCost: "0",
    maintenanceCost: "1500000",
    disposalCost: "0",
  });

  // Mock summary data
  const summaryData = [
    { optionNo: "1", option: "ซ่อม ณ ปัจจุบันและย้อมหม้อแปลงสำรองเพื่อใช้งานต่อ", npv: "58,342,931.62" },
    { optionNo: "2", option: "ซ่อม ณ ปัจจุบันและย้อมหม้อแปลงสำรองเพื่อใช้งานต่อ", npv: "58,342,931.62" },
    { optionNo: "3", option: "ซ่อม ณ ปัจจุบันและย้อมหม้อแปลงสำรองเพื่อใช้งานต่อ", npv: "58,342,931.62" },
    { optionNo: "4", option: "ซื้อหม้อแปลงมาใช้งานแทน", npv: "61,225,505.33" },
  ];

  const handleTransformerSelect = (value: string) => {
    setSelectedTransformer(value);
  };

  const handleSave = () => {
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: "ข้อมูลได้รับการบันทึกเรียบร้อยแล้ว",
    });
  };

  const handleClearData = () => {
    toast.success("ล้างข้อมูลสำเร็จ", {
      description: "ข้อมูลได้ถูกล้างออกเรียบร้อยแล้ว",
    });
  };

  const handleExportPDF = () => {
    toast.success("เริ่มดาวน์โหลด PDF", {
      description: "ระบบกำลังส่งออกรายงานเป็นไฟล์ PDF",
    });
  };

  // Render transformer info if one is selected
  const renderTransformerInfo = () => {
    if (!selectedTransformer) return null;
    
    return (
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm font-medium">Equipment No.:</p>
            <p className="text-sm">{transformerDetails.equipmentNo}</p>
          </div>
          <div>
            <p className="text-sm font-medium">HV Rating:</p>
            <p className="text-sm">{transformerDetails.hvRating} [kV]</p>
          </div>
          <div>
            <p className="text-sm font-medium">MVA Rating:</p>
            <p className="text-sm">{transformerDetails.mvaRating} [MVA]</p>
          </div>
          <div>
            <p className="text-sm font-medium">First Energized:</p>
            <p className="text-sm">{transformerDetails.firstEnergized}</p>
          </div>
          <div>
            <p className="text-sm font-medium">End of Life:</p>
            <p className="text-sm">{transformerDetails.endOfLife}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Expected Lifetime:</p>
            <p className="text-sm">{transformerDetails.expectedLifetime}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Remaining Life:</p>
            <p className="text-sm">{transformerDetails.remainingLife}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Overall Condition (%):</p>
            <p className="text-sm">{transformerDetails.overallCondition}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <Card className="max-w-6xl mx-auto">
          <CardHeader className="bg-gray-100">
            <CardTitle className="text-xl text-[#0442AF]">ข้อมูลที่จำเป็นในการพัฒนา</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="transformer-select">หม้อแปลงไฟฟ้า</Label>
                <Select value={selectedTransformer} onValueChange={handleTransformerSelect}>
                  <SelectTrigger className="w-full md:w-1/3 mt-1">
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent>
                    {transformers.map((transformer) => (
                      <SelectItem key={transformer.id} value={transformer.id}>
                        {transformer.name} - {transformer.equipmentNo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {renderTransformerInfo()}

              {selectedTransformer && (
                <Tabs 
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-5 mb-4 w-full">
                    <TabsTrigger value="repair-data" className="text-sm md:text-base">
                      ข้อมูลการซ่อม
                    </TabsTrigger>
                    <TabsTrigger value="option1" className="text-sm md:text-base">
                      Option 1
                    </TabsTrigger>
                    <TabsTrigger value="option2" className="text-sm md:text-base">
                      Option 2
                    </TabsTrigger>
                    <TabsTrigger value="option3" className="text-sm md:text-base">
                      Option 3
                    </TabsTrigger>
                    <TabsTrigger value="summary" className="text-sm md:text-base">
                      สรุปทางเลือกที่เหมาะสม
                    </TabsTrigger>
                  </TabsList>

                  {/* Tab Content for Repair Data */}
                  <TabsContent value="repair-data" className="p-4 border rounded-lg">
                    <h3 className="text-lg font-medium text-blue-600 mb-4">อายุใช้งานหม้อแปลงที่ซ่อม [ปี]</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="usageYears" className="flex justify-between">
                          <span>อายุใช้งานหม้อแปลงที่ซ่อม [ปี]</span>
                        </Label>
                        <Input
                          id="usageYears"
                          value={repairData.usageYears}
                          onChange={(e) => setRepairData({...repairData, usageYears: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="failureRiskCost" className="flex justify-between">
                          <span>ค่าเสียโอกาสในการจ่ายไฟเนื่องจาก PM [Bath/year]</span>
                        </Label>
                        <Input
                          id="failureRiskCost"
                          value={repairData.failureRiskCost}
                          onChange={(e) => setRepairData({...repairData, failureRiskCost: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maintenanceCost" className="flex justify-between">
                          <span>ค่าซ่อมบำรุงเฉลี่ยรายปี [Bath/year]</span>
                        </Label>
                        <Input
                          id="maintenanceCost"
                          value={repairData.maintenanceCost}
                          onChange={(e) => setRepairData({...repairData, maintenanceCost: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="disposalCost" className="flex justify-between">
                          <span>ค่าทำลายหรือรื้อถอน [Bath]</span>
                        </Label>
                        <Input
                          id="disposalCost"
                          value={repairData.disposalCost}
                          onChange={(e) => setRepairData({...repairData, disposalCost: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium text-blue-600 mb-4">รายการที่ต้องซ่อมหม้อแปลง (รวมค่าแรงและค่าของ)</h3>
                    
                    <div className="space-y-6 mb-4">
                      {/* Winding */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div>
                          <Label>Winding [Baht]</Label>
                        </div>
                        <div className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="winding-new" 
                              checked={repairData.winding.new} 
                              onCheckedChange={(checked) => 
                                setRepairData({...repairData, winding: {...repairData.winding, new: checked === true}})
                              } 
                            />
                            <Label htmlFor="winding-new">New</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="winding-repair" 
                              checked={repairData.winding.repair} 
                              onCheckedChange={(checked) => 
                                setRepairData({...repairData, winding: {...repairData.winding, repair: checked === true}})
                              } 
                            />
                            <Label htmlFor="winding-repair">Repair</Label>
                          </div>
                        </div>
                        <Input 
                          value={repairData.winding.cost}
                          onChange={(e) => setRepairData({
                            ...repairData, 
                            winding: {...repairData.winding, cost: e.target.value}
                          })}
                        />
                      </div>
                      
                      {/* Bushing */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div>
                          <Label>Bushing [Baht]</Label>
                        </div>
                        <div className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="bushing-oip" 
                              checked={repairData.bushing.oip} 
                              onCheckedChange={(checked) => 
                                setRepairData({...repairData, bushing: {...repairData.bushing, oip: checked === true}})
                              } 
                            />
                            <Label htmlFor="bushing-oip">OIP</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="bushing-rip" 
                              checked={repairData.bushing.rip} 
                              onCheckedChange={(checked) => 
                                setRepairData({...repairData, bushing: {...repairData.bushing, rip: checked === true}})
                              } 
                            />
                            <Label htmlFor="bushing-rip">RIP</Label>
                          </div>
                        </div>
                        <Input 
                          value={repairData.bushing.cost}
                          onChange={(e) => setRepairData({
                            ...repairData, 
                            bushing: {...repairData.bushing, cost: e.target.value}
                          })}
                        />
                      </div>
                      
                      {/* Arrester */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div>
                          <Label>Arrester [Baht]</Label>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="arrester-gap" 
                              checked={repairData.arrester.gap} 
                              onCheckedChange={(checked) => 
                                setRepairData({...repairData, arrester: {...repairData.arrester, gap: checked === true}})
                              } 
                            />
                            <Label htmlFor="arrester-gap">Gap</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="arrester-silicon" 
                              checked={repairData.arrester.gaplessSilicon} 
                              onCheckedChange={(checked) => 
                                setRepairData({...repairData, arrester: {...repairData.arrester, gaplessSilicon: checked === true}})
                              } 
                            />
                            <Label htmlFor="arrester-silicon">Gapless with silicon housing</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="arrester-porcelain" 
                              checked={repairData.arrester.gaplessPorcelain} 
                              onCheckedChange={(checked) => 
                                setRepairData({...repairData, arrester: {...repairData.arrester, gaplessPorcelain: checked === true}})
                              } 
                            />
                            <Label htmlFor="arrester-porcelain">Gapless with porcelain housing</Label>
                          </div>
                        </div>
                        <Input 
                          value={repairData.arrester.cost}
                          onChange={(e) => setRepairData({
                            ...repairData, 
                            arrester: {...repairData.arrester, cost: e.target.value}
                          })}
                        />
                      </div>
                      
                      {/* OLTC */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div>
                          <Label>OLTC [Baht]</Label>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="oltc-oil1" 
                              checked={repairData.oltc.oil1Chamber} 
                              onCheckedChange={(checked) => 
                                setRepairData({...repairData, oltc: {...repairData.oltc, oil1Chamber: checked === true}})
                              } 
                            />
                            <Label htmlFor="oltc-oil1">Oil 1 Chamber</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="oltc-oil2" 
                              checked={repairData.oltc.oil2Chambers} 
                              onCheckedChange={(checked) => 
                                setRepairData({...repairData, oltc: {...repairData.oltc, oil2Chambers: checked === true}})
                              } 
                            />
                            <Label htmlFor="oltc-oil2">Oil 2 Chambers</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="oltc-oil3" 
                              checked={repairData.oltc.oil3Chambers} 
                              onCheckedChange={(checked) => 
                                setRepairData({...repairData, oltc: {...repairData.oltc, oil3Chambers: checked === true}})
                              } 
                            />
                            <Label htmlFor="oltc-oil3">Oil 3 Chambers</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="oltc-vacuum" 
                              checked={repairData.oltc.vacuum} 
                              onCheckedChange={(checked) => 
                                setRepairData({...repairData, oltc: {...repairData.oltc, vacuum: checked === true}})
                              } 
                            />
                            <Label htmlFor="oltc-vacuum">Vacuum</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="oltc-others" 
                              checked={repairData.oltc.others} 
                              onCheckedChange={(checked) => 
                                setRepairData({...repairData, oltc: {...repairData.oltc, others: checked === true}})
                              } 
                            />
                            <Label htmlFor="oltc-others">Others</Label>
                          </div>
                        </div>
                        <Input 
                          value={repairData.oltc.cost}
                          onChange={(e) => setRepairData({
                            ...repairData, 
                            oltc: {...repairData.oltc, cost: e.target.value}
                          })}
                        />
                      </div>
                      
                      {/* Hot Line Oil Filter */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div>
                          <Label>Hot Line Oil Filter [Baht]</Label>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="filter-12" 
                              checked={repairData.hotLineOilFilter.chamber12} 
                              onCheckedChange={(checked) => 
                                setRepairData({...repairData, hotLineOilFilter: {...repairData.hotLineOilFilter, chamber12: checked === true}})
                              } 
                            />
                            <Label htmlFor="filter-12">1-2 Chamber</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="filter-3" 
                              checked={repairData.hotLineOilFilter.chambers3} 
                              onCheckedChange={(checked) => 
                                setRepairData({...repairData, hotLineOilFilter: {...repairData.hotLineOilFilter, chambers3: checked === true}})
                              } 
                            />
                            <Label htmlFor="filter-3">3 Chambers</Label>
                          </div>
                        </div>
                        <Input 
                          value={repairData.hotLineOilFilter.cost}
                          onChange={(e) => setRepairData({
                            ...repairData, 
                            hotLineOilFilter: {...repairData.hotLineOilFilter, cost: e.target.value}
                          })}
                        />
                      </div>
                      
                      {/* Cooling */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div>
                          <Label>Cooling [Baht]</Label>
                        </div>
                        <div></div>
                        <Input 
                          value={repairData.cooling}
                          onChange={(e) => setRepairData({...repairData, cooling: e.target.value})}
                        />
                      </div>
                      
                      {/* Overhaul */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                        <div>
                          <Label>Overhaul [Baht]</Label>
                          <p className="text-xs text-gray-500 mt-1">
                            (Renew Gasket, Oil recondition and dryout, Internal inspection, OLTC inspection, Electrical test and Oil analysis)
                          </p>
                        </div>
                        <div></div>
                        <Input 
                          value={repairData.overhaul}
                          onChange={(e) => setRepairData({...repairData, overhaul: e.target.value})}
                        />
                      </div>
                      
                      {/* Overhaul and Refurbish */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                        <div>
                          <Label>Overhaul and Refurbish [Baht]</Label>
                          <p className="text-xs text-gray-500 mt-1">
                            (Renew Gasket, Oil refurbish, Internal inspection, OLTC inspection, Electrical test and Oil analysis)
                          </p>
                        </div>
                        <div></div>
                        <Input 
                          value={repairData.overhaulRefurbish}
                          onChange={(e) => setRepairData({...repairData, overhaulRefurbish: e.target.value})}
                        />
                      </div>
                      
                      {/* Replacing Rubber Bag */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div>
                          <Label>Replacing Rubber Bag [Baht]</Label>
                        </div>
                        <div></div>
                        <Input 
                          value={repairData.replacingRubberBag}
                          onChange={(e) => setRepairData({...repairData, replacingRubberBag: e.target.value})}
                        />
                      </div>
                      
                      {/* Replacing BCT, others */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div>
                          <Label>Replacing BCT, others [Baht]</Label>
                        </div>
                        <div></div>
                        <Input 
                          value={repairData.replacingBCT}
                          onChange={(e) => setRepairData({...repairData, replacingBCT: e.target.value})}
                        />
                      </div>
                      
                      {/* Others */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div>
                          <Label>Others [Baht]</Label>
                        </div>
                        <div></div>
                        <Input 
                          value={repairData.others}
                          onChange={(e) => setRepairData({...repairData, others: e.target.value})}
                        />
                      </div>
                      
                      {/* Total Cost */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div>
                          <Label>ค่าใช้จ่ายในการซ่อมหม้อแปลงที่เสียหาย (ค่าแรงและค่าของ)</Label>
                        </div>
                        <div></div>
                        <Input 
                          value={repairData.totalCost}
                          onChange={(e) => setRepairData({...repairData, totalCost: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-center gap-4 mt-6">
                      <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                        Save
                      </Button>
                      <Button onClick={handleClearData} variant="outline">
                        Clear data
                      </Button>
                    </div>
                  </TabsContent>
                  
                  {/* Tab Content for Option 1 */}
                  <TabsContent value="option1" className="p-4 border rounded-lg">
                    <h3 className="text-lg font-medium text-blue-600 mb-4">เลือกนำหม้อแปลงตัวอื่นมาซ่อมแซมเพื่อใช้งานแทน</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="replacementCost" className="flex justify-between">
                          <span>ราคาซื้อหม้อแปลงที่ 2 [Bath]</span>
                        </Label>
                        <Input
                          id="replacementCost"
                          value={option1Data.replacementCost}
                          onChange={(e) => setOption1Data({...option1Data, replacementCost: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="noLoadLoss" className="flex justify-between">
                          <span>No-Load Loss [kW]</span>
                        </Label>
                        <Input
                          id="noLoadLoss"
                          value={option1Data.noLoadLoss}
                          onChange={(e) => setOption1Data({...option1Data, noLoadLoss: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="loadLoss" className="flex justify-between">
                          <span>Load Loss [kW]</span>
                        </Label>
                        <Input
                          id="loadLoss"
                          value={option1Data.loadLoss}
                          onChange={(e) => setOption1Data({...option1Data, loadLoss: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="failureRiskCost1" className="flex justify-between">
                          <span>ค่าเสียโอกาสในการจ่ายไฟเนื่องจาก PM [Bath/year]</span>
                        </Label>
                        <Input
                          id="failureRiskCost1"
                          value={option1Data.failureRiskCost}
                          onChange={(e) => setOption1Data({...option1Data, failureRiskCost: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maintenanceCost1" className="flex justify-between">
                          <span>ค่าซ่อมบำรุงเฉลี่ยรายปี [Bath/year]</span>
                        </Label>
                        <Input
                          id="maintenanceCost1"
                          value={option1Data.maintenanceCost}
                          onChange={(e) => setOption1Data({...option1Data, maintenanceCost: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="disposalCost1" className="flex justify-between">
                          <span>ค่าทำลายหรือรื้อถอน [Bath]</span>
                        </Label>
                        <Input
                          id="disposalCost1"
                          value={option1Data.disposalCost}
                          onChange={(e) => setOption1Data({...option1Data, disposalCost: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium text-blue-600 mb-4">รายการที่ต้องซ่อมหม้อแปลงตัวที่ 2 (รวมค่าแรงและค่าของ)</h3>
                    
                    {/* Same structure for Option 1 repair items as in repair-data tab */}
                    <div className="space-y-6 mb-4">
                      {/* Winding */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div>
                          <Label>Winding [Baht]</Label>
                        </div>
                        <div className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="winding-new-opt1" 
                              checked={option1Data.winding.new} 
                              onCheckedChange={(checked) => 
                                setOption1Data({...option1Data, winding: {...option1Data.winding, new: checked === true}})
                              } 
                            />
                            <Label htmlFor="winding-new-opt1">New</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="winding-repair-opt1" 
                              checked={option1Data.winding.repair} 
                              onCheckedChange={(checked) => 
                                setOption1Data({...option1Data, winding: {...option1Data.winding, repair: checked === true}})
                              } 
                            />
                            <Label htmlFor="winding-repair-opt1">Repair</Label>
                          </div>
                        </div>
                        <Input 
                          value={option1Data.winding.cost}
                          onChange={(e) => setOption1Data({
                            ...option1Data, 
                            winding: {...option1Data.winding, cost: e.target.value}
                          })}
                        />
                      </div>
                      
                      {/* More items would be here */}
                      
                      {/* Total Cost */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div>
                          <Label>ค่าใช้จ่ายในการซ่อมหม้อแปลงที่เสียหายตัวที่ 2 (ค่าแรงและค่าของ)</Label>
                        </div>
                        <div></div>
                        <Input 
                          value={option1Data.totalCost}
                          onChange={(e) => setOption1Data({...option1Data, totalCost: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-center gap-4 mt-6">
                      <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                        Save
                      </Button>
                      <Button onClick={handleClearData} variant="outline">
                        Clear data
                      </Button>
                    </div>
                  </TabsContent>
                  
                  {/* Tab Content for Option 2 */}
                  <TabsContent value="option2" className="p-4 border rounded-lg">
                    <h3 className="text-lg font-medium text-blue-600 mb-4">เลือกนำหม้อแปลงใหม่เมื่อสิ้นสุดการใช้งานหม้อแปลงตัวเดิม</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="newTransformerCost" className="flex justify-between">
                          <span>ราคาหม้อแปลงใหม่ [Bath]</span>
                        </Label>
                        <Input
                          id="newTransformerCost"
                          value={option2Data.newTransformerCost}
                          onChange={(e) => setOption2Data({...option2Data, newTransformerCost: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ratedPower" className="flex justify-between">
                          <span>Rated Power [MVA]</span>
                        </Label>
                        <Input
                          id="ratedPower"
                          value={option2Data.ratedPower}
                          onChange={(e) => setOption2Data({...option2Data, ratedPower: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="noLoadLoss2" className="flex justify-between">
                          <span>No-Load Loss [kW]</span>
                        </Label>
                        <Input
                          id="noLoadLoss2"
                          value={option2Data.noLoadLoss}
                          onChange={(e) => setOption2Data({...option2Data, noLoadLoss: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="loadLoss2" className="flex justify-between">
                          <span>Load Loss [kW]</span>
                        </Label>
                        <Input
                          id="loadLoss2"
                          value={option2Data.loadLoss}
                          onChange={(e) => setOption2Data({...option2Data, loadLoss: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="failureRiskCost2" className="flex justify-between">
                          <span>ค่าเสียโอกาสในการจ่ายไฟเนื่องจาก PM [Bath/year]</span>
                        </Label>
                        <Input
                          id="failureRiskCost2"
                          value={option2Data.failureRiskCost}
                          onChange={(e) => setOption2Data({...option2Data, failureRiskCost: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maintenanceCost2" className="flex justify-between">
                          <span>ค่าซ่อมบำรุงเฉลี่ยรายปี [Bath/year]</span>
                        </Label>
                        <Input
                          id="maintenanceCost2"
                          value={option2Data.maintenanceCost}
                          onChange={(e) => setOption2Data({...option2Data, maintenanceCost: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="disposalCost2" className="flex justify-between">
                          <span>ค่าทำลายหรือรื้อถอน [Bath]</span>
                        </Label>
                        <Input
                          id="disposalCost2"
                          value={option2Data.disposalCost}
                          onChange={(e) => setOption2Data({...option2Data, disposalCost: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-center gap-4 mt-6">
                      <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                        Save
                      </Button>
                      <Button onClick={handleClearData} variant="outline">
                        Clear data
                      </Button>
                    </div>
                  </TabsContent>
                  
                  {/* Tab Content for Option 3 */}
                  <TabsContent value="option3" className="p-4 border rounded-lg">
                    <h3 className="text-lg font-medium text-blue-600 mb-4">เลือกนำหม้อแปลงใหม่เมื่อสิ้นสุดการใช้งานหม้อแปลงตัวเดิม</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="newTransformerCost3" className="flex justify-between">
                          <span>ราคาหม้อแปลงใหม่ [Bath]</span>
                        </Label>
                        <Input
                          id="newTransformerCost3"
                          value={option3Data.newTransformerCost}
                          onChange={(e) => setOption3Data({...option3Data, newTransformerCost: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ratedPower3" className="flex justify-between">
                          <span>Rated Power [MVA]</span>
                        </Label>
                        <Input
                          id="ratedPower3"
                          value={option3Data.ratedPower}
                          onChange={(e) => setOption3Data({...option3Data, ratedPower: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="noLoadLoss3" className="flex justify-between">
                          <span>No-Load Loss [kW]</span>
                        </Label>
                        <Input
                          id="noLoadLoss3"
                          value={option3Data.noLoadLoss}
                          onChange={(e) => setOption3Data({...option3Data, noLoadLoss: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="loadLoss3" className="flex justify-between">
                          <span>Load Loss [kW]</span>
                        </Label>
                        <Input
                          id="loadLoss3"
                          value={option3Data.loadLoss}
                          onChange={(e) => setOption3Data({...option3Data, loadLoss: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="failureRiskCost3" className="flex justify-between">
                          <span>ค่าเสียโอกาสในการจ่ายไฟเนื่องจาก PM [Bath/year]</span>
                        </Label>
                        <Input
                          id="failureRiskCost3"
                          value={option3Data.failureRiskCost}
                          onChange={(e) => setOption3Data({...option3Data, failureRiskCost: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maintenanceCost3" className="flex justify-between">
                          <span>ค่าซ่อมบำรุงเฉลี่ยรายปี [Bath/year]</span>
                        </Label>
                        <Input
                          id="maintenanceCost3"
                          value={option3Data.maintenanceCost}
                          onChange={(e) => setOption3Data({...option3Data, maintenanceCost: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="disposalCost3" className="flex justify-between">
                          <span>ค่าทำลายหรือรื้อถอน [Bath]</span>
                        </Label>
                        <Input
                          id="disposalCost3"
                          value={option3Data.disposalCost}
                          onChange={(e) => setOption3Data({...option3Data, disposalCost: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-center gap-4 mt-6">
                      <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                        Save
                      </Button>
                      <Button onClick={handleClearData} variant="outline">
                        Clear data
                      </Button>
                    </div>
                  </TabsContent>
                  
                  {/* Tab Content for Summary */}
                  <TabsContent value="summary" className="p-4 border rounded-lg">
                    <h3 className="text-lg font-medium text-blue-600 mb-4">รายชื่อทุกที่ 3 ทางเลือก</h3>
                    
                    <Table className="w-full mb-6">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-24">Option No.</TableHead>
                          <TableHead>Option</TableHead>
                          <TableHead className="text-right">ราคาต้นทุน ณ เวลาปัจจุบัน (NPV)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {summaryData.map((option) => (
                          <TableRow key={option.optionNo}>
                            <TableCell className="text-center">{option.optionNo}</TableCell>
                            <TableCell>{option.option}</TableCell>
                            <TableCell className="text-right">{option.npv}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-8">
                      <div className="space-y-2 w-full md:w-1/2">
                        <Label>การเลือกที่เหมาะสมเชิงเศรษฐศาสตร์</Label>
                        <Select defaultValue="option1">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="เลือกทางเลือกที่เหมาะสม" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="option1">ซ่อม ณ ปัจจุบันและย้อมหม้อแปลงสำรองเพื่อใช้งานต่อ</SelectItem>
                            <SelectItem value="option2">ซื้อหม้อแปลงมาใช้งานแทน</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleExportPDF} className="bg-blue-600 hover:bg-blue-700">
                        Export PDF
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EconomicAnalysisInfo;
