
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { UserPlus, Edit, Trash2, Check, X } from "lucide-react";
import { toast } from "sonner";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface UserData {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  privileges: boolean[];
}

const initialUsers: UserData[] = [
  {
    id: 1,
    login: "admin",
    firstName: "admin",
    lastName: "admin",
    privileges: [true, true, true, true, true, true, true, true, true],
  },
  {
    id: 2,
    login: "priv",
    firstName: "priv",
    lastName: "priv",
    privileges: [false, true, false, false, true, false, false, false, true],
  },
  {
    id: 3,
    login: "s1234",
    firstName: "s1234",
    lastName: "s1234",
    privileges: [false, true, false, false, true, false, false, false, true],
  },
  {
    id: 4,
    login: "s1234",
    firstName: "s1234",
    lastName: "s1234",
    privileges: [false, true, false, false, true, false, false, false, true],
  },
  {
    id: 5,
    login: "s1234",
    firstName: "s1234",
    lastName: "s1234",
    privileges: [false, true, false, false, true, false, false, false, true],
  },
  {
    id: 6,
    login: "s1234",
    firstName: "s1234",
    lastName: "s1234",
    privileges: [false, true, false, false, true, false, false, false, true],
  },
  {
    id: 7,
    login: "s1234",
    firstName: "s1234",
    lastName: "s1234",
    privileges: [false, true, false, false, true, false, false, false, true],
  },
  {
    id: 8,
    login: "s1234",
    firstName: "s1234",
    lastName: "s1234",
    privileges: [false, true, false, false, true, false, false, false, true],
  },
  {
    id: 9,
    login: "s1234",
    firstName: "s1234",
    lastName: "s1234",
    privileges: [false, true, false, false, true, false, false, false, true],
  },
  {
    id: 10,
    login: "s1234",
    firstName: "s1234",
    lastName: "s1234",
    privileges: [false, true, false, false, true, false, false, false, true],
  },
];

const privilegeTitles = [
  "Priv 1",
  "Priv 2",
  "Priv 3",
  "Priv 4",
  "Priv 5",
  "Priv 6",
  "Priv 7",
  "Priv 8",
  "Priv 9",
];

const privilegeLabels = [
  "Priv1 Visual Inspection",
  "Priv2 ผลทดสอบทางน้ำมัน",
  "Priv3 ผลทดสอบทางไฟฟ้า",
  "Priv4 บำรุงรักษา OLTC",
  "Priv5 ข้อมูลพื้นฐานของหม้อแปลง",
  "Priv6 การย้ายหม้อแปลง",
  "Priv7 รายงานความเสียหายของหม้อแปลง",
  "Priv8 จัดการผู้ใช้งานระบบ",
  "Priv9 Center Administrator",
];

const UserManagement = () => {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddUser = () => {
    setCurrentUser({
      id: users.length + 1,
      login: "",
      firstName: "",
      lastName: "",
      privileges: Array(9).fill(false),
    });
    setIsDialogOpen(true);
  };

  const handleEditUser = (user: UserData) => {
    setCurrentUser({ ...user });
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success("ลบผู้ใช้งานสำเร็จ");
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentUser(null);
  };

  const handleSaveUser = () => {
    if (!currentUser) return;
    
    if (!currentUser.login || !currentUser.firstName || !currentUser.lastName) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    
    if (currentUser.id > users.length) {
      // Adding new user
      setUsers([...users, currentUser]);
      toast.success("เพิ่มผู้ใช้งานสำเร็จ");
    } else {
      // Updating existing user
      setUsers(users.map(user => user.id === currentUser.id ? currentUser : user));
      toast.success("แก้ไขข้อมูลผู้ใช้งานสำเร็จ");
    }
    
    setIsDialogOpen(false);
    setCurrentUser(null);
  };

  const handlePrivilegeChange = (index: number, checked: boolean) => {
    if (!currentUser) return;
    
    const newPrivileges = [...currentUser.privileges];
    newPrivileges[index] = checked;
    
    setCurrentUser({
      ...currentUser,
      privileges: newPrivileges,
    });
  };

  const handleInputChange = (field: keyof UserData, value: string) => {
    if (!currentUser) return;
    
    setCurrentUser({
      ...currentUser,
      [field]: value,
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">การจัดการผู้ใช้งานในระบบ</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Login</TableHead>
                  <TableHead>FirstName</TableHead>
                  <TableHead>LastName</TableHead>
                  {privilegeTitles.map((title, index) => (
                    <TableHead key={index}>{title}</TableHead>
                  ))}
                  <TableHead>Edit</TableHead>
                  <TableHead>Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id} className="bg-white border-b">
                    <TableCell>{user.login}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    {user.privileges.map((hasPrivilege, index) => (
                      <TableCell key={index} className="text-center">
                        {hasPrivilege ? (
                          <Check className="mx-auto h-5 w-5 text-green-500" />
                        ) : (
                          <X className="mx-auto h-5 w-5 text-red-500" />
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="p-4 flex justify-between items-center bg-white">
            <Button 
              onClick={handleAddUser} 
              className="flex items-center gap-2 bg-[#1E5CFF] hover:bg-blue-600 text-white"
            >
              <UserPlus className="h-4 w-4" />
              เพิ่มผู้ใช้งาน
            </Button>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink 
                        isActive={currentPage === pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                {totalPages > 5 && (
                  <>
                    <PaginationItem>
                      <span className="px-2">...</span>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentUser && currentUser.login ? 'แก้ไขข้อมูลผู้ใช้' : 'เพิ่มผู้ใช้งานใหม่'}
            </DialogTitle>
            <DialogDescription>
              กรุณากรอกข้อมูลให้ครบถ้วน
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <Label htmlFor="login">Login :</Label>
              <Input
                id="login"
                value={currentUser?.login || ''}
                onChange={(e) => handleInputChange('login', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password :</Label>
              <Input
                id="password"
                type="password"
                value={currentUser?.login || ''}
                onChange={(e) => handleInputChange('login', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="firstname">Firstname :</Label>
              <Input
                id="firstname"
                value={currentUser?.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lastname">Lastname :</Label>
              <Input
                id="lastname"
                value={currentUser?.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </div>
          </div>

          <div className="mt-2">
            <h3 className="font-medium mb-2">สิทธิ์ในการใช้งาน</h3>
            <div className="grid grid-cols-1 gap-2">
              {privilegeLabels.map((label, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`priv-${index}`}
                    checked={currentUser?.privileges[index] || false}
                    onCheckedChange={(checked) => handlePrivilegeChange(index, checked === true)}
                  />
                  <Label htmlFor={`priv-${index}`}>{label}</Label>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleDialogClose}>
              ยกเลิก
            </Button>
            <Button onClick={handleSaveUser} className="bg-[#1E5CFF] hover:bg-blue-600">
              บันทึก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default UserManagement;
