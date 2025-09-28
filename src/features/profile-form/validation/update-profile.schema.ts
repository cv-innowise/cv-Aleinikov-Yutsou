import { UserRole } from "@/shared/types/cv-graphql";
import * as yup from "yup";

export const updateProfileSchema = yup.object({
  userId: yup.string().required(),
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
  user: yup.object({
    departmentId: yup.string().nullable().default(""),
    positionId: yup.string().nullable().default(""),
    role: yup
      .mixed<UserRole>()
      .oneOf(Object.values(UserRole))
      .default(UserRole.Employee)
      .required(),
  }),
});
