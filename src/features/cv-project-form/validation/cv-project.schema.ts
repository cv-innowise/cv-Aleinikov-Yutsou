import * as yup from "yup";

const nullableDate = yup
  .date()
  .typeError("Invalid date format")
  .transform((value, originalValue) => {
    if (originalValue === "" || originalValue === null) return null;
    return value instanceof Date && !isNaN(value.getTime()) ? value : null;
  })
  .nullable();

export const cvProjectSchema = yup.object({
  projectId: yup.string().required("Project is required"),
  description: yup.string().default("").defined(),
  domain: yup.string().default("").defined(),
  responsibilities: yup.string().trim().max(5000, "Responsibilities are too long").default("").defined(),
  roles: yup.string().trim().max(3000, "Roles are too long").default("").defined(),
  start_date: nullableDate.default(null).defined(),
  end_date: nullableDate
    .default(null)
    .defined()
    .test("end-after-start", "End date cannot be before start date", function (value) {
      const start = this.parent.start_date as Date | null | undefined;
      if (!value || !start) return true;
      return new Date(value).getTime() >= new Date(start).getTime();
    }),
  environment: yup.array().of(yup.string().defined()).default([]).defined(),
});
