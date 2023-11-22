export interface UserType {
  id: number;
  name: string;
  email: string;
  token: string;
}

export interface UserData {
  data: UserType;
}

export interface UserParseType {
  email: string;
  exp: number;
  role: number;
  user_id: number;
}
