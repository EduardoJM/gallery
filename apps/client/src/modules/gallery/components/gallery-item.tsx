import { Link, useLocation, useParams } from "react-router-dom";
import { Content } from '../types';
import { CreatorLine } from "@/modules/creator/components/creator-line";

export interface GalleryItemProps {
  content: Content;
}

export const GalleryItem = ({ content }: GalleryItemProps) => {
  const { creator } = useParams();
  const mediaToken = localStorage.getItem('@GALLERY:MEDIATOKEN');
  const location = useLocation();

  return (
    <div className="space-y-3 ">
      <Link
        to={`/dashboard/gallery/${creator ? `${creator}/` : ''}content/${content.id}/`}
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
      <CreatorLine creator={content.creator} />
    </div>
  )
}
