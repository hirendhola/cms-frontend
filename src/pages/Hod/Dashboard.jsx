import { useState } from 'react';
import { useAuth } from '@/hooks/Hod/useAuth';
import Loading from '@/components/Loading';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Book, GraduationCap, Building, User, Users, UserCheck, Key } from 'lucide-react';

const Dashboard = () => {
  const { loading, user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return <Loading loading={loading} />;
  }

  const handleCreateCourse = () => {
    // TODO: Implement course creation logic
    console.log('Create course');
  };

  const handleCreateProgram = () => {
    // TODO: Implement program creation logic
    console.log('Create program');
  };

  const handleCreateAccessCode = () => {
    // TODO: Implement access code creation logic
    console.log('Create access code');
  };

  // Calculate total students and teachers
  const totalStudents = user.department?.programs.reduce((total, program) =>
    total + program.courses.reduce((courseTotal, course) => courseTotal + (course.students?.length || 0), 0), 0) || 0;

  const totalTeachers = user.department?.programs.reduce((total, program) =>
    total + program.courses.reduce((courseTotal, course) => courseTotal + (course.teachers?.length || 0), 0), 0) || 0;

  const renderInsightCard = (title, value, icon) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );

  const renderOverview = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {renderInsightCard("Total Departments", user.department ? 1 : 0, <Building className="h-4 w-4 text-muted-foreground" />)}
      {renderInsightCard("Total Programs", user.department?.programs.length || 0, <GraduationCap className="h-4 w-4 text-muted-foreground" />)}
      {renderInsightCard("Total Courses", user.department?.programs.reduce((total, program) => total + program.courses.length, 0) || 0, <Book className="h-4 w-4 text-muted-foreground" />)}
      {renderInsightCard("Total Students", totalStudents, <Users className="h-4 w-4 text-muted-foreground" />)}
      {renderInsightCard("Total Teachers", totalTeachers, <UserCheck className="h-4 w-4 text-muted-foreground" />)}
    </div>
  );


  const renderDepartments = () => (
    <div className="space-y-6">
      {user.department ? (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">{user.department.name}</h3>
          </CardHeader>
          <CardContent>
            <p><strong>Code:</strong> {user.department.code}</p>
            <p><strong>College:</strong> {user.department.college.collegeName}</p>
            <p><strong>Programs:</strong> {user.department.programs.length}</p>
          </CardContent>
        </Card>
      ) : (
        <p>No departments found.</p>
      )}
    </div>
  );

  const renderPrograms = () => (
    <div className="space-y-6">
      {user.department?.programs.map((program, index) => (
        <Card key={index}>
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
      ))}
      {user.department?.programs.length === 0 && <p>No programs found.</p>}
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      {user.department?.programs.flatMap(program =>
        program.courses.map((course, index) => (
          <Card key={`${program.code}-${index}`}>
            <CardHeader>
              <h3 className="text-lg font-semibold">{course.name}</h3>
            </CardHeader>
            <CardContent>
              <p><strong>Code:</strong> {course.code}</p>
              <p><strong>Program:</strong> {program.name}</p>
              <p><strong>Subjects:</strong> {course.subjects.length}</p>
            </CardContent>
          </Card>
        ))
      )}
      {user.department?.programs.every(program => program.courses.length === 0) && <p>No courses found.</p>}
    </div>
  );


  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'departments', label: 'Departments', icon: Building },
    { id: 'programs', label: 'Programs', icon: GraduationCap },
    { id: 'courses', label: 'Courses', icon: Book },
  ];

  return (
    <div className="p-4 max-w-full mx-auto">
      <div className="flex flex-col space-y-4 mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <Button onClick={handleCreateProgram} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Program
          </Button>
          <Button onClick={handleCreateCourse} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Course
          </Button>
          <Button onClick={handleCreateAccessCode} className="w-full">
            <Key className="mr-2 h-4 w-4" /> Create Access Code
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "secondary" : "ghost"}
              className="flex-1 min-w-[100px] max-w-[150px]"
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'departments' && renderDepartments()}
      {activeTab === 'programs' && renderPrograms()}
      {activeTab === 'courses' && renderCourses()}
    </div>
  );
};

export default Dashboard;