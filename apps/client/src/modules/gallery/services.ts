import api from "@/lib/axios"
import { Content, PaginatedContents } from './types';

export const getContentsPaginated = async (page: number = 1, creator: string | null = null): Promise<PaginatedContents> => {
  let queries = `?page=${page}`;
  if (creator) {
    queries = `${queries}&creator=${creator}`;
  }
  const { data } = await api.get<PaginatedContents>(`/contents${queries}`);
  return data;
}

export const getContentById = async (id: string): Promise<Content> => {
  const { data } = await api.get<Content>(`/contents/${id}/`);
  return data;
};
