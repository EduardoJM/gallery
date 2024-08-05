import { Link, useLocation } from "react-router-dom";
import { Content } from '../types';
import { CreatorAvatar } from "@/modules/creator/components/creator-avatar";

export interface GalleryItemProps {
  content: Content;
}

export const GalleryItem = ({ content }: GalleryItemProps) => {
  const mediaToken = localStorage.getItem('@GALLERY:MEDIATOKEN');
  const location = useLocation();

  return (
    <div className="space-y-3 ">
      <Link
        to={`/dashboard/gallery/content/${content.id}/`}
        state={{
          prevLocation: location
        }}
      >
        <span data-state="closed">
          <div className="overflow-hidden rounded-md">
            <img
              loading="lazy"
              width="250"
              height="330"
              className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]"
              src={`http://localhost:3000/media/content/${content.id}/thumb/?token=${mediaToken}`}
            />
          </div>
        </span>
      </Link>
      <div className="flex items-center gap-3">
        <CreatorAvatar creator={content.creator} />
        
        <div className="flex-1 space-y-1 text-sm">
          <h3 className="font-medium leading-none">{content.creator.name}</h3>
          <p className="text-xs text-muted-foreground">Lena Logic</p>
        </div>
      </div>
    </div>
  )
}
