import * as yup from "yup";

export const languageSchema = yup.object({
  name: yup
    .string()
    .min(4, "Name must be at least 4 characters")
    .required("Name is required"),
  native_name: yup
    .string()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .min(4, "Native name must be at least 4 characters")
    .default(null),
  iso2: yup
    .string()
    .matches(/^[a-z]{2}(-[A-Z]{2})?$/, "ISO2 must have correct format")
    .required("ISO2 is requred"),
});
