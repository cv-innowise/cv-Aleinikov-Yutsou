"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Input } from "@/shared/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DATA_PER_VIEW } from "../consts";

interface DataTableProps<TData, TValue> {
  title: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  children?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  title,
  columns,
  data,
  children,
}: DataTableProps<TData, TValue>) {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search") ?? "";
  const sort = [
    {
      id: searchParams?.get("sortBy") ?? "",
      desc: searchParams?.get("sortDir") === "DESC",
    },
  ];
  const router = useRouter();
  const pathname = usePathname();
  const [offset, setOffset] = useState(DATA_PER_VIEW);
  const [scrollTrigger, isInView] = useInView();
  const [sorting, setSorting] = useState<SortingState>(
    searchParams.has("sortBy") ? sort : []
  );
  const [globalFilter, setGlobalFilter] = useState<string>(search);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
  });
  const hasMoreData = offset < table.getRowModel().rows.length;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value;
    table.setGlobalFilter(searchValue);
    router.push(pathname + "?" + createQueryString("search", searchValue));
  }

  useEffect(() => {
    if (isInView && hasMoreData) {
      setOffset((prevOffset) => prevOffset + DATA_PER_VIEW);
    }
  }, [isInView, data, hasMoreData]);

  return (
    <div className="space-y-4">
      <h2 className="text-6xl uppercase text-muted-foreground">{title}</h2>
      {children}
      <Input
        placeholder="Search"
        defaultValue={search}
        onChange={handleSearch}
        className="max-w-sm"
        data-testid="search-input"
      />
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} data-testid="head-ceil">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!!table.getRowModel().rows.length &&
              table
                .getRowModel()
                .rows.slice(0, offset)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    data-testid="table-row"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            <TableRow>
              {hasMoreData ? (
                <TableCell
                  ref={scrollTrigger}
                  colSpan={columns.length}
                  className="h-12 text-center"
                  data-testid="loading"
                >
                  Loading...
                </TableCell>
              ) : (
                <TableCell
                  ref={scrollTrigger}
                  colSpan={columns.length}
                  className="h-12 text-center"
                  data-testid="no-results"
                >
                  No more results
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
