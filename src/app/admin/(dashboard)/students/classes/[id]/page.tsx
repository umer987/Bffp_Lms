"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { 
  Users, UserPlus, ArrowLeft, Search, 
  Edit, Eye, X, Calendar, FileText, CheckCircle
} from "lucide-react"
import Link from "next/link"

const INITIAL_STUDENTS = [
  { id: 1, name: "Ali Ahmed", rollNo: "C1-001", feeStatus: "Paid", contact: "0300-1234567", fatherName: "Ahmed Khan", monthlyFee: "4000", address: "Karachi" },
  { id: 2, name: "Sara Raza", rollNo: "C1-002", feeStatus: "Pending", contact: "0300-9876543", fatherName: "Raza Ali", monthlyFee: "4000", address: "Karachi" },
  { id: 3, name: "Zainab Bibi", rollNo: "C1-003", feeStatus: "Overdue", contact: "0311-1112223", fatherName: "Bibi Khan", monthlyFee: "4000", address: "Karachi" },
]

export default function ClassDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const [students, setStudents] = useState(INITIAL_STUDENTS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Form State
  const [rollNo, setRollNo] = useState("")
  const [fullName, setFullName] = useState("")
  const [fatherName, setFatherName] = useState("")
  const [contact, setContact] = useState("")
  const [monthlyFee, setMonthlyFee] = useState("")
  const [address, setAddress] = useState("")

  const openModal = (student: any = null) => {
    if (student) {
      setEditingStudent(student)
      setRollNo(student.rollNo)
      setFullName(student.name)
      setFatherName(student.fatherName || "")
      setContact(student.contact)
      setMonthlyFee(student.monthlyFee || "4000")
      setAddress(student.address || "")
    } else {
      setEditingStudent(null)
      setRollNo("")
      setFullName("")
      setFatherName("")
      setContact("")
      setMonthlyFee("")
      setAddress("")
    }
    setIsModalOpen(true)
  }

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!rollNo || !fullName || !fatherName || !contact) return

    if (editingStudent) {
      setStudents(students.map(s => s.id === editingStudent.id ? {
        ...s,
        name: fullName,
        rollNo: rollNo,
        fatherName: fatherName,
        contact: contact,
        monthlyFee: monthlyFee,
        address: address
      } : s))
    } else {
      const newStudent = {
        id: Math.max(...students.map(s => s.id), 0) + 1,
        name: fullName,
        rollNo: rollNo,
        feeStatus: "Pending",
        contact: contact,
        fatherName: fatherName,
        monthlyFee: monthlyFee,
        address: address
      }
      setStudents([...students, newStudent])
    }

    setIsModalOpen(false)
  }

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/students/classes">
            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-brand-600">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Class {id} Detail</h1>
            <p className="text-sm text-slate-500">Managing students for this specific class and section.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href={`/admin/students/classes/${id}/attendance`}>
            <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-brand-50">
              <Calendar className="h-4 w-4 mr-2" /> Take Attendance
            </Button>
          </Link>
          <Link href={`/admin/students/classes/${id}/results`}>
            <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-brand-50">
              <FileText className="h-4 w-4 mr-2" /> Generate Results
            </Button>
          </Link>
          <Button onClick={() => openModal()} className="bg-brand-600 hover:bg-brand-700 text-white shadow-md">
            <UserPlus className="h-4 w-4 mr-2" /> Add Student
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-4 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search students in this class..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-slate-50 border-slate-200 focus:ring-brand-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Student Table */}
      <Card className="border-none shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">Roll No</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Fee Status</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{student.rollNo}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{student.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      student.feeStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                      student.feeStatus === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {student.feeStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{student.contact}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/students/${student.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-brand-50 hover:text-brand-600">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/students/classes/${id}/results?studentId=${student.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-brand-50 hover:text-brand-600">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button onClick={() => openModal(student)} variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-brand-50 hover:text-brand-600">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add/Edit Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-2xl shadow-2xl overflow-hidden border-none">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50 py-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-brand-100 text-brand-600 rounded-lg">
                  {editingStudent ? <Edit className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
                </div>
                <CardTitle className="text-xl font-bold">
                  {editingStudent ? 'Edit Student Details' : 'Register Student'}
                </CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-slate-200 rounded-full">
                <X className="h-5 w-5 text-slate-500" />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSaveStudent}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Roll Number *</label>
                  <Input 
                    required
                    placeholder="e.g. C1-045" 
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    className="h-11 bg-slate-50 border-slate-200 focus:ring-brand-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Full Name *</label>
                  <Input 
                    required
                    placeholder="Student's name" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-11 bg-slate-50 border-slate-200 focus:ring-brand-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Father's Name *</label>
                  <Input 
                    required
                    placeholder="Father's name" 
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    className="h-11 bg-slate-50 border-slate-200 focus:ring-brand-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Parent Contact *</label>
                  <Input 
                    required
                    placeholder="03xx-xxxxxxx" 
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="h-11 bg-slate-50 border-slate-200 focus:ring-brand-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Monthly Fee</label>
                  <Input 
                    type="number" 
                    placeholder="4000" 
                    value={monthlyFee}
                    onChange={(e) => setMonthlyFee(e.target.value)}
                    className="h-11 bg-slate-50 border-slate-200 focus:ring-brand-500"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Address</label>
                  <Input 
                    placeholder="Residential address" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="h-11 bg-slate-50 border-slate-200 focus:ring-brand-500"
                  />
                </div>
                <div className="md:col-span-2 pt-4">
                   <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white h-12 text-lg font-bold shadow-lg transition-transform active:scale-95">
                     <CheckCircle className="h-5 w-5 mr-2" /> {editingStudent ? 'Update Details' : 'Register Student'}
                   </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}


