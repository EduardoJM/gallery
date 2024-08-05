import { Suspense } from 'react';
import { Navigate, useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useContentById } from '../queries';
import { ContentType } from '../types';

interface GalleryItemModalInnerProps {
  id: string;
}

const GalleryItemModalInner = ({ id }: GalleryItemModalInnerProps) => {
  const mediaToken = localStorage.getItem('@GALLERY:MEDIATOKEN');
  const { data:content } = useContentById(id);

  return (
    <>
      {content.type === ContentType.Photo && (
        <img
          loading='lazy'
          className="h-auto w-auto object-contain aspect-[3/4]"
          src={`http://localhost:3000/media/content/${content.id}/photo/?token=${mediaToken}`}
        />
      )}
    </>
  )
}

export const GalleryItemModal = () => {

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
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            
            <Suspense fallback={"Carregando..."}>
              <GalleryItemModalInner id={id || ''} />
            </Suspense>

          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
