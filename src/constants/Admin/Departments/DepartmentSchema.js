import { z } from "zod";

export const CreateDepartmentSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  code: z.string()
    .min(2, { message: "Code must be at least 2 characters long" })
    .max(5, { message: "Code must be at most 5 characters long" }),
  collegeCode: z.string().nonempty({ message: "College Code is required" }),
});

export const formData = [
  { label: "name", name: "name", placeholder: "Computer Engineering", type: "text" },
  { label: "code", name: "code", placeholder: "07", type: "text" },
  { label: "collegeCode", name: "CollegeCode", placeholder: " ", type: "text" }
]