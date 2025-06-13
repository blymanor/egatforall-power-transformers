
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

// Mock transformers database - in a real app, this would come from API
const mockTransformers = [
  { 
    id: "1", 
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
  },
  { 
    id: "2", 
    name: "BN-KT2A", 
    equipmentNo: "7000016201",
    mvaRating: "75.0",
    hvRating: "230.0",
    firstEnergized: "05/11/2012",
    manufacturer: "Siemens",
    oltcManufacturer: "Siemens",
    oltcType: "VZFN250/200",
    vectoryGroup: "YNd1",
    windingType: "Double Winging",
    price: 850000,
    noLoadLoss: 120,
    loadLoss: 520
  },
  { 
    id: "3", 
    name: "CN-KT3A", 
    equipmentNo: "7000016202",
    mvaRating: "100.0",
    hvRating: "345.0",
    firstEnergized: "17/08/2015",
    manufacturer: "GE",
    oltcManufacturer: "GE",
    oltcType: "HTFN420/350",
    vectoryGroup: "YYd11",
    windingType: "Three Winging",
    price: 1200000,
    noLoadLoss: 150,
    loadLoss: 680
  },
];

const EconomicAnalysisPriceLoss = () => {
  const [selectedTransformer, setSelectedTransformer] = useState<string>("");
  const [showDetails, setShowDetails] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ totalCost: number; annualLoss: number } | null>(null);
  
  // Current transformer data
  const [currentTransformer, setCurrentTransformer] = useState(mockTransformers[0]);
  
  // Input data for analysis
  const [transformerData, setTransformerData] = useState({
    price: 0,
    noLoadLoss: 0,
    loadLoss: 0,
  });

  const handleTransformerSelect = (value: string) => {
    setSelectedTransformer(value);
    const selected = mockTransformers.find(t => t.id === value);
    
    if (selected) {
      setCurrentTransformer(selected);
      setTransformerData({
        price: selected.price,
        noLoadLoss: selected.noLoadLoss,
        loadLoss: selected.loadLoss,
      });
    }
    
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
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="bg-gray-100">
            <CardTitle className="text-2xl text-[#0442AF]">ราคาและ Loss ของหม้อแปลง</CardTitle>
            <p className="text-lg text-gray-500">กรุณากรอกข้อมูลราคาและค่า Loss ของหม้อแปลงเพื่อใช้ในการวิเคราะห์</p>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="space-y-8">
              {/* Transformer Selection */}
              <div className="space-y-3">
                <Label htmlFor="transformer" className="text-lg font-medium">หม้อแปลงไฟฟ้า</Label>
                <Select 
                  value={selectedTransformer} 
                  onValueChange={handleTransformerSelect}
                >
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTransformers.map(transformer => (
                      <SelectItem key={transformer.id} value={transformer.id}>
                        {transformer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Transformer Details Section */}
              {showDetails && (
                <Card className="border border-gray-200">
                  <CardHeader className="bg-blue-50 pb-3">
                    <CardTitle className="text-xl">ข้อมูลหม้อแปลงไฟฟ้า</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-base">
                      <div className="flex justify-between">
                        <span className="font-medium">Transformer Name:</span>
                        <span>{currentTransformer.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Equipment No.:</span>
                        <span>{currentTransformer.equipmentNo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">MVA Rating:</span>
                        <span>{currentTransformer.mvaRating} MVA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">HV Rating:</span>
                        <span>{currentTransformer.hvRating} kV</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">First Energized:</span>
                        <span>{currentTransformer.firstEnergized}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Manufacturer:</span>
                        <span>{currentTransformer.manufacturer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">OLTC Manufacturer:</span>
                        <span>{currentTransformer.oltcManufacturer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">OLTC Type:</span>
                        <span>{currentTransformer.oltcType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Vectory Group:</span>
                        <span>{currentTransformer.vectoryGroup}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Winding Type:</span>
                        <span>{currentTransformer.windingType}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Price and Loss Section */}
              {showDetails && (
                <Card className="border border-gray-200">
                  <CardHeader className="bg-blue-50 pb-3">
                    <CardTitle className="text-xl">ราคาและค่า Loss</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="price" className="text-lg font-medium flex justify-between">
                          <span>ราคาหม้อแปลง</span>
                          <span className="text-gray-500">[บาท]</span>
                        </Label>
                        <NumberInput
                          value={transformerData.price}
                          onChange={(value) => handleInputChange("price", value)}
                          min={0}
                          step={1000}
                          className="w-full h-12 text-lg"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="noLoadLoss" className="text-lg font-medium flex justify-between">
                          <span>No-Load Loss</span>
                          <span className="text-gray-500">[KW]</span>
                        </Label>
                        <NumberInput
                          value={transformerData.noLoadLoss}
                          onChange={(value) => handleInputChange("noLoadLoss", value)}
                          min={0}
                          step={1}
                          className="w-full h-12 text-lg"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="loadLoss" className="text-lg font-medium flex justify-between">
                          <span>Load Loss</span>
                          <span className="text-gray-500">[KW]</span>
                        </Label>
                        <NumberInput
                          value={transformerData.loadLoss}
                          onChange={(value) => handleInputChange("loadLoss", value)}
                          min={0}
                          step={1}
                          className="w-full h-12 text-lg"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Analysis Button */}
              {showDetails && (
                <div className="flex justify-end pt-3">
                  <Button 
                    onClick={handleAnalyze}
                    className="bg-[#0442AF] hover:bg-[#03369c] text-lg px-8 py-3"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    <span>วิเคราะห์ข้อมูล</span>
                  </Button>
                </div>
              )}

              {/* Analysis Results */}
              {analysisResult && (
                <Card className="bg-green-50 border-green-200 mt-6">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-green-800">ผลการวิเคราะห์</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                      <div className="p-6 bg-white rounded-lg shadow border border-green-100">
                        <p className="text-lg font-medium text-gray-500">ต้นทุนรวม</p>
                        <p className="text-4xl font-bold text-green-700 my-3">
                          {analysisResult.totalCost.toLocaleString()} <span className="text-lg">บาท</span>
                        </p>
                      </div>
                      <div className="p-6 bg-white rounded-lg shadow border border-green-100">
                        <p className="text-lg font-medium text-gray-500">Loss ต่อปี</p>
                        <p className="text-4xl font-bold text-green-700 my-3">
                          {analysisResult.annualLoss.toLocaleString()} <span className="text-lg">kWh</span>
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
