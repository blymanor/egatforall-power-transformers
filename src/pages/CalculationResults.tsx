
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const CalculationResults = () => {
  const [results, setResults] = useState({
    reorderLevel: '',
    orderQuantity: '',
    safetyStock: '',
    orderFrequency: '',
    annualOrderingCost: ''
  });

  const handleCalculate = () => {
    // Mock calculation - in real implementation, this would use actual formulas
    setResults({
      reorderLevel: '90',
      orderQuantity: '150',
      safetyStock: '45',
      orderFrequency: '8',
      annualOrderingCost: '480000'
    });
    
    toast.success("คำนวณผลลัพธ์สำเร็จ", {
      description: "ระบบได้คำนวณข้อมูลเรียบร้อยแล้ว",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-[#0442AF] mb-6">ผลการคำนวณ</h1>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
              <Label className="text-lg">Re-Order Level [ถัง] :</Label>
              <span className="font-bold text-xl text-blue-600">{results.reorderLevel || '-'}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
              <Label className="text-lg">ปริมาณการสั่งน้ำมัน [ถัง/ครั้ง] :</Label>
              <span className="font-bold text-xl text-blue-600">{results.orderQuantity || '-'}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
              <Label className="text-lg">Safety Stock [ถัง] :</Label>
              <span className="font-bold text-xl text-blue-600">{results.safetyStock || '-'}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
              <Label className="text-lg">ปริมาณการสั่งน้ำมัน [ครั้ง/ปี] :</Label>
              <span className="font-bold text-xl text-blue-600">{results.orderFrequency || '-'}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
              <Label className="text-lg">ค่าใช้จ่ายในการสั่ง [บาท/ปี] :</Label>
              <span className="font-bold text-xl text-blue-600">{results.annualOrderingCost || '-'}</span>
            </div>

            <div className="flex justify-center pt-6">
              <Button 
                onClick={handleCalculate}
                className="px-12 py-3 text-lg bg-blue-600 hover:bg-blue-700"
              >
                คำนวณ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalculationResults;
