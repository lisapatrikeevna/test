export interface IUser {
  email?: string;
  login?: string;
  password?: string;
  token?: string;
}

export interface ILoginUser {
  username: string;
  password: string;
}

export interface IAuthUser {
  username: string;
  token: string;
  tokenExpiry: string;
}
export interface IToken {
  accessToken: string | null;
  accessTokenExpiry: string | null;//.toISOString()

}

export interface IResponseUserData {
  access_token: string;
  access_token_expiry: string;
  token_type: string;
  user_name: string;
}

export interface ReactionSelectorProps {
  onReact: (type: string) => void;
}

export interface IMessage {
  id: number;
  text: string;
  sentByMe: boolean;
  timestamp: Date;
  reactions: { type: string; userId: string }[];
}
