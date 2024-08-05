import { User } from "../users/types";

export interface AuthResponse {
  user: User;
  token: string;
  mediaToken: string;
}
