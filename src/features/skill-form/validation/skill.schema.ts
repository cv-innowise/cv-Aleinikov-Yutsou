import * as yup from "yup";

export const skillSchema = yup.object({
  name: yup
    .string()
    .min(4, "Name must be at least 4 characters")
    .required("Name is required"),
  categoryId: yup.string().required("Category is required"),
});
