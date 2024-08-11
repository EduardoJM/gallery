import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { ContentCreator } from "../types";
import { createContentCreator, updateContentCreator } from '../services';

interface MutationProps {
  id?: string | null;
  name: string;
  cover?: File | null;
}

export function useChangeContentCreator() {
  const client = useQueryClient();
  const [search, setSearch] = useSearchParams();

  return useMutation<ContentCreator, unknown, MutationProps>({
    mutationFn: async (props) => {
      const { id, name, cover } = props;

      const form = new FormData();
      form.append('name', name);
      if (cover) {
        form.append('cover', cover);
      }

      if (id) {
        const creator = await updateContentCreator(id, form);
        return creator;
      }
      const creator = await createContentCreator(form);
      return creator;
    },
    onSuccess: () => {
      search.delete('dialog');
      search.delete('id');
      setSearch(search);

      client.invalidateQueries({ queryKey: ['creators'] });
      client.invalidateQueries({ queryKey: ['creator-by-id'] });
    },
    onError: () => {
      // TODO: show errors
    },
  });
}
