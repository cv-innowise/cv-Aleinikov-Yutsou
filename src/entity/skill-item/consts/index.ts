import { Mastery } from "@/shared/types/cv-graphql";

export const MASTERY_BG_COLOR: Record<Mastery, string> = {
  [Mastery.Novice]: "bg-gray-700",
  [Mastery.Advanced]: "bg-blue-700",
  [Mastery.Competent]: "bg-green-400",
  [Mastery.Proficient]: "bg-amber-400",
  [Mastery.Expert]: "bg-red-700",
};

export const MasteryMappa = [
  Mastery.Novice,
  Mastery.Novice,
  Mastery.Advanced,
  Mastery.Competent,
  Mastery.Proficient,
  Mastery.Expert,
];
