
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

const TransformerMaintenanceSearch = () => {
  const [searchType, setSearchType] = useState("equipment");
  const [keyword, setKeyword] = useState("");
  const [testType, setTestType] = useState("");
  const [transformerName, setTransformerName] = useState("");
  const [inspectionType, setInspectionType] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [inspector, setInspector] = useState("");
  const [operationId, setOperationId] = useState("");

  // Mock data for dropdowns
  const testTypes = ["Please Select...", "Oil Test", "Electrical Test", "Visual Inspection"];
  const transformers = ["AN-KT1A", "BN-KT1B", "CN-KT1C"];
  const inspectionTypes = ["Weekly Test", "Monthly Test", "Yearly Test"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("กำลังค้นหาข้อมูล", {
      description: "กำลังประมวลผลการค้นหา",
    });
  };

  const handleVisualInspectionSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("กำลังค้นหาข้อมูล Visual Inspection", {
      description: "กำลังประมวลผลการค้นหา",
    });
  };

  const handleDoneClick = () => {
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: "ข้อมูลการตรวจสอบได้รับการบันทึกเรียบร้อยแล้ว",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-blue-700 mb-6">ค้นหาข้อมูลบำรุงรักษาหม้อแปลง</h1>
        
        <Card className="mb-6">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-lg text-blue-700">ค้นหาข้อมูลหม้อแปลงไฟฟ้า</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <Label htmlFor="keyword" className="text-base font-medium">คำสำคัญ :</Label>
                <Input 
                  id="keyword" 
                  className="mt-1 w-full md:w-1/2"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-base font-medium">ค้นหาโดย :</Label>
                <RadioGroup 
                  value={searchType}
                  onValueChange={setSearchType}
                  className="flex flex-row gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="equipment" id="equipment" />
                    <Label htmlFor="equipment">Equipment No.</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="name" id="name" />
                    <Label htmlFor="name">ชื่อหม้อแปลง</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="station" id="station" />
                    <Label htmlFor="station">สถานีไฟฟ้า</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex justify-start mt-4">
                <Button type="submit" className="px-8 bg-blue-600 hover:bg-blue-700">
                  Search
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-lg text-blue-700">ค้นหาข้อมูลการทดสอบหม้อแปลงไฟฟ้า</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="testType" className="text-base font-medium">ชนิดการทดสอบ :</Label>
                <Select
                  value={testType}
                  onValueChange={setTestType}
                >
                  <SelectTrigger className="w-full md:w-1/2">
                    <SelectValue placeholder="Please Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {testTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, "-")}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="transformerName" className="text-base font-medium">ชื่อหม้อแปลงไฟฟ้า :</Label>
                <Select
                  value={transformerName}
                  onValueChange={setTransformerName}
                >
                  <SelectTrigger className="w-full md:w-1/2">
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent>
                    {transformers.map((transformer) => (
                      <SelectItem key={transformer} value={transformer}>
                        {transformer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-start mt-4">
                <Button type="submit" className="px-8 bg-blue-600 hover:bg-blue-700">
                  Search
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-lg text-blue-700">
              เลือกหม้อแปลงไฟฟ้าเพื่อกรอกข้อมูลการทดสอบ Visual Inspection
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleVisualInspectionSearch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inspectionTransformer" className="text-base font-medium">ชื่อหม้อแปลงไฟฟ้า :</Label>
                <Select
                  value={transformerName}
                  onValueChange={setTransformerName}
                >
                  <SelectTrigger className="w-full md:w-1/2">
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent>
                    {transformers.map((transformer) => (
                      <SelectItem key={transformer} value={transformer}>
                        {transformer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inspectionType" className="text-base font-medium">รูปแบบการทดสอบ :</Label>
                <Select
                  value={inspectionType}
                  onValueChange={setInspectionType}
                >
                  <SelectTrigger className="w-full md:w-1/2">
                    <SelectValue placeholder="เลือกรูปแบบการทดสอบ" />
                  </SelectTrigger>
                  <SelectContent>
                    {inspectionTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, "-")}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inspectionDate" className="text-base font-medium">วันที่ตรวจสอบ :</Label>
                <Input 
                  id="inspectionDate" 
                  type="date"
                  className="mt-1 w-full md:w-1/2"
                  value={inspectionDate}
                  onChange={(e) => setInspectionDate(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inspector" className="text-base font-medium">ผู้ตรวจสอบ :</Label>
                <Input 
                  id="inspector" 
                  className="mt-1 w-full md:w-1/2"
                  value={inspector}
                  onChange={(e) => setInspector(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="operationId" className="text-base font-medium">เลขที่สั่งปฏิบัติงาน :</Label>
                <Input 
                  id="operationId" 
                  className="mt-1 w-full md:w-1/2"
                  value={operationId}
                  onChange={(e) => setOperationId(e.target.value)}
                />
              </div>
              
              <div className="flex justify-start mt-4">
                <Button 
                  onClick={handleDoneClick} 
                  className="px-8 bg-blue-600 hover:bg-blue-700"
                >
                  Done
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransformerMaintenanceSearch;
