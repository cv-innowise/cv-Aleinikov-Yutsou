"use client";

import { Column } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useTranslations } from "next-intl";

interface SortableColumnProps<T> {
  column: Column<T>;
  translateKey: string;
}

export const SortableColumn = <T,>({
  column,
  translateKey,
}: SortableColumnProps<T>) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("columns");

  const createQueryString = useCallback(
    (queries: { name: string; value: string }[]) => {
      const params = new URLSearchParams(searchParams.toString());

      queries.forEach(({ name, value }) => {
        if (params.has(name)) {
          params.delete(name);
        }

        params.append(name, value);
      });

      return params.toString();
    },
    [searchParams]
  );

  const onSort = () => {
    column.toggleSorting();
    const params = createQueryString([
      {
        name: "sortDir",
        value: column.getIsSorted() === "asc" ? "ASC" : "DESC",
      },
      { name: "sortBy", value: column.id },
    ]);
    router.push(`${pathname}?${params}`);
  };

  return (
    <Button variant="ghost" onClick={onSort}>
      {t(translateKey)}
      {column.getIsSorted() &&
        (column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4" />
        ))}
    </Button>
  );
};
