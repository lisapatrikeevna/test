import { instance } from "../../api/axios.api.ts";

interface IUser {
    id: string;
    login: string;
}

export async function getAllUsers(): Promise<IUser[]> {
    const response = await instance.get<IUser[]>('/users/all');
    return response.data;
}