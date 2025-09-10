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
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Spinner } from "@/shared/components/ui/spinner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
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
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search"
          onChange={handleSearch}
          className="max-w-sm"
          data-testid="search-input"
        />
      </div>
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

DataTable.Skeleton = () => {
  return (
    <div>
      <div className="py-4">
        <Skeleton className="w-[300px] h-[36px]" />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <Skeleton className="w-full h-[40px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="h-[80vh] flex items-center justify-center">
              <Spinner />
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

DataTable.Skeleton.displayName = "DataTable.Skeleton";