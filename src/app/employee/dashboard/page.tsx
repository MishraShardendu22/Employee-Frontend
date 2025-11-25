"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { leaveAPI, leaveBalanceAPI } from "@/lib/api";
import type { Leave, LeaveBalance } from "@/lib/types";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [balances, setBalances] = useState<LeaveBalance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.user_id) return;
      
      try {
        const [leavesData, balancesData] = await Promise.all([
          leaveAPI.getByEmployee(user.user_id),
          leaveBalanceAPI.getByEmployee(user.user_id),
        ]);

        setLeaves(leavesData);
        setBalances(balancesData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const navigation = [
    { name: "Dashboard", href: "/employee/dashboard", icon: FileText },
    { name: "My Leaves", href: "/employee/leaves", icon: Calendar },
    { name: "Leave Balance", href: "/employee/balance", icon: CheckCircle },
  ];

  const pendingLeaves = leaves.filter((l) => l.status === "pending").length;
  const approvedLeaves = leaves.filter((l) => l.status === "approved").length;
  const rejectedLeaves = leaves.filter((l) => l.status === "rejected").length;

  return (
    <ProtectedRoute allowedRoles={["employee"]}>
      <DashboardLayout navigation={navigation} title="Employee Portal">
        <div className="space-y-8">
          {/* Header */}
          <div className="gradient-bg p-6 rounded-2xl border border-border">
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Overview of your leave requests and balances
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="card-hover border-2 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Requests
                </CardTitle>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {loading ? "..." : leaves.length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">All time requests</p>
              </CardContent>
            </Card>

            <Card className="card-hover border-2 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending
                </CardTitle>
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" style={{color: "oklch(var(--warning))"}}>
                  {loading ? "..." : pendingLeaves}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
              </CardContent>
            </Card>

            <Card className="card-hover border-2 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Approved
                </CardTitle>
                <div className="p-2 bg-success/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" style={{color: "oklch(var(--success))"}}>
                  {loading ? "..." : approvedLeaves}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Successfully approved</p>
              </CardContent>
            </Card>

            <Card className="card-hover border-2 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Rejected
                </CardTitle>
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <XCircle className="h-5 w-5 text-destructive" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">
                  {loading ? "..." : rejectedLeaves}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Not approved</p>
              </CardContent>
            </Card>
          </div>

          {/* Content Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Leave Balance */}
            <Card className="border-2 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="border-b border-border bg-muted/30">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  Leave Balance
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-pulse text-muted-foreground">Loading...</div>
                  </div>
                ) : balances.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No leave balance information available</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {balances.map((balance) => (
                      <div
                        key={balance.id}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-border/50 hover:shadow-md transition-shadow"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-foreground mb-1">Leave Type #{balance.type_id}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Used: {balance.total_used}</span>
                            <span>•</span>
                            <span>Total: {balance.total_allocated}</span>
                          </div>
                          <div className="mt-2 w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-primary h-full rounded-full transition-all"
                              style={{width: `${(balance.total_used / balance.total_allocated) * 100}%`}}
                            />
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-3xl font-bold text-primary">
                            {balance.remaining}
                          </p>
                          <p className="text-xs text-muted-foreground">remaining</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Requests */}
            <Card className="border-2 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="border-b border-border bg-muted/30">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-secondary" />
                  </div>
                  Recent Leave Requests
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-pulse text-muted-foreground">Loading...</div>
                  </div>
                ) : leaves.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No leave requests yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {leaves.slice(0, 5).map((leave) => (
                      <div
                        key={leave.id}
                        className="p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl border border-border/50 hover:shadow-md transition-all hover:border-primary/30"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <p className="font-semibold text-foreground mb-1">
                              {new Date(leave.start_time).toLocaleDateString()} -{" "}
                              {new Date(leave.end_time).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {leave.reason || "No reason provided"}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                              leave.status === "approved"
                                ? "bg-success/10 text-success border border-success/20"
                                : leave.status === "rejected"
                                  ? "bg-destructive/10 text-destructive border border-destructive/20"
                                  : "bg-warning/10 text-warning border border-warning/20"
                            }`}
                          >
                            {leave.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
