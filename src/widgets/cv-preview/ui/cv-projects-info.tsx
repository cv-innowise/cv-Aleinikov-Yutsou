import { Cv } from "@/shared/types/cv-graphql";
import { useTranslations } from "next-intl";

interface CvProjectsInfoProps {
  cv: Cv;
}

export const CvProjectsInfo: React.FC<CvProjectsInfoProps> = ({ cv }) => {
  const t = useTranslations("cv.preview");

  const formatDate = (iso?: string | null) => {
    if (!iso) return "—";
    try {
      return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  const projects = cv.projects ?? [];

  return (
    <div className="w-full space-y-10 rounded-lg bg-card/60 p-8 shadow-sm ring-1 ring-border backdrop-blur">
      <div className="space-y-8">
        {projects.map((project) => {
          const roles = project.roles ?? [];
          const responsibilities = project.responsibilities ?? [];
          const environment = project.environment ?? [];

          return (
            <section key={project.id} className="space-y-4 border-b border-border pb-6 last:border-b-0 last:pb-0">
              <header className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
                <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">{t("period", { default: "Period" })}:</span> {formatDate(project.start_date)} — {formatDate(project.end_date)}
                </div>
              </header>

              {project.description && <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>}

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="mb-2 text-sm font-medium text-foreground">{t("roles", { default: "Roles" })}</div>
                  {roles.length ? (
                    <ul className="list-disc pl-5 text-sm text-muted-foreground">
                      {roles.map((role, i) => (
                        <li key={`${role}-${i}`}>{role}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">{cv.user?.position_name}</p>
                  )}
                </div>

                <div>
                  <div className="mb-2 text-sm font-medium text-foreground">{t("responsibilities", { default: "Responsibilities" })}</div>
                  {responsibilities.length ? (
                    <ul className="list-disc pl-5 text-sm text-muted-foreground">
                      {responsibilities.map((item, i) => (
                        <li key={`${item}-${i}`}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">—</p>
                  )}
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm font-medium text-foreground">{t("environment", { default: "Environment" })}</div>
                {environment.length ? (
                  <div className="flex flex-wrap gap-2">
                    {environment.map((env, i) => (
                      <span key={`${env}-${i}`} className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs text-foreground ring-1 ring-border">
                        {env}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">—</p>
                )}
              </div>
            </section>
          );
        })}
        {!projects.length && <p className="text-sm text-muted-foreground">{t("noProjects", { default: "No projects" })}</p>}
      </div>
    </div>
  );
};
