/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import { useState } from 'react';
'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/Hod/useAuth'
import Loading from '@/components/Loading'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusCircle, Book, Album, GraduationCap, Building, User, Users, UserCheck, Key, Settings, LogOut, Sheet as SheetIcon, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SheetContent, SheetTrigger, Sheet } from '@/components/ui/sheet'
import { toast } from '@/components/ui/use-toast'
import { Toast } from '@/components/ui/toast'
import { Toaster } from '@/components/ui/toaster'

export default function Dashboard() {
  const { loading, user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

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
    // TODO: Implement course creation logic
    console.log('Create course')
  }

  const handleCreateProgram = () => {
    // TODO: Implement program creation logic
    console.log('Create program')
  }

  const handleCreateAccessCode = () => {
    // TODO: Implement access code creation logic
    console.log('Create access code')
  }

  // Calculate total students and teachers
  const totalStudents = user.department?.programs.reduce((total, program) =>
    total + program.courses.reduce((courseTotal, course) => courseTotal + (course.students?.length || 0), 0), 0) || 0

  const totalTeachers = user.department?.programs.reduce((total, program) =>
    total + program.courses.reduce((courseTotal, course) => courseTotal + (course.teachers?.length || 0), 0), 0) || 0

  const totalSubjects = user.department?.programs.reduce((total, program) =>
    total + program.courses.reduce((courseTotal, course) => courseTotal + (course.subjects?.length || 0), 0), 0) || 0

  const renderInsightCard = (title, value, icon) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-inner-2xl hover:shadow-gray-500 transition-shadow duration-300 bg-gray-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">{title}</h3>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderOverview = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {renderInsightCard("Total Departments", user.department ? 1 : 0, <Building className="h-4 w-4 text-muted-foreground" />)}
      {renderInsightCard("Total Programs", user.department?.programs.length || 0, <GraduationCap className="h-4 w-4 text-muted-foreground" />)}
      {renderInsightCard("Total Courses", user.department?.programs.reduce((total, program) => total + program.courses.length, 0) || 0, <Album className="h-4 w-4 text-muted-foreground" />)}
      {renderInsightCard("Total Subjects", totalSubjects, <Book className="h-4 w-4 text-muted-foreground" />)}
      {renderInsightCard("Total Students", totalStudents, <Users className="h-4 w-4 text-muted-foreground" />)}
      {renderInsightCard("Total Teachers", totalTeachers, <UserCheck className="h-4 w-4 text-muted-foreground" />)}
    </div>
  );

  const renderDepartments = () => (
    <div className="space-y-6">
      {user.department ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="hover:shadow-inner-2xl hover:shadow-gray-500 transition-shadow duration-300 bg-gray-900">
            <CardHeader>
              <h3 className="text-lg font-semibold">{user.department.name}</h3>
            </CardHeader>
            <CardContent>
              <p><strong>Code:</strong> {user.department.code}</p>
              <p><strong>College:</strong> {user.department.college.collegeName}</p>
              <p><strong>Programs:</strong> {user.department.programs.length}</p>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <p>No departments found.</p>
      )}
    </div>
  )

  const renderPrograms = () => (
    <div className="space-y-6">
      <AnimatePresence>
        {user.department?.programs.map((program, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-inner-2xl hover:shadow-gray-500 transition-shadow duration-300 bg-gray-900">
              <CardHeader>
                <h3 className="text-lg font-semibold">{program.name}</h3>
              </CardHeader>
              <CardContent>
                <p><strong>Code:</strong> {program.code}</p>
                <p><strong>Duration:</strong> {program.duration} years</p>
                <p><strong>Semesters:</strong> {program.semesters}</p>
                <p><strong>Courses:</strong> {program.courses.length}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
      {user.department?.programs.length === 0 && <p>No programs found.</p>}
    </div>
  )

  const renderCourses = () => (
    <div className="space-y-6">
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
              <Card className="hover:shadow-inner-2xl hover:shadow-gray-500 transition-shadow duration-300 bg-gray-900">
                <CardHeader>
                  <h3 className="text-lg font-semibold">{course.name}</h3>
                </CardHeader>
                <CardContent>
                  <p><strong>Code:</strong> {course.code}</p>
                  <p><strong>Program:</strong> {program.name}</p>
                  <p><strong>Subjects:</strong> {course.subjects.length}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </AnimatePresence>
      {user.department?.programs.every(program => program.courses.length === 0) && <p>No courses found.</p>}
    </div>
  )

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'departments', label: 'Departments', icon: Building },
    { id: 'programs', label: 'Programs', icon: GraduationCap },
    { id: 'courses', label: 'Courses', icon: Album },
  ];

  const Sidebar = ({ onTabClick }) => (
    <div className="h-screen p-4 bg-gray-800 text-white scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-600 overflow-y-auto">
      <div className="flex flex-col h-full ">
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
        <nav className="space-y-2 flex-grow  ">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "secondary" : "ghost"}
                className="w-[86%] justify-start"
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
          <Button variant="ghost" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );

  const MainContent = ({ activeTab }) => (
    <div className="p-4 max-w-screen-xl mx-auto text-[#F1F1F1] ">
      <h1 className=" mb-6 lg:text-3xl text-2xl  font-semibold  ">Dashboard</h1>
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
  );


  return (
    <div className="dark bg-gray-800 min-h-screen">
      {/* Mobile Menu */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="absolute top-3 right-4 bg-gray-300">
              <Menu className="h-4 w-4 " />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px] p-0">
            <Sidebar onTabClick={(tabId) => {
              setActiveTab(tabId);
            }} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Layout */}
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

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <MainContent activeTab={activeTab} />
      </div>
      <Toaster />
    </div>
  );

}