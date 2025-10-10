import { Skeleton } from "@/shared/components/ui/skeleton";

export const CvPreviewSkeleton = () => {
  return (
    <div className="min-w-full space-y-4">
      <div className="flex justify-end">
        <Skeleton className="w-[100px] h-[40px]" />
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="w-full space-y-10 rounded-lg bg-card/60 p-8 shadow-sm ring-1 ring-border backdrop-blur">
          <div className="flex flex-col gap-1 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Skeleton className="w-[200px] h-8 mb-1" />
              <Skeleton className="w-[150px] h-6" />
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-6 md:col-span-1">
              <section>
                <Skeleton className="w-[100px] h-4 mb-1" />
                <Skeleton className="w-full h-12" />
              </section>

              <section>
                <Skeleton className="w-[100px] h-4 mb-1" />
                <ul className="space-y-0.5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Skeleton className="w-[80px] h-4" />
                      <Skeleton className="w-[60px] h-4" />
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <Skeleton className="w-[100px] h-4 mb-1" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="w-[60px] h-6 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-border" />
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-8 md:col-span-2">
              <section className="space-y-2">
                <Skeleton className="w-[120px] h-4 mb-1" />
                <Skeleton className="w-full h-20" />
              </section>

              <section className="space-y-4">
                <Skeleton className="w-[120px] h-4 mb-1" />
                <div className="space-y-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="w-[60px] h-6 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-border" />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
