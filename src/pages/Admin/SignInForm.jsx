import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { SignInSchema, formData } from "@/constants/Admin/SignIn"
import axios from "axios";


const SignInForm = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => () => navigate(path);

  const form = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  // function onSubmit(data) {
  //   console.log(data)
  //   console.log("submitted")
  //   toast({
  //     title: "Signup Successful"
  //   })
  // }

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/admin/signin', data);
      console.log(response.data);
      toast({
        title: "SignIn Successful",
        description: response.data.message, // Adjust according to your API response
      });
      navigate('/admin/dashboard');
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred", // Adjust according to your API response
        variant: "destructive",
      });
    }
  };


  return (
    <div className="bg-neutral-300 min-h-screen sm:h-fit text-neutral-950 flex justify-center items-center p-4">
      <Card className="w-[30%] sm:max-w-screen-sm   bg-neutral-200 shadow-sm">
        <CardHeader>
          <CardTitle>SignIN</CardTitle>
          <CardDescription>Admin (Principal)</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 ">
                {formData.map(({ label, name, placeholder, type }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-sm">{label + "*"}</FormLabel>
                        <FormControl>
                          <Input placeholder={placeholder} type={type} {...field} className="border-neutral-950" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500 leading-relaxed p-0 m-0" />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <div className="w-full flex flex-col sm:flex-row justify-between mt-3 ">
                <button type="button"
                  className="text-green-950 rounded-md p-1 hover:text-lime-900 mb-2 sm:mb-0 text-sm"
                  onClick={handleNavigation('/auth/admin/signup')}
                > create account
                </button>
                <Button type="submit" className="w-full sm:w-auto">SignIn</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default SignInForm;




