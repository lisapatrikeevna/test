import axios, { InternalAxiosRequestConfig } from "axios";
import { IToken } from "../types/types";
import { store } from "../store/store";
import { AuthService } from "../services/auth.service";
import { login } from "../store/user/userSlice";
import { userSliceMapper } from "../store/user/utilits/userUtilits";

export const API_URL = "http://85.215.241.41:8030"; //Dev
// export const API_URL = "https://85.215.241.41:8030"; // CheckDev with Https
// export const API_URL = "http://85.215.187.128:8030"; //Prod

export const instanceAuth = axios.create({
  withCredentials: true,
  baseURL: API_URL + "/auth",
  headers: {
    'Content-Type': 'application/json',
  }
});

export const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token: IToken = store.getState().user.token;
    config.headers["Authorization"] = `Bearer ${token.accessToken}`;
    return config;
  }
);

instance.interceptors.response.use(
  //TODO - add a lifetime check. if it's stale, do a refrech
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // We note that the request has already been attempted.
      try {
        // Calling the token update method
        const data = await AuthService.refresh(store.dispatch);
        // Updating the token in the application state
        store.dispatch(login(userSliceMapper(data)));
        // Setting a new token in the header and repeating the original request
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${data.access_token}`;
        return axios(originalRequest);
      } catch (e) {
        // If the token could not be updated, you can redirect the user to the login page
        console.error("Token cant be refreshed", e);
      }
    }
    // Redirect the error further if it is not related to an expired token
    return Promise.reject(error);
  }
);