
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

interface StockRecord {
  id: number;
  date: string;
  withdraw: string;
  purchase: string;
  stock: string;
}

interface InitialRecord {
  id: number;
  date: string;
  amount: string;
}

const OilInventoryPage = () => {
  const [activeTab, setActiveTab] = useState<"stock" | "initial">("stock");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchDate, setSearchDate] = useState("");
  
  // State สำหรับ Modal
  const [modalDate, setModalDate] = useState("");
  const [modalAmount, setModalAmount] = useState("");
  const [modalWithdraw, setModalWithdraw] = useState("");
  const [modalPurchase, setModalPurchase] = useState("");

  // Mock data สำหรับคลังน้ำมัน
  const [stockRecords, setStockRecords] = useState<StockRecord[]>([
    { id: 1, date: "02/08/2010", withdraw: "-", purchase: "490", stock: "702" },
    { id: 2, date: "15/09/2010", withdraw: "50", purchase: "-", stock: "652" },
    { id: 3, date: "20/11/2010", withdraw: "30", purchase: "100", stock: "722" },
  ]);

  // Mock data สำหรับปริมาณน้ำมันเริ่มต้น
  const [initialRecords, setInitialRecords] = useState<InitialRecord[]>([
    { id: 1, date: "02/08/2010", amount: "702" },
    { id: 2, date: "01/01/2011", amount: "750" },
  ]);

  const resetModalForm = () => {
    setModalDate("");
    setModalAmount("");
    setModalWithdraw("");
    setModalPurchase("");
    setEditingId(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    resetModalForm();
  };

  const handleAddNew = () => {
    resetModalForm();
    setShowModal(true);
  };

  const handleEdit = (record: InitialRecord) => {
    setModalDate(record.date);
    setModalAmount(record.amount);
    setEditingId(record.id);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === "initial") {
      if (editingId) {
        // แก้ไขข้อมูลเดิม
        setInitialRecords(prev => prev.map(record => 
          record.id === editingId 
            ? { ...record, date: modalDate, amount: modalAmount }
            : record
        ));
      } else {
        // เพิ่มข้อมูลใหม่
        const newRecord: InitialRecord = {
          id: Math.max(...initialRecords.map(r => r.id)) + 1,
          date: modalDate,
          amount: modalAmount
        };
        setInitialRecords(prev => [...prev, newRecord]);
      }
    }
    
    handleModalClose();
  };

  const filteredStockRecords = stockRecords.filter(record => 
    searchDate === "" || record.date.includes(searchDate)
  );

  const filteredInitialRecords = initialRecords.filter(record => 
    searchDate === "" || record.date.includes(searchDate)
  );

  return (
    <div className="min-h-screen bg-[#f6f8fa] py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md p-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-4">
          <Button
            className={`rounded-none rounded-t-xl px-6 ${
              activeTab === "stock" 
                ? "bg-blue-600 text-white" 
                : "bg-blue-100 text-blue-700"
            }`}
            onClick={() => setActiveTab("stock")}
          >
            คลังน้ำมัน
          </Button>
          <Button
            className={`rounded-none rounded-t-xl px-6 ${
              activeTab === "initial" 
                ? "bg-blue-600 text-white" 
                : "bg-blue-100 text-blue-700"
            }`}
            onClick={() => setActiveTab("initial")}
          >
            ปริมาณน้ำมันเริ่มต้น
          </Button>
        </div>

        {/* คลังน้ำมัน Tab */}
        {activeTab === "stock" && (
          <div>
            <div className="mb-4 flex justify-end">
              <Input 
                className="w-56 text-sm" 
                placeholder="ค้นหาตามวันที่..."
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
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
                  {filteredStockRecords.map((record, index) => (
                    <tr key={record.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-2 px-4 text-center">{index + 1}</td>
                      <td className="py-2 px-4 text-center">{record.date}</td>
                      <td className="py-2 px-4 text-center">{record.withdraw}</td>
                      <td className="py-2 px-4 text-center">{record.purchase}</td>
                      <td className="py-2 px-4 text-center">{record.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ปริมาณน้ำมันเริ่มต้น Tab */}
        {activeTab === "initial" && (
          <div>
            <div className="flex justify-between mb-4">
              <Button 
                className="bg-blue-600 text-white" 
                onClick={handleAddNew}
              >
                เพิ่มรายการใหม่
              </Button>
              <Input 
                className="w-56 text-sm" 
                placeholder="ค้นหาตามวันที่..."
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
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
                  {filteredInitialRecords.map((record, index) => (
                    <tr key={record.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-2 px-4 text-center">{index + 1}</td>
                      <td className="py-2 px-4 text-center">{record.date}</td>
                      <td className="py-2 px-4 text-center">{record.amount}</td>
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
        )}

        {/* Modal สำหรับเพิ่ม/แก้ไข */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-semibold text-lg mb-1">
                {editingId ? "แก้ไขปริมาณน้ำมันในคลังเริ่มต้น" : "เพิ่มปริมาณน้ำมันในคลังเริ่มต้น"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-medium mb-1">วันที่</label>
                <Input 
                  placeholder="02/08/2010" 
                  value={modalDate}
                  onChange={(e) => setModalDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">ปริมาณน้ำมันในคลัง [ถัง]</label>
                <Input 
                  placeholder="702" 
                  value={modalAmount}
                  onChange={(e) => setModalAmount(e.target.value)}
                  required
                />
              </div>
              <DialogFooter className="gap-2 mt-4">
                <Button variant="outline" type="button" onClick={handleModalClose}>
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
    </div>
  );
};

export default OilInventoryPage;
