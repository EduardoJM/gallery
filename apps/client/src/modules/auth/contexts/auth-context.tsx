import {
  PropsWithChildren,
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { useAuthenticatedUser } from "../queries";

interface User {}

export interface AuthContextData {
  isAuthenticated?: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  user: User | null;
}

export const AuthContext = createContext({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data:initialUser } = useAuthenticatedUser();
  const [user, setUser] = useState<User | null>(initialUser);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
