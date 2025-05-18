import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Keep existing code for other imports

const DamageReport = () => {
  const { toast } = useToast();
  const [selectedWinding, setSelectedWinding] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");

  // Function to handle condition selection with double-click support
  const handleConditionSelect = (condition: string) => {
    // If the same condition is clicked again, deselect it
    if (selectedCondition === condition) {
      setSelectedCondition("");
    } else {
      setSelectedCondition(condition);
    }
  };

  // Function to handle area selection
  const handleAreaSelect = (area: string) => {
    if (selectedArea === area) {
      setSelectedArea("");
      setSelectedCondition("");
    } else {
      setSelectedArea(area);
      setSelectedCondition("");
    }
  };

  // Function to handle winding selection
  const handleWindingSelect = (winding: string) => {
    if (selectedWinding === winding) {
      setSelectedWinding("");
      setSelectedArea("");
      setSelectedCondition("");
    } else {
      setSelectedWinding(winding);
      setSelectedArea("");
      setSelectedCondition("");
    }
  };

  const handleSubmit = () => {
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: `บันทึกข้อมูลความเสียหาย ${selectedWinding} - ${selectedArea} - ${selectedCondition} เรียบร้อยแล้ว`,
    });
    
    // Reset form after submission
    setSelectedWinding("");
    setSelectedArea("");
    setSelectedCondition("");
  };

  return (
    <DashboardLayout
      pageTitle="รายงานข้อมูลความเสียหาย"
      pageDescription="Damage Report Information"
    >
      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border-0">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">บันทึกความเสียหายของหม้อแปลงไฟฟ้า</h2>
            <p className="text-gray-600">เลือกข้อมูลตำแหน่งและสภาพความเสียหายที่ตรวจพบ</p>
            
            {/* Transformer Winding Selection Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">1. เลือกขดลวดที่พบความเสียหาย</h3>
              <div className="flex flex-wrap gap-3">
                {["HV Winding", "LV Winding", "TV Winding"].map((winding) => (
                  <Button
                    key={winding}
                    onClick={() => handleWindingSelect(winding)}
                    variant={selectedWinding === winding ? "default" : "outline"}
                    className={`rounded-full ${
                      selectedWinding === winding ? "bg-blue-600 hover:bg-blue-700" : ""
                    }`}
                  >
                    {winding}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Damage Area Selection Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">2. เลือกพื้นที่ที่พบความเสียหาย</h3>
              <div className="flex flex-wrap gap-3">
                {selectedWinding && [
                  "Top Area", 
                  "Middle Area", 
                  "Bottom Area",
                  "Lead Exit",
                  "Tap Connection"
                ].map((area) => (
                  <Button
                    key={area}
                    onClick={() => handleAreaSelect(area)}
                    variant={selectedArea === area ? "default" : "outline"}
                    className={`rounded-full ${
                      selectedArea === area ? "bg-blue-600 hover:bg-blue-700" : ""
                    }`}
                  >
                    {area}
                  </Button>
                ))}
                {!selectedWinding && (
                  <p className="text-amber-600">กรุณาเลือกขดลวดที่พบความเสียหายก่อน</p>
                )}
              </div>
            </div>
            
            {/* Damage Condition Selection Section - with double-click support */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">3. เลือกสภาพความเสียหาย</h3>
              <div className="flex flex-wrap gap-3">
                {selectedArea && [
                  "Broken", 
                  "Burnt", 
                  "Deformed", 
                  "Loose Connection",
                  "Carbon Track",
                  "Contamination",
                  "Overheating"
                ].map((condition) => (
                  <Button
                    key={condition}
                    onClick={() => handleConditionSelect(condition)}
                    variant={selectedCondition === condition ? "default" : "outline"}
                    className={`rounded-full ${
                      selectedCondition === condition ? "bg-blue-600 hover:bg-blue-700" : ""
                    }`}
                    title="Double-click to deselect"
                  >
                    {condition}
                  </Button>
                ))}
                {!selectedArea && (
                  <p className="text-amber-600">กรุณาเลือกพื้นที่ที่พบความเสียหายก่อน</p>
                )}
              </div>
            </div>
            
            {/* Submit Section */}
            <div className="pt-4 border-t border-gray-200">
              <Button 
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!selectedWinding || !selectedArea || !selectedCondition}
              >
                บันทึกข้อมูล
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DamageReport;
