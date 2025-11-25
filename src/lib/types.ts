// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface TokenData {
  email: string;
  user_type: "admin" | "employee" | "manager";
  user_id: number;
}

// User Types
export interface Admin {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Manager {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface AdminCreate {
  name: string;
  email: string;
  password: string;
}

export interface EmployeeCreate {
  name: string;
  email: string;
  password: string;
}

export interface ManagerCreate {
  name: string;
  email: string;
  password: string;
}

// Leave Types
export interface LeaveType {
  id: number;
  name: string;
}

export interface LeaveTypeCreate {
  name: string;
}

export interface Leave {
  id: number;
  employee_id: number;
  type_id: number;
  start_time: string;
  end_time: string;
  reason?: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export interface LeaveCreate {
  type_id: number;
  start_time: string;
  end_time: string;
  reason?: string;
}

// Leave Balance
export interface LeaveBalance {
  id: number;
  employee_id: number;
  type_id: number;
  total_allocated: number;
  total_used: number;
  remaining: number;
}

export interface LeaveBalanceCreate {
  employee_id: number;
  type_id: number;
  total_allocated: number;
  total_used?: number;
  remaining?: number;
}

// Approval
export interface Approval {
  id: number;
  leave_id: number;
  approved_by: number;
  approved_at: string;
  decision: "approved" | "rejected";
}

export interface ApprovalCreate {
  leave_id: number;
  decision: "approved" | "rejected";
}

// Audit Log
export interface AuditLog {
  id: number;
  actor_type: "admin" | "manager" | "employee";
  actor_id: number;
  action: string;
  target_table: string;
  target_id: number;
  timestamp: string;
}
