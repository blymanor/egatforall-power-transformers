
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ReportFormProps {
  onSave: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSave }) => {
  const [region, setRegion] = useState("");
  const [station, setStation] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [transformer, setTransformer] = useState("");
  const [groupBy, setGroupBy] = useState("");

  const handleGenerateReport = () => {
    onSave();
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* White frame container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">เลือกเงื่อนไขในการสร้างรายงาน</h2>
        </div>

        {/* First row of filters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="flex items-center gap-4">
            <Label className="w-24 text-gray-700 font-medium text-base whitespace-nowrap">เขต :</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="flex-1 h-12 focus-visible:ring-0 border border-gray-300">
                <SelectValue placeholder="ภาคเหนือ" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">ทั้งหมด</SelectItem>
                <SelectItem value="north">ภาคเหนือ</SelectItem>
                <SelectItem value="northeast">ภาคตะวันออกเฉียงเหนือ</SelectItem>
                <SelectItem value="central">ภาคกลาง</SelectItem>
                <SelectItem value="south">ภาคใต้</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <Label className="w-24 text-gray-700 font-medium text-base whitespace-nowrap">สถานีไฟฟ้า :</Label>
            <Select value={station} onValueChange={setStation}>
              <SelectTrigger className="flex-1 h-12 focus-visible:ring-0 border border-gray-300">
                <SelectValue placeholder="สถานีไฟฟ้า 1" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">ทั้งหมด</SelectItem>
                <SelectItem value="station1">สถานีไฟฟ้า 1</SelectItem>
                <SelectItem value="station2">สถานีไฟฟ้า 2</SelectItem>
                <SelectItem value="station3">สถานีไฟฟ้า 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Second row of filters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="flex items-center gap-4">
            <Label className="w-24 text-gray-700 font-medium text-base whitespace-nowrap">บริษัทผู้ผลิต :</Label>
            <Select value={manufacturer} onValueChange={setManufacturer}>
              <SelectTrigger className="flex-1 h-12 focus-visible:ring-0 border border-gray-300">
                <SelectValue placeholder="Siemens" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">ทั้งหมด</SelectItem>
                <SelectItem value="abb">ABB</SelectItem>
                <SelectItem value="siemens">Siemens</SelectItem>
                <SelectItem value="hitachi">Hitachi</SelectItem>
                <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <Label className="w-24 text-gray-700 font-medium text-base whitespace-nowrap">หม้อแปลงไฟฟ้า :</Label>
            <Select value={transformer} onValueChange={setTransformer}>
              <SelectTrigger className="flex-1 h-12 focus-visible:ring-0 border border-gray-300">
                <SelectValue placeholder="AN-473A" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">ทั้งหมด</SelectItem>
                <SelectItem value="t1">AN-472A</SelectItem>
                <SelectItem value="t2">AN-473A</SelectItem>
                <SelectItem value="t3">AN-472B</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Group by section */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-800 mb-6">เลือกการแบ่งกลุ่ม (แบ่งตาม)</h3>
          
          <div className="flex items-center gap-4 max-w-md">
            <Label className="w-20 text-gray-700 font-medium text-base whitespace-nowrap">แบ่งตาม :</Label>
            <Select value={groupBy} onValueChange={setGroupBy}>
              <SelectTrigger className="flex-1 h-12 focus-visible:ring-0 border border-gray-300">
                <SelectValue placeholder="บริษัทผู้ผลิต" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="region">เขต</SelectItem>
                <SelectItem value="station">สถานีไฟฟ้า</SelectItem>
                <SelectItem value="manufacturer">บริษัทผู้ผลิต</SelectItem>
                <SelectItem value="age">อายุการใช้งาน</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Generate report button */}
        <div className="flex justify-center">
          <Button 
            onClick={handleGenerateReport} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 text-lg font-medium rounded-md"
          >
            แสดงรายงาน
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;
