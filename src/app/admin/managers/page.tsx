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
import { managerAPI } from "@/lib/api";
import type { Manager, ManagerCreate } from "@/lib/types";

export default function ManagersPage() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<ManagerCreate>({
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

  const fetchManagers = async () => {
    try {
      const data = await managerAPI.getAll();
      setManagers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch managers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await managerAPI.create(formData);
      setSuccess("Manager created successfully");
      setDialogOpen(false);
      setFormData({ name: "", email: "", password: "" });
      fetchManagers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create manager");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this manager?")) return;

    try {
      await managerAPI.delete(id);
      setSuccess("Manager deleted successfully");
      fetchManagers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete manager");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout navigation={navigation} title="Admin Portal">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Managers</h1>
              <p className="text-muted-foreground mt-2">
                Manage manager accounts and access
              </p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Manager
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Manager</DialogTitle>
                  <DialogDescription>
                    Create a new manager account
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Create Manager
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
              <CardTitle>Manager List</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : managers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No managers found
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {managers.map((manager) => (
                      <TableRow key={manager.id}>
                        <TableCell>{manager.id}</TableCell>
                        <TableCell className="font-medium">
                          {manager.name}
                        </TableCell>
                        <TableCell>{manager.email}</TableCell>
                        <TableCell>
                          {new Date(manager.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(manager.id)}
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
