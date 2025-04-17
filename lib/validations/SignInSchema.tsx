import * as z from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .email("The email you entered is not valid...")
    .min(1, "Email is required."),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters long...")
    .max(20, "Password must be no longer than 20 characters..."),
});
