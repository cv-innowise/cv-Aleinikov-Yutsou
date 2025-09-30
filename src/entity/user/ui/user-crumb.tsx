"use client";

import React from "react";
import { useQuery } from "@apollo/client/react";
import { BreadcrumbSeparator, BreadcrumbItem, BreadcrumbLink } from "@/shared/components/ui/breadcrumb";
import { UserResponse, USER_BY_ID } from "@/shared/graphql/users";

interface UserCrumbProps {
  id: string;
  href: string;
}

export const UserCrumb: React.FC<UserCrumbProps> = ({ id, href }) => {
  const { data } = useQuery<UserResponse>(USER_BY_ID, { variables: { userId: id } });
  const label = data?.user?.profile?.full_name || data?.user?.email || id;

  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
      </BreadcrumbItem>
    </>
  );
};
