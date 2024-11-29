import { LoginData } from "@/libs/schemas/login.schema";
import api from "./api";
import { RegisterData } from "@/libs/schemas/register.schema";
import { IUser } from "@/libs/interfaces/user.interface";

async function loginUser(data: LoginData): Promise<IUser> {
  const response = await api.post("/auth/login", data);
  return response.data;
}

async function registerUser(data: RegisterData): Promise<IUser> {
  const response = await api.post("/auth/register", data);
  return response.data;
}

async function logoutUser() {
  await api.post("/auth/logout");
}

export { loginUser, registerUser, logoutUser };
