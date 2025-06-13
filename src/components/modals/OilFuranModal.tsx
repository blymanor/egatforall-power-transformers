
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface OilFuranModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "view" | "edit";
  data?: any;
}

const OilFuranModal: React.FC<OilFuranModalProps> = ({
  isOpen,
  onClose,
  mode,
  data
}) => {
  const [formData, setFormData] = useState({
    transformer: "",
    testType: "",
    inspectionDate: "",
    inspector: "",
    o2: "",
    n2: "",
    co2: "",
    co: "",
    h2: "",
    ch4: "",
    c2h2: "",
    c2h4: "",
    c2h6: "",
    c3h6: "",
    c3h8: ""
  });

  useEffect(() => {
    if (mode !== "add" && data) {
      setFormData({
        transformer: data.transformerName || "",
        testType: data.testType || "",
        inspectionDate: data.inspectionDate || "",
        inspector: data.inspector || "",
        o2: "8500",
        n2: "65000",
        co2: "2800",
        co: "450",
        h2: "12",
        ch4: "35",
        c2h2: "2",
        c2h4: "15",
        c2h6: "8",
        c3h6: "3",
        c3h8: "5"
      });
    } else if (mode === "add") {
      setFormData({
        transformer: "",
        testType: "",
        inspectionDate: "",
        inspector: "",
        o2: "",
        n2: "",
        co2: "",
        co: "",
        h2: "",
        ch4: "",
        c2h2: "",
        c2h4: "",
        c2h6: "",
        c3h6: "",
        c3h8: ""
      });
    }
  }, [mode, data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(mode === "add" ? "เพิ่มข้อมูลสำเร็จ" : "บันทึกข้อมูลสำเร็จ");
    onClose();
  };

  const isReadOnly = mode === "view";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "เพิ่มข้อมูล Oil Furan" : 
             mode === "view" ? "ดูข้อมูล Oil Furan" : 
             "แก้ไขข้อมูล Oil Furan"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>หม้อแปลงไฟฟ้า :</Label>
              <Select value={formData.transformer} onValueChange={(value) => setFormData(prev => ({...prev, transformer: value}))} disabled={isReadOnly}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AN-KT1A">AN-KT1A</SelectItem>
                  <SelectItem value="AT2-KT1A">AT2-KT1A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>รูปแบบการตรวจสอบ :</Label>
              <Select value={formData.testType} onValueChange={(value) => setFormData(prev => ({...prev, testType: value}))} disabled={isReadOnly}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกรูปแบบการตรวจสอบ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Commissioning">Commissioning</SelectItem>
                  <SelectItem value="Annual Test">Annual Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>วันที่ตรวจสอบ :</Label>
              <Input 
                type="date" 
                value={formData.inspectionDate} 
                onChange={(e) => setFormData(prev => ({...prev, inspectionDate: e.target.value}))} 
                readOnly={isReadOnly} 
              />
            </div>
            <div>
              <Label>ผู้ตรวจสอบ :</Label>
              <Input 
                value={formData.inspector} 
                onChange={(e) => setFormData(prev => ({...prev, inspector: e.target.value}))} 
                readOnly={isReadOnly} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>O2 [ppm] :</Label>
              <Input 
                value={formData.o2} 
                onChange={(e) => setFormData(prev => ({...prev, o2: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า O2"
              />
            </div>

            <div>
              <Label>N2 [ppm] :</Label>
              <Input 
                value={formData.n2} 
                onChange={(e) => setFormData(prev => ({...prev, n2: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า N2"
              />
            </div>

            <div>
              <Label>CO2 [ppm] :</Label>
              <Input 
                value={formData.co2} 
                onChange={(e) => setFormData(prev => ({...prev, co2: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า CO2"
              />
            </div>

            <div>
              <Label>CO [ppm] :</Label>
              <Input 
                value={formData.co} 
                onChange={(e) => setFormData(prev => ({...prev, co: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า CO"
              />
            </div>

            <div>
              <Label>H2 [ppm] :</Label>
              <Input 
                value={formData.h2} 
                onChange={(e) => setFormData(prev => ({...prev, h2: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า H2"
              />
            </div>

            <div>
              <Label>CH4 [ppm] :</Label>
              <Input 
                value={formData.ch4} 
                onChange={(e) => setFormData(prev => ({...prev, ch4: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า CH4"
              />
            </div>

            <div>
              <Label>C2H2 [ppm] :</Label>
              <Input 
                value={formData.c2h2} 
                onChange={(e) => setFormData(prev => ({...prev, c2h2: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า C2H2"
              />
            </div>

            <div>
              <Label>C2H4 [ppm] :</Label>
              <Input 
                value={formData.c2h4} 
                onChange={(e) => setFormData(prev => ({...prev, c2h4: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า C2H4"
              />
            </div>

            <div>
              <Label>C2H6 [ppm] :</Label>
              <Input 
                value={formData.c2h6} 
                onChange={(e) => setFormData(prev => ({...prev, c2h6: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า C2H6"
              />
            </div>

            <div>
              <Label>C3H6 [ppm] :</Label>
              <Input 
                value={formData.c3h6} 
                onChange={(e) => setFormData(prev => ({...prev, c3h6: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า C3H6"
              />
            </div>

            <div>
              <Label>C3H8 [ppm] :</Label>
              <Input 
                value={formData.c3h8} 
                onChange={(e) => setFormData(prev => ({...prev, c3h8: e.target.value}))} 
                readOnly={isReadOnly}
                placeholder="ระบุค่า C3H8"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              ยกเลิก
            </Button>
            {mode !== "view" && (
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {mode === "add" ? "เพิ่มข้อมูล" : "บันทึกการแก้ไข"}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OilFuranModal;
