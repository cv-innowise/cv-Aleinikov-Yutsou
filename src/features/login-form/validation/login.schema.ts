import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().trim().lowercase().email("Invalid email format").max(254, "Email must be at most 254 characters").required("Email is required"),

  password: yup
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(72, "Password must be at most 72 characters")
    .matches(/^\S+$/, "Password must not contain spaces")
    .matches(/\d/, "Password must include at least 1 digit")
    .test("not-contain-email", "Password must not contain your email", function (value) {
      const email: string | undefined = this.parent?.email;
      if (!value || !email) return true;
      return !value.toLowerCase().includes(String(email).toLowerCase());
    })
    .required("Password is required"),
});
