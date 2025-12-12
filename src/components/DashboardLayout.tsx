"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
  navigation: {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
  title: string;
}

export function DashboardLayout({ children, navigation, title }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#0D1117]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-[#0D1117] shadow-2xl border-r border-[#2B2F36] transform transition-all duration-300 ease-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-[#2B2F36] bg-gradient-to-br from-[#3C8DFF]/10 to-[#1B6FD1]/10">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3C8DFF] to-[#1B6FD1] bg-clip-text text-transparent">{title}</h1>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#161B22] border border-[#2B2F36]">
              <div className="w-10 h-10 rounded-full bg-[#3C8DFF]/30 flex items-center justify-center">
                <span className="text-sm font-semibold text-[#3C8DFF]">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.email}</p>
                <p className="text-xs text-gray-400 capitalize">{user?.user_type}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#3C8DFF] text-white shadow-lg shadow-[#3C8DFF]/30"
                      : "text-gray-400 hover:bg-[#161B22] hover:text-white"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[#2B2F36] bg-[#161B22]/30">
            <Button
              variant="outline"
              className="w-full bg-transparent border-[#FF4D4D] text-[#FF4D4D] hover:bg-[#FF4D4D] hover:text-white transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="bg-[#161B22] shadow-sm border-b border-[#2B2F36] sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h2 className="text-xl font-bold text-white">{title}</h2>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <div className="text-sm text-gray-400">
                Welcome, <span className="font-semibold text-white">{user?.email}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 min-h-screen bg-[#0D1117]">{children}</main>
      </div>
    </div>
  );
}
