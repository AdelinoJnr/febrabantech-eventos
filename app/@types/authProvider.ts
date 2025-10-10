export interface IUser {
  name: string;
  email: string;
  Authorization: string;
}

export interface AuthContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  login: (data: IUser) => void;
  logout: () => void;
  tokenAuth: (authorization: string) => void;
}

export interface LoginData {
  email: string;
  password: string;
  mantain_connected: boolean;
}
