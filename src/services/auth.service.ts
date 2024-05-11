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
  async registration(userData: IUser): Promise<IResponseUserData> {
    const response: AxiosResponse<IResponseUserData> = await instanceAuth.post(
      "registration",
      userData,
      { withCredentials: true }
    );

    return response.data;
  },


  async login(userData: ILoginUser): Promise<IResponseUserData> {
    try {
      const token = btoa(`${userData.username}:${userData.password}`); // Encode username and password in base64

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



  async refresh(dispatch: AppDispatch): Promise<IResponseUserData> {
    const response: AxiosResponse<IResponseUserData> = await instanceAuth.post("refresh", {}, { withCredentials: true });
    dispatch(login(userSliceMapper(response.data)));
    return response.data;
  },



  async logout(): Promise<void> {
    await instanceAuth.post("logout", {}, { withCredentials: true });
    document.cookie = 'accessToken=; Max-Age=0';
    document.cookie = 'refreshToken=; Max-Age=0';
  },

  async getHello(): Promise<string> {

    const response: AxiosResponse<string> = await instance.get("api/hello", { withCredentials: true });

    return response.data;
  }
};
