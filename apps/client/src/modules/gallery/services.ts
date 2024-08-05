import api from "@/lib/axios"
import { Content, PaginatedContents } from './types';

export const getContentsPaginated = async (page: number = 1): Promise<PaginatedContents> => {
  const { data } = await api.get<PaginatedContents>(`/contents?page=${page}`);
  return data;
}

export const getContentById = async (id: string): Promise<Content> => {
  const { data } = await api.get<Content>(`/contents/${id}/`);
  return data;
};
