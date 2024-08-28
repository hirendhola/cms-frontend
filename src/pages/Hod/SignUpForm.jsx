import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { formData, SignUpSchema } from "@/constants/Hod/Auth/SignUp";

const SignUpForm = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '', email: '', password: '', mobileNumber: '',
      accessCode: ''
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/hod/signup', data);
      toast({ title: "Account Created", description: response.data.message });
      navigate('/hod/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-neutral-300 min-h-screen sm:h-fit text-neutral-950 flex justify-center items-center p-4">
      <Card className="w-full sm:max-w-screen-lg bg-neutral-200 shadow-sm">
        <CardHeader>
          <CardTitle>SignUp</CardTitle>
          <CardDescription>Head Of Department</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {formData.map(({ label, name, placeholder, type }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-sm">{label}*</FormLabel>
                        <FormControl>
                          <Input placeholder={placeholder} type={type} {...field} className="border-neutral-950" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500 leading-relaxed p-0 m-0" />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <div className="w-full flex flex-col sm:flex-row justify-between mt-3">
                <Link to='/auth/hod/signin' className="text-green-950 rounded-md p-1 hover:text-lime-900 mb-2 sm:mb-0 text-sm">
                  Already have an account?
                </Link>
                <Button type="submit" className="w-full sm:w-auto">Sign Up</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default SignUpForm;