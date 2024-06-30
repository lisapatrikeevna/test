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
  userId: string;
}
export interface IToken {
  accessToken: string | null;
  accessTokenExpiry: string | null;//.toISOString()

}

export interface IResponseUserData {
  access_token: string;
  access_token_expiry: number;
  token_type: string;
  user_name: string;
  message: string;
  user_id: string; // Add this line
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

// Type for fixed length shadow array
export type Shadows = [
  "none", string, string, string, string, string, string, string, string, string,
  string, string, string, string, string, string, string, string, string, string,
  string, string, string, string, string
];
export enum CommunityType {
  User = 0,
  Group = 1
}

export interface ICommunityInfo {
  type: CommunityType
  id:string
  name: string
}

export interface ISearchCommunitiesResponse {
  size: number
  items: ICommunityInfo[]
}