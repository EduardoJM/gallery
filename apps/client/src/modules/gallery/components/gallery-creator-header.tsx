import { CreatorHeader } from '@/modules/creator/components/creator-header';
import { useContentCreatorById } from '@/modules/creator/queries';
import { useParams } from 'react-router-dom';

export const GalleryCreatorHeader = () => {
  const { creator: creatorId } = useParams<{ creator: string }>();
  const { data: creator } = useContentCreatorById(creatorId || '');

  if (!creator) {
    return null;
  }
  return (
    <CreatorHeader creator={creator} />
  )
};
