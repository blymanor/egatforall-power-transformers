
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

const DamageReport = () => {
  const { toast } = useToast();
  const [selectedDateRange, setSelectedDateRange] = useState<"start" | "end" | null>(null);
  
  const form = useForm({
    defaultValues: {
      useCondition: false,
      region: "",
      powerStation: "",
      manufacturer: "",
      transformer: "",
      environment: "",
      usageState: "",
      abnormalDetail: "",
      damagePart: "",
      damageLevel: "",
      cause: "",
      management: "",
    },
  });

  // Function to handle form submission
  const onSubmit = (values: any) => {
    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "บันทึกข้อมูลความเสียหายเรียบร้อยแล้ว",
    });
    console.log(values);
  };

  return (
    <DashboardLayout
      pageTitle="รายงานข้อมูลความเสียหาย"
      pageDescription="Damage Report Information"
    >
      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border-0">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">รายงานข้อมูลความเสียหาย</h2>
            <p className="text-gray-600 text-center">กรุณาเลือกหนึ่งเงื่อนไขในการสร้างรายงาน</p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Date Range Selection Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-1 md:col-span-3">
                    <div className="flex text-blue-600 font-medium">เงื่อนไขตามคุณการใช้งาน</div>
                  </div>
                  <div>
                    <Button
                      type="button"
                      className={cn(
                        "w-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-50",
                        selectedDateRange === "start" && "border-blue-500"
                      )}
                      variant="outline"
                      onClick={() => setSelectedDateRange("start")}
                    >
                      ช่วงเวลาเริ่มต้น
                    </Button>
                  </div>
                  <div>
                    <Button
                      type="button"
                      className={cn(
                        "w-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-50",
                        selectedDateRange === "end" && "border-blue-500"
                      )}
                      variant="outline"
                      onClick={() => setSelectedDateRange("end")}
                    >
                      ช่วงเวลาสิ้นสุด
                    </Button>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <RadioGroup defaultValue="off">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="on" id="use-condition" />
                          <Label htmlFor="use-condition">ใช้เงื่อนไข</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                {/* Filter Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* First Column */}
                  <div className="space-y-6">
                    {/* Region */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">เขต :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="on">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="on" id="use-region" />
                            <Label htmlFor="use-region">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกเขต" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="north">ภาคเหนือ</SelectItem>
                        <SelectItem value="northeast">ภาคตะวันออกเฉียงเหนือ</SelectItem>
                        <SelectItem value="central">ภาคกลาง</SelectItem>
                        <SelectItem value="south">ภาคใต้</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Manufacturer */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">บริษัทผู้ผลิต :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="on" id="use-manufacturer" />
                            <Label htmlFor="use-manufacturer">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกบริษัทผู้ผลิต" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="siemens">Siemens</SelectItem>
                        <SelectItem value="abb">ABB</SelectItem>
                        <SelectItem value="toshiba">Toshiba</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Environment */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">สภาพแวดล้อม :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="on" id="use-environment" />
                            <Label htmlFor="use-environment">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกสภาพแวดล้อม" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="indoor">Indoor</SelectItem>
                        <SelectItem value="outdoor">Outdoor</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Abnormal Detail */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">รายละเอียดความผิดปกติ :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="on" id="use-abnormal" />
                            <Label htmlFor="use-abnormal">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกรายละเอียดความผิดปกติ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="detail1">รายละเอียด 1</SelectItem>
                        <SelectItem value="detail2">รายละเอียด 2</SelectItem>
                        <SelectItem value="detail3">รายละเอียด 3</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Damage Part */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">ชิ้นส่วนที่เสียหาย :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="on" id="use-part" />
                            <Label htmlFor="use-part">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกชิ้นส่วนที่เสียหาย" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="part1">HV Winding</SelectItem>
                        <SelectItem value="part2">LV Winding</SelectItem>
                        <SelectItem value="part3">TV Winding</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Cause */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">สาเหตุที่เกิดจริง :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="on" id="use-cause" />
                            <Label htmlFor="use-cause">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกสาเหตุที่เกิดจริง" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cause1">สาเหตุ 1</SelectItem>
                        <SelectItem value="cause2">สาเหตุ 2</SelectItem>
                        <SelectItem value="cause3">สาเหตุ 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Second Column */}
                  <div className="space-y-6">
                    {/* Power Station */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">สถานีไฟฟ้า :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="on" id="use-station" />
                            <Label htmlFor="use-station">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกสถานีไฟฟ้า" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="station1">สถานีไฟฟ้า 1</SelectItem>
                        <SelectItem value="station2">สถานีไฟฟ้า 2</SelectItem>
                        <SelectItem value="station3">สถานีไฟฟ้า 3</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Transformer */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">หม้อแปลงไฟฟ้า :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="on" id="use-transformer" />
                            <Label htmlFor="use-transformer">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="transformer1">หม้อแปลงไฟฟ้า 1</SelectItem>
                        <SelectItem value="transformer2">หม้อแปลงไฟฟ้า 2</SelectItem>
                        <SelectItem value="transformer3">หม้อแปลงไฟฟ้า 3</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Usage State */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">สถานะการใช้งาน :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="on" id="use-state" />
                            <Label htmlFor="use-state">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกสถานะการใช้งาน" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">ใช้งาน</SelectItem>
                        <SelectItem value="inactive">ไม่ใช้งาน</SelectItem>
                        <SelectItem value="maintenance">ซ่อมบำรุง</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Equipment */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">กลุ่มอุปกรณ์ :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="on" id="use-equipment" />
                            <Label htmlFor="use-equipment">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกกลุ่มอุปกรณ์" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="group1">กลุ่ม 1</SelectItem>
                        <SelectItem value="group2">กลุ่ม 2</SelectItem>
                        <SelectItem value="group3">กลุ่ม 3</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Damage Level */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">ระดับความเสียหาย :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="on" id="use-level" />
                            <Label htmlFor="use-level">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกระดับความเสียหาย" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">ต่ำ</SelectItem>
                        <SelectItem value="medium">กลาง</SelectItem>
                        <SelectItem value="high">สูง</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Management */}
                    <div className="flex justify-between items-center">
                      <Label className="text-gray-700">การจัดการ :</Label>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="off">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="on" id="use-management" />
                            <Label htmlFor="use-management">ใช้เงื่อนไข</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="เลือกการจัดการ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manage1">การจัดการ 1</SelectItem>
                        <SelectItem value="manage2">การจัดการ 2</SelectItem>
                        <SelectItem value="manage3">การจัดการ 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Summary Section */}
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h3 className="text-lg font-medium mb-2">สรุปเงื่อนไข</h3>
                  <p className="text-gray-700">เงื่อนไขที่เลือก:</p>
                  <p className="text-blue-600">เขต</p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    className="w-full max-w-md bg-blue-600 hover:bg-blue-700"
                  >
                    สร้างรายงาน
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DamageReport;
