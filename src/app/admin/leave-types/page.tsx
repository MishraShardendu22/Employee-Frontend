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
import { leaveTypeAPI } from "@/lib/api";
import type { LeaveType, LeaveTypeCreate } from "@/lib/types";

export default function LeaveTypesPage() {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<LeaveTypeCreate>({
    name: "",
  });

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: FileText },
    { name: "Employees", href: "/admin/employees", icon: UserCircle },
    { name: "Managers", href: "/admin/managers", icon: Users },
    { name: "Leave Types", href: "/admin/leave-types", icon: Calendar },
  ];

  const fetchLeaveTypes = async () => {
    try {
      const data = await leaveTypeAPI.getAll();
      setLeaveTypes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch leave types");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await leaveTypeAPI.create(formData);
      setSuccess("Leave type created successfully");
      setDialogOpen(false);
      setFormData({ name: "" });
      fetchLeaveTypes();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create leave type");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this leave type?")) return;

    try {
      await leaveTypeAPI.delete(id);
      setSuccess("Leave type deleted successfully");
      fetchLeaveTypes();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete leave type");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout navigation={navigation} title="Admin Portal">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Leave Types</h1>
              <p className="text-muted-foreground mt-2">
                Manage available leave categories
              </p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Leave Type
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Leave Type</DialogTitle>
                  <DialogDescription>
                    Create a new leave category
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ name: e.target.value })
                      }
                      placeholder="e.g., Sick Leave, Casual Leave"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Create Leave Type
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Leave Types List</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : leaveTypes.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No leave types found
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveTypes.map((leaveType) => (
                      <TableRow key={leaveType.id}>
                        <TableCell>{leaveType.id}</TableCell>
                        <TableCell className="font-medium">
                          {leaveType.name}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(leaveType.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
