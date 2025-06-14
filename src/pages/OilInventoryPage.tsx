
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const OilInventoryPage = () => {
  const [activeTab, setActiveTab] = useState<"stock" | "initial">("stock");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f8fa] py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md p-6">
        <div className="flex gap-2 mb-4">
          <Button
            className={`rounded-none rounded-t-xl px-6 ${activeTab === "stock" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"}`}
            onClick={() => setActiveTab("stock")}
          >คลังน้ำมัน</Button>
          <Button
            className={`rounded-none rounded-t-xl px-6 ${activeTab === "initial" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"}`}
            onClick={() => setActiveTab("initial")}
          >ปริมาณน้ำมันเริ่มต้น</Button>
        </div>
        {/* คลังน้ำมัน */}
        {activeTab === "stock" && (
          <div>
            <div className="mb-4 flex justify-end">
              <input className="border px-3 py-2 rounded shadow-sm w-56 text-sm" placeholder="ค้นหาตามวันที่..." />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="py-3 px-4 rounded-tl-xl">ลำดับ</th>
                    <th className="py-3 px-4">วันที่</th>
                    <th className="py-3 px-4">เบิกจ่าย [ถัง]</th>
                    <th className="py-3 px-4">ซื้อเพิ่ม [ถัง]</th>
                    <th className="py-3 px-4 rounded-tr-xl">ปริมาณน้ำมันในคลัง [ถัง]</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50 text-center">
                    <td className="py-2 px-4">1</td>
                    <td className="py-2 px-4">02/08/2010</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">490</td>
                    <td className="py-2 px-4">702</td>
                  </tr>
                  {/* ... เพิ่มแถวตัวอย่าง ... */}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* ปริมาณน้ำมันเริ่มต้น */}
        {activeTab === "initial" && (
          <div>
            <div className="flex justify-between mb-4">
              <Button className="bg-blue-600 text-white" onClick={() => setShowModal(true)}>เพิ่มรายการใหม่</Button>
              <input className="border px-3 py-2 rounded shadow-sm w-56 text-sm" placeholder="ค้นหาตามวันที่..." />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="py-3 px-4 rounded-tl-xl">ลำดับ</th>
                    <th className="py-3 px-4">วันที่</th>
                    <th className="py-3 px-4">ปริมาณน้ำมันในคลัง</th>
                    <th className="py-3 px-4 rounded-tr-xl">แก้ไข</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50 text-center">
                    <td className="py-2 px-4">1</td>
                    <td className="py-2 px-4">02/08/2010</td>
                    <td className="py-2 px-4">702</td>
                    <td className="py-2 px-4">
                      <Button size="sm" variant="outline" onClick={() => setShowModal(true)}>แก้ไข</Button>
                    </td>
                  </tr>
                  {/* ... เพิ่มแถวตัวอย่าง ... */}
                </tbody>
              </table>
            </div>
            {/* Modal Placeholder */}
            {showModal && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
                  <h2 className="font-semibold text-lg mb-4">แก้ไขปริมาณน้ำมันในคลังเริ่มต้น</h2>
                  <form className="flex flex-col gap-4">
                    <div>
                      <label className="font-medium">วันที่</label>
                      <input className="border rounded w-full px-3 py-2 mt-1" placeholder="02/08/2010" />
                    </div>
                    <div>
                      <label className="font-medium">ปริมาณน้ำมันในคลัง [ถัง]</label>
                      <input className="border rounded w-full px-3 py-2 mt-1" placeholder="702" />
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
        )}
      </div>
    </div>
  );
};
export default OilInventoryPage;
