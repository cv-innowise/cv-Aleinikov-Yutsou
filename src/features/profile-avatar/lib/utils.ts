import { validFileExtensions } from "../consts";

export function isValidFileType(fileName: string): boolean {
  return (
    !!fileName &&
    validFileExtensions.image.indexOf(fileName.split(".").pop()!) > -1
  );
}

export function getAllowedExt() {
  return validFileExtensions.image.map((e) => `.${e}`).toString();
}

export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
