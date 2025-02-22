import { Suspense } from 'react';
import { Navigate, useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ReactPlayer from 'react-player'
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { useContentById } from '../queries';
import { ContentType } from '../types';
import { Button } from '@/components/ui/button';
import { useFindPreviousContent, useFindNextContent } from '../mutations';

interface GalleryItemModalInnerProps {
  id: string;
}

const GalleryItemModalInner = ({ id }: GalleryItemModalInnerProps) => {
  const nextContentMutation = useFindNextContent();
  const previousContentMutation = useFindPreviousContent();
  const mediaToken = localStorage.getItem('@GALLERY:MEDIATOKEN');
  const { data:content } = useContentById(id);

  return (
    <>
      {content.type === ContentType.Photo && (
        <img
          loading='lazy'
          className="h-full w-full object-contain"
          src={`http://localhost:3000/media/content/${content.id}/photo/?token=${mediaToken}`}
        />
      )}
      {content.type === ContentType.Video && (
        <div className='w-full h-full flex flex-col items-stretch'>
          <ReactPlayer
            width="100%"
            height="100%"
            url={`http://localhost:3000/media/content/${content.id}/video/?token=${mediaToken}`}
            controls
          />
        </div>
      )}

      <Button
        className='absolute top-[50%] translate-y-[-50%] text-white'
        variant="ghost"
        onClick={() => previousContentMutation.mutate()}
      >
        <ArrowLeft />
      </Button>
      <Button
        className='absolute right-0 top-[50%] translate-y-[-50%] text-white'
        variant="ghost"
        onClick={() => nextContentMutation.mutate()}
      >
        <ArrowRight />
      </Button>
    </>
  )
}

const GalleryItemModal = () => {
  const { id } = useParams<{ id?: string }>();
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    if (!state?.prevLocation) {
      return navigate('/dashboard/gallery');
    }
    return navigate(state.prevLocation);
  }

  const handleOpenChange = (value: boolean) => {
    if (value) {
      return;
    }
    return handleClose();
  }

  if (!id) {
    return <Navigate to="/dashboard/gallery" />;
  }

  return (
    <Dialog
      open={true}
      onOpenChange={handleOpenChange}
    >
      <DialogContent
        className='w-full max-w-full h-full max-h-full flex flex-col items-stretch p-0 sm:rounded-none bg-[#ffffff33] border-0'
      >
        <Suspense
          fallback={
            <>
              TODO: carregando...
            </>
          }
        >
          <GalleryItemModalInner id={id || ''} />
        </Suspense>
        
        <DialogClose className='text-white' />
      </DialogContent>
    </Dialog>
  )
}

export default GalleryItemModal;
