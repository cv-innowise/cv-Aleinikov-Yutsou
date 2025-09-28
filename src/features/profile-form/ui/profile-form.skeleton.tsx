import { Skeleton } from "@/shared/components/ui/skeleton";

export const ProfileFormSkeleton = () => {
  return (
    <div className="space-y-2">
      <div className="flex gap-x-4 justify-between">
        <div className="grow-1 space-y-1">
          <Skeleton className="w-[80px] h-[14px]" />
          <Skeleton className="w-[200px] h-[36px]" />
        </div>
        <div className="grow-1 space-y-1">
          <Skeleton className="w-[80px] h-[14px]" />
          <Skeleton className="w-[200px] h-[36px]" />
        </div>
      </div>
      <div className="flex gap-x-4 justify-between">
        <div className="grow-1 space-y-1">
          <Skeleton className="w-[80px] h-[14px]" />
          <Skeleton className="w-[200px] h-[36px]" />
        </div>
        <div className="grow-1 space-y-1">
          <Skeleton className="w-[80px] h-[14px]" />
          <Skeleton className="w-[200px] h-[36px]" />
        </div>
      </div>
    </div>
  );
};
