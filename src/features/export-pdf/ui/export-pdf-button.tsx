"use client";

import { Button } from "@/shared/components/ui/button";
import { EXPORT_PDF } from "@/shared/graphql/cvs/cvs.mutations";
import { ExportPdfRequest, ExportPdfResponse } from "@/shared/graphql/cvs/cvs.types";
import { useMutation } from "@apollo/client/react";
import { buildHtmlWithStyles } from "../lib/build-html";
import { downloadBase64Pdf } from "../lib/downloadPdf";
import { MarginInput } from "@/shared/types/cv-graphql";

interface ExportPdfButtonProps {
  filename: string;
  children: React.ReactNode;
  className?: string;
  targetRef: React.RefObject<HTMLElement | null>;
}

const margin: MarginInput = {
  top: "15mm",
  bottom: "15mm",
  left: "12mm",
  right: "12mm",
};

export const ExportPdfButton: React.FC<ExportPdfButtonProps> = ({ filename, children, className, targetRef }) => {
  const [exportPdf, { loading, error }] = useMutation<ExportPdfResponse, ExportPdfRequest>(EXPORT_PDF);

  const handleClick = async () => {
    try {
      const element = targetRef?.current;
      const rawHtml = element?.outerHTML;
      if (!element || !rawHtml) throw new Error("No HTML to export");

      const finalHtml = await buildHtmlWithStyles({ html: rawHtml, element });

      const { data } = await exportPdf({
        variables: {
          pdf: {
            html: finalHtml,
            margin,
          },
        },
      });

      const pdfBase64 = data?.exportPdf;
      if (!pdfBase64) throw new Error("No PDF data received");

      const safeName = (filename || "document").trim();
      const nameWithExt = safeName.toLowerCase().endsWith(".pdf") ? safeName : `${safeName}.pdf`;

      downloadBase64Pdf(nameWithExt, pdfBase64);
    } catch (e) {
      console.error("Export PDF failed:", e);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1.5">
      <Button type="button" className={className} onClick={handleClick} loading={loading}>
        {children}
      </Button>
      {error && <p className="text-xs text-destructive">{error.message}</p>}
    </div>
  );
};
