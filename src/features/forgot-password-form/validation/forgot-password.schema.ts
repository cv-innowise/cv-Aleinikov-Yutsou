import * as yup from "yup";

export const forgotPasswordSchema = yup.object({
  email: yup.string().trim().lowercase().email("Invalid email format").max(254, "Email must be at most 254 characters").required("Email is required"),
});
