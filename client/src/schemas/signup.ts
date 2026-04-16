import z from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const SignupSchema = z.object({
  name: z
    .string()
    .trim() // Sanitization: Removes leading/trailing whitespace
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be less than 50 characters" }),

  email: z.email({ message: "Please enter a valid email address" }).lowercase(), // Sanitization: Ensures emails are stored in lowercase,

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(passwordRegex, {
      message:
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

export type SignupFormData = z.infer<typeof SignupSchema>;
