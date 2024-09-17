// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";

// const LandingPage = () => {


//   const navigate = useNavigate();
//   const handleNavigation = (path) => () => navigate(path);
  

//   return (
//     <div>
//       <div className='w-screen h-screen flex justify-center flex-col'>
//         <div className='grid grid-cols-1 gap-5 self-center'>
//           <div className='grid grid-cols-2 gap-4'>
//             <Button onClick={handleNavigation('/auth/admin/signup')}>Admin-SignUP</Button>
//             <Button onClick={handleNavigation('/auth/admin/signin')}>Admin-SignIN</Button>
//           </div>
//           <div className='grid grid-cols-2 gap-3'>
//             <Button onClick={handleNavigation('/auth/hod/signup')}>Hod-SignUP</Button>
//             <Button onClick={handleNavigation('/auth/hod/signin')}>Hod-SignIN</Button>
//           </div>
//           <div className='grid grid-cols-2 gap-3'>
//             <Button onClick={handleNavigation('/auth/teacher/signup')}>Teacher-SignUP</Button>
//             <Button onClick={handleNavigation('/auth/teacher/signin')}>Teacher-SignIN</Button>
//           </div>
//           <div className='grid grid-cols-2 gap-3'>
//             <Button onClick={handleNavigation('auth/student/signup')}>Student-SignUP</Button>
//             <Button onClick={handleNavigation('auth/student/signin')}>Student-SignIN</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LandingPage

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { GraduationCap, Users, UserCheck, School } from 'lucide-react';

// const LandingPage = () => {
//   const navigate = useNavigate();
//   const handleNavigation = (path) => () => navigate(path);

//   const roles = [
//     { title: 'Admin', icon: Users, signUp: '/auth/admin/signup', signIn: '/auth/admin/signin' },
//     { title: 'HOD', icon: UserCheck, signUp: '/auth/hod/signup', signIn: '/auth/hod/signin' },
//     { title: 'Teacher', icon: School, signUp: '/auth/teacher/signup', signIn: '/auth/teacher/signin' },
//     { title: 'Student', icon: GraduationCap, signUp: '/auth/student/signup', signIn: '/auth/student/signin' },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
//       <div className="max-w-6xl mx-auto">
//         <header className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-blue-800 mb-4">Welcome to Our College Management System</h1>
//           <p className="text-xl text-gray-600">Streamline your academic journey with our comprehensive platform</p>
//         </header>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {roles.map((role, index) => (
//             <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <CardHeader className="bg-blue-50 pb-2">
//                 <CardTitle className="flex items-center justify-center text-2xl font-semibold text-blue-700">
//                   <role.icon className="mr-2" size={24} />
//                   {role.title}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <div className="space-y-4">
//                   <Button
//                     onClick={handleNavigation(role.signUp)}
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//                   >
//                     Sign Up
//                   </Button>
//                   <Button
//                     onClick={handleNavigation(role.signIn)}
//                     variant="outline"
//                     className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
//                   >
//                     Sign In
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <footer className="mt-16 text-center text-gray-600">
//           <p>&copy; 2024 College Management System. All rights reserved.</p>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;


import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { BookOpen, Users, UserCheck, Briefcase } from "lucide-react"


export default function LandingPage() {
  const navigate = useNavigate()
  const handleNavigation = (path) => () => navigate(path)

  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="#">
          <BookOpen className="h-6 w-6" />
          <span className="sr-only">Acme College</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#login">
            Login
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-balance w-[99.5%]">
                  Welcome to our College Management System
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl text-balance">
                  Streamline your educational institution with our comprehensive management solution.
                </p>
              </div>
              <div className="space-x-4">
                <Button
                  onClick={handleNavigation('/auth/student/signup')}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Get Started
                </Button>
                <Button
                  onClick={handleNavigation('/about-us')}
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 items-center justify-evenly">
              {[
                { title: "Student Management", icon: Users, description: "Efficiently manage student records and academic progress." },
                { title: "Faculty Portal", icon: Briefcase, description: "Empower teachers with tools for course management and grading." },
                { title: "Administrative Tools", icon: UserCheck, description: "Streamline administrative tasks and reporting." },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col justify-center items-center text-center ">
                  <feature.icon className="h-12 w-12 mb-4 text-blue-600" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-balance">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="login" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Access Your Portal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { role: "Admin", signUp: '/auth/admin/signup', signIn: '/auth/admin/signin' },
                { role: "HOD", signUp: '/auth/hod/signup', signIn: '/auth/hod/signin' },
                { role: "Teacher", signUp: '/auth/teacher/signup', signIn: '/auth/teacher/signin' },
                { role: "Student", signUp: '/auth/student/signup', signIn: '/auth/student/signin' },
              ].map((user, index) => (
                <div key={index} className="flex flex-col items-center space-y-4">
                  <h3 className="text-xl font-bold">{user.role}</h3>
                  <Button onClick={handleNavigation(user.signUp)} className="w-full">
                    {user.role} Sign Up
                  </Button>
                  <Button onClick={handleNavigation(user.signIn)} variant="outline" className="w-full">
                    {user.role} Sign In
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 College Management System. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" onClick={handleNavigation('/terms-and-conditions')}>
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" onClick={handleNavigation('/privacy-policy')}>
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  )
}