import { buildSkillStats } from "@/entity/cv/lib/build-skill-stats";
import { Cv } from "@/shared/types/cv-graphql";
import { useTranslations } from "next-intl";
import { formatMonthYear } from "@/shared/lib/date-utils";

interface CvSkillsInfoProps {
  cv: Cv;
  skills: { categoryName: string; skills: string[] }[];
}

export const CvSkillsInfo: React.FC<CvSkillsInfoProps> = ({ cv }) => {
  const t = useTranslations("cv.preview");

  const stats = buildSkillStats(cv);

  return (
    <div className="pdf-page w-full space-y-6 rounded-lg bg-card/60 p-8 shadow-sm ring-1 ring-border backdrop-blur">
      <h2 className="text-xl font-semibold text-foreground capitalize text-primary">{t("skillsTitle", { default: "Skills" })}</h2>

      <div className="overflow-x-auto rounded-md ring-1 ring-border">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-muted/50 text-foreground">
            <tr>
              <th className="px-4 py-2 text-left font-medium">{t("skillsColumn", { default: "Skills" })}</th>
              <th className="px-4 py-2 text-left font-medium">{t("experienceYears", { default: "Experience in years" })}</th>
              <th className="px-4 py-2 text-left font-medium">{t("lastUsed", { default: "Last used" })}</th>
            </tr>
          </thead>
          <tbody>
            {(stats.length ? stats : []).map((s) => (
              <tr key={s.name} className="border-t border-border">
                <td className="px-4 py-2 text-foreground/90">{s.name}</td>
                <td className="px-4 py-2 text-muted-foreground">{s.years}</td>
                <td className="px-4 py-2 text-muted-foreground">{formatMonthYear(s.lastUsed)}</td>
              </tr>
            ))}
            {!stats.length && (
              <tr>
                <td colSpan={3} className="px-4 py-4 text-center text-muted-foreground">
                  {t("noSkills", { default: "No skills" })}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
