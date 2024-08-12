import { Separator } from "@/components/ui/separator"
import { ContentCreator } from '../types';
import { CreatorAvatar } from './creator-avatar';

export interface CreatorHeaderProps {
  creator: ContentCreator;
}

export const CreatorHeader = ({ creator }: CreatorHeaderProps) => {
 
  return (
    <>
      <div className='flex flex-row items-center p-6 gap-5'>
        <CreatorAvatar creator={creator} size="200px" />

        <div className='flex flex-col items-stretch'>
          <h1>{creator.name}</h1>
          
          <div className='flex'>
            {creator.links.map((link) => (
              <a href={link.link} target='_blank'>
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <Separator className="mb-6" />
    </>
  );
}
