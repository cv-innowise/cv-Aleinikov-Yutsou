import { Cv } from "@/shared/types/cv-graphql";
import { useTranslations } from "next-intl";

interface CvProfileInfoProps {
  cv: Cv;
  skills: { categoryName: string; skills: string[] }[];
}

export const CvProfileInfo: React.FC<CvProfileInfoProps> = ({ cv, skills }) => {
  const t = useTranslations("cv.preview");

  return (
    <div className="pdf-page w-full space-y-10 rounded-lg bg-card/60 p-8 shadow-sm ring-1 ring-border backdrop-blur">
      <div className="flex flex-col gap-1 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{cv.user?.profile.full_name}</h1>
          <h2 className="text-lg font-medium text-primary">{cv.user?.position_name}</h2>
        </div>
        {cv.name && (
          <div className="mt-4 md:mt-0 md:text-right">
            <p className="text-sm uppercase tracking-wide text-muted-foreground">{cv.name}</p>
          </div>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="space-y-6 md:col-span-1">
          {cv.education && (
            <section>
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("educationLabel")}</h4>
              <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{cv.education}</p>
            </section>
          )}

          {cv.languages?.length > 0 && (
            <section>
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("languagesLabel")}</h4>
              <ul className="space-y-0.5">
                {cv.languages.map((lang, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground/90">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-muted-foreground">- {lang.proficiency}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {cv.projects?.length ? (
            <section>
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("domenLable")}</h4>
              <div className="flex flex-wrap gap-2">
                {cv.projects.map((p) => (
                  <span key={p.id} className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-border">
                    {p.domain}
                  </span>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <div className="space-y-8 md:col-span-2">
          {cv.description && (
            <section className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{t("descriptionLabel")}</h3>
              <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{cv.description}</p>
            </section>
          )}

          {skills.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{t("skillsLabel")}</h3>
              <div className="space-y-6">
                {skills.map(({ categoryName, skills }) => (
                  <div key={categoryName}>
                    <p className="mb-1 font-medium text-foreground">{categoryName}</p>
                    <p className="text-sm leading-snug text-muted-foreground">
                      {skills
                        .slice()
                        .sort((a, b) => a.localeCompare(b))
                        .join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
