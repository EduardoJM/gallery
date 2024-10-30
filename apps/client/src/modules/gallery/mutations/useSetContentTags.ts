import { useMutation } from "@tanstack/react-query";
import { setContentTags } from '../services';

interface Props {
  contentId: string;
  tags: Array<string>;
}

export function useSetContentTags() {
  return useMutation<unknown, unknown, Props>({
    mutationFn: async ({ contentId, tags }) => {
      return setContentTags(contentId, tags);
    },
    onSuccess: () => {
      // TODO: exibir feedback visual
    },
    onError: () => {
      // TODO: show errors
    },
  });
}
