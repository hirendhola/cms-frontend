import { z } from "zod";


export const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "min 8" }),
});

export const formData = [
  { label: "Email", name: "email", placeholder: "Email", type: "text" },
  { label: "Password", name: "password", placeholder: "Password", type: "password" }
];
