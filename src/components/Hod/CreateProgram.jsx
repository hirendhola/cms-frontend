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
import { ProgramSchema } from "@/constants/Hod/Program/ProgramSchema";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const CreateProgram = ({ Hod, onProgramCreated }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const form = useForm({
    resolver: zodResolver(ProgramSchema),
    defaultValues: {
      name: '',
      code: '',
      departmentCode: '',
      duration: '',
      semesters: ''
    }
  });

  useEffect(() => {
    if (Hod) {
      form.reset({
        ...form.getValues(),
        departmentCode: Hod.department.code,
      });
    }
  }, [Hod, form]);

  const CreateProgram = async (data) => {
    setSaving(true)
    try {
      const res = await axiosInstance.post('/hod/create/program', data);
      toast({
        title: 'Program Created',
        description: res.data.message,
      });
      setSaving(false)
      onProgramCreated?.();

    } catch (error) {
      setSaving(false)
      console.error('Error creating program:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'An error occurred while creating the program',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <div className="dark">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
          <DialogTrigger asChild>
            <Button variant="outline">Create Program</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100">
            <DialogHeader>
              <DialogTitle>Create Program</DialogTitle>
              <DialogDescription>
                New Program
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(CreateProgram)}>
                <div className="grid gap-4 py-4 text-gray-100">
                  <div className="grid grid-cols-4 items-center  gap-4">
                    <Label htmlFor="name" className="text-right text-white">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Bachelor of Engineering"
                      className="col-span-3 bg-gray-600"
                      {...form.register('name')}
                    />
                    <FormMessage className="col-span-4 text-right text-red-500">
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="code" className="text-right text-white">
                      Code
                    </Label>
                    <Input
                      id="code"
                      placeholder="07"
                      className="col-span-3 bg-gray-600"
                      {...form.register('code')}
                      required
                    />
                    <FormMessage className="col-span-4 text-right text-red-500">
                      {form.formState.errors.code?.message}
                    </FormMessage>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="code" className="text-right text-white">
                      Duration
                    </Label>
                    <Input
                      id="department"
                      type='number'
                      placeholder="4"
                      className="col-span-3 bg-gray-600"
                      {...form.register('duration')}
                      required
                    />
                    <FormMessage className="col-span-4 text-right text-red-500">
                      {form.formState.errors.duration?.message}
                    </FormMessage>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="code" className="text-right text-white">
                      Semesters
                    </Label>
                    <Input
                      id="semesters"
                      type='number'
                      placeholder="8"
                      className="col-span-3 bg-gray-600"
                      {...form.register('semesters')}
                      required
                    />
                    <FormMessage className="col-span-4 text-right text-red-500">
                      {form.formState.errors.semesters?.message}
                    </FormMessage>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="collegeCode" className="text-right text-white">
                      Department Code
                    </Label>
                    <Input
                      id="departmentCode"
                      placeholder="Department code"
                      className="col-span-3 bg-gray-600"
                      {...form.register('collegeCode')}
                      value={Hod?.department.code}
                      disabled
                    />
                    <FormMessage className="col-span-4 text-right text-red-500">
                      {form.formState.errors.collegeCode?.message}
                    </FormMessage>
                  </div>
                </div>
                <FormControl>
                  <DialogFooter>
                    <Button type="submit" > {saving ? 'Saving...' : 'Save changes'}</Button>
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


CreateProgram.propTypes = {
  Hod: PropTypes.shape({
    department: PropTypes.shape({
      code: PropTypes.string.isRequired,
    })
  }),
  onProgramCreated: PropTypes.func
};


export default CreateProgram;