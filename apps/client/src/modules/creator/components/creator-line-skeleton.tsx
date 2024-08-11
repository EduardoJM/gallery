import { Skeleton } from "@/components/ui/skeleton";

export const CreatorLineSkeleton = () => {

  return (
    <div className="flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-full" />
      
      <div className="flex-1 space-y-1 text-sm">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  )
};
