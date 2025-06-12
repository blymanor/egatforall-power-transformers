
import React from "react";
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
  region: string;
  setRegion: (value: string) => void;
  station: string;
  setStation: (value: string) => void;
  manufacturer: string;
  setManufacturer: (value: string) => void;
  transformer: string;
  setTransformer: (value: string) => void;
  groupBy: string;
  setGroupBy: (value: string) => void;
  onGenerateReport: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({
  region,
  setRegion,
  station,
  setStation,
  manufacturer,
  setManufacturer,
  transformer,
  setTransformer,
  groupBy,
  setGroupBy,
  onGenerateReport,
}) => {
  return (
    <div className="space-y-8">
      {/* Single main header */}
      <div>
        <h3 className="text-2xl font-bold text-black mb-8">เลือกเงื่อนไขในการสร้างรายงาน</h3>
        
        {/* Report criteria section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex items-center gap-4">
              <Label className="w-32 text-gray-700 font-medium">เขต :</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="w-52 focus-visible:ring-0 border border-gray-300">
                  <SelectValue placeholder="ทั้งหมด" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="north">ภาคเหนือ</SelectItem>
                  <SelectItem value="northeast">ภาคตะวันออกเฉียงเหนือ</SelectItem>
                  <SelectItem value="central">ภาคกลาง</SelectItem>
                  <SelectItem value="south">ภาคใต้</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Label className="w-32 text-gray-700 font-medium">สถานีไฟฟ้า :</Label>
              <Select value={station} onValueChange={setStation}>
                <SelectTrigger className="w-52 focus-visible:ring-0 border border-gray-300">
                  <SelectValue placeholder="ทั้งหมด" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="station1">สถานีไฟฟ้า 1</SelectItem>
                  <SelectItem value="station2">สถานีไฟฟ้า 2</SelectItem>
                  <SelectItem value="station3">สถานีไฟฟ้า 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Label className="w-32 text-gray-700 font-medium">บริษัทผู้ผลิต :</Label>
              <Select value={manufacturer} onValueChange={setManufacturer}>
                <SelectTrigger className="w-52 focus-visible:ring-0 border border-gray-300">
                  <SelectValue placeholder="ทั้งหมด" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="abb">ABB</SelectItem>
                  <SelectItem value="siemens">Siemens</SelectItem>
                  <SelectItem value="hitachi">Hitachi</SelectItem>
                  <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Label className="w-32 text-gray-700 font-medium">หม้อแปลงไฟฟ้า :</Label>
              <Select value={transformer} onValueChange={setTransformer}>
                <SelectTrigger className="w-52 focus-visible:ring-0 border border-gray-300">
                  <SelectValue placeholder="ทั้งหมด" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="t1">AN-472A</SelectItem>
                  <SelectItem value="t2">AN-473A</SelectItem>
                  <SelectItem value="t3">AN-472B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Grouping selection section */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-black mb-4">เลือกการแบ่งกลุ่ม (แบ่งตาม)</h4>
          <div className="flex items-center gap-4">
            <Label className="w-32 text-gray-700 font-medium">แบ่งตาม :</Label>
            <Select value={groupBy} onValueChange={setGroupBy}>
              <SelectTrigger className="w-52 focus-visible:ring-0 border border-gray-300">
                <SelectValue placeholder="เลือกวิธีการแบ่งกลุ่ม" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="region">เขต</SelectItem>
                <SelectItem value="station">สถานีไฟฟ้า</SelectItem>
                <SelectItem value="manufacturer">บริษัทผู้ผลิต</SelectItem>
                <SelectItem value="age">อายุการใช้งาน</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Generate report button */}
        <div className="flex justify-center pt-4">
          <Button 
            onClick={onGenerateReport} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
          >
            แสดงรายงาน
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;
