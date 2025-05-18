import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2, Plus } from "lucide-react";

// Mock data for transformer importance list
const mockTransformerImportanceData = [
  { id: 1, transformerName: "AN-KT2A", recordedDate: "28/05/2025" },
  { id: 2, transformerName: "AN-KT2A", recordedDate: "28/05/2025" },
  { id: 3, transformerName: "AN-KT2A", recordedDate: "28/05/2025" },
  { id: 4, transformerName: "AN-KT2A", recordedDate: "28/05/2025" }
];

// Mock data for transformers dropdown
const transformers = [
  { id: 1, name: "AN-KT2A" },
  { id: 2, name: "AN-472A" },
  { id: 3, name: "AN-473A" },
  { id: 4, name: "AN-474A" }
];

const TransformerImportance = () => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedTransformer, setSelectedTransformer] = useState("");
  
  // Form states
  const [formData, setFormData] = useState({
    transformerName: "",
    recordedDate: "",
    busVoltageHV: "115",
    systemFaultLevelHV: "",
    mvaHV: "",
    busVoltageLV: "22",
    systemFaultLevelLV: "",
    mvaLV: "",
    probabilityOfForceOutage: "1",
    socialAspect: "เมือง",
    loadShedding: "Step 2",
    publicImage: "Yes",
    n1Criteria: "No",
    applicationUse: "In-Service",
    systemStability: "Loading 115/22 or 33 kV",
    pollution: "High (25 mm/kV), ESDD: 0.04-0.15 mg/cm2",
    damageOfProperty: {
      fireWall: false,
      oilPit: false,
      spacing: false,
      fireExtinguisher: false,
      none: false
    },
    loadFactorMonths: {
      lessThan06: "0",
      between06And1: "0",
      between1And12: "0",
      between12And15: "0",
      greaterThan15: "0"
    }
  });
  
  // Handle modal open for adding new item
  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentItem(null);
    // Reset form data
    setFormData({
      transformerName: selectedTransformer || "",
      recordedDate: new Date().toISOString().split('T')[0],
      busVoltageHV: "115",
      systemFaultLevelHV: "",
      mvaHV: "",
      busVoltageLV: "22",
      systemFaultLevelLV: "",
      mvaLV: "",
      probabilityOfForceOutage: "1",
      socialAspect: "เมือง",
      loadShedding: "Step 2",
      publicImage: "Yes",
      n1Criteria: "No",
      applicationUse: "In-Service",
      systemStability: "Loading 115/22 or 33 kV",
      pollution: "High (25 mm/kV), ESDD: 0.04-0.15 mg/cm2",
      damageOfProperty: {
        fireWall: false,
        oilPit: false,
        spacing: false,
        fireExtinguisher: false,
        none: false
      },
      loadFactorMonths: {
        lessThan06: "0",
        between06And1: "0",
        between1And12: "0",
        between12And15: "0",
        greaterThan15: "0"
      }
    });
    setShowModal(true);
  };
  
  // Handle modal open for editing
  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
    // Populate form with item data (in a real app, you would fetch the complete data)
    setFormData({
      transformerName: item.transformerName,
      recordedDate: item.recordedDate.split('/').reverse().join('-'),
      busVoltageHV: "115",
      systemFaultLevelHV: "6.332",
      mvaHV: "1261.20",
      busVoltageLV: "22",
      systemFaultLevelLV: "8.308",
      mvaLV: "316.568",
      probabilityOfForceOutage: "1",
      socialAspect: "เมือง",
      loadShedding: "Step 2",
      publicImage: "Yes",
      n1Criteria: "No",
      applicationUse: "In-Service",
      systemStability: "Loading 115/22 or 33 kV",
      pollution: "High (25 mm/kV), ESDD: 0.04-0.15 mg/cm2",
      damageOfProperty: {
        fireWall: true,
        oilPit: false,
        spacing: false,
        fireExtinguisher: false,
        none: false
      },
      loadFactorMonths: {
        lessThan06: "12",
        between06And1: "0",
        between1And12: "0",
        between12And15: "0",
        greaterThan15: "0"
      }
    });
    setShowModal(true);
  };
  
  // Handle delete
  const handleDelete = (item) => {
    toast({
      title: "รายการถูกลบแล้ว",
      description: `รายการความสำคัญของหม้อแปลง ${item.transformerName} ถูกลบแล้ว`,
    });
  };
  
  // Handle save
  const handleSave = () => {
    toast({
      title: isEditing ? "บันทึกการแก้ไขสำเร็จ" : "เพิ่มรายการสำเร็จ",
      description: isEditing 
        ? `แก้ไขข้อมูลความสำคัญของหม้อแปลง ${formData.transformerName} เรียบร้อยแล้ว` 
        : `เพิ่มข้อมูลความสำคัญของหม้อแปลง ${formData.transformerName} เรียบร้อยแล้ว`,
    });
    setShowModal(false);
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (field) => {
    setFormData(prev => ({
      ...prev,
      damageOfProperty: {
        ...prev.damageOfProperty,
        [field]: !prev.damageOfProperty[field]
      }
    }));
  };
  
  // Handle input change
  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-[#f0f4fa] p-4 md:p-6">
        <div className="mb-2">
          <h2 className="text-xl font-semibold text-gray-800">รายการความสำคัญของหม้อแปลง</h2>
          <p className="text-gray-600">Transformer Importance List</p>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        {/* Search and Add Section */}
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Label className="whitespace-nowrap">ชื่อหม้อแปลงไฟฟ้า:</Label>
                <Select value={selectedTransformer} onValueChange={setSelectedTransformer}>
                  <SelectTrigger className="w-full sm:w-60 border border-gray-300">
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    {transformers.map((transformer) => (
                      <SelectItem key={transformer.id} value={transformer.name}>
                        {transformer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleAddNew}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                เพิ่มรายการความสำคัญของหม้อแปลง
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card className="mx-auto shadow-md rounded-xl overflow-hidden border-0">
          <CardContent className="p-4 md:p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gradient-to-r from-blue-50 to-white">
                  <TableRow>
                    <TableHead className="text-center w-16">ลำดับที่</TableHead>
                    <TableHead className="text-center">ชื่อหม้อแปลงไฟฟ้า</TableHead>
                    <TableHead className="text-center">วันที่บันทึก</TableHead>
                    <TableHead className="text-center w-28">แก้ไขรายการ</TableHead>
                    <TableHead className="text-center w-28">ลบรายการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTransformerImportanceData.map((item, index) => (
                    <TableRow key={item.id} className="hover:bg-blue-50/30">
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell className="text-center">{item.transformerName}</TableCell>
                      <TableCell className="text-center">{item.recordedDate}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full"
                        >
                          <Edit className="h-5 w-5" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 className="h-5 w-5" />
                          <span className="sr-only">Delete</span>
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

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {isEditing ? "แก้ไขข้อมูลความสำคัญของหม้อแปลง" : "เพิ่มข้อมูลความสำคัญของหม้อแปลง"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="transformer-name">ชื่อหม้อแปลง</Label>
                <Select 
                  value={formData.transformerName} 
                  onValueChange={(value) => handleInputChange('transformerName', value)}
                >
                  <SelectTrigger id="transformer-name" className="w-full border border-gray-300">
                    <SelectValue placeholder="เลือกหม้อแปลง" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    {transformers.map((transformer) => (
                      <SelectItem key={transformer.id} value={transformer.name}>
                        {transformer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recorded-date">วันที่บันทึก</Label>
                <Input
                  id="recorded-date"
                  type="date"
                  value={formData.recordedDate}
                  onChange={(e) => handleInputChange('recordedDate', e.target.value)}
                  className="border border-gray-300"
                />
              </div>
            </div>
            
            {/* HV Voltage Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Bus Voltage HV side [kV]</Label>
                <Select 
                  value={formData.busVoltageHV} 
                  onValueChange={(value) => handleInputChange('busVoltageHV', value)}
                >
                  <SelectTrigger className="w-full border border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    <SelectItem value="115">115</SelectItem>
                    <SelectItem value="230">230</SelectItem>
                    <SelectItem value="500">500</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>System Fault Level: HV side [kA]</Label>
                <Input
                  type="text"
                  value={formData.systemFaultLevelHV}
                  onChange={(e) => handleInputChange('systemFaultLevelHV', e.target.value)}
                  className="border border-gray-300"
                  placeholder="กรอกค่า"
                />
              </div>
              
              <div className="space-y-2">
                <Label>[MVA]</Label>
                <Input
                  type="text"
                  value={formData.mvaHV}
                  onChange={(e) => handleInputChange('mvaHV', e.target.value)}
                  className="border border-gray-300"
                  placeholder="กรอกค่า"
                />
              </div>
            </div>
            
            {/* LV Voltage Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Bus Voltage LV side [kV]</Label>
                <Select 
                  value={formData.busVoltageLV} 
                  onValueChange={(value) => handleInputChange('busVoltageLV', value)}
                >
                  <SelectTrigger className="w-full border border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    <SelectItem value="22">22</SelectItem>
                    <SelectItem value="33">33</SelectItem>
                    <SelectItem value="115">115</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>System Fault Level: LV side [kA]</Label>
                <Input
                  type="text"
                  value={formData.systemFaultLevelLV}
                  onChange={(e) => handleInputChange('systemFaultLevelLV', e.target.value)}
                  className="border border-gray-300"
                  placeholder="กรอกค่า"
                />
              </div>
              
              <div className="space-y-2">
                <Label>[MVA]</Label>
                <Input
                  type="text"
                  value={formData.mvaLV}
                  onChange={(e) => handleInputChange('mvaLV', e.target.value)}
                  className="border border-gray-300"
                  placeholder="กรอกค่า"
                />
              </div>
            </div>
            
            {/* Other Parameters - Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Probability Of Force Outage Per Year</Label>
                <Select 
                  value={formData.probabilityOfForceOutage} 
                  onValueChange={(value) => handleInputChange('probabilityOfForceOutage', value)}
                >
                  <SelectTrigger className="w-full border border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Social Aspect</Label>
                <Select 
                  value={formData.socialAspect} 
                  onValueChange={(value) => handleInputChange('socialAspect', value)}
                >
                  <SelectTrigger className="w-full border border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    <SelectItem value="เมือง">เมือง</SelectItem>
                    <SelectItem value="ชนบท">ชนบท</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Other Parameters - Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Load Shedding</Label>
                <Select 
                  value={formData.loadShedding} 
                  onValueChange={(value) => handleInputChange('loadShedding', value)}
                >
                  <SelectTrigger className="w-full border border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    <SelectItem value="Step 1">Step 1</SelectItem>
                    <SelectItem value="Step 2">Step 2</SelectItem>
                    <SelectItem value="Step 3">Step 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Public Image</Label>
                <Select 
                  value={formData.publicImage} 
                  onValueChange={(value) => handleInputChange('publicImage', value)}
                >
                  <SelectTrigger className="w-full border border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Other Parameters - Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>N-1 Criteria</Label>
                <Select 
                  value={formData.n1Criteria} 
                  onValueChange={(value) => handleInputChange('n1Criteria', value)}
                >
                  <SelectTrigger className="w-full border border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Application Use</Label>
                <Select 
                  value={formData.applicationUse} 
                  onValueChange={(value) => handleInputChange('applicationUse', value)}
                >
                  <SelectTrigger className="w-full border border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md">
                    <SelectItem value="In-Service">In-Service</SelectItem>
                    <SelectItem value="Standby">Standby</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Other Parameters - Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>System Stability</Label>
                <Select 
                  value={formData.systemStability} 
                  onValueChange={(value) => handleInputChange('systemStability', value)}
                >
                  <SelectTrigger className="w-full border border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md max-h-60">
                    <SelectItem value="Loading 115/22 or 33 kV">Loading 115/22 or 33 kV</SelectItem>
                    <SelectItem value="Tie 115/22 or 33 kV">Tie 115/22 or 33 kV</SelectItem>
                    <SelectItem value="Loading 230/115 kV">Loading 230/115 kV</SelectItem>
                    <SelectItem value="Tie 230/115 kV">Tie 230/115 kV</SelectItem>
                    <SelectItem value="Loading 500/230 kV">Loading 500/230 kV</SelectItem>
                    <SelectItem value="Tie 500/230 kV">Tie 500/230 kV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Pollution</Label>
                <Select 
                  value={formData.pollution} 
                  onValueChange={(value) => handleInputChange('pollution', value)}
                >
                  <SelectTrigger className="w-full border border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-md max-h-60">
                    <SelectItem value="Low (16 mm/kV), ESDD: < 0.03 mg/cm2">
                      Low (16 mm/kV), ESDD: &lt; 0.03 mg/cm2
                    </SelectItem>
                    <SelectItem value="Medium (20 mm/kV), ESDD: 0.03-0.06 mg/cm2">
                      Medium (20 mm/kV), ESDD: 0.03-0.06 mg/cm2
                    </SelectItem>
                    <SelectItem value="High (25 mm/kV), ESDD: 0.04-0.15 mg/cm2">
                      High (25 mm/kV), ESDD: 0.04-0.15 mg/cm2
                    </SelectItem>
                    <SelectItem value="Very High (31 mm/kV), ESDD: 0.1-0.3 mg/cm2">
                      Very High (31 mm/kV), ESDD: 0.1-0.3 mg/cm2
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Damage Of Property Section */}
            <div className="space-y-3">
              <Label className="text-lg font-medium">Damage Of Property</Label>
              <div className="space-y-2 pl-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="fire-wall" 
                    checked={formData.damageOfProperty.fireWall}
                    onCheckedChange={() => handleCheckboxChange('fireWall')}
                  />
                  <Label htmlFor="fire-wall" className="font-normal">1. มีผนังกันไฟ (Fire Wall)</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="oil-pit" 
                    checked={formData.damageOfProperty.oilPit}
                    onCheckedChange={() => handleCheckboxChange('oilPit')}
                  />
                  <Label htmlFor="oil-pit" className="font-normal">2. มี Oil Pit</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="spacing" 
                    checked={formData.damageOfProperty.spacing}
                    onCheckedChange={() => handleCheckboxChange('spacing')}
                  />
                  <Label htmlFor="spacing" className="font-normal">
                    3. มีระยะห่างระหว่างหม้อแปลง &gt; 11 m สำหรับหม้อแปลง Loading และ &gt; 15m สำหรับหม้อแปลง Tie หรือไม่มีหม้อแปลงรอบข้าง
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="fire-extinguisher" 
                    checked={formData.damageOfProperty.fireExtinguisher}
                    onCheckedChange={() => handleCheckboxChange('fireExtinguisher')}
                  />
                  <Label htmlFor="fire-extinguisher" className="font-normal">
                    4. มีระบบดับเพลิง หรือสารดับเพลิงที่พร้อมใช้งาน
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="none" 
                    checked={formData.damageOfProperty.none}
                    onCheckedChange={() => handleCheckboxChange('none')}
                  />
                  <Label htmlFor="none" className="font-normal">5. ไม่มีทั้ง 4 ข้อข้างต้น</Label>
                </div>
              </div>
            </div>
            
            {/* Load Factor Section */}
            <div className="space-y-3">
              <Label className="text-lg font-medium">Load Factor</Label>
              
              <div className="border rounded-md overflow-hidden">
                <div className="bg-blue-600 text-white grid grid-cols-2 p-3">
                  <div className="font-medium">Load Factor</div>
                  <div className="font-medium">Number of Months</div>
                </div>
                
                <div className="divide-y">
                  <div className="grid grid-cols-2 p-3 items-center hover:bg-gray-50">
                    <div>&lt;= 0.6</div>
                    <Select 
                      value={formData.loadFactorMonths.lessThan06} 
                      onValueChange={(value) => handleInputChange('loadFactorMonths.lessThan06', value)}
                    >
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-md">
                        {Array.from({ length: 13 }).map((_, i) => (
                          <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 p-3 items-center hover:bg-gray-50">
                    <div>0.6 &lt; LF &lt;= 1</div>
                    <Select 
                      value={formData.loadFactorMonths.between06And1} 
                      onValueChange={(value) => handleInputChange('loadFactorMonths.between06And1', value)}
                    >
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-md">
                        {Array.from({ length: 13 }).map((_, i) => (
                          <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 p-3 items-center hover:bg-gray-50">
                    <div>1 &lt; LF &lt;= 1.2</div>
                    <Select 
                      value={formData.loadFactorMonths.between1And12} 
                      onValueChange={(value) => handleInputChange('loadFactorMonths.between1And12', value)}
                    >
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-md">
                        {Array.from({ length: 13 }).map((_, i) => (
                          <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 p-3 items-center hover:bg-gray-50">
                    <div>1.2 &lt; LF &lt;= 1.5</div>
                    <Select 
                      value={formData.loadFactorMonths.between12And15} 
                      onValueChange={(value) => handleInputChange('loadFactorMonths.between12And15', value)}
                    >
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-md">
                        {Array.from({ length: 13 }).map((_, i) => (
                          <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 p-3 items-center hover:bg-gray-50">
                    <div>&lt; 1.5</div>
                    <Select 
                      value={formData.loadFactorMonths.greaterThan15} 
                      onValueChange={(value) => handleInputChange('loadFactorMonths.greaterThan15', value)}
                    >
                      <SelectTrigger className="w-full border border-gray-300">
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-md">
                        {Array.from({ length: 13 }).map((_, i) => (
                          <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-end pt-2">
            <Button variant="outline" onClick={() => setShowModal(false)} className="mr-2">
              ยกเลิก
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              {isEditing ? "บันทึกการแก้ไข" : "บันทึก"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default TransformerImportance;
