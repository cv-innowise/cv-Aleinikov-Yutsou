"use client";

import React from "react";
import { useQuery } from "@apollo/client/react";
import { BreadcrumbSeparator, BreadcrumbItem, BreadcrumbLink } from "@/shared/components/ui/breadcrumb";
import { CV_QUERY, CvResponse } from "@/shared/graphql/cv";

interface CvCrumbProps {
  id: string;
  href: string;
}

export const CvCrumb: React.FC<CvCrumbProps> = ({ id, href }) => {
  const { data, error } = useQuery<CvResponse>(CV_QUERY, { variables: { cvId: id } });
  console.log(error);
  console.log(data);

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
