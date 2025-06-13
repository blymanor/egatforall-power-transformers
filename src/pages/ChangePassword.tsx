
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
      <div className="min-h-[calc(100vh-4rem)] p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Header Section - moved to top left */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">เปลี่ยนรหัสผ่าน</h1>
            <p className="text-gray-600">กรุณาระบุรหัสผ่านใหม่ของคุณ</p>
          </div>
          
          <div className="max-w-lg">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="text-center text-xl flex items-center justify-center gap-2">
                  <Lock className="h-5 w-5" />
                  เปลี่ยนรหัสผ่าน
                </CardTitle>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6 p-8">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
                      รหัสผ่านปัจจุบัน
                    </Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="pr-12 h-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="กรอกรหัสผ่านปัจจุบัน"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                        onClick={() => togglePasswordVisibility('current')}
                        tabIndex={-1}
                      >
                        {showCurrentPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                      รหัสผ่านใหม่
                    </Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="pr-12 h-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="กรอกรหัสผ่านใหม่"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                        onClick={() => togglePasswordVisibility('new')}
                        tabIndex={-1}
                      >
                        {showNewPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      ยืนยันรหัสผ่านใหม่
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="pr-12 h-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="ยืนยันรหัสผ่านใหม่"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                        onClick={() => togglePasswordVisibility('confirm')}
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="bg-gray-50 px-8 py-6 rounded-b-lg">
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  >
                    เปลี่ยนรหัสผ่าน
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChangePassword;
