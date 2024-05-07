import { IAuthUser, IResponseUserData } from "../../../types/types"

export const userSliceMapper = ({ access_token, access_token_expiry, user_name }: IResponseUserData): IAuthUser => {
	return {
		username: user_name,
		token: access_token,
		tokenExpiry: new Date(new Date().getTime() + +access_token_expiry * 1000).toISOString(),

	};
};


