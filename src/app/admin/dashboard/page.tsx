"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCircle, Calendar, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { employeeAPI, managerAPI, leaveAPI, leaveTypeAPI } from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    managers: 0,
    leaveTypes: 0,
    totalLeaves: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [employees, managers, leaveTypes, leaves] = await Promise.all([
          employeeAPI.getAll(),
          managerAPI.getAll(),
          leaveTypeAPI.getAll(),
          leaveAPI.getAll(),
        ]);

        setStats({
          employees: employees.length,
          managers: managers.length,
          leaveTypes: leaveTypes.length,
          totalLeaves: leaves.length,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: FileText },
    { name: "Employees", href: "/admin/employees", icon: UserCircle },
    { name: "Managers", href: "/admin/managers", icon: Users },
    { name: "Leave Types", href: "/admin/leave-types", icon: Calendar },
  ];

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardLayout navigation={navigation} title="Admin Portal">
        <div className="space-y-8">
          {/* Header */}
          <div className="gradient-bg p-6 rounded-2xl border border-border">
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Overview of your leave management system
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="card-hover border-2 bg-linear-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Employees
                </CardTitle>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <UserCircle className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {loading ? "..." : stats.employees}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Active employees</p>
              </CardContent>
            </Card>

            <Card className="card-hover border-2 bg-linear-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Managers
                </CardTitle>
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Users className="h-5 w-5 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {loading ? "..." : stats.managers}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Active managers</p>
              </CardContent>
            </Card>

            <Card className="card-hover border-2 bg-linear-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Leave Types
                </CardTitle>
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {loading ? "..." : stats.leaveTypes}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Configured types</p>
              </CardContent>
            </Card>

            <Card className="card-hover border-2 bg-linear-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Leave Requests
                </CardTitle>
                <div className="p-2 bg-success/10 rounded-lg">
                  <FileText className="h-5 w-5 text-success" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {loading ? "..." : stats.totalLeaves}
                </div>
                <p className="text-xs text-muted-foreground mt-1">All time requests</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-2 bg-linear-to-br from-card to-card/50">
            <CardHeader className="border-b border-border bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-3">
                <a
                  href="/admin/employees"
                  className="group p-6 border-2 rounded-xl hover:border-primary transition-all bg-linear-to-br from-primary/5 to-transparent card-hover"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <UserCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">Manage Employees</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Add, edit, or remove employees from the system
                  </p>
                </a>
                <a
                  href="/admin/managers"
                  className="group p-6 border-2 rounded-xl hover:border-secondary transition-all bg-linear-to-br from-secondary/5 to-transparent card-hover"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                      <Users className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">Manage Managers</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Add or remove managers and assign responsibilities
                  </p>
                </a>
                <a
                  href="/admin/leave-types"
                  className="group p-6 border-2 rounded-xl hover:border-accent transition-all bg-linear-to-br from-accent/5 to-transparent card-hover"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                      <Calendar className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">Manage Leave Types</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Configure leave categories and allocations
                  </p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
