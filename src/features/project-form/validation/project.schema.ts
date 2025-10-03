import * as yup from "yup";

export const projectSchema = yup.object({
  name: yup
    .string()
    .min(4, "Name must be at least 4 characters")
    .required("Name is required"),
  domain: yup
    .string()
    .min(4, "Domain must be at least 4 characters")
    .required("Domain is required"),
  start_date: yup
    .date()
    .max(new Date(), "You cannot choose a future date")
    .required("Start date is required"),
  end_date: yup
    .date()
    .nullable()
    .max(new Date(), "You cannot choose a future date")
    .default(null),
  description: yup.string().required("Description is required"),
  environment: yup
    .array(yup.string().required())
    .min(1, "You have to provide at least one enviroment.")
    .default([]),
});
