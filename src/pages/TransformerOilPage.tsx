
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface OilRecord {
  id: number;
  year: string;
  volume: string;
  price: string;
}

const TransformerOilPage = () => {
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState("");
  const [volume, setVolume] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [oilRecords, setOilRecords] = useState<OilRecord[]>([
    { id: 1, year: "2567", volume: "500", price: "59.00" },
    { id: 2, year: "2566", volume: "360", price: "60.00" },
  ]);

  const handleOpenChange = (state: boolean) => {
    setOpen(state);
    if (!state) {
      setYear("");
      setVolume("");
      setPrice("");
      setEditingId(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // แก้ไขข้อมูลเดิม
      setOilRecords(prev => prev.map(record => 
        record.id === editingId 
          ? { ...record, year, volume, price }
          : record
      ));
    } else {
      // เพิ่มข้อมูลใหม่
      const newRecord: OilRecord = {
        id: Math.max(...oilRecords.map(r => r.id)) + 1,
        year,
        volume,
        price
      };
      setOilRecords(prev => [...prev, newRecord]);
    }
    
    console.log("บันทึกข้อมูล:", { year, volume, price });
    setOpen(false);
  };

  const handleEdit = (record: OilRecord) => {
    setYear(record.year);
    setVolume(record.volume);
    setPrice(record.price);
    setEditingId(record.id);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fa] py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">
            บันทึกรายการน้ำมันหม้อแปลง
          </h1>
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setOpen(true)}
              >
                คลิกเพื่อกรอกข้อมูล
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-semibold text-lg mb-1">
                  {editingId ? "แก้ไขข้อมูลน้ำมันประจำปี" : "เพิ่มข้อมูลน้ำมันประจำปี"}
                </DialogTitle>
              </DialogHeader>
              <form
                className="flex flex-col gap-3 py-2"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <div>
                  <label className="block font-medium mb-1">
                    ปีที่เบิกจ่ายน้ำมัน
                  </label>
                  <Input
                    placeholder="2567"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">
                    ปริมาณการเบิกน้ำมันของทั้งปี [ถัง]
                  </label>
                  <Input
                    placeholder="500"
                    value={volume}
                    onChange={e => setVolume(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">
                    ราคา [บาทต่อลิตร]
                  </label>
                  <Input
                    placeholder="59.00"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                  />
                </div>
                <DialogFooter className="gap-2 pt-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    ยกเลิก
                  </Button>
                  <Button type="submit" className="bg-blue-600 text-white">
                    บันทึก
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-3 px-4 rounded-tl-xl">ปีที่เบิกจ่ายน้ำมัน</th>
                <th className="py-3 px-4">ปริมาณการเบิกน้ำมันของทั้งปี [ถัง]</th>
                <th className="py-3 px-4">ราคา [บาทต่อลิตร]</th>
                <th className="py-3 px-4 rounded-tr-xl">การดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              {oilRecords.map((record, index) => (
                <tr key={record.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-2 px-4 text-center">{record.year}</td>
                  <td className="py-2 px-4 text-center">{record.volume}</td>
                  <td className="py-2 px-4 text-center">{record.price}</td>
                  <td className="py-2 px-4 text-center">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEdit(record)}
                    >
                      แก้ไข
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransformerOilPage;
