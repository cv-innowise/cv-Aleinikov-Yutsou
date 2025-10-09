"use client";

import { Cv } from "@/shared/types/cv-graphql";
import { CvProfileInfo } from "./cv-profile-info";
import { useRef } from "react";
import { ExportPdfButton } from "@/features/export-pdf";
import { useTranslations } from "next-intl";

interface CvPreviewClientProps {
  cv: Cv;
  skills: { categoryName: string; skills: string[] }[];
}

export const CvPreviewClient: React.FC<CvPreviewClientProps> = ({ cv, skills }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("cv.preview");
  return (
    <div className="min-w-full space-y-4">
      <div className="flex justify-end">
        {/* <ExportPdfButton filename={cv.name} cvId={cv.id} targetRef={ref}>
          {t("export")}
        </ExportPdfButton> */}
      </div>
      <div ref={ref}>
        <CvProfileInfo skills={skills} cv={cv} />
      </div>
    </div>
  );
};
