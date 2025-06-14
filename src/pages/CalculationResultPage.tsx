
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const CalculationResultPage = () => {
  const [results, setResults] = useState({
    reOrderLevel: 0,
    orderQuantity: 0,
    safetyStock: 0,
    orderFrequency: 0,
    orderingCost: 0,
  });

  const handleCalculate = () => {
    // Mock calculation - ในการใช้งานจริงจะเชื่อมต่อกับข้อมูลจากหน้าอื่น
    const mockResults = {
      reOrderLevel: 15.5,
      orderQuantity: 25.0,
      safetyStock: 8.2,
      orderFrequency: 4.5,
      orderingCost: 125000,
    };
    
    setResults(mockResults);
    toast.success("คำนวณเสร็จสิ้น");
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            ผลการคำนวณ
          </h1>
          <p className="text-gray-500">แสดงผลการคำนวณระดับการสั่งซื้อและปริมาณน้ำมันหม้อแปลงไฟฟ้า</p>
        </div>

        {/* Results Card */}
        <Card className="shadow-md border-none">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
            <CardTitle className="text-lg font-semibold text-blue-700 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              ผลการคำนวณ
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="font-medium text-gray-700">Re-Order Level [ถัง] :</span>
                  <span className="text-xl font-bold text-blue-700">
                    {results.reOrderLevel.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="font-medium text-gray-700">ปริมาณการสั่งน้ำมัน [ถัง/ครั้ง] :</span>
                  <span className="text-xl font-bold text-green-700">
                    {results.orderQuantity.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                  <span className="font-medium text-gray-700">Safety Stock [ถัง] :</span>
                  <span className="text-xl font-bold text-yellow-700">
                    {results.safetyStock.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="font-medium text-gray-700">ปริมาณการสั่งน้ำมัน [ครั้ง/ปี] :</span>
                  <span className="text-xl font-bold text-purple-700">
                    {results.orderFrequency.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <span className="font-medium text-gray-700">ค่าใช้จ่ายในการสั่ง [บาท/ปี] :</span>
                  <span className="text-xl font-bold text-red-700">
                    {results.orderingCost.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleCalculate} 
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-lg"
              >
                <Calculator className="h-5 w-5 mr-2" />
                คำนวณ
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CalculationResultPage;
