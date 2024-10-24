import { useMutation } from "@tanstack/react-query";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getNextContent } from '../services';

export function useFindNextContent() {
  const {
    creator: creatorId,
    id: contentId,
  } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      return getNextContent(contentId || '', creatorId || null);
    },
    onSuccess: (id: string | null) => {
      if (!id) {
        // TODO: exibir feedback visual
        return;
      }
      if (creatorId) {
        return navigate(
          `/dashboard/gallery/${creatorId}/content/${id}/`,
          { state: { prevLocation: state?.prevLocation } },
        );
      }
      return navigate(
        `/dashboard/gallery/content/${id}/`,
        { state: { prevLocation: state?.prevLocation } },
      );
    },
    onError: () => {
      // TODO: show errors
    },
  });
}
