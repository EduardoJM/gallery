import { Suspense, useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Dropzone } from '@/components/ui/dropzone';
import { useChangeContentCreator } from '../mutations';
import { useContentCreatorById } from '../queries';

interface CreatorFormProps {
  id: string;
}

const formSchema = z.object({
  name: z.string().min(1).max(150),
})

const CreatorForm = ({ id }: CreatorFormProps) => {
  const mediaToken = localStorage.getItem('@GALLERY:MEDIATOKEN');

  const changeContentCreator = useChangeContentCreator();
  const { data: creator } = useContentCreatorById(id);
  const [file, setFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: creator?.name || '',
    },
  });

  const creatorCover = creator ? `http://localhost:3000/media/creators/${creator.id}/cover/?token=${mediaToken}` : null;

  function onSubmit(values: z.infer<typeof formSchema>) {
    changeContentCreator.mutate({
      cover: file || null,
      name: values.name,
      id: creator?.id || null,
    })
  }

  return (
    <DialogHeader>
      <DialogTitle>{creator?.name || 'Novo Criador de Conteúdos'}</DialogTitle>
      <DialogDescription className='pt-6'>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Criador</FormLabel>
                  <FormControl>
                    <Input autoFocus {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Dropzone
              onConfirm={([fileItem]) => setFile(fileItem)}
              validExtensions={['.jpg', '.jpeg', '.png', '.gif']}
              currentFile={file || creatorCover || null}
            />

            <div className='flex flex-col items-end'>
              <Button type="submit">
                {changeContentCreator.isPending ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </Form>

      </DialogDescription>
    </DialogHeader>
  )
}

export const CreatorFormModal = () => {
  const [params] = useSearchParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const isOpen = params.get('dialog') === 'creator';
  const id = params.get('id') || '';

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

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <Suspense fallback={"Carregando..."}>
          <CreatorForm id={id} />
        </Suspense>
      </DialogContent>
    </Dialog>
  )
}
