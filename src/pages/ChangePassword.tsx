
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Eye, EyeOff, Lock } from "lucide-react";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("รหัสผ่านใหม่และยืนยันรหัสผ่านใหม่ไม่ตรงกัน");
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error("รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
      return;
    }
    
    // Here you would typically make an API call to update the password
    toast.success("เปลี่ยนรหัสผ่านสำเร็จ");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    if (field === 'current') setShowCurrentPassword(!showCurrentPassword);
    if (field === 'new') setShowNewPassword(!showNewPassword);
    if (field === 'confirm') setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">เปลี่ยนรหัสผ่านผู้ใช้</h1>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-xl">เปลี่ยนรหัสผ่าน</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">รหัสผ่านปัจจุบัน</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => togglePasswordVisibility('current')}
                    tabIndex={-1}
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={20} className="text-gray-400" />
                    ) : (
                      <Eye size={20} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">รหัสผ่านใหม่</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => togglePasswordVisibility('new')}
                    tabIndex={-1}
                  >
                    {showNewPassword ? (
                      <EyeOff size={20} className="text-gray-400" />
                    ) : (
                      <Eye size={20} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">ยืนยันรหัสผ่านใหม่</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => togglePasswordVisibility('confirm')}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} className="text-gray-400" />
                    ) : (
                      <Eye size={20} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full flex items-center justify-center">
                <Lock className="mr-2 h-4 w-4" />
                เปลี่ยนรหัสผ่าน
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ChangePassword;
