import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from '@/lib/axios';
import { useAuth } from '../contexts';

export function useSignOutMutation() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: async () => {
      api.defaults.headers.common["Authorization"] = undefined;
      localStorage.removeItem('@GALLERY:TOKEN');
      localStorage.removeItem('@GALLERY:MEDIATOKEN');
    },
    onSuccess: () => {
      setUser(null);
      navigate("/auth");
    },
  });
}
