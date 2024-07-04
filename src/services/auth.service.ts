import { AppDispatch } from './../store/store';
import { instanceAuth, instance } from "../api/axios.api";
import { AxiosResponse } from "axios";
import {
  IUser, ILoginUser,
  IResponseUserData,
} from "../types/types";
import { login } from "../store/user/userSlice";
import { userSliceMapper } from "../store/user/utilits/userUtilits";

export const AuthService = {
  // Method for user registration
  async registration(userData: IUser): Promise<IResponseUserData> {
    const response: AxiosResponse<IResponseUserData> = await instanceAuth.post(
      "/registration",
      userData,
      { withCredentials: true }
    );

    return response.data;
  },

  // Method for user login
  async login(userData: ILoginUser): Promise<IResponseUserData> {
    try {
      // Encode username and password in base64
      const token = btoa(`${userData.username}:${userData.password}`);

      const response: AxiosResponse<IResponseUserData> = await instanceAuth.post(
        "login-user",
        {},
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
          withCredentials: true
        }
      );

      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error occurred during login:", error);
      throw error;
    }
  },

  // Method for refreshing the token
  async refresh(dispatch: AppDispatch): Promise<IResponseUserData> {
    const response: AxiosResponse<IResponseUserData> = await instanceAuth.post("refresh", {}, { withCredentials: true });
    dispatch(login(userSliceMapper(response.data)));
    return response.data;
  },

  // Method for user logout
  async logout(): Promise<void> {
    await instanceAuth.post("logout", {}, { withCredentials: true });
    document.cookie = 'accessToken=; Max-Age=0';
    document.cookie = 'refreshToken=; Max-Age=0';
  },

  // Method to get a greeting message from the server
  async getHello(): Promise<string> {
    const response: AxiosResponse<string> = await instance.get("api/hello", { withCredentials: true });
    return response.data;
  }
};
