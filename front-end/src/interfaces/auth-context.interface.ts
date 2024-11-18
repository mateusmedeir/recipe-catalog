import { IUser } from "./user.interface"

export interface IAuthContext {
    user: IUser | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
    register: (email: string, password: string, confirmPassword: string) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
  }