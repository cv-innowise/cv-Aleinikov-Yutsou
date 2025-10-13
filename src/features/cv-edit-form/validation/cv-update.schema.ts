import * as yup from "yup";

export const cvUpdateSchema = yup.object({
  name: yup.string().min(4, "Name must be at least 4 characters").required("Name is required"),
  education: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .min(4, "Education must be at least 4 characters")
    .default(null),
  description: yup.string().required("Description is required"),
});
