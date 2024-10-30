import { PropsWithChildren, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Creatable from "react-select/creatable";
import type {
  CreatableProps,
  UseAsyncPaginateParams,
  ComponentProps
} from "react-select/creatable";
import { withAsyncPaginate } from 'react-select-async-paginate';
import { getTagsPaginated } from '@/modules/tags/services';
import type { GroupBase } from "react-select";
import type { ReactElement } from "react";
import { useSetContentTags } from '../mutations'
import { Button } from '@/components/ui/button';

type AsyncPaginateCreatableProps<
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean
> = CreatableProps<OptionType, IsMulti, Group> &
  UseAsyncPaginateParams<OptionType, Group, Additional> &
  ComponentProps<OptionType, Group, IsMulti>;

type AsyncPaginateCreatableType = <
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean = false
>(
  props: AsyncPaginateCreatableProps<OptionType, Group, Additional, IsMulti>
) => ReactElement;

const CreatableAsyncPaginate = withAsyncPaginate(
  Creatable
) as AsyncPaginateCreatableType;

export const ModalEditTags = ({ children, contentId, creatorId, tags }: PropsWithChildren<{ contentId: string; creatorId: string; tags: Array<string> }>) => {
  const [value, setValue] = useState<Array<{ label: string; value: string }>>(
    tags.map((tag) => ({ label: tag, value: tag })),
  );
  const setContentTags = useSetContentTags();

  useEffect(() => {
    setValue(tags.map((tag) => ({ label: tag, value: tag })));
  }, [tags]);

  const handleSubmit = () => {
    const tags = value.map((item) => item.label);
    setContentTags.mutate({ contentId, tags });
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      
      <DialogContent className="z-[65]">
        <DialogHeader>
          <DialogTitle>Editar Tags</DialogTitle>
          <DialogDescription className='pt-6'>
            <CreatableAsyncPaginate
              placeholder="Select tags"
              loadOptions={async (search: string, _: unknown, additional?: { page?: number }) => {
                const { page } = additional || { page: 1 };
                const data = await getTagsPaginated(creatorId, page || 1, search);
                
                return {
                  options: [
                    ...data.results.map(item => ({
                      label: item.name,
                      value: item.name,
                    })),
                  ],
                  hasMore: data.meta.page < data.meta.pages,
                  additional: {
                    page: Number(page || 1) + 1,
                  },
                };
              }}
              onCreateOption={(value: string) => {
                setValue((prev) => [...prev, { label: value, value} ]);
              }}
              onChange={((value) => setValue(value))}
              value={value}
              isMulti
            />

            <div>
              <Button onClick={handleSubmit} disabled={setContentTags.isPending}>
                {setContentTags.isPending ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
};
