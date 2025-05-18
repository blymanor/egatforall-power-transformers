
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Test categories
const testCategories = [
  {
    title: "Arrester",
    items: [
      "HV %Leakage Current &Watt Loss &Insulation Resistance",
      "LV %Leakage Current &Watt Loss &Insulation Resistance",
      "TV %Leakage Current &Watt Loss &Insulation Resistance",
    ]
  },
  {
    title: "Bushing",
    items: [
      "HV %PF & Capacitance",
      "LV %PF & Capacitance",
      "TV %PF & Capacitance"
    ]
  },
  {
    title: "Core Insulation Resistance",
    items: []
  },
  {
    title: "การทดสอบน้ำมัน",
    items: [
      "Oil Aging",
      "Oil Contamination"
    ]
  },
  {
    title: "การทดสอบ OLTC",
    items: [
      "OLTC Contact",
      "Dielectric Property",
      "DGA FACTOR",
      "DGA of Gas",
      "OLTC Oil Contamination"
    ]
  },
  {
    title: "การทดสอบ Visual Inspection",
    items: [
      "DGA FACTOR",
      "DGA of Gas",
      "Furan",
      "Power Factor",
      "Load History",
      "Thermo Scan",
      "Oil Quality"
    ]
  },
  {
    title: "DC Resistance Measurement",
    items: [
      "HV WINDING %Max Error between Phase",
      "HV WINDING %Max Error btw. Commissioning &Phase",
      "HV WINDING DC Resistance",
      "LV WINDING %Max Error between Phase",
      "LV WINDING %Max Error btw. Commissioning &Phase",
      "LV WINDING DC Resistance",
      "TV WINDING %Max Error between Phase",
      "TV WINDING %Max Error btw. Commissioning &Phase",
      "TV WINDING DC Resistance"
    ]
  },
  {
    title: "Single Phase Impedance Measurement",
    items: [
      "HV-LV %Deviation From First Test",
      "HV-LV Impedance",
      "HV-TV %Deviation From First Test",
      "HV-TV Impedance",
      "LV-TV %Deviation From First Test",
      "LV-TV Impedance"
    ]
  },
  {
    title: "Three Phase Impedance Measurement",
    items: [
      "HV %Error From Nameplate",
      "HV-LV %Impedance",
      "HV-TV %Impedance",
      "LV %Error From Nameplate",
      "LV-TV %Impedance"
    ]
  },
  {
    title: "Auto Winding Insulation Resistance Measurement",
    items: [
      "HV WINDING %Power Factor@20°C,Capacitance,PI",
      "HV WINDING Insulation Resistance",
      "TV WINDING %Power Factor@20°C,Capacitance,PI",
      "TV WINDING Insulation Resistance"
    ]
  },
  {
    title: "Two Winding Insulation Resistance Measurement",
    items: [
      "HV WINDING %Power Factor@20°C,Capacitance,PI",
      "HV WINDING Impedance Measurement",
      "LV WINDING %Power Factor@20°C,Capacitance,PI",
      "LV WINDING Impedance Measurement"
    ]
  },
  {
    title: "Three Winding Insulation Resistance Measurement",
    items: [
      "HV WINDING %Power Factor@20°C,Capacitance,PI",
      "HV Impedance Measurement",
      "LV WINDING %Power Factor@20°C,Capacitance,PI",
      "LV Impedance Measurement",
      "TV WINDING %Power Factor@20°C,Capacitance,PI",
      "TV Impedance Measurement"
    ]
  },
  {
    title: "Ratio Measurement",
    items: [
      "HV WINDING HV-LV %Error From Nameplate",
      "HV WINDING HV-LV Ratio",
      "HV WINDING HV-TV %Error From Nameplate",
      "HV WINDING HV-TV Ratio",
      "LV WINDING LV-TV %Error From Nameplate",
      "LV WINDING LV-TV Ratio"
    ]
  }
];

// Transformer options
const transformers = [
  { value: "AN-KT1A", label: "AN-KT1A" },
  { value: "AN-KT2A", label: "AN-KT2A" },
  { value: "AN-KT3A", label: "AN-KT3A" },
  { value: "TR-104", label: "TR-104" },
  { value: "TR-105", label: "TR-105" },
];

const AllTestResults = () => {
  const [selectedTransformer, setSelectedTransformer] = useState("AN-KT1A");
  const [resultsGenerated, setResultsGenerated] = useState(false);

  const handleGenerateResults = () => {
    toast.success(`กำลังแสดงผลการทดสอบสำหรับหม้อแปลง ${selectedTransformer}`, {
      description: "โหลดข้อมูลสำเร็จ",
    });
    setResultsGenerated(true);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <Card className="max-w-full overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white p-6 border-b">
            <CardTitle className="text-xl font-bold text-blue-700">
              ผลการทดสอบของหม้อแปลงไฟฟ้า
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 border border-gray-100">
              <h2 className="text-lg font-bold text-red-600 mb-6">
                ผลการทดสอบของหม้อแปลงไฟฟ้า :
              </h2>
              
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200 mb-8">
                <div className="flex items-center gap-4">
                  <label htmlFor="transformer" className="text-lg font-medium text-purple-700">
                    หม้อแปลงไฟฟ้า:
                  </label>
                  <Select value={selectedTransformer} onValueChange={setSelectedTransformer}>
                    <SelectTrigger className="w-48 border-gray-300">
                      <SelectValue placeholder="เลือกหม้อแปลง" />
                    </SelectTrigger>
                    <SelectContent>
                      {transformers.map(transformer => (
                        <SelectItem key={transformer.value} value={transformer.value}>
                          {transformer.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={handleGenerateResults}
                  className="bg-[#1E5CFF] hover:bg-blue-700 text-white px-6 py-2 rounded font-medium"
                >
                  GENERATE
                </Button>
              </div>
              
              {resultsGenerated && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testCategories.map((category, index) => (
                    <div key={index} className="mb-8">
                      <h3 className="text-base font-bold mb-3 text-red-700 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-red-700 rounded-full"></span>
                        {category.title}
                      </h3>
                      
                      <ul className="ml-4 space-y-2">
                        {category.items.map((item, idx) => (
                          <li key={idx} className="ml-4 text-sm text-gray-700 flex items-baseline gap-2">
                            <span className="inline-block w-1.5 h-1.5 bg-blue-700 rounded-full mt-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AllTestResults;
