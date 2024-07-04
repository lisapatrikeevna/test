import { IAuthUser, IResponseUserData } from "../../../types/types"

// Function to map response data to user state data
export const userSliceMapper = ({ access_token, access_token_expiry, user_name, user_id }: IResponseUserData): IAuthUser => {
  return {
    username: user_name, // Map user_name to username
    token: access_token, // Map access_token to token
    // Calculate token expiry date and convert it to ISO string format
    tokenExpiry: new Date(new Date().getTime() + +access_token_expiry * 1000).toISOString(),
    userId: user_id, // Map user_id to userId
  };
};
