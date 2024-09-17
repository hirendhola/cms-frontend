/* eslint-disable react/prop-types */

"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/Admin/useAuth'
import CreateDepartment from '@/components/Admin/CreateDepartment'
import Loading from '@/components/Loading'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Album, GraduationCap, Building, User, UserRoundPen, LogOut, Menu, Users, BookOpen, Settings } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SheetContent, SheetTrigger, Sheet } from '@/components/ui/sheet'
import { Toaster } from '@/components/ui/toaster'
import renderInsightCard from '@/components/InsightCard'


export default function Dashboard() {
  const { loading, user, college, refreshData, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (user) {
      console.log("User data:", user)
    }
    if (college) {
      console.log("College data:", college)
    }
  }, [user, college])

  const handleLogOut = async () => {
    try {
      await signOut()
      toast({ title: "SignOut Successful" })
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <Loading loading={loading} />
  }

  const renderOverview = () => {
    const departmentData = college?.departments?.map(dept => ({
      name: dept.name,
      students: Math.floor(Math.random() * 100) + 50,
      courses: Math.floor(Math.random() * 20) + 5,
    })) || []

    return (
      <div className="space-y-6 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {renderInsightCard("Total Departments", college?.departments?.length || 0, <Building className="h-4 w-4 text-blue-400" />)}
          {renderInsightCard("Total Students", "1,234", <Users className="h-4 w-4 text-green-400" />)}
          {renderInsightCard("Total Courses", "42", <BookOpen className="h-4 w-4 text-yellow-400" />)}
          {renderInsightCard("University Name", college?.uniName || 'N/A', <Album className="h-4 w-4 text-purple-400" />)}
        </div>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Department Statistics</h3>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departmentData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="students" fill="#8884d8" name="Students" />
                  <Bar yAxisId="right" dataKey="courses" fill="#82ca9d" name="Courses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderPersonalInfo = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Personal Information</h3>
        </CardHeader>
        <CardContent className="text-gray-300">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Mobile Number:</strong> {user?.mobileNumber}</p>
        </CardContent>
      </Card>
    </motion.div>
  )

  const renderCollegeInfo = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">College Information</h3>
        </CardHeader>
        <CardContent className="text-gray-300">
          <p className='font-medium'><strong>College Name:</strong> {college?.collegeName}</p>
          <p className='font-medium'><strong>College Code:</strong> {college?.collegeCode || 'N/A'}</p>
          <p className='font-medium'><strong>University Name:</strong> {college?.uniName}</p>
        </CardContent>
      </Card>
    </motion.div>
  )

  const renderDepartments = () => (
    <div className="space-y-4 font-medium">
      <div className='w-full flex items-center justify-between flex-col sm:flex-row gap-5'>
        <h3 className="text-lg font-semibold self-center text-white">Departments</h3>
        <div className="">
          <CreateDepartment college={college} onDepartmentCreated={refreshData} />
        </div>
      </div>
      <AnimatePresence>
        {college?.departments && college.departments.length > 0 ? (
          college.departments.map((department, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4 text-gray-300">
                  <p><strong>Name:</strong> {department.name}</p>
                  <p><strong>Code:</strong> {department.code}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-300">No departments found.</p>
        )}
      </AnimatePresence>
    </div>
  )

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'personalInfo', label: 'Personal Info', icon: UserRoundPen },
    { id: 'collegeInfo', label: 'College Info', icon: GraduationCap },
    { id: 'departments', label: 'Departments', icon: Album },
  ]

  const Sidebar = ({ onTabClick }) => (
    <div className="fixed left-0 top-0 w-64 h-screen p-4 bg-gray-900 text-white overflow-y-auto">
      <div className="flex flex-col h-full">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{user?.name}</h2>
            <p className="text-sm text-gray-400">Admin</p>
          </div>
        </div>
        <nav className="space-y-2 flex-grow">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onTabClick(tab.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {tab.label}
              </Button>
            );
          })}
        </nav>
        <div className="mt-auto space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );

  const MainContent = ({ activeTab }) => (
    <div className="p-6 min-w-screen mx-auto text-white">
      <h1 className="mb-6 lg:text-3xl text-2xl font-semibold">Dashboard</h1>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'personalInfo' && renderPersonalInfo()}
          {activeTab === 'collegeInfo' && renderCollegeInfo()}
          {activeTab === 'departments' && renderDepartments()}
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <div className=''>
              <Button variant="outline" size="icon" className="absolute top-3 right-4 bg-gray-700 text-white">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px] p-0 bg-gray-900">
            <Sidebar onTabClick={(tabId) => {
              setActiveTab(tabId);
            }} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={17} minSize={15}>
            <Sidebar onTabClick={setActiveTab} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={80} maxSize={85}>
            <MainContent activeTab={activeTab} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="lg:hidden">
        <MainContent activeTab={activeTab} />
      </div>
      <Toaster />
    </div>
  );
}