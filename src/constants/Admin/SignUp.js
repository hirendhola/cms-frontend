import { z } from "zod";

// Define the sign-up schema
export const SignUpSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  email: z.string().email({ message: "Invalid email address" }),
  mobileNumber: z.string().min(10, { message: "Required" }),
  password: z.string().min(8, { message: "min 8 " }),
  uniName: z.string().min(1, { message: "Required" }),
  collegeName: z.string().min(1, { message: "Required" }),
  collegeCode: z.string().min(1, { message: "Required" }),
  address: z.string().min(1, { message: "Required" }),
});

// Define the form data
export const formData = [
  { label: "Name", name: "name", placeholder: "FirstName LastName", type: "text" },
  { label: "Email", name: "email", placeholder: "Email", type: "email" },
  { label: "Mobile Number", name: "mobileNumber", placeholder: "Mobile Number", type: "number" },
  { label: "Password", name: "password", placeholder: "Password", type: "password" },
  { label: "University Name", name: "uniName", placeholder: "University Name", type: "text" },
  { label: "College Name", name: "collegeName", placeholder: "College Name", type: "text" },
  { label: "College Code", name: "collegeCode", placeholder: "College Code", type: "text" },
  { label: "Address", name: "address", placeholder: "Address", type: "text" },
];
