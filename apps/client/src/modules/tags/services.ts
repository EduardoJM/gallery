import api from "@/lib/axios"
import { PaginatedTag } from './types';

export const getTagsPaginated = async (creator: string, page: number = 1, search: string | null = null): Promise<PaginatedTag> => {
  let queries = `?page=${page}`;
  if (search) {
    queries = `${queries}&search=${search}`;
  }
  const { data } = await api.get<PaginatedTag>(`/tags/by-creator/${creator}${queries}`);
  return data;
}
