"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";

interface CvNavProps {
  cvId: string;
}

export const CvNav: React.FC<CvNavProps> = ({ cvId }) => {
  const pathname = usePathname();
  const t = useTranslations("cv.navigation");
  const detailsHref = `/cvs/${cvId}`;
  const skillsHref = `/cvs/${cvId}/skills`;
  const projectsHref = `/cvs/${cvId}/projects`;
  const previewHref = `/cvs/${cvId}/preview`;

  return (
    <div className="flex space-x-2">
      <Link className={cn("p-2 transition-colors hover:text-primary", pathname === detailsHref && "text-primary border-b")} href={detailsHref}>
        {t("details")}
      </Link>
      <Link className={cn("p-2 transition-colors hover:text-primary", pathname === skillsHref && "text-primary border-b")} href={skillsHref}>
        {t("skills")}
      </Link>
      <Link className={cn("p-2 transition-colors hover:text-primary", pathname === projectsHref && "text-primary border-b")} href={projectsHref}>
        {t("projects")}
      </Link>
      <Link className={cn("p-2 transition-colors hover:text-primary", pathname === previewHref && "text-primary border-b")} href={previewHref}>
        {t("preview")}
      </Link>
    </div>
  );
};
