import { Cv } from "@/shared/types/cv-graphql";
import { diffInMonths } from "@/shared/lib/date-utils";

export type SkillStat = {
  name: string;
  years: number;
  lastUsed?: string | null;
};

export function buildSkillStats(cv: Cv): SkillStat[] {
  const projects = cv.projects ?? [];
  const skillList = (cv.skills ?? []).map((s) => s.name).filter(Boolean);

  const normalizedProjects = projects.map((p) => ({
    start: p.start_date,
    end: p.end_date,
    env: (p.environment ?? []).map((e) => e.toLowerCase().trim()),
  }));

  return skillList
    .map((skillName) => {
      const key = skillName.toLowerCase().trim();

      let totalMonths = 0;
      let lastUsed: string | null | undefined = null;

      for (const p of normalizedProjects) {
        if (!p.env.includes(key)) continue;
        totalMonths += diffInMonths(p.start, p.end);

        const end = p.end ?? new Date().toISOString();
        if (!lastUsed || new Date(end) > new Date(lastUsed)) {
          lastUsed = end;
        }
      }

      return {
        name: skillName,
        years: Number((totalMonths / 12).toFixed(1)),
        lastUsed,
      };
    })
    .sort((a, b) => b.years - a.years || a.name.localeCompare(b.name));
}
