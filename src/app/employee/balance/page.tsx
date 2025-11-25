"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { leaveBalanceAPI, leaveTypeAPI } from "@/lib/api";
import type { LeaveBalance, LeaveType } from "@/lib/types";

export default function EmployeeBalancePage() {
  const { user } = useAuth();
  const [balances, setBalances] = useState<LeaveBalance[]>([]);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = [
    { name: "Dashboard", href: "/employee/dashboard", icon: FileText },
    { name: "My Leaves", href: "/employee/leaves", icon: Calendar },
    { name: "Leave Balance", href: "/employee/balance", icon: CheckCircle },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.user_id) return;

      try {
        const [balancesData, typesData] = await Promise.all([
          leaveBalanceAPI.getByEmployee(user.user_id),
          leaveTypeAPI.getAll(),
        ]);

        setBalances(balancesData);
        setLeaveTypes(typesData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <ProtectedRoute allowedRoles={["employee"]}>
      <DashboardLayout navigation={navigation} title="Employee Portal">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leave Balance</h1>
            <p className="text-muted-foreground mt-2">
              View your available leave balances
            </p>
          </div>

          {loading ? (
            <Card>
              <CardContent className="py-8">
                <div className="text-center">Loading...</div>
              </CardContent>
            </Card>
          ) : balances.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  No leave balance information available
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {balances.map((balance) => {
                const leaveType = leaveTypes.find((t) => t.id === balance.type_id);
                const usagePercentage = (balance.total_used / balance.total_allocated) * 100;

                return (
                  <Card key={balance.id}>
                    <CardHeader>
                      <CardTitle>{leaveType?.name || `Leave Type #${balance.type_id}`}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total Allocated</span>
                        <span className="text-lg font-semibold">{balance.total_allocated}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Used</span>
                        <span className="text-lg font-semibold text-orange-600">
                          {balance.total_used}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Remaining</span>
                        <span className="text-lg font-semibold text-green-600">
                          {balance.remaining}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Usage</span>
                          <span className="font-medium">{usagePercentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              usagePercentage > 80
                                ? "bg-red-500"
                                : usagePercentage > 50
                                  ? "bg-orange-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
