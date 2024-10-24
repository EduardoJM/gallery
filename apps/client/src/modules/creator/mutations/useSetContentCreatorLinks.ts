import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { ContentCreatorLink } from "../types";
import { setContentCreatorLinks } from '../services';

interface MutationProps {
  id: string;
  links: Array<ContentCreatorLink>;
}

export function useSetContentCreatorLinks() {
  const client = useQueryClient();
  const [search, setSearch] = useSearchParams();

  return useMutation<unknown, unknown, MutationProps>({
    mutationFn: async (props) => {
      const { id, links } = props;

      await setContentCreatorLinks(id, links);
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
