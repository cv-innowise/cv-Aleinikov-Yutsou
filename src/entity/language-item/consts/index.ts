import { Proficiency } from "@/shared/types/language";

export const PROFICIENCY_TEXT_COLOR: Record<Proficiency, string> = {
  [Proficiency.A1]: "text-gray-700",
  [Proficiency.A2]: "text-gray-700",
  [Proficiency.B1]: "text-blue-700",
  [Proficiency.B2]: "text-blue-700",
  [Proficiency.C1]: "text-amber-400",
  [Proficiency.C2]: "text-amber-400",
  [Proficiency.Native]: "text-red-700",
};
