import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Transformer {
  id?: string;
  name: string;
  deviceNumber: string;
  equipmentNumber: string;
  location: string;
  status: string;
  manufacturer: string;
  capacity: string;
  voltageLevel: string;
  installationDate: string;
  serviceDate: string;
  oilType: string;
  weight: string;
  nameplateYear: string;
  // Add other fields as necessary
}

interface TransformerModalProps {
  isOpen: boolean;
  onClose: () => void;
  transformer?: Transformer;
  onSave: (transformer: Transformer) => void;
}

const TransformerModal = ({ isOpen, onClose, transformer, onSave }: TransformerModalProps) => {
  const [formData, setFormData] = useState<Transformer>({
    name: "",
    deviceNumber: "",
    equipmentNumber: "",
    location: "",
    status: "",
    manufacturer: "",
    capacity: "",
    voltageLevel: "",
    installationDate: "",
    serviceDate: "",
    oilType: "",
    weight: "",
    nameplateYear: "",
  });

  useEffect(() => {
    if (transformer) {
      setFormData(transformer);
    } else {
      // Reset form for adding a new transformer
      setFormData({
        name: "",
        deviceNumber: "",
        equipmentNumber: "",
        location: "",
        status: "",
        manufacturer: "",
        capacity: "",
        voltageLevel: "",
        installationDate: "",
        serviceDate: "",
        oilType: "",
        weight: "",
        nameplateYear: "",
      });
    }
  }, [transformer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {transformer ? "แก้ไขหม้อแปลงไฟฟ้า" : "เพิ่มหม้อแปลงไฟฟ้า"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">ข้อมูลพื้นฐาน</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">ชื่อ</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="กรอกชื่อ"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deviceNumber">Device Number</Label>
                  <Input
                    id="deviceNumber"
                    name="deviceNumber"
                    type="text"
                    placeholder="กรอก Device Number"
                    value={formData.deviceNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="equipmentNumber">Equipment Number</Label>
                  <Input
                    id="equipmentNumber"
                    name="equipmentNumber"
                    type="text"
                    placeholder="กรอก Equipment Number"
                    value={formData.equipmentNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="กรอก Location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  name="status"
                  type="text"
                  placeholder="กรอก Status"
                  value={formData.status}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Technical Specifications */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">ข้อมูลทางเทคนิค</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input
                    id="manufacturer"
                    name="manufacturer"
                    type="text"
                    placeholder="กรอก Manufacturer"
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="text"
                    placeholder="กรอก Capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="voltageLevel">Voltage Level</Label>
                  <Input
                    id="voltageLevel"
                    name="voltageLevel"
                    type="text"
                    placeholder="กรอก Voltage Level"
                    value={formData.voltageLevel}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="installationDate">Installation Date</Label>
                  <Input
                    id="installationDate"
                    name="installationDate"
                    type="date"
                    placeholder="กรอก Installation Date"
                    value={formData.installationDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceDate">Service Date</Label>
                  <Input
                    id="serviceDate"
                    name="serviceDate"
                    type="date"
                    placeholder="กรอก Service Date"
                    value={formData.serviceDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="oilType">Oil Type</Label>
                  <Input
                    id="oilType"
                    name="oilType"
                    type="text"
                    placeholder="กรอก Oil Type"
                    value={formData.oilType}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="text"
                  placeholder="กรอก Weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Accessories */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Accessories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nameplateYear">ปีใน Nameplate</Label>
                  <Input
                    id="nameplateYear"
                    name="nameplateYear"
                    type="number"
                    placeholder="กรอกปี"
                    value={formData.nameplateYear}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accessory2">Accessory 2</Label>
                  <Input
                    id="accessory2"
                    name="accessory2"
                    type="text"
                    placeholder="กรอก Accessory 2"
                    value=""
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dialog Footer */}
          <DialogFooter className="flex justify-end space-x-2 pt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              ยกเลิก
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {transformer ? "บันทึกการแก้ไข" : "เพิ่มหม้อแปลง"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransformerModal;
