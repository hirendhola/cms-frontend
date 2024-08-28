import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from '@/components/ui/toaster';
import { toast } from "../ui/use-toast";
import axiosInstance from "@/utils/axiosConfig";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateDepartmentSchema } from "@/constants/Admin/Departments/DepartmentSchema";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const CreateDepartment = ({ college, onDepartmentCreated }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(CreateDepartmentSchema),
    defaultValues: {
      name: '',
      code: '',
      collegeCode: ''
    }
  });

  useEffect(() => {
    if (college) {
      form.reset({
        ...form.getValues(),
        collegeCode: college.collegeCode,
      });
    }
  }, [college, form]);

  const CreateDepartment = async (data) => {
    try {
      const res = await axiosInstance.post('/admin/department/createdepartment', data);
      console.log(res.data);
      setIsDialogOpen(false);
      toast({
        title: "Department Created",
        description: res.data.message,
      });
      if (onDepartmentCreated) {
        onDepartmentCreated();
      }
    } catch (error) {
      console.error(error.message);
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Create Department</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Department</DialogTitle>
              <DialogDescription>
                New Department
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(CreateDepartment)
              }>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Computer Engineering"
                      className="col-span-3"
                      {...form.register('name')}
                    />
                    <FormMessage className="col-span-4 text-right text-red-500">
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="code" className="text-right">
                      Code
                    </Label>
                    <Input
                      id="code"
                      placeholder="07"
                      className="col-span-3"
                      {...form.register('code')}
                      required
                    />
                    <FormMessage className="col-span-4 text-right text-red-500">
                      {form.formState.errors.code?.message}
                    </FormMessage>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="collegeCode" className="text-right">
                      College Code
                    </Label>
                    <Input
                      id="collegeCode"
                      placeholder="Department code"
                      className="col-span-3"
                      {...form.register('collegeCode')}
                      value={college?.collegeCode}  // Ensure this value is shown
                      disabled  // Disable the input so it cannot be changed
                    />
                    <FormMessage className="col-span-4 text-right text-red-500">
                      {form.formState.errors.collegeCode?.message}
                    </FormMessage>
                  </div>
                </div>
                <FormControl>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </FormControl>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <Toaster />
      </div>
    </>
  )
};


CreateDepartment.propTypes = {
  college: PropTypes.shape({
    collegeCode: PropTypes.string.isRequired,
  }),
  onDepartmentCreated: PropTypes.func
};


export default CreateDepartment;