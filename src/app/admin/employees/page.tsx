"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, UserCircle, Calendar, FileText, Trash2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { employeeAPI } from "@/lib/api";
import type { Employee, EmployeeCreate } from "@/lib/types";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<EmployeeCreate>({
    name: "",
    email: "",
    password: "",
  });

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: FileText },
    { name: "Employees", href: "/admin/employees", icon: UserCircle },
    { name: "Managers", href: "/admin/managers", icon: Users },
    { name: "Leave Types", href: "/admin/leave-types", icon: Calendar },
  ];

  const fetchEmployees = async () => {
    try {
      const data = await employeeAPI.getAll();
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await employeeAPI.create(formData);
      setSuccess("Employee created successfully");
      setDialogOpen(false);
      setFormData({ name: "", email: "", password: "" });
      fetchEmployees();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create employee");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
      await employeeAPI.delete(id);
      setSuccess("Employee deleted successfully");
      fetchEmployees();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete employee");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout navigation={navigation} title="Admin Portal">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between p-6 rounded-2xl border border-[#E0E6ED] dark:border-[#2B2F36] bg-linear-to-br from-[#0047AB]/10 to-[#1E90FF]/10 dark:from-[#3C8DFF]/10 dark:to-[#1B6FD1]/10">
            <div>
              <h1 className="text-4xl font-bold text-[#0D0D0D] dark:text-[#F1F1F1] mb-2">Employees</h1>
              <p className="text-lg text-[#6C757D] dark:text-[#7A7F87]">
                Manage employee accounts and access
              </p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="h-11 px-6 shadow-lg hover:shadow-xl bg-[#0047AB] hover:bg-[#003B8F] dark:bg-[#3C8DFF] dark:hover:bg-[#3378D6] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Add New Employee</DialogTitle>
                  <DialogDescription className="text-base">
                    Create a new employee account
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="h-11 border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="h-11 border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Minimum 6 characters"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                      minLength={6}
                      className="h-11 border-2"
                    />
                  </div>
                  <Button type="submit" className="w-full h-11 font-semibold shadow-lg hover:shadow-xl">
                    Create Employee
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Alerts */}
          {error && (
            <Alert variant="destructive" className="border-2 border-[#DC3545] dark:border-[#FF4D4D] bg-[#DC3545]/10 dark:bg-[#FF4D4D]/10">
              <AlertDescription className="font-medium text-[#DC3545] dark:text-[#FF4D4D]">{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="border-2 border-[#28A745] dark:border-[#2ECC71] bg-[#28A745]/10 dark:bg-[#2ECC71]/10">
              <AlertDescription className="font-medium text-[#28A745] dark:text-[#2ECC71]">{success}</AlertDescription>
            </Alert>
          )}

          {/* Table Card */}
          <Card className="border-2 border-[#E0E6ED] dark:border-[#2B2F36] shadow-lg bg-white dark:bg-[#161B22]">
            <CardHeader className="border-b border-[#E0E6ED] dark:border-[#2B2F36] bg-[#F5F7FA]/30 dark:bg-[#0D1117]/30">
              <CardTitle className="flex items-center gap-2 text-xl text-[#0D0D0D] dark:text-[#F1F1F1]">
                <div className="p-2 bg-[#0047AB]/10 dark:bg-[#3C8DFF]/10 rounded-lg">
                  <UserCircle className="h-5 w-5 text-[#0047AB] dark:text-[#3C8DFF]" />
                </div>
                Employee List ({employees.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="text-center py-16">
                  <div className="animate-pulse text-[#6C757D] dark:text-[#7A7F87]">Loading employees...</div>
                </div>
              ) : employees.length === 0 ? (
                <div className="text-center py-16 text-[#6C757D] dark:text-[#7A7F87]">
                  <UserCircle className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">No employees found</p>
                  <p className="text-sm mt-2">Get started by adding your first employee</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#F5F7FA]/50 dark:bg-[#0D1117]/50 hover:bg-[#F5F7FA]/50 dark:hover:bg-[#0D1117]/50 border-b border-[#E0E6ED] dark:border-[#2B2F36]">
                        <TableHead className="font-bold text-[#0D0D0D] dark:text-[#F1F1F1]">ID</TableHead>
                        <TableHead className="font-bold text-[#0D0D0D] dark:text-[#F1F1F1]">Name</TableHead>
                        <TableHead className="font-bold text-[#0D0D0D] dark:text-[#F1F1F1]">Email</TableHead>
                        <TableHead className="font-bold text-[#0D0D0D] dark:text-[#F1F1F1]">Created At</TableHead>
                        <TableHead className="text-right font-bold text-[#0D0D0D] dark:text-[#F1F1F1]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employees.map((employee) => (
                        <TableRow key={employee.id} className="hover:bg-[#F5F7FA]/30 dark:hover:bg-[#161B22]/30 transition-colors border-b border-[#E0E6ED] dark:border-[#2B2F36]">
                          <TableCell className="font-mono text-[#6C757D] dark:text-[#7A7F87]">
                            #{employee.id}
                          </TableCell>
                          <TableCell className="font-semibold text-[#0D0D0D] dark:text-[#F1F1F1]">
                            {employee.name}
                          </TableCell>
                          <TableCell className="text-[#6C757D] dark:text-[#7A7F87]">
                            {employee.email}
                          </TableCell>
                          <TableCell className="text-[#6C757D] dark:text-[#7A7F87]">
                            {new Date(employee.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(employee.id)}
                              className="bg-[#DC3545] hover:bg-[#DC3545]/90 dark:bg-[#FF4D4D] dark:hover:bg-[#FF4D4D]/90 text-white shadow-sm hover:shadow-md transition-all"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
