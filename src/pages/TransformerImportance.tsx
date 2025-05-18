
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const importanceData = [
  {
    id: 1,
    transformerName: "AN-KT2A",
    recordDate: new Date("2023-08-15"),
  },
  {
    id: 2,
    transformerName: "AN-KT2B",
    recordDate: new Date("2023-09-10"),
  },
  {
    id: 3,
    transformerName: "AN-KT2C",
    recordDate: new Date("2023-10-05"),
  },
];

const TransformerImportance = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTransformer, setSelectedTransformer] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const loadFactorOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "6", label: "6" },
    { value: "12", label: "12" },
  ];

  const handleAddImportance = () => {
    setIsEditing(false);
    setSelectedItemId(null);
    setDate(new Date());
    setIsModalOpen(true);
  };

  const handleEditImportance = (id: number) => {
    setIsEditing(true);
    setSelectedItemId(id);
    const item = importanceData.find(item => item.id === id);
    if (item) {
      setSelectedTransformer(item.transformerName);
      setDate(item.recordDate);
    }
    setIsModalOpen(true);
  };

  const handleDeleteImportance = (id: number) => {
    toast({
      title: "ลบข้อมูลสำเร็จ",
      description: "ลบรายการความสำคัญของหม้อแปลงเรียบร้อยแล้ว",
    });
  };

  const handleSaveImportance = () => {
    toast({
      title: isEditing ? "แก้ไขข้อมูลสำเร็จ" : "บันทึกข้อมูลสำเร็จ",
      description: isEditing 
        ? "แก้ไขรายการความสำคัญของหม้อแปลงเรียบร้อยแล้ว" 
        : "บันทึกรายการความสำคัญของหม้อแปลงเรียบร้อยแล้ว",
    });
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="bg-[#f0f4fa] p-4 md:p-6">
        <div className="mb-2">
          <h2 className="text-xl font-semibold text-gray-800">รายการความสำคัญของหม้อแปลง</h2>
          <p className="text-gray-600">Transformer Importance Records</p>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <Card className="bg-white shadow-md rounded-lg overflow-hidden border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <Label className="w-40 font-medium">ชื่อหม้อแปลงไฟฟ้า :</Label>
                <Select>
                  <SelectTrigger className="w-full md:w-56 border border-gray-300">
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AN-KT2A">AN-KT2A</SelectItem>
                    <SelectItem value="AN-KT2B">AN-KT2B</SelectItem>
                    <SelectItem value="AN-KT2C">AN-KT2C</SelectItem>
                    <SelectItem value="AN-KT2D">AN-KT2D</SelectItem>
                    <SelectItem value="AN-KT2E">AN-KT2E</SelectItem>
                    <SelectItem value="AN-KT2F">AN-KT2F</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleAddImportance}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                เพิ่มรายการความสำคัญของหม้อแปลง
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px] text-center">ลำดับที่</TableHead>
                    <TableHead>ชื่อหม้อแปลงไฟฟ้า</TableHead>
                    <TableHead>วันที่บันทึก</TableHead>
                    <TableHead className="w-[100px] text-center">แก้ไขรายการ</TableHead>
                    <TableHead className="w-[100px] text-center">ลบรายการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {importanceData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell>{item.transformerName}</TableCell>
                      <TableCell>{format(item.recordDate, "dd/MM/yyyy")}</TableCell>
                      <TableCell className="text-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditImportance(item.id)}
                        >
                          <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteImportance(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal for Add/Edit Importance */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "แก้ไขรายการความสำคัญของหม้อแปลง" : "เพิ่มรายการความสำคัญของหม้อแปลง"}
            </DialogTitle>
            <DialogDescription>
              กรุณากรอกข้อมูลให้ครบถ้วน
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label className="w-32">ชื่อหม้อแปลง:</Label>
                <Select defaultValue={isEditing ? selectedTransformer : undefined}>
                  <SelectTrigger className="w-full border border-gray-300">
                    <SelectValue placeholder="เลือกหม้อแปลง" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AN-KT2A">AN-KT2A</SelectItem>
                    <SelectItem value="AN-KT2B">AN-KT2B</SelectItem>
                    <SelectItem value="AN-KT2C">AN-KT2C</SelectItem>
                    <SelectItem value="AN-KT2D">AN-KT2D</SelectItem>
                    <SelectItem value="AN-KT2E">AN-KT2E</SelectItem>
                    <SelectItem value="AN-KT2F">AN-KT2F</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Label className="w-32">วันที่บันทึก:</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "dd/MM/yyyy") : <span>เลือกวันที่</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Bus Voltage HV side [kV]:</Label>
                    <Select defaultValue={isEditing ? "115" : undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือก" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="115">115</SelectItem>
                        <SelectItem value="230">230</SelectItem>
                        <SelectItem value="500">500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>System Fault Level: HV side</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="kA" defaultValue={isEditing ? "40" : ""} />
                      <Input placeholder="MVA" defaultValue={isEditing ? "7975" : ""} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Bus Voltage LV side [kV]:</Label>
                    <Select defaultValue={isEditing ? "22" : undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือก" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="22">22</SelectItem>
                        <SelectItem value="33">33</SelectItem>
                        <SelectItem value="115">115</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>System Fault Level: LV side</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="kA" defaultValue={isEditing ? "25" : ""} />
                      <Input placeholder="MVA" defaultValue={isEditing ? "950" : ""} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Probability Of Force Outage Per Year:</Label>
                    <Select defaultValue={isEditing ? "medium" : undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือก" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">ต่ำ</SelectItem>
                        <SelectItem value="medium">กลาง</SelectItem>
                        <SelectItem value="high">สูง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Social Aspect:</Label>
                    <Select defaultValue={isEditing ? "medium" : undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือก" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">ต่ำ</SelectItem>
                        <SelectItem value="medium">กลาง</SelectItem>
                        <SelectItem value="high">สูง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Load Shedding:</Label>
                    <Select defaultValue={isEditing ? "medium" : undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือก" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">ต่ำ</SelectItem>
                        <SelectItem value="medium">กลาง</SelectItem>
                        <SelectItem value="high">สูง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Public Image:</Label>
                    <Select defaultValue={isEditing ? "medium" : undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือก" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">ต่ำ</SelectItem>
                        <SelectItem value="medium">กลาง</SelectItem>
                        <SelectItem value="high">สูง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>N-1 Criteria:</Label>
                    <Select defaultValue={isEditing ? "medium" : undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือก" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">ต่ำ</SelectItem>
                        <SelectItem value="medium">กลาง</SelectItem>
                        <SelectItem value="high">สูง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Application Use:</Label>
                    <Select defaultValue={isEditing ? "medium" : undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือก" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">ต่ำ</SelectItem>
                        <SelectItem value="medium">กลาง</SelectItem>
                        <SelectItem value="high">สูง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>System Stability:</Label>
                    <Select defaultValue={isEditing ? "medium" : undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือก" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">ต่ำ</SelectItem>
                        <SelectItem value="medium">กลาง</SelectItem>
                        <SelectItem value="high">สูง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Pollution:</Label>
                    <Select defaultValue={isEditing ? "medium" : undefined}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือก" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">ต่ำ</SelectItem>
                        <SelectItem value="medium">กลาง</SelectItem>
                        <SelectItem value="high">สูง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                <h3 className="text-lg font-medium mb-2">Damage Of Property</h3>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="fire-wall" defaultChecked={isEditing} />
                  <Label htmlFor="fire-wall">1. มีผนังกันไฟ (Fire Wall)</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="oil-pit" defaultChecked={isEditing} />
                  <Label htmlFor="oil-pit">2. มี Oil Pit</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="spacing" defaultChecked={isEditing} />
                  <Label className="text-sm leading-tight" htmlFor="spacing">
                    3. มีระยะห่างระหว่างหม้อแปลง &gt; 11 m สำหรับหม้อแปลง Loading และ &gt; 15m สำหรับหม้อแปลง Tie หรือไม่มีหม้อแปลงรอบข้าง
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="fire-system" defaultChecked={isEditing} />
                  <Label htmlFor="fire-system">4. มีระบบดับเพลิง หรือสารดับเพลิงที่พร้อมใช้งาน</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="none-above" />
                  <Label htmlFor="none-above">5. ไม่มีทั้ง 4 ข้อข้างต้น</Label>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                <h3 className="text-lg font-medium mb-2">Load Factor</h3>
                
                <div className="grid grid-cols-2 gap-4 items-center">
                  <Label htmlFor="lf-1">{"<= 0.6"}</Label>
                  <Select defaultValue={isEditing ? "3" : undefined}>
                    <SelectTrigger id="lf-1">
                      <SelectValue placeholder="จำนวนเดือน" />
                    </SelectTrigger>
                    <SelectContent>
                      {loadFactorOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4 items-center">
                  <Label htmlFor="lf-2">{"0.6 < LF <= 1"}</Label>
                  <Select defaultValue={isEditing ? "4" : undefined}>
                    <SelectTrigger id="lf-2">
                      <SelectValue placeholder="จำนวนเดือน" />
                    </SelectTrigger>
                    <SelectContent>
                      {loadFactorOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4 items-center">
                  <Label htmlFor="lf-3">{"1 < LF <= 1.2"}</Label>
                  <Select defaultValue={isEditing ? "3" : undefined}>
                    <SelectTrigger id="lf-3">
                      <SelectValue placeholder="จำนวนเดือน" />
                    </SelectTrigger>
                    <SelectContent>
                      {loadFactorOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4 items-center">
                  <Label htmlFor="lf-4">{"1.2 < LF <= 1.5"}</Label>
                  <Select defaultValue={isEditing ? "2" : undefined}>
                    <SelectTrigger id="lf-4">
                      <SelectValue placeholder="จำนวนเดือน" />
                    </SelectTrigger>
                    <SelectContent>
                      {loadFactorOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4 items-center">
                  <Label htmlFor="lf-5">{"< 1.5"}</Label>
                  <Select defaultValue={isEditing ? "0" : undefined}>
                    <SelectTrigger id="lf-5">
                      <SelectValue placeholder="จำนวนเดือน" />
                    </SelectTrigger>
                    <SelectContent>
                      {loadFactorOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              ยกเลิก
            </Button>
            <Button type="button" onClick={handleSaveImportance}>
              {isEditing ? "บันทึกการแก้ไข" : "บันทึกข้อมูล"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default TransformerImportance;
