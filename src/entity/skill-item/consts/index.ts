import { Mastery } from "@/shared/lib/types/skill";

export const MASTERY_BG_COLOR: Record<Mastery, string> = {
  [Mastery.NOVICE]: "bg-gray-700",
  [Mastery.ADVANCED]: "bg-blue-700",
  [Mastery.COMPETENT]: "bg-green-400",
  [Mastery.PROFICIENT]: "bg-amber-400",
  [Mastery.EXPERT]: "bg-red-700",
};