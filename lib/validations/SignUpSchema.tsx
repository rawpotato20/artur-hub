import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long.")
      .max(20, "Username must be less than 20 characters.")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores."
      ),
    email: z
      .string()
      .email("Please enter a valid email address.")
      .min(1, "Email is required."),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .max(20, "Password must be less than 20 characters."),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long.")
      .max(20, "Confirm password must be less than 20 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
