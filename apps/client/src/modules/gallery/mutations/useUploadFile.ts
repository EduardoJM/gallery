import { AxiosProgressEvent } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { uploadPhoto, uploadVideo } from '../services';

interface MutationProps {
  creatorId: string;
  file: File;
  fileType: 'video' | 'photo';
}

export function useUploadFile(
  progressCallBack?: (progressEvent: AxiosProgressEvent) => void
) {
  const client = useQueryClient();
  const [search, setSearch] = useSearchParams();

  return useMutation<unknown, unknown, MutationProps>({
    mutationFn: async (props) => {
      const { creatorId, file, fileType } = props;

      if (fileType === 'photo') {
        return uploadPhoto(creatorId, file, progressCallBack);
      }
      return uploadVideo(creatorId, file, progressCallBack);
    },
    onSuccess: () => {
      search.delete('dialog');
      search.delete('id');
      setSearch(search);

      client.invalidateQueries({ queryKey: ['contents'] });
      client.invalidateQueries({ queryKey: ['content-by-id'] });
    },
    onError: () => {
      // TODO: show errors
    },
  });
}
