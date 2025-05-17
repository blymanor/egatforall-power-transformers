
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QuickActions: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">คำสั่งด่วน</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Button className="justify-start">เพิ่มหม้อแปลงใหม่</Button>
          <Button className="justify-start" variant="outline">บันทึกการบำรุงรักษา</Button>
          <Button className="justify-start" variant="outline">ดูรายงานล่าสุด</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
