
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Test categories with their items
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
    title: "Exciting Current",
    items: [
      "HV WINDING %Idiff@200V",
      "HV WINDING %Idiff@10kV",
      "HV WINDING Iexc",
      "LV WINDING %Idiff@200V",
      "LV WINDING Iexc",
      "TV WINDING %Idiff@200V",
      "TV WINDING Iexc"
    ]
  },
  {
    title: "HV WINDING Tests",
    items: [
      "DC Resistance",
      "Insulation Resistance",
      "%Power Factor@20°C,Capacitance,PI"
    ]
  },
  {
    title: "LV WINDING Tests",
    items: [
      "DC Resistance",
      "Insulation Resistance",
      "%Power Factor@20°C,Capacitance,PI"
    ]
  },
  {
    title: "TV WINDING Tests",
    items: [
      "DC Resistance",
      "Insulation Resistance",
      "%Power Factor@20°C,Capacitance,PI"
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
    title: "Auto Winding Insulation Resistance",
    items: [
      "HV WINDING %Power Factor@20°C,Capacitance,PI",
      "HV WINDING Insulation Resistance",
      "TV WINDING %Power Factor@20°C,Capacitance,PI",
      "TV WINDING Insulation Resistance"
    ]
  },
  {
    title: "Two Winding Insulation Resistance",
    items: [
      "HV WINDING %Power Factor@20°C,Capacitance,PI",
      "HV WINDING Impedance Measurement",
      "LV WINDING %Power Factor@20°C,Capacitance,PI",
      "LV WINDING Impedance Measurement"
    ]
  },
  {
    title: "Three Winding Insulation Resistance",
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
  },
  {
    title: "การทดสอบทางน้ำมัน",
    items: [
      "Oil Aging",
      "Oil DGA",
      "Oil Furan",
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
        <div className="max-w-full overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b mb-6">
            <h1 className="text-xl font-bold text-blue-700">
              ผลการทดสอบของหม้อแปลงไฟฟ้า
            </h1>
          </div>
          <div className="p-6">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              {/* Selection area */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-base font-medium text-gray-700">หม้อแปลงไฟฟ้า:</span>
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
                  แสดงผล
                </Button>
              </div>
              
              {/* Results area - new accordion-based design */}
              {resultsGenerated && (
                <div className="mt-8 grid grid-cols-1 gap-4">
                  {testCategories.map((category, index) => (
                    <Accordion 
                      key={index} 
                      type="single" 
                      collapsible 
                      className="border rounded-md overflow-hidden bg-white"
                    >
                      <AccordionItem value={`item-${index}`} className="border-0">
                        <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 font-medium text-blue-800">
                          {category.title}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pt-2 pb-4">
                          <ul className="space-y-2">
                            {category.items.length > 0 ? (
                              category.items.map((item, idx) => (
                                <li key={idx} className="text-sm text-gray-700 flex items-baseline gap-2">
                                  <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></span>
                                  {item}
                                </li>
                              ))
                            ) : (
                              <li className="text-sm text-gray-500">ไม่มีข้อมูล</li>
                            )}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AllTestResults;
