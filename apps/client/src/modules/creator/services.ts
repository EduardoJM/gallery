import api from "@/lib/axios"
import { PaginatedContentCreators, ContentCreator } from './types';

export const getContentCreatorsPaginated = async (page: number = 1): Promise<PaginatedContentCreators> => {
  const { data } = await api.get<PaginatedContentCreators>(`/creators?page=${page}`);
  return data;
}

export const getContentCreatorById = async (id: string): Promise<ContentCreator> => {
  const { data } = await api.get<ContentCreator>(`/creators/${id}/`);
  return data;
};

export const createContentCreator = async (data: unknown) => {
  const { data: responseData } = await api.post<ContentCreator>(`/creators/`, data);
  return responseData;
};

export const updateContentCreator = async (id: string, data: unknown) => {
  const { data: responseData } = await api.patch<ContentCreator>(`/creators/${id}/`, data);
  return responseData;
};
