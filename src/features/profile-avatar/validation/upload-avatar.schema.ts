import * as yup from "yup";
import { isValidFileType } from "../lib/utils";
import { MAX_FILE_SIZE } from "../consts";

export const uploadAvatarSchema = yup.object().shape({
  userId: yup.string().required(),
  avatar: yup
    .mixed<File>()
    .required("Required")
    .test("is-valid-type", "Not a valid image type", (value) =>
      isValidFileType(value && value.name.toLowerCase())
    )
    .test(
      "is-valid-size",
      "Max allowed size is 100KB",
      (value) => value && value.size <= MAX_FILE_SIZE
    ),
});