
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DetailRecord {
  id: number;
  date: string;
  amount: string;
}

interface YearlyRecord {
  id: number;
  year: string;
  amount: string;
  price: string;
}

const DisbursementListPage = () => {
  const [activeTab, setActiveTab] = useState<"details" | "yearly">("details");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchDate, setSearchDate] = useState("");

  // State สำหรับ Modal - รายละเอียดแต่ละครั้ง
  const [modalDate, setModalDate] = useState("");
  const [modalAmount, setModalAmount] = useState("");

  // State สำหรับ Modal - สรุปรายปี
  const [modalYear, setModalYear] = useState("");
  const [modalYearlyAmount, setModalYearlyAmount] = useState("");
  const [modalPrice, setModalPrice] = useState("");

  // Mock data สำหรับรายละเอียดแต่ละครั้ง
  const [detailRecords, setDetailRecords] = useState<DetailRecord[]>([
    { id: 1, date: "15/03/2010", amount: "25" },
    { id: 2, date: "20/06/2010", amount: "30" },
    { id: 3, date: "10/09/2010", amount: "45" },
  ]);

  // Mock data สำหรับสรุปรายปี
  const [yearlyRecords, setYearlyRecords] = useState<YearlyRecord[]>([
    { id: 1, year: "2567", amount: "500", price: "59.00" },
    { id: 2, year: "2566", amount: "360", price: "60.00" },
  ]);

  const resetModalForm = () => {
    setModalDate("");
    setModalAmount("");
    setModalYear("");
    setModalYearlyAmount("");
    setModalPrice("");
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

  const handleEditDetail = (record: DetailRecord) => {
    setModalDate(record.date);
    setModalAmount(record.amount);
    setEditingId(record.id);
    setShowModal(true);
  };

  const handleEditYearly = (record: YearlyRecord) => {
    setModalYear(record.year);
    setModalYearlyAmount(record.amount);
    setModalPrice(record.price);
    setEditingId(record.id);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteAlert(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      if (activeTab === "details") {
        setDetailRecords(prev => prev.filter(record => record.id !== deleteId));
      } else {
        setYearlyRecords(prev => prev.filter(record => record.id !== deleteId));
      }
    }
    setShowDeleteAlert(false);
    setDeleteId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === "details") {
      if (editingId) {
        // แก้ไขข้อมูลเดิม
        setDetailRecords(prev => prev.map(record => 
          record.id === editingId 
            ? { ...record, date: modalDate, amount: modalAmount }
            : record
        ));
      } else {
        // เพิ่มข้อมูลใหม่
        const newRecord: DetailRecord = {
          id: Math.max(...detailRecords.map(r => r.id)) + 1,
          date: modalDate,
          amount: modalAmount
        };
        setDetailRecords(prev => [...prev, newRecord]);
      }
    } else {
      if (editingId) {
        // แก้ไขข้อมูลเดิม
        setYearlyRecords(prev => prev.map(record => 
          record.id === editingId 
            ? { ...record, year: modalYear, amount: modalYearlyAmount, price: modalPrice }
            : record
        ));
      } else {
        // เพิ่มข้อมูลใหม่
        const newRecord: YearlyRecord = {
          id: Math.max(...yearlyRecords.map(r => r.id)) + 1,
          year: modalYear,
          amount: modalYearlyAmount,
          price: modalPrice
        };
        setYearlyRecords(prev => [...prev, newRecord]);
      }
    }
    
    handleModalClose();
  };

  const filteredDetailRecords = detailRecords.filter(record => 
    searchDate === "" || record.date.includes(searchDate)
  );

  const filteredYearlyRecords = yearlyRecords.filter(record => 
    searchDate === "" || record.year.includes(searchDate)
  );

  return (
    <div className="min-h-screen bg-[#f6f8fa] py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">รายการการเบิกจ่าย</h1>
        
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-4">
          <Button
            className={`rounded-none rounded-t-xl px-6 ${
              activeTab === "details" 
                ? "bg-blue-600 text-white" 
                : "bg-blue-100 text-blue-700"
            }`}
            onClick={() => setActiveTab("details")}
          >
            รายละเอียดแต่ละครั้ง
          </Button>
          <Button
            className={`rounded-none rounded-t-xl px-6 ${
              activeTab === "yearly" 
                ? "bg-blue-600 text-white" 
                : "bg-blue-100 text-blue-700"
            }`}
            onClick={() => setActiveTab("yearly")}
          >
            สรุปรายปี [ถัง]
          </Button>
        </div>

        {/* รายละเอียดแต่ละครั้ง Tab */}
        {activeTab === "details" && (
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
                    <th className="py-3 px-4">วันที่เบิกน้ำมันไปใช้งาน</th>
                    <th className="py-3 px-4">ปริมาณการเบิก [ถัง]</th>
                    <th className="py-3 px-4">แก้ไข</th>
                    <th className="py-3 px-4 rounded-tr-xl">ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDetailRecords.map((record, index) => (
                    <tr key={record.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-2 px-4 text-center">{index + 1}</td>
                      <td className="py-2 px-4 text-center">{record.date}</td>
                      <td className="py-2 px-4 text-center">{record.amount}</td>
                      <td className="py-2 px-4 text-center">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEditDetail(record)}
                        >
                          แก้ไข
                        </Button>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(record.id)}
                        >
                          ลบ
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* สรุปรายปี Tab */}
        {activeTab === "yearly" && (
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
                placeholder="ค้นหาตามปี..."
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="py-3 px-4 rounded-tl-xl">รายการที่</th>
                    <th className="py-3 px-4">ปีที่เบิกจ่ายน้ำมัน</th>
                    <th className="py-3 px-4">ปริมาณการเบิก [ถัง/ปี]</th>
                    <th className="py-3 px-4">ราคา [บาท/ลิตร]</th>
                    <th className="py-3 px-4 rounded-tr-xl">แก้ไข</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredYearlyRecords.map((record, index) => (
                    <tr key={record.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-2 px-4 text-center">{index + 1}</td>
                      <td className="py-2 px-4 text-center">{record.year}</td>
                      <td className="py-2 px-4 text-center">{record.amount}</td>
                      <td className="py-2 px-4 text-center">{record.price}</td>
                      <td className="py-2 px-4 text-center">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEditYearly(record)}
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
                {editingId 
                  ? "แก้ไขข้อมูลการเบิกจ่าย" 
                  : "เพิ่มข้อมูลการเบิกจ่าย"
                }
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {activeTab === "details" ? (
                <>
                  <div>
                    <label className="block font-medium mb-1">วันที่เบิกน้ำมันไปใช้งาน</label>
                    <Input 
                      placeholder="15/03/2010" 
                      value={modalDate}
                      onChange={(e) => setModalDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">ปริมาณการเบิกต่อครั้ง [ถัง]</label>
                    <Input 
                      placeholder="25" 
                      value={modalAmount}
                      onChange={(e) => setModalAmount(e.target.value)}
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block font-medium mb-1">ปีที่เบิกจ่ายน้ำมัน</label>
                    <Input 
                      placeholder="2567" 
                      value={modalYear}
                      onChange={(e) => setModalYear(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">ปริมาณการเบิก [ถัง/ปี]</label>
                    <Input 
                      placeholder="500" 
                      value={modalYearlyAmount}
                      onChange={(e) => setModalYearlyAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">ราคา [บาท/ลิตร]</label>
                    <Input 
                      placeholder="59.00" 
                      value={modalPrice}
                      onChange={(e) => setModalPrice(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}
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

        {/* Alert Dialog สำหรับยืนยันการลบ */}
        <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
              <AlertDialogDescription>
                คุณแน่ใจหรือไม่ที่จะลบรายการนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                ลบ
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default DisbursementListPage;
