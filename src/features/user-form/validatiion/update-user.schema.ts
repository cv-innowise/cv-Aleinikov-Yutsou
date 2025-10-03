import { UserRole } from "@/shared/types/cv-graphql";
import * as yup from "yup";

export const updateUserSchema = yup.object({
  userId: yup.string().required(),
  cvsIds: yup.array(yup.string().required()).required(),
  departmentId: yup.string().nullable().default(""),
  positionId: yup.string().nullable().default(""),
  role: yup
    .mixed<UserRole>()
    .oneOf(Object.values(UserRole))
    .default(UserRole.Employee)
    .required(),
});
