
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const transformerData: any = {
  "AT2-KT1A": {
    activeParts: {
      healthIndex: "43.65",
      details: [
        { name: 'Core Insulation Resistance:', value: '100.0', color: '#ef4444' },
        { name: 'HV Winding:', value: '45.76', color: '#eab308' },
        { name: 'LV Winding:', value: '43.53', color: '#eab308' },
        { name: 'TV Winding:', value: '35.38', color: '#eab308', details: [
          { name: 'DC Resistance Measurement:%Maximum Error Between Phase:', value: '', icon: true },
          { name: 'DC Resistance Measurement:%Maximum Error:', value: '', icon: true },
          { name: 'Exciting Current Measurement:Idiff TV(200V):', value: '0.0', color: '#6b7280' },
          { name: 'Insulation Test of Auto Transformer TV:', value: '4.0', color: '#f97316' },
          { name: 'Insulation Test of Three Winding Transformer TV:', value: '2.0', color: '#3b82f6' }
        ]}
      ]
    },
    oilAnalysis: {
      healthIndex: "75.0",
      details: [
        { name: 'Oil Aging:', value: '25.0', color: '#22c55e' },
        { name: 'Oil Contamination:', value: '34.52', color: '#3b82f6' },
        { name: 'Oil DGA:', value: '4.0', color: '#22c55e' },
        { name: 'Oil Furan:', value: '4.0', color: '#22c55e' }
      ]
    },
    oltc: {
      healthIndex: "84.48",
      details: [
        { name: 'OLTC Contact:', value: '0.0', color: '#6b7280' },
        { name: 'OLTC-DGA:', value: '4.0', color: '#22c55e' },
        { name: 'OLTC Oil Contamination:', value: '40.0', color: '#3b82f6' },
        { name: 'OLTC Dielectric:', value: '34.38', color: '#3b82f6' }
      ]
    },
    arrester: {
      healthIndex: "53.33",
      details: [
        { name: 'Arrester HV:', value: '20.0', color: '#22c55e' },
        { name: 'Arrester LV:', value: '40.0', color: '#3b82f6' },
        { name: 'Arrester TV:', value: '80.0', color: '#f97316' }
      ]
    },
    bushing: {
      healthIndex: "85.0",
      details: [
        { name: 'Bushing HV:', value: '85.0', color: '#22c55e' },
        { name: 'Bushing LV:', value: '90.0', color: '#22c55e' },
        { name: 'Bushing TV:', value: '80.0', color: '#3b82f6' }
      ]
    },
    generalCondition: {
      healthIndex: "92.5",
      details: [
        { name: 'DGA:', value: '4', color: '#22c55e' },
        { name: 'Load History:', value: '4', color: '#22c55e' },
        { name: 'Power Factor:', value: '4', color: '#22c55e' },
        { name: 'Thermo Scan:', value: '2', color: '#3b82f6' },
        { name: 'Oil Quality:', value: '1', color: '#f97316' },
        { name: 'Furan:', value: '4', color: '#22c55e' },
        { name: 'General Condition:', value: '4', color: '#22c55e' },
        { name: 'Bushing:', value: '2', color: '#eab308' },
        { name: 'Lightning Arrester:', value: '4', color: '#22c55e' },
        { name: 'Conservator Tank:', value: '4', color: '#22c55e' },
        { name: 'Main Tank:', value: '4', color: '#22c55e' },
        { name: 'Hot Line Oil Filter:', value: '4', color: '#22c55e' },
        { name: 'Radiator Cooling:', value: '4', color: '#22c55e' },
        { name: 'Transformer Control Cabinet:', value: '4', color: '#22c55e' },
        { name: 'NGR:', value: '3', color: '#3b82f6' },
        { name: 'Regulating PT:', value: '4', color: '#22c55e' },
        { name: 'OLTC Compartment:', value: '4', color: '#22c55e' },
        { name: 'OLTC Control Cabinet:', value: '4', color: '#22c55e' },
        { name: 'OLTC DGA:', value: '4', color: '#22c55e' },
        { name: 'OLTC Oil Quality:', value: '2', color: '#eab308' }
      ]
    }
  }
};

const ActivateTestResults = () => {
  const [transformer, setTransformer] = useState("");
  const [isActivated, setIsActivated] = useState(false);
  const { toast } = useToast();

  const handleActivate = () => {
    if (!transformer) {
      toast({
        title: "ยังไม่ได้เลือกหม้อแปลง",
        description: "กรุณาเลือกหม้อแปลงก่อน",
        variant: "destructive",
      });
      return;
    }

    setIsActivated(true);
    toast({
      title: "เปิดใช้งานผลการทดสอบสำเร็จ",
      description: `เปิดใช้งานผลการทดสอบสำหรับหม้อแปลงไฟฟ้า ${transformer} เรียบร้อยแล้ว`,
    });
  };

  const handleTransformerChange = (value: string) => {
    setTransformer(value);
    setIsActivated(false);
  };

  const currentData = transformer && isActivated && transformerData[transformer] ? transformerData[transformer] : null;

  const GroupSection = ({ title, data }: { title: string, data: any }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-blue-700">{title}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-green-100 border border-green-200 rounded">
            <span className="font-medium">%Health Index:</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{data.healthIndex}</span>
              <div className="w-20 h-4 bg-red-500 rounded"></div>
            </div>
          </div>

          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleContent className="space-y-2">
              {data.details?.map((item: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="font-medium">{item.name}</span>
                    <div className="flex items-center gap-2">
                      {item.icon ? (
                        <div className="w-4 h-4 bg-gray-300 rounded"></div>
                      ) : (
                        <>
                          <span className="font-medium">{item.value}</span>
                          {item.color && (
                            <div 
                              className="w-16 h-4 rounded"
                              style={{ backgroundColor: item.color }}
                            ></div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  
                  {item.details && (
                    <div className="ml-4 space-y-1 mt-2">
                      {item.details.map((subItem: any, subIndex: number) => (
                        <div key={subIndex} className="flex justify-between items-center p-2 bg-gray-100 rounded text-sm">
                          <span>{subItem.name}</span>
                          <div className="flex items-center gap-2">
                            {subItem.icon ? (
                              <div className="w-3 h-3 bg-gray-300 rounded"></div>
                            ) : (
                              <>
                                <span>{subItem.value}</span>
                                {subItem.color && (
                                  <div 
                                    className="w-12 h-3 rounded"
                                    style={{ backgroundColor: subItem.color }}
                                  ></div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6 bg-[#f0f4fa]">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Activate ผลการทดสอบ</h2>
          <p className="text-lg text-gray-600">เลือกหม้อแปลงไฟฟ้าและเปิดใช้งานผลการทดสอบ</p>
        </div>

        <Card className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border-0">
          <CardContent className="p-8 space-y-6">
            <div className="bg-blue-50 rounded-md p-4 mb-6 border-l-4 border-blue-500">
              <h2 className="text-xl font-semibold text-center text-gray-800">เลือกหม้อแปลงไฟฟ้า</h2>
            </div>

            <div className="space-y-8">
              <div>
                <label htmlFor="transformer" className="text-lg font-medium text-gray-700 block mb-3">
                  หม้อแปลงไฟฟ้า:
                </label>
                <Select value={transformer} onValueChange={handleTransformerChange}>
                  <SelectTrigger id="transformer" className="w-full h-14 text-lg">
                    <SelectValue placeholder="เลือกหม้อแปลงไฟฟ้า" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AT2-KT1A">AT2-KT1A</SelectItem>
                    <SelectItem value="AN-473A">AN-473A</SelectItem>
                    <SelectItem value="AN-474A">AN-474A</SelectItem>
                    <SelectItem value="AN-475A">AN-475A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="my-6" />

              {transformer ? (
                <div className="space-y-6">
                  {!isActivated ? (
                    <div className="flex justify-center pt-6">
                      <Button
                        onClick={handleActivate}
                        className="px-10 py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <CheckCircle className="mr-2 h-5 w-5" />
                        เปิดใช้งานผลการทดสอบ
                      </Button>
                    </div>
                  ) : (
                    currentData && (
                      <div className="space-y-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="bg-green-100 p-3 rounded">
                              <div className="font-medium text-green-800">หม้อแปลงไฟฟ้า:</div>
                              <div className="text-green-700">{transformer}</div>
                            </div>
                            <div className="bg-green-100 p-3 rounded">
                              <div className="font-medium text-green-800">ปีที่บันทึก:</div>
                              <div className="text-green-700">2024</div>
                            </div>
                            <div className="bg-green-100 p-3 rounded">
                              <div className="font-medium text-green-800">ไตรมาส:</div>
                              <div className="text-green-700">3</div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <GroupSection title="กลุ่ม Active Part" data={currentData.activeParts} />
                          <GroupSection title="กลุ่ม น้ำมันของหม้อแปลง" data={currentData.oilAnalysis} />
                          <GroupSection title="กลุ่ม OLTC" data={currentData.oltc} />
                          <GroupSection title="กลุ่ม Arrester" data={currentData.arrester} />
                          <GroupSection title="กลุ่ม Bushing" data={currentData.bushing} />
                          <GroupSection title="กลุ่ม General Condition" data={currentData.generalCondition} />
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg text-center text-lg text-gray-500">
                  กรุณาเลือกหม้อแปลงไฟฟ้าเพื่อเปิดใช้งานผลการทดสอบ
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ActivateTestResults;
