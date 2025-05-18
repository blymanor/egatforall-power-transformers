
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Mock data for demonstration
const transformerOptions = [
  { id: "t1", name: "หม้อแปลงไฟฟ้า A" },
  { id: "t2", name: "หม้อแปลงไฟฟ้า B" },
  { id: "t3", name: "หม้อแปลงไฟฟ้า C" },
  { id: "t4", name: "หม้อแปลงไฟฟ้า D" },
];

const mockData = [
  {
    id: "1",
    transformerName: "หม้อแปลงไฟฟ้า A",
    date: "2023-05-16",
    busVoltageHV: "115",
    faultLevelHVKA: "40",
    faultLevelHVMVA: "7962",
    busVoltageLV: "22",
    faultLevelLVKA: "25",
    faultLevelLVMVA: "950",
    probabilityOutage: "1",
    socialAspect: "high",
    loadShedding: "medium",
    publicImage: "high",
    n1Criteria: "important",
    applicationUse: "very-important",
    systemStability: "critical",
    pollution: "medium",
    damageProperty: [true, true, false, true, false],
    loadFactor: {
      "0.6": "3",
      "0.6-1": "6",
      "1-1.2": "2",
      "1.2-1.5": "1",
      ">1.5": "0",
    },
  },
  {
    id: "2",
    transformerName: "หม้อแปลงไฟฟ้า B",
    date: "2023-06-22",
    busVoltageHV: "230",
    faultLevelHVKA: "50",
    faultLevelHVMVA: "19899",
    busVoltageLV: "115",
    faultLevelLVKA: "40",
    faultLevelLVMVA: "7962",
    probabilityOutage: "2",
    socialAspect: "medium",
    loadShedding: "high",
    publicImage: "medium",
    n1Criteria: "very-important",
    applicationUse: "important",
    systemStability: "high",
    pollution: "low",
    damageProperty: [false, true, true, true, false],
    loadFactor: {
      "0.6": "4",
      "0.6-1": "5",
      "1-1.2": "3",
      "1.2-1.5": "0",
      ">1.5": "0",
    },
  },
];

interface RecordType {
  id: string;
  transformerName: string;
  date: string;
  busVoltageHV: string;
  faultLevelHVKA: string;
  faultLevelHVMVA: string;
  busVoltageLV: string;
  faultLevelLVKA: string;
  faultLevelLVMVA: string;
  probabilityOutage: string;
  socialAspect: string;
  loadShedding: string;
  publicImage: string;
  n1Criteria: string;
  applicationUse: string;
  systemStability: string;
  pollution: string;
  damageProperty: boolean[];
  loadFactor: {
    "0.6": string;
    "0.6-1": string;
    "1-1.2": string;
    "1.2-1.5": string;
    ">1.5": string;
  };
}

const TransformerImportance = () => {
  const { toast } = useToast();
  const [selectedTransformer, setSelectedTransformer] = useState("");
  const [records, setRecords] = useState<RecordType[]>(mockData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<RecordType | null>(null);

  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  const handleAddNewRecord = () => {
    const emptyRecord: RecordType = {
      id: generateRandomId(),
      transformerName: selectedTransformer,
      date: new Date().toISOString().split("T")[0],
      busVoltageHV: "",
      faultLevelHVKA: "",
      faultLevelHVMVA: "",
      busVoltageLV: "",
      faultLevelLVKA: "",
      faultLevelLVMVA: "",
      probabilityOutage: "",
      socialAspect: "",
      loadShedding: "",
      publicImage: "",
      n1Criteria: "",
      applicationUse: "",
      systemStability: "",
      pollution: "",
      damageProperty: [false, false, false, false, false],
      loadFactor: {
        "0.6": "",
        "0.6-1": "",
        "1-1.2": "",
        "1.2-1.5": "",
        ">1.5": "",
      },
    };

    setEditingRecord(emptyRecord);
    setIsDialogOpen(true);
  };

  const handleEditRecord = (record: RecordType) => {
    setEditingRecord({ ...record });
    setIsDialogOpen(true);
  };

  const handleDeleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
    toast({
      title: "ลบรายการสำเร็จ",
      description: "ลบข้อมูลความสำคัญของหม้อแปลงเรียบร้อยแล้ว",
    });
  };

  const handleSaveRecord = () => {
    if (editingRecord) {
      if (records.some((r) => r.id === editingRecord.id)) {
        // Update existing record
        setRecords((prev) =>
          prev.map((record) =>
            record.id === editingRecord.id ? editingRecord : record
          )
        );
        toast({
          title: "แก้ไขรายการสำเร็จ",
          description: "อัปเดตข้อมูลความสำคัญของหม้อแปลงเรียบร้อยแล้ว",
        });
      } else {
        // Add new record
        setRecords((prev) => [...prev, editingRecord]);
        toast({
          title: "เพิ่มรายการสำเร็จ",
          description: "บันทึกข้อมูลความสำคัญของหม้อแปลงเรียบร้อยแล้ว",
        });
      }
      setIsDialogOpen(false);
      setEditingRecord(null);
    }
  };

  const handleDamagePropertyChange = (index: number, checked: boolean) => {
    if (editingRecord) {
      const newDamageProperty = [...editingRecord.damageProperty];
      newDamageProperty[index] = checked;
      setEditingRecord({ ...editingRecord, damageProperty: newDamageProperty });
    }
  };

  const handleLoadFactorChange = (key: keyof RecordType['loadFactor'], value: string) => {
    if (editingRecord) {
      setEditingRecord({
        ...editingRecord,
        loadFactor: { ...editingRecord.loadFactor, [key]: value },
      });
    }
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
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <Label htmlFor="transformer-select" className="whitespace-nowrap">
                  ชื่อหม้อแปลงไฟฟ้า :
                </Label>
                <Select
                  value={selectedTransformer}
                  onValueChange={setSelectedTransformer}
                >
                  <SelectTrigger id="transformer-select" className="w-full md:w-[250px]">
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent>
                    {transformerOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleAddNewRecord} 
                className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
              >
                เพิ่มรายการความสำคัญของหม้อแปลง
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 p-2 text-center">ลำดับที่</th>
                    <th className="border border-slate-200 p-2 text-left">ชื่อหม้อแปลงไฟฟ้า</th>
                    <th className="border border-slate-200 p-2 text-center">วันที่บันทึก</th>
                    <th className="border border-slate-200 p-2 text-center">แก้ไขรายการ</th>
                    <th className="border border-slate-200 p-2 text-center">ลบรายการ</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr key={record.id} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="border border-slate-200 p-2 text-center">{index + 1}</td>
                      <td className="border border-slate-200 p-2">
                        {transformerOptions.find((t) => t.id === record.transformerName)?.name || record.transformerName}
                      </td>
                      <td className="border border-slate-200 p-2 text-center">{record.date}</td>
                      <td className="border border-slate-200 p-2 text-center">
                        <Button 
                          onClick={() => handleEditRecord(record)}
                          variant="outline" 
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          size="sm"
                        >
                          แก้ไข
                        </Button>
                      </td>
                      <td className="border border-slate-200 p-2 text-center">
                        <Button 
                          onClick={() => handleDeleteRecord(record.id)}
                          variant="outline" 
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          size="sm"
                        >
                          ลบ
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal for adding/editing records */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRecord && records.some((r) => r.id === editingRecord.id)
                ? "แก้ไขรายการความสำคัญของหม้อแปลง"
                : "เพิ่มรายการความสำคัญของหม้อแปลง"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Left column */}
            <div className="space-y-4">
              {/* Transformer and Date */}
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="transformer-name">ชื่อหม้อแปลง</Label>
                  <Select
                    value={editingRecord?.transformerName}
                    onValueChange={(value) =>
                      editingRecord && setEditingRecord({ ...editingRecord, transformerName: value })
                    }
                  >
                    <SelectTrigger id="transformer-name">
                      <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                    </SelectTrigger>
                    <SelectContent>
                      {transformerOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="record-date">วันที่บันทึก</Label>
                  <Input
                    id="record-date"
                    type="date"
                    value={editingRecord?.date}
                    onChange={(e) =>
                      editingRecord && setEditingRecord({ ...editingRecord, date: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* HV Side */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Bus Voltage HV side [kV]:</Label>
                  <Select
                    value={editingRecord?.busVoltageHV}
                    onValueChange={(value) =>
                      editingRecord && setEditingRecord({ ...editingRecord, busVoltageHV: value })
                    }
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="เลือก" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="69">69</SelectItem>
                      <SelectItem value="115">115</SelectItem>
                      <SelectItem value="230">230</SelectItem>
                      <SelectItem value="500">500</SelectItem>
                    </SelectContent>
                  </Select>

                  <Label className="ml-4">System Fault Level: HV side</Label>
                  <Input
                    className="w-20"
                    placeholder="kA"
                    value={editingRecord?.faultLevelHVKA}
                    onChange={(e) =>
                      editingRecord && setEditingRecord({ ...editingRecord, faultLevelHVKA: e.target.value })
                    }
                  />
                  <Input
                    className="w-20"
                    placeholder="MVA"
                    value={editingRecord?.faultLevelHVMVA}
                    onChange={(e) =>
                      editingRecord && setEditingRecord({ ...editingRecord, faultLevelHVMVA: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* LV Side */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Bus Voltage LV side [kV]:</Label>
                  <Select
                    value={editingRecord?.busVoltageLV}
                    onValueChange={(value) =>
                      editingRecord && setEditingRecord({ ...editingRecord, busVoltageLV: value })
                    }
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="เลือก" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="22">22</SelectItem>
                      <SelectItem value="33">33</SelectItem>
                      <SelectItem value="69">69</SelectItem>
                      <SelectItem value="115">115</SelectItem>
                    </SelectContent>
                  </Select>

                  <Label className="ml-4">System Fault Level: LV side</Label>
                  <Input
                    className="w-20"
                    placeholder="kA"
                    value={editingRecord?.faultLevelLVKA}
                    onChange={(e) =>
                      editingRecord && setEditingRecord({ ...editingRecord, faultLevelLVKA: e.target.value })
                    }
                  />
                  <Input
                    className="w-20"
                    placeholder="MVA"
                    value={editingRecord?.faultLevelLVMVA}
                    onChange={(e) =>
                      editingRecord && setEditingRecord({ ...editingRecord, faultLevelLVMVA: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Probability and Social */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Probability Of Force Outage Per Year:</Label>
                  <Select
                    value={editingRecord?.probabilityOutage}
                    onValueChange={(value) =>
                      editingRecord && setEditingRecord({ ...editingRecord, probabilityOutage: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือก" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 ครั้ง/ปี</SelectItem>
                      <SelectItem value="2">2 ครั้ง/ปี</SelectItem>
                      <SelectItem value="3">3 ครั้ง/ปี</SelectItem>
                      <SelectItem value="4">มากกว่า 3 ครั้ง/ปี</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Social Aspect:</Label>
                  <Select
                    value={editingRecord?.socialAspect}
                    onValueChange={(value) =>
                      editingRecord && setEditingRecord({ ...editingRecord, socialAspect: value })
                    }
                  >
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

              {/* Load Shedding and Public Image */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Load Shedding:</Label>
                  <Select
                    value={editingRecord?.loadShedding}
                    onValueChange={(value) =>
                      editingRecord && setEditingRecord({ ...editingRecord, loadShedding: value })
                    }
                  >
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
                <div className="space-y-2">
                  <Label>Public Image:</Label>
                  <Select
                    value={editingRecord?.publicImage}
                    onValueChange={(value) =>
                      editingRecord && setEditingRecord({ ...editingRecord, publicImage: value })
                    }
                  >
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

            {/* Right column */}
            <div className="space-y-4">
              {/* N-1 Criteria and Application Use */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>N-1 Criteria:</Label>
                  <Select
                    value={editingRecord?.n1Criteria}
                    onValueChange={(value) =>
                      editingRecord && setEditingRecord({ ...editingRecord, n1Criteria: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือก" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-important">ไม่สำคัญ</SelectItem>
                      <SelectItem value="important">สำคัญ</SelectItem>
                      <SelectItem value="very-important">สำคัญมาก</SelectItem>
                      <SelectItem value="critical">วิกฤติ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Application Use:</Label>
                  <Select
                    value={editingRecord?.applicationUse}
                    onValueChange={(value) =>
                      editingRecord && setEditingRecord({ ...editingRecord, applicationUse: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือก" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-important">ไม่สำคัญ</SelectItem>
                      <SelectItem value="important">สำคัญ</SelectItem>
                      <SelectItem value="very-important">สำคัญมาก</SelectItem>
                      <SelectItem value="critical">วิกฤติ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* System Stability and Pollution */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>System Stability:</Label>
                  <Select
                    value={editingRecord?.systemStability}
                    onValueChange={(value) =>
                      editingRecord && setEditingRecord({ ...editingRecord, systemStability: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือก" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">ต่ำ</SelectItem>
                      <SelectItem value="medium">กลาง</SelectItem>
                      <SelectItem value="high">สูง</SelectItem>
                      <SelectItem value="critical">วิกฤติ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Pollution:</Label>
                  <Select
                    value={editingRecord?.pollution}
                    onValueChange={(value) =>
                      editingRecord && setEditingRecord({ ...editingRecord, pollution: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือก" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">ต่ำ</SelectItem>
                      <SelectItem value="medium">ปานกลาง</SelectItem>
                      <SelectItem value="high">สูง</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Damage of Property */}
              <div className="space-y-4 mt-6">
                <h3 className="font-medium text-gray-800">Damage Of Property</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="damage-1"
                      checked={editingRecord?.damageProperty[0]}
                      onCheckedChange={(checked) => 
                        handleDamagePropertyChange(0, checked === true)
                      }
                    />
                    <Label htmlFor="damage-1">1. มีผนังกันไฟ (Fire Wall)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="damage-2" 
                      checked={editingRecord?.damageProperty[1]}
                      onCheckedChange={(checked) => 
                        handleDamagePropertyChange(1, checked === true)
                      }
                    />
                    <Label htmlFor="damage-2">2. มี Oil Pit</Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="damage-3" 
                      className="mt-1"
                      checked={editingRecord?.damageProperty[2]}
                      onCheckedChange={(checked) => 
                        handleDamagePropertyChange(2, checked === true)
                      }
                    />
                    <Label htmlFor="damage-3" className="text-sm">
                      3. มีระยะห่างระหว่างหม้อแปลง &gt; 11 m สำหรับหม้อแปลง Loading
                      <br />และ &gt; 15m สำหรับหม้อแปลง Tie หรือไม่มีหม้อแปลงรอบข้าง
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="damage-4" 
                      checked={editingRecord?.damageProperty[3]}
                      onCheckedChange={(checked) => 
                        handleDamagePropertyChange(3, checked === true)
                      }
                    />
                    <Label htmlFor="damage-4">4. มีระบบดับเพลิง หรือสารดับเพลิงที่พร้อมใช้งาน</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="damage-5" 
                      checked={editingRecord?.damageProperty[4]}
                      onCheckedChange={(checked) => 
                        handleDamagePropertyChange(4, checked === true)
                      }
                    />
                    <Label htmlFor="damage-5">5. ไม่มีทั้ง 4 ข้อข้างต้น</Label>
                  </div>
                </div>
              </div>

              {/* Load Factor */}
              <div className="space-y-4 mt-6">
                <h3 className="font-medium text-gray-800">Load Factor</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left pb-2 pr-4">Load Factor</th>
                        <th className="text-left pb-2">Number of Months</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 pr-4">&lt;= 0.6</td>
                        <td className="py-2">
                          <Select
                            value={editingRecord?.loadFactor["0.6"]}
                            onValueChange={(value) => handleLoadFactorChange("0.6", value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="เลือก" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({length: 13}).map((_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                  {i}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">0.6 &lt; LF &lt;= 1</td>
                        <td className="py-2">
                          <Select
                            value={editingRecord?.loadFactor["0.6-1"]}
                            onValueChange={(value) => handleLoadFactorChange("0.6-1", value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="เลือก" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({length: 13}).map((_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                  {i}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">1 &lt; LF &lt;= 1.2</td>
                        <td className="py-2">
                          <Select
                            value={editingRecord?.loadFactor["1-1.2"]}
                            onValueChange={(value) => handleLoadFactorChange("1-1.2", value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="เลือก" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({length: 13}).map((_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                  {i}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">1.2 &lt; LF &lt;= 1.5</td>
                        <td className="py-2">
                          <Select
                            value={editingRecord?.loadFactor["1.2-1.5"]}
                            onValueChange={(value) => handleLoadFactorChange("1.2-1.5", value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="เลือก" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({length: 13}).map((_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                  {i}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">&gt; 1.5</td>
                        <td className="py-2">
                          <Select
                            value={editingRecord?.loadFactor[">1.5"]}
                            onValueChange={(value) => handleLoadFactorChange(">1.5", value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="เลือก" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({length: 13}).map((_, i) => (
                                <SelectItem key={i} value={i.toString()}>
                                  {i}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
              ยกเลิก
            </Button>
            <Button 
              type="button" 
              onClick={handleSaveRecord} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              บันทึก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default TransformerImportance;
