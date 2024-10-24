import { Suspense, useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { useContentCreatorById } from '../queries';
import { SelectIcon } from '@/components/common/select-icon';
import { useSetContentCreatorLinks } from '../mutations';

interface CreatorFormProps {
  id: string;
}

const formSchema = z.object({
  links: z.array(z.object({
    name: z
      .string({ required_error: 'é obrigatório.' })
      .min(1, { message: 'é obrigatório.' }),
    icon: z
      .string({ required_error: 'é obrigatório.' })
      .min(1, { message: 'é obrigatório.' }),
    link: z
      .string({ required_error: 'é obrigatório' })
      .url({ message: 'precisa ser um link' }),
  }))
})

const CreatorLinksForm = ({ id }: CreatorFormProps) => {
  const { data: creator } = useContentCreatorById(id);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      links: creator?.links || [],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control: form.control,
    name: 'links',
  });
  const setCreatorLinks = useSetContentCreatorLinks();

  const handleAdd = () => {
    if (fields.length >= 5) {
      return;
    }
    append({ name: '', icon: '', link: '' });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setCreatorLinks.mutate({ id: creator?.id || '', links: values.links });
  }

  if (!creator) {
    return null;
  }
  
  return (
    <DialogHeader>
      <DialogTitle>Editar Links de {creator?.name}</DialogTitle>
      <DialogDescription className='pt-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className='px-4'>
              {!fields.length ? (
                <div className='w-full min-h-[200px] flex flex-col gap-4 items-center justify-center'>
                  <p>Nenhum link adicionado ainda!</p>

                  <div className="flex items-center justify-end">
                    <Button type="button" onClick={handleAdd}>Adicionar</Button>
                  </div>
                </div>
              ) : (
                <>
                  {fields.map((item, index) => (
                    <div key={item.id} className='grid grid-cols-3 gap-x-2'>
                      <FormField
                        control={form.control}
                        name={`links.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`links.${index}.icon`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ícone</FormLabel>
                            <FormControl>
                              <SelectIcon value={field.value} onChangeValue={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`links.${index}.link`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Link</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  
                  <div className="flex items-center justify-end pt-3">
                    <Button onClick={handleAdd} type="button" size="sm" variant="ghost">Adicionar</Button>
                  </div>
                </>
              )}
            </div>

            <div className='flex flex-row items-center justify-end pt-5'>
              <Button type='submit'>Salvar</Button>
            </div>
          </form>
        </Form>
      </DialogDescription>
    </DialogHeader>
  )
}

export const CreatorLinksFormModal = () => {
  const [params] = useSearchParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const isOpen = params.get('dialog') === 'creator-links';
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
      <DialogContent className='max-w-4xl'>
        <Suspense fallback={"Carregando..."}>
          <CreatorLinksForm id={id} />
        </Suspense>
      </DialogContent>
    </Dialog>
  )
}
