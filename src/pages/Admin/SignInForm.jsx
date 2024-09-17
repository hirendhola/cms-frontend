// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { Toaster } from "@/components/ui/toaster";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { toast } from "@/components/ui/use-toast";
// import { SignInSchema, formData } from "@/constants/Admin/Auth/SignIn";
// import { useAuth } from "@/hooks/Admin/useAuth";
// import { useEffect } from "react";

// const SignInForm = () => {
//   const { signIn, checkAuthStatus } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuth = async () => {
//       const isAuthenticated = await checkAuthStatus();
//       if (isAuthenticated) {
//         navigate('/admin/dashboard');
//       }
//     };
//     checkAuth();
//   }, [checkAuthStatus, navigate]);

//   const onSubmit = async (data) => {
//     try {
//       await signIn(data);
//       toast({ title: "SignIn Successful" });
//       navigate('/admin/dashboard');
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: error.response?.data?.message || "An error occurred",
//         variant: "destructive",
//       });
//     }
//   };

//   const form = useForm({
//     resolver: zodResolver(SignInSchema),
//     defaultValues: { email: '', password: '' },
//   });

//   return (
//     <div className="bg-neutral-300 min-h-screen sm:h-fit text-neutral-950 flex justify-center items-center p-4">
//       <Card className="w-[80%] sm:max-w-screen-sm bg-neutral-200 shadow-sm">
//         <CardHeader>
//           <CardTitle>SignIn</CardTitle>
//           <CardDescription>Admin (Principal)</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               <div className="grid grid-cols-1 gap-4">
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
//                 <button type="button"
//                   className="text-green-950 rounded-md p-1 hover:text-lime-900 mb-2 sm:mb-0 text-sm"
//                   onClick={() => navigate('/auth/admin/signup')}
//                 >
//                   Create account
//                 </button>
//                 <Button type="submit" className="w-full sm:w-auto">SignIn</Button>
//               </div>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//       <Toaster />
//     </div>
//   );
// };

// export default SignInForm;


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { SignInSchema, formData } from "@/constants/Admin/Auth/SignIn"
import { useAuth } from "@/hooks/Admin/useAuth"
import { useEffect } from "react"

const SignInForm = () => {
  const { signIn, checkAuthStatus } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkAuthStatus()
      if (isAuthenticated) {
        navigate('/admin/dashboard')
      }
    }
    checkAuth()
  }, [checkAuthStatus, navigate])

  const onSubmit = async (data) => {
    try {
      await signIn(data)
      toast({ title: "SignIn Successful" })
      navigate('/admin/dashboard')
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      })
    }
  }

  const form = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: '', password: '' },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex justify-center items-center p-4">
      <Card className="w-full max-w-md bg-white shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription className="text-blue-100">Admin (Principal) Access</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {formData.map(({ label, name, placeholder, type }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">{label}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder={placeholder} 
                            type={type} 
                            {...field} 
                            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                          />
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              ))}
              <div className="flex justify-between items-center mt-6">
                <Button
                  type="button"
                  variant="link"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  onClick={() => navigate('/auth/admin/signup')}
                >
                  Create account
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                  Sign In
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

export default SignInForm