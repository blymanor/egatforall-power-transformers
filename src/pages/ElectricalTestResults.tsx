
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Edit, Plus } from "lucide-react";
import CoreInsulationResistanceModal from "@/components/modals/CoreInsulationResistanceModal";
import ExcitingCurrentMeasurementModal from "@/components/modals/ExcitingCurrentMeasurementModal";
import DCResistanceMeasurementModal from "@/components/modals/DCResistanceMeasurementModal";
import SinglePhaseImpedanceMeasurementModal from "@/components/modals/SinglePhaseImpedanceMeasurementModal";
import ThreePhaseImpedanceMeasurementModal from "@/components/modals/ThreePhaseImpedanceMeasurementModal";

const ElectricalTestResults = () => {
  const [transformer, setTransformer] = useState("");
  const [quarter, setQuarter] = useState("");
  const [year, setYear] = useState("");
  
  // Modal states
  const [coreInsulationModal, setCoreInsulationModal] = useState({ isOpen: false, mode: "add" as "add" | "view" | "edit", data: null });
  const [excitingCurrentModal, setExcitingCurrentModal] = useState({ isOpen: false, mode: "add" as "add" | "view" | "edit", data: null });
  const [dcResistanceModal, setDcResistanceModal] = useState({ isOpen: false, mode: "add" as "add" | "view" | "edit", data: null });
  const [singlePhaseModal, setSinglePhaseModal] = useState({ isOpen: false, mode: "add" as "add" | "view" | "edit", data: null });
  const [threePhaseModal, setThreePhaseModal] = useState({ isOpen: false, mode: "add" as "add" | "view" | "edit", data: null });

  // Sample data
  const coreInsulationData = [
    { id: 1, date: "2024-01-15", value: "2500", status: "ผ่าน", tester: "นาย ก" },
    { id: 2, date: "2024-02-15", value: "2600", status: "ผ่าน", tester: "นาย ข" },
  ];

  const excitingCurrentData = [
    { id: 1, date: "2024-01-15", hvWinding: "150", lvWinding: "25", tvWinding: "8", tester: "นาย ก" },
    { id: 2, date: "2024-02-15", hvWinding: "148", lvWinding: "24", tvWinding: "7", tester: "นาย ข" },
  ];

  const dcResistanceData = [
    { id: 1, date: "2024-01-15", hvWinding: "0.0", lvWinding: "0.0", tvWinding: "0.0", calculated: "45.2", tester: "นาย ก" },
    { id: 2, date: "2024-02-15", hvWinding: "0.0", lvWinding: "0.0", tvWinding: "0.0", calculated: "46.1", tester: "นาย ข" },
  ];

  const singlePhaseData = [
    { id: 1, date: "2024-01-15", hl: "8.5", ht: "15.2", lt: "6.8", calculated: "78.3", tester: "นาย ก" },
    { id: 2, date: "2024-02-15", hl: "8.3", ht: "15.0", lt: "6.9", calculated: "79.1", tester: "นาย ข" },
  ];

  const threePhaseData = [
    { id: 1, date: "2024-01-15", hl: "8.2", ht: "15.1", lt: "6.7", calculated: "77.8", tester: "นาย ก" },
    { id: 2, date: "2024-02-15", hl: "8.4", ht: "14.9", lt: "6.8", calculated: "78.5", tester: "นาย ข" },
  ];

  const handleOpenModal = (modalType: string, mode: "add" | "view" | "edit", data?: any) => {
    switch (modalType) {
      case 'coreInsulation':
        setCoreInsulationModal({ isOpen: true, mode, data });
        break;
      case 'excitingCurrent':
        setExcitingCurrentModal({ isOpen: true, mode, data });
        break;
      case 'dcResistance':
        setDcResistanceModal({ isOpen: true, mode, data });
        break;
      case 'singlePhase':
        setSinglePhaseModal({ isOpen: true, mode, data });
        break;
      case 'threePhase':
        setThreePhaseModal({ isOpen: true, mode, data });
        break;
    }
  };

  const handleCloseModal = (modalType: string) => {
    switch (modalType) {
      case 'coreInsulation':
        setCoreInsulationModal({ isOpen: false, mode: "add", data: null });
        break;
      case 'excitingCurrent':
        setExcitingCurrentModal({ isOpen: false, mode: "add", data: null });
        break;
      case 'dcResistance':
        setDcResistanceModal({ isOpen: false, mode: "add", data: null });
        break;
      case 'singlePhase':
        setSinglePhaseModal({ isOpen: false, mode: "add", data: null });
        break;
      case 'threePhase':
        setThreePhaseModal({ isOpen: false, mode: "add", data: null });
        break;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">การทดสอบทางไฟฟ้า</h2>
          <p className="text-lg text-gray-600">ผลการทดสอบและวิเคราะห์ทางไฟฟ้าของหม้อแปลงไฟฟ้า</p>
        </div>

        {/* Filter Section */}
        <Card className="bg-white shadow-lg rounded-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">เลือกข้อมูลที่ต้องการดู</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transformer">หม้อแปลงไฟฟ้า</Label>
              <Select value={transformer} onValueChange={setTransformer}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AT2-KT1A">AT2-KT1A</SelectItem>
                  <SelectItem value="AN-473A">AN-473A</SelectItem>
                  <SelectItem value="AN-474A">AN-474A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quarter">ไตรมาส</Label>
              <Select value={quarter} onValueChange={setQuarter}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกไตรมาส" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">ไตรมาส 1</SelectItem>
                  <SelectItem value="2">ไตรมาส 2</SelectItem>
                  <SelectItem value="3">ไตรมาส 3</SelectItem>
                  <SelectItem value="4">ไตรมาส 4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">ปี</Label>
              <Input 
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="ระบุปี (พ.ศ.)"
              />
            </div>

            <div className="flex items-end">
              <Button className="w-full">ค้นหา</Button>
            </div>
          </CardContent>
        </Card>

        {/* Core Insulation Resistance Table */}
        <Card className="bg-white shadow-lg rounded-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800">Core Insulation Resistance</CardTitle>
            <Button 
              onClick={() => handleOpenModal('coreInsulation', 'add')}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              เพิ่มข้อมูล
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>วันที่ทดสอบ</TableHead>
                  <TableHead>ค่าความต้านทาน (MΩ)</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>ผู้ทดสอบ</TableHead>
                  <TableHead>การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coreInsulationData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.value}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>{item.tester}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenModal('coreInsulation', 'view', item)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenModal('coreInsulation', 'edit', item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Exciting Current Measurement Table */}
        <Card className="bg-white shadow-lg rounded-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800">Exciting Current Measurement</CardTitle>
            <Button 
              onClick={() => handleOpenModal('excitingCurrent', 'add')}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              เพิ่มข้อมูล
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>วันที่ทดสอบ</TableHead>
                  <TableHead>HV Winding (mA)</TableHead>
                  <TableHead>LV Winding (mA)</TableHead>
                  <TableHead>TV Winding (mA)</TableHead>
                  <TableHead>ผู้ทดสอบ</TableHead>
                  <TableHead>การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {excitingCurrentData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.hvWinding}</TableCell>
                    <TableCell>{item.lvWinding}</TableCell>
                    <TableCell>{item.tvWinding}</TableCell>
                    <TableCell>{item.tester}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenModal('excitingCurrent', 'view', item)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenModal('excitingCurrent', 'edit', item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* DC Resistance Measurement Table */}
        <Card className="bg-white shadow-lg rounded-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800">DC Resistance Measurement</CardTitle>
            <Button 
              onClick={() => handleOpenModal('dcResistance', 'add')}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              เพิ่มข้อมูล
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>วันที่ทดสอบ</TableHead>
                  <TableHead>HV Winding</TableHead>
                  <TableHead>LV Winding</TableHead>
                  <TableHead>TV Winding</TableHead>
                  <TableHead>ค่าคำนวณ</TableHead>
                  <TableHead>ผู้ทดสอบ</TableHead>
                  <TableHead>การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dcResistanceData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.hvWinding}</TableCell>
                    <TableCell>{item.lvWinding}</TableCell>
                    <TableCell>{item.tvWinding}</TableCell>
                    <TableCell className="font-semibold text-blue-600">{item.calculated}</TableCell>
                    <TableCell>{item.tester}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenModal('dcResistance', 'view', item)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenModal('dcResistance', 'edit', item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Single Phase Impedance Measurement Table */}
        <Card className="bg-white shadow-lg rounded-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800">Single Phase Impedance Measurement</CardTitle>
            <Button 
              onClick={() => handleOpenModal('singlePhase', 'add')}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              เพิ่มข้อมูล
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>วันที่ทดสอบ</TableHead>
                  <TableHead>H-L (%)</TableHead>
                  <TableHead>H-T (%)</TableHead>
                  <TableHead>L-T (%)</TableHead>
                  <TableHead>ค่าคำนวณ</TableHead>
                  <TableHead>ผู้ทดสอบ</TableHead>
                  <TableHead>การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {singlePhaseData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.hl}</TableCell>
                    <TableCell>{item.ht}</TableCell>
                    <TableCell>{item.lt}</TableCell>
                    <TableCell className="font-semibold text-blue-600">{item.calculated}</TableCell>
                    <TableCell>{item.tester}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenModal('singlePhase', 'view', item)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenModal('singlePhase', 'edit', item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Three Phase Impedance Measurement Table */}
        <Card className="bg-white shadow-lg rounded-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800">Three Phase Impedance Measurement</CardTitle>
            <Button 
              onClick={() => handleOpenModal('threePhase', 'add')}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              เพิ่มข้อมูล
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>วันที่ทดสอบ</TableHead>
                  <TableHead>H-L (%)</TableHead>
                  <TableHead>H-T (%)</TableHead>
                  <TableHead>L-T (%)</TableHead>
                  <TableHead>ค่าคำนวณ</TableHead>
                  <TableHead>ผู้ทดสอบ</TableHead>
                  <TableHead>การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {threePhaseData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.hl}</TableCell>
                    <TableCell>{item.ht}</TableCell>
                    <TableCell>{item.lt}</TableCell>
                    <TableCell className="font-semibold text-blue-600">{item.calculated}</TableCell>
                    <TableCell>{item.tester}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenModal('threePhase', 'view', item)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenModal('threePhase', 'edit', item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Modals */}
        <CoreInsulationResistanceModal
          isOpen={coreInsulationModal.isOpen}
          onClose={() => handleCloseModal('coreInsulation')}
          mode={coreInsulationModal.mode}
          data={coreInsulationModal.data}
        />

        <ExcitingCurrentMeasurementModal
          isOpen={excitingCurrentModal.isOpen}
          onClose={() => handleCloseModal('excitingCurrent')}
          mode={excitingCurrentModal.mode}
          data={excitingCurrentModal.data}
        />

        <DCResistanceMeasurementModal
          isOpen={dcResistanceModal.isOpen}
          onClose={() => handleCloseModal('dcResistance')}
          mode={dcResistanceModal.mode}
          data={dcResistanceModal.data}
        />

        <SinglePhaseImpedanceMeasurementModal
          isOpen={singlePhaseModal.isOpen}
          onClose={() => handleCloseModal('singlePhase')}
          mode={singlePhaseModal.mode}
          data={singlePhaseModal.data}
        />

        <ThreePhaseImpedanceMeasurementModal
          isOpen={threePhaseModal.isOpen}
          onClose={() => handleCloseModal('threePhase')}
          mode={threePhaseModal.mode}
          data={threePhaseModal.data}
        />
      </div>
    </DashboardLayout>
  );
};

export default ElectricalTestResults;
