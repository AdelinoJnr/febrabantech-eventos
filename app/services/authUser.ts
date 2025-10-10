import { LoginData, IUser } from "@/@types/authProvider";
import { api } from "./api";

export const signIn = async (data: LoginData): Promise<IUser> => {
  const response = await api.post<IUser>(
    `/auth/signin`, data
  );

  return response.data;
}

export const getUser = async (): Promise<IUser> => {
  const token = localStorage.getItem("token");
  console.log('token', token);

  const response = await api.get<IUser>(
    `/auth/user`, { headers: { Authorization: token } }
  );

  return response.data;
}