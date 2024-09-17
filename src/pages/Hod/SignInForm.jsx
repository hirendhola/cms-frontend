import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { SignInSchema, formData } from "@/constants/Hod/Auth/SignIn"
import { useAuth } from "@/hooks/Hod/useAuth"
import { useEffect } from "react"
import { GraduationCap, LockIcon, UserIcon } from "lucide-react"

const SignInForm = () => {
  const { signIn, checkAuthStatus } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkAuthStatus()
      if (isAuthenticated) {
        navigate('/hod/dashboard')
      }
    }
    checkAuth()
  }, [checkAuthStatus, navigate])

  const onSubmit = async (data) => {
    try {
      await signIn(data)
      toast({ title: "SignIn Successful" })
      navigate('/hod/dashboard')
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
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
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">HOD Sign In</CardTitle>
          <CardDescription className="text-center text-blue-100">Head of Department Access</CardDescription>
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
                      <FormLabel className="text-sm font-medium text-gray-700 inline-">
                        {
                          <span className="flex items-center text-gray-400">
                            {name === 'email' ? (
                              <UserIcon size={18} className="mr-2" />
                            ) : (
                              <LockIcon size={18} className="mr-2" />
                            )}
                            <span>{label}</span>
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
              <div className="flex justify-between items-center mt-6">
                <Button
                  type="button"
                  variant="link"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  onClick={() => navigate('/auth/hod/signup')}
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