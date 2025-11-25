"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { approvalAPI } from "@/lib/api";
import type { Leave } from "@/lib/types";

export default function ManagerDashboard() {
  const [pendingLeaves, setPendingLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await approvalAPI.getPending();
        setPendingLeaves(data);
      } catch (error) {
        console.error("Failed to fetch pending leaves:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigation = [
    { name: "Dashboard", href: "/manager/dashboard", icon: FileText },
    { name: "Pending Approvals", href: "/manager/approvals", icon: Clock },
  ];

  return (
    <ProtectedRoute allowedRoles={["manager"]}>
      <DashboardLayout navigation={navigation} title="Manager Portal">
        <div className="space-y-8">
          {/* Header */}
          <div className="gradient-bg p-6 rounded-2xl border border-border">
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Overview of leave approval requests
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="card-hover border-2 bg-linear-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Approvals
                </CardTitle>
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" style={{color: "oklch(var(--warning))"}}>
                  {loading ? "..." : pendingLeaves.length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Awaiting your review</p>
              </CardContent>
            </Card>

            <Card className="card-hover border-2 bg-linear-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Quick Actions
                </CardTitle>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <a
                  href="/manager/approvals"
                  className="text-primary hover:underline font-semibold flex items-center gap-1 group"
                >
                  Review Pending Requests
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </CardContent>
            </Card>

            <Card className="card-hover border-2 bg-linear-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Status
                </CardTitle>
                <div className={`p-2 rounded-lg ${pendingLeaves.length === 0 ? 'bg-success/10' : 'bg-warning/10'}`}>
                  <CheckCircle className={`h-5 w-5 ${pendingLeaves.length === 0 ? 'text-success' : 'text-warning'}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium">
                  {pendingLeaves.length === 0 ? (
                    <span className="text-success">All caught up! 🎉</span>
                  ) : (
                    <span style={{color: "oklch(var(--warning))"}}>
                      {pendingLeaves.length} request(s) awaiting review
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Pending Requests */}
          <Card className="border-2 bg-linear-to-br from-card to-card/50">
            <CardHeader className="border-b border-border bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                Recent Pending Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-pulse text-muted-foreground">Loading requests...</div>
                </div>
              ) : pendingLeaves.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <CheckCircle className="h-16 w-16 mx-auto mb-4 text-success opacity-30" />
                  <p className="text-lg font-medium">No pending approval requests</p>
                  <p className="text-sm mt-2">Great! You're all caught up.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingLeaves.slice(0, 5).map((leave) => (
                    <div
                      key={leave.id}
                      className="flex items-start justify-between p-5 bg-linear-to-r from-warning/5 to-transparent rounded-xl border border-border/50 hover:shadow-md hover:border-warning/30 transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">
                              {leave.employee_id}
                            </span>
                          </div>
                          <p className="font-bold text-foreground">
                            Employee ID: {leave.employee_id}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                          <span className="font-medium">
                            {new Date(leave.start_time).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <span>→</span>
                          <span className="font-medium">
                            {new Date(leave.end_time).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {leave.reason || "No reason provided"}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <a href="/manager/approvals">
                          <span className="px-4 py-2 text-xs font-semibold rounded-lg bg-warning/10 text-warning border border-warning/20 hover:bg-warning/20 transition-colors cursor-pointer">
                            Review Now
                          </span>
                        </a>
                      </div>
                    </div>
                  ))}
                  {pendingLeaves.length > 5 && (
                    <div className="text-center pt-4">
                      <a 
                        href="/manager/approvals"
                        className="text-primary hover:underline font-semibold"
                      >
                        View all {pendingLeaves.length} pending requests →
                      </a>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
