"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { approvalAPI, leaveTypeAPI } from "@/lib/api";
import type { Leave, LeaveType } from "@/lib/types";

export default function ManagerApprovalsPage() {
  const { user } = useAuth();
  const [pendingLeaves, setPendingLeaves] = useState<Leave[]>([]);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigation = [
    { name: "Dashboard", href: "/manager/dashboard", icon: FileText },
    { name: "Pending Approvals", href: "/manager/approvals", icon: Clock },
  ];

  const fetchData = async () => {
    try {
      const [leavesData, typesData] = await Promise.all([
        approvalAPI.getPending(),
        leaveTypeAPI.getAll(),
      ]);

      setPendingLeaves(leavesData);
      setLeaveTypes(typesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApproval = async (leaveId: number, decision: "approved" | "rejected") => {
    setError("");
    setSuccess("");

    if (!user?.user_id) {
      setError("Manager not authenticated");
      return;
    }

    try {
      await approvalAPI.create({ leave_id: leaveId, decision }, user.user_id);
      setSuccess(`Leave request ${decision} successfully`);
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process approval");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["manager"]}>
      <DashboardLayout navigation={navigation} title="Manager Portal">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pending Approvals</h1>
            <p className="text-muted-foreground mt-2">
              Review and approve employee leave requests
            </p>
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
              <CardTitle>Leave Requests Awaiting Approval</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : pendingLeaves.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                  <p className="text-lg font-medium text-foreground">
                    All Caught Up!
                  </p>
                  <p className="text-muted-foreground mt-2">
                    No pending approval requests at the moment
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingLeaves.map((leave) => {
                    const leaveType = leaveTypes.find((t) => t.id === leave.type_id);
                    
                    return (
                      <div
                        key={leave.id}
                        className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-lg font-semibold">
                                Leave Request #{leave.id}
                              </h3>
                              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent text-accent-foreground">
                                Pending
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Employee ID</p>
                                <p className="font-medium">{leave.employee_id}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Leave Type</p>
                                <p className="font-medium">
                                  {leaveType?.name || `Type #${leave.type_id}`}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Start Date</p>
                                <p className="font-medium">
                                  {new Date(leave.start_time).toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">End Date</p>
                                <p className="font-medium">
                                  {new Date(leave.end_time).toLocaleString()}
                                </p>
                              </div>
                            </div>

                            {leave.reason && (
                              <div className="mb-4">
                                <p className="text-sm text-muted-foreground mb-1">Reason</p>
                                <p className="text-foreground bg-accent/10 p-3 rounded">
                                  {leave.reason}
                                </p>
                              </div>
                            )}

                            <div className="flex gap-3">
                              <Button
                                onClick={() => handleApproval(leave.id, "approved")}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                onClick={() => handleApproval(leave.id, "rejected")}
                                variant="destructive"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
