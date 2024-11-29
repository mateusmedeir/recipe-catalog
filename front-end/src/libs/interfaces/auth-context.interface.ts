import { LoginData } from "../schemas/login.schema";
import { RegisterData } from "../schemas/register.schema";
import { IUser } from "./user.interface";

export interface IAuthContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  register: (data: RegisterData) => void;
  login: (data: LoginData) => void;
  logout: () => void;
}
