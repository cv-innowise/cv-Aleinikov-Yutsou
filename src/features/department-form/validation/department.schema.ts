import * as yup from "yup";

export const departmentSchema = yup.object({
  name: yup
    .string()
    .min(4, "Name must be at least 4 characters")
    .required("Name is required"),
});
