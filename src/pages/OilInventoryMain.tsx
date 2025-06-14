
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

  const handleOpenModal = () => {
    console.log("Opening modal...");
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-[#0442AF] mb-6">น้ำมันหม้อแปลง</h1>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleOpenModal}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white"
            >
              คลิกเพื่อกรอกข้อมูล
            </Button>
          </div>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-center">
                  เพิ่มข้อมูลน้ำมันหม้อแปลง
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 p-4">
                <div className="space-y-2">
                  <Label>ปีที่เบิกจ่ายน้ำมัน :</Label>
                  <Input
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    placeholder="กรอกปี"
                  />
                </div>

                <div className="space-y-2">
                  <Label>ปริมาณการเบิกน้ำมันของทั้งปี [ถัง] :</Label>
                  <Input
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    placeholder="กรอกปริมาณ"
                  />
                </div>

                <div className="space-y-2">
                  <Label>ราคา [บาทต่อลิตร] :</Label>
                  <Input
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="กรอกราคา"
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <Button onClick={handleSave} className="px-8 bg-blue-600 hover:bg-blue-700">
                    บันทึก
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OilInventoryMain;
