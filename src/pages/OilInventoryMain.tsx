
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const OilInventoryMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    year: '',
    amount: '',
    price: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast.success("บันทึกข้อมูลสำเร็จ", {
      description: "ข้อมูลน้ำมันหม้อแปลงถูกบันทึกแล้ว",
    });
    setIsModalOpen(false);
    setFormData({ year: '', amount: '', price: '' });
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0442AF] mb-8">น้ำมันหม้อแปลง</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-center">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="px-12 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
                  >
                    คลิกเพื่อกรอกข้อมูล
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-center text-gray-800">
                      เพิ่มข้อมูลน้ำมันหม้อแปลง
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6 p-4">
                    <div className="space-y-2">
                      <Label className="text-gray-700 font-medium">ปีที่เบิกจ่ายน้ำมัน :</Label>
                      <Input
                        value={formData.year}
                        onChange={(e) => handleInputChange('year', e.target.value)}
                        placeholder="กรอกปี"
                        className="border-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700 font-medium">ปริมาณการเบิกน้ำมันของทั้งปี [ถัง] :</Label>
                      <Input
                        value={formData.amount}
                        onChange={(e) => handleInputChange('amount', e.target.value)}
                        placeholder="กรอกปริมาณ"
                        className="border-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700 font-medium">ราคา [บาทต่อลิตร] :</Label>
                      <Input
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        placeholder="กรอกราคา"
                        className="border-gray-300"
                      />
                    </div>

                    <div className="flex justify-center pt-4">
                      <Button 
                        onClick={handleSave} 
                        className="px-10 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                      >
                        บันทึก
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OilInventoryMain;
