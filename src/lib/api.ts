import type {
  LoginRequest,
  Token,
  Admin,
  Employee,
  Manager,
  AdminCreate,
  EmployeeCreate,
  ManagerCreate,
  LeaveType,
  LeaveTypeCreate,
  Leave,
  LeaveCreate,
  LeaveBalance,
  LeaveBalanceCreate,
  Approval,
  ApprovalCreate,
  AuditLog,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Generic fetch wrapper with error handling
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    mode: 'cors',
    headers: {
      ...getAuthHeaders(),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      detail: response.statusText,
    }));
    throw new Error(error.detail || "An error occurred");
  }

  return response.json();
}

// Auth API
export const authAPI = {
  loginAdmin: (data: LoginRequest) =>
    fetchAPI<Token>("/auth/login/admin", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  loginEmployee: (data: LoginRequest) =>
    fetchAPI<Token>("/auth/login/employee", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  loginManager: (data: LoginRequest) =>
    fetchAPI<Token>("/auth/login/manager", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// Admin API
export const adminAPI = {
  getAll: () => fetchAPI<Admin[]>("/admins/"),
  getById: (id: number) => fetchAPI<Admin>(`/admins/${id}`),
  create: (data: AdminCreate) =>
    fetchAPI<Admin>("/admins/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    fetchAPI<{ message: string }>(`/admins/${id}`, { method: "DELETE" }),
};

// Employee API
export const employeeAPI = {
  getAll: () => fetchAPI<Employee[]>("/employees/"),
  getById: (id: number) => fetchAPI<Employee>(`/employees/${id}`),
  create: (data: EmployeeCreate) =>
    fetchAPI<Employee>("/employees/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<EmployeeCreate>) =>
    fetchAPI<Employee>(`/employees/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    fetchAPI<{ message: string }>(`/employees/${id}`, { method: "DELETE" }),
};

// Manager API
export const managerAPI = {
  getAll: () => fetchAPI<Manager[]>("/managers/"),
  getById: (id: number) => fetchAPI<Manager>(`/managers/${id}`),
  create: (data: ManagerCreate) =>
    fetchAPI<Manager>("/managers/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    fetchAPI<{ message: string }>(`/managers/${id}`, { method: "DELETE" }),
};

// Leave Type API
export const leaveTypeAPI = {
  getAll: () => fetchAPI<LeaveType[]>("/leave-types/"),
  getById: (id: number) => fetchAPI<LeaveType>(`/leave-types/${id}`),
  create: (data: LeaveTypeCreate) =>
    fetchAPI<LeaveType>("/leave-types/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    fetchAPI<{ message: string }>(`/leave-types/${id}`, { method: "DELETE" }),
};

// Leave API
export const leaveAPI = {
  getAll: () => fetchAPI<Leave[]>("/leaves/"),
  getById: (id: number) => fetchAPI<Leave>(`/leaves/${id}`),
  getByEmployee: (employeeId: number) =>
    fetchAPI<Leave[]>(`/leaves/employee/${employeeId}`),
  create: (data: LeaveCreate) =>
    fetchAPI<Leave>("/leaves/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<LeaveCreate>) =>
    fetchAPI<Leave>(`/leaves/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    fetchAPI<{ message: string }>(`/leaves/${id}`, { method: "DELETE" }),
};

// Leave Balance API
export const leaveBalanceAPI = {
  getAll: () => fetchAPI<LeaveBalance[]>("/leave-balances/"),
  getById: (id: number) => fetchAPI<LeaveBalance>(`/leave-balances/${id}`),
  getByEmployee: (employeeId: number) =>
    fetchAPI<LeaveBalance[]>(`/leave-balances/employee/${employeeId}`),
  create: (data: LeaveBalanceCreate) =>
    fetchAPI<LeaveBalance>("/leave-balances/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<LeaveBalanceCreate>) =>
    fetchAPI<LeaveBalance>(`/leave-balances/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    fetchAPI<{ message: string }>(`/leave-balances/${id}`, {
      method: "DELETE",
    }),
};

// Approval API
export const approvalAPI = {
  getAll: () => fetchAPI<Approval[]>("/approvals/"),
  getById: (id: number) => fetchAPI<Approval>(`/approvals/${id}`),
  getPending: () => fetchAPI<Leave[]>("/approvals/pending"),
  create: (data: ApprovalCreate) =>
    fetchAPI<Approval>("/approvals/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// Audit Log API
export const auditLogAPI = {
  getAll: () => fetchAPI<AuditLog[]>("/audit-logs/"),
  getByActor: (actorType: string, actorId: number) =>
    fetchAPI<AuditLog[]>(`/audit-logs/actor/${actorType}/${actorId}`),
};
