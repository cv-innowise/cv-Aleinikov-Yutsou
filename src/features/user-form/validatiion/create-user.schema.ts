import { UserRole } from "@/shared/types/cv-graphql";
import * as yup from "yup";

export const createUserSchema = yup.object({
  auth: yup.object({
    email: yup
      .string()
      .trim()
      .lowercase()
      .email("Invalid email format")
      .max(254, "Email must be at most 254 characters")
      .required("Email is required"),
    password: yup
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters")
      .max(72, "Password must be at most 72 characters")
      .matches(/^\S+$/, "Password must not contain spaces")
      .matches(/\d/, "Password must include at least 1 digit")
      .test(
        "not-contain-email",
        "Password must not contain your email",
        function (value) {
          const email: string | undefined = this.parent?.email;
          if (!value || !email) return true;
          return !value.toLowerCase().includes(String(email).toLowerCase());
        }
      )
      .required("Password is required"),
  }),
  profile: yup.object({
    first_name: yup
      .string()
      .nullable()
      .transform((curr, orig) => (orig === "" ? null : curr))
      .min(4, "First name must be at least 4 characters")
      .default(null),
    last_name: yup
      .string()
      .nullable()
      .transform((curr, orig) => (orig === "" ? null : curr))
      .min(4, "Last name must be at least 4 characters")
      .default(null),
  }),
  cvsIds: yup.array(yup.string().required()).required(),
  departmentId: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .default(""),
  positionId: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .default(""),
  role: yup.mixed<UserRole>().oneOf(Object.values(UserRole)).required(),
});
