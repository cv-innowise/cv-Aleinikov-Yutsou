"use client";

import React from "react";
import { useQuery } from "@apollo/client/react";
import { BreadcrumbSeparator, BreadcrumbItem, BreadcrumbLink } from "@/shared/components/ui/breadcrumb";
import { GET_CV } from "@/shared/graphql/cvs/cvs.queries";
import { CvResponse } from "@/shared/graphql/cvs/cvs.types";

interface CvCrumbProps {
  id: string;
  href: string;
}

export const CvCrumb: React.FC<CvCrumbProps> = ({ id, href }) => {
  const { data } = useQuery<CvResponse>(GET_CV, { variables: { cvId: id } });

  const label = data?.cv.name || id;

  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
      </BreadcrumbItem>
    </>
  );
};
