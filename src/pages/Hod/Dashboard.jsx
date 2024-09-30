/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/Hod/useAuth'
import Loading from '@/components/Loading'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusCircle, Book, Album, GraduationCap, Building, User, Users, UserCheck, Key, Settings, LogOut, Sheet as SheetIcon, Menu, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SheetContent, SheetTrigger, Sheet } from '@/components/ui/sheet'
import { toast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import renderInsightCard from '@/components/InsightCard'
import CreateProgram from '@/components/Hod/CreateProgram'

export default function Dashboard() {
  const { loading, user, signOut, refreshData } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  console.log(user)
  if (loading) {
    return <Loading loading={loading} />
  }

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

  const handleCreateCourse = () => {
    console.log('Create course')
  }

  const handleCreateProgram = () => {
    console.log('Create program')
  }

  const handleCreateAccessCode = () => {
    console.log('Create access code')
  }

  const totalStudents = user.department?.programs.reduce((total, program) =>
    total + program.courses.reduce((courseTotal, course) => courseTotal + (course.students?.length || 0), 0), 0) || 0

  const totalTeachers = user.department?.programs.reduce((total, program) =>
    total + program.courses.reduce((courseTotal, course) => courseTotal + (course.teachers?.length || 0), 0), 0) || 0

  const totalSubjects = user.department?.programs.reduce((total, program) =>
    total + program.courses.reduce((courseTotal, course) => courseTotal + (course.subjects?.length || 0), 0), 0) || 0


  const renderOverview = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {renderInsightCard("Total Departments", user.department ? 1 : 0, <Building className="h-4 w-4 text-white" />, "from-blue-500 to-blue-700")}
      {renderInsightCard("Total Programs", user.department?.programs.length || 0, <GraduationCap className="h-4 w-4 text-white" />, "from-green-500 to-green-700")}
      {renderInsightCard("Total Courses", user.department?.programs.reduce((total, program) => total + program.courses.length, 0) || 0, <Album className="h-4 w-4 text-white" />, "from-yellow-500 to-yellow-700")}
      {renderInsightCard("Total Subjects", totalSubjects, <Book className="h-4 w-4 text-white" />, "from-purple-500 to-purple-700")}
      {renderInsightCard("Total Students", totalStudents, <Users className="h-4 w-4 text-white" />, "from-pink-500 to-pink-700")}
      {renderInsightCard("Total Teachers", totalTeachers, <UserCheck className="h-4 w-4 text-white" />, "from-indigo-500 to-indigo-700")}
    </div>
  )

  const renderDepartments = () => (
    <div className="space-y-6">
      {user.department ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-gray-700 to-gray-900 border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">{user.department.name}</h3>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p><strong>Code:</strong> {user.department.code}</p>
              <p><strong>College:</strong> {user.department.college.collegeName}</p>
              <p><strong>Programs:</strong> {user.department.programs.length}</p>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <p className="text-gray-300">No departments found.</p>
      )}
    </div>
  )

  const renderPrograms = () => (
    <div className="space-y-6">
      <div className="flex justify-end items-center mb-4">
        <div className="">
          <CreateProgram Hod={user} onProgramCreated={refreshData} />
        </div>
      </div>
      <AnimatePresence>
        {user.department?.programs.map((program, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-gray-700 to-gray-900 border-gray-700">
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">{program.name}</h3>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p><strong>Code:</strong> {program.code}</p>
                <p><strong>Duration:</strong> {program.duration} years</p>
                <p><strong>Semesters:</strong> {program.semesters}</p>
                <p><strong>Courses:</strong> {program.courses.length}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
      {user.department?.programs.length === 0 && <p className="text-gray-300">No programs found.</p>}
    </div>
  )

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-end items-center mb-4">
        <Button onClick={handleCreateCourse} className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>
      <AnimatePresence>
        {user.department?.programs.flatMap((program, programIndex) =>
          program.courses.map((course, courseIndex) => (
            <motion.div
              key={`${program.code}-${courseIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: (programIndex * program.courses.length + courseIndex) * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-gray-700 to-gray-900 border-gray-700">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-white">{course.name}</h3>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p><strong>Code:</strong> {course.code}</p>
                  <p><strong>Program:</strong> {program.name}</p>
                  <p><strong>Subjects:</strong> {course.subjects.length}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </AnimatePresence>
      {user.department?.programs.every(program => program.courses.length === 0) && <p className="text-gray-300">No courses found.</p>}
    </div>
  )

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'departments', label: 'Departments', icon: Building },
    { id: 'programs', label: 'Programs', icon: GraduationCap },
    { id: 'courses', label: 'Courses', icon: Album },
  ]

  const Sidebar = ({ onTabClick }) => (
    <div className="h-screen fixed left-0 top-0 w-64  p-4 bg-gray-900 text-white overflow-y-auto">
      <div className="flex flex-col h-full">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{user?.name}</h2>
            <p className="text-sm text-gray-400">Head Of Department</p>
          </div>
        </div>
        <nav className="space-y-2 flex-grow">
          {tabs.map((tab) => {
            const Icon = tab.icon
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
            )
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
  )

  const MainContent = ({ activeTab }) => (
    <div className="p-6 max-w-screen-xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
        {/* <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 rounded-full bg-gray-700 focus:ring-2 focus:ring-blue-500"
          />
        </div> */}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'departments' && renderDepartments()}
          {activeTab === 'programs' && renderPrograms()}
          {activeTab === 'courses' && renderCourses()}
        </motion.div>
      </AnimatePresence>
    </div>
  )

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="fixed top-4 right-4 z-50 bg-gray-800 text-white">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px] p-0 bg-gray-900"  >
            <Sidebar onTabClick={(tabId) => {
              setActiveTab(tabId)
              
            }} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={17} maxSize={23} className='h-screen'>
            <Sidebar onTabClick={setActiveTab} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <MainContent activeTab={activeTab} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="lg:hidden">
        <MainContent activeTab={activeTab} />
      </div>
      <Toaster />
    </div>
  )
}

