// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { Toaster } from "@/components/ui/toaster";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { toast } from "@/components/ui/use-toast";
// import { formData, SignUpSchema } from "@/constants/Hod/Auth/SignUp";

// const SignUpForm = () => {
//   const navigate = useNavigate();
//   const form = useForm({
//     resolver: zodResolver(SignUpSchema),
//     defaultValues: {
//       name: '', email: '', password: '', mobileNumber: '',
//       accessCode: ''
//     },
//   });

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_KEY}/auth/hod/signup`, data);
//       toast({ title: "Account Created", description: response.data.message });
//       navigate('/hod/dashboard');
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
//           <CardDescription>Head Of Department</CardDescription>
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
//                 <Link to='/auth/hod/signin' className="text-green-950 rounded-md p-1 hover:text-lime-900 mb-2 sm:mb-0 text-sm">
//                   Already have an account?
//                 </Link>
//                 <Button type="submit" className="w-full sm:w-auto">Sign Up</Button>
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
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { formData, SignUpSchema } from "@/constants/Hod/Auth/SignUp"
import { GraduationCap, UserIcon, MailIcon, LockIcon, PhoneIcon, KeyIcon } from "lucide-react"

const SignUpForm = () => {
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '', email: '', password: '', mobileNumber: '',
      accessCode: ''
    },
  })

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_KEY}/auth/hod/signup`, data)
      toast({ title: "Account Created", description: response.data.message })
      navigate('/hod/dashboard')
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      })
    }
  }

  const getIcon = (name) => {
    switch (name) {
      case 'name': return <UserIcon size={18} />
      case 'email': return <MailIcon size={18} />
      case 'password': return <LockIcon size={18} />
      case 'mobileNumber': return <PhoneIcon size={18} />
      case 'accessCode': return <KeyIcon size={18} />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex justify-center items-center p-4">
      <Card className="w-full max-w-2xl bg-white shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">HOD Sign Up</CardTitle>
          <CardDescription className="text-center text-blue-100">Create your Head of Department account</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
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
                        <FormLabel className="text-sm font-medium text-gray-700">
                          {
                            <span className="flex items-center text-gray-400">
                              {getIcon(name)}
                              <span className="ml-2">{label}</span>
                            </span>
                          }
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder={placeholder}
                              type={type}
                              {...field}
                              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center mt-6">
                <Link to='/auth/hod/signin' className="text-blue-600 hover:text-blue-800 text-sm">
                  Already have an account?
                </Link>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                  Sign Up
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}

export default SignUpForm