import { instance } from "../../api/axios.api.ts";

interface IUser {
    id: string;
    login: string;
    firstName: string;
    lastName: string;
    aboutMe: string;
    avatarLangFileName: string;
    avatarSmallFileName: string;
}

export async function getUserById(id: string): Promise<IUser> {
    const response = await instance.get<IUser>(`/users/user/${id}/info`);
    return response.data;
}