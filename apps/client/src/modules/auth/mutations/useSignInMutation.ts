import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from '@/lib/axios';
import { User } from "@/modules/users/types";
import { useAuth } from '../contexts';
import { signIn } from "../services";

interface MutationProps {
  email: string;
  password: string;
}

export function useSignInMutation() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return useMutation<User, unknown, MutationProps>({
    mutationFn: async (props) => {
      const { email, password } = props;
  
      const response = await signIn(email, password);
      api.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
      localStorage.setItem('@GALLERY:TOKEN', response.token);
      localStorage.setItem('@GALLERY:MEDIATOKEN', response.mediaToken);

      return response.user;
    },
    onSuccess: (user) => {
      setUser(user);
      navigate("/dashboard");
    },
    onError: () => {
      // TODO: show errors
    },
  });
}
