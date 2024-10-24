import { Link, useLocation } from "react-router-dom";
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { Separator } from "@/components/ui/separator"
import { Icon } from "@/components/ui/icon"
import { CreatorLinksFormModal } from '../modals/creator-links-form-modal';
import { ContentCreator } from '../types';
import { CreatorAvatar } from './creator-avatar';
import { UploadFileModal } from "@/modules/gallery/modals/upload-file-modal";

export interface CreatorHeaderProps {
  creator: ContentCreator;
}

export const CreatorHeader = ({ creator }: CreatorHeaderProps) => {
  const location = useLocation();
 
  return (
    <>
      <div className='flex flex-row items-center p-6 gap-5'>
        <CreatorAvatar creator={creator} size="200px" />

        <div className='flex flex-col items-stretch'>
          <h1>{creator.name}</h1>
          
          <div className='flex'>
            {creator.links.map((link) => (
              <a href={link.link} target='_blank' title={link.name}>
                <Icon name={link.icon as keyof typeof dynamicIconImports} />
              </a>
            ))}
          </div>
          <div>
            <Link
              to={`?dialog=creator-links&id=${creator.id}`}
              state={{
                prevLocation: location
              }}
            >
              Editar Links
            </Link>
            <Link
              to={`?dialog=upload&id=${creator.id}`}
              state={{
                prevLocation: location
              }}
            >
              Upload
            </Link>
          </div>
        </div>
      </div>

      <Separator className="mb-6" />

      <CreatorLinksFormModal />
      <UploadFileModal />
    </>
  );
}
