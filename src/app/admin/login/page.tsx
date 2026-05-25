"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Shield, ArrowLeft } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("admin@bffp.org")
  const [password, setPassword] = useState("password123")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      setLoading(false)
      if (
        (email === "admin@bffp.org" || email === "admin@bffp.edu.pk" || email === "admin") &&
        password === "password123"
      ) {
        router.push("/admin")
      } else {
        alert("Invalid administrator credentials. Please use admin@bffp.org / password123")
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-10"></div>
      
      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="absolute -top-12 left-0 text-slate-500 hover:text-slate-900 flex items-center text-sm font-medium transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-none shadow-2xl shadow-slate-200/50 bg-white">
            <CardHeader className="space-y-1 pb-6 items-center">
              <div className="bg-brand-50 p-3 rounded-2xl inline-block mb-4">
                <Shield className="h-8 w-8 text-brand-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-center text-slate-900">Admin Login</CardTitle>
              <CardDescription className="text-center text-slate-500">
                Enter your administrative credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Admin Email</label>
                  <Input 
                    type="text" 
                    placeholder="admin@bffp.org" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700">Password</label>
                  </div>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <Button type="submit" className="w-full mt-6" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Authenticating...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
              
              <div className="mt-6 text-center text-sm">
                <span className="text-slate-500">Are you a Teacher? </span>
                <Link href="/login" className="font-semibold text-brand-600 hover:underline">
                  Teacher Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
