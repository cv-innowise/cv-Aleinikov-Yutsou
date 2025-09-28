import { Skeleton } from "@/shared/components/ui/skeleton";
import { Spinner } from "@/shared/components/ui/spinner";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

export const DataTableSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="w-[200px] h-[60px]" />
      <Skeleton className="w-[300px] h-[36px]" />
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
