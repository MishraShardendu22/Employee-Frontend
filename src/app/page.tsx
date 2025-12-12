"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, UserCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Page = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(`/${user.user_type}/dashboard`);
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-[#0D1117] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3C8DFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1B6FD1]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block px-6 py-2 bg-[#3C8DFF]/20 border border-[#3C8DFF]/30 rounded-full mb-4">
            <span className="text-sm font-semibold text-[#3C8DFF]">
              Modern Leave Management Solution
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Employee Leave <br />
            <span className="bg-gradient-to-r from-[#3C8DFF] to-[#1B6FD1] bg-clip-text text-transparent">Management System</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Streamline your leave requests and approvals with our powerful, intuitive platform
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-[#2B2F36] bg-[#161B22] hover:border-[#3C8DFF]/50 group">
            <CardHeader className="text-center space-y-4 pb-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-[#3C8DFF]/30 to-[#3C8DFF]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Building2 className="w-10 h-10 text-[#3C8DFF]" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2 text-white">Admin Portal</CardTitle>
                <CardDescription className="text-base text-gray-400">
                  Manage employees, managers, and leave types with full control
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/login/admin" className="block">
                <Button className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all bg-[#3C8DFF] hover:bg-[#3378D6] text-white">
                  Login as Admin
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-[#2B2F36] bg-[#161B22] hover:border-[#1B6FD1]/50 group">
            <CardHeader className="text-center space-y-4 pb-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-[#1B6FD1]/30 to-[#1B6FD1]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <UserCircle className="w-10 h-10 text-[#1B6FD1]" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2 text-white">Employee Portal</CardTitle>
                <CardDescription className="text-base text-gray-400">
                  Request leaves and check your balance effortlessly
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/login/employee" className="block">
                <Button className="w-full h-12 text-base font-semibold border-2 border-[#1B6FD1] bg-transparent text-[#1B6FD1] hover:bg-[#1B6FD1] hover:text-white transition-all" variant="outline">
                  Login as Employee
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-[#2B2F36] bg-[#161B22] hover:border-[#FFB400]/50 group">
            <CardHeader className="text-center space-y-4 pb-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-[#FFB400]/30 to-[#FFB400]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Users className="w-10 h-10 text-[#FFB400]" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2 text-white">Manager Portal</CardTitle>
                <CardDescription className="text-base text-gray-400">
                  Review and approve leave requests from your team
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/login/manager" className="block">
                <Button className="w-full h-12 text-base font-semibold border-2 border-[#FFB400] bg-transparent text-[#FFB400] hover:bg-[#FFB400] hover:text-black transition-all" variant="outline">
                  Login as Manager
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Why Choose Our System?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="mx-auto w-16 h-16 bg-[#2ECC71]/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#2ECC71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-white">Easy to Use</h3>
              <p className="text-gray-400">Intuitive interface for seamless navigation</p>
            </div>
            <div className="text-center space-y-3">
              <div className="mx-auto w-16 h-16 bg-[#3C8DFF]/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#3C8DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-white">Secure & Reliable</h3>
              <p className="text-gray-400">Your data is protected with encryption</p>
            </div>
            <div className="text-center space-y-3">
              <div className="mx-auto w-16 h-16 bg-[#FFB400]/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#FFB400]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-white">Fast Performance</h3>
              <p className="text-gray-400">Lightning-fast response times</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
