import { Link, useLocation, useParams } from "react-router-dom";
import { Play } from 'lucide-react'
import { Content, ContentType } from '../types';
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
          <div className="overflow-hidden relative rounded-md">
            <img
              loading="lazy"
              width="250"
              height="330"
              className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]"
              src={`http://localhost:3000/media/content/${content.id}/thumb/?token=${mediaToken}`}
            />
            {content.type === ContentType.Video && (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <Play fill="#fff" className="w-[32px] h-[32px]" />
              </div>
            )}
          </div>
        </span>
      </Link>
      <CreatorLine creator={content.creator} />
    </div>
  )
}
