import { z } from "zod";

export const ProgramSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  code: z.string()
    .min(2, { message: "Code must be at least 2 characters long" })
    .max(5, { message: "Code must be at most 5 characters long" }),
  semesters: z.string({ message: "required" }),
  duration: z.string({ message: "required" }),
  departmentCode: z.string().nonempty({ message: "College Code is required" }),
});

