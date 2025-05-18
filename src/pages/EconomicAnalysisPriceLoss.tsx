
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { NumberInput } from "@/components/ui/number-input";
import { toast } from "sonner";
import { Calculator } from "lucide-react";

const mockTransformers = [
  { id: "1", name: "AN-KT1A", equipmentNo: "7000016200" },
  { id: "2", name: "BN-KT2A", equipmentNo: "7000016201" },
  { id: "3", name: "CN-KT3A", equipmentNo: "7000016202" },
];

// Mock transformer details - in a real app, this would come from API
const transformerDetails = {
  name: "AN-KT1A",
  equipmentNo: "7000016200",
  mvaRating: "50.0",
  hvRating: "115.0",
  firstEnergized: "12/02/2007",
  manufacturer: "ABB",
  oltcManufacturer: "ABB",
  oltcType: "UZFRN330/300",
  vectoryGroup: "YYd1",
  windingType: "Three Winging",
  price: 600000,
  noLoadLoss: 90,
  loadLoss: 400
};

const EconomicAnalysisPriceLoss = () => {
  const [selectedTransformer, setSelectedTransformer] = useState<string>("");
  const [showDetails, setShowDetails] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ totalCost: number; annualLoss: number } | null>(null);
  
  // Mock data for the transformer
  const [transformerData, setTransformerData] = useState({
    price: transformerDetails.price,
    noLoadLoss: transformerDetails.noLoadLoss,
    loadLoss: transformerDetails.loadLoss,
  });

  const handleTransformerSelect = (value: string) => {
    setSelectedTransformer(value);
    setShowDetails(true);
    setAnalysisResult(null);
  };

  const handleInputChange = (field: string, value: number) => {
    setTransformerData({
      ...transformerData,
      [field]: value,
    });
  };

  const handleAnalyze = () => {
    // Mock calculation - in a real app this would use actual formulas based on the transformer data
    // and the factor settings from the previous page
    const mockTotalCost = transformerData.price + (transformerData.noLoadLoss + transformerData.loadLoss) * 3.5 * 365;
    const mockAnnualLoss = (transformerData.noLoadLoss + transformerData.loadLoss) * 24 * 365;
    
    setAnalysisResult({
      totalCost: mockTotalCost,
      annualLoss: mockAnnualLoss
    });
    
    toast.success("วิเคราะห์ข้อมูลสำเร็จ", {
      description: "การวิเคราะห์ทางเศรษฐศาสตร์เสร็จสมบูรณ์",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="bg-gray-100">
            <CardTitle className="text-xl text-[#0442AF]">ราคาและ Loss ของหม้อแปลง</CardTitle>
            <p className="text-sm text-gray-500">กรุณากรอกข้อมูลราคาและค่า Loss ของหม้อแปลงเพื่อใช้ในการวิเคราะห์</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Transformer Selection */}
              <div className="space-y-2">
                <Label htmlFor="transformer">หม้อแปลงไฟฟ้า</Label>
                <Select 
                  value={selectedTransformer} 
                  onValueChange={handleTransformerSelect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTransformers.map(transformer => (
                      <SelectItem key={transformer.id} value={transformer.id}>
                        {transformer.name} - {transformer.equipmentNo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Transformer Details Section */}
              {showDetails && (
                <Card className="border border-gray-200">
                  <CardHeader className="bg-blue-50 pb-2">
                    <CardTitle className="text-lg">ข้อมูลหม้อแปลงไฟฟ้า</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Transformer Name:</span>
                        <span>{transformerDetails.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Equipment No.:</span>
                        <span>{transformerDetails.equipmentNo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">MVA Rating:</span>
                        <span>{transformerDetails.mvaRating} MVA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">HV Rating:</span>
                        <span>{transformerDetails.hvRating} kV</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">First Energized:</span>
                        <span>{transformerDetails.firstEnergized}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Manufacturer:</span>
                        <span>{transformerDetails.manufacturer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">OLTC Manufacturer:</span>
                        <span>{transformerDetails.oltcManufacturer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">OLTC Type:</span>
                        <span>{transformerDetails.oltcType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Vectory Group:</span>
                        <span>{transformerDetails.vectoryGroup}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Winding Type:</span>
                        <span>{transformerDetails.windingType}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Price and Loss Section */}
              {showDetails && (
                <Card className="border border-gray-200">
                  <CardHeader className="bg-blue-50 pb-2">
                    <CardTitle className="text-lg">ราคาและค่า Loss</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="price" className="flex justify-between">
                          <span>ราคาหม้อแปลง</span>
                          <span className="text-gray-500">[บาท]</span>
                        </Label>
                        <NumberInput
                          value={transformerData.price}
                          onChange={(value) => handleInputChange("price", value)}
                          min={0}
                          step={1000}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="noLoadLoss" className="flex justify-between">
                          <span>No-Load Loss</span>
                          <span className="text-gray-500">[KW]</span>
                        </Label>
                        <NumberInput
                          value={transformerData.noLoadLoss}
                          onChange={(value) => handleInputChange("noLoadLoss", value)}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="loadLoss" className="flex justify-between">
                          <span>Load Loss</span>
                          <span className="text-gray-500">[KW]</span>
                        </Label>
                        <NumberInput
                          value={transformerData.loadLoss}
                          onChange={(value) => handleInputChange("loadLoss", value)}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Analysis Button */}
              {showDetails && (
                <div className="flex justify-end pt-2">
                  <Button 
                    onClick={handleAnalyze}
                    className="bg-[#0442AF] hover:bg-[#03369c]"
                  >
                    <Calculator className="mr-1 h-4 w-4" />
                    <span>วิเคราะห์ข้อมูล</span>
                  </Button>
                </div>
              )}

              {/* Analysis Results */}
              {analysisResult && (
                <Card className="bg-green-50 border-green-200 mt-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-green-800">ผลการวิเคราะห์</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                      <div className="p-4 bg-white rounded-lg shadow border border-green-100">
                        <p className="text-sm font-medium text-gray-500">ต้นทุนรวม</p>
                        <p className="text-3xl font-bold text-green-700 my-2">
                          {analysisResult.totalCost.toLocaleString()} <span className="text-sm">บาท</span>
                        </p>
                      </div>
                      <div className="p-4 bg-white rounded-lg shadow border border-green-100">
                        <p className="text-sm font-medium text-gray-500">Loss ต่อปี</p>
                        <p className="text-3xl font-bold text-green-700 my-2">
                          {analysisResult.annualLoss.toLocaleString()} <span className="text-sm">kWh</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EconomicAnalysisPriceLoss;
