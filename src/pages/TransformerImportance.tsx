
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Mock data for the table matching image 1
const importanceData = [
  {
    id: 1,
    no: 1,
    transformer: "AN-KT2A",
    date: "15/08/2023"
  },
  {
    id: 2,
    no: 2,
    transformer: "AN-KT2B",
    date: "10/09/2023"
  },
  {
    id: 3,
    no: 3,
    transformer: "AN-KT2C",
    date: "05/10/2023"
  },
  {
    id: 4,
    no: 4,
    transformer: "AN-KT2D",
    date: "20/11/2023"
  },
  {
    id: 5,
    no: 5,
    transformer: "AN-KT2E",
    date: "15/12/2023"
  },
  {
    id: 6,
    no: 6,
    transformer: "AN-KT2F",
    date: "05/01/2024"
  }
];

const TransformerImportance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    transformer: "",
    date: "",
    busVoltageHV: "",
    systemFaultHV: "",
    busVoltageLV: "",
    systemFaultLV: "",
    probabilityForceOutage: "",
    socialAspect: "",
    loadShedding: "",
    publicImage: "",
    n1Criteria: "",
    applicationUse: "",
    systemStability: "",
    pollution: "",
    damageProperty: [] as string[],
    loadFactor1: "",
    loadFactor2: "",
    loadFactor3: "",
    loadFactor4: "",
    loadFactor5: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      toast.success("แก้ไขข้อมูลสำเร็จ");
    } else {
      toast.success("เพิ่มข้อมูลสำเร็จ");
    }
    
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      transformer: "",
      date: "",
      busVoltageHV: "",
      systemFaultHV: "",
      busVoltageLV: "",
      systemFaultLV: "",
      probabilityForceOutage: "",
      socialAspect: "",
      loadShedding: "",
      publicImage: "",
      n1Criteria: "",
      applicationUse: "",
      systemStability: "",
      pollution: "",
      damageProperty: [],
      loadFactor1: "",
      loadFactor2: "",
      loadFactor3: "",
      loadFactor4: "",
      loadFactor5: ""
    });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      transformer: item.transformer,
      date: item.date,
      busVoltageHV: "",
      systemFaultHV: "",
      busVoltageLV: "",
      systemFaultLV: "",
      probabilityForceOutage: "",
      socialAspect: "",
      loadShedding: "",
      publicImage: "",
      n1Criteria: "",
      applicationUse: "",
      systemStability: "",
      pollution: "",
      damageProperty: [],
      loadFactor1: "",
      loadFactor2: "",
      loadFactor3: "",
      loadFactor4: "",
      loadFactor5: ""
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    toast.success("ลบข้อมูลสำเร็จ");
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({
      transformer: "",
      date: "",
      busVoltageHV: "",
      systemFaultHV: "",
      busVoltageLV: "",
      systemFaultLV: "",
      probabilityForceOutage: "",
      socialAspect: "",
      loadShedding: "",
      publicImage: "",
      n1Criteria: "",
      applicationUse: "",
      systemStability: "",
      pollution: "",
      damageProperty: [],
      loadFactor1: "",
      loadFactor2: "",
      loadFactor3: "",
      loadFactor4: "",
      loadFactor5: ""
    });
    setIsModalOpen(true);
  };

  const handleDamagePropertyChange = (value: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        damageProperty: [...prev.damageProperty, value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        damageProperty: prev.damageProperty.filter(item => item !== value)
      }));
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <Card className="max-w-6xl mx-auto">
          <CardHeader className="bg-blue-50 border-b">
            <CardTitle className="text-xl text-blue-700">ความสำคัญหม้อแปลง</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label className="text-sm">ชื่อหม้อแปลงไฟฟ้า :</Label>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="ทั้งหมด" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                      <SelectItem value="AN-KT2A">AN-KT2A</SelectItem>
                      <SelectItem value="AN-KT2B">AN-KT2B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700 text-white">
                    เพิ่มรายการความสำคัญของหม้อแปลง
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
                  <DialogHeader className="bg-blue-600 text-white p-4 -m-6 mb-6">
                    <DialogTitle className="text-xl font-medium text-center">
                      เพิ่มรายการความสำคัญของหม้อแปลง
                    </DialogTitle>
                    <p className="text-center text-blue-100">กรุณากรอกข้อมูลให้ครบถ้วน</p>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">ชื่อหม้อแปลง:</Label>
                        <Select value={formData.transformer} onValueChange={(value) => setFormData({...formData, transformer: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกหม้อแปลง" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="AN-KT2A">AN-KT2A</SelectItem>
                            <SelectItem value="AN-KT2B">AN-KT2B</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">วันที่บันทึก:</Label>
                        <Input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {/* System Parameters */}
                      <div className="p-4 bg-blue-50 rounded">
                        <h3 className="text-blue-700 font-medium mb-4">System Parameters</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-2 items-end">
                            <div>
                              <Label className="text-xs">Bus Voltage HV side [kV]:</Label>
                              <Select value={formData.busVoltageHV} onValueChange={(value) => setFormData({...formData, busVoltageHV: value})}>
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue placeholder="เลือก" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  <SelectItem value="115">115</SelectItem>
                                  <SelectItem value="230">230</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-xs">System Fault Level: HV side</Label>
                              <div className="grid grid-cols-2 gap-1">
                                <Input placeholder="kA" className="h-8 text-xs" />
                                <Input placeholder="MVA" className="h-8 text-xs" />
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 items-end">
                            <div>
                              <Label className="text-xs">Bus Voltage LV side [kV]:</Label>
                              <Select value={formData.busVoltageLV} onValueChange={(value) => setFormData({...formData, busVoltageLV: value})}>
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue placeholder="เลือก" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  <SelectItem value="22">22</SelectItem>
                                  <SelectItem value="33">33</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-xs">System Fault Level: LV side</Label>
                              <div className="grid grid-cols-2 gap-1">
                                <Input placeholder="kA" className="h-8 text-xs" />
                                <Input placeholder="MVA" className="h-8 text-xs" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Damage Of Property */}
                      <div className="p-4 bg-purple-50 rounded">
                        <h3 className="text-purple-700 font-medium mb-4">Damage Of Property</h3>
                        <div className="space-y-2">
                          {[
                            "1. มีผนังกันไฟ (Fire Wall)",
                            "2. มี Oil Pit",
                            "3. มีระยะห่างระหว่างหม้อแปลง > 11 m สำหรับหม้อแปลง Loading และ > 15m สำหรับหม้อแปลง Tie หรือไม่มีหม้อแปลงรอบข้าง",
                            "4. มีระบบดับเพลิง หรือสารดับเพลิงที่พร้อมใช้งาน",
                            "5. ไม่มีถัง 4 ข้อข้างต้น"
                          ].map((item) => (
                            <div key={item} className="flex items-center space-x-2">
                              <Checkbox 
                                checked={formData.damageProperty.includes(item)}
                                onCheckedChange={(checked) => handleDamagePropertyChange(item, checked as boolean)}
                              />
                              <Label className="text-xs">{item}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Operational Parameters */}
                    <div className="p-4 bg-blue-50 rounded">
                      <h3 className="text-blue-700 font-medium mb-4">Operational Parameters</h3>
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <Label className="text-xs">Probability Of Force Outage:</Label>
                          <Select value={formData.probabilityForceOutage} onValueChange={(value) => setFormData({...formData, probabilityForceOutage: value})}>
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="เลือก" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem value="low">ต่ำ</SelectItem>
                              <SelectItem value="medium">ปานกลาง</SelectItem>
                              <SelectItem value="high">สูง</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">Social Aspect:</Label>
                          <Select value={formData.socialAspect} onValueChange={(value) => setFormData({...formData, socialAspect: value})}>
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="เลือก" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem value="low">ต่ำ</SelectItem>
                              <SelectItem value="medium">ปานกลาง</SelectItem>
                              <SelectItem value="high">สูง</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">Load Shedding:</Label>
                          <Select value={formData.loadShedding} onValueChange={(value) => setFormData({...formData, loadShedding: value})}>
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="เลือก" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem value="low">ต่ำ</SelectItem>
                              <SelectItem value="medium">ปานกลาง</SelectItem>
                              <SelectItem value="high">สูง</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">Public Image:</Label>
                          <Select value={formData.publicImage} onValueChange={(value) => setFormData({...formData, publicImage: value})}>
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="เลือก" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem value="low">ต่ำ</SelectItem>
                              <SelectItem value="medium">ปานกลาง</SelectItem>
                              <SelectItem value="high">สูง</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">N-1 Criteria:</Label>
                          <Select value={formData.n1Criteria} onValueChange={(value) => setFormData({...formData, n1Criteria: value})}>
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="เลือก" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem value="low">ต่ำ</SelectItem>
                              <SelectItem value="medium">ปานกลาง</SelectItem>
                              <SelectItem value="high">สูง</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">Application Use:</Label>
                          <Select value={formData.applicationUse} onValueChange={(value) => setFormData({...formData, applicationUse: value})}>
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="เลือก" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem value="low">ต่ำ</SelectItem>
                              <SelectItem value="medium">ปานกลาง</SelectItem>
                              <SelectItem value="high">สูง</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">System Stability:</Label>
                          <Select value={formData.systemStability} onValueChange={(value) => setFormData({...formData, systemStability: value})}>
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="เลือก" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem value="low">ต่ำ</SelectItem>
                              <SelectItem value="medium">ปานกลาง</SelectItem>
                              <SelectItem value="high">สูง</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">Pollution:</Label>
                          <Select value={formData.pollution} onValueChange={(value) => setFormData({...formData, pollution: value})}>
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="เลือก" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem value="low">ต่ำ</SelectItem>
                              <SelectItem value="medium">ปานกลาง</SelectItem>
                              <SelectItem value="high">สูง</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Load Factor */}
                    <div className="p-4 bg-green-50 rounded">
                      <h3 className="text-green-700 font-medium mb-4">Load Factor</h3>
                      <div className="space-y-3">
                        {[
                          { label: "<= 0.6", value: "loadFactor1" },
                          { label: "0.6 < LF <= 1", value: "loadFactor2" },
                          { label: "1 < LF <= 1.2", value: "loadFactor3" },
                          { label: "1.2 < LF <= 1.5", value: "loadFactor4" },
                          { label: "< 1.5", value: "loadFactor5" }
                        ].map((item) => (
                          <div key={item.value} className="grid grid-cols-2 gap-4 items-center">
                            <Label className="text-sm">{item.label}</Label>
                            <Select 
                              value={formData[item.value as keyof typeof formData] as string} 
                              onValueChange={(value) => setFormData({...formData, [item.value]: value})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="จำนวนเดือน" />
                              </SelectTrigger>
                              <SelectContent className="bg-white">
                                <SelectItem value="1">1 เดือน</SelectItem>
                                <SelectItem value="3">3 เดือน</SelectItem>
                                <SelectItem value="6">6 เดือน</SelectItem>
                                <SelectItem value="12">12 เดือน</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsModalOpen(false)}
                        className="border-gray-200 text-gray-600 hover:bg-gray-50"
                      >
                        ยกเลิก
                      </Button>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                        บันทึกข้อมูล
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="text-center text-gray-700 w-16">No.</TableHead>
                    <TableHead className="text-center text-gray-700">ชื่อหม้อแปลงไฟฟ้า</TableHead>
                    <TableHead className="text-center text-gray-700">วันที่บันทึก</TableHead>
                    <TableHead className="text-center text-gray-700">แก้ไข</TableHead>
                    <TableHead className="text-center text-gray-700">ลบ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {importanceData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <TableCell className="text-center font-medium">{item.no}</TableCell>
                      <TableCell className="text-center">{item.transformer}</TableCell>
                      <TableCell className="text-center">{item.date}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
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
    </DashboardLayout>
  );
};

export default TransformerImportance;
