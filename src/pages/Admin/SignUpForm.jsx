/* eslint-disable react/no-unescaped-entities */
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { useEffect } from "react";
// import { Toaster } from "@/components/ui/toaster";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { toast } from "@/components/ui/use-toast";
// import { formData, SignUpSchema } from "@/constants/Admin/Auth/SignUp";

// const SignUpForm = () => {
//   const navigate = useNavigate();
//   const form = useForm({
//     resolver: zodResolver(SignUpSchema),
//     defaultValues: {
//       name: '', email: '', password: '', mobileNumber: '',
//       uniName: '', collegeName: '', collegeCode: '', address: '',
//     },
//   });

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_KEY}/auth/admin/check-auth-status`, { withCredentials: true });
//         if (response.status === 200) navigate('/admin/dashboard');
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     checkAuthStatus();
//   }, [navigate]);

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/admin/signup', data);
//       toast({ title: "College Created", description: response.data.message });
//       navigate('/admin/dashboard');
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: error.response?.data?.message || "An error occurred",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="bg-neutral-300 min-h-screen sm:h-fit text-neutral-950 flex justify-center items-center p-4">
//       <Card className="w-full sm:max-w-screen-lg bg-neutral-200 shadow-sm">
//         <CardHeader>
//           <CardTitle>SignUp</CardTitle>
//           <CardDescription>Admin (Principal)</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 {formData.map(({ label, name, placeholder, type }) => (
//                   <FormField
//                     key={name}
//                     control={form.control}
//                     name={name}
//                     render={({ field }) => (
//                       <FormItem className="space-y-1.5">
//                         <FormLabel className="text-sm">{label}*</FormLabel>
//                         <FormControl>
//                           <Input placeholder={placeholder} type={type} {...field} className="border-neutral-950" />
//                         </FormControl>
//                         <FormMessage className="text-xs text-red-500 leading-relaxed p-0 m-0" />
//                       </FormItem>
//                     )}
//                   />
//                 ))}
//               </div>
//               <div className="w-full flex flex-col sm:flex-row justify-between mt-3">
//                 <Link to='/auth/admin/signin' className="text-green-950 rounded-md p-1 hover:text-lime-900 mb-2 sm:mb-0 text-sm">
//                   Already have an account?
//                 </Link>
//                 <Button type="submit" className="w-full sm:w-auto">Create College</Button>
//               </div>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//       <Toaster />
//     </div>
//   );
// };

// export default SignUpForm;

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { formData, SignUpSchema } from "@/constants/Admin/Auth/SignUp"
import { BookOpen } from "lucide-react"

const SignUpForm = () => {
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '', email: '', password: '', mobileNumber: '',
      uniName: '', collegeName: '', collegeCode: '', address: '',
    },
  })

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/auth/admin/check-auth-status`, { withCredentials: true })
        if (response.status === 200) navigate('/admin/dashboard')
      } catch (error) {
        console.log(error.message)
      }
    }
    checkAuthStatus()
  }, [navigate])

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/admin/signup', data)
      toast({ title: "College Created", description: response.data.message })
      navigate('/admin/dashboard')
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex justify-center items-center p-4">
      <Card className="w-full max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white flex flex-col justify-center">
            <BookOpen className="w-16 h-16 mb-6" />
            <h2 className="text-3xl font-bold mb-6">Welcome to Our College Management System</h2>
            <p className="mb-6">Join us to streamline your educational institution's operations and enhance the learning experience.</p>
            <Link to='/auth/admin/signin' className="text-blue-200 hover:text-white transition-colors">
              Already have an account? Sign In
            </Link>
          </div>
          <div className="md:w-1/2 p-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">Sign Up</CardTitle>
              <CardDescription>Create an admin account (Principal)</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {formData.map(({ label, name, placeholder, type }) => (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">{label}*</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder={placeholder} 
                                type={type} 
                                {...field} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-red-500" />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                  >
                    Create College
                  </Button>
                </form>
              </Form>
            </CardContent>
          </div>
        </div>
      </Card>
      <Toaster />
    </div>
  )
}

export default SignUpForm