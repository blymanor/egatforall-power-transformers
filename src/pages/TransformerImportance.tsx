
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
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Mock data for the table
const importanceData = [
  {
    id: 1,
    transformer: "AN-KT1A",
    location: "ภาคเหนือ",
    importance: "สูง",
    description: "หม้อแปลงหลักของระบบจ่ายไฟ"
  },
  {
    id: 2,
    transformer: "AN-KT2A",
    location: "ภาคกลาง",
    importance: "ปานกลาง",
    description: "หม้อแปลงสำรอง"
  },
  {
    id: 3,
    transformer: "BN-KT1B",
    location: "ภาคใต้",
    importance: "สูง",
    description: "หม้อแปลงจ่ายไฟโรงงาน"
  }
];

const TransformerImportance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    transformer: "",
    location: "",
    importance: "",
    description: ""
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
    setFormData({ transformer: "", location: "", importance: "", description: "" });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    toast.success("ลบข้อมูลสำเร็จ");
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({ transformer: "", location: "", importance: "", description: "" });
    setIsModalOpen(true);
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
              <h2 className="text-lg font-medium text-gray-800">รายการความสำคัญของหม้อแปลง</h2>
              
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700 text-white">
                    เพิ่มข้อมูล
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-blue-700 text-lg font-medium">
                      {editingItem ? "แก้ไขรายการความสำคัญ" : "เพิ่มรายการความสำคัญ"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="transformer" className="text-sm font-medium text-gray-700">หม้อแปลงไฟฟ้า</Label>
                      <Select value={formData.transformer} onValueChange={(value) => setFormData({...formData, transformer: value})}>
                        <SelectTrigger className="w-full border-gray-200 focus:border-blue-500">
                          <SelectValue placeholder="เลือกหม้อแปลง" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="AN-KT1A">AN-KT1A</SelectItem>
                          <SelectItem value="AN-KT2A">AN-KT2A</SelectItem>
                          <SelectItem value="BN-KT1B">BN-KT1B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium text-gray-700">ภูมิภาค</Label>
                      <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                        <SelectTrigger className="w-full border-gray-200 focus:border-blue-500">
                          <SelectValue placeholder="เลือกภูมิภาค" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="ภาคเหนือ">ภาคเหนือ</SelectItem>
                          <SelectItem value="ภาคกลาง">ภาคกลาง</SelectItem>
                          <SelectItem value="ภาคใต้">ภาคใต้</SelectItem>
                          <SelectItem value="ภาคตะวันออกเฉียงเหนือ">ภาคตะวันออกเฉียงเหนือ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="importance" className="text-sm font-medium text-gray-700">ระดับความสำคัญ</Label>
                      <Select value={formData.importance} onValueChange={(value) => setFormData({...formData, importance: value})}>
                        <SelectTrigger className="w-full border-gray-200 focus:border-blue-500">
                          <SelectValue placeholder="เลือกระดับความสำคัญ" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="สูง">สูง</SelectItem>
                          <SelectItem value="ปานกลาง">ปานกลาง</SelectItem>
                          <SelectItem value="ต่ำ">ต่ำ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium text-gray-700">รายละเอียด</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="กรอกรายละเอียดเพิ่มเติม"
                        className="w-full border-gray-200 focus:border-blue-500"
                        rows={3}
                      />
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
                        {editingItem ? "บันทึกการแก้ไข" : "เพิ่มข้อมูล"}
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
                    <TableHead className="text-gray-700">หม้อแปลงไฟฟ้า</TableHead>
                    <TableHead className="text-gray-700">ภูมิภาค</TableHead>
                    <TableHead className="text-gray-700">ระดับความสำคัญ</TableHead>
                    <TableHead className="text-gray-700">รายละเอียด</TableHead>
                    <TableHead className="text-center text-gray-700">การจัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {importanceData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{item.transformer}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.importance === 'สูง' ? 'bg-red-100 text-red-700' :
                          item.importance === 'ปานกลาง' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {item.importance}
                        </span>
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(item)}
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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
