import { Outlet, useSearchParams } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";

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


export const GalleryLayout = () => {
  const [value, setValue] = useState<Array<{ label: string; value: string }>>([]);
  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    const debounce = setTimeout(() => {
      const newSearch = new URLSearchParams(search);
      newSearch.set('tags', value.map((item) => item.label).join(','));
      setSearch(newSearch);
    }, 300);

    return () => clearTimeout(debounce);
  }, [value, search, setSearch]);

  return (
    <div className="flex flex-row gap-5 w-full max-w-6xl">
      <div className="flex-1">
        
        <div>
          <CreatableAsyncPaginate
            placeholder="Select tags"
            loadOptions={async (search: string, _: unknown, additional?: { page?: number }) => {
              const { page } = additional || { page: 1 };
              const data = await getTagsPaginated(page || 1, search);
              
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
        </div>

        <Suspense fallback={<>Carregando...</>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
};
