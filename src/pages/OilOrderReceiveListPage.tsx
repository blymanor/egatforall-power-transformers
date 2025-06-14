
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

interface OrderRecord {
  id: number;
  orderDate: string;
  orderAmount: string;
  pricePerLiter: string;
  receiveDate: string;
  testedAmount: string;
}

const OilOrderReceiveListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchDate, setSearchDate] = useState("");

  // State สำหรับ Modal
  const [modalOrderDate, setModalOrderDate] = useState("");
  const [modalOrderAmount, setModalOrderAmount] = useState("");
  const [modalPricePerLiter, setModalPricePerLiter] = useState("");
  const [modalReceiveDate, setModalReceiveDate] = useState("");
  const [modalTestedAmount, setModalTestedAmount] = useState("");

  // Mock data สำหรับรายการสั่งซื้อ/รับน้ำมัน
  const [orderRecords, setOrderRecords] = useState<OrderRecord[]>([
    { 
      id: 1, 
      orderDate: "01/07/2010", 
      orderAmount: "500", 
      pricePerLiter: "58.50", 
      receiveDate: "15/07/2010", 
      testedAmount: "490" 
    },
    { 
      id: 2, 
      orderDate: "05/12/2010", 
      orderAmount: "300", 
      pricePerLiter: "59.00", 
      receiveDate: "20/12/2010", 
      testedAmount: "295" 
    },
    { 
      id: 3, 
      orderDate: "10/03/2011", 
      orderAmount: "400", 
      pricePerLiter: "60.00", 
      receiveDate: "25/03/2011", 
      testedAmount: "398" 
    },
  ]);

  const resetModalForm = () => {
    setModalOrderDate("");
    setModalOrderAmount("");
    setModalPricePerLiter("");
    setModalReceiveDate("");
    setModalTestedAmount("");
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

  const handleEdit = (record: OrderRecord) => {
    setModalOrderDate(record.orderDate);
    setModalOrderAmount(record.orderAmount);
    setModalPricePerLiter(record.pricePerLiter);
    setModalReceiveDate(record.receiveDate);
    setModalTestedAmount(record.testedAmount);
    setEditingId(record.id);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteAlert(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setOrderRecords(prev => prev.filter(record => record.id !== deleteId));
    }
    setShowDeleteAlert(false);
    setDeleteId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // แก้ไขข้อมูลเดิม
      setOrderRecords(prev => prev.map(record => 
        record.id === editingId 
          ? { 
              ...record, 
              orderDate: modalOrderDate, 
              orderAmount: modalOrderAmount,
              pricePerLiter: modalPricePerLiter,
              receiveDate: modalReceiveDate,
              testedAmount: modalTestedAmount
            }
          : record
      ));
    } else {
      // เพิ่มข้อมูลใหม่
      const newRecord: OrderRecord = {
        id: Math.max(...orderRecords.map(r => r.id)) + 1,
        orderDate: modalOrderDate,
        orderAmount: modalOrderAmount,
        pricePerLiter: modalPricePerLiter,
        receiveDate: modalReceiveDate,
        testedAmount: modalTestedAmount
      };
      setOrderRecords(prev => [...prev, newRecord]);
    }
    
    handleModalClose();
  };

  const filteredOrderRecords = orderRecords.filter(record => 
    searchDate === "" || 
    record.orderDate.includes(searchDate) || 
    record.receiveDate.includes(searchDate)
  );

  return (
    <div className="min-h-screen bg-[#f6f8fa] py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">รายการสั่งซื้อ/รับน้ำมัน</h1>
        
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
                <th className="py-3 px-4">วันที่สั่งซื้อ</th>
                <th className="py-3 px-4">ปริมาณสั่งซื้อ [ถัง]</th>
                <th className="py-3 px-4">ราคาต่อลิตร [บาท]</th>
                <th className="py-3 px-4">วันที่ได้รับ</th>
                <th className="py-3 px-4">ปริมาณที่ผ่านการทดสอบ [ถัง]</th>
                <th className="py-3 px-4">แก้ไข</th>
                <th className="py-3 px-4 rounded-tr-xl">ลบ</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrderRecords.map((record, index) => (
                <tr key={record.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td className="py-2 px-4 text-center">{record.orderDate}</td>
                  <td className="py-2 px-4 text-center">{record.orderAmount}</td>
                  <td className="py-2 px-4 text-center">{record.pricePerLiter}</td>
                  <td className="py-2 px-4 text-center">{record.receiveDate}</td>
                  <td className="py-2 px-4 text-center">{record.testedAmount}</td>
                  <td className="py-2 px-4 text-center">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEdit(record)}
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

        {/* Modal สำหรับเพิ่ม/แก้ไข */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-semibold text-lg mb-1">
                {editingId 
                  ? "แก้ไขรายการสั่งซื้อ/รับน้ำมัน" 
                  : "เพิ่มรายการสั่งซื้อ/รับน้ำมัน"
                }
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block font-medium mb-1">วันที่สั่งซื้อ</label>
                <Input 
                  placeholder="01/07/2010" 
                  value={modalOrderDate}
                  onChange={(e) => setModalOrderDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">ปริมาณการสั่งซื้อต่อครั้ง [ถัง]</label>
                <Input 
                  placeholder="500" 
                  value={modalOrderAmount}
                  onChange={(e) => setModalOrderAmount(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">ราคาที่การสั่งซื้อต่อลิตร [บาท]</label>
                <Input 
                  placeholder="58.50" 
                  value={modalPricePerLiter}
                  onChange={(e) => setModalPricePerLiter(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">วันที่ได้รับ</label>
                <Input 
                  placeholder="15/07/2010" 
                  value={modalReceiveDate}
                  onChange={(e) => setModalReceiveDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">ปริมาณที่ผ่านการทดสอบ [ถัง]</label>
                <Input 
                  placeholder="490" 
                  value={modalTestedAmount}
                  onChange={(e) => setModalTestedAmount(e.target.value)}
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

export default OilOrderReceiveListPage;
