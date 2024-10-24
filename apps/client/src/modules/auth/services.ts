import api from '@/lib/axios';
import { User } from '../users/types';
import { AuthResponse } from './types';

export const getAuthenticatedUser = async (): Promise<User> => {
  const { data } = await api.get<User>('/auth/profile/');
  return data;
}

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/sign-in/', { email, password });
  return data;
};

export const signUp = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/sign-up/', { name, email, password });
  return data;
};
