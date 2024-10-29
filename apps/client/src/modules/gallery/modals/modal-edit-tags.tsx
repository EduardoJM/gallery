import { PropsWithChildren, Suspense } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ModalEditTagsForm = () => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Editar Tags</DialogTitle>
        <DialogDescription className='pt-6'>
          Q?
        </DialogDescription>
      </DialogHeader>
    </>
  );
};

export const ModalEditTags = ({ children }: PropsWithChildren) => {
  
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      
      <DialogContent className="z-[65]">
        <Suspense fallback={"Carregando..."}>
          <ModalEditTagsForm />
        </Suspense>
      </DialogContent>
    </Dialog>
  )
};
