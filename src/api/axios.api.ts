import axios, { InternalAxiosRequestConfig } from "axios";
import { IToken } from "../types/types";
import { store } from "../store/store";
import { AuthService } from "../services/auth.service";
import { login } from "../store/user/userSlice";
import { userSliceMapper } from "../store/user/utilits/userUtilits";

export const API_URL = "http://212.132.99.188:8030";
// export const API_URL = "http://localhost:8030";

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
  //TODO - добавить проверку на срок жизни. если протух- делать refrech
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Помечаем, что запрос уже пытались повторить
      try {
        // Вызов метода обновления токена
        const data = await AuthService.refresh(store.dispatch);
        // Обновление токена в состоянии приложения
        store.dispatch(login(userSliceMapper(data)));
        // Установка нового токена в заголовок и повторение исходного запроса
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${data.access_token}`;
        return axios(originalRequest);
      } catch (e) {
        // Если обновить токен не удалось, можно перенаправить пользователя на страницу входа
        console.error("Token cant be refreshed", e);
      }
    }
    // Перенаправляем ошибку дальше, если она не связана с просроченным токеном
    return Promise.reject(error);
  }
);
