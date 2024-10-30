import { AxiosProgressEvent } from "axios";
import api from "@/lib/axios"
import { Content, PaginatedContents } from './types';

export const getContentsPaginated = async (
  page: number = 1,
  creator: string | null = null,
  mediaType: string | null = null,
  tags: string | null = null,
): Promise<PaginatedContents> => {
  let queries = `?page=${page}`;
  if (creator) {
    queries = `${queries}&creator=${creator}`;
  }
  if (mediaType) {
    queries = `${queries}&mediaType=${mediaType}`
  }
  if (tags) {
    queries = `${queries}&tags=${tags}`;
  }
  const { data } = await api.get<PaginatedContents>(`/contents${queries}`);
  return data;
}

export const getNextContent = async (id: string, creator: string | null = null): Promise<string | null> => {
  let queries = `?`;
  if (creator) {
    queries = `${queries}creator=${creator}&`;
  }
  try {
    const { data } = await api.get<{ id: string }>(`/contents/next/${id}${queries}`)
    return data.id;
  } catch {
    return null;
  }
}

export const getPreviousContent = async (id: string, creator: string | null = null): Promise<string | null> => {
  let queries = `?`;
  if (creator) {
    queries = `${queries}creator=${creator}&`;
  }
  try {
    const { data } = await api.get<{ id: string }>(`/contents/previous/${id}${queries}`)
    return data.id;
  } catch {
    return null;
  }
}

export const getContentById = async (id: string): Promise<Content> => {
  const { data } = await api.get<Content>(`/contents/${id}/`);
  return data;
};

export const setContentTags = async (id: string, tags: Array<string>): Promise<Content> => {
  const { data } = await api.put<Content>(`/contents/${id}/tags`, { tags });
  return data;
}

export const uploadPhoto = async (
  creatorId: string,
  file: File,
  progressCallBack?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const form = new FormData();
  form.append('file', file);
  form.append('creator', creatorId);
  await api.post('/contents/photo/', form, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Accept": "*/*"
    },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      console.log(progressEvent);
      if (!progressCallBack) {
        return;
      }
      progressCallBack(progressEvent);
    }
  });
}

export const uploadVideo = async (
  creatorId: string,
  file: File,
  progressCallBack?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const form = new FormData();
  form.append('file', file);
  form.append('creator', creatorId);
  await api.post('/contents/video/', form, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Accept": "*/*"
    },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      console.log(progressEvent);
      if (!progressCallBack) {
        return;
      }
      progressCallBack(progressEvent);
    }
  });
}
