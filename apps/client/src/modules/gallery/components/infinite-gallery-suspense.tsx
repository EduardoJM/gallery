import { Skeleton } from "@/components/ui/skeleton"
import { GalleryGrid } from '@/components/ui/gallery-grid';
import { CreatorLineSkeleton } from "@/modules/creator/components/creator-line-skeleton";

const GalleryItemSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="aspect-[3/4]" />
    <CreatorLineSkeleton />
  </div>
)

export const InfiniteGallerySuspense = () => {

  return (
    <GalleryGrid>
      <GalleryItemSkeleton />
      <GalleryItemSkeleton />
      <GalleryItemSkeleton />
      <GalleryItemSkeleton />
      <GalleryItemSkeleton />
      <GalleryItemSkeleton />
      <GalleryItemSkeleton />
      <GalleryItemSkeleton />
    </GalleryGrid>
  );
};
