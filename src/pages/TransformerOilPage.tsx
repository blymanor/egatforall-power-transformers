
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

const TransformerOilPage = () => {
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState("");
  const [volume, setVolume] = useState("");
  const [price, setPrice] = useState("");

  // reset form when close modal
  const handleOpenChange = (state: boolean) => {
    setOpen(state);
    if (!state) {
      setYear("");
      setVolume("");
      setPrice("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ดำเนินการบันทึกข้อมูลที่นี่ (เช่น console.log)
    setOpen(false);
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
                  เพิ่ม/แก้ไขข้อมูลน้ำมันประจำปี
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
                <th className="py-3 px-4 rounded-tr-xl"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50 text-center">
                <td className="py-2 px-4">2567</td>
                <td className="py-2 px-4">500</td>
                <td className="py-2 px-4">59.00</td>
                <td className="py-2 px-4">
                  <Button size="sm" variant="outline">
                    แก้ไข
                  </Button>
                </td>
              </tr>
              <tr className="bg-white text-center">
                <td className="py-2 px-4">2566</td>
                <td className="py-2 px-4">360</td>
                <td className="py-2 px-4">60.00</td>
                <td className="py-2 px-4">
                  <Button size="sm" variant="outline">
                    แก้ไข
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransformerOilPage;
