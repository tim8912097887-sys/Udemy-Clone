import z from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const SigninSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }).lowercase(), // Sanitization: Ensures emails are stored in lowercase,

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(passwordRegex, {
      message:
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

export type SigninFormData = z.infer<typeof SigninSchema>;
