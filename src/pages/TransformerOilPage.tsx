
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const TransformerOilPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f8fa] py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">บันทึกรายการน้ำมันหม้อแปลง</h1>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowModal(true)}>
            คลิกเพื่อกรอกข้อมูล
          </Button>
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
                <td className="py-2 px-4"><Button size="sm" variant="outline">แก้ไข</Button></td>
              </tr>
              <tr className="bg-white text-center">
                <td className="py-2 px-4">2566</td>
                <td className="py-2 px-4">360</td>
                <td className="py-2 px-4">60.00</td>
                <td className="py-2 px-4"><Button size="sm" variant="outline">แก้ไข</Button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal Placeholder */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <h2 className="font-semibold text-lg mb-4">เพิ่ม/แก้ไขข้อมูลน้ำมันประจำปี</h2>
            <form className="flex flex-col gap-4">
              <div>
                <label className="font-medium">ปีที่เบิกจ่ายน้ำมัน</label>
                <input className="border rounded w-full px-3 py-2 mt-1" placeholder="2567" />
              </div>
              <div>
                <label className="font-medium">ปริมาณการเบิกน้ำมันของทั้งปี [ถัง]</label>
                <input className="border rounded w-full px-3 py-2 mt-1" placeholder="500" />
              </div>
              <div>
                <label className="font-medium">ราคา [บาทต่อลิตร]</label>
                <input className="border rounded w-full px-3 py-2 mt-1" placeholder="59.00" />
              </div>
              <div className="flex gap-2 justify-end mt-4">
                <Button variant="outline" type="button" onClick={() => setShowModal(false)}>ยกเลิก</Button>
                <Button type="submit" className="bg-blue-600 text-white">บันทึก</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default TransformerOilPage;
